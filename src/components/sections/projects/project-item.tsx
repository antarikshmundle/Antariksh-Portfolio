import Link from "next/link";
import { Grid } from "@/components/layout/grid";
import { ActionArrow } from "@/components/ui/action-arrow";
import { TechLabel } from "@/components/ui/tech-label";
import { getProjectHref, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./project-visual";

export type ProjectLayout = "visual-left" | "visual-right" | "wide";

type ProjectItemProps = {
  project: Project;
  layout: ProjectLayout;
};

function ProjectLabels({ project }: { project: Project }) {
  // Tags only: the full stack belongs to the case study, not the compact card.
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {project.tags.map((label) => (
        <li key={label}>
          <TechLabel tone="boxed">{label}</TechLabel>
        </li>
      ))}
    </ul>
  );
}

/** The item's only link; its ::after stretches over the whole article. */
function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      href={getProjectHref(project.slug)}
      className="flex items-center justify-between gap-4 border-t border-border pt-4 after:absolute after:inset-0 after:content-['']"
    >
      <span className="type-label">
        Explore case study<span className="sr-only">: {project.title}</span>
      </span>
      <ActionArrow direction="right" className="group-focus-within:bg-foreground group-focus-within:text-background" />
    </Link>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <TechLabel tone="marked" index={project.number}>
        Project
      </TechLabel>
      <TechLabel tone="muted">{project.category}</TechLabel>
    </div>
  );
}

export function ProjectItem({ project, layout }: ProjectItemProps) {
  const visual = (
    <ProjectVisual
      type={project.visual.type}
      tone={project.visual.tone}
      number={project.number}
      className={
        layout === "wide" ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]"
      }
    />
  );

  if (layout === "wide") {
    return (
      <article className="group relative">
        <ProjectHeader project={project} />
        <div className="mt-6">{visual}</div>
        <Grid className="mt-8 gap-y-6 lg:mt-10">
          <h3 className="type-section text-balance uppercase md:col-span-6 lg:col-span-6">
            {project.title}
          </h3>
          <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-6">
            <p className="type-body-lg max-w-xl text-muted-foreground">{project.summary}</p>
            <ProjectLabels project={project} />
            <CaseStudyLink project={project} />
          </div>
        </Grid>
      </article>
    );
  }

  return (
    <article className="group relative">
      <Grid className="gap-y-8">
        <div className={cn("md:col-span-6 lg:col-span-7", layout === "visual-right" && "lg:col-start-6")}>
          {visual}
        </div>
        <div
          className={cn(
            "flex flex-col gap-8 md:col-span-6 lg:col-span-5 lg:justify-between",
            layout === "visual-right" && "lg:col-start-1 lg:row-start-1",
          )}
        >
          <div className="flex flex-col gap-6">
            <ProjectHeader project={project} />
            <h3 className="type-section text-balance uppercase lg:mt-6">{project.title}</h3>
            <p className="type-body-lg max-w-md text-muted-foreground">{project.summary}</p>
            <ProjectLabels project={project} />
          </div>
          <CaseStudyLink project={project} />
        </div>
      </Grid>
    </article>
  );
}
