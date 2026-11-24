/** Verify exported browser scores equal the fitted local audit, including all labels. */
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict");
const root = path.resolve(__dirname, ".."),
  scoring = require("../web/model-core.js");
global.window ||= {};
require("../web/band-model.js");
const model = window.NEBULA_BANDS;
const input = JSON.parse(
  fs.readFileSync(
    path.join(root, "private-results/consensus-training-input.json"),
  ),
);
const report = JSON.parse(
  fs.readFileSync(
    path.join(root, "private-results/consensus-model-report.json"),
  ),
);
assert.deepEqual(
  model.rules.filter((r) => !r.consensus),
  input.baseModel.rules,
);
for (const [i, p] of input.cases.entries()) {
  const scores = scoring.score(model.rules, p.answers);
  for (const [category, points] of Object.entries(report.cases[i].scores))
    assert.equal(scores[category].points, points);
}
console.log(
  JSON.stringify(
    {
      patients: report.patients,
      diagnoses: report.diagnoses,
      initial: report.initialConsensus,
      tuned: report.tunedConsensus,
    },
    null,
    2,
  ),
);

if (model.consensusFit?.clinicalShortlistRetained) {
  for (const c of ["Labyrinthitis Hypofunction", "Schwannoma Hypofunction"]) {
    const hearing = model.rules.filter(
      (r) => r.category === c && r.questionId === "259415",
    );
    assert.equal(hearing.length, 2);
    assert.equal(hearing[0].weight, hearing[1].weight);
    const byQuestion = new Map();
    for (const r of model.rules.filter((r) => r.category === c)) {
      const key = JSON.stringify([r.questionId, Math.sign(r.weight)]);
      byQuestion.set(key, (byQuestion.get(key) || 0) + Math.abs(r.weight));
    }
    for (const [key, sum] of byQuestion)
      if (JSON.parse(key)[0] === "259371") assert(sum <= 10);
  }
}
