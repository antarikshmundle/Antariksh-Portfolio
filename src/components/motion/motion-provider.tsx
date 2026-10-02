"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide motion defaults. reducedMotion="user" makes every Framer Motion
 * animation honour prefers-reduced-motion: transforms are skipped and only
 * opacity transitions remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
