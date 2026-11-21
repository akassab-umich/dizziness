"""Conservative whole-number recalibration of the final October workshop model.

Each existing nonzero weight moves at most 25% (rounded, at least one point).
Zero and unobserved rules stay fixed. No feature links or directions are learned.
The deterministic local search does not claim a global optimum.
"""

import hashlib
import json
import argparse
import datetime as dt
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "private-results/workshop-training-input.json"


def normalize(value):
    import re

    return re.sub("[^a-z0-9]+", " ", str(value).strip().lower()).strip()


def matches(rule, answers):
    def values(v):
        return [
            normalize(x)
            for x in (v if isinstance(v, list) else [] if v is None else [v])
        ]

    unless = rule.get("unless")
    return normalize(rule["answer"]) in values(
        answers.get(rule["questionId"])
    ) and not (
        unless
        and set(values(answers.get(unless["questionId"])))
        & set(map(normalize, unless["answers"]))
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--version", default=f"workshop-conservative-{dt.date.today().isoformat()}"
    )
    args = parser.parse_args()
    data = json.loads(INPUT.read_text())
    if len(data.get("sourceWorkbooks", [])) != 1:
        raise ValueError(
            "Prepare training from exactly one authoritative source workbook."
        )
    rules, cases, cats = data["rules"], data["cases"], data["categories"]
    base = np.array([r["weight"] for r in rules], dtype=int)
    ci = np.array([cats.index(r["category"]) for r in rules])
    hit = np.array(
        [[matches(r, p["answers"]) for r in rules] for p in cases], dtype=float
    )
    labels = np.array([[c in p["recorded"] for c in cats] for p in cases])
    radius = np.maximum(1, np.floor(np.abs(base) * 0.25 + 0.5)).astype(int)
    lower = np.where(
        base > 0, np.maximum(1, base - radius), np.where(base < 0, base - radius, 0)
    )
    upper = np.where(
        base < 0, np.minimum(-1, base + radius), np.where(base > 0, base + radius, 0)
    )
    free = (base != 0) & (base != -100) & hit.any(axis=0)
    lower[~free] = upper[~free] = base[~free]
    feature = np.zeros((len(rules), len(cases), len(cats)))
    for j, c in enumerate(ci):
        feature[j, :, c] = hit[:, j]
    baseline = np.einsum("r,rnc->nc", base, feature)
    positive = labels / labels.sum(axis=0)
    negative = (~labels) / (~labels).sum(axis=0)
    baseline_pos = (baseline * positive).sum(axis=0)
    baseline_neg = (baseline * negative).sum(axis=0)
    # Each recorded category has equal total influence, including multilabel cases.
    pairweights = (
        positive[:, :, None]
        * (~labels)[:, None, :]
        / (~labels).sum(axis=1)[:, None, None]
        / len(cats)
    )
    budget_matrix = np.array(
        [(ci == j) & (base > 0) for j in range(len(cats))], dtype=float
    )
    budget = budget_matrix @ base
    # Preserve the clinical ordering explicitly requested during the workshop.
    index = {
        (r["category"], r["questionId"], normalize(r["answer"])): i
        for i, r in enumerate(rules)
    }
    orders = []

    def order(c, q, high, low):
        a = index.get((c, q, normalize(high)))
        b = index.get((c, q, normalize(low)))
        if a is not None and b is not None:
            orders.append((a, b))

    order("Bilateral", "259366", "severe", "moderate")
    order("Bilateral", "259366", "moderate", "mild")
    order("Neuritis", "259366", "mild", "moderate")
    order("Neuritis", "259366", "moderate", "severe")
    order("Bilateral", "259356", "imbalance", "dizziness and imbalance")
    for strong in ("rolling over", "getting into or out of bed"):
        for weak in ("looking up", "lying down", "sitting up", "reaching or bending"):
            order("BPPV", "259371", strong, weak)
    deltas = []
    for i in np.flatnonzero(free):
        for step in (-1, 1):
            d = np.zeros(len(rules), dtype=int)
            d[i] = step
            deltas.append(d)
    for i in range(len(rules)):
        for j in range(i + 1, len(rules)):
            if (
                free[i]
                and free[j]
                and ci[i] == ci[j]
                and np.sign(base[i]) == np.sign(base[j])
            ):
                for step in (-1, 1):
                    d = np.zeros(len(rules), dtype=int)
                    d[i] = step
                    d[j] = -step
                    deltas.append(d)
    midpoints = []
    for category, strong in [("Neuritis", "mild"), ("Bilateral", "severe")]:
        mild, moderate, severe = [
            index[(category, "259366", answer)]
            for answer in ("mild", "moderate", "severe")
        ]
        midpoints.append((mild, moderate, severe))
        high = index[(category, "259366", strong)]
        for step in (-1, 1):
            d = np.zeros(len(rules), dtype=int)
            d[high] = 2 * step
            d[moderate] = step
            deltas.append(d)
    deltas = np.array(deltas)
    score_delta = np.einsum("mr,rnc->mnc", deltas, feature)

    def objective(weights, scores):
        valid = ((weights >= lower) & (weights <= upper)).all(axis=1)
        budgets = weights @ budget_matrix.T
        valid &= (
            (budgets >= budget * 0.75 - 1e-8) & (budgets <= budget * 1.25 + 1e-8)
        ).all(axis=1)
        # Do not trade away one class's average support to help another class.
        valid &= ((scores * positive).sum(axis=1) >= baseline_pos - 1e-8).all(axis=1)
        valid &= ((scores * negative).sum(axis=1) <= baseline_neg + 1e-8).all(axis=1)
        for a, b in orders:
            valid &= weights[:, a] >= weights[:, b]
        for mild, moderate, severe in midpoints:
            valid &= 2 * weights[:, moderate] == weights[:, mild] + weights[:, severe]
        loss = (
            np.maximum(0, 0.1 - (scores[:, :, :, None] - scores[:, :, None, :]) / 100)
            ** 2
            * pairweights
        ).sum(axis=(1, 2, 3))
        loss += 0.002 * np.mean(((weights - base) / radius) ** 2, axis=1)
        loss[~valid] = np.inf
        return loss

    weights = base.copy()
    scores = baseline.copy()
    best = float(objective(weights[None], scores[None])[0])
    assert np.isfinite(best)
    initial = best
    moves = 0
    while moves < 1000:
        candidates = weights + deltas
        candidates_scores = scores + score_delta
        losses = objective(candidates, candidates_scores)
        winner = int(np.argmin(losses))
        if losses[winner] >= best - 1e-10:
            break
        weights = candidates[winner]
        scores = candidates_scores[winner]
        best = float(losses[winner])
        moves += 1
    assert (np.sign(weights) == np.sign(base)).all()
    assert ((weights >= lower) & (weights <= upper)).all()
    for i, r in enumerate(rules):
        r.update(
            weight=int(weights[i]),
            anchorWeight=int(base[i]),
            direction=int(np.sign(base[i])),
            source="Conservative recalibration of final October workshop points",
        )
    model = {
        "version": args.version,
        "name": "Model",
        "basedOnVersion": data["sourceModel"],
        "method": "Expert-linked additive scorecard with bounded integer pairwise-ranking calibration",
        "scoringMode": "net-points",
        "trainedCategories": cats,
        "rules": rules,
        "constraints": {
            "radiusFraction": 0.25,
            "minimumRadius": 1,
            "zeroRulesFrozen": True,
            "unobservedRulesFrozen": True,
            "signsPreserved": True,
            "positiveBudgetRange": [0.75, 1.25],
            "classMeanSupportGuard": True,
            "workshopOrderingsPreserved": True,
        },
        "fit": {
            "patients": len(cases),
            "diagnoses": int(labels.sum()),
            "sourceWorkbook": data["sourceWorkbooks"][0],
            "evaluation": "Training data only; unrecorded diagnoses are not confirmed negatives",
            "inputSHA256": hashlib.sha256(INPUT.read_bytes()).hexdigest(),
            "objectiveBefore": initial,
            "objectiveAfter": best,
            "acceptedMoves": moves,
            "method": "Deterministic bounded local search; not a claim of global optimality",
        },
    }
    (ROOT / "web/band-model.js").write_text(
        "window.NEBULA_BANDS = " + json.dumps(model, indent=2) + ";\n"
    )
    audit = {
        "model": model,
        "fittedScores": scores.tolist(),
        "lower": lower.tolist(),
        "upper": upper.tolist(),
        "unobservedRuleIndexes": np.flatnonzero(~hit.any(axis=0)).tolist(),
        "perClassMeanRecordedBefore": dict(zip(cats, baseline_pos.tolist())),
        "perClassMeanRecordedAfter": dict(
            zip(cats, (scores * positive).sum(axis=0).tolist())
        ),
        "perClassMeanUnrecordedBefore": dict(zip(cats, baseline_neg.tolist())),
        "perClassMeanUnrecordedAfter": dict(
            zip(cats, (scores * negative).sum(axis=0).tolist())
        ),
    }
    (ROOT / "private-results/workshop-training-audit.json").write_text(
        json.dumps(audit, indent=2) + "\n"
    )
    print(
        json.dumps(
            {
                "patients": len(cases),
                "rules": len(rules),
                "changedRules": int((weights != base).sum()),
                "moves": moves,
                "objectiveBefore": initial,
                "objectiveAfter": best,
            }
        )
    )


if __name__ == "__main__":
    main()
