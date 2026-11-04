"""Build the current supported cohort from one source workbook only."""

import argparse
import collections
import hashlib
import json
from pathlib import Path
from extract_patients import extract

SUPPORTED = {
    "BPPV",
    "VMigraine",
    "NeuritisHypo",
    "Bilateral wkns",
    "Menieres",
    "PPPD",
    "ScCD",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workbook", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    if any(
        (parent / ".git").exists()
        for parent in [args.output.resolve(), *args.output.resolve().parents]
    ):
        raise ValueError("Patient files must stay outside Git repositories.")
    if args.output.exists() and any(args.output.iterdir()):
        raise ValueError("Choose a new empty output folder.")
    records = extract(args.workbook)
    groups = collections.Counter()
    classes = collections.Counter()
    for patient in records:
        labels = sorted(set(patient["Diagnoses"]) & SUPPORTED)
        if not labels:
            continue
        patient["Diagnoses"] = labels
        patient["Sources"] = [
            source for source in patient["Sources"] if source["Diagnosis"] in SUPPORTED
        ]
        group = "+".join(labels)
        groups[group] += 1
        classes.update(labels)
        folder = args.output / group
        folder.mkdir(parents=True, exist_ok=True)
        (folder / f"{group}_Patient{groups[group]:03}.json").write_text(
            json.dumps(patient, indent=2, ensure_ascii=False) + "\n"
        )
    print(
        json.dumps(
            {
                "workbook": args.workbook.name,
                "sha256": hashlib.sha256(args.workbook.read_bytes()).hexdigest(),
                "allMergedPatients": len(records),
                "supportedPatients": sum(groups.values()),
                "excludedUnsupportedOnly": len(records) - sum(groups.values()),
                "diagnosisCounts": dict(classes),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
