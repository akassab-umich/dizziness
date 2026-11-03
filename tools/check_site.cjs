/** Lightweight checks that need no patient data or package installation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const web = path.resolve(__dirname, '../web');
for (const filename of fs.readdirSync(web).filter(name => name.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', path.join(web, filename)]);
}
global.window = {};
for (const name of ['questionnaire-data', 'band-model']) {
  require(path.join(web, name + '.js'));
}
const scoring = require(path.join(web, 'model-core.js'));
const answers = { '259356': 'dizziness' };
assert(scoring.score(window.NEBULA_BANDS.rules, answers).Bilateral.points < 0);
const retired = new Set(['259358','259359','259365','259368','259373','259376','259377','259388','259424','259425','259426','260448']);
assert(window.NEBULA_DATA.questions.every(question => !retired.has(question.id)));
console.log('PASS: browser syntax, points model and retired questions.');
