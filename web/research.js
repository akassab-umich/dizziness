(() => {
  "use strict";
  const scoring = window.NebulaModel,
    questionnaire = window.NEBULA_DATA,
    app = window.NebulaApp;
  const byId = (id) => document.getElementById(id),
    escapeHtml = (v) =>
      String(v ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  const formatPoints = (v) =>
    (v > 0 ? "+" : "") + Number(v.toFixed(3)) + " pts";
  const dialog = byId("score-dialog");
  let openCategory = null,
    openModel = "default";
  function explain(category, model = openModel) {
    openCategory = category;
    openModel = model;
    const s = app.snapshot(model);
    const score = scoring.score(s.rules, s.answers)[category],
      groups = new Map(),
      cards = [];
    s.rules
      .filter((r) => r.category === category)
      .forEach((r) => {
        if (!groups.has(r.questionId)) groups.set(r.questionId, []);
        groups.get(r.questionId).push(r);
      });
    for (const [id, rules] of groups) {
      const q = questionnaire.questions.find((q) => q.id === id),
        raw = s.answers[id],
        actual = Array.isArray(raw)
          ? raw
          : raw == null || raw === ""
            ? []
            : [raw];
      if (!q) continue; // Retired questions are not part of the explanation.
      const expected = new Map();
      rules.forEach((r) => {
        const key = scoring.norm(r.answer);
        if (!expected.has(key))
          expected.set(key, { answer: r.answer, weight: 0 });
        expected.get(key).weight += r.weight;
      });
      const rows = [],
        used = new Set(),
        remaining = [];
      const suppressed = rules.filter(
        (r) =>
          r.unless &&
          scoring
            .values(s.answers[r.unless.questionId])
            .some((v) => r.unless.answers.map(scoring.norm).includes(v)),
      );
      for (const [key, rule] of expected) {
        const index = actual.findIndex(
          (a, i) => !used.has(i) && scoring.norm(a) === key,
        );
        if (index >= 0) {
          used.add(index);
          rows.push({
            expected: rule.answer,
            actual: actual[index],
            weight: suppressed.some((r) => scoring.norm(r.answer) === key)
              ? 0
              : rule.weight,
            ruleWeight: rule.weight,
          });
        } else remaining.push(rule);
      }
      const unmatched = actual.filter((_, i) => !used.has(i));
      for (let i = 0; i < Math.max(remaining.length, unmatched.length); i++)
        rows.push({
          expected: remaining[i]?.answer || "",
          actual: unmatched[i] ?? "",
          weight: 0,
          ruleWeight: remaining[i]?.weight,
        });
      if (!actual.length && rows.length) rows[0].missing = true;
      const total = rows.reduce((sum, r) => sum + r.weight, 0),
        applied = rows.some((r) => r.weight !== 0);
      const conditionalNote = suppressed.length
        ? '<p class="hint">The hearing penalty is waived because roaring or ringing in one ear was selected.</p>'
        : "";
      const hidden =
        q?.showWhen &&
        !scoring
          .values(s.answers[q.showWhen.questionId])
          .includes(scoring.norm(q.showWhen.answer));
      const table = rows
        .map((r) => {
          const status =
            r.weight > 0
              ? "effect-positive"
              : r.weight < 0
                ? "effect-negative"
                : r.actual !== ""
                  ? "effect-neutral"
                  : "effect-missing";
          const label =
            r.weight > 0
              ? "Adds support"
              : r.weight < 0
                ? "Subtracts support"
                : r.actual !== ""
                  ? "No effect"
                  : "";
          return `<tr><td>${escapeHtml(r.expected)}${r.ruleWeight !== undefined ? `<small class="rule-potential ${r.ruleWeight > 0 ? "effect-positive" : r.ruleWeight < 0 ? "effect-negative" : "effect-missing"}">${formatPoints(r.ruleWeight)}</small>` : ""}</td><td class="${status}">${r.missing ? "Not answered" : escapeHtml(r.actual)}${label ? `<small>${label}</small>` : ""}</td><td class="${status}">${r.weight !== 0 ? formatPoints(r.weight) : ""}</td></tr>`;
        })
        .join("");
      cards.push(
        `<article class="explanation-question" data-question-id="${escapeHtml(id)}"><p class="eyebrow">Question ${escapeHtml(id)}</p><h3>${escapeHtml(q?.prompt || "Unknown question")}</h3>${conditionalNote}${hidden ? '<p class="hint">Conditional question not currently shown.</p>' : ""}<table class="answer-comparison"><thead><tr><th>Expected answer (rule)</th><th>Patient’s answer</th><th>Points applied</th></tr></thead><tbody>${table}</tbody></table>${applied ? `<div class="question-total"><b>Question total</b><b>${formatPoints(total)}</b></div>` : ""}</article>`,
      );
    }
    byId("score-dialog-title").textContent = category;
    byId("score-dialog-body").innerHTML =
      `<p>${escapeHtml(s.model)}</p><div class="explanation-totals"><div>Net points · ranking score<strong>${formatPoints(score.points)}</strong></div><div>Available positive points<strong>${Number(score.available.toFixed(3))} formatPoints</strong></div></div>${cards.join("") || "<p>No rules for this category.</p>"}`;
    if (!dialog.open) dialog.showModal();
  }
  for (const id of ["score-list"])
    byId(id).addEventListener("click", (e) => {
      const b = e.target.closest("[data-category]");
      if (b) explain(b.dataset.category, b.dataset.model);
    });
  byId("close-score-dialog").addEventListener("click", () => {
    openCategory = null;
    dialog.close();
  });
  dialog.addEventListener("cancel", () => {
    openCategory = null;
  });
  dialog.addEventListener("close", () => {
    openCategory = null;
  });
  document.addEventListener("nebula:change", () => {
    if (openCategory && dialog.open) explain(openCategory);
  });
})();
