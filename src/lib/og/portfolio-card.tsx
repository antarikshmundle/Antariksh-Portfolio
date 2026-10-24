import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, siteConfig } from "@/data/site";

/*
 * Shared social card for opengraph-image and twitter-image. Rendered once at
 * build time. Colours mirror the tokens in src/styles/globals.css; fonts are
 * static OFL instances vendored in src/assets/fonts (ImageResponse needs
 * TTF/OTF, and reading local files keeps the build offline-safe).
 */

const cardSize = { width: 1200, height: 630 };

const color = {
  background: "#0c0d0e",
  foreground: "#f1ece3",
  muted: "#98948b",
  accent: "#f2503f",
  line: "rgba(143, 139, 132, 0.22)",
  grid: "rgba(143, 139, 132, 0.07)",
};

const fontFile = (name: string) => readFile(join(process.cwd(), "src/assets/fonts", name));

/** Data → product: a row of nodes resolving to the accent square, as in the hero figure. */
function SignalMark() {
  const nodes = [0.25, 0.45, 0.7, 1];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {nodes.map((opacity, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 12, height: 12, background: color.foreground, opacity }} />
          <div style={{ width: 34, height: 1, background: color.line }} />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          border: `1px solid ${color.accent}`,
        }}
      >
        <div style={{ width: 18, height: 18, background: color.accent }} />
      </div>
    </div>
  );
}

export async function renderPortfolioCard() {
  const [display, serif, mono] = await Promise.all([
    fontFile("SpaceGrotesk-Medium.ttf"),
    fontFile("InstrumentSerif-Italic.ttf"),
    fontFile("JetBrainsMono-Medium.ttf"),
  ]);

  const label = { fontFamily: "Mono", fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase" } as const;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px 72px",
          background: color.background,
          backgroundImage: `linear-gradient(to right, ${color.grid} 1px, transparent 1px), linear-gradient(to bottom, ${color.grid} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: color.foreground,
          fontFamily: "Display",
        }}
      >
        {/* Masthead */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                ...label,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                border: `1px solid ${color.accent}`,
                color: color.accent,
                letterSpacing: "0.04em",
              }}
            >
              AM
            </div>
            <div style={{ ...label, display: "flex", color: color.muted }}>Portfolio</div>
          </div>
          <div style={{ ...label, display: "flex", color: color.muted }}>{siteConfig.location}</div>
        </div>

        {/* Identity */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 118, lineHeight: 1, letterSpacing: "-0.045em" }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontFamily: "Serif",
              fontStyle: "italic",
              fontSize: 84,
              lineHeight: 1.05,
              color: color.accent,
            }}
          >
            {siteConfig.role}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: color.muted, letterSpacing: "-0.01em" }}>
            I turn models and data into working software.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 26,
            borderTop: `1px solid ${color.line}`,
          }}
        >
          <div style={{ ...label, display: "flex", color: color.muted }}>
            {`B.Tech ${profile.discipline} · ${profile.college}`}
          </div>
          <SignalMark />
        </div>
      </div>
    ),
    {
      ...cardSize,
      fonts: [
        { name: "Display", data: display, style: "normal", weight: 500 },
        { name: "Serif", data: serif, style: "italic", weight: 400 },
        { name: "Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
