import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { TechLabel } from "@/components/ui/tech-label";
import { socials } from "@/data/socials";
import { SocialLink } from "./social-link";

/**
 * Elsewhere: every profile in socials.ts as a compact grid. Email is left
 * out here because the Contact section above leads with it.
 */
export function ConnectSection() {
  const links = socials.filter((link) => link.id !== "email");

  return (
    <Section id="connect" aria-labelledby="connect-title" className="pt-0 md:pt-0">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-border/25 pt-8">
          <h2 id="connect-title" className="type-subheading">
            Elsewhere
          </h2>
          <TechLabel tone="muted">{String(links.length).padStart(2, "0")} profiles</TechLabel>
        </div>

        <ul className="mt-8 grid gap-px border border-border/15 bg-border/15 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => (
            <li key={link.id} className="bg-background">
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <SocialLink link={link} number={String(i + 1).padStart(2, "0")} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
