import type { CSSProperties } from "react";
import styles from "./night-scene.module.css";

/*
 * Hero nightscape behind the copy and the portrait: misty peaks, a temple on a
 * cliff with lantern-lit stairs, a vermilion torii, red maple foliage and water.
 * The red moon is drawn separately (red-moon.tsx) so it can sit behind the
 * portrait at every breakpoint. No images, no WebGL; decorative only. Static
 * apart from mist and petals, which stop under reduced motion.
 *
 * viewBox 1600 × 900, centred and anchored to the bottom (slice). On desktop
 * the copy sits over x < 900, the portrait over x > 1000.
 */

const W = 1600;
const H = 900;
const ink = "#050506";
const warm = "#ffa463";
const rim = "#e0533e";

/** Deterministic 0–1 noise so server and client render identically. */
function noise(a: number, b: number) {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/** A flared temple roof: broad eave with lifted tips, narrowing to the ridge. */
function roof(cx: number, top: number, bottom: number, inner: number, outer: number) {
  return [
    `M${cx - outer} ${bottom - 10}`,
    `Q${cx - outer * 0.7} ${bottom} ${cx - inner} ${bottom}`,
    `L${cx + inner} ${bottom}`,
    `Q${cx + outer * 0.7} ${bottom} ${cx + outer} ${bottom - 10}`,
    `Q${cx + outer * 0.52} ${top + 5} ${cx + inner * 0.5} ${top}`,
    `L${cx - inner * 0.5} ${top}`,
    `Q${cx - outer * 0.52} ${top + 5} ${cx - outer} ${bottom - 10}Z`,
  ].join(" ");
}

function roofRim(cx: number, top: number, bottom: number, inner: number, outer: number) {
  return `M${cx - outer} ${bottom - 10} Q${cx - outer * 0.52} ${top + 5} ${cx - inner * 0.5} ${top} L${cx + inner * 0.5} ${top} Q${cx + outer * 0.52} ${top + 5} ${cx + outer} ${bottom - 10}`;
}

type Light = { x: number; y: number; w: number; h: number };

/** Temple tower: stacked storeys with lit openings, flared roofs and a finial. */
function tower(cx: number, ground: number, storeys: number, k: number) {
  const solid: string[] = [];
  const rims: string[] = [];
  const lights: Light[] = [];
  let y = ground - 14 * k;
  solid.push(`M${cx - 70 * k} ${ground} L${cx - 62 * k} ${y} L${cx + 62 * k} ${y} L${cx + 70 * k} ${ground}Z`);
  for (let i = 0; i < storeys; i++) {
    const body = (52 - i * 7) * k;
    const height = (34 - i * 3) * k;
    const bodyTop = y - height;
    solid.push(`M${cx - body} ${y} L${cx - body} ${bodyTop} L${cx + body} ${bodyTop} L${cx + body} ${y}Z`);
    const cols = i < 2 ? 4 : 3;
    for (let c = 0; c < cols; c++) {
      const span = body * 1.5;
      const lx = cx - span / 2 + (span / (cols - 1)) * c;
      lights.push({ x: lx - 3 * k, y: bodyTop + height * 0.22, w: 6 * k, h: height * 0.55 });
    }
    const roofTop = bodyTop - 16 * k;
    const outer = body + (46 - i * 4) * k;
    solid.push(roof(cx, roofTop, bodyTop + 3 * k, body + 6 * k, outer));
    rims.push(roofRim(cx, roofTop, bodyTop + 3 * k, body + 6 * k, outer));
    y = roofTop + 2 * k;
  }
  solid.push(`M${cx - 3 * k} ${y} L${cx - 3 * k} ${y - 54 * k} L${cx + 3 * k} ${y - 54 * k} L${cx + 3 * k} ${y}Z`);
  for (let r = 0; r < 5; r++) {
    const ry = y - 14 * k - r * 7 * k;
    solid.push(`M${cx - 8 * k} ${ry} L${cx + 8 * k} ${ry} L${cx + 8 * k} ${ry - 2.5 * k} L${cx - 8 * k} ${ry - 2.5 * k}Z`);
  }
  return { solid: solid.join(" "), rims, lights };
}

/** Torii: two pillars, the tie beam and the upswept lintel. */
function torii(cx: number, ground: number, s: number) {
  const k = (n: number) => n * s;
  const top = ground - k(128);
  return [
    `M${cx - k(42)} ${ground} L${cx - k(38)} ${top + k(14)} L${cx - k(30)} ${top + k(14)} L${cx - k(28)} ${ground}Z`,
    `M${cx + k(28)} ${ground} L${cx + k(30)} ${top + k(14)} L${cx + k(38)} ${top + k(14)} L${cx + k(42)} ${ground}Z`,
    `M${cx - k(54)} ${top + k(36)} L${cx + k(54)} ${top + k(36)} L${cx + k(54)} ${top + k(45)} L${cx - k(54)} ${top + k(45)}Z`,
    `M${cx - k(76)} ${top - k(5)} Q${cx} ${top + k(10)} ${cx + k(76)} ${top - k(5)} L${cx + k(70)} ${top + k(12)} Q${cx} ${top + k(21)} ${cx - k(70)} ${top + k(12)}Z`,
    `M${cx - k(4)} ${top + k(16)} L${cx + k(4)} ${top + k(16)} L${cx + k(4)} ${top + k(36)} L${cx - k(4)} ${top + k(36)}Z`,
  ].join(" ");
}

/** Stone lantern (tōrō): body, lit fire box and its glow. */
function lantern(x: number, ground: number, s: number) {
  const k = (n: number) => n * s;
  const body = [
    `M${x - k(5)} ${ground} L${x - k(4)} ${ground - k(30)} L${x + k(4)} ${ground - k(30)} L${x + k(5)} ${ground}Z`,
    `M${x - k(13)} ${ground - k(30)} L${x + k(13)} ${ground - k(30)} L${x + k(13)} ${ground - k(34)} L${x - k(13)} ${ground - k(34)}Z`,
    `M${x - k(10)} ${ground - k(34)} L${x - k(10)} ${ground - k(50)} L${x + k(10)} ${ground - k(50)} L${x + k(10)} ${ground - k(34)}Z`,
    `M${x - k(18)} ${ground - k(50)} L${x} ${ground - k(64)} L${x + k(18)} ${ground - k(50)}Z`,
  ].join(" ");
  return { body, fire: { x: x - k(5), y: ground - k(46), w: k(10), h: k(9) }, glow: { x, y: ground - k(42), r: k(38) } };
}

/** Five-lobed maple leaf. */
function maple(x: number, y: number, r: number, angle: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = angle + (Math.PI * 2 * i) / 10 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${pts.join(" L")}Z`;
}

const leafTones = ["#7c1d14", "#5a140e", "#9a2a1c", "#3a0c09"];
/** A cluster of maple leaves scattered around a point. */
function foliage(cx: number, cy: number, count: number, spreadX: number, spreadY: number, rMin: number, rMax: number, seed: number) {
  return Array.from({ length: count }, (_, i) => ({
    d: maple(
      cx + (noise(i, seed) - 0.5) * spreadX,
      cy + (noise(i, seed + 1) - 0.5) * spreadY,
      rMin + noise(i, seed + 2) * (rMax - rMin),
      noise(i, seed + 3) * Math.PI,
    ),
    fill: leafTones[Math.floor(noise(i, seed + 4) * leafTones.length)],
  }));
}

/*
 * The temple sits low, at the water's edge, so it never meets the oversized name.
 * Two scales: the full one where the gap between copy and portrait is wide enough
 * (xl+), a compact one tucked mostly behind the portrait below that.
 */
const templeWide = { tower: tower(880, 690, 4, 0.92), wing: tower(995, 698, 2, 0.7) };
const templeCompact = { tower: tower(930, 718, 4, 0.7), wing: tower(1012, 724, 2, 0.55) };
const gate = torii(1478, 652, 1.6);
/** The torii's top lintel alone (fourth sub-path), for its moonlit edge. */
const gateLintel = `${gate.split("Z")[3]}Z`;
// Shore lanterns flank the temple (drawn with it, lg+); the torii's pair is always drawn.
const shoreLanterns = [lantern(852, 704, 0.6), lantern(1062, 742, 0.8)];
const gateLanterns = [lantern(1388, 664, 1), lantern(1568, 664, 1)];

const stars = Array.from({ length: 60 }, (_, i) => ({
  x: noise(i, 3) * W,
  y: noise(i, 7) * 360,
  r: 0.6 + noise(i, 11) * 1.1,
  o: 0.15 + noise(i, 13) * 0.45,
}));

const foliageTopLeft = foliage(70, 30, 46, 300, 120, 10, 22, 51);
const foliageBottomLeft = foliage(40, 840, 40, 260, 160, 12, 26, 61);
const foliageTopRight = foliage(1560, 20, 30, 200, 90, 10, 20, 71);
const foliageShore = foliage(812, 704, 12, 90, 22, 5, 9, 81);

const petals = [
  { x: "6%", d: "17s", delay: "-2s", drift: "16vw", spin: "460deg" },
  { x: "18%", d: "21s", delay: "-11s", drift: "10vw", spin: "-380deg" },
  { x: "30%", d: "19s", delay: "-6s", drift: "18vw", spin: "520deg", c: "rgba(242, 80, 63, 0.8)" },
  { x: "44%", d: "23s", delay: "-15s", drift: "8vw", spin: "-420deg", c: "rgba(242, 80, 63, 0.75)" },
  { x: "58%", d: "18s", delay: "-3s", drift: "14vw", spin: "390deg" },
  { x: "72%", d: "22s", delay: "-9s", drift: "12vw", spin: "-500deg", c: "rgba(242, 80, 63, 0.7)" },
  { x: "84%", d: "20s", delay: "-14s", drift: "9vw", spin: "470deg" },
  { x: "92%", d: "26s", delay: "-4s", drift: "7vw", spin: "400deg", c: "rgba(242, 80, 63, 0.7)" },
  { x: "12%", d: "25s", delay: "-19s", drift: "20vw", spin: "560deg" },
  { x: "38%", d: "20s", delay: "-13s", drift: "6vw", spin: "-360deg" },
  { x: "52%", d: "24s", delay: "-7s", drift: "16vw", spin: "440deg", c: "rgba(242, 80, 63, 0.65)" },
  { x: "66%", d: "21s", delay: "-21s", drift: "11vw", spin: "-430deg" },
  { x: "78%", d: "19s", delay: "-16s", drift: "13vw", spin: "410deg" },
  { x: "88%", d: "23s", delay: "-10s", drift: "8vw", spin: "-450deg", c: "rgba(242, 80, 63, 0.7)" },
  { x: "24%", d: "22s", delay: "-1s", drift: "15vw", spin: "380deg" },
  { x: "96%", d: "18s", delay: "-12s", drift: "5vw", spin: "-400deg" },
];

const vars = (v: Record<string, string>) => Object.fromEntries(Object.entries(v).map(([k, val]) => [`--${k}`, val])) as CSSProperties;

function Lights({ lights }: { lights: Light[] }) {
  return (
    <g>
      {lights.map((l) => (
        <ellipse key={`g${l.x}-${l.y}`} cx={l.x + l.w / 2} cy={l.y + l.h / 2} rx={l.w * 2.4 + 5} ry={l.h + 4} fill="url(#scene-glow)" />
      ))}
      {lights.map((l) => (
        <rect key={`${l.x}-${l.y}`} x={l.x} y={l.y} width={l.w} height={l.h} fill={warm} opacity={0.5 + noise(l.x, l.y) * 0.4} />
      ))}
    </g>
  );
}

function Temple({ variant, className }: { variant: typeof templeWide; className: string }) {
  const { tower: t, wing: w } = variant;
  return (
    <g className={className} data-layer="temple">
      <path fill={ink} d={t.solid} />
      <path fill={ink} d={w.solid} />
      <g fill="none" stroke={rim} strokeWidth={1.3} opacity={0.6}>
        {[...t.rims, ...w.rims].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <Lights lights={[...t.lights, ...w.lights]} />
    </g>
  );
}

function Lanterns({ items }: { items: ReturnType<typeof lantern>[] }) {
  return (
    <>
      {items.map((l) => (
        <g key={`${l.glow.x}-${l.glow.y}`}>
          <circle cx={l.glow.x} cy={l.glow.y} r={l.glow.r} fill="url(#scene-glow)" />
          <path fill={ink} d={l.body} />
          <rect x={l.fire.x} y={l.fire.y} width={l.fire.w} height={l.fire.h} fill={warm} />
        </g>
      ))}
    </>
  );
}

function Leaves({ leaves }: { leaves: { d: string; fill: string }[] }) {
  return (
    <>
      {leaves.map((l) => (
        <path key={l.d} d={l.d} fill={l.fill} />
      ))}
    </>
  );
}

export function NightScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sky: near-black, warming toward the moon behind the portrait */}
      <div className="absolute inset-0 bg-[radial-gradient(48vw_40vw_at_74%_30%,rgba(179,38,30,0.22),transparent_70%),linear-gradient(180deg,#060709_0%,#0a0b0d_55%,#120b0b_100%)]" />

      {/* Below lg the copy stacks above the portrait, so the scene sits only behind the lower part. */}
      <svg className="absolute inset-x-0 bottom-0 h-[58%] w-full lg:h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="scene-glow">
            <stop offset="0" stopColor={warm} stopOpacity="0.45" />
            <stop offset="1" stopColor={warm} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="scene-mist" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d6cdc4" stopOpacity="0" />
            <stop offset="0.5" stopColor="#d6cdc4" stopOpacity="0.08" />
            <stop offset="1" stopColor="#d6cdc4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="scene-redmist" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#b3261e" stopOpacity="0" />
            <stop offset="0.5" stopColor="#b3261e" stopOpacity="0.12" />
            <stop offset="1" stopColor="#b3261e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="scene-torii" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8a2116" />
            <stop offset="1" stopColor="#2a0907" />
          </linearGradient>
          <linearGradient id="scene-mist-low" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d6cdc4" stopOpacity="0" />
            <stop offset="0.55" stopColor="#d6cdc4" stopOpacity="0.1" />
            <stop offset="1" stopColor="#d6cdc4" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="scene-water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#140b0b" />
            <stop offset="1" stopColor="#060607" />
          </linearGradient>
          <filter id="scene-bokeh" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <filter id="scene-soft" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <g fill="#f1ece3">
          {stars.map((s) => (
            <circle key={`${s.x.toFixed(1)}-${s.y.toFixed(1)}`} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
          ))}
        </g>

        {/* Distant range, paler with distance */}
        <path fill="#1c1d22" opacity={0.7} d="M700 420 Q820 380 920 392 Q1040 330 1150 300 Q1230 280 1300 310 Q1400 350 1480 318 Q1550 300 1600 312 L1600 520 L700 520Z" />

        {/* Misty peaks */}
        <path fill="#17181c" d="M0 470 Q120 420 240 440 Q360 380 470 410 Q560 330 640 300 Q700 250 760 236 Q820 250 880 300 Q960 360 1040 330 Q1120 300 1200 340 Q1300 390 1400 360 Q1500 330 1600 360 L1600 900 L0 900Z" />
        <rect x={0} y={300} width={W} height={160} fill="url(#scene-redmist)" />
        <path fill="#121317" d="M0 560 Q160 500 320 520 Q460 470 600 420 Q680 396 740 420 Q820 450 900 430 Q1020 400 1140 450 Q1260 490 1400 470 Q1520 456 1600 470 L1600 900 L0 900Z" />
        <rect x={0} y={420} width={W} height={150} fill="url(#scene-mist)" />

        {/* Low headland at the water's edge, with the temple on it */}
        <path fill="#0b0c0e" d="M600 900 L630 770 Q676 720 760 702 L1050 704 Q1120 718 1170 762 L1220 900Z" />
        {/* Below lg the portrait covers the temple, so it and its shore details are not drawn there. */}
        <g className="hidden lg:inline">
          <Leaves leaves={foliageShore} />
        </g>
        <Temple variant={templeCompact} className="hidden lg:inline xl:hidden" />
        <Temple variant={templeWide} className="hidden xl:inline" />
        {/* The temple's base dissolves into low mist */}
        <rect x={560} y={630} width={720} height={120} fill="url(#scene-mist-low)" />

        {/* Lanterns */}
        <g className="hidden lg:inline">
          <Lanterns items={shoreLanterns} />
        </g>
        <Lanterns items={gateLanterns} />

        {/* Vermilion torii at the right */}
        <path fill="url(#scene-torii)" d={gate} />
        <path fill="none" stroke={rim} strokeWidth={1.2} opacity={0.55} d={gateLintel} />

        {/* Shore, water, and the temple's lights reflected below it (kept clear of the portrait) */}
        <path fill="#08090b" d="M0 720 Q160 690 320 712 Q520 740 640 736 L1180 744 Q1400 706 1600 716 L1600 900 L0 900Z" />
        <rect x={0} y={780} width={W} height={120} fill="url(#scene-water)" />
        <g fill={warm} filter="url(#scene-soft)" className="hidden lg:inline">
          {Array.from({ length: 9 }, (_, i) => (
            <rect
              key={i}
              x={930 + (noise(i, 91) - 0.5) * 100}
              y={800 + i * 10}
              width={60 + noise(i, 93) * 120}
              height={2.4}
              rx={1.2}
              opacity={0.26 - i * 0.025}
            />
          ))}
        </g>
        <path fill={ink} d="M0 900 L0 840 Q90 820 180 838 Q260 856 340 840 L420 900Z M1300 900 Q1360 850 1440 846 Q1520 842 1600 830 L1600 900Z" />

        {/* Red maple foliage framing the corners, out of focus like a foreground layer.
            One filtered group per cluster: a single group spanning three corners made the
            blur region cover almost the whole scene. */}
        {[foliageTopLeft, foliageBottomLeft, foliageTopRight].map((cluster) => (
          <g key={cluster[0].d} filter="url(#scene-bokeh)" opacity={0.9}>
            <Leaves leaves={cluster} />
          </g>
        ))}
      </svg>

      {/* Drifting mist */}
      <div className={styles.mist} style={vars({ h: "26%", b: "26%", a: "0.08", t: "52s" })} />
      <div className={styles.mist} style={vars({ h: "16%", b: "6%", a: "0.05", t: "38s" })} />

      {petals.map(({ c, ...p }) => (
        <span key={p.x} className={styles.petal} style={vars({ ...p, ...(c ? { c } : {}) })} />
      ))}
    </div>
  );
}
