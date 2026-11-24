/** Evaluate locally prepared cases without publishing patient-level results. */
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const scoring = require("../web/model-core.js");
global.window = {};
require("../web/band-model.js");
const model = window.NEBULA_BANDS;
if (model.remainingFit) {
  require("./evaluate_remaining_model.cjs");
  process.exit(0);
}
if (model.sparseFit) {
  require("./evaluate_sparse_model.cjs");
  process.exit(0);
}
if (model.consensusFit) {
  require("./evaluate_consensus_model.cjs");
  process.exit(0);
}
const workshop = model.constraints?.radiusFraction === 0.25;
const input = JSON.parse(
  fs.readFileSync(
    path.join(
      root,
      workshop
        ? "private-results/workshop-training-input.json"
        : "private-results/training-input.json",
    ),
  ),
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
  const direction =
    previous.get(byKey(rule)).direction ??
    Math.sign(previous.get(byKey(rule)).weight);
  assert.equal(rule.direction, direction);
  assert(rule.weight === 0 || Math.sign(rule.weight) === direction);
  const question = input.questions.find(
    (question) => question.id === rule.questionId,
  );
  assert(question);
  if (workshop) {
    const anchor = previous.get(byKey(rule)).weight;
    assert.equal(Math.sign(rule.weight), Math.sign(anchor));
    assert(
      Math.abs(rule.weight - anchor) <=
        Math.max(1, Math.round(Math.abs(anchor) * 0.25)),
    );
    if (
      anchor === 0 ||
      anchor === -100 ||
      !input.cases.some((p) => scoring.matched(rule, p.answers))
    )
      assert.equal(rule.weight, anchor);
  } else {
    assert(rule.weight === 0 || Math.abs(rule.weight) >= 5);
    assert(Math.abs(rule.weight) <= (question.kind === "multi" ? 10 : 30));
  }
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
if (workshop) {
  const audit = JSON.parse(
    fs.readFileSync(
      path.join(root, "private-results/workshop-training-audit.json"),
    ),
  );
  cases.forEach((patient, index) => {
    const scores = scoring.score(model.rules, patient.answers);
    classes.forEach((category, col) =>
      assert.equal(scores[category].points, audit.fittedScores[index][col]),
    );
  });
}
const report = {
  patients: cases.length,
  diagnoses: cases.reduce((sum, p) => sum + p.recorded.length, 0),
  version: model.version,
  evaluation: `Same ${cases.length} development patients for both models; equal weight per diagnosis class; not held-out validation.`,
  before: evaluate(input.rules),
  after: evaluate(model.rules),
};
if (workshop) {
  for (const category of classes) {
    const matchedCases = cases.filter((p) => p.recorded.includes(category));
    const otherCases = cases.filter((p) => !p.recorded.includes(category));
    const mean = (rules, patients) =>
      patients.reduce(
        (sum, p) => sum + scoring.score(rules, p.answers)[category].points,
        0,
      ) / patients.length;
    assert(
      mean(model.rules, matchedCases) >= mean(input.rules, matchedCases) - 1e-8,
    );
    assert(
      mean(model.rules, otherCases) <= mean(input.rules, otherCases) + 1e-8,
    );
    const budget = (rules) =>
      rules
        .filter((r) => r.category === category && r.weight > 0)
        .reduce((sum, r) => sum + r.weight, 0);
    assert(budget(model.rules) >= 0.75 * budget(input.rules));
    assert(budget(model.rules) <= 1.25 * budget(input.rules));
  }
}
fs.writeFileSync(
  path.join(root, "private-results/current-model-comparison.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
