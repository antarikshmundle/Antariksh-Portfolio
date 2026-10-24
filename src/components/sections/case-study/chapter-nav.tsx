"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type ChapterNavProps = {
  chapters: { id: string; title: string }[];
};

/**
 * Sticky contents list for a case study. Plain anchor links that work
 * without JS; once hydrated, the chapter in the reading band is marked.
 */
export function ChapterNav({ chapters }: ChapterNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Case study chapters">
      <p className="type-label text-muted-foreground">Contents</p>
      <ol className="mt-5 border-l border-border/20">
        {chapters.map(({ id, title }, i) => {
          const current = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "-ml-px flex items-baseline gap-3 border-l py-2 pl-4 transition-colors duration-200",
                  current
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("type-label", current && "text-accent")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="type-meta">{title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
