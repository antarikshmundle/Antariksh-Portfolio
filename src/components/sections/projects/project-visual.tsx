import type { ComponentType } from "react";
import { TechLabel } from "@/components/ui/tech-label";
import type { ProjectVisualTone, ProjectVisualType } from "@/data/projects";
import { cn } from "@/lib/cn";
import styles from "./project-visual.module.css";

/*
 * Conceptual project visuals — abstract diagrams of each project's domain,
 * deliberately not interface mock-ups. Drawn in currentColor so every
 * variant adapts to the tone; the accent marks the key path.
 */

/*
 * inverse is a warm-paper plate: the accent is locally darkened so the
 * red key path keeps its contrast on the light ground.
 */
const toneStyles: Record<ProjectVisualTone, string> = {
  surface: "bg-surface text-foreground [--visual-bg:var(--color-surface)]",
  inverse: "bg-foreground text-background [--visual-bg:var(--color-foreground)] [--accent:var(--moon)]",
  outline: "border border-border/20 bg-background text-foreground [--visual-bg:var(--color-background)]",
};

const captions: Record<ProjectVisualType, string> = {
  campus: "Routing",
  inference: "Inference",
  records: "Records",
  sensor: "Sensing",
};

/** Deterministic 0–1 noise so the diagrams render identically everywhere. */
function noise(a: number, b: number) {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

const line = { vectorEffect: "non-scaling-stroke" } as const;

function CampusDiagram() {
  const cols = [
    [40, 150],
    [180, 290],
    [320, 410],
    [440, 600],
  ];
  const rows = [
    [40, 120],
    [150, 240],
    [270, 360],
  ];
  const destination = "3-2";
  const quad = "1-1";

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      {rows.flatMap(([y1, y2], r) =>
        cols.map(([x1, x2], c) => {
          const key = `${c}-${r}`;
          const w = x2 - x1;
          const h = y2 - y1;
          if (key === quad) {
            return (
              <rect
                key={key}
                x={x1}
                y={y1}
                width={w}
                height={h}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.35}
                strokeDasharray="2 4"
                {...line}
              />
            );
          }
          const split = 0.35 + noise(c, r) * 0.3;
          return (
            <g key={key}>
              <rect
                x={x1}
                y={y1}
                width={w}
                height={h}
                fill="currentColor"
                fillOpacity={0.06}
                stroke="currentColor"
                strokeOpacity={key === destination ? 0 : 0.35}
                {...line}
              />
              <rect
                x={x1 + 10}
                y={y1 + 10}
                width={Math.round((w - 20) * split)}
                height={h - 20}
                fill="currentColor"
                fillOpacity={0.1}
              />
            </g>
          );
        }),
      )}

      {/* Destination block */}
      <rect x={440} y={270} width={160} height={90} fill="none" className="stroke-accent" strokeWidth={1.5} {...line} />

      {/* Route: faint full path, then the live dashed route on top */}
      <path d="M95 255 H165 V135 H425 V255 H520" fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={6} />
      <path
        d="M95 255 H165 V135 H425 V255 H520"
        fill="none"
        className={cn("stroke-accent", styles.flow)}
        strokeWidth={2}
        {...line}
      />

      {/* Origin and destination markers */}
      <circle cx={95} cy={255} r={6} fill="currentColor" />
      <circle cx={95} cy={255} r={12} fill="none" stroke="currentColor" strokeOpacity={0.4} {...line} />
      <circle cx={520} cy={255} r={7} className="fill-accent" />
      <circle cx={520} cy={255} r={15} fill="none" className="stroke-accent" strokeOpacity={0.5} {...line} />

      {/* Coordinate ticks */}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1={14} y1={40 + i * 36} x2={i % 3 === 0 ? 26 : 20} y2={40 + i * 36} stroke="currentColor" strokeOpacity={0.5} {...line} />
      ))}
    </svg>
  );
}

