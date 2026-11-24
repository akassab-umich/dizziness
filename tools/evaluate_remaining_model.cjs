/** Verify frozen nine-model identity and all eleven-class browser scores. */
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict");
const root = path.resolve(__dirname, ".."),
  score = require("../web/model-core.js");
global.window ||= {};
require("../web/band-model.js");
const model = window.NEBULA_BANDS,
  input = JSON.parse(
    fs.readFileSync(
      path.join(root, "private-results/remaining-training-input.json"),
    ),
  ),
  report = JSON.parse(
    fs.readFileSync(
      path.join(root, "private-results/remaining-model-report.json"),
    ),
  );
assert.deepEqual(
  model.rules.filter((r) => !r.remaining),
  input.baseModel.rules,
);
assert.equal(input.cases.length, model.remainingFit.patients);
for (const [i, p] of input.cases.entries()) {
  assert.equal(p.file, report.cases[i].file);
  const actual = score.score(model.rules, p.answers);
  for (const [category, points] of Object.entries(report.cases[i].scores))
    assert.equal(actual[category].points, points);
}
for (const category of model.remainingFit.newClasses) {
  const rules = model.rules.filter(
    (r) => r.remaining && r.category === category,
  );
  const questions = new Map();
  for (const r of rules) {
    const q = input.questions.find((q) => q.id === r.questionId);
    assert(q && ["single", "multi"].includes(q.kind));
    if (q.kind === "multi")
      questions.set(q.id, (questions.get(q.id) || 0) + Math.abs(r.weight));
  }
  for (const total of questions.values()) assert(total <= 10);
}
console.log(
  JSON.stringify(
    { patients: input.cases.length, results: report.results },
    null,
    2,
  ),
);
