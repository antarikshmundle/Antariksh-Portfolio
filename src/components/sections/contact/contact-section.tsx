import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ActionArrow } from "@/components/ui/action-arrow";
import { Divider } from "@/components/ui/divider";
import { TechLabel } from "@/components/ui/tech-label";
import { routes } from "@/data/site";
import { socials } from "@/data/socials";
import { Moonrise } from "./moonrise";

/** Single source for the address: the Email entry in socials.ts. */
const emailLink = socials.find((link) => link.id === "email");

function SecondaryAction({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-6 border-t border-border/20 py-5 outline-offset-4"
    >
      <span className="type-subheading transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1.5">
        {children}
      </span>
      <ActionArrow direction="right" />
    </Link>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pb-16 md:pb-20">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_top,black_10%,transparent)]" />
      <Container className="relative">
        <Divider
          weight="strong"
          label={
            <span className="inline-flex items-center gap-3">
              <TechLabel index="07" className="text-accent">
                Contact
              </TechLabel>
              <span lang="ja" aria-hidden="true" className="text-xs tracking-[0.35em] text-muted-foreground">
                連絡
              </span>
            </span>
          }
          meta={<TechLabel tone="muted">Projects · Collaboration · Internships</TechLabel>}
        />

        <div className="relative">
          {/* Only where the heading leaves the right-hand space free */}
          <Moonrise className="absolute top-6 right-0 hidden w-[clamp(15rem,22vw,21rem)] xl:block" />
          <Reveal className="relative mt-12 md:mt-16">
            <h2 id="contact-title" className="type-display max-w-[14ch] text-balance lg:text-[clamp(4rem,7.4vw,7.75rem)]">
              Let&apos;s build something <em className="text-accent">useful.</em>
            </h2>
          </Reveal>
        </div>

        <Grid className="mt-12 gap-y-12 md:mt-16 lg:items-end">
          <Reveal className="md:col-span-6 lg:col-span-7">
            <p className="type-body-lg max-w-md text-muted-foreground">
              Have a project, collaboration, internship opportunity or an interesting problem to
              discuss? Write to me directly.
            </p>
            {emailLink?.href && (
              <a
                href={emailLink.href}
                className="group mt-8 inline-flex max-w-full items-center gap-4 border-b border-border/40 pb-3 transition-colors duration-300 hover:border-accent"
              >
                <span className="font-display text-[clamp(1.25rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] break-all transition-colors duration-300 group-hover:text-accent">
                  {emailLink.display ?? "Email me"}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 shrink-0 text-accent transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 md:size-8"
                  strokeWidth={1.5}
                />
              </a>
            )}
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-6 lg:col-span-4 lg:col-start-9">
            <ul className="border-b border-border/20">
              <li>
                <SecondaryAction href={routes.work}>View my work</SecondaryAction>
              </li>
              <li>
                <SecondaryAction href={routes.about}>About me</SecondaryAction>
              </li>
            </ul>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
