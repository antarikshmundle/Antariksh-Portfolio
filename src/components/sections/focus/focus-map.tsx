import { focusQuadrants } from "@/data/focus";
import { cn } from "@/lib/cn";

/**
 * Focus reticle: a coordinate field split into four quadrants, with a
 * viewfinder closing on the shared centre — applied AI. Positions are
 * compositional, not values. Decorative only.
 */

const SIZE = 400;
const C = SIZE / 2;
const line = { vectorEffect: "non-scaling-stroke" } as const;

/** One marker per quadrant, placed for balance — not data. */
const markers = [
  { x: 118, y: 104 },
  { x: 300, y: 128 },
  { x: 96, y: 290 },
  { x: 278, y: 306 },
];

const ranges = [64, 120, 176];
const ticks = Array.from({ length: 19 }, (_, i) => 20 + i * 20);

const bracket = 46;
const arm = 14;
const corners = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
] as const;

const labelPositions = [
  "left-[4%] top-[4%]",
  "right-[4%] top-[4%] text-right",
  "left-[4%] bottom-[4%]",
  "right-[4%] bottom-[4%] text-right",
];

export function FocusMap() {
  return (
    <div aria-hidden="true" className="relative">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-auto w-full">
        {/* Range squares */}
        {ranges.map((r, i) => (
          <rect
            key={r}
            x={C - r}
            y={C - r}
            width={r * 2}
            height={r * 2}
            fill="none"
            className="stroke-foreground"
            strokeOpacity={0.12 + i * 0.04}
            strokeDasharray={i === ranges.length - 1 ? undefined : "3 5"}
            {...line}
          />
        ))}

        {/* Axes and ticks */}
        <g className="stroke-foreground" strokeOpacity={0.45}>
          <line x1={8} y1={C} x2={SIZE - 8} y2={C} {...line} />
          <line x1={C} y1={8} x2={C} y2={SIZE - 8} {...line} />
          {ticks.map((t) => (
            <g key={t}>
              <line x1={t} y1={C - (t % 100 === 0 ? 6 : 3)} x2={t} y2={C + (t % 100 === 0 ? 6 : 3)} {...line} />
              <line x1={C - (t % 100 === 0 ? 6 : 3)} y1={t} x2={C + (t % 100 === 0 ? 6 : 3)} y2={t} {...line} />
            </g>
          ))}
        </g>

        {/* Each quadrant feeds the centre */}
        {markers.map((m) => (
          <g key={`${m.x}-${m.y}`}>
            <line x1={m.x} y1={m.y} x2={C} y2={C} className="stroke-foreground" strokeOpacity={0.3} strokeDasharray="2 4" {...line} />
            <rect x={m.x - 5} y={m.y - 5} width={10} height={10} className="fill-background stroke-foreground" {...line} />
            <rect x={m.x - 2} y={m.y - 2} width={4} height={4} className="fill-foreground" />
          </g>
        ))}

        {/* Viewfinder on the centre */}
        <g className="stroke-foreground" strokeWidth={1.5} fill="none">
          {corners.map(([sx, sy]) => (
            <path
              key={`${sx}${sy}`}
              d={`M${C + sx * bracket} ${C + sy * (bracket - arm)} V${C + sy * bracket} H${C + sx * (bracket - arm)}`}
              {...line}
            />
          ))}
        </g>
        <rect x={C - 14} y={C - 14} width={28} height={28} className="fill-accent" />
      </svg>

      {focusQuadrants.map((label, i) => (
        <span
          key={label}
          className={cn("type-label absolute bg-background px-1.5 py-1 text-muted-foreground", labelPositions[i])}
        >
          {String(i + 1).padStart(2, "0")} {label}
        </span>
      ))}
      <span className="type-label absolute top-[63%] left-1/2 -translate-x-1/2 bg-background px-1.5 py-1 whitespace-nowrap text-foreground">
        Applied AI
      </span>
    </div>
  );
}
