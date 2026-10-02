import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ActionArrowProps = {
  /** right: continue / navigate. up-right: open or external. */
  direction?: "right" | "up-right";
  className?: string;
};

/**
 * Square arrow indicator. Decorative — the enclosing link or button
 * provides the accessible name. Reacts to an ancestor `group` hover/focus.
 */
export function ActionArrow({ direction = "up-right", className }: ActionArrowProps) {
  const Icon = direction === "right" ? ArrowRight : ArrowUpRight;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center border border-border transition-colors duration-200 group-hover:bg-foreground group-hover:text-background group-focus-visible:bg-foreground group-focus-visible:text-background",
        className,
      )}
    >
      <Icon
        className={cn(
          "size-4 transition-transform duration-200 ease-out",
          direction === "right"
            ? "motion-safe:group-hover:translate-x-0.5"
            : "motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5",
        )}
        strokeWidth={1.75}
      />
    </span>
  );
}
