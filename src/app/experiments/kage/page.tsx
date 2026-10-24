import type { Metadata } from "next";
import { KageLandingPage } from "./kage-landing-page";

/*
 * ThreeUI's KageLandingPage, mounted full-screen. The page itself is the
 * byte-exact public/landing-pages/kage.html, loaded in the component's
 * sandboxed iframe, so none of the portfolio's styles reach it.
 * Notices: public/landing-pages/THIRD-PARTY-NOTICES.txt
 */

export const metadata: Metadata = {
  title: "Kage — ThreeUI experiment",
  description: "ThreeUI's Kage landing page, integrated as a standalone experiment.",
  // Also sent as an X-Robots-Tag header (next.config.ts).
  robots: { index: false, follow: false },
};

/** The component's documented typography and colour props, at the Kage recipe's defaults. */
const typography = {
  headingFont: "onest",
  bodyFont: "onest",
  headingWeight: "400",
  bodyWeight: "300",
  primaryColor: "#e0231c",
  headingSize: 46,
  bodySize: 17,
  headingLetterSpacing: -0.012,
};

export default function KageExperimentPage() {
  return (
    <main id="content" className="h-dvh w-full">
      <h1 className="sr-only">Kage — ThreeUI landing page experiment</h1>
      <KageLandingPage {...typography} style={{ width: "100%", height: "100%" }} />
    </main>
  );
}
