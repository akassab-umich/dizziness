/** Evaluate locally prepared cases without publishing patient-level results. */
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const scoring = require("../web/model-core.js");
global.window = {};
require("../web/band-model.js");
const model = window.NEBULA_BANDS;
const input = JSON.parse(
  fs.readFileSync(path.join(root, "private-results/training-input.json")),
);
const byKey = (rule) =>
  JSON.stringify([
    rule.category,
    rule.questionId,
    rule.answer,
    rule.unless || null,
  ]);
const previous = new Map(input.rules.map((rule) => [byKey(rule), rule]));
assert.equal(model.rules.length, input.rules.length);
for (const rule of model.rules) {
  assert(Number.isInteger(rule.weight));
  assert.equal(
    Math.sign(rule.weight),
    Math.sign(previous.get(byKey(rule)).weight),
  );
  assert(Math.abs(rule.weight) <= 100);
  const anchor = previous.get(byKey(rule)).weight;
  const allowance = Math.max(1, Math.floor(Math.abs(anchor) * 0.25));
  assert(Math.abs(rule.weight - anchor) <= allowance);
  if (anchor < 0) assert(Math.abs(rule.weight) <= Math.abs(anchor));
}
const cases = input.cases;
const classes = input.categories;
function evaluate(rules) {
  const byClass = Object.fromEntries(
    classes.map((category) => [
      category,
      { patients: 0, top1: 0, top3: 0, above50: 0, zeroOrBelow: 0 },
    ]),
  );
  for (const patient of cases) {
    const scores = scoring.score(rules, patient.answers);
    const ranked = Object.keys(scores).sort(
      (a, b) => scores[b].points - scores[a].points || a.localeCompare(b),
    );
    for (const category of patient.recorded) {
      const row = byClass[category];
      row.patients++;
      row.top1 += Number(ranked[0] === category);
      row.top3 += Number(ranked.slice(0, 3).includes(category));
      row.above50 += Number(scores[category].points > 50);
      row.zeroOrBelow += Number(scores[category].points <= 0);
    }
  }
  return {
    byClass,
    ...Object.fromEntries(
      ["top1", "top3", "above50", "zeroOrBelow"].map((metric) => [
        metric,
        classes.reduce(
          (sum, c) => sum + byClass[c][metric] / byClass[c].patients,
          0,
        ) / classes.length,
      ]),
    ),
  };
}
for (const patient of cases) {
  assert(patient.recorded.every((category) => classes.includes(category)));
  const scores = scoring.score(model.rules, patient.answers);
  for (const category of classes) {
    const expected = model.rules.reduce(
      (sum, rule, index) =>
        sum +
        (rule.category === category ? patient.hits[index] * rule.weight : 0),
      0,
    );
    assert.equal(scores[category].points, expected);
  }
}
const report = {
  patients: cases.length,
  diagnoses: cases.reduce((sum, p) => sum + p.recorded.length, 0),
  version: model.version,
  evaluation:
    "Same 75 development patients for both models; equal weight per diagnosis class; not held-out validation.",
  before: evaluate(input.rules),
  after: evaluate(model.rules),
};
fs.writeFileSync(
  path.join(root, "private-results/november-3-model-comparison.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
