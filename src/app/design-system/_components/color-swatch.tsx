"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const noopSubscribe = () => () => {};

/** Reads a token's live value from :root so globals.css stays the only source. */
function useTokenValue(token: string) {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(`--${token}`)
        .trim()
        .toUpperCase(),
    () => "",
  );
}

function relativeLuminance(hex: string) {
  const channels = [1, 3, 5].map((start) => {
    const value = parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string) {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

function contrastGrade(ratio: number) {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA LARGE";
  return "DECORATIVE";
}

type ColorSwatchProps = {
  token: string;
  swatchClassName: string;
  usage: string;
  /** Token the contrast ratio is measured against. */
  contrastWith: string;
};

export function ColorSwatch({ token, swatchClassName, usage, contrastWith }: ColorSwatchProps) {
  const value = useTokenValue(token);
  const against = useTokenValue(contrastWith);
  const ratio = value && against ? contrastRatio(value, against) : null;

  return (
    <li className="flex flex-col border border-border">
      <div className={cn("h-28 border-b border-border md:h-36", swatchClassName)} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-sm font-medium">--{token}</p>
          <p className="font-mono text-sm text-muted-foreground">{value || "—"}</p>
        </div>
        <p className="type-meta text-muted-foreground">{usage}</p>
        <p className="type-label mt-auto text-muted-foreground">
          {ratio
            ? `${ratio.toFixed(2)}:1 on ${contrastWith} · ${contrastGrade(ratio)}`
            : "Measuring…"}
        </p>
      </div>
    </li>
  );
}
