"use client";

/*
 * Adapter for ThreeUI's KageLandingPage — the one non-registered file in this
 * integration.
 *
 * The registered src/shaders/landing-pages/LandingPages.tsx (sha256 4d379461…)
 * exports KageLandingPage alongside dozens of other pages, and its top-level
 * imports reach modules outside the registered set (Vite `?raw` HTML imports and
 * other pages' document builders). It is kept byte-exact but cannot be compiled
 * here, so the function below reproduces its KageLandingPage body verbatim
 * (LandingPages.tsx lines 65–69) against the registered, unmodified
 * LandingPageFrame, pageTypography and pageRecipes modules. Only the import
 * specifiers differ ("./pageTypography" → "@/shaders/landing-pages/pageTypography").
 *
 * src/shaders/threeui.css is deliberately not imported. It stays on disk
 * byte-exact, but it loads ./fonts/fragment-mono.woff2, which is outside the
 * registered set. The frame needs nothing from it: LandingPageFrame's inline
 * styles already set position, overflow and background.
 */
import { LandingPageFrame, type LandingPageProps } from "@/shaders/landing-pages/LandingPageFrame";
import { KAGE_TYPOGRAPHY } from "@/shaders/landing-pages/pageRecipes";
import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "@/shaders/landing-pages/pageTypography";

export function KageLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Kage — Where stillness reveals the unseen" sourceUrl="/landing-pages/kage.html" />;
}
