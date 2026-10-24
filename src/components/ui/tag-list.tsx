import { cn } from "@/lib/cn";

type TagListProps = {
  items: readonly string[];
  /** Accessible name for the list, e.g. "Technologies". */
  label: string;
  className?: string;
};

/**
 * Inline run of tags separated by thin slashes — a quieter alternative to
 * boxed pills for tags, stacks and coursework.
 */
export function TagList({ items, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap items-center gap-y-1.5 type-label text-muted-foreground", className)}>
      {items.map((item, i) => (
        <li key={item} className="inline-flex items-center">
          {i > 0 && (
            <span aria-hidden className="mx-2.5 text-border/50">
              /
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
