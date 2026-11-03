"""Encode approved answers and compute model evaluation metrics."""

import numpy as np
import torch

torch.set_num_threads(2)


class Features:
    def __init__(self, data):
        self.spec = data["spec"]
        p = data["cases"]
        s = self.spec
        self.observed = torch.tensor([r["observed"] for r in p], dtype=torch.float32)
        self.selected = torch.tensor([r["selected"] for r in p], dtype=torch.float32)
        self.excepted = torch.tensor([r["excepted"] for r in p], dtype=torch.float32)
        self.y = torch.tensor([r["labels"] for r in p], dtype=torch.float32)
        self.c = len(s["categories"])
        self.t = s["tokens"]
        self.k = s["slots"]
        self.g = len(s["questionIds"])
        maxdep = max(len(f["dependencies"]) for f in s["features"])
        self.dep = torch.tensor(
            [
                f["dependencies"] + [self.g] * (maxdep - len(f["dependencies"]))
                for f in s["features"]
            ]
        )
        self.flat = torch.tensor(
            [
                (f["classIndex"] * self.t + f["tokenIndex"]) * 2 * self.k
                + 2 * f["slotIndex"]
                for f in s["features"]
            ]
        )
        self.sign = torch.tensor([f["sign"] for f in s["features"]])

    def encode(self, keep):
        visible = self.observed * keep
        visible = torch.cat([visible, torch.ones(len(visible), 1)], dim=1)
        obs = visible[:, self.dep].prod(-1)
        value = self.selected * (1 - self.excepted) * obs * self.sign
        x = torch.zeros(len(obs), self.c * self.t * 2 * self.k)
        x[:, self.flat] = value
        x[:, self.flat + 1] = obs
        return x.view(-1, self.c, self.t, 2 * self.k)

    def sample_mask(self, generator):
        n = len(self.y)
        u = torch.rand(n, 1, generator=generator)
        keep = (
            torch.rand(n, self.g, generator=generator)
            < (0.1 + 0.85 * torch.rand(n, 1, generator=generator))
        ).float()
        prefix = (
            torch.arange(self.g)[None, :]
            < torch.randint(0, self.g + 1, (n, 1), generator=generator)
        ).float()
        keep = torch.where(
            u < 0.3, torch.ones_like(keep), torch.where(u < 0.6, prefix, keep)
        )
        return keep


def metrics(prob, y):
    p = np.asarray(prob)
    y = np.asarray(y)
    eps = 1e-7
    order = np.argsort(-p, axis=1, kind="stable")
    top3 = np.zeros_like(y, dtype=bool)
    np.put_along_axis(top3, order[:, :3], True, axis=1)
    return {
        "brier": float(np.mean((p - y) ** 2)),
        "logLoss": float(
            np.mean(
                -y * np.log(np.clip(p, eps, 1))
                - (1 - y) * np.log(np.clip(1 - p, eps, 1))
            )
        ),
        "recordedTop3": int((top3 * y).sum()),
        "recordedCount": int(y.sum()),
        "recordedMeanEstimate": float(p[y == 1].mean()),
        "unrecordedMeanEstimate": float(p[y == 0].mean()),
    }
