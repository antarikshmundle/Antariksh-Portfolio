import { ActionArrow } from "@/components/ui/action-arrow";
import { TechLabel } from "@/components/ui/tech-label";
import type { SocialLink as SocialLinkData } from "@/data/socials";
import { cn } from "@/lib/cn";

type SocialLinkProps = {
  link: SocialLinkData;
  number: string;
};

function RowContent({ link, number, pending }: SocialLinkProps & { pending?: boolean }) {
  return (
    <>
      <TechLabel tone="muted" aria-hidden="true" className="self-start pt-3 md:pt-4">
        {number}
      </TechLabel>
      <span
        className={cn(
          "flex min-w-0 flex-col gap-2 transition-transform duration-300 ease-out",
          !pending && "motion-safe:group-hover:translate-x-2 motion-safe:group-focus-visible:translate-x-2",
        )}
      >
        <span className="type-section uppercase">{link.label}</span>
        <span className="type-body text-muted-foreground">{link.description}</span>
        {link.display && <span className="font-mono text-xs break-all text-muted-foreground">{link.display}</span>}
        {pending && <TechLabel tone="boxed" className="mt-1 self-start">Link to be added</TechLabel>}
      </span>
    </>
  );
}

/** One row of the Elsewhere list: a full-width link, or a pending entry. */
export function SocialLink({ link, number }: SocialLinkProps) {
  const rowStyles =
    "grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-x-4 border-t-2 py-6 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-x-6 md:py-8";

  if (!link.href) {
    return (
      <div className={rowStyles}>
        <RowContent link={link} number={number} pending />
      </div>
    );
  }

  const external = link.external === true;

  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        rowStyles,
        "group relative outline-offset-4",
        // Accent rule draws across the top edge on hover / keyboard focus.
        "before:absolute before:inset-x-0 before:-top-0.5 before:h-0.5 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-300 hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
      )}
    >
      <RowContent link={link} number={number} />
      <ActionArrow direction={external ? "up-right" : "right"} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
