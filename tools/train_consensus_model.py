"""Fit only the two new categories; freeze existing weights and consensus signs."""

import json
from pathlib import Path
import numpy as np
from scipy.optimize import minimize
from train_workshop_model import matches

root = Path(__file__).resolve().parents[1]
data = json.loads((root / "private-results/consensus-training-input.json").read_text())
base, rules, cases = data["baseModel"], data["rules"], data["cases"]
cats = sorted(set(r["category"] for r in base["rules"] + rules))
labels = np.array([[c in p["recorded"] for c in cats] for p in cases])
fixed = np.array(
    [
        [
            sum(
                r["weight"]
                for r in base["rules"]
                if r["category"] == c and matches(r, p["answers"])
            )
            for c in cats
        ]
        for p in cases
    ]
)
hit = np.array([p["hits"] for p in cases])
direction = np.array([r["direction"] for r in rules])
feature = np.zeros((len(rules), len(cases), len(cats)))
for j, r in enumerate(rules):
    feature[j, :, cats.index(r["category"])] = hit[:, j] * direction[j]
seed = np.array([abs(r["weight"]) for r in rules], dtype=float)
bounds = [(5, r["maximum"]) if r["direction"] else (0, 0) for r in rules]
positive = labels / labels.sum(axis=0)
pairweights = (
    positive[:, :, None]
    * (~labels)[:, None, :]
    / (~labels).sum(axis=1)[:, None, None]
    / len(cats)
)


def scores(w):
    return fixed + np.einsum("r,rnc->nc", w, feature)


def loss(w):
    s = scores(w)
    # Equal influence for each recorded class, plus shrinkage toward expert magnitudes.
    ranking = (
        np.maximum(0, 10 - s[:, :, None] + s[:, None, :]) ** 2 * pairweights
    ).sum() / 10000
    regularization = 0.002 * np.mean(((w - seed) / 10) ** 2)
    return ranking + regularization


result = minimize(loss, seed, method="L-BFGS-B", bounds=bounds)
weights = np.rint(result.x).astype(int)
# Finish in the exported whole-point space.
for iteration in range(1000):
    best = loss(weights)
    move = None
    for j, (lo, hi) in enumerate(bounds):
        for step in (-1, 1):
            candidate = weights.copy()
            candidate[j] += step
            if not lo <= candidate[j] <= hi:
                continue
            value = loss(candidate)
            if value < best - 1e-10:
                best = value
                move = candidate
    if move is None:
        break
    weights = move
for j, r in enumerate(rules):
    r["weight"] = int(weights[j] * direction[j])
model = {
    **base,
    "version": "consensus-expanded-2026-11-24",
    "trainedCategories": cats,
    "rules": base["rules"] + rules,
    "method": "Frozen workshop scorecard plus sign-constrained, regularized consensus calibration for two new classes",
    "consensusFit": {
        "patients": len(cases),
        "diagnoses": int(labels.sum()),
        "sourceWorkbook": "AI data  pull_11.20.xlsx",
        "newClasses": ["Labyrinthitis Hypofunction", "Schwannoma Hypofunction"],
        "existingWeightsFrozen": True,
        "consensusDirectionsFixed": True,
        "neutralWeights": 0,
        "bounds": {"single": [5, 25], "multi": [5, 10]},
        "objectiveBefore": float(loss(seed)),
        "objectiveAfter": float(loss(weights)),
        "optimizerSuccess": bool(result.success),
        "evaluation": "All fitting cases; no held-out validation. Unrecorded labels are proxy negatives.",
    },
}


def metrics(s, categories=cats):
    columns = [cats.index(c) for c in categories]
    rows = {}
    for c in categories:
        col = cats.index(c)
        ranks = []
        points = []
        for i in np.flatnonzero(labels[:, col]):
            ranked = sorted(columns, key=lambda j: (-s[i, j], cats[j]))
            ranks.append(ranked.index(col) + 1)
            points.append(float(s[i, col]))
        rows[c] = {
            "patients": len(ranks),
            "top1": sum(r == 1 for r in ranks),
            "top3": sum(r <= 3 for r in ranks),
            "meanPoints": float(np.mean(points)),
            "zeroOrBelow": sum(p <= 0 for p in points),
        }
    return {
        "byClass": rows,
        "macroTop1": float(np.mean([r["top1"] / r["patients"] for r in rows.values()])),
        "macroTop3": float(np.mean([r["top3"] / r["patients"] for r in rows.values()])),
    }


report = {
    "patients": len(cases),
    "diagnoses": int(labels.sum()),
    "initialConsensus": metrics(scores(seed)),
    "tunedConsensus": metrics(scores(weights)),
    "oldSevenOnly": metrics(fixed, sorted(set(r["category"] for r in base["rules"]))),
    "newRules": rules,
    "cases": [
        {
            "file": p["file"],
            "recorded": p["recorded"],
            "scores": dict(zip(cats, s.tolist())),
        }
        for p, s in zip(cases, scores(weights))
    ],
}
(root / "web/band-model.js").write_text(
    "window.NEBULA_BANDS = " + json.dumps(model, indent=2) + ";\n"
)
(root / "private-results/consensus-model-report.json").write_text(
    json.dumps(report, indent=2) + "\n"
)
print(
    json.dumps(
        {k: v for k, v in report.items() if k not in ("cases", "newRules")}, indent=2
    )
)
