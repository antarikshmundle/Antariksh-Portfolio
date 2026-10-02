import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/** Display — headings and large editorial type. */
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Body — running text and UI copy. */
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Technical — monospace labels, metadata, code. */
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = [
  displayFont.variable,
  bodyFont.variable,
  monoFont.variable,
].join(" ");
