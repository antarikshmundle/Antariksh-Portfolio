import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { MetaRow } from "@/components/ui/meta-row";
import { TechLabel } from "@/components/ui/tech-label";
import { profile, routes } from "@/data/site";
import { ProfileDiagram } from "./profile-diagram";

const profileFacts = [
  { label: "01 Discipline", value: profile.discipline },
  { label: "02 Education", value: `B.Tech · ${profile.college}` },
  { label: "03 Location", value: profile.location },
  { label: "04 Graduation", value: `${profile.graduation} (expected)` },
  { label: "05 Focus", value: profile.focus },
];

export function AboutSection() {
  return (
    <Section id="about" aria-labelledby="about-title" className="bg-surface">
      <Container>
        <SectionHeading
          id="about-title"
          index="01"
          label="About"
          kanji="紹介"
          meta="Profile"
          title={
            <>
              Building where data, models and <em>software</em> meet.
            </>
          }
        />

        <Grid className="mt-14 gap-y-10 md:mt-20 lg:mt-24">
          <Reveal className="md:col-span-6 lg:col-span-6">
            <p className="type-subheading text-balance lg:text-[1.875rem] lg:leading-[1.25]">
              I&apos;m an AI &amp; Data Science engineering student. The part I care about most
              is the step after the model — turning data and code into systems people can
              actually use.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-6 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p className="type-body-lg text-muted-foreground">
              That&apos;s why this portfolio leans on builds rather than isolated experiments.
              Each project starts from a real problem and ends as something with an
              interface, not just a notebook.
            </p>
            <p className="type-body-lg text-muted-foreground">
              Right now I&apos;m working across Python, machine learning, data science and web
              development, with some IoT and applied-systems work along the way.
            </p>
          </Reveal>
        </Grid>

        <Grid className="mt-14 gap-y-12 md:mt-20 lg:mt-24">
          <Reveal className="md:col-span-6 lg:col-span-6">
            <Frame caption={<TechLabel tone="muted">Fig. 02 — Profile</TechLabel>} className="[--frame-bg:var(--color-surface)]">
              <div className="pt-2">
                <ProfileDiagram />
              </div>
            </Frame>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex flex-col gap-10 md:col-span-6 lg:col-span-5 lg:col-start-8"
          >
            <MetaRow layout="stacked" items={profileFacts} />
            <ButtonLink
              href={routes.about}
              variant="secondary"
              className="self-start"
              icon={<ArrowRight className="size-4" strokeWidth={1.75} />}
            >
              More about me
            </ButtonLink>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
