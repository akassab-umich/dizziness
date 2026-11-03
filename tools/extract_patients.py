"""Extract worksheet patient blocks into WolverineDataExtractor-compatible JSON."""

import argparse
import datetime as dt
import json
import pathlib
import re
import hashlib
from collections import defaultdict
import openpyxl
from dateutil import parser as dates


def text(cell):
    v = cell.value
    if v is None:
        return None
    if isinstance(v, (dt.datetime, dt.date)):
        if cell.number_format.lower() in ("d-mmm", "dd-mmm"):
            return f'{v.day}-{v.strftime("%b")}'
        return f"{v.month}/{v.day}/{v.year}"
    return str(int(v)) if isinstance(v, float) and v.is_integer() else str(v).strip()


def extract(path, modified=None, corrections=None):
    if (
        corrections
        and hashlib.sha256(path.read_bytes()).hexdigest() != corrections["sourceSha256"]
    ):
        raise ValueError(
            "Corrections do not match this workbook. Review the source before applying them."
        )
    wb = openpyxl.load_workbook(path, data_only=True)
    records = []
    for sheet in wb:
        blocks = []
        block = []
        for row in sheet.iter_rows(min_col=1, max_col=4):
            if any(c.value is not None for c in row):
                block.append(row)
            elif block:
                blocks.append(block)
                block = []
        if block:
            blocks.append(block)
        for number, block in enumerate(blocks, 1):
            while block and block[0][0].value is None and block[0][1].value is None:
                block = block[1:]
            if not block:
                continue
            gender = next(
                (
                    text(r[2])
                    for r in block
                    if (text(r[2]) or "").lower() in ("male", "female")
                ),
                None,
            )
            age = next(
                (text(r[3]) for r in block if isinstance(r[3].value, (int, float))),
                None,
            )
            submitted = next(
                (text(r[1]) for r in block if "Filed by" in (text(r[1]) or "")), None
            )
            date = None
            if submitted:
                try:
                    date = dates.parse(
                        re.split(r"\s+(?:EDT|EST)", submitted)[0]
                    ).isoformat()
                except ValueError:
                    pass
            responses = []
            for row in block:
                q, a = text(row[0]), text(row[1])
                if q and q.strip().lower() == "question":
                    continue
                if a and "Filed by" in a:
                    continue
                if q:
                    responses.append({"Question": q, "Row": row[0].row, "Answers": []})
                if a and responses:
                    responses[-1]["Answers"].append(a)
            start, end = block[0][0].row, block[-1][0].row
            diagnosis = sheet.title.split("(")[0].strip()
            if corrections:
                for change in corrections["corrections"]:
                    if change["sourceSheet"] == sheet.title and change[
                        "sourceRows"
                    ] == [start, end]:
                        if "correctedAge" in change:
                            if age != str(change["extractedAge"]):
                                raise ValueError("Unexpected source age")
                            age = str(change["correctedAge"])
                        if "correctedDiagnosis" in change:
                            if diagnosis != change["extractedDiagnosis"]:
                                raise ValueError("Unexpected source diagnosis")
                            diagnosis = change["correctedDiagnosis"]
            source_diagnosis = sheet.title.split("(")[0].strip()
            source = {
                "SourceFile": path.name,
                "SourceFileLastModified": modified
                or dt.datetime.fromtimestamp(path.stat().st_mtime).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "SheetName": sheet.title,
                "Diagnosis": source_diagnosis,
                "PatientNumber": number,
                "StartRow": start,
                "EndRow": end,
                "DifferingResponses": None,
            }
            records.append(
                {
                    "Diagnoses": [diagnosis],
                    "Submitted": submitted,
                    "SubmittedDate": date,
                    "Gender": gender,
                    "Age": age,
                    "Sources": [source],
                    "Responses": responses,
                }
            )
    merged = {}
    for r in sorted(
        records,
        key=lambda r: (r["Sources"][0]["SheetName"], r["Sources"][0]["StartRow"]),
    ):
        key = json.dumps(
            [
                r["Submitted"],
                r["Gender"],
                r["Age"],
                [(x["Question"], x["Answers"]) for x in r["Responses"]],
            ],
            ensure_ascii=False,
        )
        if key in merged:
            merged[key]["Sources"] += r["Sources"]
            merged[key]["Diagnoses"] = sorted(
                set(merged[key]["Diagnoses"] + r["Diagnoses"])
            )
        else:
            merged[key] = r
    return list(merged.values())


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("workbook", type=pathlib.Path)
    p.add_argument("output", type=pathlib.Path)
    p.add_argument("--source-modified")
    p.add_argument("--corrections", type=pathlib.Path)
    p.add_argument("--compare", type=pathlib.Path)
    a = p.parse_args()
    records = extract(
        a.workbook,
        a.source_modified,
        json.loads(a.corrections.read_text()) if a.corrections else None,
    )
    counts = defaultdict(int)
    if any(
        (parent / ".git").exists()
        for parent in [a.output.resolve(), *a.output.resolve().parents]
    ):
        raise ValueError("Keep patient JSON output outside Git repositories.")
    if a.output.exists() and any(a.output.iterdir()):
        raise ValueError("Use a new empty output folder to avoid stale patient files.")
    for r in sorted(
        records,
        key=lambda r: any(s["Diagnosis"] not in r["Diagnoses"] for s in r["Sources"]),
    ):
        group = "+".join(r["Diagnoses"])
        counts[group] += 1
        folder = a.output / group
        folder.mkdir(parents=True, exist_ok=True)
        (folder / f"{group}_Patient{counts[group]:03}.json").write_text(
            json.dumps(r, indent=2, ensure_ascii=False) + "\n"
        )
    print(json.dumps({"patients": len(records), "groups": dict(counts)}))
    if a.compare:
        key = lambda r: tuple(
            sorted((s["SheetName"], s["StartRow"], s["EndRow"]) for s in r["Sources"])
        )
        expected = {
            key(r): r
            for f in a.compare.glob("*/*.json")
            for r in [json.loads(f.read_text())]
        }
        differences = [
            {
                "sources": key(r),
                "fields": [k for k in r if r[k] != expected.get(key(r), {}).get(k)],
            }
            for r in records
            if r != expected.get(key(r))
        ]
        print(
            json.dumps(
                {
                    "referencePatients": len(expected),
                    "exactMatches": len(records) - len(differences),
                    "differences": differences,
                },
                indent=2,
            )
        )
        if differences or len(records) != len(expected):
            raise SystemExit(1)
