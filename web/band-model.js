window.NEBULA_BANDS = {
  "version": "stable-new-classes-2026-11-24",
  "name": "Model",
  "basedOnVersion": "meeting-2-severity-2026-10-28",
  "method": "Frozen original seven scorecards plus compact patient-calibrated new-class rules",
  "scoringMode": "net-points",
  "trainedCategories": [
    "BPPV",
    "Bilateral",
    "Labyrinthitis Hypofunction",
    "Meniere's",
    "Migraine",
    "Neuritis",
    "PPPD",
    "Schwannoma Hypofunction",
    "Third Window"
  ],
  "rules": [
    {
      "category": "BPPV",
      "questionId": "259364",
      "answer": "Yes",
      "weight": 15,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 15
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 8,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Minutes",
      "weight": 8,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "BPPV",
      "questionId": "259370",
      "answer": "once a day",
      "weight": 8,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "BPPV",
      "questionId": "259370",
      "answer": "several times a day",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "looking up",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "lying down",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "rolling over",
      "weight": 10,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 8
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "getting into or out of bed",
      "weight": 10,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 8
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "sitting up",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "reaching or bending",
      "weight": 1,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "BPPV",
      "questionId": "259362",
      "answer": "No",
      "weight": 11,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 15
    },
    {
      "category": "Neuritis",
      "questionId": "259361",
      "answer": "Sudden",
      "weight": 19,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 25
    },
    {
      "category": "Neuritis",
      "questionId": "259362",
      "answer": "Yes",
      "weight": 15,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "Neuritis",
      "questionId": "259367",
      "answer": "Only 1 episode",
      "weight": 19,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 20
    },
    {
      "category": "Neuritis",
      "questionId": "259371",
      "answer": "walking in the dark",
      "weight": 13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 10
    },
    {
      "category": "Neuritis",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 9,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 10
    },
    {
      "category": "Neuritis",
      "questionId": "260451",
      "answer": "Yes",
      "weight": 9,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 12
    },
    {
      "category": "Neuritis",
      "questionId": "260451",
      "answer": "No",
      "weight": -13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -13
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Hours",
      "weight": 6,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 5
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Days",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 5
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Days and can last continuously for weeks",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 5
    },
    {
      "category": "Meniere's",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "weight": 19,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 16
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "Yes, right ear only",
      "weight": 9,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 9
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "Yes, left ear only",
      "weight": 10,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 8
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "Yes, right ear only",
      "weight": 18,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 16
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "Yes, left ear only",
      "weight": 20,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 16
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "Yes, right ear only",
      "weight": 12,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 16
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "Yes, left ear only",
      "weight": 15,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 16
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "changes in the weather",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 5
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "certain foods",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 5
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "certain beverages",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Meniere's",
      "questionId": "259363",
      "answer": "No",
      "weight": 10,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "Meniere's",
      "questionId": "259400",
      "answer": "no",
      "weight": -8,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "unless": {
        "questionId": "259416",
        "answers": [
          "Yes, right ear only",
          "Yes, left ear only"
        ]
      },
      "direction": -1,
      "anchorWeight": -8
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "No",
      "weight": -15,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -16
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 0,
      "anchorWeight": 0
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "No",
      "weight": -13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -13
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "none of the above",
      "weight": -5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -4
    },
    {
      "category": "Third Window",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 30,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 25
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "blowing your nose",
      "weight": 13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "loud sounds",
      "weight": 26,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 26
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "lifting or straining",
      "weight": 7,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 10
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "coughing",
      "weight": 7,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 10
    },
    {
      "category": "Third Window",
      "questionId": "259421",
      "answer": "Yes",
      "weight": 26,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 25
    },
    {
      "category": "Third Window",
      "questionId": "259421",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 0,
      "anchorWeight": 0
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Hours",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Days",
      "weight": 1,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Days and can last continuously for weeks",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "hot bath or shower",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "menstrual cycle",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "exercise",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Migraine",
      "questionId": "259383",
      "answer": "Yes",
      "weight": 7,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "Migraine",
      "questionId": "259384",
      "answer": "Yes",
      "weight": 13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "Migraine",
      "questionId": "259385",
      "answer": "Yes",
      "weight": 8,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "Migraine",
      "questionId": "259386",
      "answer": "Yes",
      "weight": 10,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 12
    },
    {
      "category": "Migraine",
      "questionId": "259387",
      "answer": "Yes",
      "weight": 13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to light during a headache",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to sound during a headache",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to smell during a headache",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "headaches that happen when you are feeling dizzy or off balance",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "certain foods or beverages increase the chance of getting a headache",
      "weight": 1,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "headaches where the pain throbs or pulses",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "changes in the weather",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "certain foods",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "certain beverages",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "Migraine",
      "questionId": "259363",
      "answer": "No",
      "weight": 5,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 7
    },
    {
      "category": "Migraine",
      "questionId": "259383",
      "answer": "No",
      "weight": -13,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -13
    },
    {
      "category": "Migraine",
      "questionId": "259384",
      "answer": "No",
      "weight": -12,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -13
    },
    {
      "category": "Migraine",
      "questionId": "259386",
      "answer": "No",
      "weight": -4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -6
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "none of the above",
      "weight": -8,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -6
    },
    {
      "category": "PPPD",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 11,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 15
    },
    {
      "category": "PPPD",
      "questionId": "259363",
      "answer": "Yes",
      "weight": 11,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 15
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "car rides",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "reading",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "stress, nerves, or anxiety",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "windshield wipers",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "supermarket aisles, malls, or tunnels",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "restaurants or movie theaters",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 3
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "turning your head while walking",
      "weight": 3,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "large crowds/social gatherings",
      "weight": 1,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "watching TV",
      "weight": 1,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "walking on carpeting with a complex pattern",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "working on the computer",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "traffic",
      "weight": 1,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "movement of things around you",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "your own movement",
      "weight": 2,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 2
    },
    {
      "category": "PPPD",
      "questionId": "259374",
      "answer": "unsteady when standing",
      "weight": 12,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "PPPD",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "weight": 10,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 9
    },
    {
      "category": "PPPD",
      "questionId": "259381",
      "answer": "heart racing",
      "weight": 16,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "PPPD",
      "questionId": "259381",
      "answer": "panic feeling or sudden need to leave a place",
      "weight": 12,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 13
    },
    {
      "category": "PPPD",
      "questionId": "259363",
      "answer": "No",
      "weight": -15,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -15
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "dizziness",
      "weight": -7,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -6
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "imbalance",
      "weight": 11,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 12
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "dizziness and imbalance",
      "weight": 4,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 6
    },
    {
      "category": "Bilateral",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 15,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 19
    },
    {
      "category": "Bilateral",
      "questionId": "259362",
      "answer": "No",
      "weight": 22,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 19
    },
    {
      "category": "Bilateral",
      "questionId": "259381",
      "answer": "Vision \"jumping\" or \"bouncing\" when walking or riding",
      "weight": 23,
      "editable": true,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 19
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Hours",
      "weight": -7,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -7
    },
    {
      "category": "BPPV",
      "questionId": "259362",
      "answer": "Yes",
      "weight": -15,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -15
    },
    {
      "category": "Neuritis",
      "questionId": "259416",
      "answer": "Yes, right ear only",
      "weight": -10,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -10
    },
    {
      "category": "Neuritis",
      "questionId": "259416",
      "answer": "Yes, left ear only",
      "weight": -13,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -10
    },
    {
      "category": "Neuritis",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "weight": 15,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 12
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "unsteady when standing",
      "weight": 4,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 6
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "weight": 4,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 6
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "stumbling or falling when walking",
      "weight": 7,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 6
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": -5,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -4
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "lying down",
      "weight": 4,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "sitting up",
      "weight": 4,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "standing up",
      "weight": 4,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 4,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 4
    },
    {
      "category": "Bilateral",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the right ear only",
      "weight": -13,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -10
    },
    {
      "category": "Bilateral",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the left ear only",
      "weight": -10,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -10
    },
    {
      "category": "Bilateral",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 13,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 10
    },
    {
      "category": "Bilateral",
      "questionId": "259361",
      "answer": "Sudden",
      "weight": -10,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -10
    },
    {
      "category": "Neuritis",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": -7,
      "source": "Conservative recalibration of final October workshop points",
      "direction": -1,
      "anchorWeight": -10
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "mild",
      "weight": 12,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 12
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "moderate",
      "weight": 6,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 6
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "severe",
      "weight": 0,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 0,
      "anchorWeight": 0
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "mild",
      "weight": 0,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 0,
      "anchorWeight": 0
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "moderate",
      "weight": 6,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 6
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "severe",
      "weight": 12,
      "source": "Conservative recalibration of final October workshop points",
      "direction": 1,
      "anchorWeight": 12
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259356",
      "answer": "dizziness",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259356",
      "answer": "imbalance",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259356",
      "answer": "dizziness and imbalance",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 8,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259357",
      "answer": "sensation of rocking or swaying",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 6,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259357",
      "answer": "sensation of tilting",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        6
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 6,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259361",
      "answer": "Sudden",
      "direction": 1,
      "weight": 23,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": true
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259361",
      "answer": "Gradual",
      "direction": -1,
      "weight": -9,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -6,
        -10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -8,
      "patientSelected": true
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259366",
      "answer": "moderate",
      "direction": 1,
      "weight": 22,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        4,
        5
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 5,
      "patientSelected": true
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259366",
      "answer": "severe",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        4,
        10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259367",
      "answer": "Only 1 episode",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        3,
        10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259367",
      "answer": "2-4 episodes",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        3,
        4
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 4,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259369",
      "answer": "Hours",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259369",
      "answer": "Days",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        4,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 9,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259371",
      "answer": "rolling over",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 8,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259371",
      "answer": "getting into or out of bed",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259371",
      "answer": "walking in the dark",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        7,
        3
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 0,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        7,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 9,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259372",
      "answer": "car rides",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        4
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 5,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259372",
      "answer": "turning your head while walking",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        4
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 5,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259372",
      "answer": "working on the computer",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        2
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 0,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259372",
      "answer": "movement of things around you",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        3,
        3
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 3,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259372",
      "answer": "your own movement",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 8,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 8,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 9,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259400",
      "answer": "Yes",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the right ear only",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the left ear only",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259416",
      "answer": "No",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259417",
      "answer": "Yes, right ear only",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        6
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 6,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259417",
      "answer": "Yes, left ear only",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259421",
      "answer": "Yes",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -10,
        -10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259421",
      "answer": "No",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "260450",
      "answer": "changes in the weather",
      "direction": -1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -5,
        -3
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -4,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "260450",
      "answer": "certain foods",
      "direction": -1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -5,
        -8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "260450",
      "answer": "certain beverages",
      "direction": -1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -5,
        -9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -7,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "260450",
      "answer": "none of the above",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        10
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 10,
      "patientSelected": false
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "260451",
      "answer": "Yes",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        10,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 9,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259387",
      "answer": "N/A. Don't experience headaches",
      "direction": 0,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        0,
        0
      ],
      "adjusted": [
        false,
        false
      ],
      "thirdRoundJudgment": 0,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259389",
      "answer": "none of the above",
      "direction": 0,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        0,
        0
      ],
      "adjusted": [
        false,
        false
      ],
      "thirdRoundJudgment": 0,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259400",
      "answer": "Yes",
      "direction": 1,
      "weight": 22,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        5
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 6,
      "patientSelected": true
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259415",
      "answer": "Yes, hearing loss in both ears",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -5,
        -9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -9,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the right ear only",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the left ear only",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        6,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259417",
      "answer": "Yes, right ear only",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -10,
        -4
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -9,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259417",
      "answer": "Yes, left ear only",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -10,
        -4
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -9,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259418",
      "answer": "Yes, right ear only",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -10,
        -9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -10,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259418",
      "answer": "Yes, left ear only",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -10,
        -9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -10,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "260450",
      "answer": "none of the above",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        5,
        9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 9,
      "patientSelected": false
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "260451",
      "answer": "Yes",
      "direction": -1,
      "weight": -5,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        -10,
        -9
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": -10,
      "patientSelected": true
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "260451",
      "answer": "No",
      "direction": 1,
      "weight": 21,
      "maximum": 25,
      "consensus": true,
      "source": "Shared survey direction only; patient-calibrated compact new-class scorecard",
      "judgments": [
        4,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 8,
      "patientSelected": true
    }
  ],
  "constraints": {
    "radiusFraction": 0.25,
    "minimumRadius": 1,
    "zeroRulesFrozen": true,
    "unobservedRulesFrozen": true,
    "signsPreserved": true,
    "positiveBudgetRange": [
      0.75,
      1.25
    ],
    "classMeanSupportGuard": true,
    "workshopOrderingsPreserved": true
  },
  "fit": {
    "patients": 92,
    "diagnoses": 100,
    "sourceWorkbook": "AI data  pull_11.20.xlsx",
    "evaluation": "Training data only; unrecorded diagnoses are not confirmed negatives",
    "inputSHA256": "6c3270fade59bb1afa844ae49a487e14f77059b261f203d63c8f1bb109104e07",
    "objectiveBefore": 0.016524476650461674,
    "objectiveAfter": 0.011992951764859913,
    "acceptedMoves": 77,
    "method": "Deterministic bounded local search; not a claim of global optimality"
  },
  "consensusFit": {
    "patients": 99,
    "diagnoses": 109,
    "sourceWorkbook": "AI data  pull_11.20.xlsx",
    "existingWeightsFrozen": true,
    "surveyMagnitudesUsedAsPoints": false,
    "fixedStabilityCutoff": null,
    "selection": "Patient separation, soft resampling reliability, sample-size-dependent question penalty and bounded forward selection",
    "newClasses": [
      "Labyrinthitis Hypofunction",
      "Schwannoma Hypofunction"
    ],
    "maximumQuestionsPerNewClass": 6,
    "checkboxQuestionBudgetPerDirection": 10,
    "objectiveBefore": 0.09452858050890836,
    "objectiveAfter": 0.01361802418040254,
    "evaluation": "All fitting patients; not held-out validation. Unrecorded labels are proxy negatives."
  }
};
