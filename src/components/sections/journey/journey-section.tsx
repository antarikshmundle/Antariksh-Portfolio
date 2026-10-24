import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { journeyItems } from "@/data/journey";
import { JourneyRecord } from "./journey-record";
import { JourneyTimeline } from "./journey-timeline";

export function JourneySection() {
  return (
    <Section id="journey" aria-labelledby="journey-title" className="bg-surface">
      <Container>
        <SectionHeading
          id="journey-title"
          index="04"
          label="Experience"
          kanji="経歴"
          meta={`${String(journeyItems.length).padStart(2, "0")} stages`}
          title={
            <>
              The work behind the <em>work.</em>
            </>
          }
          intro="The education, communities, competitions and projects that the portfolio grew out of."
        />

        <Grid className="mt-16 gap-y-14 md:mt-20">
          {/* Short enough to stay fully in view while the timeline scrolls past */}
          <Reveal className="hidden lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:col-span-4 lg:block lg:self-start">
            <p className="font-serif text-3xl leading-tight text-balance italic">
              Still early in the journey. The direction is clearer than the destination.
            </p>
          </Reveal>

          <div className="md:col-span-6 lg:col-span-7 lg:col-start-6">
            <JourneyTimeline />
          </div>
        </Grid>

        <section aria-labelledby="journey-record" className="mt-20 md:mt-24">
          <JourneyRecord />
        </section>

        <Reveal className="mt-16 border-t border-border/20 pt-8 lg:hidden">
          <p className="font-serif text-2xl leading-snug text-balance italic">
            Still early in the journey. The direction is clearer than the destination.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
