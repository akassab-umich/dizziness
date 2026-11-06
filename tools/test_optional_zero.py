"""Check zero-or-active domains and remembered clinical directions."""

import unittest
import numpy as np
from train_point_bands import fit_category


class OptionalZeroTests(unittest.TestCase):
    def test_harmful_negative_rule_can_turn_off(self):
        weights, _ = fit_category(
            np.array([[1], [0]]),
            np.array([True, False]),
            np.array([-5]),
            10,
            5,
            directions=np.array([-1]),
        )
        self.assertEqual(weights.tolist(), [0])

    def test_disabled_positive_rules_can_reactivate_without_flipping(self):
        weights, _ = fit_category(
            np.array([[1, 1], [0, 0]]),
            np.array([True, False]),
            np.array([0, 0]),
            30,
            5,
            directions=np.array([1, 1]),
        )
        self.assertGreaterEqual(weights.sum(), 51)
        self.assertTrue(np.all((weights >= 5) & (weights <= 30)))


if __name__ == "__main__":
    unittest.main()
