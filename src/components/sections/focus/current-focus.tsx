import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/ui/frame";
import { TagList } from "@/components/ui/tag-list";
import { TechLabel } from "@/components/ui/tech-label";
import { focusItems } from "@/data/focus";
import { FocusMap } from "./focus-map";

export function CurrentFocus() {
  return (
    <Section id="focus" aria-labelledby="focus-title">
      <Container>
        <SectionHeading
          id="focus-title"
          index="05"
          label="Current focus"
          kanji="現在"
          meta="Now"
          title={
            <>
              Where I&apos;m focusing <em>now.</em>
            </>
          }
          intro="Going deeper into AI — and getting stronger at the software systems that make intelligent applications actually useful."
        />

        <Grid className="mt-16 gap-y-14 md:mt-20">
          <Reveal className="md:col-span-6 lg:col-span-4">
            <Frame
              caption={
                <TechLabel tone="muted" aria-hidden="true">
                  Fig. 05 — Focus map
                </TechLabel>
              }
            >
              <div className="pt-2">
                <FocusMap />
              </div>
            </Frame>
          </Reveal>

          <ol className="grid gap-x-gutter md:col-span-6 lg:col-span-8 lg:grid-cols-2">
            {focusItems.map((item, i) => (
              <li key={item.number}>
                <Reveal delay={(i % 2) * 0.06} className="flex h-full flex-col gap-4 border-t border-border/25 py-8">
                  <TechLabel index={item.number} className="text-accent">
                    Focus
                  </TechLabel>
                  <h3 className="type-subheading text-balance">{item.title}</h3>
                  <p className="type-body text-muted-foreground">{item.description}</p>
                  {item.tags && <TagList className="mt-auto pt-2" label={`${item.title} tags`} items={item.tags} />}
                </Reveal>
              </li>
            ))}
          </ol>
        </Grid>
      </Container>
    </Section>
  );
}
