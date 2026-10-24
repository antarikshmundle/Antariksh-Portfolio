import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/sections/case-study/case-study";
import { getProject, getProjectHref, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

/** Only slugs present in projects.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  // The root layout's title template appends " — Antariksh Mundle".
  // Metadata merges shallowly: defining openGraph/twitter here would drop the
  // root's file-based cards, so they are referenced explicitly.
  const card = { width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.role}` };
  const shareTitle = `${project.title} — ${siteConfig.name}`;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title: shareTitle,
      description: project.summary,
      url: getProjectHref(project.slug),
      images: [{ url: "/opengraph-image", type: "image/png", ...card }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: project.summary,
      images: [{ url: "/twitter-image", ...card }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="content" className="flex-1">
      <CaseStudy project={project} />
    </main>
  );
}
