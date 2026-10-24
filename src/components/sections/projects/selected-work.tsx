import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { TechLabel } from "@/components/ui/tech-label";
import { projects } from "@/data/projects";
import { FeaturedProject, ProjectIndexRow } from "./project-item";

/**
 * Featured projects (documented write-ups) get the full case-study card;
 * the rest form a compact index. Order follows projects.ts.
 */
export function SelectedWork() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Section id="work" aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          index="02"
          label="Projects"
          kanji="作品"
          meta={`${String(projects.length).padStart(2, "0")} projects`}
          title={
            <>
              Systems built end to <em>end.</em>
            </>
          }
          intro="Two in-depth case studies, then the wider set of builds across management software and IoT."
        />

        <ol className="mt-16 flex flex-col gap-24 md:mt-20 lg:mt-28 lg:gap-36">
          {featured.map((project, i) => (
            <li key={project.slug}>
              <Reveal>
                <FeaturedProject project={project} reverse={i % 2 === 1} />
              </Reveal>
            </li>
          ))}
        </ol>

        {more.length > 0 && (
          <div className="mt-24 lg:mt-36">
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6">
              <h3 className="type-subheading">More builds</h3>
              <TechLabel tone="muted">Project briefs</TechLabel>
            </div>
            <ol className="border-b border-border/20">
              {more.map((project, i) => (
                <li key={project.slug}>
                  <Reveal delay={i * 0.06}>
                    <ProjectIndexRow project={project} />
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </Section>
  );
}
