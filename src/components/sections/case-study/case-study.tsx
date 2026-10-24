import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ActionArrow } from "@/components/ui/action-arrow";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { MetaRow, type MetaItem } from "@/components/ui/meta-row";
import { TagList } from "@/components/ui/tag-list";
import { TechLabel } from "@/components/ui/tech-label";
import {
  getAdjacentProjects,
  getProjectHref,
  projects,
  type Project,
  type ProjectBuildNote,
  type ProjectResult,
  type ProjectSystemMap,
  type ProjectSystemNode,
} from "@/data/projects";
import { routes } from "@/data/site";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "../projects/project-visual";
import { ChapterNav } from "./chapter-nav";

/* ------------------------------------------------------------------ */
/* Chapters: defined once, rendered only when the project documents them */
/* ------------------------------------------------------------------ */

type Chapter = {
  id: string;
  title: string;
  render: (project: Project) => ReactNode | null;
};

const prose = (text?: string) =>
  text ? <p className="type-body-lg max-w-[62ch] text-foreground/85">{text}</p> : null;

const list = (items?: string[]) =>
  items && items.length > 0 ? (
    <ul className="max-w-[62ch] border-t border-border/20">
      {items.map((item) => (
        <li key={item} className="type-body flex gap-4 border-b border-border/20 py-4 text-foreground/85">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  ) : null;

/** The stack as a ruled index rather than a cloud of pills. */
const stack = (items: string[]) => (
  <div className="flex flex-col gap-4">
    <TechLabel tone="muted">Stack</TechLabel>
    <ul aria-label="Technologies" className="grid grid-cols-2 gap-x-6 border-t border-border/20 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item} className="type-meta border-b border-border/15 py-2.5 font-mono tracking-[0.02em]">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/** An ordered sequence (tiers, pipeline stages) drawn as connected cells. */
const steps = ({ label, items }: NonNullable<ProjectBuildNote["steps"]>) => (
  <div className="flex flex-col gap-4">
    <TechLabel tone="muted">{label}</TechLabel>
    <ol className="grid grid-cols-2 gap-px border border-border/20 bg-border/20 sm:grid-cols-4">
      {items.map((item, i) => (
        <li key={item} className="flex flex-col gap-3 bg-background p-3.5">
          <span className="type-label text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span className="type-meta">{item}</span>
        </li>
      ))}
    </ol>
  </div>
);

const systemNode = ({ name, role }: ProjectSystemNode) => (
  <>
    <span className="type-subheading block">{name}</span>
    <span className="type-meta mt-1 block text-muted-foreground">{role}</span>
  </>
);

/** Architecture drawn with borders and type only: main path, plus systems beside it. */
const systemMap = ({ layers, aside }: ProjectSystemMap) => (
  <figure className="flex flex-col gap-4">
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
      <ol aria-label="Main request path" className="flex flex-col">
        {layers.map((layer, i) => (
          <li key={layer.name} className="flex flex-col">
            {i > 0 && (
              <ArrowDown aria-hidden="true" className="mx-5 my-2 size-4 text-accent" strokeWidth={2} />
            )}
            <div className={cn("border p-4", i === 0 ? "border-accent/60" : "border-border/30")}>
              <TechLabel tone="muted" className="mb-3">
                {String(i + 1).padStart(2, "0")}
              </TechLabel>
              {systemNode(layer)}
            </div>
          </li>
        ))}
      </ol>
      {aside && (
        <Frame caption={<TechLabel>{aside.label}</TechLabel>} className="self-start p-5 md:p-6">
          <p className="type-meta text-muted-foreground">{aside.note}</p>
          <ul className="mt-4 border-t border-border/20">
            {aside.items.map((item) => (
              <li key={item.name} className="border-b border-border/20 py-3">
                <span className="type-body block font-medium">{item.name}</span>
                <span className="type-meta block text-muted-foreground">{item.role}</span>
              </li>
            ))}
          </ul>
        </Frame>
      )}
    </div>
    <figcaption className="type-label text-muted-foreground">System overview — simplified.</figcaption>
  </figure>
);

/** Lettered technical subsections; h3 keeps them under the chapter's h2. */
const buildNotes = (notes: ProjectBuildNote[]) => (
  <div className="flex flex-col">
    {notes.map((note, i) => (
      <div key={note.title} className="flex flex-col gap-5 border-t border-border/20 py-10 last:pb-0">
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="type-label text-accent">
            {String.fromCharCode(65 + i)}
          </span>
          <h3 className="type-subheading">{note.title}</h3>
        </div>
        {note.paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-body max-w-[62ch] text-muted-foreground">
            {paragraph}
          </p>
        ))}
        {note.steps && steps(note.steps)}
      </div>
    ))}
  </div>
);

const chapters: Chapter[] = [
  { id: "overview", title: "Overview", render: (p) => prose(p.overview) },
  { id: "problem", title: "The problem", render: (p) => prose(p.problem) },
  { id: "solution", title: "The solution", render: (p) => prose(p.approach) },
  {
    id: "system",
    title: "System",
    render: (p) =>
      p.architecture || p.system || p.features?.length ? (
        <div className="flex flex-col gap-12">
          {prose(p.architecture)}
          {p.system && systemMap(p.system)}
          {p.features?.length ? (
            <div className="flex flex-col gap-4">
              <TechLabel tone="muted">Capabilities</TechLabel>
              {list(p.features)}
            </div>
          ) : null}
        </div>
      ) : null,
  },
  {
    id: "implementation",
    title: "Implementation",
    render: (p) =>
      p.technologies?.length || p.buildNotes?.length ? (
        <div className="flex flex-col gap-10">
          {p.technologies?.length ? stack(p.technologies) : null}
          {p.buildNotes?.length ? buildNotes(p.buildNotes) : null}
        </div>
      ) : null,
  },
  { id: "outcome", title: "Outcome", render: (p) => prose(p.outcome) },
  { id: "tradeoffs", title: "Trade-offs", render: (p) => list(p.challenges) },
  {
    id: "next",
    title: "What's next",
    render: (p) =>
      p.future || p.roadmap?.length ? (
        <div className="flex flex-col gap-8">
          {prose(p.future)}
          {list(p.roadmap)}
        </div>
      ) : null,
  },
];

/* ------------------------------------------------------------------ */

function ExternalLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={buttonStyles(variant)}>
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function CaseStudyHero({ project }: { project: Project }) {
  const facts: MetaItem[] = [
    { label: "Category", value: project.category },
    ...(project.alsoKnownAs ? [{ label: "Also known as", value: project.alsoKnownAs }] : []),
    { label: "Domain", value: project.tags.join(" · ") },
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
    { label: "Write-up", value: project.overview ? "Full case study" : "Project brief" },
  ];

  return (
    <header className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid grid-fade absolute inset-0" />
      <Container className="relative pt-8 md:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonLink href={routes.work} variant="minimal" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
            All work
          </ButtonLink>
          <TechLabel tone="muted">
            Project {project.number} / {String(projects.length).padStart(2, "0")}
          </TechLabel>
        </div>

        <div className="mt-14 md:mt-20">
          <TechLabel tone="marked" index={project.number} className="enter text-accent">
            {project.category}
          </TechLabel>
          <h1 id="project-title" className="enter type-display mt-6 max-w-[16ch] text-balance [--enter-delay:0.06s]">
            {project.title}
          </h1>
          {project.kicker && (
            <p className="enter mt-5 font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight text-accent italic [--enter-delay:0.12s]">
              {project.kicker}
            </p>
          )}
        </div>

        <Grid className="enter mt-12 gap-y-10 border-t border-border/25 pt-8 md:mt-16 lg:pt-10 [--enter-delay:0.18s]">
          <p className="type-body-lg max-w-xl md:col-span-6 lg:col-span-6">{project.summary}</p>
          <div className="flex flex-col gap-8 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <MetaRow layout="stacked" items={facts} />
            {(project.github || project.liveUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <ExternalLink href={project.liveUrl} variant="primary">
                    Open live project
                  </ExternalLink>
                )}
                {project.github && (
                  <ExternalLink href={project.github} variant={project.liveUrl ? "secondary" : "primary"}>
                    View source
                  </ExternalLink>
                )}
              </div>
            )}
          </div>
        </Grid>

        <figure className="enter mt-14 md:mt-20 [--enter-delay:0.28s]">
          <ProjectVisual
            type={project.visual.type}
            tone={project.visual.tone}
            number={project.number}
            className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]"
          />
          <figcaption className="type-label mt-4 text-muted-foreground">
            Conceptual diagram of the project&apos;s domain — not a product screenshot.
          </figcaption>
        </figure>
      </Container>
    </header>
  );
}

