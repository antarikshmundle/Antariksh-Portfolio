import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Grid } from "@/components/layout/grid";
import { ActionArrow } from "@/components/ui/action-arrow";
import { TagList } from "@/components/ui/tag-list";
import { TechLabel } from "@/components/ui/tech-label";
import { getProjectHref, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./project-visual";

/** Small external link that sits above the card's stretched link. */
function OutboundLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="type-label relative z-10 inline-flex items-center gap-1.5 text-muted-foreground decoration-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

type FeaturedProjectProps = {
  project: Project;
  /** Mirrors the composition so consecutive features never share a layout. */
  reverse?: boolean;
};

/**
 * Large case-study treatment for projects with a documented write-up.
 * The title link stretches over the whole article; live and source links
 * sit above it so they stay independently clickable.
 */
export function FeaturedProject({ project, reverse = false }: FeaturedProjectProps) {
  const highlights = project.results?.slice(0, 2) ?? [];

  return (
    <article className="group relative">
      <Grid className="gap-y-8 lg:items-stretch">
        <div className={cn("md:col-span-6 lg:col-span-7", reverse && "lg:col-start-6")}>
          <ProjectVisual
            type={project.visual.type}
            tone={project.visual.tone}
            number={project.number}
            className="aspect-[4/3] h-full lg:aspect-auto lg:min-h-[34rem]"
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-8 md:col-span-6 lg:col-span-5 lg:justify-between lg:py-2",
            reverse ? "lg:col-start-1 lg:row-start-1 lg:pr-6" : "lg:pl-6",
          )}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <TechLabel tone="marked" index={project.number} className="text-foreground">
                Case study
              </TechLabel>
              <TechLabel tone="muted">
                {project.alsoKnownAs ? `${project.category} · ${project.alsoKnownAs}` : project.category}
              </TechLabel>
            </div>

            <h3 className="type-section text-balance">
              <Link
                href={getProjectHref(project.slug)}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {project.title}
              </Link>
            </h3>
            {project.kicker && (
              <p className="-mt-2 font-serif text-2xl leading-tight text-accent italic">{project.kicker}</p>
            )}
            <p className="type-body max-w-md text-muted-foreground">{project.summary}</p>

            {highlights.length > 0 && (
              <dl className="grid grid-cols-2 border-y border-border/15">
                {highlights.map((result, i) => (
                  <div key={result.label} className={cn("flex flex-col gap-2 py-5", i === 1 && "border-l border-border/15 pl-5")}>
                    <dt className="type-label text-muted-foreground">{result.label}</dt>
                    <dd className="font-display text-3xl font-medium tracking-[-0.04em]">{result.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.technologies && (
              <TagList label="Technologies" items={project.technologies.slice(0, 6)} />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/25 pt-5 group-has-[a:focus-visible]:border-accent">
            <span className="type-label inline-flex items-center gap-3">
              Read the case study
              <ActionArrow direction="right" />
            </span>
            <span className="flex gap-5">
              {project.liveUrl && <OutboundLink href={project.liveUrl}>Live</OutboundLink>}
              {project.github && <OutboundLink href={project.github}>Source</OutboundLink>}
            </span>
          </div>
        </div>
      </Grid>
    </article>
  );
}

/** Compact row for projects without a full write-up yet. The whole row is the link. */
export function ProjectIndexRow({ project }: { project: Project }) {
  return (
    <Link
      href={getProjectHref(project.slug)}
      className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-t border-border/20 py-7 transition-colors duration-300 hover:bg-surface md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-x-6 md:px-4 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_10rem_auto] lg:py-8"
    >
      <span className="type-label self-start pt-2 text-muted-foreground group-hover:text-accent">{project.number}</span>
      <span className="flex min-w-0 flex-col gap-2">
        <span className="type-subheading transition-transform duration-300 motion-safe:group-hover:translate-x-1">
          {project.title}
        </span>
        <span className="type-label text-muted-foreground">{project.category}</span>
      </span>
      <span className="type-meta col-span-2 col-start-2 row-start-2 max-w-md text-muted-foreground md:col-span-1 md:col-start-3 md:row-start-1">
        {project.summary}
      </span>
      <ProjectVisual
        type={project.visual.type}
        tone={project.visual.tone}
        number={project.number}
        compact
        className="hidden aspect-[16/10] w-full lg:block"
      />
      <ActionArrow direction="right" className="col-start-3 row-start-1 md:col-start-4 lg:col-start-5" />
      <span className="sr-only">— project brief</span>
    </Link>
  );
}
