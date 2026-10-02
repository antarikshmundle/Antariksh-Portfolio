/**
 * Profile intersection: three overlapping fields — data, models, software —
 * with the shared region marked as the profile, resolving into product.
 * Companion to the hero's data-to-product system; decorative only.
 */

const W = 480;
const H = 380;

const fields = [
  { x: 30, y: 30 }, // Data
  { x: 170, y: 30 }, // Models
  { x: 100, y: 150 }, // Software
];
const SIZE = 200;

/** Region shared by all three fields. */
const core = { x: 170, y: 150, w: 60, h: 80 };
const coreCenter = { x: core.x + core.w / 2, y: core.y + core.h / 2 };
const product = { x: 440, y: coreCenter.y };

const pairs = [
  { x: 170, y: 30, w: 60, h: 200 },
  { x: 100, y: 150, w: 130, h: 80 },
  { x: 170, y: 150, w: 130, h: 80 },
];

const labels = [
  { text: "01 Data", style: { left: "8.5%", top: "11%" } },
  { text: "02 Models", style: { right: "25.5%", top: "11%" } },
  { text: "03 Software", style: { left: "23%", bottom: "10%" } },
  { text: "04 Product", style: { left: `${(product.x / W) * 100}%`, top: "57%", translate: "-50% 0" } },
];

const line = { vectorEffect: "non-scaling-stroke" } as const;

export function ProfileDiagram() {
  return (
    <div aria-hidden className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
        {pairs.map((p) => (
          <rect
            key={`${p.x}-${p.y}-${p.w}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            className="fill-foreground"
            fillOpacity={0.06}
          />
        ))}
        {fields.map((f, i) => (
          <rect
            key={i}
            x={f.x}
            y={f.y}
            width={SIZE}
            height={SIZE}
            fill="none"
            className="stroke-foreground"
            strokeOpacity={0.8}
            strokeDasharray={i === 2 ? "4 4" : undefined}
            {...line}
          />
        ))}

        {/* Profile → product */}
        <line
          x1={coreCenter.x}
          y1={coreCenter.y}
          x2={product.x - 10}
          y2={product.y}
          className="stroke-accent"
          strokeWidth={1.5}
          {...line}
        />
        <rect x={core.x} y={core.y} width={core.w} height={core.h} className="fill-accent" />
        <rect x={product.x - 8} y={product.y - 8} width={16} height={16} className="fill-foreground" />
        <rect
          x={product.x - 15}
          y={product.y - 15}
          width={30}
          height={30}
          fill="none"
          className="stroke-foreground"
          strokeOpacity={0.4}
          {...line}
        />
      </svg>

      {labels.map(({ text, style }) => (
        <span key={text} className="type-label absolute whitespace-nowrap text-muted-foreground" style={style}>
          {text}
        </span>
      ))}
      <span
        className="type-label absolute -translate-x-1/2 -translate-y-1/2 text-foreground"
        style={{ left: `${(coreCenter.x / W) * 100}%`, top: `${(coreCenter.y / H) * 100}%` }}
      >
        AM
      </span>
    </div>
  );
}
