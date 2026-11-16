# Perfect Power Gaps

This project searches for gaps between **consecutive distinct perfect powers**.

A perfect power is a number of the form

`a^b`

with

`a >= 2` and `b >= 2`.

The equation being investigated is

`a^b - c^d = n`

with

`a, b, c, d >= 2`.

For a solution to count, `c^d` and `a^b` must be **consecutive values** in the sorted list of distinct perfect powers. In other words, there cannot be another perfect power strictly between them.

For example:

`1 = 3^2 - 2^3 = 9 - 8`

because 8 and 9 are consecutive distinct perfect powers.

A fake-looking solution can fail if another perfect power is in the middle. For example:

`29 = 15^2 - 14^2 = 225 - 196`

does **not** count, because `216 = 6^3` lies between 196 and 225.

## Duplicate values

Different expressions can represent the same perfect-power value. For example:

`64 = 8^2 = 4^3 = 2^6`

The program collapses these into the single value `64` before checking gaps. Otherwise duplicate representations would create meaningless zero-length steps.

## Files

- `perfect_power_gaps.py` — generates distinct perfect powers up to a configurable limit and finds the first occurrence of each gap from 1 to 100.
- `results_1_to_100.txt` — current results for gaps 1 to 100.
- `missing_numbers.txt` — gaps not found at the current search limit.
- `gaps_by_10n.txt` — first discoveries grouped by power-of-ten search intervals.
- `plot_gap_heatmap.py` — creates a vertical semi-log heat map from the results file.
- `gap_heatmap.svg` — generated heat-map image.

## Current search range

The included results search through:

`100,000,000,000,000` (10^14)

## Running it

Open this folder in VS Code and run:

```bash
python perfect_power_gaps.py 10^14
```

To search farther, edit:

The script accepts a numeric limit or power notation, for example:

```bash
python perfect_power_gaps.py 10^14
```

To regenerate the heat map after running the search:

```bash
python plot_gap_heatmap.py
```

## Important detail

The program records the **first occurrence** of each gap. A later pair may also produce the same gap, but only the earliest consecutive-perfect-power pair is printed.
