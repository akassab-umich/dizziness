/* Assessment data and export format. No patient data or model changes. */
(function (root, factory) {
  const proposals =
    typeof module === "object" && module.exports
      ? require("./assessment-questions.js")
      : root.NEBULA_ASSESSMENT_QUESTIONS;
  const api = factory(proposals);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.NebulaAssessment = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (proposals) {
  const diagnoses = [
    { id: "labyrinthitis-hypofunction", name: "Labyrinthitis Hypofunction" },
    { id: "schwannoma-hypofunction", name: "Schwannoma Hypofunction" },
    { id: "unspecified-hypofunction", name: "Unspecified Hypofunction" },
    { id: "cardio-orthostatic", name: "Cardiovascular / Orthostatic" },
    { id: "anxiety-without-pppd", name: "Anxiety without PPPD" },
  ];
  function questions(data) {
    return [
      ...data.questions.filter(
        (q) => ["single", "multi"].includes(q.kind) && q.options.length,
      ),
      ...proposals.questions.map((q) => ({ ...q, future: true })),
    ];
  }
  function value(ratings, question, index) {
    const number = ratings[question.id]?.[index];
    return Number.isInteger(number) && number >= -10 && number <= 10
      ? number
      : 0;
  }
  function filename(firstName, diagnosis) {
    const safe = (text) =>
      text
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-]+/g, "_")
        .replace(/^_+|_+$/g, "");
    return `${safe(firstName) || "Reviewer"}_${safe(diagnosis.name)}.json`;
  }
  function exportAssessment({
    firstName,
    diagnosisId,
    ratings = {},
    adjusted = {},
    data,
    exportedAt,
  }) {
    const name = firstName.trim();
    const diagnosis = diagnoses.find((d) => d.id === diagnosisId);
    if (!name || name.length > 80 || !diagnosis)
      throw Error("Enter your first name and select a diagnosis.");
    return {
      schema: "dizziness-diagnosis-assessment-v1",
      firstName: name,
      diagnosis: { ...diagnosis },
      questionnaireRevision: data.questionnaireRevision,
      proposalRevision: proposals.revision,
      exportedAt,
      scale: {
        minimum: -10,
        maximum: 10,
        step: 1,
        negative: "Evidence against",
        zero: "No effect",
        positive: "Evidence for",
      },
      questions: questions(data).map((q) => ({
        questionId: q.id,
        question: q.prompt,
        kind: q.kind,
        status: q.future ? "future-implementation" : "current",
        ...(q.showWhen ? { showWhen: q.showWhen } : {}),
        answers: q.options.map((answer, index) => ({
          answer,
          significance: value(ratings, q, index),
          sliderAdjusted: adjusted[q.id]?.includes(index) || false,
        })),
      })),
    };
  }
  return { diagnoses, questions, value, filename, exportAssessment };
});
