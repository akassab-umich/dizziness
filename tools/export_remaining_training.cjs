/** Extend the local fitting cohort while preserving all nine existing scorecards. */
const fs = require("node:fs"),
  path = require("node:path");
const root = path.resolve(__dirname, "..");
global.window = {};
require("../web/questionnaire-data.js");
require("../web/band-model.js");
const importer = require("../web/case-import.js"),
  folder = path.resolve(process.argv[2]);
const cases = fs
  .readdirSync(folder)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .flatMap((file) => {
    try {
      return [
        {
          file,
          ...importer.parse(
            JSON.parse(fs.readFileSync(path.join(folder, file))),
            window.NEBULA_DATA.questions,
            file,
          ),
        },
      ];
    } catch (e) {
      if (/no diagnosis with current scoring rules/.test(e.message)) return [];
      throw e;
    }
  });
const output = path.join(root, "private-results/remaining-training-input.json");
if (fs.existsSync(output))
  throw Error("Preserve the existing remaining-class input before rebuilding.");
fs.writeFileSync(
  output,
  JSON.stringify(
    {
      cases,
      questions: window.NEBULA_DATA.questions,
      baseModel: window.NEBULA_BANDS,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    patients: cases.length,
    diagnoses: cases.reduce((s, p) => s + p.recorded.length, 0),
    classes: [...new Set(cases.flatMap((p) => p.recorded))].sort(),
  }),
);
