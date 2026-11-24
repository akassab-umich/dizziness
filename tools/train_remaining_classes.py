"""Add Cardio/Orthostatic and Anxiety from weighted directions and clinical priors.

Only Michelle (65%) and Katie (35%) supply votes for these two classes. Their
slider magnitudes are not points. Existing nine scorecards remain frozen.
Anxiety's single case is evaluated but cannot tune its own weights.
"""

import json
import zipfile
import html
from pathlib import Path
import numpy as np
from scipy.optimize import minimize
from train_workshop_model import matches

root = Path(__file__).resolve().parents[1]
project = root.parent
data = json.loads((root / "private-results/remaining-training-input.json").read_text())
base = data["baseModel"]
cases = data["cases"]
qs = {q["id"]: q for q in data["questions"] if q["kind"] in ("single", "multi")}
ids = {
    "Cardiovascular / Orthostatic": "cardio-orthostatic",
    "Anxiety without PPPD": "anxiety-without-pppd",
}
cats = sorted(set(base["trainedCategories"]) | set(ids))
labels = np.array([[c in p["recorded"] for c in cats] for p in cases])
weights_by_reviewer = {"Michelle": 0.65, "Katie": 0.35}
reviews = {}
with zipfile.ZipFile(
    project / "data/assessments/2026-11-24/reassignmentforteammembers.zip"
) as z:
    for n in z.namelist():
        if n.endswith(".json"):
            d = json.loads(z.read(n))
            if d["diagnosis"]["id"] in ids.values():
                reviews["Katie", d["diagnosis"]["id"]] = d
for name in [
    "Michelle_Cardiovascular_Orthostatic.json",
    "Michelle_Anxiety_without_PPPD.json",
]:
    d = json.loads((project / "data/assessments/2026-11-24" / name).read_text())
    reviews["Michelle", d["diagnosis"]["id"]] = d
vote_maps = {
    key: {
        (r["questionId"], r["answer"]): r
        for r in d["reviewerRatings"]
        if r["status"] == "current" and not r["fixed"]
    }
    for key, d in reviews.items()
}
policy = {}


def add(c, q, answers, lo, hi, prior, reason):
    for a in answers:
        policy[c, q, a] = (1, lo, hi, prior, reason)


