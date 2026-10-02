import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Draws the strong top rule that separates major page sections. */
  bordered?: boolean;
};

/** Vertical section rhythm, driven by the --section-space token. */
export function Section({ bordered = false, className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-section", bordered && "border-t-2", className)}
      {...props}
    />
  );
}
