"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Portfolio chrome (skip link, header, footer). Full-screen experiments under
 * /experiments/ render without it so their own authored navigation owns the
 * viewport. Resolved during server rendering, so nothing flashes.
 */
export function PortfolioChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/experiments/") ? null : children;
}