cardio = "Cardiovascular / Orthostatic"
anxiety = "Anxiety without PPPD"
add(
    cardio,
    "259357",
    ["light-headed", "dizziness upon standing"],
    5,
    5,
    5,
    "Lightheadedness/standing-related dizziness is compatible; these overlapping options jointly contribute at most ten points.",
)
add(
    cardio,
    "259371",
    ["sitting up", "standing up"],
    5,
    5,
    5,
    "Arising/upright provocation is relevant. Sitting-up wording is an imperfect proxy and is not a blood-pressure measurement.",
)
add(
    cardio,
    "259380",
    ["fainted or light-headed"],
    5,
    10,
    7,
    "Fainting/lightheadedness may support hemodynamic assessment; actual cause and syncope need clinical confirmation.",
)
add(
    cardio,
    "259381",
    ["heart racing"],
    5,
    10,
    7,
    "Palpitations may accompany orthostatic symptoms but are nonspecific; not proof of a cardiac cause.",
)
add(
    cardio,
    "259369",
    ["Seconds", "Minutes"],
    5,
    5,
    5,
    "Brief episodes can support an orthostatic history only in context of upright provocation; not independently diagnostic.",
)
add(
    cardio,
    "259364",
    ["Yes"],
    0,
    5,
    3,
    "Broad position-change wording is weaker than standing-specific provocation; optional modest support only.",
)
add(
    anxiety,
    "259372",
    ["stress, nerves, or anxiety"],
    5,
    10,
    8,
    "Stress-associated worsening is relevant context; it cannot establish that anxiety is the cause of dizziness.",
)
add(
    anxiety,
    "259381",
    ["panic feeling or sudden need to leave a place", "heart racing"],
    5,
    5,
    5,
    "Panic sensations and palpitations can accompany anxiety; together capped at ten points and not evidence against medical causes.",
)
add(
    anxiety,
    "259382",
    ["anxiety or depression"],
    5,
    10,
    7,
    "Reported anxiety/depression provides limited background information, not a causal diagnosis or evidence against PPPD.",
)
add(
    anxiety,
    "259357",
    ["light-headed"],
    5,
    5,
    5,
    "Lightheadedness may accompany panic but is highly nonspecific; deliberately small supporting contribution.",
)
sources = {
    cardio: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9249281/",
    anxiety: "https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms",
}
rules = []
bounds = []
priors = []
audit = []
for c, did in ids.items():
    col = cats.index(c)
    for qid, q in qs.items():
        for answer in q["options"]:
            votes = {}
            tally = {-1: 0.0, 0: 0.0, 1: 0.0}
            for who, importance in weights_by_reviewer.items():
                vote = vote_maps[who, did].get((qid, answer))
                direction = (
                    int(np.sign(vote["significance"]))
                    if vote and vote["sliderAdjusted"]
                    else None
                )
                votes[who] = {
                    "direction": direction,
                    "status": (
                        "rated" if direction is not None else "untouched or missing"
                    ),
                    "importance": importance,
                }
                if direction is not None:
                    tally[direction] += importance
            winner = max(tally, key=tally.get) if sum(tally.values()) else 0
            proposal = policy.get((c, qid, answer))
            direction = 0
            reason = "Held neutral: generic, overlapping, contradictory or insufficiently specific for this class. No causal attribution or exclusion is inferred."
            if proposal:
                expected, lo, hi, prior, clinical_reason = proposal
                if winner == expected and tally[winner] > max(
                    v for k, v in tally.items() if k != winner
                ):
                    direction = expected
                    reason = clinical_reason
                    # Sparse classes remain anchored near modest clinical points.
                    n = int(labels[:, col].sum())
                    if n < 3:
                        lo = hi = prior
                    else:
                        lo = max(lo, prior - 2)
                        hi = min(hi, prior + 2)
                    rules.append(
                        {
                            "category": c,
                            "questionId": qid,
                            "answer": answer,
                            "direction": direction,
                            "weight": prior * direction,
                            "remaining": True,
                            "sourceJudgments": [
                                {"reviewer": w, **v} for w, v in votes.items()
                            ],
                            "medicalSource": sources[c],
                            "source": "Clinically reviewed current question; Michelle/Katie directions weighted 65/35; no Ali vote",
                            "minimum": lo,
                            "maximum": hi,
                            "priorMagnitude": prior,
                            "frozenForInsufficientCases": n < 3,
                        }
                    )
                    bounds.append((lo, hi))
                    priors.append(prior)
                else:
                    reason = (
                        "Clinical candidate held neutral because the weighted explicit survey decision does not support its direction. "
                        + clinical_reason
                    )
            template = {"category": c, "questionId": qid, "answer": answer}
            usable = np.array([qid in p["answers"] for p in cases])
            hit = np.array([matches(template, p["answers"]) for p in cases])
            pos = usable & labels[:, col]
            neg = usable & ~labels[:, col]
            audit.append(
                {
                    **template,
                    "question": q["prompt"],
                    "votes": votes,
                    "decision": direction,
                    "reason": reason,
                    "usableRecorded": int(pos.sum()),
                    "matchesRecorded": int(hit[pos].sum()),
                    "usableOther": int(neg.sum()),
                    "matchesOther": int(hit[neg].sum()),
                }
            )
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
feature = np.zeros((len(rules), len(cases), len(cats)))
for j, r in enumerate(rules):
    feature[j, :, cats.index(r["category"])] = (
        np.array([matches(r, p["answers"]) for p in cases]) * r["direction"]
    )
priors = np.array(priors, dtype=float)
pos = labels / labels.sum(axis=0)
neg = (~labels) / (~labels).sum(axis=0)
newcols = [cats.index(c) for c in ids]
# The one-case Anxiety group is evaluated but excluded from the fitting loss.
fitcols = [cats.index(c) for c in ids if labels[:, cats.index(c)].sum() >= 3]
pair_weights = np.zeros((len(cases), len(cats), len(cats)))
for col in fitcols:
    pair_weights[:, col, :] = (
        pos[:, col, None] * (~labels) / (~labels).sum(axis=1)[:, None] / len(fitcols)
    )


def scores(w):
    return fixed + np.einsum("r,rnc->nc", w, feature)


def loss(w):
    s = scores(w)
    rank = (
        np.maximum(0, 10 - s[:, :, None] + s[:, None, :]) ** 2 * pair_weights
    ).sum() / 10000
    shrink = 0.02 * np.mean(((w - priors) / 5) ** 2)
    return rank + shrink


fit = minimize(loss, priors, method="L-BFGS-B", bounds=bounds)
if not fit.success:
    raise ValueError(f"Calibration did not converge: {fit.message}")
values = np.rint(fit.x).astype(int)
for j, r in enumerate(rules):
    if r["minimum"] == 0 and values[j] < 3:
        values[j] = 0
    r["weight"] = int(values[j] * r["direction"])


