window.NEBULA_BANDS = {
  "version": "patient-supported-sparse-2026-11-24",
  "name": "Model",
  "basedOnVersion": "meeting-2-severity-2026-10-28",
  "method": "Expert-sign-constrained sparse scorecard with stratified-bootstrap stability screening",
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
      "weight": 22,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 15,
      "patientSelected": true
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Minutes",
      "weight": 6,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": true
    },
    {
      "category": "BPPV",
      "questionId": "259370",
      "answer": "once a day",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259370",
      "answer": "several times a day",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "looking up",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "lying down",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "rolling over",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 8,
      "patientSelected": true
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "getting into or out of bed",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 8,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "sitting up",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259371",
      "answer": "reaching or bending",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "BPPV",
      "questionId": "259362",
      "answer": "No",
      "weight": 5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 15,
      "patientSelected": true
    },
    {
      "category": "Neuritis",
      "questionId": "259361",
      "answer": "Sudden",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 25,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259362",
      "answer": "Yes",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259367",
      "answer": "Only 1 episode",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 20,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259371",
      "answer": "walking in the dark",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 10,
      "patientSelected": true
    },
    {
      "category": "Neuritis",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 10,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "260451",
      "answer": "Yes",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 12,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "260451",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -13,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Hours",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 5,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Days",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 5,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259369",
      "answer": "Days and can last continuously for weeks",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 5,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 16,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "Yes, right ear only",
      "weight": 23,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 9,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "Yes, left ear only",
      "weight": 16,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 8,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "Yes, right ear only",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 16,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "Yes, left ear only",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 16,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "Yes, right ear only",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 16,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "Yes, left ear only",
      "weight": 20,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 16,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "changes in the weather",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 5,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "certain foods",
      "weight": 6,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 5,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "certain beverages",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259363",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259400",
      "answer": "no",
      "weight": -8,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "unless": {
        "questionId": "259416",
        "answers": [
          "Yes, right ear only",
          "Yes, left ear only"
        ]
      },
      "direction": -1,
      "anchorWeight": -8,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "259416",
      "answer": "No",
      "weight": -5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -16,
      "patientSelected": true
    },
    {
      "category": "Meniere's",
      "questionId": "259417",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 0,
      "anchorWeight": 0,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "259418",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -13,
      "patientSelected": false
    },
    {
      "category": "Meniere's",
      "questionId": "260450",
      "answer": "none of the above",
      "weight": -5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -4,
      "patientSelected": true
    },
    {
      "category": "Third Window",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 25,
      "patientSelected": true
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "blowing your nose",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": false
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "loud sounds",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 26,
      "patientSelected": true
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "lifting or straining",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 10,
      "patientSelected": false
    },
    {
      "category": "Third Window",
      "questionId": "259372",
      "answer": "coughing",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 10,
      "patientSelected": false
    },
    {
      "category": "Third Window",
      "questionId": "259421",
      "answer": "Yes",
      "weight": 25,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 25,
      "patientSelected": true
    },
    {
      "category": "Third Window",
      "questionId": "259421",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 0,
      "anchorWeight": 0,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Hours",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Days",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Days and can last continuously for weeks",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "hot bath or shower",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "menstrual cycle",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259372",
      "answer": "exercise",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259383",
      "answer": "Yes",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259384",
      "answer": "Yes",
      "weight": 22,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259385",
      "answer": "Yes",
      "weight": 5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259386",
      "answer": "Yes",
      "weight": 5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 12,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259387",
      "answer": "Yes",
      "weight": 7,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to light during a headache",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to sound during a headache",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "increased sensitivity to smell during a headache",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "headaches that happen when you are feeling dizzy or off balance",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "certain foods or beverages increase the chance of getting a headache",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259389",
      "answer": "headaches where the pain throbs or pulses",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "changes in the weather",
      "weight": 5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "certain foods",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "certain beverages",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259363",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 7,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259383",
      "answer": "No",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -13,
      "patientSelected": false
    },
    {
      "category": "Migraine",
      "questionId": "259384",
      "answer": "No",
      "weight": -5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -13,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259386",
      "answer": "No",
      "weight": -5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -6,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "260450",
      "answer": "none of the above",
      "weight": -5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -6,
      "patientSelected": true
    },
    {
      "category": "PPPD",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 15,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259363",
      "answer": "Yes",
      "weight": 25,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 15,
      "patientSelected": true
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "car rides",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "reading",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "stress, nerves, or anxiety",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "windshield wipers",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "supermarket aisles, malls, or tunnels",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "restaurants or movie theaters",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 3,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "turning your head while walking",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "large crowds/social gatherings",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "watching TV",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "walking on carpeting with a complex pattern",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": true
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "working on the computer",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "traffic",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "movement of things around you",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 1,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259372",
      "answer": "your own movement",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 2,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259374",
      "answer": "unsteady when standing",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 9,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259381",
      "answer": "heart racing",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": true
    },
    {
      "category": "PPPD",
      "questionId": "259381",
      "answer": "panic feeling or sudden need to leave a place",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 13,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259363",
      "answer": "No",
      "weight": -5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -15,
      "patientSelected": true
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "dizziness",
      "weight": -10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -6,
      "patientSelected": true
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "imbalance",
      "weight": 5,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 12,
      "patientSelected": true
    },
    {
      "category": "Bilateral",
      "questionId": "259356",
      "answer": "dizziness and imbalance",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 6,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 0,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 19,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259362",
      "answer": "No",
      "weight": 12,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 19,
      "patientSelected": true
    },
    {
      "category": "Bilateral",
      "questionId": "259381",
      "answer": "Vision \"jumping\" or \"bouncing\" when walking or riding",
      "weight": 10,
      "editable": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 19,
      "patientSelected": true
    },
    {
      "category": "BPPV",
      "questionId": "259369",
      "answer": "Hours",
      "weight": -5,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -7,
      "patientSelected": true
    },
    {
      "category": "BPPV",
      "questionId": "259362",
      "answer": "Yes",
      "weight": -6,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -15,
      "patientSelected": true
    },
    {
      "category": "Neuritis",
      "questionId": "259416",
      "answer": "Yes, right ear only",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -10,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259416",
      "answer": "Yes, left ear only",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -10,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259381",
      "answer": "Nausea or vomiting",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 12,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "unsteady when standing",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 6,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "unsteady when walking",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 6,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259374",
      "answer": "stumbling or falling when walking",
      "weight": 5,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 6,
      "patientSelected": true
    },
    {
      "category": "Migraine",
      "questionId": "259369",
      "answer": "Seconds",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -4,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "lying down",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "sitting up",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "standing up",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "PPPD",
      "questionId": "259371",
      "answer": "any kind of head movement",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 4,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the right ear only",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -10,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259415",
      "answer": "Yes, hearing loss in the left ear only",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -10,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 18,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 10,
      "patientSelected": true
    },
    {
      "category": "Bilateral",
      "questionId": "259361",
      "answer": "Sudden",
      "weight": -5,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -10,
      "patientSelected": true
    },
    {
      "category": "Neuritis",
      "questionId": "259361",
      "answer": "Gradual",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": -1,
      "anchorWeight": -10,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "mild",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 12,
      "patientSelected": false
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "moderate",
      "weight": 23,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 6,
      "patientSelected": true
    },
    {
      "category": "Neuritis",
      "questionId": "259366",
      "answer": "severe",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 0,
      "anchorWeight": 0,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "mild",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 0,
      "anchorWeight": 0,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "moderate",
      "weight": 0,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 6,
      "patientSelected": false
    },
    {
      "category": "Bilateral",
      "questionId": "259366",
      "answer": "severe",
      "weight": 17,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "direction": 1,
      "anchorWeight": 12,
      "patientSelected": true
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259356",
      "answer": "dizziness",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": 10,
      "maximum": 10,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "judgments": [
        5,
        6
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 6,
      "patientSelected": true
    },
    {
      "category": "Labyrinthitis Hypofunction",
      "questionId": "259361",
      "answer": "Sudden",
      "direction": 1,
      "weight": 9,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": -11,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": 11,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": 10,
      "maximum": 10,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "judgments": [
        6,
        4
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
      "questionId": "259372",
      "answer": "turning your head while walking",
      "direction": 1,
      "weight": 0,
      "maximum": 10,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": 25,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": 12,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "judgments": [
        6,
        7
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 7,
      "patientSelected": true
    },
    {
      "category": "Schwannoma Hypofunction",
      "questionId": "259417",
      "answer": "Yes, right ear only",
      "direction": -1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
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
      "questionId": "260451",
      "answer": "No",
      "direction": 1,
      "weight": 0,
      "maximum": 25,
      "consensus": true,
      "source": "Expert direction with patient stability screening and sparse point calibration",
      "judgments": [
        4,
        8
      ],
      "adjusted": [
        true,
        true
      ],
      "thirdRoundJudgment": 8,
      "patientSelected": false
    }
  ],
  "sparseFit": {
    "patients": 99,
    "diagnoses": 109,
    "sourceWorkbook": "AI data  pull_11.20.xlsx",
    "bootstrapResamples": 2000,
    "minimumStability": 0.8,
    "minimumDirectionalSeparation": 0.15,
    "maximumQuestionsPerClass": 8,
    "maximumCheckboxOptionsPerDirectionPerQuestion": 1,
    "neutralWeight": 0,
    "nonzeroBounds": {
      "single": [
        5,
        25
      ],
      "multi": [
        5,
        10
      ]
    },
    "activeRules": 49,
    "objectiveBefore": 0.038509861958613015,
    "objectiveAfter": 0.0235024870992934,
    "evaluation": "Same fitting cases. Bootstrap stability is not held-out validation or diagnostic probability."
  }
};
