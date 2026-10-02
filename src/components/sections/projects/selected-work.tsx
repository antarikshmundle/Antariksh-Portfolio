import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { TechLabel } from "@/components/ui/tech-label";
import { projects } from "@/data/projects";
import { ProjectItem, type ProjectLayout } from "./project-item";

/** Layouts cycle so consecutive projects never share a composition. */
const layouts: ProjectLayout[] = ["visual-left", "visual-right", "wide"];

export function SelectedWork() {
  return (
    <Section id="work" aria-labelledby="work-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="02">Selected work</TechLabel>}
          meta={<TechLabel tone="muted">{String(projects.length).padStart(2, "0")} projects</TechLabel>}
        />

        <Grid className="mt-12 gap-y-8 md:mt-16 lg:items-end">
          <h2 id="work-title" className="type-display uppercase md:col-span-6 lg:col-span-8">
            Selected{" "}
            <br />
            <span className="md:pl-[1.2em]">Work</span>
          </h2>
          <p className="type-body-lg max-w-sm text-muted-foreground md:col-span-4 lg:col-span-4 lg:pb-3">
            Five builds across campus navigation, agriculture, applied AI, management software and IoT.
          </p>
        </Grid>

        <ol className="mt-16 flex flex-col md:mt-20 lg:mt-28">
          {projects.map((project, i) => (
            <li
              key={project.slug}
              className="border-t border-border/20 py-12 first:border-t-0 first:pt-0 md:py-16 lg:py-20"
            >
              <Reveal>
                <ProjectItem project={project} layout={layouts[i % layouts.length]} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
