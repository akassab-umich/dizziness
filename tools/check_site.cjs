/** Lightweight checks that need no patient data or package installation. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const web = path.resolve(__dirname, "../web");
for (const filename of fs
  .readdirSync(web)
  .filter((name) => name.endsWith(".js"))) {
  execFileSync(process.execPath, ["--check", path.join(web, filename)]);
}
global.window = {};
for (const name of ["questionnaire-data", "band-model"]) {
  require(path.join(web, name + ".js"));
}
const scoring = require(path.join(web, "model-core.js"));
const answers = { 259356: "dizziness" };
assert(scoring.score(window.NEBULA_BANDS.rules, answers).Bilateral.points <= 0);
const retired = new Set([
  "259358",
  "259359",
  "259365",
  "259368",
  "259373",
  "259376",
  "259377",
  "259388",
  "259424",
  "259425",
  "259426",
  "260448",
]);
assert(
  window.NEBULA_DATA.questions.every((question) => !retired.has(question.id)),
);
console.log("PASS: browser syntax, points model and retired questions.");

const importer = require(path.join(web, "case-import.js"));
const synthetic = {
  Responses: [],
  Sources: [{ SheetName: "NeuritisHypo (13)" }],
  Age: 45,
  Gender: "Male",
  Diagnoses: ["NeuritisHypo", "SchwannomaHypo"],
};
assert.deepEqual(
  importer.parse(synthetic, window.NEBULA_DATA.questions).recorded,
  ["Neuritis"],
);
assert.throws(
  () =>
    importer.parse(
      { ...synthetic, Diagnoses: ["SchwannomaHypo"] },
      window.NEBULA_DATA.questions,
    ),
  /no diagnosis with current scoring rules/,
);

const questionKinds = new Map(
  window.NEBULA_DATA.questions.map((question) => [question.id, question.kind]),
);
for (const rule of window.NEBULA_BANDS.rules) {
  const magnitude = Math.abs(rule.weight);
  assert([1, -1].includes(rule.direction));
  assert(
    rule.weight === 0 || Math.sign(rule.weight) === rule.direction,
    "Clinical direction changed",
  );
  const maximum = questionKinds.get(rule.questionId) === "multi" ? 10 : 30;
  assert(
    Number.isInteger(rule.weight) &&
      (magnitude === 0 || (magnitude >= 5 && magnitude <= maximum)),
    `Out-of-bounds answer weight: ${rule.category}, Q${rule.questionId}, ${rule.answer}`,
  );
}
