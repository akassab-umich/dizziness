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
