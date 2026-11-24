/** Audit selection gates and verify browser score parity for every fitting case. */
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
  fs.readFileSync(path.join(root, "private-results/sparse-model-report.json")),
);
assert.equal(input.cases.length, model.sparseFit.patients);
assert.equal(report.screening.length, model.rules.length);
for (const [j, r] of model.rules.entries()) {
  const a = report.screening[j];
  assert.equal(a.questionId, r.questionId);
  assert.equal(a.category, r.category);
  assert.equal(a.answer, r.answer);
  assert.equal(a.selected, !!r.weight);
  if (r.weight) {
    assert(a.eligible && a.expertDirectionAllowed);
    assert(a.usableRecorded >= 3 && a.usableOther >= 10);
    assert(a.bootstrapStability >= 0.8 && a.directionalSeparation >= 0.15);
  }
}
for (const [i, p] of input.cases.entries()) {
  assert.equal(report.cases[i].file, p.file);
  const scores = scoring.score(model.rules, p.answers);
  for (const [c, points] of Object.entries(report.cases[i].scores))
    assert.equal(scores[c].points, points);
}
console.log(
  JSON.stringify(
    {
      patients: input.cases.length,
      before: report.before,
      after: report.after,
    },
    null,
    2,
  ),
);
