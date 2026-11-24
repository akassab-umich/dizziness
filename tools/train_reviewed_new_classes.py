"""Clinical/survey-informed current-question review for new classes ONLY.

Original seven weights never move. Survey direction is used, never slider size.
The clinical shortlist is an explicit research proposal for clinician review,
not a diagnostic standard. Small-cohort data tunes amounts, not clinical truth.
"""

import copy
import html
import json
import zipfile
from collections import Counter
from pathlib import Path
import numpy as np
from scipy.optimize import minimize
from train_workshop_model import matches

root = Path(__file__).resolve().parents[1]
project = root.parent
data = json.loads((root / "private-results/consensus-training-input.json").read_text())
base = json.loads(
    (root / "private-results/sparse-baseline-model.js")
    .read_text()
    .split(" = ", 1)[1]
    .rstrip(";\n")
)
before = json.loads(
    (project / "archive/pre-integrated-review-2026-11-24/band-model.js")
    .read_text()
    .split(" = ", 1)[1]
    .rstrip(";\n")
)
questions = {
    q["id"]: q
    for q in json.loads(
        (root / "private-results/workshop-training-input.json").read_text()
    )["questions"]
    if q["kind"] in ("single", "multi")
}
cases = data["cases"]
cats = base["trainedCategories"]
base_rules = copy.deepcopy(data["baseModel"]["rules"])
reviews = {}
for archive in [
    project / "data/assessments/2026-11-24/homework.zip",
    project / "data/assessments/2026-11-24/reassignmentforteammembers.zip",
    project / "data/assessments/2026-11-24/Ali_Bilateral.zip",
]:
    with zipfile.ZipFile(archive) as zipped:
        for filename in zipped.namelist():
            if filename.endswith(".json"):
                d = json.loads(zipped.read(filename))
                key = (d["firstName"], d["diagnosis"]["id"])
                assert key not in reviews
                reviews[key] = {
                    (r["questionId"], r["answer"]): r
                    for r in d["reviewerRatings"]
                    if r["status"] == "current" and not r["fixed"]
                }

sources = {
    "Labyrinthitis Hypofunction": "https://www.hopkinsmedicine.org/health/conditions-and-diseases/labyrinthitis-and-vestibular-neuritis",
    "Schwannoma Hypofunction": "https://www.nidcd.nih.gov/health/vestibular-schwannoma-acoustic-neuroma-and-neurofibromatosis",
}
ids = {
    "Labyrinthitis Hypofunction": "labyrinthitis-hypofunction",
    "Schwannoma Hypofunction": "schwannoma-hypofunction",
}
policy = {}


def add(c, q, answers, direction, level, minimum, maximum, prior, reason):
    for answer in answers:
        policy[c, q, answer] = (direction, level, minimum, maximum, prior, reason)


