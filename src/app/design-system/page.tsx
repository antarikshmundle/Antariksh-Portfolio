import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { ActionArrow } from "@/components/ui/action-arrow";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Frame } from "@/components/ui/frame";
import { MetaRow } from "@/components/ui/meta-row";
import { Status } from "@/components/ui/status";
import { TechLabel, type TechLabelTone } from "@/components/ui/tech-label";
import { cn } from "@/lib/cn";
import { ColorSwatch } from "./_components/color-swatch";
import { MotionDemos } from "./_components/motion-demos";
import { SpecNote, SpecSection } from "./_components/spec-section";

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal visual reference for the portfolio design language.",
  robots: { index: false, follow: false },
};

const chapters = [
  { id: "colors", index: "01", title: "Colors" },
  { id: "typography", index: "02", title: "Typography" },
  { id: "buttons", index: "03", title: "Buttons" },
  { id: "labels", index: "04", title: "Labels" },
  { id: "surfaces", index: "05", title: "Surfaces" },
  { id: "borders", index: "06", title: "Borders & Dividers" },
  { id: "grid", index: "07", title: "Grid" },
  { id: "micro", index: "08", title: "Micro components" },
  { id: "motion", index: "09", title: "Motion" },
  { id: "spacing", index: "10", title: "Spacing & Layout" },
];

const colorTokens = [
  {
    token: "background",
    swatchClassName: "bg-background",
    usage: "Page canvas. Near-black charcoal, slightly warm, never pure black.",
    contrastWith: "foreground",
  },
  {
    token: "foreground",
    swatchClassName: "bg-foreground",
    usage: "Primary text and headings. Warm white, also the ground of paper-plate figures.",
    contrastWith: "background",
  },
  {
    token: "muted-foreground",
    swatchClassName: "bg-muted-foreground",
    usage: "Secondary text, captions and metadata.",
    contrastWith: "background",
  },
  {
    token: "border",
    swatchClassName: "bg-border",
    usage: "Rules, frames and outlines. Always used at reduced opacity (/15–/60).",
    contrastWith: "background",
  },
  {
    token: "accent",
    swatchClassName: "bg-accent",
    usage: "Vermilion — the red moon: primary actions, markers, active states, focus rings. Used rarely.",
    contrastWith: "background",
  },
  {
    token: "accent-foreground",
    swatchClassName: "bg-accent-foreground",
    usage: "Text and icons placed on an accent fill.",
    contrastWith: "accent",
  },
  {
    token: "moon",
    swatchClassName: "bg-moon",
    usage: "Deep moon red for large fills: the hero moon and paper-plate figures. Never text on the dark canvas.",
    contrastWith: "foreground",
  },
  {
    token: "surface",
    swatchClassName: "bg-surface",
    usage: "Alternating section bands, figures and the footer.",
    contrastWith: "foreground",
  },
  {
    token: "surface-raised",
    swatchClassName: "bg-surface-raised",
    usage: "Hover fills and raised cells on top of a surface.",
    contrastWith: "foreground",
  },
];

