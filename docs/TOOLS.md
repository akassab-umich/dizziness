# Current update — remaining two classes (November 24)

The current model has eleven categories. The latest changes affect ONLY Cardiovascular / Orthostatic and Anxiety without PPPD. All nine previous scorecards remain byte-for-byte unchanged. Unspecified Hypofunction remains unscored. Only existing questionnaire questions enter scoring; proposed questions remain assessment-only. The Hypofunction parent/subtype workflow is not activated.

Michelle's and Katie's explicit current-answer directions have weights 65% and 35%, respectively. Ali is not a voter for these two classes. Untouched centers are missing judgments. Explicit neutral participates in the weighted choice. Slider magnitudes do not become points. A clinical shortlist independently determines which directional proposals are eligible; generic or contradictory links stay neutral even if a survey gave them points. Missing Michelle responses are not invented from Katie's responses. The per-answer report records both directions and the reason for selection/neutralization.

Cardio uses six existing questions: standing-related symptoms, position-change history, brief duration, arising/standing provocation, fainting/lightheadedness and palpitations. These questions do not measure orthostatic blood pressure or prove a cardiac cause. Anxiety uses four: lightheadedness, stress-related worsening, panic/palpitations and anxiety/depression history. Those do not establish a psychological cause or exclude PPPD. Chest pain and neurological symptoms are not used as generic evidence that dizziness is anxiety-related.

There are 102 merged supported questionnaire profiles and 113 recorded diagnoses from the November 20 workbook. This includes only three Cardio and one Anxiety case. Cardio point adjustments stay within two points of modest clinical priors and are strongly regularized. Anxiety points are frozen at their clinical priors; the one case is evaluated descriptively, not used to tune the model. All checklist questions contribute at most ten points in total for each newly added class. Results are on the same data, not held-out validation. Unrecorded labels are proxy negatives.

```bash
node tools/export_remaining_training.cjs /absolute/path/to/november-20-all
python3 tools/train_remaining_classes.py
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
node tools/test_assessment.cjs
```

