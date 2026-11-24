"""Stabilize current-question rules for two new classes; freeze the old seven.

Survey values provide directions only. Patient separation and resampling
reliability rank candidate links, then penalized forward selection chooses a
compact set of questions. There is no fixed 80% rule and no future question.
"""

import copy
import json
from collections import defaultdict
from pathlib import Path
import numpy as np
from scipy.optimize import minimize
from train_workshop_model import matches

root = Path(__file__).resolve().parents[1]
data = json.loads((root / "private-results/consensus-training-input.json").read_text())
baseline = json.loads(
    (root / "private-results/sparse-baseline-model.js")
    .read_text()
    .split(" = ", 1)[1]
    .rstrip(";\n")
)
rules = copy.deepcopy(data["rules"])
base_rules = copy.deepcopy(data["baseModel"]["rules"])
cases = data["cases"]
cats = baseline["trainedCategories"]
questions = {
    q["id"]: q
    for q in json.loads(
        (root / "private-results/workshop-training-input.json").read_text()
    )["questions"]
}
ali = {
    d["diagnosis"]["id"]: d
    for d in json.loads((root / "private-results/ali-assessments.json").read_text())
}
ids = {
    "Labyrinthitis Hypofunction": "labyrinthitis-hypofunction",
    "Schwannoma Hypofunction": "schwannoma-hypofunction",
}
labels = np.array([[c in p["recorded"] for c in cats] for p in cases])
fixed = np.array(
    [
        [
            sum(
                r["weight"]
                for r in base_rules
                if r["category"] == c and matches(r, p["answers"])
            )
            for c in cats
        ]
        for p in cases
    ]
)
hit = np.array([[matches(r, p["answers"]) for r in rules] for p in cases])
rng = np.random.default_rng(20261124)
groups = defaultdict(list)
audit = []
for j, r in enumerate(rules):
    assert r["questionId"] in questions
    q = questions[r["questionId"]]
    a = next(
        (
            a
            for a in ali[ids[r["category"]]]["reviewerRatings"]
            if a["questionId"] == r["questionId"]
            and a["answer"] == r["answer"]
            and a["status"] == "current"
        ),
        None,
    )
    agree = a is not None and int(np.sign(a["significance"])) == r["direction"]
    r["thirdRoundJudgment"] = a["significance"] if a else None
    usable = np.array([r["questionId"] in p["answers"] for p in cases])
    col = cats.index(r["category"])
    pos = np.flatnonzero(usable & labels[:, col])
    neg = np.flatnonzero(usable & ~labels[:, col])
    separation = stability = 0.0
    if len(pos) >= 2 and len(neg) >= 5 and r["direction"]:
        x, y = hit[pos, j], hit[neg, j]
        separation = float(
            r["direction"]
            * ((x.sum() + 0.5) / (len(x) + 1) - (y.sum() + 0.5) / (len(y) + 1))
        )
        dx = x[rng.integers(0, len(x), (2000, len(x)))].sum(axis=1)
        dy = y[rng.integers(0, len(y), (2000, len(y)))].sum(axis=1)
        stability = float(
            np.mean(
                r["direction"] * ((dx + 0.5) / (len(x) + 1) - (dy + 0.5) / (len(y) + 1))
                > 0
            )
        )
    eligible = bool(
        agree and r["direction"] and separation > 0 and hit[pos, j].any()
        if r["direction"] > 0
        else agree
        and r["direction"]
        and separation > 0
        and len(pos) > 0
        and (~hit[pos, j]).any()
    )
    audit.append(
        {
            "category": r["category"],
            "questionId": r["questionId"],
            "answer": r["answer"],
            "expertAgreement": bool(agree),
            "usableRecorded": len(pos),
            "usableOther": len(neg),
            "directionalSeparation": separation,
            "resamplingReliability": stability,
            "eligible": eligible,
            "selected": False,
        }
    )
    if eligible:
        groups[(r["category"], r["questionId"])].append(j)

# Stronger answers receive priority within checklists; the total contribution
# of a question stays <=10 per direction without altering browser scoring.
upper = {}
for key, indexes in groups.items():
    if questions[key[1]]["kind"] == "multi":
        chosen = []
        for sign in (-1, 1):
            ranked = sorted(
                (j for j in indexes if rules[j]["direction"] == sign),
                key=lambda j: audit[j]["directionalSeparation"]
                * audit[j]["resamplingReliability"],
                reverse=True,
            )[:2]
            for j in ranked:
                upper[j] = 10 // len(ranked)
            chosen += ranked
        groups[key] = chosen
    else:
        for j in indexes:
            upper[j] = 25
feature = np.zeros((len(rules), len(cases), len(cats)))
for j, r in enumerate(rules):
    feature[j, :, cats.index(r["category"])] = hit[:, j] * r["direction"]
positive = labels / labels.sum(axis=0)
negative = (~labels) / (~labels).sum(axis=0)
pairs = (
    positive[:, :, None]
    * (~labels)[:, None, :]
    / (~labels).sum(axis=1)[:, None, None]
    / len(cats)
)
new_cols = [cats.index(c) for c in ids]


def scoring(w):
    return fixed + np.einsum("r,rnc->nc", w, feature)


