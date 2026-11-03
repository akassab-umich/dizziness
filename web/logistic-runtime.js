(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else
    root.NebulaLogistic = factory().create(
      root.NEURAL_SPEC,
      root.LOGISTIC_MODEL,
    );
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const norm = (v) =>
    String(v ?? "")
      .trim()
      .toLowerCase()
      .replace(/[.’]/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const values = (v) =>
    (Array.isArray(v) ? v : v == null ? [] : [v]).map(norm).filter(Boolean);
  const sigmoid = (x) =>
    x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
  function create(spec, model) {
    const C = spec.categories.length,
      T = spec.tokens,
      K = spec.slots;
    function encode(answers) {
      const a = Object.fromEntries(
        Object.entries(answers).map(([q, v]) => [q, values(v)]),
      );
      const observed = spec.questionIds.map((q) => (a[q] || []).length > 0);
      const x = Array.from({ length: C }, () =>
        Array.from({ length: T }, () => Array(2 * K).fill(0)),
      );
      for (const f of spec.features) {
        const known = f.dependencies.every((i) => observed[i]);
        const excepted =
          f.unless &&
          (a[f.unless.questionId] || []).some((v) =>
            f.unless.answers.map(norm).includes(v),
          );
        const hit =
          (a[f.questionId] || []).includes(norm(f.answer)) && !excepted;
        x[f.classIndex][f.tokenIndex][2 * f.slotIndex] =
          known && hit ? f.sign : 0;
        x[f.classIndex][f.tokenIndex][2 * f.slotIndex + 1] = Number(known);
      }
      return x;
    }
    function predict(answers) {
      const x = encode(answers),
        result = {};
      spec.categories.forEach((c, i) => {
        const flat = x[i].flat();
        const answered = x[i].filter((token) =>
          token.some((v, k) => k % 2 === 1 && v > 0),
        ).length;
        const w = model.models[i];
        const contributions = w.indices.map((fi, j) => {
          const f = spec.features[fi],
            points =
              10 * w.weights[j] * flat[f.tokenIndex * 2 * K + 2 * f.slotIndex];
          return {
            questionId: f.questionId,
            answer: f.answer,
            points,
            potentialPoints: 10 * w.weights[j] * f.sign,
          };
        });
        const basePoints = 10 * w.intercept;
        const points =
          basePoints + contributions.reduce((sum, f) => sum + f.points, 0);
        result[c] = {
          estimate: 100 * sigmoid(points / 10),
          points,
          basePoints,
          contributions,
          answered,
          total: spec.tokenQuestions[i].filter((v) => v >= 0).length,
          trained: true,
        };
      });
      for (const c of spec.allCategories)
        if (!result[c])
          result[c] = { estimate: null, answered: 0, total: 0, trained: false };
      return result;
    }
    return { encode, predict, spec };
  }
  return { create };
});
