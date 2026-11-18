# Local processing and model tools

Run commands from the repository root. Patient inputs and outputs stay local.

## Extract patients

```bash
python3 tools/extract_patients.py --help
```

This is the local Wolverine-compatible extractor. It keeps source workbook, worksheet and row references. Per the project linkage rule, identical complete question/answer sets are merged regardless of submission time, age, sex or diagnosis tab. This is an assumed patient match; conflicting demographics still require review.

## Current model: conservative workshop scorecard

The website uses the final October 28 workshop model, including the Meeting 1, Meeting 2, and severity changes, as its fixed reference. `web/notes-model.js` preserves that reference; `web/band-model.js` contains the updated deployed weights.

The November 13 workbook is the sole patient source. The supported cohort contains 84 patients and 91 recorded diagnoses across seven classes. Other diagnosis classes remain on hold until clinical question/answer rules are supplied. Do not use unsupported-only patients as negative training examples.

Prepare cases in a new local folder outside Git:

```bash
python3 tools/prepare_supported_cases.py /absolute/path/to/workbook.xlsx /absolute/path/to/new-case-folder
node tools/export_workshop_training.cjs /absolute/path/to/new-case-folder
python3 tools/train_workshop_model.py
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
```

Each nonzero integer rule can move by at most 25% of its workshop magnitude, rounded to the nearest whole point with a minimum radius of one point. Positive/negative directions stay unchanged. Zero rules, unobserved rules, and -100 exclusions remain fixed. Positive point totals stay within 75–125% of the workshop total. Existing expert answer links, conditional exceptions, and workshop severity/positional orderings are retained. Moderate severity remains exactly halfway between mild and severe. Rules can have magnitudes below 5 or checkbox weights above 10 when inherited from the workshop reference; the previous freely fitted model's bounds no longer apply.

Training minimizes a class-balanced pairwise ranking loss with a penalty for moving away from workshop weights. Each class's mean recorded support cannot fall, and mean unrecorded support cannot rise, relative to the workshop reference on the same cohort. These are aggregate safeguards, not guarantees for each patient. Deterministic whole-number local search stops when its available moves cannot improve the objective, or at 1,000 accepted moves. It does not prove global optimality.

Missing answers contribute zero. Unrecorded diagnoses are proxy negatives, not confirmed clinical absences. Results on the same fitting cohort are descriptive training results, not validation on new patients. Raw point totals are not calibrated probabilities or established clinical rule-out thresholds.

Local inputs, audits, and evaluation reports are written under ignored `private-results/`. Never publish them. The evaluator checks browser scoring against the exported activation matrix, signs, weight bounds, frozen rules, category budgets, and class-average support safeguards.

## Older fitting tools

`export_band_training.cjs` and `train_point_bands.py` preserve the previous, more freely adjusted ordinal-band experiment. They are not the current training path. Do not run them over the deployed workshop scorecard accidentally. Earlier neural/logistic experiments and patient workbooks remain in local archives outside this public repository.
