/** Prepare shared current-question judgments and local patient activations. */
const fs = require("node:fs"),
  path = require("node:path");
const root = path.resolve(__dirname, "..");
global.window = {};
require("../web/questionnaire-data.js");
require("../web/band-model.js");
const reviews = require("../web/assessment-reviews.js");
const importer = require("../web/case-import.js");
const scoring = require("../web/model-core.js");
const categories = {
  "labyrinthitis-hypofunction": "Labyrinthitis Hypofunction",
  "schwannoma-hypofunction": "Schwannoma Hypofunction",
};
const rules = [];
for (const [id, category] of Object.entries(categories)) {
  const k = reviews.find((r) => r.reviewer === "Katie" && r.diagnosisId === id);
  const m = reviews.find(
    (r) => r.reviewer === "Michelle" && r.diagnosisId === id,
  );
  for (const q of window.NEBULA_DATA.questions.filter((q) =>
    ["single", "multi"].includes(q.kind),
  )) {
    for (const answer of q.options) {
      const find = (r) =>
        r.ratings.find((a) => a.questionId === q.id && a.answer === answer);
      const a = find(k),
        b = find(m);
      if (!a || !b || Math.sign(a.significance) !== Math.sign(b.significance))
        continue;
      const direction = Math.sign(a.significance);
      const maximum = q.kind === "multi" ? 10 : 25;
      rules.push({
        category,
        questionId: q.id,
        answer,
        direction,
        weight:
          direction *
          Math.max(
            5,
            Math.min(
              maximum,
              Math.round(
                (Math.abs(a.significance) + Math.abs(b.significance)) / 2,
              ),
            ),
          ),
        maximum,
        consensus: true,
        source: "Katie and Michelle: same direction on a current question",
        judgments: [a.significance, b.significance],
        adjusted: [a.sliderAdjusted, b.sliderAdjusted],
      });
      if (!direction) rules.at(-1).weight = 0;
    }
  }
}
fs.writeFileSync(
  path.join(root, "web/consensus-rules.js"),
  "window.NEBULA_CONSENSUS = " +
    JSON.stringify(
      { revision: "current-question-consensus-2026-11-24", rules },
      null,
      2,
    ) +
    ";\n",
);
const folder = path.resolve(process.argv[2]);
const cases = fs
  .readdirSync(folder)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .flatMap((file) => {
    const raw = JSON.parse(fs.readFileSync(path.join(folder, file)));
    try {
      return [
        { file, ...importer.parse(raw, window.NEBULA_DATA.questions, file) },
      ];
    } catch (e) {
      if (/no diagnosis with current scoring rules/.test(e.message)) return [];
      throw e;
    }
  });
for (const p of cases)
  p.hits = rules.map((r) => Number(scoring.matched(r, p.answers)));
fs.writeFileSync(
  path.join(root, "private-results/consensus-training-input.json"),
  JSON.stringify(
    {
      rules,
      cases,
      baseModel: {
        ...window.NEBULA_BANDS,
        rules: window.NEBULA_BANDS.rules.filter((r) => !r.consensus),
      },
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    patients: cases.length,
    classes: Object.values(categories),
    rules: rules.length,
  }),
);
