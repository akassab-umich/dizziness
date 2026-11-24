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
  ["Neuritis", "Schwannoma Hypofunction"],
);
assert.throws(
  () =>
    importer.parse(
      { ...synthetic, Diagnoses: ["UnspecifiedHypo"] },
      window.NEBULA_DATA.questions,
    ),
  /no diagnosis with current scoring rules/,
);

const questionKinds = new Map(
  window.NEBULA_DATA.questions.map((question) => [question.id, question.kind]),
);
const model = window.NEBULA_BANDS;
if (model.constraints?.radiusFraction === 0.25) {
  require(path.join(web, "notes-model.js"));
  const key = (rule) =>
    JSON.stringify([
      rule.category,
      rule.questionId,
      rule.answer,
      rule.unless || null,
    ]);
  const anchors = new Map(
    window.NEBULA_NOTES.rules.map((rule) => [key(rule), rule]),
  );
  assert.equal(model.basedOnVersion, window.NEBULA_NOTES.version);
  require(path.join(web, "consensus-rules.js"));
  const consensus = new Map(
    window.NEBULA_CONSENSUS.rules.map((r) => [key(r), r]),
  );
  const reviews = require(path.join(web, "assessment-reviews.js"));
  const ids = {
    "Labyrinthitis Hypofunction": "labyrinthitis-hypofunction",
    "Schwannoma Hypofunction": "schwannoma-hypofunction",
  };
  for (const rule of model.rules) {
    if (rule.consensus) {
      const reference = consensus.get(key(rule));
      assert(reference && questionKinds.has(rule.questionId));
      const votes = ["Katie", "Michelle"].map((name) =>
        reviews
          .find(
            (r) => r.reviewer === name && r.diagnosisId === ids[rule.category],
          )
          .ratings.find(
            (a) => a.questionId === rule.questionId && a.answer === rule.answer,
          ),
      );
      assert(
        votes.every((v) => v && Math.sign(v.significance) === rule.direction),
      );
      assert.equal(Math.sign(rule.weight), rule.direction);
      assert(Number.isInteger(rule.weight));
      assert(
        rule.direction === 0
          ? rule.weight === 0
          : Math.abs(rule.weight) >= 5 &&
              Math.abs(rule.weight) <= reference.maximum,
      );
      continue;
    }
    const anchor = anchors.get(key(rule));
    assert(anchor, "New scoring link was not in the workshop model");
    assert(
      questionKinds.has(rule.questionId),
      "Rule references a retired question",
    );
    assert.equal(rule.anchorWeight, anchor.weight);
    assert.equal(rule.direction, Math.sign(anchor.weight));
    assert.equal(Math.sign(rule.weight), Math.sign(anchor.weight));
    assert(Number.isInteger(rule.weight));
    const radius = Math.max(1, Math.round(Math.abs(anchor.weight) * 0.25));
    assert(
      Math.abs(rule.weight - anchor.weight) <= radius,
      "Workshop bound exceeded",
    );
    if (anchor.weight === 0 || anchor.weight === -100)
      assert.equal(rule.weight, anchor.weight);
    assert(model.trainedCategories.includes(rule.category));
  }
  for (const category of ["Neuritis", "Bilateral"]) {
    const weight = (answer) =>
      model.rules.find(
        (r) =>
          r.category === category &&
          r.questionId === "259366" &&
          r.answer === answer,
      ).weight;
    assert.equal(2 * weight("moderate"), weight("mild") + weight("severe"));
    if (category === "Neuritis")
      assert(
        weight("mild") >= weight("moderate") &&
          weight("moderate") >= weight("severe"),
      );
    else
      assert(
        weight("severe") >= weight("moderate") &&
          weight("moderate") >= weight("mild"),
      );
  }
  console.log(
    "PASS: workshop rule identities, integer bounds, zeros and clinical directions.",
  );
} else {
  for (const rule of model.rules) {
    const magnitude = Math.abs(rule.weight);
    assert([1, -1].includes(rule.direction));
    assert(rule.weight === 0 || Math.sign(rule.weight) === rule.direction);
    const maximum = questionKinds.get(rule.questionId) === "multi" ? 10 : 30;
    assert(
      Number.isInteger(rule.weight) &&
        (magnitude === 0 || (magnitude >= 5 && magnitude <= maximum)),
    );
  }
}
