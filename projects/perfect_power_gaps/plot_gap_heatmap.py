#!/usr/bin/env python3
"""Create a vertical semi-log heat map from a perfect-power results file."""

import argparse
import html
import math
import re
from pathlib import Path

DEFAULT_INPUT = Path(__file__).resolve().parent / "results_1_to_100.txt"
DEFAULT_OUTPUT = Path(__file__).resolve().parent / "gap_heatmap.svg"
RESULT_PATTERN = re.compile(
    r"^(?P<gap>\d+) = (?P<upper_expr>\d+\^\d+) - (?P<lower_expr>\d+\^\d+) = "
    r"(?P<upper_value>[\d,]+) - (?P<lower_value>[\d,]+)$"
)
HEADER_PATTERN = re.compile(r"^Perfect-power gaps 1-(\d+)$")


def parse_results(path: Path):
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        match = RESULT_PATTERN.match(line)
        if match:
            rows.append(
                {
                    "gap": int(match.group("gap")),
                    "upper_expr": match.group("upper_expr"),
                    "lower_expr": match.group("lower_expr"),
                    "upper_value": int(match.group("upper_value").replace(",", "")),
                    "lower_value": int(match.group("lower_value").replace(",", "")),
                }
            )
    return rows


def parse_max_gap(path: Path) -> int:
    for line in path.read_text(encoding="utf-8").splitlines():
        match = HEADER_PATTERN.match(line)
        if match:
            return int(match.group(1))
    raise ValueError("Results header must declare the gap range, such as 'Perfect-power gaps 1-100'.")


def color_for_log_value(value: float, minimum: float, maximum: float) -> str:
    palette = ((12, 7, 42), (84, 15, 109), (182, 54, 121), (251, 140, 60), (252, 253, 191))
    position = (value - minimum) / (maximum - minimum) if maximum > minimum else 0
    scaled = position * (len(palette) - 1)
    index = min(int(scaled), len(palette) - 2)
    fraction = scaled - index
    start = palette[index]
    end = palette[index + 1]
    color = tuple(round(start[channel] + fraction * (end[channel] - start[channel])) for channel in range(3))
    return "#%02x%02x%02x" % color


def create_heatmap(rows, max_gap: int, output_path: Path):
    if not rows:
        raise ValueError("No known gap rows were found in the results file.")

    rows_by_gap = {row["gap"]: row for row in rows}
    gaps = list(range(max_gap, 0, -1))
    values = [[None, None] for _ in gaps]
    labels = [["", ""] for _ in gaps]

    for row_index, gap in enumerate(gaps):
        row = rows_by_gap.get(gap)
        if row is None:
            continue
        values[row_index] = [
            math.log10(row["upper_value"]),
            math.log10(row["lower_value"]),
        ]
        labels[row_index] = [row["upper_expr"], row["lower_expr"]]

    finite_values = [value for row in values for value in row if value is not None]
    minimum = min(finite_values)
    maximum = max(finite_values)
    cell_width = 250
    cell_height = 20 if max_gap > 200 else 28
    left = 100
    top = 90
    width = left + cell_width * 2 + 30
    height = top + cell_height * max_gap + 75
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<style>text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; } .label { font-size: 11px; } .power { font-size: 10px; font-weight: 600; }</style>',
        '<rect width="100%" height="100%" fill="#f7f8fa"/>',
        f'<text x="100" y="28" font-size="20" font-weight="700">Perfect-Power Gaps 1-{max_gap}</text>',
        '<text x="100" y="50" font-size="12" fill="#59636e">Vertical semi-log heat map: color = log10(perfect-power value)</text>',
        f'<text x="{left + cell_width // 2}" y="75" text-anchor="middle" font-size="13" font-weight="700">a^b (upper)</text>',
        f'<text x="{left + cell_width + cell_width // 2}" y="75" text-anchor="middle" font-size="13" font-weight="700">c^d (lower)</text>',
    ]

    for row_index, gap in enumerate(gaps):
        y = top + row_index * cell_height
        svg.append(f'<text x="{left - 12}" y="{y + 18}" text-anchor="end" class="label">{gap}</text>')
        for column_index, label in enumerate(labels[row_index]):
            x = left + column_index * cell_width
            value = values[row_index][column_index]
            fill = "#d9dde3" if value is None else color_for_log_value(value, minimum, maximum)
            svg.append(f'<rect x="{x}" y="{y}" width="{cell_width}" height="{cell_height}" fill="{fill}" stroke="#ffffff"/>')
            if label:
                text_color = "#ffffff" if value > minimum + (maximum - minimum) * 0.48 else "#17151f"
                svg.append(f'<text x="{x + cell_width / 2}" y="{y + cell_height * 0.68:.1f}" text-anchor="middle" class="power" fill="{text_color}">{html.escape(label)}</text>')

    legend_y = top + cell_height * max_gap + 28
    svg.append(f'<text x="{left}" y="{legend_y}" class="label" fill="#59636e">Gray = unknown</text>')
    svg.append(f'<text x="{left + cell_width * 2}" y="{legend_y}" text-anchor="end" class="label" fill="#59636e">Gap size n</text>')
    svg.append("</svg>")
    output_path.write_text("\n".join(svg), encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", nargs="?", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("-o", "--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    rows = parse_results(args.input)
    max_gap = parse_max_gap(args.input)
    create_heatmap(rows, max_gap, args.output)
    print(f"Created {args.output} from {len(rows)} known gap rows.")


if __name__ == "__main__":
    main()