const typeScale = [
  {
    name: "Display",
    utility: "type-display",
    spec: "Space Grotesk · 500 · 44–112px · -4.5% · sentence case",
    sample: (
      <p className="type-display">
        Engineering, <em>edited.</em>
      </p>
    ),
  },
  {
    name: "Section heading",
    utility: "type-section",
    spec: "Space Grotesk · 500 · 32–60px · -3.5%",
    sample: <p className="type-section">Selected work</p>,
  },
  {
    name: "Subheading",
    utility: "type-subheading",
    spec: "Space Grotesk · 500 · 20–24px",
    sample: (
      <p className="type-subheading max-w-2xl">
        Designing reliable systems for messy, real-world data.
      </p>
    ),
  },
  {
    name: "Body",
    utility: "type-body / type-body-lg",
    spec: "Inter · 400 · 16px / 17–20px · 1.6",
    sample: (
      <div className="flex max-w-prose flex-col gap-4">
        <p className="type-body-lg">
          I build software where the engineering is visible in the details —
          clear interfaces, honest data, and systems that stay fast as they grow.
        </p>
        <p className="type-body text-muted-foreground">
          Body copy sits at a comfortable measure of roughly 65 characters. Muted
          text keeps AA contrast on both background and surface.
        </p>
      </div>
    ),
  },
  {
    name: "Editorial emphasis",
    utility: "<em> in headings / type-em",
    spec: "Instrument Serif · italic · 400 · 1.08em",
    sample: (
      <p className="type-section">
        Systems built end to <em>end.</em>
      </p>
    ),
  },
  {
    name: "Metadata",
    utility: "type-meta",
    spec: "Inter · 400 · 13px",
    sample: (
      <p className="type-meta text-muted-foreground">
        Published 14 Mar 2026 · 6 min read · Machine learning
      </p>
    ),
  },
  {
    name: "Technical label",
    utility: "type-label",
    spec: "JetBrains Mono · 500 · 11px · +10% · uppercase",
    sample: (
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <TechLabel index="01">About</TechLabel>
        <TechLabel tone="muted">Build 01</TechLabel>
        <TechLabel tone="marked">System status</TechLabel>
      </div>
    ),
  },
  {
    name: "Statistic",
    utility: "type-stat",
    spec: "Space Grotesk · 500 · 40–72px · tabular",
    sample: (
      <div className="flex flex-wrap gap-x-16 gap-y-8">
        <div>
          <p className="type-stat">
            95.8<span className="text-accent">%</span>
          </p>
          <p className="type-label mt-4 text-muted-foreground">Disease model test accuracy</p>
        </div>
        <div>
          <p className="type-stat">69</p>
          <p className="type-label mt-4 text-muted-foreground">Campus places</p>
        </div>
      </div>
    ),
  },
];

const labelExamples: { index?: string; text: string; tone: TechLabelTone }[] = [
  { index: "01", text: "About", tone: "plain" },
  { index: "02", text: "Selected work", tone: "plain" },
  { text: "AI / ML", tone: "boxed" },
  { text: "System status", tone: "marked" },
  { text: "Build 01", tone: "inverse" },
  { text: "Case study", tone: "boxed" },
  { text: "2026", tone: "muted" },
  { text: "Open source", tone: "muted" },
];

const gridSpans = [
  { label: "12", cells: ["md:col-span-6 lg:col-span-12"] },
  { label: "8 + 4", cells: ["md:col-span-4 lg:col-span-8", "md:col-span-2 lg:col-span-4"] },
  { label: "6 + 6", cells: ["md:col-span-3 lg:col-span-6", "md:col-span-3 lg:col-span-6"] },
  {
    label: "4 + 4 + 4",
    cells: [
      "md:col-span-2 lg:col-span-4",
      "md:col-span-2 lg:col-span-4",
      "md:col-span-2 lg:col-span-4",
    ],
  },
  {
    label: "3 · offset 8",
    cells: ["md:col-span-2 lg:col-span-3", "md:col-span-4 lg:col-span-8 lg:col-start-5"],
  },
];

const spacingScale = [
  { px: 4, className: "w-1" },
  { px: 8, className: "w-2" },
  { px: 12, className: "w-3" },
  { px: 16, className: "w-4" },
  { px: 24, className: "w-6" },
  { px: 32, className: "w-8" },
  { px: 48, className: "w-12" },
  { px: 64, className: "w-16" },
  { px: 96, className: "w-24" },
  { px: 128, className: "w-32" },
];