function InferenceDiagram() {
  const cell = 16;
  const input = { x: 40, y: 106 };
  const size = 8;
  const kernel = { col: 2, row: 3 };
  const stacks = [
    { x: 250, size: 104, count: 4, offset: 9 },
    { x: 380, size: 68, count: 6, offset: 7 },
    { x: 480, size: 40, count: 8, offset: 5 },
  ];
  const nodes = Array.from({ length: 6 }, (_, i) => 105 + i * 26);
  const bars = [1, 0.42, 0.24, 0.12];
  const center = 170;

  const win = {
    x: input.x + kernel.col * cell,
    y: input.y + kernel.row * cell,
    s: cell * 3,
  };
  const first = stacks[0];
  const firstY = center - first.size / 2;

  return (
    <svg viewBox="0 0 800 340" className="h-full w-full">
      {/* Input sample */}
      {Array.from({ length: size * size }, (_, i) => {
        const c = i % size;
        const r = Math.floor(i / size);
        const d = Math.hypot(c - 3.5, r - 3.5) / 5;
        const shade = Math.max(0.06, Math.min(0.9, 1 - d + (noise(c, r) - 0.5) * 0.5));
        return (
          <rect
            key={i}
            x={input.x + c * cell + 1}
            y={input.y + r * cell + 1}
            width={cell - 2}
            height={cell - 2}
            fill="currentColor"
            fillOpacity={shade}
          />
        );
      })}
      <rect x={win.x} y={win.y} width={win.s} height={win.s} fill="none" className="stroke-accent" strokeWidth={2} {...line} />

      {/* Projection from window into the first feature map */}
      <g stroke="currentColor" strokeOpacity={0.3}>
        <line x1={win.x + win.s} y1={win.y} x2={first.x} y2={firstY} {...line} />
        <line x1={win.x + win.s} y1={win.y + win.s} x2={first.x} y2={firstY + first.size} {...line} />
      </g>

      {/* Feature maps, shrinking with depth */}
      {stacks.map((stack) =>
        Array.from({ length: stack.count }, (_, i) => {
          const k = stack.count - 1 - i;
          return (
            <rect
              key={`${stack.x}-${k}`}
              x={stack.x + k * stack.offset}
              y={center - stack.size / 2 - k * stack.offset * 0.6}
              width={stack.size}
              height={stack.size}
              fill="var(--visual-bg)"
              stroke="currentColor"
              strokeOpacity={k === 0 ? 0.9 : 0.4}
              {...line}
            />
          );
        }),
      )}

      {/* Dense layer */}
      <g stroke="currentColor" strokeOpacity={0.18}>
        {nodes.flatMap((ny) =>
          bars.map((_, b) => <line key={`${ny}-${b}`} x1={600} y1={ny} x2={650} y2={128 + b * 28} {...line} />),
        )}
      </g>
      {nodes.map((ny, i) => (
        <rect key={ny} x={596} y={ny - 4} width={8} height={8} fill={i === 2 ? "currentColor" : "var(--visual-bg)"} stroke="currentColor" {...line} />
      ))}

      {/* Output distribution — relative bars, intentionally unlabelled */}
      {bars.map((value, b) => (
        <rect
          key={b}
          x={650}
          y={121 + b * 28}
          width={Math.round(110 * value)}
          height={14}
          className={b === 0 ? "fill-accent" : undefined}
          fill={b === 0 ? undefined : "currentColor"}
          fillOpacity={b === 0 ? 1 : 0.35}
        />
      ))}

      {/* Key path through the model */}
      <polyline
        points={`${win.x + win.s / 2},${win.y + win.s / 2} ${first.x + first.size / 2},${center} ${stacks[1].x + stacks[1].size / 2},${center} ${stacks[2].x + stacks[2].size / 2},${center} 600,${nodes[2]} 650,128`}
        fill="none"
        className={cn("stroke-accent", styles.flow)}
        strokeWidth={1.5}
        {...line}
      />
    </svg>
  );
}

function RecordsDiagram() {
  const rows = Array.from({ length: 8 }, (_, i) => 66 + i * 38);
  const activeRow = 3;
  const grid = { x: 300, y: 48, cell: 40, gap: 6, cols: 7, rows: 7 };
  const activeCell = { col: 4, row: 3 };
  const cellX = (c: number) => grid.x + c * (grid.cell + grid.gap);
  const cellY = (r: number) => grid.y + r * (grid.cell + grid.gap);
  const rowY = rows[activeRow];

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      {/* Records: one marker and one record bar per member */}
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            x={40}
            y={y - 7}
            width={14}
            height={14}
            className={i === activeRow ? "fill-accent" : undefined}
            fill={i === activeRow ? undefined : "currentColor"}
            fillOpacity={i === activeRow ? 1 : 0.5}
          />
          <rect x={66} y={y - 3} width={Math.round(70 + noise(i, 2) * 130)} height={6} fill="currentColor" fillOpacity={0.3} />
          <line x1={40} y1={y + 19} x2={250} y2={y + 19} stroke="currentColor" strokeOpacity={0.15} {...line} />
        </g>
      ))}

      {/* Week grid: sessions as filled cells */}
      {Array.from({ length: grid.cols * grid.rows }, (_, i) => {
        const c = i % grid.cols;
        const r = Math.floor(i / grid.cols);
        const active = c === activeCell.col && r === activeCell.row;
        const filled = noise(c + 11, r + 5) > 0.55;
        return (
          <rect
            key={i}
            x={cellX(c)}
            y={cellY(r)}
            width={grid.cell}
            height={grid.cell}
            className={active ? "fill-accent" : undefined}
            fill={active ? undefined : filled ? "currentColor" : "none"}
            fillOpacity={active ? 1 : filled ? 0.35 : 0}
            stroke={active ? "none" : "currentColor"}
            strokeOpacity={0.3}
            {...line}
          />
        );
      })}

      {/* A record linked to its session */}
      <path
        d={`M250 ${rowY} H${cellX(activeCell.col) - 12} V${cellY(activeCell.row) + grid.cell / 2} H${cellX(activeCell.col)}`}
        fill="none"
        className={cn("stroke-accent", styles.flow)}
        strokeWidth={1.5}
        {...line}
      />
    </svg>
  );
}

