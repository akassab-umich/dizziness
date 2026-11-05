# Local processing and model tools

Run commands from the repository root. Patient inputs and outputs stay local.

## Extract patients

```bash
python3 tools/extract_patients.py --help
```

This is the local Wolverine-compatible extractor. It keeps source workbook, worksheet and row references. Per the project linkage rule, identical complete question/answer sets are merged regardless of submission time, age, sex or diagnosis tab. This is an assumed patient match; conflicting demographics still require review.

## Model

Build a new case folder from the sole current workbook first:

```bash
python3 tools/prepare_supported_cases.py /absolute/path/to/workbook.xlsx /absolute/path/to/new-case-folder
```

Then export and fit:

```bash
node tools/export_band_training.cjs /absolute/path/to/cases
python3 tools/train_point_bands.py --help
```

This preserves the separate integer points optimization used for the existing Tuned Evidence Model. Its active answer links come from `web/band-model.js`, while weight magnitudes are anchored to the earlier reviewed `web/notes-model.js`. Only represented supported classes and active rules are included. Unsupported labels must be removed and unsupported-only cases excluded before export. Running the optimizer changes `web/band-model.js`; review its output and predictions before publishing. Its research thresholds are not validated clinical rule-out thresholds.

Past graph/neural experiments and historical reports remain in the legacy private repository rather than in the active app's code path.

Current training source: November 3 workbook only. The reviewed supported case set contains 75 patients and 81 recorded diagnoses across seven classes. Patient data and the exclusion audit remain outside Git.

Run `node tools/evaluate_current_model.cjs` after training to validate the integer/sign constraints and compute a local before/after report. Its patient inputs and reports are ignored by Git.

The solver records time limits and optimality gaps in its private audit. If unrestricted point-distance refinement finds no feasible result in time, it fixes the first-pass band assignments and refines the weights within those bands. This preserves the primary fit but does not prove a globally best distance or smallest weight change.

Restrained calibration: positive weights stay within 25% of their reviewed anchor (at least one point of room for small weights). Negative magnitudes may soften by that allowance but can never exceed the reviewed penalty. Signs and constant-feature weights are preserved. This intentionally sacrifices some training fit to keep the scoring scale familiar.
