(() => {
  "use strict";
  const defaults = window.NEBULA_DATA;
  if (!defaults) throw new Error("Questionnaire data did not load.");
  const ACCESS_HASH =
    "0f7a4f8120712df5464758e375faf9829818369c774fcedb64ed7bd3b62f5ea1";
  const ACCESS_SESSION_KEY = "nebula-access-20261028";
  const byId = (id) => document.getElementById(id);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const clean = (value) =>
    String(value ?? "")
      .trim()
      .replace(/\s+/g, " ");
  const normalized = (value) =>
    clean(value)
      .toLocaleLowerCase()
      .replace(/[.’]/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const questions = clone(defaults.questions);
  const state = { current: 0, answers: {} };

  const gate = byId("access-gate"),
    accessForm = byId("access-form"),
    accessCode = byId("access-code"),
    accessError = byId("access-error");
  async function sha256(value) {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    return [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  function unlock() {
    sessionStorage.setItem(ACCESS_SESSION_KEY, "granted");
    document.body.classList.remove("auth-locked");
    gate.hidden = true;
  }
  if (sessionStorage.getItem(ACCESS_SESSION_KEY) === "granted") unlock();
  accessForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    accessError.textContent = "";
    if ((await sha256(accessCode.value)) === ACCESS_HASH) {
      accessCode.value = "";
      unlock();
    } else {
      accessError.textContent = "Incorrect access code.";
      accessCode.select();
    }
  });

  const elements = {
    list: byId("question-list"),
    meta: byId("question-meta"),
    answerState: byId("answer-state"),
    prompt: byId("question-prompt"),
    options: byId("answer-options"),
    previous: byId("previous-question"),
    next: byId("next-question"),
    clearAnswer: byId("clear-answer"),
    scores: byId("score-list"),
    patientId: byId("patient-id"),
    toast: byId("toast"),
  };
  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  const isAnswered = (question) => {
    const value = state.answers[question.id];
    return Array.isArray(value)
      ? value.length > 0
      : value !== undefined && value !== null && value !== "";
  };
  const answerValues = (value) =>
    Array.isArray(value)
      ? value.map(clean).filter(Boolean)
      : clean(value)
        ? [clean(value)]
        : [];
  const conditionMet = (question) =>
    !question.showWhen ||
    answerValues(state.answers[question.showWhen.questionId])
      .map(normalized)
      .includes(normalized(question.showWhen.answer));
  const visibleQuestions = () => questions.filter(conditionMet);
  const currentQuestion = () => {
    const visible = visibleQuestions();
    state.current = Math.max(0, Math.min(state.current, visible.length - 1));
    return visible[state.current];
  };
  const hasScoringEffect = (id) =>
    activeRules().some(
      (rule) =>
        rule.weight !== 0 &&
        (rule.questionId === id || rule.unless?.questionId === id),
    );

  function renderQuestionList() {
    elements.list.innerHTML = visibleQuestions()
      .map(
        (question, index) =>
          `<button class="question-link ${index === state.current ? "active" : ""} ${isAnswered(question) ? "answered" : ""}" data-index="${index}"><span>${isAnswered(question) ? "✓" : "○"}</span><b class="${hasScoringEffect(question.id) ? "question-scored" : "question-unscored"}" title="${hasScoringEffect(question.id) ? "Affects at least one class" : "No scoring effect"}">${String(index + 1).padStart(2, "0")}</b><em>${escapeHtml(question.prompt)}</em></button>`,
      )
      .join("");
    elements.list
      .querySelector(".active")
      ?.scrollIntoView({ block: "nearest" });
  }
  function inputMarkup(question, value) {
    if (question.kind === "single" || question.kind === "multi") {
      const type = question.kind === "multi" ? "checkbox" : "radio";
      return question.options
        .map((option) => {
          const checked =
            question.kind === "multi"
              ? (value || []).includes(option)
              : value === option;
          return `<label class="choice"><input type="${type}" name="answer-${escapeHtml(question.id)}" value="${escapeHtml(option)}" ${checked ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`;
        })
        .join("");
    }
    if (question.kind === "date")
      return `<input class="free-answer" type="date" value="${escapeHtml(value || "")}">`;
    if (question.kind === "numeric")
      return `<input class="free-answer" type="number" min="0" value="${escapeHtml(value ?? "")}" placeholder="Not answered">`;
    return `<p class="text-unavailable-note">(Note from Ali: Current model cannot process text, so I removed this box.)</p>`;
  }
  function renderQuestion() {
    const visible = visibleQuestions(),
      question = currentQuestion(),
      answered = isAnswered(question);
    elements.meta.textContent = `Question ${state.current + 1} of ${visible.length}  |  ID ${question.id}`;
    elements.answerState.textContent =
      question.kind === "text"
        ? "No response required"
        : answered
          ? "Answered"
          : "Not answered";
    elements.clearAnswer.disabled = question.kind === "text";
    elements.prompt.textContent = question.prompt;
    elements.options.innerHTML = inputMarkup(
      question,
      state.answers[question.id],
    );
    elements.previous.disabled = state.current === 0;
    elements.next.disabled = state.current === visible.length - 1;
    renderQuestionList();
    renderScores();
  }
  function activeRules(model = "default") {
    return window.NEBULA_BANDS.rules;
  }
  function renderScores() {
    const scores = window.NebulaModel.score(activeRules(), state.answers);
    const ranked = Object.entries(scores).sort(
      ([a, x], [b, y]) => y.points - x.points || a.localeCompare(b),
    );
    const scale = Math.max(100, ...ranked.map(([, v]) => Math.abs(v.points)));
    byId("score-list").innerHTML = ranked
      .map(
        ([c, v]) =>
          `<button type="button" class="score-row score-button" data-model="points" data-category="${escapeHtml(c)}" aria-label="Explain ${escapeHtml(c)} points"><div class="score-label"><span class="score-class-label">${escapeHtml(c)}${(state.recorded || []).includes(c) ? "<small> ✓ Recorded</small>" : ""}</span><span><b class="score-value ${v.points > 0 ? "positive" : v.points < 0 ? "negative" : "zero"}">${v.points >= 0 ? "+" : ""}${Number(v.points.toFixed(3))} pts</b></span></div><div class="score-track" aria-hidden="true"><i class="${v.points < 0 ? "negative" : "positive"}" style="width:${(Math.abs(v.points) / scale) * 50}%"></i></div></button>`,
      )
      .join("");
    document.dispatchEvent(new CustomEvent("nebula:change"));
  }
  function setAnswerFromControl(target) {
    if (state.loadedCaseId)
      elements.patientId.value = state.loadedCaseId + "-modified";
    const question = currentQuestion();
    if (question.kind === "multi") {
      const inputs = [
        ...elements.options.querySelectorAll('input[type="checkbox"]'),
      ];
      if (normalized(target.value) === "none of the above" && target.checked)
        inputs.forEach((input) => {
          if (input !== target) input.checked = false;
        });
      else if (target.checked)
        inputs.forEach((input) => {
          if (normalized(input.value) === "none of the above")
            input.checked = false;
        });
      state.answers[question.id] = inputs
        .filter((input) => input.checked)
        .map((input) => input.value);
    } else state.answers[question.id] = target.value;
    if (!isAnswered(question)) delete state.answers[question.id];
    questions
      .filter((item) => item.showWhen && !conditionMet(item))
      .forEach((item) => delete state.answers[item.id]);
    renderQuestion();
  }
  function resetQuestionnaire() {
    state.answers = {};
    state.current = 0;
    state.recorded = [];
    state.sources = [];
    state.loadedCaseId = null;
    elements.patientId.value = "";
    byId("patient-age").value = "";
    byId("patient-sex").value = "";
    renderQuestion();
    document.dispatchEvent(new Event("nebula:case-reset"));
  }
  function downloadJson(value, filename) {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  function exportCase() {
    const ageInput = byId("patient-age"),
      age = ageInput.value === "" ? null : Number(ageInput.value);
    if (
      !ageInput.checkValidity() ||
      (age !== null && (!Number.isInteger(age) || age < 0 || age > 120))
    )
      return showToast(
        "Enter a whole-number age from 0 to 120, or leave it blank.",
        true,
      );
    let patientId = clean(elements.patientId.value) || `CASE-${Date.now()}`;
    elements.patientId.value = patientId;
    const now = new Date(),
      stamp = now.toISOString().replace(/[-:]/g, "").slice(0, 15),
      safeId = patientId.replace(/[^a-z0-9_-]/gi, "_");
    downloadJson(
      {
        format: "nebula-patient-case",
        version: 1,
        questionnaire_revision: defaults.questionnaireRevision,
        patient: {
          anonymous_id: patientId,
          age,
          sex: byId("patient-sex").value || null,
          recorded_labels: state.recorded || [],
        },
        Sources: state.sources || [],
        answers: clone(state.answers),
      },
      `${safeId}_${stamp}.json`,
    );
  }
  let toastTimer;
  function showToast(message, error = false) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.toggle("error", error);
    elements.toast.classList.add("show");
    toastTimer = setTimeout(
      () => elements.toast.classList.remove("show"),
      3200,
    );
  }

  elements.list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-index]");
    if (button) {
      state.current = Number(button.dataset.index);
      renderQuestion();
    }
  });
  elements.options.addEventListener("change", (event) =>
    setAnswerFromControl(event.target),
  );
  elements.options.addEventListener("input", (event) => {
    if (event.target.matches(".free-answer"))
      setAnswerFromControl(event.target);
  });
  elements.previous.addEventListener("click", () => {
    state.current = Math.max(0, state.current - 1);
    renderQuestion();
  });
  elements.next.addEventListener("click", () => {
    state.current = Math.min(visibleQuestions().length - 1, state.current + 1);
    renderQuestion();
  });
  elements.clearAnswer.addEventListener("click", () => {
    delete state.answers[currentQuestion().id];
    questions
      .filter((item) => item.showWhen && !conditionMet(item))
      .forEach((item) => delete state.answers[item.id]);
    renderQuestion();
  });
  byId("new-questionnaire").addEventListener("click", resetQuestionnaire);
  byId("export-json").addEventListener("click", exportCase);
  window.NebulaApp = {
    hasScoringEffect,
    loadCase: (value) => {
      state.answers = window.NebulaModel.sanitize(value.answers, questions);
      state.current = 0;
      state.loadedCaseId = value.caseId;
      state.recorded = value.recorded;
      state.sources = value.sources;
      elements.patientId.value = value.caseId;
      byId("patient-age").value = value.age ?? "";
      byId("patient-sex").value = value.sex;
      renderQuestion();
    },
    snapshot: (model = "points") =>
      clone({
        answers: state.answers,
        rules: activeRules(model),
        model: "Model v1",
      }),
    downloadJson,
  };
  renderQuestion();
})();
