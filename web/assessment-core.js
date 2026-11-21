/* Assessment data and export format. No patient data or model changes. */
(function (root, factory) {
  const proposals =
    typeof module === "object" && module.exports
      ? require("./assessment-questions.js")
      : root.NEBULA_ASSESSMENT_QUESTIONS;
  const scoring =
    typeof module === "object" && module.exports
      ? require("./model-core.js")
      : root.NebulaModel;
  const api = factory(proposals, scoring);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.NebulaAssessment = api;
})(
  typeof globalThis !== "undefined" ? globalThis : this,
  function (proposals, scoring) {
    const diagnoses = [
      { id: "bppv", name: "BPPV", modelCategory: "BPPV" },
      { id: "bilateral", name: "Bilateral", modelCategory: "Bilateral" },
      { id: "menieres", name: "Meniere’s", modelCategory: "Meniere's" },
      { id: "migraine", name: "Migraine", modelCategory: "Migraine" },
      { id: "neuritis", name: "Neuritis", modelCategory: "Neuritis" },
      { id: "pppd", name: "PPPD", modelCategory: "PPPD" },
      {
        id: "third-window",
        name: "Third Window",
        modelCategory: "Third Window",
      },
      { id: "labyrinthitis-hypofunction", name: "Labyrinthitis Hypofunction" },
      { id: "schwannoma-hypofunction", name: "Schwannoma Hypofunction" },
      {
        id: "unspecified-hypofunction",
        name: "Unspecified Hypofunction",
        hidden: true,
      },
      { id: "cardio-orthostatic", name: "Cardiovascular / Orthostatic" },
      { id: "anxiety-without-pppd", name: "Anxiety without PPPD" },
    ];
    // Reviewed mappings from Katie's November 20 class sheets, not model weights.
    const guidanceRevision = "katie-class-suggestions-2026-11-20";
    const suggestions = {
      "cardio-orthostatic": {
        259357: ["light-headed", "sensation of rocking or swaying"],
        259361: ["Sudden"],
        259364: ["Yes"],
        259369: ["Seconds", "Minutes"],
        259371: ["sitting up"],
        259381: ["heart racing"],
      },
      "schwannoma-hypofunction": {
        259415: [
          "Yes, hearing loss in the right ear only",
          "Yes, hearing loss in the left ear only",
        ],
      },
      "labyrinthitis-hypofunction": {
        259361: ["Sudden"],
        259362: ["Yes"],
        259367: ["Only 1 episode"],
        259371: ["walking in the dark", "any kind of head movement"],
        260451: ["Yes"],
        259415: [
          "Yes, hearing loss in the right ear only",
          "Yes, hearing loss in the left ear only",
        ],
      },
    };
    function guidance(diagnosisId, question) {
      const suggested = suggestions[diagnosisId]?.[question.id];
      if (!suggested || question.future) return null;
      const answers = question.options.filter((answer) =>
        suggested.some((text) => scoring.norm(text) === scoring.norm(answer)),
      );
      if (!answers.length) return null;
      const diagnosis = diagnoses.find((d) => d.id === diagnosisId);
      return {
        revision: guidanceRevision,
        source:
          "OTO Dizziness Questionnaire -Nebula cloud New Categories KM 11_20.xlsx",
        answers: answers.map((answer) => ({ answer, direction: "positive" })),
        note: `Note from Ali: Katie’s November 20 Excel file suggests ${answers.map((answer) => `“${answer}”`).join(" or ")} may support ${diagnosis.name} (more likely). Please give your own judgment.`,
      };
    }
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
    function reference(diagnosisId, question, index, model) {
      const diagnosis = diagnoses.find((d) => d.id === diagnosisId);
      if (!diagnosis?.modelCategory || question.future) return null;
      if (!model?.rules) throw Error("The current model did not load.");
      const rules = model.rules.filter(
        (r) =>
          r.category === diagnosis.modelCategory &&
          r.questionId === question.id &&
          scoring.norm(r.answer) === scoring.norm(question.options[index]),
      );
      const points = rules.reduce((sum, r) => sum + r.weight, 0);
      return {
        significance: Math.max(-10, Math.min(10, points)),
        modelPoints: points,
        modelRules: rules.map((r) => ({
          weight: r.weight,
          ...(r.unless ? { unless: r.unless } : {}),
        })),
        conditional: rules.some((r) => r.unless),
      };
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
      model,
      exportedAt,
    }) {
      const name = firstName.trim();
      const diagnosis = diagnoses.find((d) => d.id === diagnosisId);
      if (!name || name.length > 80 || !diagnosis)
        throw Error("Enter your first name and select a diagnosis.");
      const output = {
        schema: "dizziness-diagnosis-assessment-v1",
        firstName: name,
        diagnosis: { ...diagnosis },
        questionnaireRevision: data.questionnaireRevision,
        proposalRevision: proposals.revision,
        guidanceRevision,
        referenceModelVersion: diagnosis.modelCategory ? model?.version : null,
        collectionScope: diagnosis.modelCategory
          ? "future-questions-only"
          : "all-questions",
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
          ...(guidance(diagnosisId, q)
            ? { guidance: guidance(diagnosisId, q) }
            : {}),
          ...(q.showWhen ? { showWhen: q.showWhen } : {}),
          answers: q.options.map((answer, index) => {
            const fixed = reference(diagnosisId, q, index, model);
            return {
              answer,
              significance: fixed
                ? fixed.significance
                : value(ratings, q, index),
              fixed: !!fixed,
              ratingSource: fixed ? "model-reference" : "reviewer",
              ...(fixed
                ? {
                    modelPoints: fixed.modelPoints,
                    modelRules: fixed.modelRules,
                  }
                : {}),
              sliderAdjusted:
                !fixed && (adjusted[q.id]?.includes(index) || false),
            };
          }),
        })),
      };
      output.reviewerRatings = output.questions.flatMap((q) =>
        q.answers
          .filter((answer) => !answer.fixed)
          .map((answer) => ({
            questionId: q.questionId,
            status: q.status,
            ...answer,
          })),
      );
      return output;
    }
    return {
      diagnoses,
      guidance,
      questions,
      value,
      reference,
      filename,
      exportAssessment,
    };
  },
);
