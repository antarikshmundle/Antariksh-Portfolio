import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { Frame } from "@/components/ui/frame";
import { TechLabel } from "@/components/ui/tech-label";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { StackPipeline } from "./stack-pipeline";

/** One entry of the technical index. Not interactive — hover is cosmetic only. */
function SkillGroupRow({ group }: { group: SkillGroup }) {
  return (
    <article className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-5 border-t border-border py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-x-6 lg:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.15fr)] lg:py-10">
      <span className="type-section text-muted-foreground transition-colors duration-300 group-hover:text-accent">
        {group.number}
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="type-subheading uppercase">{group.title}</h3>
        <p className="type-body max-w-sm text-muted-foreground">{group.description}</p>
      </div>
      <ul
        aria-label={`${group.title} technologies`}
        className="col-start-2 grid grid-cols-2 gap-x-4 md:gap-x-6 lg:col-start-3"
      >
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="group/skill flex items-center gap-3 border-b border-border/15 py-2.5 font-mono text-xs font-medium tracking-[0.08em] uppercase"
          >
            <span
              aria-hidden
              className="size-1.5 shrink-0 bg-foreground/25 transition-colors duration-200 group-hover/skill:bg-accent"
            />
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" aria-labelledby="skills-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="04">Technical stack</TechLabel>}
          meta={<TechLabel tone="muted">{String(skillGroups.length).padStart(2, "0")} groups</TechLabel>}
        />

        <Grid className="mt-12 gap-y-14 md:mt-16">
          {/* Heading, context and the pipeline */}
          <div className="md:col-span-6 lg:col-span-4">
            <div className="flex flex-col gap-10">
              <Reveal>
                <h2 id="skills-title" className="type-display uppercase">
                  What I build{" "}
                  <br className="hidden lg:block" />
                  with
                </h2>
                <p className="type-body-lg mt-6 max-w-sm text-muted-foreground">
                  The tools I reach for to take an idea from data and models to a working system.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="md:max-w-md lg:max-w-none">
                <Frame caption={<TechLabel tone="muted">Fig. 05 — Stack pipeline</TechLabel>}>
                  <div className="pt-2">
                    <StackPipeline />
                  </div>
                </Frame>
              </Reveal>
            </div>
          </div>

          {/* Technical index */}
          <div className="md:col-span-6 lg:col-span-8">
            <ol className="border-b border-border">
              {skillGroups.map((group, i) => (
                <li key={group.number}>
                  <Reveal delay={i * 0.06}>
                    <SkillGroupRow group={group} />
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal className="mt-12 md:mt-16">
              <TechLabel tone="marked">Note</TechLabel>
              <p className="type-subheading mt-5 max-w-2xl text-balance">
                The stack follows the problem. The aim is always the simplest combination that turns
                an idea into something people can actually use.
              </p>
            </Reveal>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
