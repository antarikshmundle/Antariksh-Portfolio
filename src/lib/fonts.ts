import { Inter, Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/** Display — headings and large editorial type. */
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Editorial — italic emphasis inside headings. Used sparingly. */
const serifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
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
  serifFont.variable,
  bodyFont.variable,
  monoFont.variable,
].join(" ");
