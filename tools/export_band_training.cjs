// Use exactly the same parser and rule activation logic as the questionnaire.
const fs = require("fs"),
  path = require("path"),
  crypto = require("crypto");
const root = path.resolve(__dirname, ".."),
  M = require("../web/model-core.js"),
  I = require("../web/case-import.js");
global.window = {};
require("../web/questionnaire-data.js");
require("../web/band-model.js");
require("../web/notes-model.js");
const D = window.NEBULA_DATA,
  prior = JSON.parse(JSON.stringify(window.NEBULA_BANDS));
const anchor = window.NEBULA_NOTES;
const ruleKey = (rule) =>
  JSON.stringify([rule.category, rule.questionId, rule.answer]);
const anchors = new Map(anchor.rules.map((rule) => [ruleKey(rule), rule]));
for (const rule of prior.rules) {
  const original = anchors.get(ruleKey(rule));
  if (!original || Math.sign(original.weight) !== Math.sign(rule.weight))
    throw Error("Missing or incompatible reviewed weight");
  rule.weight = original.weight;
}
prior.version = anchor.version || anchor.name;
const folder = path.resolve(process.argv[2] || path.join(root, "data/cases"));
const files = fs
  .readdirSync(folder, { recursive: true })
  .filter((f) => f.endsWith(".json"))
  .sort();
const cases = files.map((file) => {
  const raw = fs.readFileSync(path.join(folder, file)),
    p = I.parse(JSON.parse(raw), D.questions, path.basename(file));
  return {
    ...p,
    file,
    sha256: crypto.createHash("sha256").update(raw).digest("hex"),
    hits: prior.rules.map((r) => Number(M.matched(r, p.answers))),
  };
});
// Only classes represented by eligible cases participate in this training run.
const categories = [
  ...new Set(cases.flatMap((patient) => patient.recorded)),
].sort();
const questionIds = new Set(D.questions.map((question) => question.id));
prior.rules = prior.rules.filter(
  (rule) =>
    categories.includes(rule.category) &&
    questionIds.has(rule.questionId) &&
    rule.weight !== 0,
);
for (const patient of cases)
  patient.hits = prior.rules.map((rule) =>
    Number(M.matched(rule, patient.answers)),
  );
if (!cases.length || cases.some((patient) => !patient.recorded.length))
  throw Error("Missing supported labels");
if (prior.rules.some((r) => !Number.isInteger(r.weight)))
  throw Error("Prior must contain integer weights");
const payload = {
  schema: 1,
  sourceModel: prior.version || prior.name,
  categories,
  rules: prior.rules,
  questions: D.questions,
  cases,
};
fs.mkdirSync(path.join(root, "private-results"), { recursive: true });
fs.writeFileSync(
  path.join(root, "private-results/training-input.json"),
  JSON.stringify(payload, null, 2),
);
console.log(
  JSON.stringify({
    patients: cases.length,
    diagnoses: cases.reduce((n, p) => n + p.recorded.length, 0),
    classes: Object.fromEntries(
      categories.map((c) => [
        c,
        cases.filter((p) => p.recorded.includes(c)).length,
      ]),
    ),
    rules: prior.rules.length,
    parseIssues: cases.flatMap((p) => p.issues).length,
  }),
);
