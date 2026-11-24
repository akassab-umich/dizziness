/* Permitted expert rule directions, not patient records. */
const candidates = [
  {
    "category": "BPPV",
    "questionId": "259364",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259369",
    "answer": "Seconds",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259369",
    "answer": "Minutes",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259370",
    "answer": "once a day",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259370",
    "answer": "several times a day",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259371",
    "answer": "looking up",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259371",
    "answer": "lying down",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259371",
    "answer": "rolling over",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259371",
    "answer": "getting into or out of bed",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259371",
    "answer": "sitting up",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259371",
    "answer": "reaching or bending",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259362",
    "answer": "No",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259361",
    "answer": "Sudden",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259362",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259367",
    "answer": "Only 1 episode",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259371",
    "answer": "walking in the dark",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259371",
    "answer": "any kind of head movement",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "260451",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "260451",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Meniere's",
    "questionId": "259369",
    "answer": "Hours",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259369",
    "answer": "Days",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259369",
    "answer": "Days and can last continuously for weeks",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259381",
    "answer": "Nausea or vomiting",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259417",
    "answer": "Yes, right ear only",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259417",
    "answer": "Yes, left ear only",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259418",
    "answer": "Yes, right ear only",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259418",
    "answer": "Yes, left ear only",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259416",
    "answer": "Yes, right ear only",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259416",
    "answer": "Yes, left ear only",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "260450",
    "answer": "changes in the weather",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "260450",
    "answer": "certain foods",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "260450",
    "answer": "certain beverages",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259363",
    "answer": "No",
    "direction": 1
  },
  {
    "category": "Meniere's",
    "questionId": "259400",
    "answer": "no",
    "direction": -1,
    "unless": {
      "questionId": "259416",
      "answers": [
        "Yes, right ear only",
        "Yes, left ear only"
      ]
    }
  },
  {
    "category": "Meniere's",
    "questionId": "259416",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Meniere's",
    "questionId": "259417",
    "answer": "No",
    "direction": 0
  },
  {
    "category": "Meniere's",
    "questionId": "259418",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Meniere's",
    "questionId": "260450",
    "answer": "none of the above",
    "direction": -1
  },
  {
    "category": "Third Window",
    "questionId": "259369",
    "answer": "Seconds",
    "direction": 1
  },
  {
    "category": "Third Window",
    "questionId": "259372",
    "answer": "blowing your nose",
    "direction": 1
  },
  {
    "category": "Third Window",
    "questionId": "259372",
    "answer": "loud sounds",
    "direction": 1
  },
  {
    "category": "Third Window",
    "questionId": "259372",
    "answer": "lifting or straining",
    "direction": 1
  },
  {
    "category": "Third Window",
    "questionId": "259372",
    "answer": "coughing",
    "direction": 1
  },
  {
    "category": "Third Window",
    "questionId": "259421",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Third Window",
    "questionId": "259421",
    "answer": "No",
    "direction": 0
  },
  {
    "category": "Migraine",
    "questionId": "259369",
    "answer": "Hours",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259369",
    "answer": "Days",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259369",
    "answer": "Days and can last continuously for weeks",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259372",
    "answer": "hot bath or shower",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259372",
    "answer": "menstrual cycle",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259372",
    "answer": "exercise",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259383",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259384",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259385",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259386",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259387",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259389",
    "answer": "increased sensitivity to light during a headache",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259389",
    "answer": "increased sensitivity to sound during a headache",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259389",
    "answer": "increased sensitivity to smell during a headache",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259389",
    "answer": "headaches that happen when you are feeling dizzy or off balance",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259389",
    "answer": "certain foods or beverages increase the chance of getting a headache",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259389",
    "answer": "headaches where the pain throbs or pulses",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "260450",
    "answer": "changes in the weather",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "260450",
    "answer": "certain foods",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "260450",
    "answer": "certain beverages",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259363",
    "answer": "No",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259383",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Migraine",
    "questionId": "259384",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Migraine",
    "questionId": "259386",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Migraine",
    "questionId": "260450",
    "answer": "none of the above",
    "direction": -1
  },
  {
    "category": "PPPD",
    "questionId": "259361",
    "answer": "Gradual",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259363",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "car rides",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "reading",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "stress, nerves, or anxiety",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "windshield wipers",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "supermarket aisles, malls, or tunnels",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "restaurants or movie theaters",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "turning your head while walking",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "large crowds/social gatherings",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "watching TV",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "walking on carpeting with a complex pattern",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "working on the computer",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "traffic",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "movement of things around you",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259372",
    "answer": "your own movement",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259374",
    "answer": "unsteady when standing",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259374",
    "answer": "unsteady when walking",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259381",
    "answer": "heart racing",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259381",
    "answer": "panic feeling or sudden need to leave a place",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259363",
    "answer": "No",
    "direction": -1
  },
  {
    "category": "Bilateral",
    "questionId": "259356",
    "answer": "dizziness",
    "direction": -1
  },
  {
    "category": "Bilateral",
    "questionId": "259356",
    "answer": "imbalance",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259356",
    "answer": "dizziness and imbalance",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259371",
    "answer": "any kind of head movement",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259362",
    "answer": "No",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259381",
    "answer": "Vision \"jumping\" or \"bouncing\" when walking or riding",
    "direction": 1
  },
  {
    "category": "BPPV",
    "questionId": "259369",
    "answer": "Hours",
    "direction": -1
  },
  {
    "category": "BPPV",
    "questionId": "259362",
    "answer": "Yes",
    "direction": -1
  },
  {
    "category": "Neuritis",
    "questionId": "259416",
    "answer": "Yes, right ear only",
    "direction": -1
  },
  {
    "category": "Neuritis",
    "questionId": "259416",
    "answer": "Yes, left ear only",
    "direction": -1
  },
  {
    "category": "Neuritis",
    "questionId": "259381",
    "answer": "Nausea or vomiting",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259374",
    "answer": "unsteady when standing",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259374",
    "answer": "unsteady when walking",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259374",
    "answer": "stumbling or falling when walking",
    "direction": 1
  },
  {
    "category": "Migraine",
    "questionId": "259369",
    "answer": "Seconds",
    "direction": -1
  },
  {
    "category": "PPPD",
    "questionId": "259371",
    "answer": "lying down",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259371",
    "answer": "sitting up",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259371",
    "answer": "standing up",
    "direction": 1
  },
  {
    "category": "PPPD",
    "questionId": "259371",
    "answer": "any kind of head movement",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259415",
    "answer": "Yes, hearing loss in the right ear only",
    "direction": -1
  },
  {
    "category": "Bilateral",
    "questionId": "259415",
    "answer": "Yes, hearing loss in the left ear only",
    "direction": -1
  },
  {
    "category": "Bilateral",
    "questionId": "259361",
    "answer": "Gradual",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259361",
    "answer": "Sudden",
    "direction": -1
  },
  {
    "category": "Neuritis",
    "questionId": "259361",
    "answer": "Gradual",
    "direction": -1
  },
  {
    "category": "Neuritis",
    "questionId": "259366",
    "answer": "mild",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259366",
    "answer": "moderate",
    "direction": 1
  },
  {
    "category": "Neuritis",
    "questionId": "259366",
    "answer": "severe",
    "direction": 0
  },
  {
    "category": "Bilateral",
    "questionId": "259366",
    "answer": "mild",
    "direction": 0
  },
  {
    "category": "Bilateral",
    "questionId": "259366",
    "answer": "moderate",
    "direction": 1
  },
  {
    "category": "Bilateral",
    "questionId": "259366",
    "answer": "severe",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259356",
    "answer": "dizziness",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259356",
    "answer": "imbalance",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259356",
    "answer": "dizziness and imbalance",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259357",
    "answer": "sensation of rocking or swaying",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259357",
    "answer": "sensation of tilting",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259361",
    "answer": "Sudden",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259361",
    "answer": "Gradual",
    "direction": -1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259366",
    "answer": "moderate",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259366",
    "answer": "severe",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259367",
    "answer": "Only 1 episode",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259367",
    "answer": "2-4 episodes",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259369",
    "answer": "Hours",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259369",
    "answer": "Days",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259371",
    "answer": "rolling over",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259371",
    "answer": "getting into or out of bed",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259371",
    "answer": "walking in the dark",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259371",
    "answer": "any kind of head movement",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259372",
    "answer": "car rides",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259372",
    "answer": "turning your head while walking",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259372",
    "answer": "working on the computer",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259372",
    "answer": "movement of things around you",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259372",
    "answer": "your own movement",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259374",
    "answer": "unsteady when walking",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259381",
    "answer": "Nausea or vomiting",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259400",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259415",
    "answer": "Yes, hearing loss in the right ear only",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259415",
    "answer": "Yes, hearing loss in the left ear only",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259416",
    "answer": "No",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259417",
    "answer": "Yes, right ear only",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259417",
    "answer": "Yes, left ear only",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259421",
    "answer": "Yes",
    "direction": -1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "259421",
    "answer": "No",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "260450",
    "answer": "changes in the weather",
    "direction": -1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "260450",
    "answer": "certain foods",
    "direction": -1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "260450",
    "answer": "certain beverages",
    "direction": -1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "260450",
    "answer": "none of the above",
    "direction": 1
  },
  {
    "category": "Labyrinthitis Hypofunction",
    "questionId": "260451",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259387",
    "answer": "N/A. Don't experience headaches",
    "direction": 0
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259389",
    "answer": "none of the above",
    "direction": 0
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259400",
    "answer": "Yes",
    "direction": 1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259415",
    "answer": "Yes, hearing loss in both ears",
    "direction": -1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259415",
    "answer": "Yes, hearing loss in the right ear only",
    "direction": 1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259415",
    "answer": "Yes, hearing loss in the left ear only",
    "direction": 1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259417",
    "answer": "Yes, right ear only",
    "direction": -1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259417",
    "answer": "Yes, left ear only",
    "direction": -1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259418",
    "answer": "Yes, right ear only",
    "direction": -1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "259418",
    "answer": "Yes, left ear only",
    "direction": -1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "260450",
    "answer": "none of the above",
    "direction": 1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "260451",
    "answer": "Yes",
    "direction": -1
  },
  {
    "category": "Schwannoma Hypofunction",
    "questionId": "260451",
    "answer": "No",
    "direction": 1
  }
];
if (typeof module === "object" && module.exports) module.exports = candidates;
