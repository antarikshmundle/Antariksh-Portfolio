import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ActionArrow } from "@/components/ui/action-arrow";
import { Divider } from "@/components/ui/divider";
import { MetaRow } from "@/components/ui/meta-row";
import { TechLabel } from "@/components/ui/tech-label";
import { routes } from "@/data/site";
import { socials } from "@/data/socials";
import { cn } from "@/lib/cn";

/** Single source for the address: the Email entry in socials.ts. */
const emailLink = socials.find((link) => link.id === "email");

const rowStyles = cn(
  "group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 outline-offset-4",
  // Accent rule draws across the top edge on hover / keyboard focus.
  "before:absolute before:inset-x-0 before:-top-0.5 before:h-0.5 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-300 hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
);

const shift =
  "flex min-w-0 flex-col transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-2 motion-safe:group-focus-visible:translate-x-2";

function SecondaryAction({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={cn(rowStyles, "border-t py-6")}>
      <span className={shift}>
        <span className="type-subheading uppercase">{children}</span>
      </span>
      <ActionArrow direction="right" />
    </Link>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" aria-labelledby="contact-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="09">Contact</TechLabel>}
          meta={<TechLabel tone="muted">Closing</TechLabel>}
        />

        <Grid className="mt-12 gap-y-14 md:mt-16 lg:items-end">
          <Reveal className="md:col-span-6 lg:col-span-7">
            <h2 id="contact-title" className="type-display text-balance uppercase">
              Let&apos;s build something useful<span className="text-accent">.</span>
            </h2>
            <p className="type-body-lg mt-8 max-w-md text-muted-foreground">
              Have a project, collaboration, internship opportunity or an interesting problem to
              discuss?
            </p>
            <MetaRow
              className="mt-10"
              items={[{ label: "Open to conversations about", value: "Projects / Collaboration / Opportunities" }]}
            />
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-6 lg:col-span-5">
            <ul className="border-b-2">
              {emailLink?.href && (
                <li>
                  <a href={emailLink.href} className={cn(rowStyles, "border-t-2 py-8 md:py-10")}>
                    <span className={cn(shift, "gap-3")}>
                      <TechLabel tone="marked" aria-hidden="true">
                        Primary
                      </TechLabel>
                      <span className="type-section uppercase">Email me</span>
                      {emailLink.display && (
                        <span className="font-mono text-xs break-all text-muted-foreground">
                          {emailLink.display}
                        </span>
                      )}
                    </span>
                    <ActionArrow direction="right" />
                  </a>
                </li>
              )}
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
