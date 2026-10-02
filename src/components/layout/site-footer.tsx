import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { TechLabel } from "@/components/ui/tech-label";
import { navigation, siteConfig } from "@/data/site";
import { socials } from "@/data/socials";

const linkStyles =
  "type-meta decoration-accent decoration-2 underline-offset-4 hover:underline";

/** Global footer — the final page boundary. Server-rendered, no JS needed. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <Container>
        <div className="grid gap-x-gutter gap-y-12 border-t-2 pt-12 pb-10 md:grid-cols-6 md:pt-16 lg:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-6">
            <p className="type-section uppercase">{siteConfig.name}</p>
            <p className="type-body mt-4 text-muted-foreground">
              {siteConfig.role}
              <br />
              {siteConfig.location}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 lg:col-span-2 lg:col-start-8">
            <TechLabel tone="muted">Index</TechLabel>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4 lg:col-span-3">
            <TechLabel tone="muted">Elsewhere</TechLabel>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((link) =>
                link.href ? (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`${linkStyles} inline-flex items-center gap-1.5`}
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {link.label}
                      {link.display && <span className="text-muted-foreground">— {link.display}</span>}
                      {link.external && (
                        <>
                          <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                          <span className="sr-only">(opens in a new tab)</span>
                        </>
                      )}
                    </a>
                  </li>
                ) : (
                  <li key={link.id} className="type-meta flex items-baseline gap-2 text-muted-foreground">
                    {link.label}
                    <span className="type-label">To be added</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border/20 py-6">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <TechLabel tone="muted">
              © {year} {siteConfig.name}
            </TechLabel>
            <TechLabel tone="muted">Built with Next.js / TypeScript / Tailwind CSS</TechLabel>
          </div>
          {/* "#top" with no matching id scrolls to the document top (HTML spec) — no JS needed. */}
          <a href="#top" className="type-label group inline-flex items-center gap-2">
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
