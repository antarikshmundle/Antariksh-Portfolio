import { ArrowDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { ButtonLink } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { TechLabel } from "@/components/ui/tech-label";
import { routes, siteConfig } from "@/data/site";
import { SignalSystem } from "./signal-system";

const arrow = <ArrowRight className="size-4" strokeWidth={1.75} />;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid grid-fade absolute inset-0" />

      <Container className="relative">
        {/* Masthead strip */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border/20 py-4">
          <TechLabel tone="inverse">AM / Portfolio</TechLabel>
          <div className="flex items-center gap-x-6">
            <TechLabel tone="muted">{siteConfig.location}</TechLabel>
            <TechLabel tone="muted" className="hidden sm:inline-flex">
              {siteConfig.coordinates}
            </TechLabel>
          </div>
        </div>

        {/* Identity — the name is sized to span the container exactly. */}
        <div className="@container relative pt-12 md:pt-14">
          <TechLabel tone="marked">Hello, I&apos;m</TechLabel>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[21cqi] leading-[0.84] font-semibold tracking-[-0.055em] uppercase md:mt-6"
          >
            <span className="block">Antariksh</span>{" "}
            <span className="block md:text-right">Mundle</span>
          </h1>
          {/* From tablet up the role sits in the space left of "Mundle". */}
          <p className="mt-6 flex items-baseline gap-3 font-display text-xl leading-tight font-medium tracking-[-0.01em] uppercase md:absolute md:bottom-[0.2em] md:left-0 md:mt-0 md:max-w-[21cqi] lg:text-2xl">
            <span aria-hidden className="size-2 shrink-0 bg-accent" />
            {siteConfig.role}
          </p>
        </div>

        {/* Statement, actions and the signature system diagram */}
        <Grid className="mt-10 gap-y-10 border-t-2 pt-8 md:mt-12 lg:mt-10 lg:pt-10">
          <div className="flex flex-col gap-8 md:col-span-6 lg:col-span-4">
            <p className="type-subheading max-w-sm text-balance">{siteConfig.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={routes.work} icon={arrow}>
                View my work
              </ButtonLink>
              <ButtonLink href={routes.about} variant="secondary" icon={arrow}>
                About me
              </ButtonLink>
            </div>
          </div>

          <Frame
            caption={<TechLabel tone="muted">Fig. 00 — Data to product</TechLabel>}
            className="md:col-span-6 lg:col-span-8 lg:col-start-5"
          >
            <SignalSystem />
          </Frame>
        </Grid>

        {/* Metadata + scroll cue */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border/20 py-5 lg:mt-12">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <TechLabel index="01">AI &amp; Data</TechLabel>
            </li>
            <li>
              <TechLabel index="02">Building</TechLabel>
            </li>
            <li>
              <TechLabel tone="muted">2026</TechLabel>
            </li>
          </ul>
          <p className="type-label inline-flex items-center gap-2 text-muted-foreground">
            <ArrowDown aria-hidden className="size-3.5" strokeWidth={1.75} />
            Scroll
          </p>
        </div>
      </Container>
    </section>
  );
}
