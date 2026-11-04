#!/usr/bin/env python3
"""Class-balanced ordinal integer score learning; all-data exploratory fit.

Use the exported browser feature matrix, never labels/demographics as features.
The class problems are separable, so solving each minimizes their macro average.
Unrecorded labels are proxy negatives, not clinically verified absence.
"""
import argparse
import copy
import hashlib
import json
from pathlib import Path
import platform
import time

import numpy as np
import scipy
from scipy.optimize import Bounds, LinearConstraint, milp
from scipy.sparse import csr_matrix

ROOT = Path(__file__).resolve().parents[1]
THRESHOLDS = (30, 40, 51)


def band(scores):
    return np.searchsorted(THRESHOLDS, scores, side="right")


def ordinal_loss(scores, positive):
    b = band(scores)
    return float(
        (
            np.array([7, 3, 2, 0])[b[positive]].mean()
            + np.array([0, 2, 3, 7])[b[~positive]].mean()
        )
        / 2
    )


def fit_category(X, y, prior, limit, seconds):
    n, d = X.shape
    if not y.any() or y.all():
        return prior.copy(), {
            "trained": False,
            "reason": "No positive/negative contrast",
        }
    varying = np.any(X != X[0], axis=0)
    lower = np.where(prior > 0, 1, np.where(prior < 0, -limit, 0)).astype(float)
    upper = np.where(prior > 0, limit, np.where(prior < 0, -1, 0)).astype(float)
    # No data can identify constant features; retain these expert weights.
    lower[~varying] = prior[~varying]
    upper[~varying] = prior[~varying]
    size = d + 3 * n + d + n + 1
    low = np.r_[lower, np.zeros(3 * n + d + n + 1)]
    high = np.r_[upper, np.ones(3 * n), np.full(d + n + 1, np.inf)]
    integer = np.r_[np.ones(d + 3 * n), np.zeros(d + n + 1)]
    c = np.zeros(size)
    rows, lhs, rhs = [], [], []

    def add(coeff, lo=-np.inf, hi=np.inf):
        rows.append(coeff)
        lhs.append(lo)
        rhs.append(hi)

    for i in range(n):
        min_s, max_s = float(X[i] @ lower), float(X[i] @ upper)
        for j, t in enumerate(THRESHOLDS):
            b_idx = d + 3 * i + j
            a = np.zeros(size)
            a[:d] = X[i]
            a[b_idx] = -max(0, max_s - (t - 1))
            add(a, hi=t - 1)
            a = np.zeros(size)
            a[:d] = X[i]
            big = max(0, t - min_s)
            a[b_idx] = -big
            add(a, lo=t - big)
            # Integer coefficients express the same balanced loss up to a
            # constant scale, avoiding a fragile fractional optimum constraint.
            c[b_idx] = (
                -np.array([4, 1, 2])[j] * (~y).sum()
                if y[i]
                else np.array([2, 1, 4])[j] * y.sum()
            )
        # Residual distance prevents an equally bad band fit from driving a
        # sacrificed recorded case arbitrarily negative (or vice versa).
        a = np.zeros(size)
        a[:d] = X[i] * (-1 if y[i] else 1)
        a[d + 3 * n + d + i] = -1
        add(a, hi=-51 if y[i] else 29)
        a = np.zeros(size)
        a[d + 3 * n + d + i] = 1
        a[-1] = -1
        add(a, hi=0)
    for k in range(d):
        # d_k >= |w_k - original_k|
        a = np.zeros(size)
        a[k] = 1
        a[d + 3 * n + k] = -1
        add(a, hi=prior[k])
        a = np.zeros(size)
        a[k] = -1
        a[d + 3 * n + k] = -1
        add(a, hi=-prior[k])
    matrix = csr_matrix(np.asarray(rows))
    constraint = LinearConstraint(matrix, np.array(lhs), np.array(rhs))
    bounds = Bounds(low, high)
    options = {"time_limit": seconds, "mip_rel_gap": 0.0}
    started = time.monotonic()
    first = milp(
        c, integrality=integer, bounds=bounds, constraints=constraint, options=options
    )
    if first.x is None:
        raise RuntimeError(f"No feasible scorecard: {first.message}")
    first_w = np.rint(first.x[:d]).astype(int)
    # Preserve best band loss, then minimize distance to the target extremes.
    add(c, hi=float(c @ first.x) + 1e-8)
    second_c = np.zeros(size)
    second_c[d + 3 * n + d : -1] = 0.001 * np.where(
        y, 1 / (2 * y.sum()), 1 / (2 * (~y).sum())
    )
    second_c[-1] = 1
    second = milp(
        second_c,
        integrality=integer,
        bounds=bounds,
        constraints=LinearConstraint(
            csr_matrix(np.asarray(rows)), np.array(lhs), np.array(rhs)
        ),
        options={"time_limit": seconds, "mip_rel_gap": 0.0},
    )
    fixed_band_refinement = False
    refinement_bounds = bounds
    if second.x is None:
        # Keep the feasible first-pass bands fixed while refining point magnitudes.
        # This preserves the primary fit without needing to rediscover all bands.
        fixed_low, fixed_high = low.copy(), high.copy()
        indicators = np.rint(first.x[d : d + 3 * n])
        fixed_low[d : d + 3 * n] = indicators
        fixed_high[d : d + 3 * n] = indicators
        refinement_bounds = Bounds(fixed_low, fixed_high)
        fixed_band_refinement = True
        second = milp(
            second_c,
            integrality=integer,
            bounds=refinement_bounds,
            constraints=LinearConstraint(
                csr_matrix(np.asarray(rows)), np.array(lhs), np.array(rhs)
            ),
            options={"time_limit": seconds, "mip_rel_gap": 0.0},
        )
    chosen = second if second.x is not None else first
    third = None
    if second.x is not None:
        add(second_c, hi=float(second.fun) + 1e-7)
        third_c = np.zeros(size)
        third_c[d + 3 * n : d + 3 * n + d] = 1
        third_c[:d] = 0.05 * np.sign(prior)
        third = milp(
            third_c,
            integrality=integer,
            bounds=refinement_bounds,
            constraints=LinearConstraint(
                csr_matrix(np.asarray(rows)), np.array(lhs), np.array(rhs)
            ),
            options={"time_limit": seconds, "mip_rel_gap": 0.0},
        )
        if third.x is not None:
            chosen = third
    weights = np.rint(chosen.x[:d]).astype(int)
    before = ordinal_loss(X @ prior, y)
    after = ordinal_loss(X @ weights, y)
    if after > ordinal_loss(X @ first_w, y) + 1e-7 or after > before + 1e-7:
        raise RuntimeError("Optimizer degraded primary band objective")
    if np.any(np.sign(weights) != np.sign(prior)):
        raise RuntimeError("Expert sign changed")
    info = {
        "trained": True,
        "positiveCount": int(y.sum()),
        "proxyNegativeCount": int((~y).sum()),
        "lossBefore": before,
        "lossAfter": after,
        "primaryOptimal": first.status == 0,
        "primaryStatus": int(first.status),
        "primaryMessage": first.message,
        "primaryGap": float(first.mip_gap),
        "primaryObjective": float(first.fun) / (2 * y.sum() * (~y).sum()),
        "primaryDualBound": float(first.mip_dual_bound) / (2 * y.sum() * (~y).sum()),
        "integerObjectiveScale": int(2 * y.sum() * (~y).sum()),
        "secondaryOptimal": second.status == 0 and not fixed_band_refinement,
        "fixedBandRefinement": fixed_band_refinement,
        "secondaryStatus": int(second.status),
        "secondaryGap": float(second.mip_gap) if second.x is not None else None,
        "secondaryDistance": float(second.fun) if second.x is not None else None,
        "worstTargetDistance": int(
            max(
                np.maximum(0, 51 - (X @ weights)[y]).max(),
                np.maximum(0, (X @ weights)[~y] - 29).max(),
            )
        ),
        "tertiaryOptimal": (
            (third.status == 0 and not fixed_band_refinement)
            if third is not None
            else False
        ),
        "tertiaryGap": (
            float(third.mip_gap) if third is not None and third.x is not None else None
        ),
        "seconds": round(time.monotonic() - started, 2),
        "changedRules": int(np.count_nonzero(weights != prior)),
        "frozenConstantRules": int((~varying).sum()),
        "weightsAtBound": int(np.count_nonzero(varying & (np.abs(weights) == limit))),
    }
    return weights, info


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--seconds", type=float, default=90)
    parser.add_argument("--version", default="point-bands-2026-11-04")
    parser.add_argument("--max-points", type=int, default=100)
    parser.add_argument(
        "--only",
        nargs="+",
        help="Refine selected classes from a matching existing audit",
    )
    args = parser.parse_args()
    raw = (ROOT / "private-results/training-input.json").read_bytes()
    data = json.loads(raw)
    cases = data["cases"]
    rules = data["rules"]
    weights = np.array([r["weight"] for r in rules], dtype=int)
    if args.max_points < np.abs(weights).max():
        raise ValueError("Point bound cannot exclude the existing model")
    hits = np.array([p["hits"] for p in cases], dtype=int)
    audits = {}
    if args.only:
        saved = json.loads(
            (ROOT / "private-results/optimization-audit.json").read_text()
        )
        if (
            saved["inputSHA256"] != hashlib.sha256(raw).hexdigest()
            or saved["settings"]["max_points"] != args.max_points
        ):
            raise ValueError("Cannot resume against different inputs or constraints")
        if any(c not in data["categories"] for c in args.only):
            raise ValueError("Unknown class")
        weights = np.array(saved["trainedWeights"], dtype=int)
        audits = saved["categories"]
    for category in data["categories"]:
        if args.only and category not in args.only:
            continue
        ids = np.array([i for i, r in enumerate(rules) if r["category"] == category])
        y = np.array([category in p["recorded"] for p in cases])
        print(f"Fitting {category}: {y.sum()} recorded / {len(y)} patients", flush=True)
        prior = np.array([rules[i]["weight"] for i in ids], dtype=int)
        weights[ids], audits[category] = fit_category(
            hits[:, ids], y, prior, args.max_points, args.seconds
        )
        print(json.dumps(audits[category]), flush=True)
    result = copy.deepcopy(rules)
    for r, w in zip(result, weights):
        r["weight"] = int(w)
        r["source"] = "Experimental ordinal integer score optimization"
    model = {
        "version": args.version,
        "name": "Model",
        "method": "Class-balanced ordinal mixed-integer optimization with expert sign constraints",
        "thresholds": list(THRESHOLDS),
        "trainedCategories": [c for c, a in audits.items() if a["trained"]],
        "rules": result,
        "fit": {
            "patients": len(cases),
            "evaluation": "training data only",
            "unrecordedLabels": "proxy negatives; not verified absence",
            "perRuleMagnitudeLimit": args.max_points,
        },
    }
    (ROOT / "web/band-model.js").write_text(
        "window.NEBULA_BANDS = " + json.dumps(model, indent=2) + ";\n"
    )
    audit = {
        "inputSHA256": hashlib.sha256(raw).hexdigest(),
        "python": platform.python_version(),
        "scipy": scipy.__version__,
        "settings": vars(args),
        "categories": audits,
        "trainedWeights": weights.tolist(),
        "sourceWeights": [r["weight"] for r in rules],
    }
    (ROOT / "private-results/optimization-audit.json").write_text(
        json.dumps(audit, indent=2)
    )
    print("Saved model and optimization audit.", flush=True)


if __name__ == "__main__":
    main()