def metrics(s):
    result = {}
    for col, c in enumerate(cats):
        ix = np.flatnonzero(labels[:, col])
        ranks = [
            sorted(range(len(cats)), key=lambda k: (-s[i, k], cats[k])).index(col) + 1
            for i in ix
        ]
        active = [
            r for r in base["rules"] + rules if r["category"] == c and r["weight"]
        ]
        result[c] = {
            "patients": len(ix),
            "top1": sum(k == 1 for k in ranks),
            "top3": sum(k <= 3 for k in ranks),
            "meanPoints": float(s[ix, col].mean()),
            "questions": len(set(r["questionId"] for r in active)),
        }
    return result


model = {
    **base,
    "version": "remaining-weighted-classes-2026-11-24",
    "trainedCategories": cats,
    "rules": base["rules"] + rules,
    "remainingFit": {
        "patients": len(cases),
        "diagnoses": int(labels.sum()),
        "reviewerWeights": weights_by_reviewer,
        "existingNineFrozen": True,
        "newClasses": list(ids),
        "futureQuestionsUsed": False,
        "anxietyPriorOnly": True,
        "sourceWorkbook": "AI data  pull_11.20.xlsx",
        "method": "Clinically bounded prior-anchored point adjustment; survey directions only; three Cardio cases fit and one Anxiety case descriptive only",
        "evaluation": "All-data descriptive results, not held-out validation; unrecorded labels are proxy negatives.",
    },
}
report = {
    "results": metrics(scores(values)),
    "review": audit,
    "cases": [
        {
            "file": p["file"],
            "recorded": p["recorded"],
            "scores": dict(zip(cats, row.tolist())),
        }
        for p, row in zip(cases, scores(values))
    ],
}
(root / "web/band-model.js").write_text(
    "window.NEBULA_BANDS = " + json.dumps(model, indent=2) + ";\n"
)
(root / "private-results/remaining-model-report.json").write_text(
    json.dumps(report, indent=2) + "\n"
)
e = lambda v: html.escape(str(v))
body = [
    '<!doctype html><meta charset="utf-8"><title>Cardio and Anxiety review</title><style>body{font:15px Arial;margin:24px;color:#172536}table{border-collapse:collapse;width:100%;font-size:13px}td,th{border:1px solid #aaa;padding:8px;vertical-align:top}th{background:#edf2f7}</style><h1>Existing-question review: remaining two classes</h1><p>Michelle 65%, Katie 35%. Ali is not used. Untouched sliders are missing judgments. Magnitudes on sliders are not points. Existing nine models unchanged. Only three Cardio and one Anxiety cases exist: Anxiety weights remain at clinical priors, not fitted to that one case. Cardio adjustments stay within two points of their starting values. Questionnaires do not establish blood-pressure abnormalities, a cardiac cause, anxiety as the cause of dizziness, or absence of PPPD. No new/proposed questions are used.</p>'
]
for c in ids:
    v = report["results"][c]
    body.append(
        f'<h2>{e(c)}</h2><p>{v["patients"]} cases; {v["questions"]} scoring questions; {v["top3"]}/{v["patients"]} recorded cases in top three. Descriptive only. <a href="{sources[c]}">Clinical reference</a></p><table><tr><th>Question and answer</th><th>Michelle</th><th>Katie</th><th>Recorded group</th><th>Others</th><th>Decision</th></tr>'
    )
    for a in audit:
        if a["category"] != c:
            continue
        rule = next(
            (
                r
                for r in rules
                if all(r[k] == a[k] for k in ("category", "questionId", "answer"))
            ),
            None,
        )
        points = rule["weight"] if rule else 0

        def vote(w):
            d = a["votes"][w]["direction"]
            return (
                "Untouched/missing"
                if d is None
                else {-1: "Negative", 0: "Explicit neutral", 1: "Positive"}[d]
            )

        body.append(
            f'<tr><td>Q{a["questionId"]}: {e(a["question"])}<br><b>{e(a["answer"])}</b></td><td>{vote("Michelle")}</td><td>{vote("Katie")}</td><td>{a["matchesRecorded"]}/{a["usableRecorded"]} usable</td><td>{a["matchesOther"]}/{a["usableOther"]} usable</td><td>{points:+d} points<br>{e(a["reason"])}</td></tr>'
        )
    body.append("</table>")
(project / "reports/remaining-classes-2026-11-24.html").write_text("\n".join(body))
print(json.dumps({"results": report["results"], "newRules": rules}, indent=2))
