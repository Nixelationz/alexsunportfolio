#!/usr/bin/env python3
"""Report the smallest positive gap between distinct perfect powers in each decade interval.

This is a focused check for:
- [10^9, 10^10)
- [10^10, 10^11)
- [10^11, 10^12)
- [10^12, 10^13)
- [10^13, 10^14)

Unlike the main project, this allows the minimum gap to repeat across different
pairs, but still requires the two perfect powers to be distinct values.
"""

from __future__ import annotations

import math
from pathlib import Path

INTERVALS = [
    (10**9, 10**10),
    (10**10, 10**11),
    (10**11, 10**12),
    (10**12, 10**13),
    (10**13, 10**14),
]

OUTPUT_PATH = Path(__file__).with_name("interval_min_gap_10n.txt")


def generate_perfect_powers_in_range(start: int, end: int):
    """Return the set of distinct perfect powers in [start, end)."""
    if start >= end:
        return set()

    powers = set()
    max_exponent = int(math.log2(end)) + 1
    for exponent in range(2, max_exponent + 1):
        base = 2
        while True:
            value = base**exponent
            if value >= end:
                break
            if value >= start:
                powers.add(value)
            base += 1
    return powers


def smallest_gap(values):
    """Return the minimum positive difference between distinct sorted values."""
    if len(values) < 2:
        return None

    ordered = sorted(values)
    best = ordered[1] - ordered[0]
    best_pair = (ordered[0], ordered[1])
    for left, right in zip(ordered, ordered[1:]):
        gap = right - left
        if gap < best:
            best = gap
            best_pair = (left, right)
    return best, best_pair


def main() -> None:
    lines = [
        "Smallest positive difference between distinct perfect powers in each decade interval",
        "",
    ]

    for start, end in INTERVALS:
        values = generate_perfect_powers_in_range(start, end)
        result = smallest_gap(values)
        if result is None:
            lines.append(f"[{start:,} to {end:,}) -> no perfect powers found")
            continue

        gap, (left, right) = result
        lines.append(f"[{start:,} to {end:,}) -> smallest difference = {gap} from {left} and {right}")

    output = "\n".join(lines) + "\n"
    OUTPUT_PATH.write_text(output, encoding="utf-8")
    print(output, end="")


if __name__ == "__main__":
    main()
