# Dizziness Triage

Website: https://akassab-umich.github.io/dizziness/

This is the main repository for the app. It contains the browser code, model definitions, and tools for processing and training locally. The old `dizziness-source` repository contains earlier experiments and is retained as a legacy archive.

## Start here

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory web
```

Open http://127.0.0.1:8765/. Use the project access code. You can answer questions manually or drop a case JSON anywhere on the page. Patient files are read locally by the browser.

## Where to find things

| Folder | Purpose |
| --- | --- |
| `web/` | Website deployed by GitHub Pages |
| `tools/` | Local extraction, feature preparation, and model training |
| `docs/` | Model descriptions and development guide |
| `data/` | Your local patient files; ignored by Git |
| `private-results/` | Local training inputs and patient results; ignored by Git |

Start with `web/app.js` to understand question navigation and scoring. `web/case-import.js` maps patient JSON into answers. `web/model-core.js` computes points. `web/research.js` builds the explanation dialogs. `web/question-viewer.js` handles the second viewer.

The website uses **Model v1**, the optimized integer points model in `web/band-model.js`.

Model definition files are generated artifacts. Edit their training tools or expert rule sources rather than manually reformatting their arrays.

## Local data and training

Install the optional processing dependencies with `python3 -m pip install -r requirements.txt`. Running the website needs only Python's static server, or any static file server.

Read [the tools guide](docs/TOOLS.md) before processing or retraining. Retraining is an explicit action; editing questions or importing a case never retrains the model automatically.

## Docker

```bash
docker build -t dizziness .
docker run --rm -p 8765:80 dizziness
```

## Publishing

Push website changes to `main`. GitHub Actions publishes **only `web/`** to GitHub Pages. You no longer need a second repository or a copy-and-publish script. Check the deployment result in Actions.

The access-code screen is a convenience gate; browser source and model files are public. Never commit patient workbooks, patient JSON files, patient results, tokens, or private model reference datasets. `.gitignore` helps avoid accidental additions but does not replace reviewing a commit.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the editing and review workflow.
