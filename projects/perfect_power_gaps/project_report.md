# Perfect-Power Gap Search Report

## Scope

The main search examines gap sizes from 1 through 100 between **consecutive distinct perfect-power values**. A perfect power is an integer of the form `a^b`, with `a >= 2` and `b >= 2`. Different expressions for the same value are collapsed before the consecutive values are compared.

The current saved search limit is `10^14`. The project was restored to the 1–100 target range; it no longer produces the expanded 1–1,000 result files.

## Main Results

At the `10^14` limit, the search found a first consecutive-perfect-power pair for **73 of the 100** target gap sizes. The remaining **27** are listed in [missing_numbers.txt](missing_numbers.txt):

`6, 14, 22, 29, 31, 34, 42, 44, 46, 50, 52, 54, 58, 62, 64, 66, 70, 72, 78, 82, 84, 86, 88, 90, 91, 96, 98`

The largest unresolved target is 98; the smallest is 6. Of the 27 missing values, 24 are even and 3 are odd (29, 31, and 91).

The decade progression in [gaps_by_10n.txt](gaps_by_10n.txt) shows where each newly observed gap first appeared:

| Search limit            |    New gap sizes | Cumulative found |
| ----------------------- | ---------------: | ---------------: |
| `10^1`                  |                2 |                2 |
| `10^2`                  |                8 |               10 |
| `10^3`                  |               21 |               31 |
| `10^4`                  |               29 |               60 |
| `10^5`                  |                6 |               66 |
| `10^6`                  |                3 |               69 |
| `10^7`                  |                2 |               71 |
| `10^8`                  |                1 |               72 |
| `10^9`                  |                1 |               73 |
| `10^10` through `10^14` | 0 in each decade |               73 |

Thus, 60 of the 73 observed gap sizes (about 82%) were found by `10^4`, and every currently known target gap was found by `10^9`. Extending the main search from `10^9` to `10^14` did not add another gap size in the 1–100 range. This is a finite-search observation, not proof that the remaining values never occur.

## Smallest Differences Within High-Value Intervals

A separate scan in [interval_min_gap_search.py](interval_min_gap_search.py) asks a different question: within each half-open interval, what is the smallest positive difference between two distinct perfect-power values? Repeated gap sizes are allowed; equal perfect-power values are not. These minima need not be new gap sizes, and values greater than 100 are outside the main project's target range.

| Interval         | Smallest difference | Example values                            |
| ---------------- | ------------------: | ----------------------------------------- |
| `[10^9, 10^10)`  |                  60 | 2,535,525,316 and 2,535,525,376           |
| `[10^10, 10^11)` |                 100 | 18,821,096,000 and 18,821,096,100         |
| `[10^11, 10^12)` |                  17 | 143,384,152,904 and 143,384,152,921       |
| `[10^12, 10^13)` |                 341 | 7,615,646,045,316 and 7,615,646,045,657   |
| `[10^13, 10^14)` |                 427 | 27,909,116,936,037 and 27,909,116,936,464 |

The smallest of these five interval minima is 17 in `[10^11, 10^12)`. The two larger interval minima, 341 and 427, exceed the main search's maximum target gap of 100. The interval results are recorded in [interval_min_gap_10n.txt](interval_min_gap_10n.txt).

## Additional Observations

- The first-occurrence search and the interval-minimum scan answer different questions. The first records only the earliest consecutive pair for each gap size; the second looks for the closest pair inside each specified numeric interval, allowing a previously seen gap size to recur.
- Since each interval minimum is computed after sorting its distinct values, its minimizing pair has no other perfect-power value between it within that interval. Both pair members lie in the same interval, so any value between them would also lie there.
- Search activity becomes sparse well before `10^14`: only seven new target gap sizes appeared after `10^5`, and none appeared after `10^9`.
- A run at `10^15` was attempted but did not complete within the five-minute execution window. This is a practical runtime limit of the current approach and environment, not a mathematical or input-parsing limit. The `10^14` search completed, though it also took longer than five minutes in the latest run.

## Method and Limitations

The main program generates perfect powers up to the requested limit, deduplicates equal values, sorts them, then checks differences between adjacent values. This makes its reported gaps consecutive by construction. The interval-minimum script instead generates distinct perfect powers separately inside each interval and compares adjacent values within that interval.

The results are exhaustive only within the tested numeric limits and the stated target ranges. An `Unknown` entry means no qualifying pair was found by `10^14`; it does not mean the gap is mathematically impossible. The exploratory interval minima are exact for the enumerated intervals, subject to the correctness of the enumeration implementation.

## Project Files

- [perfect_power_gaps.py](perfect_power_gaps.py) performs the main 1–100 search.
- [results_1_to_100.txt](results_1_to_100.txt) contains the latest first-occurrence results.
- [missing_numbers.txt](missing_numbers.txt) lists the unresolved target gaps at the saved limit.
- [gaps_by_10n.txt](gaps_by_10n.txt) groups first discoveries by decade.
- [interval_min_gap_search.py](interval_min_gap_search.py) and [interval_min_gap_10n.txt](interval_min_gap_10n.txt) contain the separate interval-minimum investigation.
- [gap_heatmap.svg](gap_heatmap.svg) visualizes the known first-occurrence results.