def objective(w):
    s = scoring(w)
    ranking = (
        np.maximum(0, 10 - s[:, :, None] + s[:, None, :]) ** 2 * pairs
    ).sum() / 10000
    # Shared point targets prevent large checklists from dominating older classes.
    bands = (
        (
            np.maximum(0, 50 - s[:, new_cols]) ** 2 * positive[:, new_cols]
            + np.maximum(0, s[:, new_cols] - 30) ** 2 * negative[:, new_cols]
        ).sum()
        / len(new_cols)
        / 10000
    )
    shrink = 0.001 * np.sum((w / 25) ** 2) / max(1, len(groups))
    return ranking + 0.25 * bands + shrink


zero = np.zeros(len(rules))
# Penalty grows as the positive cohorts get smaller; it is not a clinical cutoff.
penalty = {
    c: float(
        0.25 * objective(zero) / (len(cats) * np.sqrt(labels[:, cats.index(c)].sum()))
    )
    for c in ids
}


def fit(selected):
    indexes = [j for key in selected for j in groups[key]]
    weights = zero.copy()
    if indexes:

        def loss(v):
            w = zero.copy()
            w[indexes] = v
            return objective(w)

        result = minimize(
            loss,
            np.full(len(indexes), 5.0),
            method="L-BFGS-B",
            bounds=[(5, upper[j]) for j in indexes],
        )
        weights[indexes] = np.rint(result.x)
    return weights, float(objective(weights) + sum(penalty[c] for c, q in selected))


selected = []
weights, best = fit(selected)
while True:
    choice = None
    for key in groups:
        if key in selected or sum(c == key[0] for c, q in selected) >= 6:
            continue
        w, value = fit(selected + [key])
        if value < best - 1e-8:
            best = value
            choice = (key, w)
    if choice is None:
        break
    key, weights = choice
    selected.append(key)
# Final point-space refinement, holding the selected questions fixed.
for _ in range(1000):
    current = objective(weights)
    move = None
    for j in np.flatnonzero(weights):
        for step in (-1, 1):
            trial = weights.copy()
            trial[j] += step
            if 5 <= trial[j] <= upper[j] and objective(trial) < current - 1e-10:
                current = objective(trial)
                move = trial
    if move is None:
        break
    weights = move
for j, r in enumerate(rules):
    r["weight"] = int(weights[j] * r["direction"])
    audit[j]["selected"] = bool(r["weight"])
    r["source"] = (
        "Shared survey direction only; patient-calibrated compact new-class scorecard"
    )
    r["patientSelected"] = bool(r["weight"])
model = {
    **baseline,
    "version": "stable-new-classes-2026-11-24",
    "rules": base_rules + rules,
    "method": "Frozen original seven scorecards plus compact patient-calibrated new-class rules",
    "consensusFit": {
        "patients": len(cases),
        "diagnoses": int(labels.sum()),
        "sourceWorkbook": "AI data  pull_11.20.xlsx",
        "existingWeightsFrozen": True,
        "surveyMagnitudesUsedAsPoints": False,
        "fixedStabilityCutoff": None,
        "selection": "Patient separation, soft resampling reliability, sample-size-dependent question penalty and bounded forward selection",
        "newClasses": list(ids),
        "maximumQuestionsPerNewClass": 6,
        "checkboxQuestionBudgetPerDirection": 10,
        "objectiveBefore": float(objective(zero)),
        "objectiveAfter": float(objective(weights)),
        "evaluation": "All fitting patients; not held-out validation. Unrecorded labels are proxy negatives.",
    },
}


def metrics(s, score_rules):
    rows = {}
    for col, c in enumerate(cats):
        ix = np.flatnonzero(labels[:, col])
        ranks = [
            sorted(range(len(cats)), key=lambda k: (-s[i, k], cats[k])).index(col) + 1
            for i in ix
        ]
        rs = [r for r in score_rules if r["category"] == c and r["weight"]]
        rows[c] = {
            "patients": len(ix),
            "top1": sum(r == 1 for r in ranks),
            "top3": sum(r <= 3 for r in ranks),
            "meanPoints": float(s[ix, col].mean()),
            "zeroOrBelow": int((s[ix, col] <= 0).sum()),
            "activeRules": len(rs),
            "activeQuestions": len(set(r["questionId"] for r in rs)),
        }
    return {
        "byClass": rows,
        "macroTop1": float(np.mean([r["top1"] / r["patients"] for r in rows.values()])),
        "macroTop3": float(np.mean([r["top3"] / r["patients"] for r in rows.values()])),
    }


before = np.array(
    [
        [
            sum(
                r["weight"]
                for r in baseline["rules"]
                if r["category"] == c and matches(r, p["answers"])
            )
            for c in cats
        ]
        for p in cases
    ]
)
report = {
    "patients": len(cases),
    "diagnoses": int(labels.sum()),
    "initialConsensus": metrics(before, baseline["rules"]),
    "tunedConsensus": metrics(scoring(weights), model["rules"]),
    "screening": audit,
    "penalties": penalty,
    "newRules": rules,
    "cases": [
        {
            "file": p["file"],
            "recorded": p["recorded"],
            "scores": dict(zip(cats, row.tolist())),
        }
        for p, row in zip(cases, scoring(weights))
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
        {
            "selectedQuestions": selected,
            "penalties": penalty,
            "results": report["tunedConsensus"],
        },
        indent=2,
    )
)
