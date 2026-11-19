/* Proposed team questions for assessment only; not active in triage scoring. */
(function (root, factory) {
  const data = factory();
  if (typeof module === "object" && module.exports) module.exports = data;
  else root.NEBULA_ASSESSMENT_QUESTIONS = data;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return {
    revision: "future-proposals-2026-11-19",
    questions: [
      {
        id: "future-01",
        prompt: "Since your symptoms first began, have they changed over time?",
        kind: "single",
        options: [
          "They have steadily improved",
          "They have worsened",
          "They have stayed about the same",
          "They have fluctuated or come and go",
        ],
      },
      {
        id: "future-02",
        prompt: "Do you experience visual auras?",
        kind: "single",
        options: ["Yes", "No"],
      },
      {
        id: "future-03",
        prompt:
          "Do your episodes of dizziness or vertigo occur with a migraine-like headache?",
        kind: "single",
        options: ["Yes", "No"],
      },
      {
        id: "future-04",
        prompt: "Are you symptom free between episodes?",
        kind: "single",
        options: [
          "Yes, I feel completely normal between episodes",
          "No, I have some symptoms between episodes",
          "My symptoms are present most of the time",
        ],
      },
      {
        id: "future-05",
        prompt:
          "Have you ever been diagnosed with or treated for anxiety, panic attacks, or depression?",
        kind: "single",
        options: [
          "Anxiety",
          "Panic attacks",
          "Depression",
          "More than one of these",
          "None of these",
          "Prefer not to answer",
        ],
      },
      {
        id: "future-06",
        prompt:
          "Are you currently taking medication for anxiety, panic attacks, depression, or stress?",
        kind: "single",
        options: ["Yes", "No", "Prefer not to answer"],
      },
      {
        id: "future-07",
        prompt: "When was your most recent episode of dizziness or vertigo?",
        kind: "single",
        options: [
          "Within the past 24 hours",
          "1-7 days ago",
          "1-4 weeks ago",
          "1-6 months ago",
          "More than 6 months ago",
          "I don't remember",
        ],
      },
      {
        id: "future-08",
        prompt: "Do you experience any of these?",
        kind: "multi",
        options: [
          "Excessive sweating",
          "Unusual sweating",
          "Chills",
          "Feeling unusually hot or cold",
          "Difficulty regulating body temperature",
          "Racing or pounding heartbeat",
          "Lightheadedness when standing",
          "Symptoms that worsen with prolonged standing",
          "None of the above",
        ],
      },
      {
        id: "future-09",
        prompt:
          "Do you have difficulty falling asleep and/or experience poor sleep quality?",
        kind: "single",
        options: ["Yes", "No", "Unsure"],
      },
      {
        id: "future-10",
        prompt: "Does anything make your dizziness or imbalance better?",
        kind: "multi",
        options: [
          "Holding on to things or having physical support",
          "Sitting still or not moving",
          "Lying down in a dark room",
          "Dietary modifications",
          "Nothing",
        ],
      },
      {
        id: "future-11",
        prompt: "Do you have difficulty with:",
        kind: "multi",
        options: [
          "Judging depth or distance",
          "Walking on uneven surfaces",
          "Walking in the dark",
          "Walking in crowded or visually busy environments",
          "Walking while turning your head",
          "Moving through a grocery store or shopping mall",
          "None of these",
        ],
      },
      {
        id: "future-12",
        prompt:
          "Is there anything else about your symptoms that we did not ask about?",
        kind: "text",
        options: [],
      },
    ],
  };
});
