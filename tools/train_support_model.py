#!/usr/bin/env python3
"""Sign-constrained additive logistic model. Nested patient-level validation."""
import argparse, json, hashlib
from pathlib import Path
import numpy as np
import torch
from scipy.optimize import minimize
from scipy.special import expit, logit
from sklearn.model_selection import KFold
from training_features import Features, metrics

ROOT = Path(__file__).resolve().parents[1]
LAMBDAS = (0.003, 0.03, 0.3)
BALANCED = False


def design(data):
    f = Features(data)
    s = data["spec"]
    flat = f.encode(torch.ones_like(f.observed)).numpy().reshape(len(f.y), -1)
    x = flat[:, f.flat.numpy()].astype(float)
    # Whole-question masks: original missingness and conditional dependencies remain intact.
    masks = [x]
    rng = np.random.default_rng(1701)
    for fraction in (0.25, 0.5, 0.75):
        keep = torch.tensor((rng.random(f.observed.shape) < fraction).astype("float32"))
        masks.append(
            f.encode(keep)
            .numpy()
            .reshape(len(f.y), -1)[:, f.flat.numpy()]
            .astype(float)
        )
    return f, x, masks


def fit(x, y, ids, lam):
    models = []
    for c, ix in enumerate(ids):
        xx = x[:, ix]
        yy = y[:, c]
        prior = 0.0 if BALANCED else float(logit((yy.sum() + 1) / (len(yy) + 2)))
        prevalence = (yy.sum() + 1) / (len(yy) + 2)
        sample_weight = (
            np.where(yy > 0, 0.5 / prevalence, 0.5 / (1 - prevalence))
            if BALANCED
            else np.ones(len(yy))
        )
        sample_weight = sample_weight / sample_weight.mean()

        def objective(theta):
            z = prior + theta[0] + xx @ theta[1:]
            res = (expit(z) - yy) * sample_weight
            loss = (
                np.mean((np.logaddexp(0, z) - yy * z) * sample_weight)
                + 0.5 * lam * np.sum(theta[1:] ** 2)
                + 0.5 * theta[0] ** 2
            )
            grad = np.r_[res.mean() + theta[0], xx.T @ res / len(yy) + lam * theta[1:]]
            return loss, grad

        result = minimize(
            objective,
            np.zeros(len(ix) + 1),
            jac=True,
            method="L-BFGS-B",
            bounds=[(None, None)] + [(0, None)] * len(ix),
            options={"maxiter": 1000, "ftol": 1e-12, "gtol": 1e-8},
        )
        if not result.success:
            raise RuntimeError(result.message)
        models.append(
            {
                "indices": ix.tolist(),
                "intercept": prior + float(result.x[0]),
                "weights": result.x[1:].tolist(),
            }
        )
    return models


def predict(models, x):
    return np.column_stack(
        [expit(m["intercept"] + x[:, m["indices"]] @ m["weights"]) for m in models]
    )


def extended(p, y, categories):
    r = metrics(p, y)
    order = np.argsort(-p, axis=1, kind="stable")
    r["top1Patients"] = int(sum(y[i, order[i, 0]] for i in range(len(y))))
    r["patients"] = len(y)
    r["byClass"] = {
        c: {
            "recorded": int(y[:, j].sum()),
            "recordedTop3": int(
                sum(y[i, j] and j in order[i, :3] for i in range(len(y)))
            ),
        }
        for j, c in enumerate(categories)
    }
    return r


