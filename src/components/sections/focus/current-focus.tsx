import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { Frame } from "@/components/ui/frame";
import { TechLabel } from "@/components/ui/tech-label";
import { focusItems } from "@/data/focus";
import { FocusMap } from "./focus-map";

export function CurrentFocus() {
  return (
    <Section id="focus" aria-labelledby="focus-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="06">Current focus</TechLabel>}
          meta={<TechLabel tone="muted">Now</TechLabel>}
        />

        <Grid className="mt-12 gap-y-14 md:mt-16">
          <div className="flex flex-col gap-10 md:col-span-6 lg:col-span-6">
            <Reveal>
              <h2 id="focus-title" className="type-display text-balance uppercase">
                Where I&apos;m focusing now
              </h2>
              <p className="type-body-lg mt-6 max-w-sm text-muted-foreground">
                Going deeper into AI — and getting stronger at the software systems that make
                intelligent applications actually useful.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="max-w-md">
              <Frame
                caption={
                  <TechLabel tone="muted" aria-hidden="true">
                    Fig. 06 — Focus map
                  </TechLabel>
                }
              >
                <div className="pt-2">
                  <FocusMap />
                </div>
              </Frame>
            </Reveal>
          </div>

          <ol className="md:col-span-6 lg:col-span-6">
            {focusItems.map((item, i) => (
              <li key={item.number}>
                <Reveal delay={i * 0.06} className="border-t-2 py-8 md:py-10">
                  <TechLabel tone="marked" index={item.number}>
                    Focus
                  </TechLabel>
                  <h3 className="type-section mt-5 text-balance">{item.title}</h3>
                  <p className="type-body-lg mt-4 max-w-xl text-muted-foreground">{item.description}</p>
                  {item.tags && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${item.title} tags`}>
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <TechLabel tone="boxed">{tag}</TechLabel>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </Grid>
      </Container>
    </Section>
  );
}
