import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { TechLabel } from "@/components/ui/tech-label";
import { socials } from "@/data/socials";
import { SocialLink } from "./social-link";

export function ConnectSection() {
  return (
    <Section id="connect" aria-labelledby="connect-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="08">Elsewhere</TechLabel>}
          meta={<TechLabel tone="muted">{String(socials.length).padStart(2, "0")} links</TechLabel>}
        />

        <Grid className="mt-12 gap-y-14 md:mt-16">
          <Reveal className="md:col-span-6 lg:col-span-6">
            <h2 id="connect-title" className="type-display text-balance uppercase">
              Find me outside the work
            </h2>
            <p className="type-body-lg mt-6 max-w-sm text-muted-foreground">
              Code, ideas, music — and the places where the work continues.
            </p>
          </Reveal>

          <ul className="border-b-2 md:col-span-6 lg:col-span-6">
            {socials.map((link, i) => (
              <li key={link.id}>
                <Reveal delay={i * 0.06}>
                  <SocialLink link={link} number={String(i + 1).padStart(2, "0")} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Grid>
      </Container>
    </Section>
  );
}
