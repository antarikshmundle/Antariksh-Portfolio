import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { TechLabel } from "@/components/ui/tech-label";
import { journeyItems } from "@/data/journey";
import { JourneyRecord } from "./journey-record";
import { JourneyTimeline } from "./journey-timeline";

export function JourneySection() {
  return (
    <Section id="journey" aria-labelledby="journey-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="05">Journey</TechLabel>}
          meta={<TechLabel tone="muted">{String(journeyItems.length).padStart(2, "0")} stages</TechLabel>}
        />

        <Grid className="mt-12 gap-y-14 md:mt-16">
          {/* Short enough to stay fully in view while the timeline scrolls past */}
          <Reveal className="md:col-span-6 lg:sticky lg:top-10 lg:col-span-5 lg:self-start">
            <h2 id="journey-title" className="type-display text-balance uppercase">
              The work behind the work
            </h2>
            <p className="type-body-lg mt-6 max-w-sm text-muted-foreground">
              The education, communities, competitions and projects that the portfolio grew out of.
            </p>
          </Reveal>

          <div className="md:col-span-6 lg:col-span-7 lg:pt-4">
            <JourneyTimeline />
          </div>
        </Grid>

        <section aria-labelledby="journey-record" className="mt-20 md:mt-24">
          <JourneyRecord />
        </section>

        <Grid className="mt-16 md:mt-20">
          <Reveal className="border-t-2 pt-8 md:col-span-6 lg:col-span-7 lg:col-start-6">
            <p className="type-subheading max-w-xl text-balance">
              Still early in the journey. The direction is clearer than the destination.
            </p>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
