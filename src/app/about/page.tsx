import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Frame } from "@/components/ui/frame";
import { MetaRow } from "@/components/ui/meta-row";
import { Status } from "@/components/ui/status";
import { TagList } from "@/components/ui/tag-list";
import { TechLabel } from "@/components/ui/tech-label";
import { SignalSystem } from "@/components/sections/hero/signal-system";
import { profile, routes, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} is an AI & Data Science engineering student at ${profile.college}, ${profile.location}, building practical systems with data, models and software.`,
};

const principles = [
  {
    title: "Build before over-explaining",
    text: "I learn fastest by making the thing. A rough working version says more about a problem than a long plan does.",
  },
  {
    title: "Understand the system",
    text: "A model never lives alone. Data comes from somewhere and results go somewhere — I try to understand the whole path, not just the piece I'm writing.",
  },
  {
    title: "Make complexity usable",
    text: "If something is hard to use, it isn't finished. The work is in hiding the machinery behind something clear.",
  },
];

const focusAreas = [
  { title: "AI / Machine learning", text: "How models are built, evaluated and put to work." },
  { title: "Data-driven applications", text: "Applications where the data shapes what people see and do." },
  { title: "Software systems", text: "The engineering around a model — interfaces, structure and reliability." },
  { title: "Applied projects", text: "Building against real problems rather than isolated exercises." },
];

function ChapterHeader({ index, label, id, title }: { index: string; label: string; id: string; title: string }) {
  return (
    <>
      <Divider weight="strong" label={<TechLabel index={index} className="text-accent">{label}</TechLabel>} />
      <h2 id={id} className="type-section mt-10 md:mt-12">
        {title}
      </h2>
    </>
  );
}

export default function AboutPage() {
  return (
    <main id="content" className="flex-1">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div aria-hidden className="bg-grid grid-fade absolute inset-0" />
        <Container className="relative">
          <Grid className="gap-y-8 pt-16 pb-16 md:pt-24 md:pb-20 lg:items-end lg:pt-28">
            <div className="md:col-span-6 lg:col-span-8">
              <TechLabel tone="marked" className="enter text-accent">
                About · {siteConfig.name}
              </TechLabel>
              <h1 className="enter type-display mt-6 max-w-[12ch] text-balance [--enter-delay:0.08s]">
                A little more <em>context.</em>
              </h1>
            </div>
            <p className="enter type-body-lg text-muted-foreground md:col-span-5 lg:col-span-4 lg:pb-3 [--enter-delay:0.16s]">
              Who I am, how I work, and what I&apos;m focused on while finishing my degree.
            </p>
          </Grid>
        </Container>
      </header>

      {/* 01 — Introduction */}
      <Section aria-labelledby="intro-title">
        <Container>
          <ChapterHeader index="01" label="Profile" id="intro-title" title="Introduction" />
          <Grid className="mt-10 gap-y-10 md:mt-14">
            <Reveal className="flex flex-col gap-6 md:col-span-6 lg:col-span-7">
              <p className="type-subheading text-balance lg:text-[1.875rem] lg:leading-[1.25]">
                I&apos;m {siteConfig.name}, an {profile.discipline} engineering student based in{" "}
                {profile.location}. I&apos;m most interested in what happens after
                a model works: making it part of something people can use.
              </p>
              <p className="type-body-lg max-w-2xl text-muted-foreground">
                I&apos;m studying for a {profile.degree} at {profile.college}. Most of my
                learning happens by building — taking a problem, designing a small system
                around it and finding out where it breaks.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-6 lg:col-span-4 lg:col-start-9">
              <MetaRow
                layout="stacked"
                items={[
                  { label: "Discipline", value: profile.discipline },
                  { label: "College", value: profile.college },
                  { label: "Location", value: profile.location },
                  { label: "Graduation", value: `${profile.graduation} (expected)` },
                ]}
              />
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* 02 — Principles */}
      <Section aria-labelledby="principles-title">
        <Container>
          <ChapterHeader index="02" label="Approach" id="principles-title" title="How I work" />
          <ol className="mt-10 grid gap-gutter md:mt-14 lg:grid-cols-3">
            {principles.map(({ title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 border-t border-border/40 pt-6">
                  <TechLabel className="text-accent">{String(i + 1).padStart(2, "0")}</TechLabel>
                  <h3 className="type-subheading">{title}</h3>
                  <p className="type-body text-muted-foreground">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-14 md:mt-20">
            <Frame caption={<TechLabel tone="muted">Fig. 01 — Data to product</TechLabel>}>
              <SignalSystem />
            </Frame>
          </Reveal>
        </Container>
      </Section>

      {/* 03 — Current focus */}
      <Section aria-labelledby="focus-title">
        <Container>
          <ChapterHeader index="03" label="Now" id="focus-title" title="Current focus" />
          <Grid className="mt-10 gap-y-10 md:mt-14">
            <ol className="md:col-span-6 lg:col-span-8">
              {focusAreas.map(({ title, text }, i) => (
                <li key={title} className="grid gap-2 border-t border-border/20 py-6 last:border-b md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-6">
                  <TechLabel tone="muted">{String(i + 1).padStart(2, "0")}</TechLabel>
                  <h3 className="type-subheading">{title}</h3>
                  <p className="type-body text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
            <Reveal className="md:col-span-6 lg:col-span-3 lg:col-start-10">
              <TechLabel tone="muted">Working across</TechLabel>
              <TagList className="mt-4" label="Areas" items={profile.areas} />
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* 04 — Education */}
      <Section aria-labelledby="education-title">
        <Container>
          <ChapterHeader index="04" label="Education" id="education-title" title="Education" />
          <Reveal className="mt-10 md:mt-14">
            <Frame caption={<TechLabel tone="muted">Degree</TechLabel>}>
              <Grid className="gap-y-8 pt-2">
                <div className="flex flex-col gap-3 md:col-span-6 lg:col-span-7">
                  <h3 className="type-subheading">{profile.degree}</h3>
                  <p className="type-body text-muted-foreground">
                    {profile.college}, {profile.location}
                  </p>
                </div>
                <div className="md:col-span-6 lg:col-span-5">
                  <div aria-hidden className="relative my-1.5 h-px bg-border">
                    <span className="absolute top-1/2 left-0 size-2.5 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/20" />
                    <span className="absolute top-1/2 right-0 size-2.5 -translate-y-1/2 border border-foreground bg-background" />
                  </div>
                  <ol className="mt-5 flex items-start justify-between gap-6">
                    <li>
                      <Status tone="active" className="whitespace-nowrap">
                        Now · Studying
                      </Status>
                    </li>
                    <li className="flex flex-col items-end gap-3 text-right">
                      <span className="type-stat">{profile.graduation}</span>
                      <TechLabel tone="muted">Expected graduation</TechLabel>
                    </li>
                  </ol>
                </div>
              </Grid>
            </Frame>
          </Reveal>
        </Container>
      </Section>

      {/* Exit */}
      <Section aria-label="Continue to selected work">
        <Container>
          <Divider weight="strong" />
          <div className="mt-10 flex flex-col items-start gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="type-section max-w-xl text-balance">
              The work says <em>the rest.</em>
            </p>
            <ButtonLink href={routes.work} icon={<ArrowRight className="size-4" strokeWidth={1.75} />}>
              See what I&apos;ve been building
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
