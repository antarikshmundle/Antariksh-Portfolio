import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type DividerWeight = "hairline" | "default" | "strong";

const weightStyles: Record<DividerWeight, string> = {
  hairline: "h-px bg-border/20",
  default: "h-px bg-border",
  strong: "h-0.5 bg-border",
};

type DividerProps = {
  weight?: DividerWeight;
  /** Leading content (e.g. a TechLabel) turns the rule into a section divider. */
  label?: ReactNode;
  /** Trailing content, aligned to the end of the rule. */
  meta?: ReactNode;
  className?: string;
};

export function Divider({ weight = "default", label, meta, className }: DividerProps) {
  if (!label && !meta) {
    return <hr className={cn("border-0", weightStyles[weight], className)} />;
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {label}
      <span aria-hidden className={cn("flex-1", weightStyles[weight])} />
      {meta}
    </div>
  );
}