lab = "Labyrinthitis Hypofunction"
sch = "Schwannoma Hypofunction"
add(
    lab,
    "259361",
    ["Sudden"],
    1,
    "core",
    8,
    20,
    15,
    "Abrupt onset supports the clinical pattern; not specific on its own.",
)
add(
    lab,
    "259361",
    ["Gradual"],
    -1,
    "secondary",
    0,
    5,
    3,
    "Gradual onset weakens the typical acute history modestly; no exclusion.",
)
add(
    lab,
    "259369",
    ["Days"],
    1,
    "core",
    10,
    25,
    18,
    "Prolonged vertigo fits better than brief isolated attacks; wording does not establish continuity.",
)
add(
    lab,
    "259369",
    ["Hours"],
    1,
    "secondary",
    0,
    5,
    3,
    "Hours alone is less specific; duration wording cannot confirm a sustained episode.",
)
add(
    lab,
    "259400",
    ["Yes"],
    1,
    "core",
    8,
    10,
    10,
    "Hearing involvement matters, but timing and pre-existing loss are not established.",
)
hearing = [
    "Yes, hearing loss in the right ear only",
    "Yes, hearing loss in the left ear only",
]
add(
    lab,
    "259415",
    hearing,
    1,
    "core",
    5,
    15,
    10,
    "Unilateral audiometric hearing loss supports auditory involvement, but may be unrelated or longstanding.",
)
add(
    lab,
    "259367",
    ["Only 1 episode"],
    1,
    "supporting",
    5,
    10,
    7,
    "A single prolonged vestibular episode is compatible; repeated episodes are not automatically equivalent.",
)
add(
    lab,
    "260451",
    ["Yes"],
    1,
    "supporting",
    5,
    10,
    7,
    "Post-infectious prolonged vertigo is compatible; absence is not an exclusion.",
)
add(
    lab,
    "259374",
    ["unsteady when walking"],
    1,
    "supporting",
    5,
    10,
    7,
    "Walking imbalance supports vestibular dysfunction but is not specific.",
)
add(
    lab,
    "259381",
    ["Nausea or vomiting"],
    1,
    "supporting",
    5,
    5,
    5,
    "Compatible accompanying symptom with deliberately modest influence.",
)
add(
    lab,
    "259371",
    ["any kind of head movement", "walking in the dark"],
    1,
    "supporting",
    5,
    5,
    5,
    "General vestibular head-motion/balance support; paired options together cannot exceed ten points.",
)
add(
    sch,
    "259400",
    ["Yes"],
    1,
    "core",
    8,
    10,
    10,
    "Hearing complaints support review for a hearing/balance nerve disorder; cannot establish a tumor.",
)
add(
    sch,
    "259415",
    hearing,
    1,
    "core",
    10,
    20,
    15,
    "Unilateral/asymmetric hearing loss is clinically relevant; imaging is required for diagnosis.",
)
add(
    sch,
    "259361",
    ["Gradual"],
    1,
    "supporting",
    5,
    10,
    7,
    "Gradual symptom evolution is compatible with a typically slow-growing lesion; not mandatory.",
)
add(
    sch,
    "259374",
    ["unsteady when walking"],
    1,
    "supporting",
    5,
    10,
    7,
    "Balance symptoms may support the presentation, with deliberately modest weight.",
)
neutral_reasons = {
    "259356": "Generic dizziness/imbalance is not separately rewarded as diagnosis-specific evidence.",
    "259357": "Generic sensations are not specific enough to add another independent score.",
    "259362": "Conflicting or nonspecific resting-symptom interpretation; hold neutral rather than reverse votes.",
    "259363": "The 24-hours-never-stopping wording is not a reliable requirement or differentiator.",
    "259364": "Position-triggered symptoms overlap other conditions; not separately stacked here.",
    "259366": "Severity is not the cause of symptoms and does not distinguish these subtypes reliably.",
    "259367": "Other episode counts are not treated as equivalent to a single prolonged episode.",
    "259369": "Unsupported duration options stay neutral; no new direction is invented.",
    "259370": "Episode frequency alone is not subtype-specific and wording may confuse persistent symptoms with attacks.",
    "259371": "Specific bed/rolling triggers are not separately rewarded for these subtypes; avoid duplicating positional evidence.",
    "259372": "Activity aggravation overlaps head-motion/balance questions; avoid checklist accumulation.",
    "259374": "Other balance options stay neutral rather than duplicate support or assign nonspecific penalties.",
    "259381": "Other associated symptoms are nonspecific or need separate clinical assessment; no subtype points.",
    "259400": "Absence of a hearing complaint does not justify a strong rule-out.",
    "259415": "Other hearing-test responses do not establish absence of the disorder.",
    "259416": "Attack-linked ringing wording is not a clean measure of persistent/new tinnitus; absence is not positive evidence and conflicting votes are not reversed.",
    "259417": "Attack-linked hearing fluctuation needs clarification rather than being treated as generic new or asymmetric hearing loss.",
    "259418": "Ear fullness alone is not sufficiently subtype-specific; do not add broad penalties.",
    "259421": "Not hearing eyes move is not positive evidence for these diagnoses; no negative exclusion is inferred.",
    "260450": "Absence/presence of weather or food triggers is not sufficient affirmative subtype evidence.",
    "260451": "No prior cold/flu is not evidence for schwannoma and should not exclude labyrinthitis.",
    "260452": "Absence of trauma is not affirmative evidence for these diagnoses.",
}
labels = np.array([[c in p["recorded"] for c in cats] for p in cases])
audit = []
rules = []
bounds = []
priors = []
for category, diagnosis in ids.items():
    col = cats.index(category)
    for qid, q in questions.items():
        for answer in q["options"]:
            votes = {}
            directions = []
            for who in ["Katie", "Michelle", "Ali"]:
                vote = reviews.get((who, diagnosis), {}).get((qid, answer))
                if not vote:
                    votes[who] = {"status": "not supplied"}
                    continue
                status = "rated" if vote["sliderAdjusted"] else "untouched center"
                direction = (
                    int(np.sign(vote["significance"]))
                    if vote["sliderAdjusted"]
                    else None
                )
                votes[who] = {
                    "status": status,
                    "direction": direction,
                    "sliderValue": vote["significance"],
                }
                if direction is not None:
                    directions.append(direction)
            proposal = policy.get((category, qid, answer))
            decision = "neutral"
            reason = neutral_reasons.get(
                qid,
                "No sufficiently specific clinical role in this scorecard; do not turn generic comorbidity/absence into evidence.",
            )
            template = {"category": category, "questionId": qid, "answer": answer}
            usable = np.array([qid in p["answers"] for p in cases])
            hits = np.array([matches(template, p["answers"]) for p in cases])
            pos = usable & labels[:, col]
            neg = usable & ~labels[:, col]
            row = {
                **template,
                "question": q["prompt"],
                "survey": votes,
                "usableRecorded": int(pos.sum()),
                "matchingRecorded": int(hits[pos].sum()),
                "usableOther": int(neg.sum()),
                "matchingOther": int(hits[neg].sum()),
                "medicalSource": sources[category],
            }
            if proposal:
                sign, level, lo, hi, prior, clinical_reason = proposal
                # At least two explicit same-direction votes, no explicit opposite.
                if directions.count(sign) >= 2 and -sign not in directions:
                    decision = "positive" if sign > 0 else "negative"
                    reason = clinical_reason
                    rules.append(
                        {
                            **template,
                            "direction": sign,
                            "weight": sign * prior,
                            "consensus": True,
                            "source": "Current-question clinical shortlist and shared explicit survey direction; patient-calibrated points",
                            "reviewLevel": level,
                            "sourceJudgments": [
                                {
                                    "reviewer": w,
                                    "direction": v.get("direction"),
                                    "status": v["status"],
                                }
                                for w, v in votes.items()
                            ],
                            "medicalSource": sources[category],
                        }
                    )
                    bounds.append((lo, hi))
                    priors.append(prior)
                else:
                    reason = (
                        "Clinical candidate held neutral: fewer than two explicit agreeing directions or an explicit opposite response. "
                        + clinical_reason
                    )
            row.update(decision=decision, reason=reason, finalWeight=0)
            audit.append(row)

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
feature = np.zeros((len(rules), len(cases), len(cats)))
for j, r in enumerate(rules):
    feature[j, :, cats.index(r["category"])] = (
        np.array([matches(r, p["answers"]) for p in cases]) * r["direction"]
    )
