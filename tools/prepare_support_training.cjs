/** Build local training inputs using the same case importer as the website. */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const folder = path.resolve(process.argv[2] || path.join(root, "data/cases"));
const importer = require("../web/case-import.js");
const scoring = require("../web/model-core.js");
global.window = {};
require("../web/questionnaire-data.js");
require("../web/neural-spec.js");
const questions = window.NEBULA_DATA.questions;
const spec = window.NEURAL_SPEC;
const cases = fs
  .readdirSync(folder, { recursive: true })
  .filter((file) => file.endsWith(".json"))
  .sort()
  .map((file) => {
    const bytes = fs.readFileSync(path.join(folder, file));
    const patient = importer.parse(
      JSON.parse(bytes),
      questions,
      path.basename(file),
    );
    return {
      ...patient,
      file,
      sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
      observed: spec.questionIds.map((id) =>
        Number(scoring.values(patient.answers[id]).length > 0),
      ),
      selected: spec.features.map((rule) =>
        Number(
          scoring
            .values(patient.answers[rule.questionId])
            .includes(scoring.norm(rule.answer)),
        ),
      ),
      excepted: spec.features.map((rule) =>
        Number(
          Boolean(rule.unless) &&
            scoring
              .values(patient.answers[rule.unless.questionId])
              .some((answer) =>
                rule.unless.answers.map(scoring.norm).includes(answer),
              ),
        ),
      ),
      labels: spec.categories.map((category) =>
        Number(patient.recorded.includes(category)),
      ),
    };
  });
if (!cases.length) throw new Error("No patient JSON files found.");
const output = path.join(root, "private-results");
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(
  path.join(output, "neural-input.json"),
  JSON.stringify({ spec, cases }, null, 2),
);
console.log(`Prepared ${cases.length} cases in ignored private-results/.`);
