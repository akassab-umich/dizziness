"""Select stable patient-supported rules, then fit bounded sign-preserving points.

80% refers to stratified-bootstrap directional stability, not disease probability
or the percentage of patients that must choose an answer. All results are fitted
on the same cohort and are exploratory, especially for three/six-case classes.
"""

import copy
import json
from pathlib import Path
from collections import defaultdict
import numpy as np
from scipy.optimize import minimize
from train_workshop_model import matches

root = Path(__file__).resolve().parents[1]
data = json.loads((root / "private-results/consensus-training-input.json").read_text())
ali = json.loads((root / "private-results/ali-assessments.json").read_text())
baseline = root / "private-results/sparse-baseline-model.js"
if not baseline.exists():
    import shutil

    current = json.loads(
        (root / "web/band-model.js").read_text().split(" = ", 1)[1].rstrip(";\n")
    )
    if current.get("sparseFit"):
        raise ValueError("Restore the pre-sparse baseline before retraining.")
    shutil.copy2(root / "web/band-model.js", baseline)
old = json.loads(baseline.read_text().split(" = ", 1)[1].rstrip(";\n"))
questions = {
    q["id"]: q
    for q in json.loads(
        (root / "private-results/workshop-training-input.json").read_text()
    )["questions"]
}
rules = copy.deepcopy(data["baseModel"]["rules"] + data["rules"])
cases = data["cases"]
cats = sorted(set(r["category"] for r in rules))
ids = {
    "Labyrinthitis Hypofunction": "labyrinthitis-hypofunction",
    "Schwannoma Hypofunction": "schwannoma-hypofunction",
}
round_by_id = {d["diagnosis"]["id"]: d for d in ali}
labels = np.array([[c in p["recorded"] for c in cats] for p in cases])
hit = np.array([[matches(r, p["answers"]) for r in rules] for p in cases])
rng = np.random.default_rng(20261124)
audit = []
for j, r in enumerate(rules):
    direction = int(r.get("direction", np.sign(r["weight"])))
    r["direction"] = direction
    allowed = direction != 0
    if r.get("consensus"):
        a = next(
            (
                a
                for a in round_by_id[ids[r["category"]]]["reviewerRatings"]
                if a["questionId"] == r["questionId"] and a["answer"] == r["answer"]
            ),
            None,
        )
        allowed &= a is not None and int(np.sign(a["significance"])) == direction
        if a:
            r["thirdRoundJudgment"] = a["significance"]
    usable = np.array([r["questionId"] in p["answers"] for p in cases])
    positive = np.flatnonzero(usable & labels[:, cats.index(r["category"])])
    other = np.flatnonzero(usable & ~labels[:, cats.index(r["category"])])
    stability = separation = 0.0
    enough = len(positive) >= 3 and len(other) >= 10
    if enough:
        a, b = hit[positive, j].astype(float), hit[other, j].astype(float)
        # Jeffreys smoothing tempers extreme rates in the very small classes.
        rate_a, rate_b = (a.sum() + 0.5) / (len(a) + 1), (b.sum() + 0.5) / (len(b) + 1)
        separation = direction * (rate_a - rate_b)
        draw_a = a[rng.integers(0, len(a), (2000, len(a)))].sum(axis=1)
        draw_b = b[rng.integers(0, len(b), (2000, len(b)))].sum(axis=1)
        differences = direction * (
            (draw_a + 0.5) / (len(a) + 1) - (draw_b + 0.5) / (len(b) + 1)
        )
        stability = float(np.mean(differences > 0))
        # A positive rule must actually match >=2 recorded cases; a negative
        # rule must be absent in >=2 recorded cases and match >=3 other cases.
        enough &= (
            a.sum() >= 2 if direction > 0 else (len(a) - a.sum() >= 2 and b.sum() >= 3)
        )
    eligible = bool(allowed and enough and separation >= 0.15 and stability >= 0.80)
    audit.append(
        {
            "category": r["category"],
            "questionId": r["questionId"],
            "answer": r["answer"],
            "expertDirectionAllowed": bool(allowed),
            "usableRecorded": len(positive),
            "usableOther": len(other),
            "directionalSeparation": float(separation),
            "bootstrapStability": stability,
            "eligible": eligible,
            "selected": False,
            "selectionStrength": float(stability * max(0, separation)),
        }
    )

# Retain the strongest option per sign on a checkbox question: its aggregate
# positive/negative contribution cannot exceed 10 even if many options are checked.
by_question = defaultdict(list)
for j, a in enumerate(audit):
    if a["eligible"]:
        by_question[(a["category"], a["questionId"])].append(j)
for (category, qid), indexes in by_question.items():
    if questions[qid]["kind"] == "multi":
        indexes = [
            max(
                (j for j in indexes if rules[j]["direction"] == sign),
                key=lambda j: audit[j]["selectionStrength"],
                default=None,
            )
            for sign in (-1, 1)
        ]
        indexes = [j for j in indexes if j is not None]
    by_question[(category, qid)] = indexes
for category in cats:
    ranked = sorted(
        (k for k in by_question if k[0] == category),
        key=lambda k: max(audit[j]["selectionStrength"] for j in by_question[k]),
        reverse=True,
    )
    for key in ranked[:8]:
        for j in by_question[key]:
            audit[j]["selected"] = True

active = [j for j, a in enumerate(audit) if a["selected"]]
if not active:
    raise ValueError("No stable rules; do not replace the model.")