priors = np.array(priors, dtype=float)
maximum = np.array([hi for lo, hi in bounds])
positive = labels / labels.sum(axis=0)
negative = (~labels) / (~labels).sum(axis=0)
pairweights = (
    positive[:, :, None]
    * (~labels)[:, None, :]
    / (~labels).sum(axis=1)[:, None, None]
    / len(cats)
)
newcols = [cats.index(c) for c in ids]


def scores(w):
    return fixed + np.einsum("r,rnc->nc", w, feature)


def loss(w):
    s = scores(w)
    rank = (
        np.maximum(0, 10 - s[:, :, None] + s[:, None, :]) ** 2 * pairweights
    ).sum() / 10000
    bands = (
        (
            np.maximum(0, 50 - s[:, newcols]) ** 2 * positive[:, newcols]
            + np.maximum(0, s[:, newcols] - 30) ** 2 * negative[:, newcols]
        ).sum()
        / len(newcols)
        / 10000
    )
    # Stronger clinical anchoring for the smaller recorded cohorts.
    shrink = np.mean(
        [
            10
            / (labels[:, cats.index(r["category"])].sum() + 10)
            * ((w[j] - priors[j]) / maximum[j]) ** 2
            for j, r in enumerate(rules)
        ]
    )
    return rank + 0.25 * bands + 0.005 * shrink