The exporter writes a new local snapshot and refuses to overwrite an existing input. Preserve it before rebuilding so frozen scorecard identity remains auditable. Local input, patient scores and per-answer audits remain under ignored private-results/. Clinical references are the Barany hemodynamic orthostatic dizziness consensus (https://pmc.ncbi.nlm.nih.gov/articles/PMC9249281/) and NIMH panic-disorder information (https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms).

The two new Michelle JSONs are archived outside Git in the research data/assessments/2026-11-24 folder. `build_assessment_reviews.py` accepts ZIP and individual JSON files to update the display-only slider references and completion names. Reference marks do not initialize or overwrite an active reviewer's sliders or exports. Existing-class assessments are not restructured.

---

## Earlier methods — reference only

# Current method — reviewed existing questions for the two new classes

The original seven November 20 scorecards remain EXACTLY unchanged. Only Labyrinthitis Hypofunction and Schwannoma Hypofunction are reviewed and recalibrated. Use `train_reviewed_new_classes.py`; the two-question-only forward-selection experiment is superseded. Future/proposed questions, Cardio, Anxiety and the Hypofunction parent/subtype workflow are not activated.

A declared clinical shortlist retains nine current questions for Labyrinthitis and four for Schwannoma. These are research judgments for clinician review, not new diagnostic criteria. Hearing involvement, duration and onset receive priority for Labyrinthitis; hearing/asymmetry, gradual onset and balance for Schwannoma. Generic symptom severity, absence of triggers, absence of hearing-eyes-move and attack-linked hearing/ringing interpretations are held neutral for the new classes. Broad generic symptoms do not accumulate independent points. The current hearing questions do not establish that hearing loss began with vertigo; the report flags that limitation.

Each permitted rule needs two explicit same-direction current-question ratings and no explicit opposite rating. An untouched slider is missing judgment, not an explicit neutral. The available files under Katie/Michelle/Ali are assessed separately; independence of those submissions is not assumed. Existing-class model references inside exports are not counted as new clinical votes. Slider magnitudes are never point values. Original seven-category rule signs and values are unchanged.

The declared shortlist and sign constraints stay fixed during regularized fitting. Stronger priors protect the three-case and six-case groups from being reduced to only a couple of data-correlated questions. Nonzero core/supporting bounds are declared per rule; optional weak rules may become zero. Patient data tune magnitudes against class-balanced ranking and weak common point-band targets; values are refined to integers. The study's 99 fitting cases come only from the November 20 workbook. Unrecorded diagnoses are proxy negatives, not confirmed absences. No held-out validation is claimed. The clinical shortlist may fit the current cases less well than a more aggressive data-selected model; that trade-off is reported rather than hidden.

Left/right hearing-test weights are tied. Shared hearing-complaint plus unilateral-test evidence is bounded to 25 points for Labyrinthitis and 30 for Schwannoma on a patient (one ear choice per single-select). The two selected Labyrinthitis movement options jointly contribute no more than ten points. The original seven scoring equations and explanation logic do not change.

```bash
python3 tools/train_reviewed_new_classes.py
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
node tools/test_assessment.cjs
```

Prerequisites: local consensus training input, pre-sparse baseline, November 24 assessment ZIPs and `Desktop/Ali_Bilateral.zip`. These remain outside Git; the script reads them without extracting executable content. Public `reviewed-rule-policy.js` contains only permitted directions, rule limits, first-name survey directions and clinical source links. No patient records or individual case results are published. The local HTML report covers every current answer option for the two new classes, with directions, patient counts, decisions and reasons. The evaluator verifies original-scorecard identity and all browser scores against fitted results.

Clinical references:

- https://www.hopkinsmedicine.org/health/conditions-and-diseases/labyrinthitis-and-vestibular-neuritis
- https://www.nidcd.nih.gov/health/vestibular-schwannoma-acoustic-neuroma-and-neurofibromatosis

---

## Superseded methods — reference only

# Current method — stabilize only the two new classes

The original seven November 20 scorecards are restored exactly. `train_stable_new_classes.py` adjusts only Labyrinthitis Hypofunction and Schwannoma Hypofunction. It uses current Epic questionnaire questions only. Future/proposed questions are excluded. Cardio and Anxiety remain assessment-only. The Hypofunction parent/subtype workflow is not activated.

Katie/Michelle/Ali-round agreement determines permitted directions only; slider magnitudes never become points or point targets. Neutral and unsupported links stay zero. Among permitted directions, smoothed patient answer-rate separation screens for a directionally consistent signal. Stratified resampling reliability ranks competing checkbox options softly, without an 80% cutoff. Penalized forward selection chooses questions using a class-balanced ranking loss, weak common score-band targets, regularization, and a question penalty that depends on the size of the recorded class. There is a six-question ceiling per new class, not a requirement to use six. Checkbox contributions are limited to ten points per direction per question; single-choice nonzero magnitudes are 5–25 points. Whole-point refinement follows bounded fitting. No intercept is added.

The November 20 workbook supplies the same 99 supported patients and 109 recorded diagnoses. Unrecorded diagnoses are proxy negatives. Selection and fitting use the same patients; resampling reliability is not held-out validation. Three Labyrinthitis cases and six Schwannoma cases provide very limited evidence. Existing scores are restored on their previous scale; new-class thresholds are still exploratory.

Local prerequisites: consensus training input, the Ali assessment round in `private-results/ali-assessments.json`, and `private-results/sparse-baseline-model.js` containing the pre-sparse nine-class baseline. Detailed audits and per-case results stay local. Original assessments remain in the parent research folder.

```bash
python3 tools/train_stable_new_classes.py
node tools/evaluate_current_model.cjs
node tools/check_site.cjs
node tools/test_assessment.cjs
```

The evaluator checks that all original seven-category rules are byte-for-byte equal to the training baseline and that every browser score agrees with the fitted audit. Original-class rankings can still change because the two new categories compete in the same list; original-class point scores cannot change.

---

## Superseded all-class sparsity experiment — do not run over the current model

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
