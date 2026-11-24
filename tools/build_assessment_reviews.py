"""Build display-only reviewer references from assessment ZIP exports."""

import argparse
import json
import zipfile
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("archives", nargs="+", type=Path)
args = parser.parse_args()
reviews = []
seen = set()
for archive in args.archives:
    if archive.suffix.lower() == ".json":
        documents = [json.loads(archive.read_text())]
    else:
        with zipfile.ZipFile(archive) as zipped:
            documents = [
                json.loads(zipped.read(name))
                for name in sorted(zipped.namelist())
                if name.endswith(".json") and not name.startswith("__MACOSX/")
            ]
    for data in documents:
        reviewer = data["firstName"].strip()
        assert reviewer in (
            "Katie",
            "Michelle",
        ), "Review display placement for new reviewers"
        key = (reviewer, data["diagnosis"]["id"])
        assert key not in seen, "Duplicate reviewer/diagnosis export"
        seen.add(key)
        ratings = []
        for rating in data["reviewerRatings"]:
            assert not rating["fixed"]
            value = rating["significance"]
            assert type(value) is int and -10 <= value <= 10
            ratings.append(
                {
                    k: rating[k]
                    for k in ("questionId", "answer", "significance", "sliderAdjusted")
                }
            )
        reviews.append(
            {"reviewer": reviewer, "diagnosisId": key[1], "ratings": ratings}
        )
output = Path(__file__).resolve().parents[1] / "web/assessment-reviews.js"
output.write_text(
    "/* Display-only team judgments; never used to initialize sliders or score patients. */\n(function(root) {\n  const reviews = "
    + json.dumps(reviews, ensure_ascii=False, separators=(",", ":"))
    + ';\n  if (typeof module === "object" && module.exports) module.exports = reviews;\n  else root.NEBULA_ASSESSMENT_REVIEWS = reviews;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n'
)
print(
    f"Built {len(reviews)} assessments, {sum(len(r['ratings']) for r in reviews)} reference marks."
)
