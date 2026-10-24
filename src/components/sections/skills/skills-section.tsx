import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/ui/frame";
import { TechLabel } from "@/components/ui/tech-label";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { StackPipeline } from "./stack-pipeline";

/** One entry of the technical index. Not interactive — hover is cosmetic only. */
function SkillGroupRow({ group }: { group: SkillGroup }) {
  return (
    <article className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-5 border-t border-border/20 py-8 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-x-6 xl:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.15fr)] lg:py-10">
      <span className="font-display text-3xl font-medium tracking-[-0.04em] text-muted-foreground transition-colors duration-300 group-hover:text-accent md:text-4xl">
        {group.number}
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="type-subheading">{group.title}</h3>
        <p className="type-body max-w-sm text-muted-foreground">{group.description}</p>
      </div>
      <ul
        aria-label={`${group.title} technologies`}
        className="col-start-2 grid grid-cols-2 gap-x-4 md:gap-x-6 xl:col-start-3"
      >
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="group/skill flex items-center gap-3 border-b border-border/15 py-2.5 font-mono text-xs font-medium tracking-[0.06em] text-foreground/90 uppercase"
          >
            <span
              aria-hidden
              className="size-1 shrink-0 bg-muted-foreground transition-colors duration-200 group-hover/skill:bg-accent"
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
    <Section id="skills" aria-labelledby="skills-title">
      <Container>
        <SectionHeading
          id="skills-title"
          index="03"
          label="Skills"
          kanji="技術"
          meta={`${String(skillGroups.length).padStart(2, "0")} groups`}
          title={
            <>
              What I build <em>with.</em>
            </>
          }
          intro="The tools I reach for to take an idea from data and models to a working system — listed as used in projects, not as proficiency scores."
        />

        <Grid className="mt-16 gap-y-14 md:mt-20">
          <div className="md:col-span-6 lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:col-span-4 lg:self-start">
            <Reveal>
              <Frame caption={<TechLabel tone="muted">Fig. 03 — Stack pipeline</TechLabel>}>
                <div className="pt-2">
                  <StackPipeline />
                </div>
              </Frame>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <p className="font-serif text-2xl leading-snug text-balance italic">
                The stack follows the problem — the simplest combination that turns an idea into
                something people can use.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 lg:col-span-8">
            <ol className="border-b border-border/20">
              {skillGroups.map((group, i) => (
                <li key={group.number}>
                  <Reveal delay={i * 0.06}>
                    <SkillGroupRow group={group} />
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
