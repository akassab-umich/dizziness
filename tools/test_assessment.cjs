/** Check exported ratings retain every option and the selected diagnosis. */
const assert = require("node:assert/strict");
const core = require("../web/assessment-core.js");
global.window = {};
require("../web/questionnaire-data.js");
require("../web/band-model.js");
const data = window.NEBULA_DATA;
const questions = core.questions(data);
assert.equal(questions.length, 45);
const input = {
  firstName: "  Katie  ",
  diagnosisId: "labyrinthitis-hypofunction",
  ratings: { 259356: [10, -10, 0], 259357: [3, -2] },
  adjusted: { 259356: [0, 1, 2], 259357: [0, 1] },
  data,
  model: window.NEBULA_BANDS,
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
const existing = core.exportAssessment({
  ...input,
  diagnosisId: "bppv",
  ratings: { 259364: [-10, 0], "future-02": [-8, 0] },
  adjusted: { 259364: [0], "future-02": [0] },
});
assert.equal(existing.collectionScope, "future-questions-only");
assert.equal(existing.reviewerRatings.length, 50);
assert(
  existing.reviewerRatings.every(
    (r) => r.status === "future-implementation" && !r.fixed,
  ),
);
const fixedYes = existing.questions.find((q) => q.questionId === "259364")
  .answers[0];
assert.equal(fixedYes.significance, 10);
assert.equal(fixedYes.fixed, true);
assert.equal(fixedYes.sliderAdjusted, false);
assert.equal(
  fixedYes.modelPoints,
  window.NEBULA_BANDS.rules.find(
    (r) =>
      r.category === "BPPV" && r.questionId === "259364" && r.answer === "Yes",
  ).weight,
);
assert.equal(
  existing.questions.find((q) => q.questionId === "future-02").answers[0]
    .significance,
  -8,
);
const syntheticModel = {
  rules: [
    { category: "BPPV", questionId: "259364", answer: "No", weight: -25 },
  ],
};
assert.equal(
  core.reference(
    "bppv",
    data.questions.find((q) => q.id === "259364"),
    1,
    syntheticModel,
  ).significance,
  -10,
);
assert.equal(
  core.reference("bppv", questions[0], 0, syntheticModel).significance,
  0,
);
assert.equal(
  core.reference(
    "bppv",
    questions.find((q) => q.future),
    0,
    syntheticModel,
  ),
  null,
);
assert.equal(output.reviewerRatings.length, 194);
// Guidance describes the listed answers without pre-filling a reviewer's ratings.
assert.equal(output.guidanceRevision, "katie-class-suggestions-2026-11-20");
assert.equal(output.questions.filter((q) => q.guidance).length, 6);
for (const question of output.questions.filter((q) => q.guidance)) {
  assert(question.guidance.answers.every((a) => a.direction === "positive"));
  assert(question.answers.every((a) => a.significance === 0));
  assert(
    question.guidance.answers.every((a) =>
      question.answers.some((r) => r.answer === a.answer),
    ),
  );
}
const cardio = data.questions.find((q) => q.id === "259369");
assert.deepEqual(
  core.guidance("cardio-orthostatic", cardio).answers.map((a) => a.answer),
  ["Seconds", "Minutes"],
);
assert.equal(core.guidance("bppv", cardio), null);
assert.equal(
  core.guidance(
    "cardio-orthostatic",
    questions.find((q) => q.future),
  ),
  null,
);
assert.equal(core.diagnoses.filter((d) => !d.hidden).length, 11);
assert(core.diagnoses.find((d) => d.id === "unspecified-hypofunction").hidden);
console.log(
  "PASS: complete assessment exports, signed/zero ratings, bounds, names and diagnosis separation.",
);