export default function DesignSystemPage() {
  return (
    <main id="content" className="flex-1">
      {/* Masthead */}
      <header className="relative overflow-hidden">
        <div aria-hidden className="bg-grid grid-fade absolute inset-0" />
        <Container className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/20 py-4">
            <TechLabel tone="inverse">Internal · Design spec</TechLabel>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <TechLabel tone="muted">Build 02</TechLabel>
              <TechLabel tone="muted">Rev 2026.10</TechLabel>
              <Status tone="active">In review</Status>
            </div>
          </div>

          <Grid className="gap-y-10 pt-16 pb-14 md:pt-24 lg:pt-32 lg:pb-20">
            <div className="md:col-span-6 lg:col-span-8">
              <h1 className="type-display">
                Design
                <br />
                <em>system</em>
              </h1>
              <p className="type-subheading mt-6 md:mt-8">Antariksh Mundle Portfolio</p>
            </div>
            <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-4 lg:self-end">
              <p className="type-body text-muted-foreground">
                The working reference for the portfolio&apos;s visual language:
                editorial typography on a charcoal ground, a structural grid, quiet
                rules and a single vermilion accent. Every value on this page comes from the shared
                tokens and components.
              </p>
              <MetaRow
                items={[
                  { label: "Tokens", value: "globals.css" },
                  { label: "Primitives", value: "components/ui" },
                ]}
              />
            </div>
          </Grid>

          <nav aria-label="Specification contents" className="border-t-2 py-8">
            <ol className="grid grid-cols-1 gap-x-gutter sm:grid-cols-2 lg:grid-cols-5">
              {chapters.map(({ id, index, title }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group flex items-baseline gap-3 border-b border-border/20 py-3 transition-colors hover:border-border"
                  >
                    <span className="type-label text-muted-foreground">{index}</span>
                    <span className="type-label decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                      {title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </header>

      <SpecSection
        id="colors"
        index="01"
        title="Colors"
        description="Six semantic tokens defined once in globals.css. Components reference the token, never the hex value."
      >
        <ul className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {colorTokens.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </ul>
        <SpecNote>
          Values and contrast ratios are read live from the CSS custom properties.
        </SpecNote>
      </SpecSection>

      <SpecSection
        id="typography"
        index="02"
        title="Typography"
        description="Three families, each with one job. Display for voice, Inter for reading, JetBrains Mono for machine-like detail."
      >
        <div className="border-b border-border/20">
          {typeScale.map(({ name, utility, spec, sample }) => (
            <div
              key={name}
              className="grid gap-6 border-t border-border/20 py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10"
            >
              <div className="flex flex-col gap-2">
                <TechLabel>{name}</TechLabel>
                <p className="font-mono text-xs text-muted-foreground">.{utility}</p>
                <p className="type-meta text-muted-foreground">{spec}</p>
              </div>
              <div className="min-w-0 break-words">{sample}</div>
            </div>
          ))}
        </div>
      </SpecSection>

      <SpecSection
        id="buttons"
        index="03"
        title="Buttons"
        description="Sharp, quiet geometry. Hover states move a few pixels at most; focus is always a visible accent ring."
      >
        <Frame caption={<TechLabel tone="muted">B.01 — Variants</TechLabel>}>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button icon={<ArrowRight className="size-4" strokeWidth={1.75} />}>
              View selected work
            </Button>
            <Button variant="secondary" icon={<Download className="size-4" strokeWidth={1.75} />}>
              Download CV
            </Button>
            <Button variant="minimal" icon={<ArrowUpRight className="size-4" strokeWidth={1.75} />}>
              Read case study
            </Button>
          </div>
          <Divider weight="hairline" className="my-8" />
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled>Primary disabled</Button>
            <Button variant="secondary" disabled>
              Secondary disabled
            </Button>
          </div>
        </Frame>
        <div className="mt-10 grid gap-x-gutter gap-y-8 md:grid-cols-3">
          {[
            ["Primary", "Foreground fill. Lifts 2px with an accent offset shadow; settles on press."],
            ["Secondary", "Outlined on the canvas. Fills with surface on hover."],
            ["Minimal", "Typography only. Accent underline and a forward-moving arrow."],
          ].map(([name, text]) => (
            <div key={name}>
              <TechLabel tone="marked">{name}</TechLabel>
              <p className="type-meta mt-3 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </SpecSection>

      <SpecSection
        id="labels"
        index="04"
        title="Labels"
        description="Monospace labels mark structure: section numbers, categories, build states and dates."
      >
        <ul className="grid grid-cols-1 gap-px border border-border bg-border/20 sm:grid-cols-2 lg:grid-cols-4">
          {labelExamples.map(({ index, text, tone }) => (
            <li key={text} className="flex min-h-32 flex-col justify-between gap-6 bg-background p-5">
              <TechLabel index={index} tone={tone} className="self-start">
                {text}
              </TechLabel>
              <p className="font-mono text-xs text-muted-foreground">tone=&quot;{tone}&quot;</p>
            </li>
          ))}
        </ul>
      </SpecSection>

      <SpecSection
        id="surfaces"
        index="05"
        title="Surfaces"
        description="Cards are defined by borders, spacing and surface contrast — no shadows, blur or glow."
      >
        <div className="grid gap-gutter md:grid-cols-2">
          <Card variant="surface">
            <TechLabel tone="muted">S.01 — Surface</TechLabel>
            <h3 className="type-subheading mt-10">Basic surface</h3>
            <p className="type-body mt-3 text-muted-foreground">
              A recessed panel for grouping secondary content without adding a rule.
            </p>
          </Card>

          <Card variant="inverse">
            <TechLabel className="opacity-70">S.02 — Inverse</TechLabel>
            <h3 className="type-subheading mt-10">Contrasting surface</h3>
            <p className="type-body mt-3 opacity-75">
              Reserved for moments of emphasis: a key metric, a call to action, a
              pull quote.
            </p>
          </Card>

          <Card as="article" padded={false} className="flex flex-col">
            <div className="relative flex aspect-[16/10] items-center justify-center border-b border-border bg-surface">
              <div aria-hidden className="bg-grid absolute inset-0" />
              <TechLabel tone="muted" className="relative">
                Fig. 01 — System diagram
              </TechLabel>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <TechLabel tone="marked">Case study</TechLabel>
                <TechLabel tone="muted">2026</TechLabel>
              </div>
              <h3 className="type-subheading">Realtime anomaly detection pipeline</h3>
              <p className="type-body text-muted-foreground">
                Streaming inference over sensor data with sub-second alerting.
              </p>
              <div className="flex flex-wrap gap-2">
                <TechLabel tone="boxed">Python</TechLabel>
                <TechLabel tone="boxed">Kafka</TechLabel>
                <TechLabel tone="boxed">AI / ML</TechLabel>
              </div>
            </div>
            <a
              href="#surfaces"
              className="group flex items-center justify-between gap-4 border-t border-border py-3 pr-3 pl-6 md:pl-8"
            >
              <span className="type-label">Read case study</span>
              <ActionArrow />
            </a>
          </Card>

          <Card className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TechLabel tone="marked">Technical card</TechLabel>
              <Status tone="active">Operational</Status>
            </div>
            <div>
              <p className="type-stat">
                03<span className="text-accent">.</span>
              </p>
              <p className="type-subheading mt-4">Inference service</p>
            </div>
            <MetaRow
              layout="stacked"
              items={[
                { label: "Stack", value: "Next.js · TypeScript" },
                { label: "Role", value: "Lead engineer" },
                { label: "Timeline", value: "2025 — 2026" },
                { label: "Latency", value: "p95 · 180ms" },
              ]}
            />
          </Card>
        </div>
      </SpecSection>

      <SpecSection
        id="borders"
        index="06"
        title="Borders & Dividers"
        description="Rules carry the structure. Three weights, square corners, and a 2px radius only on buttons."
      >
        <div className="flex flex-col gap-14">
          <div className="grid gap-gutter sm:grid-cols-3">
            {[
              ["Hairline", "border border-border/20"],
              ["Standard", "border border-border"],
              ["Strong", "border-2 border-border"],
            ].map(([name, className]) => (
              <div key={name}>
                <div className={cn("flex h-32 items-end p-4", className)}>
                  <TechLabel>{name}</TechLabel>
                </div>
                <SpecNote>{className}</SpecNote>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <TechLabel tone="muted">Dividers</TechLabel>
            <Divider weight="hairline" />
            <Divider />
            <Divider weight="strong" />
            <Divider
              weight="strong"
              label={<TechLabel index="02">Selected work</TechLabel>}
              meta={<TechLabel tone="muted">04 projects</TechLabel>}
            />
          </div>

          <section aria-label="Bordered section example" className="border-y-2 py-8 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <TechLabel tone="muted">Bordered section</TechLabel>
                <p className="type-section mt-4">Experience</p>
              </div>
              <p className="type-body max-w-sm text-muted-foreground">
                Strong top and bottom rules isolate a band of content without boxing it in.
              </p>
            </div>
          </section>

          <Frame caption={<TechLabel tone="muted">Fig. 06 — Technical frame</TechLabel>}>
            <div className="grid gap-6 pt-2 md:grid-cols-2">
              <p className="type-subheading">
                Registration-mark corners frame diagrams, figures and specs.
              </p>
              <MetaRow
                items={[
                  { label: "Rule", value: "border/25" },
                  { label: "Corners", value: "2px · 12px" },
                  { label: "Radius", value: "0" },
                ]}
              />
            </div>
          </Frame>
        </div>
      </SpecSection>

      <SpecSection
        id="grid"
        index="07"
        title="Grid"
        description="Twelve columns on desktop, six on tablet, one on mobile. Gutter and column gap share one token."
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TechLabel tone="muted">Live breakpoint</TechLabel>
            <TechLabel tone="inverse">
              <span className="md:hidden">Mobile · 1 column</span>
              <span className="hidden md:inline lg:hidden">Tablet · 6 columns</span>
              <span className="hidden lg:inline">Desktop · 12 columns</span>
            </TechLabel>
          </div>

          <Grid aria-hidden>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-24 items-end justify-center border border-accent/40 bg-accent/10 pb-2",
                  i >= 6 && "hidden lg:flex",
                  i >= 1 && i < 6 && "hidden md:flex",
                )}
              >
                <span className="type-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </Grid>

          <div className="flex flex-col gap-3">
            {gridSpans.map(({ label, cells }) => (
              <div key={label} className="flex flex-col gap-2">
                <TechLabel tone="muted">{label}</TechLabel>
                <Grid className="gap-y-2">
                  {cells.map((span, i) => (
                    <div key={i} className={cn("h-10 border border-border bg-surface", span)} />
                  ))}
                </Grid>
              </div>
            ))}
          </div>

          <div>
            <div className="relative h-64 overflow-hidden border border-border md:h-80">
              <div aria-hidden className="bg-grid grid-fade absolute inset-0" />
              <div className="relative flex h-full flex-col justify-between p-6">
                <TechLabel tone="muted">Fig. 07 — Structural texture</TechLabel>
                <p className="type-section max-w-lg">Structure, not decoration.</p>
              </div>
            </div>
            <SpecNote>
              .bg-grid + .grid-fade — 9% border hairlines, 32px / 48px cell. For heroes and figures only.
            </SpecNote>
          </div>
        </div>
      </SpecSection>

      <SpecSection
        id="micro"
        index="08"
        title="Micro components"
        description="Small, functional details. Each one carries information — none are ornamental."
      >
        <ul className="grid grid-cols-1 gap-px border border-border bg-border/20 md:grid-cols-2">
          <li className="flex flex-col gap-6 bg-background p-6 md:p-8">
            <TechLabel tone="muted">Status</TechLabel>
            <div className="flex flex-col gap-4">
              <Status tone="active">Available for work</Status>
              <Status tone="idle">In progress</Status>
              <Status tone="offline">Archived</Status>
            </div>
          </li>
          <li className="flex flex-col gap-6 bg-background p-6 md:p-8">
            <TechLabel tone="muted">Action arrow</TechLabel>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#micro" className="group flex items-center gap-4">
                <span className="type-label">Continue</span>
                <ActionArrow direction="right" />
              </a>
              <a href="#micro" className="group flex items-center gap-4">
                <span className="type-label">Open repository</span>
                <ActionArrow />
              </a>
            </div>
          </li>
          <li className="flex flex-col gap-6 bg-background p-6 md:p-8">
            <TechLabel tone="muted">Metadata row</TechLabel>
            <MetaRow
              items={[
                { label: "Role", value: "Engineer" },
                { label: "Year", value: "2026" },
                { label: "Stack", value: "TypeScript" },
                { label: "Duration", value: "4 months" },
              ]}
            />
          </li>
          <li className="flex flex-col gap-6 bg-background p-6 md:p-8">
            <TechLabel tone="muted">Section marker</TechLabel>
            <div className="flex items-end gap-5">
              <span className="type-stat">02</span>
              <div className="flex flex-col gap-2 pb-1">
                <TechLabel index="02">Selected work</TechLabel>
                <span className="type-meta text-muted-foreground">04 projects</span>
              </div>
            </div>
          </li>
        </ul>
      </SpecSection>

      <SpecSection
        id="motion"
        index="09"
        title="Motion"
        description="Motion confirms interaction and nothing more. Short, damped, transform-only — and it respects reduced-motion settings."
      >
        <MotionDemos />
        <SpecNote>
          Framer Motion for component interaction · GSAP reserved for future scroll choreography.
        </SpecNote>
      </SpecSection>

      <SpecSection
        id="spacing"
        index="10"
        title="Spacing & Layout"
        description="One container, one gutter and one section rhythm — all responsive, all driven from tokens."
      >
        <div className="flex flex-col gap-14">
          <div>
            <div className="flex h-28 border border-border md:h-36" aria-hidden>
              <div className="flex w-6 items-center justify-center bg-accent/15 md:w-12 lg:w-16" />
              <div className="flex flex-1 flex-col items-center justify-center gap-2 border-x border-dashed border-border bg-surface">
                <span className="type-label">max-w-content</span>
                <span className="type-meta text-muted-foreground">80rem · 1280px</span>
              </div>
              <div className="flex w-6 items-center justify-center bg-accent/15 md:w-12 lg:w-16" />
            </div>
            <div className="mt-3 flex justify-between">
              <TechLabel tone="muted">← px-gutter</TechLabel>
              <TechLabel tone="muted">px-gutter →</TechLabel>
            </div>
          </div>

          <Card variant="surface" padded={false}>
            <MetaRow
              layout="stacked"
              className="border-t-0 px-6 py-2 md:px-8"
              items={[
                { label: "Container", value: "max-w-content · 1280px" },
                { label: "Gutter", value: "16 / 24 / 40px" },
                { label: "Section space", value: "72 / 96 / 128px" },
                { label: "Grid columns", value: "1 / 6 / 12" },
                { label: "Breakpoints", value: "md 768 · lg 1024" },
                {
                  label: "Current",
                  value: (
                    <>
                      <span className="md:hidden">Mobile</span>
                      <span className="hidden md:inline lg:hidden">Tablet</span>
                      <span className="hidden lg:inline">Desktop</span>
                    </>
                  ),
                },
              ]}
            />
          </Card>

          <div>
            <TechLabel tone="muted">Spacing scale · 4px base</TechLabel>
            <ol className="mt-6 flex flex-col gap-3">
              {spacingScale.map(({ px, className }) => (
                <li key={px} className="flex items-center gap-4">
                  <span className="type-label w-12 text-muted-foreground">{px}</span>
                  <span aria-hidden className={cn("h-3 bg-foreground", className)} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SpecSection>

      <Container className="pb-16">
        <Divider
          weight="strong"
          className="pt-8"
          label={<TechLabel tone="muted">End of specification</TechLabel>}
          meta={
            <Link href="/" className={buttonStyles("minimal")}>
              <ArrowLeft aria-hidden className="size-4" strokeWidth={1.75} />
              Home
            </Link>
          }
        />
      </Container>
    </main>
  );
}