/** Documented figures, large, with the context that keeps each one honest. */
function ResultsBand({ results, source }: { results: ProjectResult[]; source?: string }) {
  return (
    <section aria-labelledby="results-title" className="mt-section bg-surface py-16 md:py-20">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="results-title" className="type-label text-accent">
            Results at a glance
          </h2>
          {source && <p className="type-label text-muted-foreground">{source}</p>}
        </div>
        <dl className="mt-10 grid gap-px bg-border/15 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result, i) => (
            <Reveal key={result.label} delay={i * 0.06} className="flex flex-col gap-4 bg-surface py-6 pr-6 sm:px-6 sm:first:pl-0 lg:py-2">
              <dt className="type-label order-2 text-foreground">{result.label}</dt>
              <dd className="type-stat order-1 text-foreground">{result.value}</dd>
              {result.detail && <dd className="type-meta order-3 text-muted-foreground">{result.detail}</dd>}
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function CaseStudyChapters({ project }: { project: Project }) {
  const present = chapters
    .map((chapter) => ({ ...chapter, content: chapter.render(project) }))
    .filter((chapter) => chapter.content !== null);

  if (present.length === 0) return <ProjectBrief project={project} />;

  return (
    <Section>
      <Container>
        <Grid className="gap-y-12">
          <aside className="hidden lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:col-span-3 lg:block lg:self-start">
            <ChapterNav chapters={present.map(({ id, title }) => ({ id, title }))} />
          </aside>

          <div className="flex flex-col gap-20 md:col-span-6 md:gap-28 lg:col-span-8 lg:col-start-5">
            {present.map((chapter, i) => (
              <section
                key={chapter.id}
                id={chapter.id}
                aria-labelledby={`chapter-${chapter.id}`}
                className="scroll-mt-[calc(var(--header-height)+2rem)]"
              >
                <Reveal>
                  <div className="flex items-baseline gap-4 border-t border-border/25 pt-6">
                    <span className="type-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h2 id={`chapter-${chapter.id}`} className="type-section">
                      {chapter.title}
                    </h2>
                  </div>
                  <div className="mt-10">{chapter.content}</div>
                </Reveal>
              </section>
            ))}
          </div>
        </Grid>
      </Container>
    </Section>
  );
}

/**
 * Projects without a published write-up get an honest brief: what is
 * documented, and a route to the projects that are written up in full.
 */
function ProjectBrief({ project }: { project: Project }) {
  const writtenUp = projects.filter((p) => p.featured && p.slug !== project.slug);

  return (
    <Section aria-labelledby="brief-title">
      <Container>
        <Grid className="gap-y-12">
          <div className="md:col-span-6 lg:col-span-6">
            <div className="flex items-baseline gap-4 border-t border-border/25 pt-6">
              <span className="type-label text-accent">01</span>
              <h2 id="brief-title" className="type-section">
                Project brief
              </h2>
            </div>
            <p className="type-body-lg mt-10 max-w-[56ch] text-foreground/85">{project.summary}</p>
            <TagList className="mt-8" label="Domain" items={project.tags} />
          </div>

          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <Frame caption={<TechLabel tone="muted">Status of this write-up</TechLabel>}>
              <p className="type-body text-muted-foreground">
                A full case study for this project hasn&apos;t been published yet. This brief is
                everything documented so far — nothing has been filled in.
              </p>
              {writtenUp.length > 0 && (
                <div className="mt-8">
                  <TechLabel tone="muted">Read a full case study</TechLabel>
                  <ul className="mt-3 border-b border-border/20">
                    {writtenUp.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={getProjectHref(p.slug)}
                          className="group flex items-center justify-between gap-4 border-t border-border/20 py-4"
                        >
                          <span className="flex flex-col gap-1">
                            <span className="type-subheading">{p.title}</span>
                            {p.kicker && <span className="type-meta text-muted-foreground">{p.kicker}</span>}
                          </span>
                          <ActionArrow direction="right" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Frame>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}

function ProjectPager({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <nav aria-label="More projects" className="pb-section">
      <Container>
        <div className="grid border-y border-border/25 md:grid-cols-2">
          {previous ? (
            <Link
              href={getProjectHref(previous.slug)}
              className="group flex flex-col gap-3 py-8 md:border-r md:border-border/25 md:pr-8"
            >
              <span className="type-label inline-flex items-center gap-2 text-muted-foreground">
                <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform motion-safe:group-hover:-translate-x-1" strokeWidth={1.75} />
                Previous · {previous.number}
              </span>
              <span className="type-section transition-colors duration-200 group-hover:text-accent">{previous.title}</span>
            </Link>
          ) : (
            <div aria-hidden="true" className="hidden md:block md:border-r md:border-border/25" />
          )}
          {next ? (
            <Link
              href={getProjectHref(next.slug)}
              className={cn(
                "group flex flex-col items-end gap-3 py-8 text-right md:pl-8",
                previous && "border-t border-border/25 md:border-t-0",
              )}
            >
              <span className="type-label inline-flex items-center gap-2 text-muted-foreground">
                Next · {next.number}
                <ArrowRight aria-hidden="true" className="size-3.5 transition-transform motion-safe:group-hover:translate-x-1" strokeWidth={1.75} />
              </span>
              <span className="type-section transition-colors duration-200 group-hover:text-accent">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </Container>
    </nav>
  );
}

/** Data-driven case-study template shared by every project. */
export function CaseStudy({ project }: { project: Project }) {
  return (
    <article aria-labelledby="project-title">
      <CaseStudyHero project={project} />
      {project.results?.length ? <ResultsBand results={project.results} source={project.resultsSource} /> : null}
      <CaseStudyChapters project={project} />
      <ProjectPager project={project} />
    </article>
  );
}
