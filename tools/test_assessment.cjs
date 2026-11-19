/** Check exported ratings retain every option and the selected diagnosis. */
const assert = require("node:assert/strict");
const core = require("../web/assessment-core.js");
global.window = {};
require("../web/questionnaire-data.js");
const data = window.NEBULA_DATA;
const questions = core.questions(data);
assert.equal(questions.length, 45);
const input = {
  firstName: "  Katie  ",
  diagnosisId: "labyrinthitis-hypofunction",
  ratings: { 259356: [10, -10, 0], 259357: [3, -2] },
  adjusted: { 259356: [0, 1, 2], 259357: [0, 1] },
  data,
  exportedAt: "2026-11-19T12:00:00Z",
};
const output = core.exportAssessment(input);
assert.equal(output.firstName, "Katie");
assert.equal(output.diagnosis.id, input.diagnosisId);
assert.equal(output.questions.length, questions.length);
assert.equal(output.questions.flatMap((q) => q.answers).length, 194);
assert.deepEqual(
  output.questions[0].answers.map((a) => a.significance),
  [10, -10, 0, 0],
);
assert.equal(output.questions[0].answers[2].sliderAdjusted, true);
assert.equal(output.questions[0].answers[3].sliderAdjusted, false);
for (const [index, question] of questions.entries()) {
  assert.deepEqual(
    output.questions[index].answers.map((a) => a.answer),
    question.options,
  );
  assert.equal(output.questions[index].questionId, question.id);
}
assert.equal(
  core.filename("Katie", output.diagnosis),
  "Katie_Labyrinthitis_Hypofunction.json",
);
assert(!core.filename("../Katie /", output.diagnosis).includes("/"));
assert.throws(() => core.exportAssessment({ ...input, firstName: " " }));
assert.throws(() => core.exportAssessment({ ...input, diagnosisId: "BPPV" }));
const invalid = core.exportAssessment({
  ...input,
  ratings: { 259356: [100, -11, 1.5, "7"] },
});
assert.deepEqual(
  invalid.questions[0].answers.map((a) => a.significance),
  [0, 0, 0, 0],
);
for (const diagnosis of core.diagnoses) {
  assert.equal(
    core.exportAssessment({ ...input, diagnosisId: diagnosis.id }).diagnosis.id,
    diagnosis.id,
  );
}
const future = output.questions.filter(
  (q) => q.status === "future-implementation",
);
assert.equal(future.length, 12);
assert.equal(future[0].questionId, "future-01");
assert.equal(future[11].kind, "text");
assert.deepEqual(future[11].answers, []);
assert.equal(output.questions.filter((q) => q.status === "current").length, 33);
assert.equal(output.proposalRevision, "future-proposals-2026-11-19");
assert(!data.questions.some((q) => q.id.startsWith("future-")));
console.log(
  "PASS: complete assessment exports, signed/zero ratings, bounds, names and diagnosis separation.",
);
