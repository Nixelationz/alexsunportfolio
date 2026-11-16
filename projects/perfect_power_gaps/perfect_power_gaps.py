#!/usr/bin/env python3
"""
Search consecutive distinct perfect powers for gaps n = 1..MAX_GAP.

A perfect power here is a^b with a >= 2 and b >= 2.
Duplicates such as 64 = 8^2 = 4^3 = 2^6 are collapsed to the single value 64.
A gap counts only when the two perfect-power VALUES are consecutive in sorted order.
"""

import argparse
import math
from pathlib import Path

DEFAULT_LIMIT = 1_000_000
MAX_GAP = 100
WORKSPACE_DIR = Path(__file__).resolve().parent
RESULTS_PATH = WORKSPACE_DIR / "results_1_to_100.txt"
MISSING_PATH = WORKSPACE_DIR / "missing_numbers.txt"
PROGRESSION_PATH = WORKSPACE_DIR / "gaps_by_10n.txt"


def parse_limit(raw_limit: str | None) -> int:
    """Parse a user-supplied limit such as 1000000 or 10^7."""
    if raw_limit is None:
        return DEFAULT_LIMIT

    text = raw_limit.strip().replace("_", "")
    if not text:
        raise ValueError("Please provide a search limit.")

    if "^" in text:
        if text.count("^") != 1:
            raise ValueError("Use a single exponent expression like '10^7'.")

        base_text, exponent_text = (part.strip() for part in text.split("^", 1))
        if not base_text or not exponent_text:
            raise ValueError("Use a valid exponent expression like '10^7'.")

        try:
            base = int(base_text)
            exponent = int(exponent_text)
        except ValueError as exc:
            raise ValueError("Use integers in exponent form like '10^7'.") from exc

        if base < 0 or exponent < 0:
            raise ValueError("Limit values must be non-negative.")

        return base**exponent

    try:
        limit = int(text)
    except ValueError as exc:
        raise ValueError("Use a whole-number limit like 1000000 or 10^7.") from exc

    if limit < 1:
        raise ValueError("Limit must be at least 1.")

    return limit


def is_prime(number: int) -> bool:
    if number < 2:
        return False
    for divisor in range(2, math.isqrt(number) + 1):
        if number % divisor == 0:
            return False
    return True


def integer_nth_root(value: int, exponent: int) -> int:
    low = 1
    high = value
    while low + 1 < high:
        middle = (low + high) // 2
        if middle**exponent <= value:
            low = middle
        else:
            high = middle
    return low


def simplify_representation(base: int, exponent: int):
    lowest_base = base
    total_exponent = exponent
    for base_exponent in range(2, math.floor(math.log2(base)) + 1):
        root = integer_nth_root(base, base_exponent)
        if root >= 2 and root**base_exponent == base and root < lowest_base:
            lowest_base = root
            total_exponent = exponent * base_exponent
    return lowest_base, total_exponent


def generate_perfect_powers(limit: int):
    """Return {value: [(base, exponent), ...]} for all perfect powers <= limit."""
    reps = {}
    max_exponent = limit.bit_length()
    prime_exponents = [
        exponent for exponent in range(2, max_exponent + 1) if is_prime(exponent)
    ]
    for exponent in prime_exponents:
        base = 2
        while base**exponent <= limit:
            value = base**exponent
            reps.setdefault(value, []).append((base, exponent))
            base += 1
    return reps


def choose_rep(representations):
    """
    Pick a readable representation for output.
    Prefer the lowest base, then the lowest exponent.
    """
    simplified = [simplify_representation(base, exponent) for base, exponent in representations]
    return min(simplified, key=lambda ab: (ab[0], ab[1]))


def find_first_gaps(limit: int, max_gap: int):
    reps = generate_perfect_powers(limit)
    values = sorted(reps)

    first = {}
    for lower, upper in zip(values, values[1:]):
        gap = upper - lower
        if 1 <= gap <= max_gap and gap not in first:
            first[gap] = (lower, upper)

    return reps, first


def format_number(value: int) -> str:
    return f"{value:,}"


