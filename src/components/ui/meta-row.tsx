import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MetaItem = {
  label: string;
  value: ReactNode;
};

type MetaRowProps = {
  items: MetaItem[];
  /** inline: wrapping key/value row. stacked: ruled spec-sheet list. */
  layout?: "inline" | "stacked";
  className?: string;
};

export function MetaRow({ items, layout = "inline", className }: MetaRowProps) {
  if (layout === "stacked") {
    return (
      <dl className={cn("border-t border-current/15", className)}>
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-6 border-b border-current/15 py-3"
          >
            <dt className="type-label opacity-70">{label}</dt>
            <dd className="type-meta text-right">{value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={cn("flex flex-wrap gap-x-8 gap-y-4", className)}>
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1.5">
          <dt className="type-label text-muted-foreground">{label}</dt>
          <dd className="type-meta">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
