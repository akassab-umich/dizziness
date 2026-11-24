# Current model: patient-supported sparse points (November 24)

The current website uses `train_sparse_model.py`. It screens all nine classes; it no longer freezes the seven older scorecards. Candidate clinical links and their signs are preserved. Links may be disabled with exactly zero weight. The two new classes must also agree in direction with the latest Ali assessment round; future questions remain excluded. Cardio and Anxiety remain assessment-only. The Hypofunction parent/subtype workflow has not been activated.

A rule needs at least three usable recorded cases and ten usable other cases, a smoothed signed answer-rate difference of at least 0.15, and directional support in at least 80% of 2,000 stratified bootstrap resamples. Positive rules must match at least two recorded cases. Negative rules must be absent in at least two recorded cases and match at least three other cases. These are exploratory inclusion gates, not calibrated probabilities or confidence guarantees. Unrecorded diagnoses are proxy negatives; normal/control patients are not established here.

At most eight questions per class are retained. For each checkbox question, only the strongest qualifying option per direction remains; each direction contributes at most ten points even when many options are checked. Nonzero magnitudes are integers: 5–25 for single choices, 5–10 for checkboxes. Class-balanced ranking, a weak points-band objective and shrinkage tune the amounts, followed by integer refinement. No intercept, new clinical link or sign reversal is allowed.

All 99 supported patients from the November 20 workbook are used for fitting and descriptive evaluation. Bootstrap screening and fitting on the same patients are not held-out validation. Sparse scores can be substantially lower; the earlier 40/50-point interpretations are not calibrated to this version and cannot be treated as clinical safety thresholds. Some classes cannot reach 50 points with the retained evidence; weights are not inflated to manufacture that threshold.

Prerequisites are the local consensus training input, current expert rule candidates, the Ali assessment round in `private-results/ali-assessments.json`, and the pre-sparse baseline in `private-results/sparse-baseline-model.js` (automatically saved on first fitting). Original patient sources and assessments stay outside public Git. Candidate directions live in `web/sparse-rule-candidates.js`; detailed patient rates and per-case outputs stay private.

```bash
python3 tools/train_sparse_model.py
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
node tools/test_assessment.cjs
```

Do not run the older workshop or consensus trainers over this model unless explicitly restoring the previous method. The pre-sparse deployment is locally backed up under `archive/pre-sparse-2026-11-24/` in the parent research folder.

---

## Previous methods (reference only)

# Current model: nine classes (November 24)

The seven November 20 workshop scorecards are frozen. Labyrinthitis Hypofunction and Schwannoma Hypofunction use only current-question answer options where Katie and Michelle share a direction. Future questions and one-reviewer-only classes are excluded. Neutral agreement contributes exactly zero, including untouched-center matches. Nonzero magnitudes use whole points: 5–25 for single choices and 5–10 for checkbox choices, with fixed signs.

The authoritative November 20 workbook yields 99 supported patients and 109 recorded diagnoses for these nine classes. Do not add older deliveries. Training uses all supported cases, with class-balanced pairwise ranking loss and shrinkage toward the reviewers’ mean magnitudes. Continuous bounded optimization is followed by integer local refinement. No intercept is learned. The seven original categories never move. Missing questions add zero. Training results are not held-out validation.

```bash
node tools/export_consensus_training.cjs /absolute/path/to/all-current-cases
python3 tools/train_consensus_model.py
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
node tools/test_assessment.cjs
```

Use the all-profile JSON folder as input; the importer excludes unsupported-only patients and retains supported labels on mixed cases. Exported `consensus-rules.js` records the agreed directions and raw reviewer judgments for auditing. Patient features, scores and local comparisons stay in ignored `private-results/`. The Assignment page remains editable for reviewers; using judgments in a test scorecard does not remove their assessment questions.

The earlier seven-class method below is retained for reference. Do not run its trainer over the expanded model.

---

# Local processing and model tools

Run commands from the repository root. Patient inputs and outputs stay local.

## Extract patients

```bash
python3 tools/extract_patients.py --help
```

This is the local Wolverine-compatible extractor. It keeps source workbook, worksheet and row references. Per the project linkage rule, identical complete question/answer sets are merged regardless of submission time, age, sex or diagnosis tab. This is an assumed patient match; conflicting demographics still require review.

## Current model: conservative workshop scorecard

The website uses the final October 28 workshop model, including the Meeting 1, Meeting 2, and severity changes, as its fixed reference. `web/notes-model.js` preserves that reference; `web/band-model.js` contains the updated deployed weights.

The November 20 workbook is the sole patient source. The supported cohort contains 92 patients and 100 recorded diagnoses across seven classes. Earlier workbooks are retained for comparison, not pooled into training. New suggested class links are saved locally for review; they have no agreed point values, and Labyrinthitis references a retired question. Those classes remain outside the deployed model. Do not use unsupported-only patients as negative training examples.

Prepare cases in a new local folder outside Git:

```bash
python3 tools/prepare_supported_cases.py /absolute/path/to/workbook.xlsx /absolute/path/to/new-case-folder
node tools/export_workshop_training.cjs /absolute/path/to/new-case-folder
python3 tools/train_workshop_model.py --version workshop-conservative-YYYY-MM-DD
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
```

Each nonzero integer rule can move by at most 25% of its workshop magnitude, rounded to the nearest whole point with a minimum radius of one point. Positive/negative directions stay unchanged. Zero rules, unobserved rules, and -100 exclusions remain fixed. Positive point totals stay within 75–125% of the workshop total. Existing expert answer links, conditional exceptions, and workshop severity/positional orderings are retained. Moderate severity remains exactly halfway between mild and severe. Rules can have magnitudes below 5 or checkbox weights above 10 when inherited from the workshop reference; the previous freely fitted model's bounds no longer apply.

Training metadata records the source workbook from the imported cases and rejects mixtures of workbooks. The version can be set explicitly with `--version`.

Training minimizes a class-balanced pairwise ranking loss with a penalty for moving away from workshop weights. Each class's mean recorded support cannot fall, and mean unrecorded support cannot rise, relative to the workshop reference on the same cohort. These are aggregate safeguards, not guarantees for each patient. Deterministic whole-number local search stops when its available moves cannot improve the objective, or at 1,000 accepted moves. It does not prove global optimality.

Missing answers contribute zero. Unrecorded diagnoses are proxy negatives, not confirmed clinical absences. Results on the same fitting cohort are descriptive training results, not validation on new patients. Raw point totals are not calibrated probabilities or established clinical rule-out thresholds.

Local inputs, audits, and evaluation reports are written under ignored `private-results/`. Never publish them. The evaluator checks browser scoring against the exported activation matrix, signs, weight bounds, frozen rules, category budgets, and class-average support safeguards.

## Older fitting tools

`export_band_training.cjs` and `train_point_bands.py` preserve the previous, more freely adjusted ordinal-band experiment. They are not the current training path. Do not run them over the deployed workshop scorecard accidentally. Earlier neural/logistic experiments and patient workbooks remain in local archives outside this public repository.
