import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import styles from "./signal-system.module.css";

/**
 * Signature hero diagram: raw data is gathered, encoded, modelled and
 * composed into a system that resolves to a single product node.
 * Purely decorative — the hero copy carries all of the meaning.
 */

type Layout = {
  width: number;
  height: number;
  top: number;
  bottom: number;
  axis: number;
  data: { x: number; cell: number; cols: number; rows: number };
  /** Column positions: input bus, three layers, output. */
  x: { bus: number; a: number; b: number; c: number; out: number };
};

const layouts = {
  wide: {
    width: 640,
    height: 240,
    top: 34,
    bottom: 204,
    axis: 226,
    data: { x: 32, cell: 18, cols: 5, rows: 9 },
    x: { bus: 128, a: 200, b: 320, c: 440, out: 572 },
  },
  compact: {
    width: 400,
    height: 280,
    top: 30,
    bottom: 236,
    axis: 260,
    data: { x: 22, cell: 15, cols: 3, rows: 10 },
    x: { bus: 78, a: 124, b: 200, c: 276, out: 356 },
  },
} satisfies Record<string, Layout>;

const stages = ["Data", "Signal", "Model", "System", "Product"];

/** Node indices per layer that form the three highlighted routes. */
const routes = [
  [1, 1, 0],
  [3, 2, 2],
  [5, 4, 3],
];

const dataShades = [0.1, 0.2, 0.35, 0.55, 0.85];

/** Evenly spaces a layer's nodes; layers with fewer nodes sit inset and centred. */
function spread(count: number, top: number, bottom: number) {
  const inset = ((bottom - top) / count) * ((6 - count) / 2);
  const start = top + inset;
  const step = count > 1 ? (bottom - top - inset * 2) / (count - 1) : 0;
  return Array.from({ length: count }, (_, i) => Math.round(start + step * i));
}

function geometry(layout: Layout) {
  const { top, bottom, x } = layout;
  const a = spread(6, top, bottom);
  const b = spread(5, top, bottom);
  const c = spread(4, top, bottom);
  const outY = Math.round((top + bottom) / 2);

  const mesh = [
    ...a.flatMap((ay) => b.map((by) => [x.a, ay, x.b, by])),
    ...b.flatMap((by) => c.map((cy) => [x.b, by, x.c, cy])),
    ...c.map((cy) => [x.c, cy, x.out, outY]),
    ...a.map((ay) => [x.bus, ay, x.a, ay]),
  ];

  const paths = routes.map(
    ([ai, bi, ci]) =>
      `M${x.bus} ${a[ai]} H${x.a} L${x.b} ${b[bi]} L${x.c} ${c[ci]} L${x.out} ${outY}`,
  );

  const active = {
    a: new Set(routes.map((r) => r[0])),
    b: new Set(routes.map((r) => r[1])),
    c: new Set(routes.map((r) => r[2])),
  };

  return { a, b, c, outY, mesh, paths, active };
}

function Node({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <rect
      x={x - 4}
      y={y - 4}
      width={8}
      height={8}
      className={active ? "fill-foreground" : "fill-background stroke-foreground"}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function Diagram({ layout, className }: { layout: Layout; className?: string }) {
  const { width, height, top, bottom, axis, data, x } = layout;
  const g = geometry(layout);
  const dataRows = Array.from({ length: data.rows }, (_, r) =>
    Math.round(top + ((bottom - top) / (data.rows - 1)) * r),
  );
  const dataCenter = data.x + ((data.cols - 1) * data.cell) / 2;
  const stageX = [dataCenter, x.a, x.b, x.c, x.out];
  const ticks = Array.from({ length: Math.floor((width - 48) / 32) + 1 }, (_, i) => 24 + i * 32);

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full overflow-visible"
      >
        {/* Connection mesh and scaffolding */}
        <g className={cn("stroke-foreground", styles.mesh)} strokeOpacity={0.14} strokeWidth={1}>
          {g.mesh.map(([x1, y1, x2, y2]) => (
            <line
              key={`${x1}-${y1}-${x2}-${y2}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path
            d={`M${x.bus - 6} ${g.a[0]} H${x.bus} V${g.a[5]} H${x.bus - 6}`}
            fill="none"
            strokeOpacity={0.6}
            vectorEffect="non-scaling-stroke"
          />
          <line x1={24} y1={axis} x2={width - 24} y2={axis} vectorEffect="non-scaling-stroke" />
          {ticks.map((tx, i) => (
            <line
              key={tx}
              x1={tx}
              y1={axis}
              x2={tx}
              y2={axis + (i % 4 === 0 ? 8 : 4)}
              strokeOpacity={i % 4 === 0 ? 0.6 : 1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Raw data field */}
        <g className="fill-foreground">
          {dataRows.flatMap((y, r) =>
            Array.from({ length: data.cols }, (_, col) => {
              const isAccent = r === 3 && col === data.cols - 1;
              return (
                <rect
                  key={`${r}-${col}`}
                  x={data.x + col * data.cell - 3}
                  y={y - 3}
                  width={6}
                  height={6}
                  className={isAccent ? "fill-accent" : undefined}
                  fillOpacity={isAccent ? 1 : dataShades[(col * 3 + r * 5 + ((col * r) % 3)) % 5]}
                />
              );
            }),
          )}
        </g>

        {/* Highlighted routes, then travelling signals on top */}
        <g fill="none" strokeLinejoin="miter">
          {g.paths.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              className={cn("stroke-foreground", styles.route)}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              style={{ "--delay": `${0.2 + i * 0.15}s` } as CSSProperties}
            />
          ))}
          {g.paths.map((d, i) => (
            <path
              key={`signal-${d}`}
              d={d}
              pathLength={1}
              className={cn("stroke-accent", styles.signal)}
              strokeWidth={3}
              vectorEffect="non-scaling-stroke"
              style={{ "--delay": `${1.6 + i * 2.2}s` } as CSSProperties}
            />
          ))}
        </g>

        {/* Layer nodes */}
        {g.a.map((y, i) => (
          <Node key={`a${y}`} x={x.a} y={y} active={g.active.a.has(i)} />
        ))}
        {g.b.map((y, i) => (
          <Node key={`b${y}`} x={x.b} y={y} active={g.active.b.has(i)} />
        ))}
        {g.c.map((y, i) => (
          <Node key={`c${y}`} x={x.c} y={y} active={g.active.c.has(i)} />
        ))}

        {/* Output: the product */}
        <rect
          x={x.out - 13}
          y={g.outY - 13}
          width={26}
          height={26}
          fill="none"
          className="stroke-foreground"
          strokeOpacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x={x.out - 7}
          y={g.outY - 7}
          width={14}
          height={14}
          fill="none"
          className={cn("stroke-accent", styles.pulse)}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <rect x={x.out - 7} y={g.outY - 7} width={14} height={14} className="fill-accent" />
      </svg>

      {/* Stage legend, aligned to the diagram columns */}
      <ol className="relative mt-4 h-4">
        {stageX.map((sx, i) => (
          <li
            key={stages[i]}
            className="type-label absolute top-0 -translate-x-1/2 whitespace-nowrap text-muted-foreground"
            style={{ left: `${(sx / width) * 100}%` }}
          >
            {String(i + 1).padStart(2, "0")}
            <span className="hidden sm:inline"> {stages[i]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SignalSystem() {
  return (
    <div aria-hidden>
      <Diagram layout={layouts.compact} className="md:hidden" />
      <Diagram layout={layouts.wide} className="hidden md:block" />
    </div>
  );
}
