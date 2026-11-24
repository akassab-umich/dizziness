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
    function modelReferences(question, answer, model) {
      if (question.future) return [];
      const colors = [
        "#0072b2",
        "#d55e00",
        "#009e73",
        "#8e44ad",
        "#a66f00",
        "#cc3377",
        "#333333",
      ];
      const references = diagnoses
        .filter((d) => d.modelCategory)
        .flatMap((d, index) => {
          const rules = model.rules.filter(
            (r) =>
              r.category === d.modelCategory &&
              r.questionId === question.id &&
              scoring.norm(r.answer) === scoring.norm(answer),
          );
          if (!rules.length) return [];
          const points = rules.reduce((sum, r) => sum + r.weight, 0);
          // Symmetric compression keeps zero centered and preserves magnitude order.
          const fraction = (1 + points / (Math.abs(points) + 10)) / 2;
          return [
            {
              name: d.name,
              color: colors[index],
              points,
              fraction,
              conditional: rules.some((r) => r.unless),
              lane: 0,
            },
          ];
        });
      for (const [index, ref] of references.entries()) {
        while (
          references
            .slice(0, index)
            .some(
              (other) =>
                other.lane === ref.lane &&
                Math.abs(other.fraction - ref.fraction) < 0.06,
            )
        )
          ref.lane++;
      }
      return references;
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
      questions,
      value,
      reference,
      filename,
      modelReferences,
      exportAssessment,
    };
  },
);