def format_power(value: int) -> str:
    exponent = int(math.log10(value))
    return f"10^{exponent}"


def build_results_text(limit: int, reps, first) -> str:
    lines = [
        f"Perfect-power gaps 1-{MAX_GAP}",
        f"Search limit: {format_number(limit)}",
        "Rule: a^b - c^d = n, with a,b,c,d >= 2, and the two values must be consecutive distinct perfect powers.",
        "",
    ]

    for n in range(1, MAX_GAP + 1):
        if n not in first:
            lines.append(f"{n} = Unknown")
            continue

        lower, upper = first[n]
        a, b = choose_rep(reps[upper])
        c, d = choose_rep(reps[lower])
        lines.append(f"{n} = {a}^{b} - {c}^{d} = {upper} - {lower}")

    return "\n".join(lines) + "\n"


def build_missing_text(limit: int, missing):
    header = [
        f"Missing gaps from 1-{MAX_GAP} after searching consecutive perfect powers up to {format_number(limit)}:",
        "",
    ]

    if missing:
        header.append(", ".join(map(str, missing)))
    else:
        header.append("None")

    header.append("")
    header.append(f"Count: {len(missing)}")
    return "\n".join(header) + "\n"


def power_of_ten_limits(limit: int):
    limits = []
    current = 10
    while current <= limit:
        limits.append(current)
        current *= 10
    return limits


def build_progression_text(limit: int):
    checkpoints = power_of_ten_limits(limit)
    if not checkpoints:
        return (
            "Gap discoveries by powers of ten\n"
            f"No checkpoints were generated because the search limit was below 10.\n"
        )

    sections = ["Gap discoveries by powers of ten", ""]
    previous_first = None
    previous_checkpoint = None

    for checkpoint in checkpoints:
        reps, first = find_first_gaps(checkpoint, MAX_GAP)

        if previous_first is None:
            new_first = first
            interval_label = f"New gaps found up to {format_power(checkpoint)}"
        else:
            new_first = {n: first[n] for n in range(1, MAX_GAP + 1) if n in first and n not in previous_first}
            interval_label = (
                f"New gaps found between {format_power(previous_checkpoint)} and {format_power(checkpoint)}"
            )

        sections.append(f"Search limit: {format_power(checkpoint)}")
        sections.append(f"{interval_label}: {len(new_first)}")
        sections.append("")

        for n, (lower, upper) in sorted(new_first.items(), key=lambda item: item[1][0]):
            a, b = choose_rep(reps[upper])
            c, d = choose_rep(reps[lower])
            sections.append(f"{n} = {a}^{b} - {c}^{d}")

        sections.append("")

        previous_first = first
        previous_checkpoint = checkpoint

    return "\n".join(sections).rstrip() + "\n"


def main():
    parser = argparse.ArgumentParser(
        description=(
            "Search consecutive distinct perfect powers up to a limit and save the results to "
            "results_1_to_100.txt, missing_numbers.txt, and gaps_by_10n.txt."
        )
    )
    parser.add_argument(
        "limit",
        nargs="?",
        help="Optional search limit, for example 1000000 or 10^7.",
    )
    args = parser.parse_args()

    try:
        limit = parse_limit(args.limit)
    except ValueError as exc:
        parser.error(str(exc))

    reps, first = find_first_gaps(limit, MAX_GAP)

    results_text = build_results_text(limit, reps, first)
    RESULTS_PATH.write_text(results_text, encoding="utf-8")

    missing = [n for n in range(1, MAX_GAP + 1) if n not in first]
    MISSING_PATH.write_text(build_missing_text(limit, missing), encoding="utf-8")

    progression_text = build_progression_text(limit)
    PROGRESSION_PATH.write_text(progression_text, encoding="utf-8")

    print(results_text, end="")
    print()
    print(
        f"Updated {RESULTS_PATH.name}, {MISSING_PATH.name}, and {PROGRESSION_PATH.name} "
        f"for limit {format_number(limit)}."
    )


if __name__ == "__main__":
    main()
