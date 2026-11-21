/** Prepare local cases against the final October workshop scorecard. */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const importer = require("../web/case-import.js");
const scoring = require("../web/model-core.js");
global.window = {};
require("../web/questionnaire-data.js");
require("../web/notes-model.js");
const folder = path.resolve(process.argv[2]);
const cases = fs
  .readdirSync(folder, { recursive: true })
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((file) => ({
    file,
    ...importer.parse(
      JSON.parse(fs.readFileSync(path.join(folder, file))),
      window.NEBULA_DATA.questions,
      path.basename(file),
    ),
  }));
const categories = [...new Set(cases.flatMap((p) => p.recorded))].sort();
const anchor = window.NEBULA_NOTES;
const rules = anchor.rules
  .filter((r) => categories.includes(r.category))
  .map((r) => ({
    ...r,
    direction: Math.sign(r.weight),
    anchorWeight: r.weight,
    source: "October workshop scorecard",
  }));
for (const patient of cases)
  patient.hits = rules.map((rule) =>
    Number(scoring.matched(rule, patient.answers)),
  );
const payload = {
  sourceModel: anchor.version,
  sourceWorkbooks: [
    ...new Set(cases.flatMap((p) => p.sources.map((s) => s.SourceFile))),
  ].sort(),
  categories,
  rules,
  cases,
  questions: window.NEBULA_DATA.questions,
};
fs.mkdirSync(path.join(root, "private-results"), { recursive: true });
const output = path.join(root, "private-results/workshop-training-input.json");
fs.writeFileSync(output, JSON.stringify(payload, null, 2) + "\n");
console.log(
  JSON.stringify({
    patients: cases.length,
    diagnoses: cases.flatMap((p) => p.recorded).length,
    rules: rules.length,
    sourceModel: anchor.version,
    sha256: crypto
      .createHash("sha256")
      .update(fs.readFileSync(output))
      .digest("hex"),
  }),
);
