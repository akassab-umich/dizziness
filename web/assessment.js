(() => {
  "use strict";
  const core = window.NebulaAssessment;
  const data = window.NEBULA_DATA;
  const questions = core.questions(data);
  const byId = (id) => document.getElementById(id);
  const escape = (text) =>
    String(text).replace(
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
  const state = { firstName: "", diagnosisId: "", ratings: {}, adjusted: {} };
  const key = () =>
    `dizziness-assessment:${data.questionnaireRevision}:${state.firstName.toLowerCase()}:${state.diagnosisId}`;
  const signed = (number) => (number > 0 ? `+${number}` : String(number));
  function saveDraft() {
    try {
      sessionStorage.setItem(
        key(),
        JSON.stringify({ ratings: state.ratings, adjusted: state.adjusted }),
      );
      byId("draft-status").textContent =
        "Draft saved in this browser tab. Export a JSON file when you finish.";
    } catch {
      byId("draft-status").textContent =
        "Draft could not be saved in this tab. Export a JSON file to keep your work.";
    }
  }
  function loadDraft() {
    let draft;
    try {
      draft = JSON.parse(sessionStorage.getItem(key()) || "null");
    } catch {
      draft = null;
    }
    state.ratings = {};
    state.adjusted = {};
    for (const q of questions) {
      state.ratings[q.id] = q.options.map((_, i) =>
        core.value(draft?.ratings || {}, q, i),
      );
      state.adjusted[q.id] = Array.isArray(draft?.adjusted?.[q.id])
        ? draft.adjusted[q.id].filter(
            (i) => Number.isInteger(i) && i >= 0 && i < q.options.length,
          )
        : [];
    }
    byId("draft-status").textContent = draft
      ? "Your draft for this diagnosis has been restored in this browser tab."
      : "All sliders start at zero. Your work stays in this browser tab until you export it.";
  }
  function renderQuestions() {
    byId("assessment-questions").innerHTML = questions
      .map(
        (q, number) => `
      <article class="assessment-question panel" aria-labelledby="assessment-q-${q.id}">
        <p class="eyebrow">Question ${number + 1} · ${escape(q.id)}</p>
        <h3 id="assessment-q-${q.id}">${escape(q.prompt)}</h3>
        ${q.kind === "multi" ? '<p class="assessment-hint">Multiple selections allowed. Rate each option separately.</p>' : ""}
        <div class="assessment-answer-list">${q.options
          .map((answer, index) => {
            const value = core.value(state.ratings, q, index);
            const id = `rating-${q.id}-${index}`;
            return `<div class="assessment-answer">
            <label for="${id}">${escape(answer)}</label>
            <div class="assessment-slider"><input id="${id}" type="range" min="-10" max="10" step="1" value="${value}" data-question="${q.id}" data-index="${index}" aria-label="${escape(answer)} — question ${number + 1}" aria-valuetext="${signed(value)} points" /></div>
            <output for="${id}" id="${id}-value" class="rating-value ${value > 0 ? "positive" : value < 0 ? "negative" : "neutral"}">${signed(value)}</output>
          </div>`;
          })
          .join("")}</div>
      </article>`,
      )
      .join("");
  }
  for (const diagnosis of core.diagnoses) {
    const option = document.createElement("option");
    option.value = diagnosis.id;
    option.textContent = diagnosis.name;
    byId("assessment-diagnosis").append(option);
  }
  byId("assessment-login").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = byId("first-name").value.trim().replace(/\s+/g, " ");
    byId("access-error").textContent = "";
    if (!name) {
      byId("access-error").textContent = "Please enter your first name.";
      return;
    }
    if (!(await window.NebulaAccess.matches(byId("assessment-code").value))) {
      byId("access-error").textContent = "Incorrect access code.";
      byId("assessment-code").select();
      return;
    }
    state.firstName = name;
    byId("assessment-code").value = "";
    byId("reviewer-name").textContent = name;
    byId("access-gate").hidden = true;
    byId("assessment-app").hidden = false;
    document.body.classList.remove("auth-locked");
    byId("assessment-diagnosis").focus();
  });
  byId("assessment-diagnosis").addEventListener("change", (event) => {
    state.diagnosisId = event.target.value;
    const diagnosis = core.diagnoses.find((d) => d.id === state.diagnosisId);
    byId("assessment-content").hidden = !diagnosis;
    byId("assessment-empty").hidden = !!diagnosis;
    byId("export-status").textContent = "";
    if (!diagnosis) return;
    loadDraft();
    byId("assessment-title").textContent = diagnosis.name;
    byId("assessment-count").textContent =
      `${questions.length} questions · ${questions.reduce((sum, q) => sum + q.options.length, 0)} answer options`;
    renderQuestions();
  });
  byId("assessment-questions").addEventListener("input", (event) => {
    const input = event.target;
    if (!input.matches('input[type="range"]')) return;
    const q = questions.find((q) => q.id === input.dataset.question);
    const index = Number(input.dataset.index);
    const value = Number(input.value);
    state.ratings[q.id][index] = value;
    if (!state.adjusted[q.id].includes(index)) state.adjusted[q.id].push(index);
    const output = byId(`${input.id}-value`);
    output.textContent = signed(value);
    output.className = `rating-value ${value > 0 ? "positive" : value < 0 ? "negative" : "neutral"}`;
    input.setAttribute("aria-valuetext", `${signed(value)} points`);
    byId("export-status").textContent = "";
    saveDraft();
  });
  byId("assessment-export").addEventListener("click", () => {
    const result = core.exportAssessment({
      ...state,
      data,
      exportedAt: new Date().toISOString(),
    });
    const filename = core.filename(state.firstName, result.diagnosis);
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(result, null, 2) + "\n"], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    byId("export-status").textContent = `Downloaded ${filename}`;
  });
})();
