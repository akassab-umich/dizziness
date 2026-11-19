# Dizziness Triage

Website: https://akassab-umich.github.io/dizziness/

This is the main repository for the app. It contains the browser code, model definitions, and tools for processing and training locally. Earlier experiments are retained in local archives outside this public repository.

## Start here

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory web
```

Open http://127.0.0.1:8765/. Use the project access code. You can answer questions manually or drop a case JSON anywhere on the page. Patient files are read locally by the browser.

## Where to find things

| Folder             | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `web/`             | Website deployed by GitHub Pages                          |
| `tools/`           | Local extraction, feature preparation, and model training |
| `docs/`            | Model descriptions and development guide                  |
| `data/`            | Your local patient files; ignored by Git                  |
| `private-results/` | Local training inputs and patient results; ignored by Git |

Start with `web/app.js` to understand question navigation and scoring. `web/case-import.js` maps patient JSON into answers. `web/model-core.js` computes points. `web/research.js` builds the explanation dialogs. `web/question-viewer.js` handles the second viewer.

The website uses **Model**, the conservatively updated workshop points model in `web/band-model.js`. Its reference weights are preserved in `web/notes-model.js`.

Model definition files are generated artifacts. Edit their training tools or expert rule sources rather than manually reformatting their arrays.

## Local data and training

Install the optional processing dependencies with `python3 -m pip install -r requirements.txt`. Running the website needs only Python's static server, or any static file server.

Read [the tools guide](docs/TOOLS.md) before processing or retraining. Retraining is an explicit action; editing questions or importing a case never retrains the model automatically.

## Assignment page

Open `assessment.html`, or choose **Assignment** in the main app. Enter a first name and the same project access code, then select a diagnosis. Existing scored diagnoses show only the 12 proposed questions. Current model references are retained in the JSON export but are not rendered. Diagnoses without scoring rules allow all answer sliders to be rated. Every existing multiple-choice question and answer is shown on one page, followed by the 12 agreed proposed questions in plain cards with a blue **(New Question, not yet in Epic)** annotation beside the question. The proposed free-text question has no answer sliders. Each answer is shown with an independent red-to-green significance slider centered on no effect. Numeric ratings and scale limits are hidden from the assessment interface; the underlying values are retained in the export.

After sign-in, the main menu shows a tile for each diagnosis. Choose one to open its assessment. Progress stays only in page memory and is not saved in browser storage. Export a JSON file before leaving. **Back to main menu** opens a reminder; **Stay here** keeps the assessment, while confirming that the file was downloaded clears it and returns to the tiles. Starting that diagnosis again begins a new assessment.

The downloaded file is named `FirstName_Diagnosis.json` and contains question IDs, wording, answers, signed ratings, questionnaire revision, and export time. `sliderAdjusted` distinguishes a slider that was moved (including deliberately returned to zero) from one left untouched. Assessments do not automatically alter the triage model.

Exports mark each question as `current` or `future-implementation` and include the proposal revision. Proposed question IDs are local assessment identifiers, not assigned clinical question IDs. They do not appear in the patient questionnaire or model.

For existing classes, model points are clipped to the hidden -10 to +10 slider range for reference. The export retains exact `modelPoints` and any conditional exceptions in `modelRules`. Fixed values ignore draft or user-supplied edits. `reviewerRatings` contains only editable responses; `collectionScope` is `future-questions-only` for existing diagnoses and `all-questions` for new diagnoses. This separates model references from new team judgments.

Run `node tools/test_assessment.cjs` to check export completeness, signed ratings, filenames, and diagnosis identities.

## Docker

```bash
docker build -t dizziness .
docker run --rm -p 8765:80 dizziness
```

## Publishing

Push website changes to `main`. GitHub Actions publishes **only `web/`** to GitHub Pages. You no longer need a second repository or a copy-and-publish script. Check the deployment result in Actions.

The access-code screen is a convenience gate; browser source and model files are public. Never commit patient workbooks, patient JSON files, patient results, tokens, or private model reference datasets. `.gitignore` helps avoid accidental additions but does not replace reviewing a commit.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the editing and review workflow.
