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

Open `assessment.html`, or choose **Assignment** in the main app. Enter a first name and the same project access code, then select one of the diagnoses without scoring rules. Every existing multiple-choice question and answer is shown on one page, with an independent red-to-green significance slider centered on no effect. Numeric ratings and scale limits are hidden from the assessment interface; the underlying values are retained in the export.

Each diagnosis has a separate draft in this browser tab's session storage. Closing the tab can lose the draft; export the JSON when finished. The file is named `FirstName_Diagnosis.json` and contains the question IDs, wording, answers, signed ratings, questionnaire revision, and export time. `sliderAdjusted` distinguishes a slider that was moved (including deliberately returned to zero) from one left untouched. Assessments are downloaded locally and do not automatically alter the triage model.

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
