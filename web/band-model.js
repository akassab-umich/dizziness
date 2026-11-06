window.NEBULA_BANDS = {
  "version": "optional-zero-2026-11-06",
  "name": "Model",
  "method": "Class-balanced integer score optimization with question-type-specific point bounds",
  "thresholds": [
    30,
    40,
    51
  ],
  "trainedCategories": [
    "BPPV",
    "Bilateral",
    "Meniere's",
    "Migraine",
    "Neuritis",
    "PPPD",
    "Third Window"
  ],
  "rules": [
    {
      "category": "BPPV",
      "questionId": "259364",
      "answer": "Yes",
      "weight": 27,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 7,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Minutes",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259370",
      "answer": "once a day",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259370",
      "answer": "several times a day",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "looking up",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "lying down",
      "weight": 9,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "rolling over",
      "weight": 7,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "getting into or out of bed",
      "weight": 8,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "sitting up",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "reaching or bending",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259362",
      "answer": "No",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "259361",
      "answer": "Sudden",
      "weight": 11,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "259362",
      "answer": "Yes",
      "weight": 12,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "259367",
      "answer": "Only 1 episode",
      "weight": 13,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "259371",
      "answer": "walking in the dark",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "260451",
      "answer": "Yes",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "260451",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Hours",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Days",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Days and can last continuously for weeks",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "Yes, right ear only",
      "weight": 11,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "Yes, left ear only",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "Yes, right ear only",
      "weight": 25,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "Yes, left ear only",
      "weight": 16,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "Yes, right ear only",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "Yes, left ear only",
      "weight": 24,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "changes in the weather",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "certain foods",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "certain beverages",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259363",
      "answer": "No",
      "weight": 12,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Meniere's",
      "questionId": "259400",
      "answer": "no",
      "weight": -20,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "unless": {
        "questionId": "259416",
        "answers": [
          "Yes, right ear only",
          "Yes, left ear only"
        ]
      },
      "direction": -1
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "No",
      "weight": -13,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "none of the above",
      "weight": -5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Third Window",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "blowing your nose",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "loud sounds",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "lifting or straining",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "coughing",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Third Window",
      "questionId": "259421",
      "answer": "Yes",
      "weight": 30,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Hours",
      "weight": 6,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Days",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Days and can last continuously for weeks",
      "weight": 8,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "hot bath or shower",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "menstrual cycle",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "exercise",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259383",
      "answer": "Yes",
      "weight": 9,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259384",
      "answer": "Yes",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259385",
      "answer": "Yes",
      "weight": 6,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259386",
      "answer": "Yes",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259387",
      "answer": "Yes",
      "weight": 13,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to light during a headache",
      "weight": 8,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to sound during a headache",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to smell during a headache",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "headaches that happen when you are feeling dizzy or off balance",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "certain foods or beverages increase the chance of getting a headache",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "headaches where the pain throbs or pulses",
      "weight": 8,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "changes in the weather",
      "weight": 7,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "certain foods",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "certain beverages",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259363",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259383",
      "answer": "No",
      "weight": -5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Migraine",
      "questionId": "259384",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Migraine",
      "questionId": "259386",
      "answer": "No",
      "weight": -5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "none of the above",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "PPPD",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 20,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259363",
      "answer": "Yes",
      "weight": 14,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "car rides",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "reading",
      "weight": 8,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "stress, nerves, or anxiety",
      "weight": 9,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "windshield wipers",
      "weight": 5,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "supermarket aisles, malls, or tunnels",
      "weight": 7,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "restaurants or movie theaters",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "turning your head while walking",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "large crowds/social gatherings",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "watching TV",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "walking on carpeting with a complex pattern",
      "weight": 9,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "working on the computer",
      "weight": 8,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "traffic",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "movement of things around you",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "your own movement",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259374",
      "answer": "unsteady when standing",
      "weight": 7,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259381",
      "answer": "heart racing",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259381",
      "answer": "panic feeling or sudden need to leave a place",
      "weight": 9,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259363",
      "answer": "No",
      "weight": -10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "dizziness",
      "weight": -25,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "imbalance",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "dizziness and imbalance",
      "weight": 0,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259362",
      "answer": "No",
      "weight": 22,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259381",
      "answer": "Vision \"jumping\" or \"bouncing\" when walking or riding",
      "weight": 10,
      "editable": true,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Hours",
      "weight": -5,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "BPPV",
      "questionId": "259362",
      "answer": "Yes",
      "weight": -10,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Neuritis",
      "questionId": "259416",
      "answer": "Yes, right ear only",
      "weight": -30,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Neuritis",
      "questionId": "259416",
      "answer": "Yes, left ear only",
      "weight": -30,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Neuritis",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "weight": 5,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "unsteady when standing",
      "weight": 5,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "weight": 0,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "stumbling or falling when walking",
      "weight": 10,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 0,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "lying down",
      "weight": 0,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "sitting up",
      "weight": 0,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "standing up",
      "weight": 5,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 0,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the right ear only",
      "weight": -14,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Bilateral",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the left ear only",
      "weight": -28,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Bilateral",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 22,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259361",
      "answer": "Sudden",
      "weight": -5,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Neuritis",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 0,
      "source": "Experimental ordinal integer score optimization",
      "direction": -1
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "mild",
      "weight": 18,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "moderate",
      "weight": 27,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "moderate",
      "weight": 7,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "severe",
      "weight": 10,
      "source": "Experimental ordinal integer score optimization",
      "direction": 1
    }
  ],
  "fit": {
    "patients": 75,
    "evaluation": "training data only",
    "unrecordedLabels": "proxy negatives; not verified absence",
    "perRuleMagnitudeLimit": 30,
    "checkboxMagnitudeLimit": 10,
    "minimumRuleMagnitude": 5,
    "zeroAllowed": true,
    "boundsApplyTo": "Each scored answer option, per class"
  }
};
