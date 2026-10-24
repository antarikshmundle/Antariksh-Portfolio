import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TechLabel } from "@/components/ui/tech-label";
import type { SocialLink as SocialLinkData } from "@/data/socials";

type SocialLinkProps = {
  link: SocialLinkData;
  number: string;
};

const cellStyles = "flex h-full min-h-32 flex-col justify-between gap-6 p-5 md:p-6";

/** One cell of the Elsewhere grid: a link, or a clearly-marked pending entry. */
export function SocialLink({ link, number }: SocialLinkProps) {
  if (!link.href) {
    return (
      <div className={cellStyles}>
        <TechLabel tone="muted">{number}</TechLabel>
        <span className="flex flex-col gap-1">
          <span className="type-subheading text-muted-foreground">{link.label}</span>
          <TechLabel tone="muted">Link to be added</TechLabel>
        </span>
      </div>
    );
  }

  const external = link.external === true;
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group ${cellStyles} -outline-offset-2 transition-colors duration-300 hover:bg-surface-raised`}
    >
      <span className="flex items-center justify-between">
        <TechLabel tone="muted" aria-hidden="true" className="group-hover:text-accent">
          {number}
        </TechLabel>
        <Icon
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-[translate,color] duration-300 group-hover:text-accent motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className="type-subheading">{link.label}</span>
        <span className="type-meta text-muted-foreground">{link.description}</span>
        {link.display && <span className="font-mono text-xs break-all text-muted-foreground">{link.display}</span>}
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