function SensorDiagram() {
  const sensors = [110, 200, 290];
  const chip = { x: 220, y: 160, s: 80 };
  const series = Array.from({ length: 13 }, (_, i) => {
    const y = 200 - Math.round((Math.sin(i * 0.7) * 0.6 + (noise(i, 4) - 0.5) * 0.8) * 60);
    return [380 + i * 18, y] as const;
  });
  const step = series
    .map(([x, y], i) => (i === 0 ? `M${x} ${y}` : `H${x} V${y}`))
    .join(" ");

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full">
      {/* Sensors with signal arcs */}
      {sensors.map((y, i) => (
        <g key={y}>
          <circle cx={80} cy={y} r={8} fill={i === 1 ? "none" : "currentColor"} stroke="currentColor" {...line} />
          {[16, 24].map((r) => (
            <path
              key={r}
              d={`M${80 - r * 0.7} ${y - r * 0.7} A${r} ${r} 0 0 0 ${80 - r * 0.7} ${y + r * 0.7}`}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.4}
              {...line}
            />
          ))}
          {i !== 1 && (
            <path
              d={`M92 ${y} H160 V${chip.y + chip.s / 2 + (i - 1) * 24} H${chip.x}`}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.35}
              {...line}
            />
          )}
        </g>
      ))}
      <circle cx={80} cy={sensors[1]} r={4} className="fill-accent" />

      {/* Microcontroller with pins */}
      <rect x={chip.x} y={chip.y} width={chip.s} height={chip.s} fill="var(--visual-bg)" stroke="currentColor" strokeWidth={1.5} {...line} />
      <rect x={chip.x + 24} y={chip.y + 24} width={chip.s - 48} height={chip.s - 48} fill="currentColor" fillOpacity={0.15} />
      {Array.from({ length: 5 }, (_, i) => chip.x + 12 + i * 14).map((p) => (
        <g key={p} stroke="currentColor" strokeOpacity={0.6}>
          <line x1={p} y1={chip.y - 10} x2={p} y2={chip.y} {...line} />
          <line x1={p} y1={chip.y + chip.s} x2={p} y2={chip.y + chip.s + 10} {...line} />
        </g>
      ))}

      {/* Readings over time */}
      <line x1={370} y1={300} x2={610} y2={300} stroke="currentColor" strokeOpacity={0.4} {...line} />
      {series.map(([x]) => (
        <line key={x} x1={x} y1={300} x2={x} y2={305} stroke="currentColor" strokeOpacity={0.4} {...line} />
      ))}
      <path d={step} fill="none" stroke="currentColor" strokeOpacity={0.85} strokeWidth={1.5} {...line} />
      {series.map(([x, y], i) =>
        i % 3 === 0 ? <rect key={x} x={x - 3} y={y - 3} width={6} height={6} fill="currentColor" /> : null,
      )}

      {/* Signal path: sensor → controller → reading */}
      <path
        d={`M92 ${sensors[1]} H${chip.x} M${chip.x + chip.s} ${chip.y + chip.s / 2} H${series[0][0]} V${series[0][1]}`}
        fill="none"
        className={cn("stroke-accent", styles.flow)}
        strokeWidth={1.5}
        {...line}
      />
    </svg>
  );
}

const diagrams: Record<ProjectVisualType, ComponentType> = {
  campus: CampusDiagram,
  inference: InferenceDiagram,
  records: RecordsDiagram,
  sensor: SensorDiagram,
};

type ProjectVisualProps = {
  type: ProjectVisualType;
  tone: ProjectVisualTone;
  number: string;
  /** Thumbnail mode: tighter padding and no caption strip. */
  compact?: boolean;
  className?: string;
};

export function ProjectVisual({ type, tone, number, compact = false, className }: ProjectVisualProps) {
  const Diagram = diagrams[type];

  return (
    <div aria-hidden className={cn("relative overflow-hidden", toneStyles[tone], className)}>
      {tone !== "inverse" && <div className="bg-grid absolute inset-0" />}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]",
          compact ? "p-3" : "p-5 pt-12 md:p-12 md:pt-16",
        )}
      >
        <Diagram />
      </div>
      <div className={cn("absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 md:p-5", compact && "hidden")}>
        <TechLabel className="opacity-75">
          Fig. {number} — Concept · {captions[type]}
        </TechLabel>
        <TechLabel className="opacity-75">N° {number}</TechLabel>
      </div>
    </div>
  );
}