directions = np.array([rules[j]["direction"] for j in active])
feature = np.zeros((len(active), len(cases), len(cats)))
for k, j in enumerate(active):
    feature[k, :, cats.index(rules[j]["category"])] = hit[:, j] * directions[k]
seed = np.array(
    [
        max(
            5,
            min(
                10 if questions[rules[j]["questionId"]]["kind"] == "multi" else 25,
                abs(rules[j]["weight"]),
            ),
        )
        for j in active
    ],
    dtype=float,
)
bounds = [
    (5, 10 if questions[rules[j]["questionId"]]["kind"] == "multi" else 25)
    for j in active
]
positive = labels / labels.sum(axis=0)
negative = (~labels) / (~labels).sum(axis=0)
pairweights = (
    positive[:, :, None]
    * (~labels)[:, None, :]
    / (~labels).sum(axis=1)[:, None, None]
    / len(cats)
)


def scores(w):
    return np.einsum("r,rnc->nc", w, feature)


def loss(w):
    s = scores(w)
    ranking = (
        np.maximum(0, 10 - s[:, :, None] + s[:, None, :]) ** 2 * pairweights
    ).sum() / 10000
    # Keep class scores on the familiar points scale without a 100-point total.
    bands = (
        (
            np.maximum(0, 50 - s) ** 2 * positive
            + np.maximum(0, s - 30) ** 2 * negative
        ).sum()
        / len(cats)
    ) / 10000
    return ranking + 0.25 * bands + 0.003 * np.mean(((w - seed) / 10) ** 2)


result = minimize(loss, seed, method="L-BFGS-B", bounds=bounds)
weights = np.rint(result.x).astype(int)
for _ in range(1000):
    best = loss(weights)
    move = None
    for k, (lo, hi) in enumerate(bounds):
        for step in (-1, 1):
            trial = weights.copy()
            trial[k] += step
            if lo <= trial[k] <= hi and loss(trial) < best - 1e-10:
                best = loss(trial)
                move = trial
    if move is None:
        break
    weights = move
for r in rules:
    r["weight"] = 0
for k, j in enumerate(active):
    rules[j]["weight"] = int(weights[k] * directions[k])
for j, r in enumerate(rules):
    r["patientSelected"] = audit[j]["selected"]
    r["source"] = (
        "Expert direction with patient stability screening and sparse point calibration"
    )


def evaluate(s, score_rules):
    rows = {}
    for c, col in zip(cats, range(len(cats))):
        selected = np.flatnonzero(labels[:, col])
        ranks = []
        for i in selected:
            ranks.append(
                sorted(range(len(cats)), key=lambda k: (-s[i, k], cats[k])).index(col)
                + 1
            )
        active_rules = [r for r in score_rules if r["category"] == c and r["weight"]]
        rows[c] = {
            "patients": len(selected),
            "top1": sum(r == 1 for r in ranks),
            "top3": sum(r <= 3 for r in ranks),
            "meanPoints": float(s[selected, col].mean()),
            "zeroOrBelow": int((s[selected, col] <= 0).sum()),
            "activeRules": len(active_rules),
            "activeQuestions": len(set(r["questionId"] for r in active_rules)),
        }
    return {
        "byClass": rows,
        "macroTop1": float(np.mean([v["top1"] / v["patients"] for v in rows.values()])),
        "macroTop3": float(np.mean([v["top3"] / v["patients"] for v in rows.values()])),
    }


before = np.array(
    [
        [
            sum(
                r["weight"]
                for r in old["rules"]
                if r["category"] == c and matches(r, p["answers"])
            )
            for c in cats
        ]
        for p in cases
    ]
)
model = {
    k: v for k, v in old.items() if k not in ("constraints", "fit", "consensusFit")
}
model.update(
    version="patient-supported-sparse-2026-11-24",
    rules=rules,
    method="Expert-sign-constrained sparse scorecard with stratified-bootstrap stability screening",
    sparseFit={
        "patients": len(cases),
        "diagnoses": int(labels.sum()),
        "sourceWorkbook": "AI data  pull_11.20.xlsx",
        "bootstrapResamples": 2000,
        "minimumStability": 0.80,
        "minimumDirectionalSeparation": 0.15,
        "maximumQuestionsPerClass": 8,
        "maximumCheckboxOptionsPerDirectionPerQuestion": 1,
        "neutralWeight": 0,
        "nonzeroBounds": {"single": [5, 25], "multi": [5, 10]},
        "activeRules": len(active),
        "objectiveBefore": float(loss(seed)),
        "objectiveAfter": float(loss(weights)),
        "evaluation": "Same fitting cases. Bootstrap stability is not held-out validation or diagnostic probability.",
    },
)
report = {
    "before": evaluate(before, old["rules"]),
    "after": evaluate(scores(weights), rules),
    "screening": audit,
    "cases": [
        {
            "file": p["file"],
            "recorded": p["recorded"],
            "scores": dict(zip(cats, row.tolist())),
        }
        for p, row in zip(cases, scores(weights))
    ],
}
(root / "web/band-model.js").write_text(
    "window.NEBULA_BANDS = " + json.dumps(model, indent=2) + ";\n"
)
(root / "private-results/sparse-model-report.json").write_text(
    json.dumps(report, indent=2) + "\n"
)
print(
    json.dumps({k: v for k, v in report.items() if k in ("before", "after")}, indent=2)
)
