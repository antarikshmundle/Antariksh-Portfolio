import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Frame } from "@/components/ui/frame";
import { MetaRow, type MetaItem } from "@/components/ui/meta-row";
import { TechLabel } from "@/components/ui/tech-label";
import {
  getAdjacentProjects,
  getProjectHref,
  type Project,
  type ProjectBuildNote,
  type ProjectSystemMap,
  type ProjectSystemNode,
} from "@/data/projects";
import { routes } from "@/data/site";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "../projects/project-visual";

/* ------------------------------------------------------------------ */
/* Chapters: defined once, rendered only when the project documents them */
/* ------------------------------------------------------------------ */

type Chapter = {
  id: string;
  title: string;
  render: (project: Project) => ReactNode | null;
};

const prose = (text?: string) =>
  text ? <p className="type-body-lg max-w-2xl text-muted-foreground">{text}</p> : null;

const list = (items?: string[]) =>
  items && items.length > 0 ? (
    <ul className="max-w-2xl border-t border-border/20">
      {items.map((item) => (
        <li key={item} className="type-body flex gap-4 border-b border-border/20 py-4">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  ) : null;

const stack = (items: string[]) => (
  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
    {items.map((item) => (
      <li key={item}>
        <TechLabel tone="boxed">{item}</TechLabel>
      </li>
    ))}
  </ul>
);

const steps = ({ label, items }: NonNullable<ProjectBuildNote["steps"]>) => (
  <div className="flex flex-col gap-3">
    <TechLabel tone="muted">{label}</TechLabel>
    <ol className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li key={item}>
          <TechLabel tone="boxed" index={String(i + 1).padStart(2, "0")}>
            {item}
          </TechLabel>
        </li>
      ))}
    </ol>
  </div>
);

const systemNode = ({ name, role }: ProjectSystemNode) => (
  <>
    <span className="type-subheading block uppercase">{name}</span>
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
            <div className="border-2 p-4">
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
      <div key={note.title} className="flex flex-col gap-5 border-t border-border/20 py-8 last:pb-0">
        <TechLabel tone="marked" aria-hidden="true">
          {String.fromCharCode(65 + i)}
        </TechLabel>
        <h3 className="type-subheading uppercase">{note.title}</h3>
        {note.paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-body max-w-2xl text-muted-foreground">
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
  { id: "approach", title: "Approach", render: (p) => prose(p.approach) },
  {
    id: "system",
    title: "System",
    render: (p) =>
      p.architecture || p.system || p.features?.length ? (
        <div className="flex flex-col gap-10">
          {prose(p.architecture)}
          {p.system && systemMap(p.system)}
          {list(p.features)}
        </div>
      ) : null,
  },
  {
    id: "build",
    title: "Build",
    render: (p) =>
      p.technologies?.length || p.buildNotes?.length ? (
        <div className="flex flex-col gap-8">
          {p.technologies?.length ? stack(p.technologies) : null}
          {p.buildNotes?.length ? buildNotes(p.buildNotes) : null}
        </div>
      ) : null,
  },
  { id: "tradeoffs", title: "Trade-offs", render: (p) => list(p.challenges) },
  { id: "outcome", title: "Outcome", render: (p) => prose(p.outcome) },
  {
    id: "next",
    title: "Next",
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

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={buttonStyles("secondary")}>
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function CaseStudyHero({ project }: { project: Project }) {
  const facts: MetaItem[] = [
    { label: "Category", value: project.category },
    { label: "Domain", value: project.tags.join(" · ") },
    ...(project.technologies?.length ? [{ label: "Stack", value: project.technologies.join(" · ") }] : []),
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
  ];

  return (
    <header className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid grid-fade absolute inset-0" />
      <Container className="relative pt-10 md:pt-14">
        <ButtonLink href={routes.work} variant="minimal">
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Back to work
        </ButtonLink>

        <div className="mt-12 md:mt-16">
          <TechLabel tone="marked" index={project.number}>
            Project
          </TechLabel>
          <h1 id="project-title" className="type-display mt-6 text-balance uppercase">
            {project.title}
          </h1>
        </div>

        <Grid className="mt-10 gap-y-8 border-t-2 pt-8 md:mt-14 lg:pt-10">
          <p className="type-subheading max-w-xl md:col-span-6 lg:col-span-6">{project.summary}</p>
          <div className="flex flex-col gap-8 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <MetaRow layout="stacked" items={facts} />
            {(project.github || project.liveUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.github && <ExternalLink href={project.github}>View source</ExternalLink>}
                {project.liveUrl && <ExternalLink href={project.liveUrl}>Open project</ExternalLink>}
              </div>
            )}
          </div>
        </Grid>

        <figure className="mt-12 md:mt-16">
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

function CaseStudyChapters({ project }: { project: Project }) {
  const present = chapters
    .map((chapter) => ({ ...chapter, content: chapter.render(project) }))
    .filter((chapter) => chapter.content !== null);

  if (present.length === 0) {
    return (
      <Section>
        <Container>
          <Divider weight="strong" label={<TechLabel tone="muted">Case study</TechLabel>} />
          <p className="type-body-lg mt-8 max-w-xl text-muted-foreground">
            The full write-up for this project is being prepared.
          </p>
        </Container>
      </Section>
    );
  }

  // One section rhythm for the whole write-up; chapters sit closer together
  // than homepage sections so short chapters don't float in empty space.
  return (
    <Section>
      <Container className="flex flex-col gap-16 md:gap-24">
        {present.map((chapter, i) => {
          const index = String(i + 1).padStart(2, "0");
          return (
            <section key={chapter.id} aria-labelledby={`chapter-${chapter.id}`}>
              <Reveal>
                <Grid className="gap-y-8 border-t-2 pt-8">
                  <div className="md:col-span-6 lg:col-span-4">
                    <TechLabel tone="muted" index={index}>
                      Chapter
                    </TechLabel>
                    <h2 id={`chapter-${chapter.id}`} className="type-section mt-4">
                      {chapter.title}
                    </h2>
                  </div>
                  <div className="md:col-span-6 lg:col-span-7 lg:col-start-6 lg:pt-2">{chapter.content}</div>
                </Grid>
              </Reveal>
            </section>
          );
        })}
      </Container>
    </Section>
  );
}

function ProjectPager({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <nav aria-label="More projects" className="pb-section">
      <Container>
        <div className="grid border-y-2 md:grid-cols-2">
          {previous ? (
            <Link
              href={getProjectHref(previous.slug)}
              className="group flex flex-col gap-3 py-8 md:border-r md:pr-8"
            >
              <span className="type-label inline-flex items-center gap-2 text-muted-foreground">
                <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform motion-safe:group-hover:-translate-x-1" strokeWidth={1.75} />
                Previous
              </span>
              <span className="type-subheading uppercase">{previous.title}</span>
            </Link>
          ) : (
            <div aria-hidden="true" className="hidden md:block md:border-r" />
          )}
          {next ? (
            <Link
              href={getProjectHref(next.slug)}
              className={cn(
                "group flex flex-col items-end gap-3 py-8 text-right md:pl-8",
                previous && "border-t md:border-t-0",
              )}
            >
              <span className="type-label inline-flex items-center gap-2 text-muted-foreground">
                Next
                <ArrowRight aria-hidden="true" className="size-3.5 transition-transform motion-safe:group-hover:translate-x-1" strokeWidth={1.75} />
              </span>
              <span className="type-subheading uppercase">{next.title}</span>
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
      <CaseStudyChapters project={project} />
      <ProjectPager project={project} />
    </article>
  );
}
