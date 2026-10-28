(() => {
  "use strict";
  const defaults = window.NEBULA_DATA;
  if (!defaults) throw new Error("Questionnaire data did not load.");
  const ACCESS_HASH = "0f7a4f8120712df5464758e375faf9829818369c774fcedb64ed7bd3b62f5ea1";
  const ACCESS_SESSION_KEY = "nebula-access-20261028";
  const RULES_KEY = "nebula-desktop-compatible-rules-v2-km2";
  const $ = (id) => document.getElementById(id);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const clean = (value) => String(value ?? "").trim().replace(/\s+/g, " ");
  const normalized = (value) => clean(value).toLocaleLowerCase().replace(/[.’]/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  const questions = clone(defaults.questions);
  const defaultRules = clone(defaults.rules).map(normalizeRule).filter(Boolean);

  function normalizeRule(rule) {
    const category = clean(rule.category), questionId = clean(rule.questionId || rule.question_id), answer = clean(rule.answer), weight = Number(rule.weight);
    return category && questionId && answer && Number.isFinite(weight) ? { category, questionId, answer, weight, source: rule.source || "Workbook default" } : null;
  }
  function loadRules() {
    try { const value = JSON.parse(localStorage.getItem(RULES_KEY)); return Array.isArray(value?.rules) ? value.rules.map(normalizeRule).filter(Boolean) : clone(defaultRules); }
    catch { return clone(defaultRules); }
  }
  const state = { current: 0, answers: {}, rules: clone(defaultRules), draftRules: [], selectedRule: null, editingRule: null };
  state.draftRules = clone(state.rules);

  const gate = $("access-gate"), accessForm = $("access-form"), accessCode = $("access-code"), accessError = $("access-error");
  async function sha256(value) { const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)); return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join(""); }
  function unlock() { sessionStorage.setItem(ACCESS_SESSION_KEY, "granted"); document.body.classList.remove("auth-locked"); gate.hidden = true; }
  if (sessionStorage.getItem(ACCESS_SESSION_KEY) === "granted") unlock();
  accessForm.addEventListener("submit", async (event) => { event.preventDefault(); accessError.textContent = ""; if (await sha256(accessCode.value) === ACCESS_HASH) { accessCode.value = ""; unlock(); } else { accessError.textContent = "Incorrect access code."; accessCode.select(); } });

  const els = {
    list: $("question-list"), meta: $("question-meta"), answerState: $("answer-state"), prompt: $("question-prompt"), options: $("answer-options"), previous: $("previous-question"), next: $("next-question"), clearAnswer: $("clear-answer"), scores: $("score-list"), patientId: $("patient-id"), toast: $("toast")
  };
  const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const isAnswered = (question) => { const value = state.answers[question.id]; return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== ""; };
  const categories = (rules = state.draftRules) => [...new Set(rules.map((rule) => rule.category))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  const answerValues = (value) => Array.isArray(value) ? value.map(clean).filter(Boolean) : clean(value) ? [clean(value)] : [];
  const conditionMet = (question) => !question.showWhen || answerValues(state.answers[question.showWhen.questionId]).map(normalized).includes(normalized(question.showWhen.answer));
  const visibleQuestions = () => questions.filter(conditionMet);
  const currentQuestion = () => { const visible = visibleQuestions(); state.current = Math.max(0, Math.min(state.current, visible.length - 1)); return visible[state.current]; };

  function renderQuestionList() {
    els.list.innerHTML = visibleQuestions().map((question, index) => `<button class="question-link ${index === state.current ? "active" : ""} ${isAnswered(question) ? "answered" : ""}" data-index="${index}"><span>${isAnswered(question) ? "✓" : "○"}</span><b>${String(index + 1).padStart(2, "0")}</b><em>${escapeHtml(question.prompt)}</em></button>`).join("");
    els.list.querySelector(".active")?.scrollIntoView({ block: "nearest" });
  }
  function inputMarkup(question, value) {
    if (question.kind === "single" || question.kind === "multi") {
      const type = question.kind === "multi" ? "checkbox" : "radio";
      return question.options.map((option) => { const checked = question.kind === "multi" ? (value || []).includes(option) : value === option; return `<label class="choice"><input type="${type}" name="answer-${escapeHtml(question.id)}" value="${escapeHtml(option)}" ${checked ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`; }).join("");
    }
    if (question.kind === "date") return `<input class="free-answer" type="date" value="${escapeHtml(value || "")}">`;
    if (question.kind === "numeric") return `<input class="free-answer" type="number" min="0" value="${escapeHtml(value ?? "")}" placeholder="Not answered">`;
    return `<p class="text-unavailable-note">(Note from Ali: Current model cannot process text, so I removed this box.)</p>`;
  }
  function renderQuestion() {
    const visible = visibleQuestions(), question = currentQuestion(), answered = isAnswered(question);
    els.meta.textContent = `Question ${state.current + 1} of ${visible.length}  |  ID ${question.id}`;
    els.answerState.textContent = question.kind === "text" ? "No response required" : answered ? "Answered" : "Not answered";
    els.clearAnswer.disabled = question.kind === "text";
    els.prompt.textContent = question.prompt;
    els.options.innerHTML = inputMarkup(question, state.answers[question.id]);
    els.previous.disabled = state.current === 0; els.next.disabled = state.current === visible.length - 1;
    renderQuestionList(); renderScores();
  }
  function scoreAnswers() {
    return window.NebulaModel.score(state.rules, state.answers);
  }
  function activeRules(model='default') { return window.NEBULA_NOTES.rules; }
  function renderScores() {
    for(const model of ['default']) {
    const scores = window.NebulaModel.score(activeRules(model),state.answers);
    const rankedScores = Object.entries(scores).sort(([categoryA, scoreA], [categoryB, scoreB]) =>
      scoreB.points - scoreA.points || categoryA.localeCompare(categoryB, undefined, { sensitivity: "base" })
    );
    const barScale=Math.max(100,...rankedScores.map(([,score])=>Math.abs(score.points)));
    $(model==='default'?'score-list':'trained-score-list').innerHTML = rankedScores.map(([category, score]) => `<button type="button" class="score-row score-button" data-model="${model}" data-category="${escapeHtml(category)}" aria-label="Explain ${escapeHtml(category)} ${model} score"><div class="score-label"><span class="score-class-label">${escapeHtml(category)}</span><span><b class="score-value ${score.points > 0 ? "positive" : score.points < 0 ? "negative" : "zero"}">${score.points >= 0 ? "+" : ""}${Number(score.points.toFixed(3))} pts</b></span></div><div class="score-track" aria-hidden="true"><i class="${score.points < 0 ? "negative" : "positive"}" style="width:${Math.abs(score.points)/barScale*50}%"></i></div></button>`).join("");
    }
    for(const row of document.querySelectorAll('.score-button'))if((state.recorded||[]).includes(row.dataset.category)){const tag=document.createElement('small');tag.textContent=' ✓ Recorded';row.querySelector('.score-class-label').append(tag);}
    document.dispatchEvent(new CustomEvent('nebula:change'));
  }
  function setAnswerFromControl(target) {
    if(state.loadedCaseId)els.patientId.value=state.loadedCaseId+'-modified';
    const question = currentQuestion();
    if (question.kind === "multi") {
      const inputs = [...els.options.querySelectorAll('input[type="checkbox"]')];
      if (normalized(target.value) === "none of the above" && target.checked) inputs.forEach((input) => { if (input !== target) input.checked = false; });
      else if (target.checked) inputs.forEach((input) => { if (normalized(input.value) === "none of the above") input.checked = false; });
      state.answers[question.id] = inputs.filter((input) => input.checked).map((input) => input.value);
    }
    else state.answers[question.id] = target.value;
    if (!isAnswered(question)) delete state.answers[question.id];
    questions.filter((item) => item.showWhen && !conditionMet(item)).forEach((item) => delete state.answers[item.id]);
    renderQuestion();
  }
  function resetQuestionnaire() { state.answers = {}; state.current = 0; state.recorded=[];state.sources=[];state.loadedCaseId=null;els.patientId.value = ""; $("patient-age").value = ""; $("patient-sex").value = ""; renderQuestion(); document.dispatchEvent(new Event('nebula:case-reset')); }
  function downloadJson(value, filename) { const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 0); }
  function exportCase() {
    const ageInput=$("patient-age"), age=ageInput.value===''?null:Number(ageInput.value);
    if(!ageInput.checkValidity() || (age!==null && (!Number.isInteger(age)||age<0||age>120)))return showToast("Enter a whole-number age from 0 to 120, or leave it blank.",true);
    let patientId = clean(els.patientId.value) || `CASE-${Date.now()}`;
    els.patientId.value=patientId;
    const now = new Date(), stamp = now.toISOString().replace(/[-:]/g, "").slice(0, 15), safeId = patientId.replace(/[^a-z0-9_-]/gi, "_");
    downloadJson({ format:"nebula-patient-case",version:1,questionnaire_revision:defaults.questionnaireRevision,patient: { anonymous_id:patientId,age,sex:$("patient-sex").value||null,recorded_labels:state.recorded||[] },Sources:state.sources||[],answers:clone(state.answers) }, `${safeId}_${stamp}.json`);
  }
  let toastTimer;
  function showToast(message, error = false) { clearTimeout(toastTimer); els.toast.textContent = message; els.toast.classList.toggle("error", error); els.toast.classList.add("show"); toastTimer = setTimeout(() => els.toast.classList.remove("show"), 3200); }

  els.list.addEventListener("click", (event) => { const button = event.target.closest("[data-index]"); if (button) { state.current = Number(button.dataset.index); renderQuestion(); } });
  els.options.addEventListener("change", (event) => setAnswerFromControl(event.target));
  els.options.addEventListener("input", (event) => { if (event.target.matches(".free-answer")) setAnswerFromControl(event.target); });
  els.previous.addEventListener("click", () => { state.current = Math.max(0, state.current - 1); renderQuestion(); });
  els.next.addEventListener("click", () => { state.current = Math.min(visibleQuestions().length - 1, state.current + 1); renderQuestion(); });
  els.clearAnswer.addEventListener("click", () => { delete state.answers[currentQuestion().id]; questions.filter((item) => item.showWhen && !conditionMet(item)).forEach((item) => delete state.answers[item.id]); renderQuestion(); });
  $("new-questionnaire").addEventListener("click", resetQuestionnaire); $("export-json").addEventListener("click", exportCase);
  window.NebulaApp = {
    loadCase: (value) => { state.answers=clone(value.answers); state.current=0; state.loadedCaseId=value.caseId;state.recorded=value.recorded;state.sources=value.sources;els.patientId.value=value.caseId; $('patient-age').value=value.age??''; $('patient-sex').value=value.sex; renderQuestion(); },
    snapshot: (model='default') => clone({ answers:state.answers, rules:activeRules(model), configuredRules:state.rules, model:'Machine Learning Model' }), downloadJson
  };
  renderQuestion();
})();
