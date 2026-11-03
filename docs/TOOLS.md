# Local processing and model tools

Run commands from the repository root. Patient inputs and outputs stay local.

## Extract patients

```bash
python3 tools/extract_patients.py --help
```

This is the local Wolverine-compatible extractor. It keeps source workbook, worksheet and row references. Its duplicate matching includes submission time, age, sex, and structured responses; conflicting demographics require review and explicit corrections. Never assume matching answers alone prove identity.

## Learned Support Model

Put reviewed case JSONs in ignored `data/cases/`, or supply a case folder explicitly:

```bash
node tools/prepare_support_training.cjs /absolute/path/to/cases
python3 tools/train_support_model.py --balanced
```

The default evaluates and writes private results without changing the website. `--deploy-local` additionally replaces `web/logistic-model.js`; inspect and test before committing that generated file. The model uses sign constraints, regularization and nested patient folds. Class balancing favors diagnosis ranking; displayed percentages are experimental support rather than calibrated diagnostic probabilities.

`training_features.py` contains the shared missing-answer encoder and metrics. It has no training entry point.

## Tuned Evidence Model

```bash
node tools/export_band_training.cjs /absolute/path/to/cases
python3 tools/train_point_bands.py --help
```

This preserves the separate integer points optimization used for the existing Tuned Evidence Model. Its starting rules are `web/notes-model.js`. Running the optimizer changes `web/band-model.js`; review its output and predictions before publishing. It is not the logistic model and its research thresholds are not validated clinical rule-out thresholds.

Past graph/neural experiments and historical reports remain in the legacy private repository rather than in the active app's code path.
