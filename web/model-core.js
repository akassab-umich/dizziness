/* Browser scoring and answer validation. Training lives in tools/. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.NebulaModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const norm = (v) =>
    String(v ?? "")
      .trim()
      .toLowerCase()
      .replace(/[.’]/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const values = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]).map(norm);
  const matched = (r, a) =>
    values(a[r.questionId]).includes(norm(r.answer)) &&
    !(
      r.unless &&
      values(a[r.unless.questionId]).some((v) =>
        r.unless.answers.map(norm).includes(v),
      )
    );
  function score(rules, answers) {
    const out = {};
    for (const r of rules) {
      const s = (out[r.category] ||= { points: 0, available: 0, percent: 0 });
      if (r.weight > 0) s.available += r.weight;
      if (matched(r, answers)) s.points += r.weight;
    }
    for (const s of Object.values(out)) {
      s.points = Math.round(s.points * 100) / 100;
      s.available = Math.round(s.available * 100) / 100;
      s.percent =
        Math.round(
          Math.max(
            0,
            Math.min(100, (s.points / Math.max(s.available, 1)) * 100),
          ) * 10,
        ) / 10;
    }
    return out;
  }
  function prediction(scores) {
    const entries = Object.entries(scores);
    const max = Math.max(...entries.map(([, s]) => s.percent));
    const winners = entries
      .filter(([, s]) => s.percent === max)
      .map(([c]) => c);
    return max > 0 && winners.length === 1 ? winners[0] : "Uncertain / tied";
  }
  function sanitize(answers, questions) {
    const result = {};
    for (const q of questions) {
      const v = answers[q.id],
        vv = Array.isArray(v) ? v : [v];
      if (
        !["single", "multi"].includes(q.kind) ||
        !vv.length ||
        vv.some((x) => !q.options.includes(x))
      )
        continue;
      if (
        (q.kind === "single" && vv.length !== 1) ||
        (vv.length > 1 && vv.some((x) => norm(x) === "none of the above"))
      )
        continue;
      result[q.id] = q.kind === "multi" ? [...new Set(vv)] : vv[0];
    }
    for (const q of questions)
      if (
        q.showWhen &&
        !values(result[q.showWhen.questionId]).includes(norm(q.showWhen.answer))
      )
        delete result[q.id];
    return result;
  }
  return { norm, values, matched, score, prediction, sanitize };
});