ties = []
for category in ids:
    ix = [
        j
        for j, r in enumerate(rules)
        if r["category"] == category and r["questionId"] == "259415"
    ]
    if len(ix) == 2:
        ties.append(tuple(ix))
constraints = [{"type": "eq", "fun": lambda w, a=a, b=b: w[a] - w[b]} for a, b in ties]
fit = minimize(
    loss,
    priors,
    method="SLSQP",
    bounds=bounds,
    constraints=constraints,
    options={"ftol": 1e-10, "maxiter": 500},
)
if not fit.success:
    raise ValueError(f"Calibration did not converge: {fit.message}")
weights = np.rint(fit.x).astype(int)
for a, b in ties:
    weights[b] = weights[a]
for j, r in enumerate(rules):
    if bounds[j][0] == 0 and weights[j] < 3:
        weights[j] = 0
for _ in range(500):
    best = loss(weights)
    move = None
    for j, (lo, hi) in enumerate(bounds):
        if any(j == b for a, b in ties):
            continue
        linked = next((b for a, b in ties if j == a), None)
        for step in (-1, 1):
            trial = weights.copy()
            trial[j] += step
            if linked is not None:
                trial[linked] += step
            if (
                lo <= trial[j] <= hi
                and (lo > 0 or trial[j] == 0 or trial[j] >= 3)
                and loss(trial) < best - 1e-10
            ):
                best = loss(trial)
                move = trial
    if move is None:
        break
    weights = move
for j, r in enumerate(rules):
    r["weight"] = int(weights[j] * r["direction"])
for a in audit:
    found = next(
        (
            r
            for r in rules
            if all(r[k] == a[k] for k in ["category", "questionId", "answer"])
        ),
        None,
    )
    if found:
        a["finalWeight"] = found["weight"]
        a["decision"] = a["decision"] if found["weight"] else "neutral"
        a["reason"] += (
            " Patient fitting set this optional rule to zero."
            if not found["weight"]
            else ""
        )


def metrics(s, rs):
    rows = {}
    for col, c in enumerate(cats):
        ix = np.flatnonzero(labels[:, col])
        ranks = [
            sorted(range(len(cats)), key=lambda k: (-s[i, k], cats[k])).index(col) + 1
            for i in ix
        ]
        active = [r for r in rs if r["category"] == c and r["weight"]]
        rows[c] = {
            "patients": len(ix),
            "top1": sum(r == 1 for r in ranks),
            "top3": sum(r <= 3 for r in ranks),
            "meanPoints": float(s[ix, col].mean()),
            "activeQuestions": len(set(r["questionId"] for r in active)),
            "activeRules": len(active),
        }
    return {
        "byClass": rows,
        "macroTop1": float(np.mean([r["top1"] / r["patients"] for r in rows.values()])),
        "macroTop3": float(np.mean([r["top3"] / r["patients"] for r in rows.values()])),
    }


