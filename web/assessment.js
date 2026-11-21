(() => {
  "use strict";
  const core = window.NebulaAssessment;
  const data = window.NEBULA_DATA;
  const model = window.NEBULA_BANDS;
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
  const meaning = (number) =>
    number > 0 ? "Evidence for" : number < 0 ? "Evidence against" : "No effect";
  function initializeAssessment() {
    state.ratings = {};
    state.adjusted = {};
    for (const q of questions) {
      state.ratings[q.id] = q.options.map(
        (_, i) =>
          core.reference(state.diagnosisId, q, i, model)?.significance ?? 0,
      );
      state.adjusted[q.id] = [];
    }
    byId("draft-status").textContent =
      "Progress is not saved on this site. Download your JSON file before leaving.";
  }
  function startAssessment(diagnosisId) {
    const diagnosis = core.diagnoses.find((d) => d.id === diagnosisId);
    if (!diagnosis) return;
    state.diagnosisId = diagnosisId;
    initializeAssessment();
    byId("assessment-menu").hidden = true;
    byId("assessment-workspace").hidden = false;
    byId("assessment-title").textContent = diagnosis.name;
    byId("export-status").textContent = "";
    renderQuestions();
    byId("assessment-title").setAttribute("tabindex", "-1");
    byId("assessment-title").focus();
    window.scrollTo(0, 0);
  }
  function returnToMenu() {
    byId("assessment-exit-dialog").close();
    state.diagnosisId = "";
    state.ratings = {};
    state.adjusted = {};
    byId("assessment-questions").replaceChildren();
    byId("export-status").textContent = "";
    byId("assessment-workspace").hidden = true;
    byId("assessment-menu").hidden = false;
    byId("assessment-menu-title").focus();
    window.scrollTo(0, 0);
  }
  function renderQuestions() {
    const diagnosisName = escape(
      core.diagnoses.find((d) => d.id === state.diagnosisId).name,
    );
    const existing = !!core.diagnoses.find((d) => d.id === state.diagnosisId)
      .modelCategory;
    const displayed = existing ? questions.filter((q) => q.future) : questions;
    byId("assessment-reference-note").hidden = !existing;
    byId("assessment-count").textContent =
      `${displayed.length} questions · ${displayed.reduce((sum, q) => sum + q.options.length, 0)} answer options`;
    byId("assessment-questions").innerHTML = displayed
      .map(
        (q, number) => `
      ${q.future && !displayed[number - 1]?.future ? '<div class="assessment-future-heading"><h2>Proposed questions</h2></div>' : ""}
      <article class="assessment-question panel ${q.future ? "assessment-question-future" : ""}" aria-labelledby="assessment-q-${q.id}">
        <p class="eyebrow">${q.future ? "Proposed question " + Number(q.id.split("-")[1]) : "Question " + (number + 1) + " · " + escape(q.id)}</p>
        <h3 id="assessment-q-${q.id}">${escape(q.prompt)}${q.future ? ' <span class="assessment-new-note">(New Question, not yet in Epic)</span>' : ""}</h3>
        ${core.guidance(state.diagnosisId, q) ? `<p class="assessment-katie-note">${escape(core.guidance(state.diagnosisId, q).note)}</p>` : ""}
        ${q.kind === "multi" ? '<p class="assessment-hint">Multiple selections allowed. Rate each option separately.</p>' : ""}
        ${q.kind === "text" ? '<p class="assessment-hint">Written response planned; there are no answer choices to rate.</p>' : ""}
        <div class="assessment-answer-list">${q.options
          .map((answer, index) => {
            const fixed = core.reference(state.diagnosisId, q, index, model);
            const value = fixed
              ? fixed.significance
              : core.value(state.ratings, q, index);
            const id = `rating-${q.id}-${index}`;
            return `<div class="assessment-answer">
            <label for="${id}">${escape(answer)}</label>
            <div class="assessment-rating">
              <div class="assessment-slider-labels" id="${id}-direction"><span>Less likely ${diagnosisName}</span><span>More likely ${diagnosisName}</span></div>
              <div class="assessment-slider"><input ${fixed ? "disabled" : ""} id="${id}" type="range" min="-10" max="10" step="1" value="${value}" data-question="${q.id}" data-index="${index}" aria-label="${escape(answer)} — question ${number + 1}" aria-valuetext="${fixed ? "Fixed. " : ""}${meaning(value)}" aria-describedby="${id}-direction" /></div>
              ${fixed?.conditional ? '<p class="assessment-hint">Conditional model rule</p>' : ""}
            </div>
          </div>`;
          })
          .join("")}</div>
      </article>`,
      )
      .join("");
  }
  for (const diagnosis of core.diagnoses.filter(
    (diagnosis) => !diagnosis.hidden,
  )) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "diagnosis-tile";
    const name = document.createElement("span");
    name.textContent = diagnosis.name;
    const detail = document.createElement("span");
    detail.className = "diagnosis-tile-detail";
    const count = diagnosis.modelCategory
      ? questions.filter((q) => q.future).length
      : questions.length;
    detail.textContent = `${count} ${diagnosis.modelCategory ? "proposed questions" : "questions"}`;
    tile.append(name, detail);
    tile.addEventListener("click", () => startAssessment(diagnosis.id));
    byId("diagnosis-tiles").append(tile);
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
    byId("assessment-menu-title").focus();
  });
  byId("assessment-back-menu").addEventListener("click", () =>
    byId("assessment-exit-dialog").showModal(),
  );
  byId("assessment-stay").addEventListener("click", () =>
    byId("assessment-exit-dialog").close(),
  );
  byId("assessment-confirm-exit").addEventListener("click", returnToMenu);
  byId("assessment-questions").addEventListener("input", (event) => {
    const input = event.target;
    if (!input.matches('input[type="range"]')) return;
    const q = questions.find((q) => q.id === input.dataset.question);
    const index = Number(input.dataset.index);
    if (core.reference(state.diagnosisId, q, index, model)) return;
    const value = Number(input.value);
    state.ratings[q.id][index] = value;
    if (!state.adjusted[q.id].includes(index)) state.adjusted[q.id].push(index);
    input.setAttribute("aria-valuetext", `${meaning(value)}`);
    byId("export-status").textContent = "";
    byId("draft-status").textContent =
      "Remember to download your JSON file before leaving. Progress is not saved on this site.";
  });
  byId("assessment-export").addEventListener("click", () => {
    const result = core.exportAssessment({
      ...state,
      data,
      model,
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