def main():
    global BALANCED
    parser = argparse.ArgumentParser()
    parser.add_argument("--deploy-local", action="store_true")
    parser.add_argument("--balanced", action="store_true")
    args = parser.parse_args()
    BALANCED = args.balanced
    stem = "additive-balanced" if BALANCED else "additive"
    raw = (ROOT / "private-results/neural-input.json").read_bytes()
    data = json.loads(raw)
    s = data["spec"]
    f, x, masks = design(data)
    y = f.y.numpy()
    n = len(y)
    assert len({json.dumps(p["answers"], sort_keys=True) for p in data["cases"]}) == n
    ids = [
        np.array([i for i, v in enumerate(s["features"]) if v["classIndex"] == c])
        for c in range(len(s["categories"]))
    ]

    # Full answers receive half the training weight; three masked copies share the other half.
    def train_subset(idx, lam):
        xx = np.concatenate([x[idx]] * 3 + [m[idx] for m in masks[1:]])
        yy = np.concatenate([y[idx]] * 6)
        return fit(xx, yy, ids, lam)

    def select(idx):
        scores = {}
        for lam in LAMBDAS:
            pp = np.zeros_like(y[idx])
            for tr, te in KFold(3, shuffle=True, random_state=1702).split(idx):
                pp[te] = predict(train_subset(idx[tr], lam), x[idx[te]])
            if BALANCED:
                yy = y[idx]
                prev = (yy.sum(0) + 1) / (len(yy) + 2)
                ww = np.where(yy > 0, 0.5 / prev, 0.5 / (1 - prev))
                pp = np.clip(pp, 1e-7, 1 - 1e-7)
                scores[str(lam)] = float(
                    np.sum(ww * (-yy * np.log(pp) - (1 - yy) * np.log(1 - pp)))
                    / ww.sum()
                )
            else:
                scores[str(lam)] = metrics(pp, y[idx])["logLoss"]
        return min(LAMBDAS, key=lambda l: scores[str(l)]), scores

    oof = np.zeros_like(y)
    half = np.zeros_like(y)
    folds = []
    for fold, (tr, te) in enumerate(
        KFold(5, shuffle=True, random_state=2026).split(y), 1
    ):
        lam, selection = select(tr)
        model = train_subset(tr, lam)
        oof[te] = predict(model, x[te])
        half[te] = predict(model, masks[2][te])
        folds.append(
            {
                "fold": fold,
                "lambda": lam,
                "innerLogLoss": selection,
                "train": len(tr),
                "test": len(te),
                "testIndices": te.tolist(),
            }
        )
        print(
            "Fold",
            fold,
            "lambda",
            lam,
            "top3",
            metrics(oof[te], y[te])["recordedTop3"],
            flush=True,
        )
    lam, selection = select(np.arange(n))
    models = train_subset(np.arange(n), lam)
    prob = predict(models, x)
    report = {
        "method": "Sign-constrained L2-regularized additive logistic regression; 5 outer patient folds, 3 inner folds for regularization; pre-existing expert features. Not external validation.",
        "classBalanced": BALANCED,
        "parameters": len(s["features"]) + len(s["categories"]),
        "lambda": lam,
        "fullDataInnerLogLoss": selection,
        "inSample": extended(prob, y, s["categories"]),
        "outOfFold": extended(oof, y, s["categories"]),
        "outOfFoldHalfAnswers": extended(half, y, s["categories"]),
        "folds": folds,
        "predictions": prob.tolist(),
        "outOfFoldPredictions": oof.tolist(),
        "inputSHA256": hashlib.sha256(raw).hexdigest(),
    }
    (ROOT / f"private-results/{stem}-evaluation.json").write_text(
        json.dumps(report, indent=2)
    )
    package = {
        "version": stem + "-v1-2026-10-31",
        "kind": "additive-logistic",
        "classBalanced": BALANCED,
        "models": models,
        "training": {
            "parameters": report["parameters"],
            "regularization": lam,
            "patients": n,
        },
    }
    (ROOT / f"private-results/{stem}-model.json").write_text(
        json.dumps(package, indent=2)
    )
    if args.deploy_local:
        (ROOT / "web/logistic-model.js").write_text(
            "window.LOGISTIC_MODEL = "
            + json.dumps(package, separators=(",", ":"))
            + ";\n"
        )
        fixtures = []
        for pi in range(n):
            for mode in ["full", "empty", "random", "prefix"]:
                keep = torch.ones_like(f.observed)
                if mode == "empty":
                    keep.zero_()
                if mode == "random":
                    keep = (
                        torch.rand(
                            f.observed.shape,
                            generator=torch.Generator().manual_seed(300 + pi),
                        )
                        < 0.5
                    ).float()
                if mode == "prefix":
                    keep[:, max(1, pi % f.g) :] = 0
                encoded = f.encode(keep)
                xx = encoded.numpy().reshape(n, -1)[:, f.flat.numpy()]
                answers = {
                    k: v
                    for k, v in data["cases"][pi]["answers"].items()
                    if k not in s["questionIds"] or keep[pi, s["questionIds"].index(k)]
                }
                fixtures.append(
                    {
                        "case": pi,
                        "mode": mode,
                        "answers": answers,
                        "features": encoded[pi].tolist(),
                        "prediction": predict(models, xx)[pi].tolist(),
                    }
                )
        (ROOT / "private-results/additive-parity-fixtures.json").write_text(
            json.dumps(fixtures)
        )
    print(
        json.dumps(
            {
                k: v
                for k, v in report.items()
                if k not in ["folds", "predictions", "outOfFoldPredictions"]
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