model = {
    **base,
    "version": "reviewed-new-classes-2026-11-24",
    "rules": base_rules + rules,
    "method": "Original seven scorecards unchanged; clinically reviewed shared-direction current-question priors with regularized patient calibration for two new classes",
    "consensusFit": {
        "patients": len(cases),
        "diagnoses": int(labels.sum()),
        "existingWeightsFrozen": True,
        "scope": "Current questions for Labyrinthitis and Schwannoma only",
        "surveyMagnitudesUsedAsPoints": False,
        "fixedStabilityCutoff": None,
        "clinicalShortlistRetained": True,
        "leftRightHearingWeightsTied": True,
        "sourceWorkbook": "AI data  pull_11.20.xlsx",
        "evaluation": "Same fitting cohort, no held-out validation. Clinical shortlist is a research proposal, not diagnostic criteria.",
    },
}
before_scores = np.array(
    [
        [
            sum(
                r["weight"]
                for r in before["rules"]
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
    "initialConsensus": metrics(before_scores, before["rules"]),
    "tunedConsensus": metrics(scores(weights), model["rules"]),
    "newRules": rules,
    "review": audit,
    "sources": sources,
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
(root / "web/reviewed-rule-policy.js").write_text(
    "window.NEBULA_REVIEWED_POLICY = "
    + json.dumps(
        {
            "version": model["version"],
            "rules": [
                {**r, "minimum": bounds[j][0], "maximum": bounds[j][1]}
                for j, r in enumerate(rules)
            ],
        },
        indent=2,
    )
    + ";\n"
)
(root / "private-results/consensus-model-report.json").write_text(
    json.dumps(report, indent=2) + "\n"
)
out = project / "reports/reviewed-new-classes-2026-11-24.html"
esc = lambda x: html.escape(str(x))
body = [
    '<!doctype html><html><head><meta charset="utf-8"><title>Current-question review for new classes</title><style>body{font:15px Arial;margin:28px;color:#172536}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #bbb;padding:8px;vertical-align:top}th{background:#edf2f7}h2{margin-top:36px}.note{background:#fff4d1;padding:12px}tr.positive td:last-child{color:#06713b}tr.negative td:last-child{color:#a21b24}</style></head><body><h1>Existing questions reviewed for the two new classes</h1><p class="note">The original seven classes are unchanged. Future questions, Cardio and Anxiety do not score patients. Survey slider magnitudes are NOT points. An untouched center is missing judgment, not an explicit neutral vote. The clinical shortlist is a research recommendation requiring team review. Data come from 99 fitting patients; unrecorded diagnoses are not confirmed absent. Three Labyrinthitis and six Schwannoma cases do not establish predictive validity.</p>'
]
body.append(
    "<h2>Results</h2><table><tr><th>Class</th><th>Patients</th><th>Active questions</th><th>Top three</th><th>Average points</th></tr>"
)
for c, v in report["tunedConsensus"]["byClass"].items():
    body.append(
        f'<tr><td>{esc(c)}</td><td>{v["patients"]}</td><td>{v["activeQuestions"]}</td><td>{v["top3"]}/{v["patients"]}</td><td>{v["meanPoints"]:.1f}</td></tr>'
    )
body.append("</table>")
for c in ids:
    body.append(
        f'<h2>{esc(c)}</h2><p>Clinical reference: <a href="{sources[c]}">{esc(sources[c])}</a></p><table><tr><th>Question / answer</th><th>Katie</th><th>Michelle</th><th>Ali</th><th>Recorded-class matches</th><th>Other recorded groups</th><th>Decision and reason</th></tr>'
    )
    for a in audit:
        if a["category"] != c:
            continue

        def vote(w):
            v = a["survey"][w]
            return (
                v["status"]
                if v.get("direction") is None
                else {-1: "Negative", 0: "Explicit neutral", 1: "Positive"}[
                    v["direction"]
                ]
            )

        body.append(
            f'<tr class="{a["decision"]}"><td><b>Q{a["questionId"]}: {esc(a["question"])}</b><br>{esc(a["answer"])}</td>'
            + "".join(f"<td>{esc(vote(w))}</td>" for w in ["Katie", "Michelle", "Ali"])
            + f'<td>{a["matchingRecorded"]}/{a["usableRecorded"]} usable</td><td>{a["matchingOther"]}/{a["usableOther"]} usable</td><td><b>{a["decision"]}, {a["finalWeight"]:+d} points</b><br>{esc(a["reason"])}</td></tr>'
        )
    body.append("</table>")
body.append("</body></html>")
out.write_text("\n".join(body))
print(
    json.dumps(
        {
            "results": report["tunedConsensus"],
            "newRules": [
                {k: r[k] for k in ("category", "questionId", "answer", "weight")}
                for r in rules
            ],
        },
        indent=2,
    )
)
