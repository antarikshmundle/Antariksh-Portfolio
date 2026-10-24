import { cn } from "@/lib/cn";

export type StatusTone = "active" | "idle" | "offline";

const dotStyles: Record<StatusTone, string> = {
  active: "bg-accent ring-4 ring-accent/20",
  idle: "bg-muted-foreground",
  offline: "border border-muted-foreground",
};

type StatusProps = {
  tone?: StatusTone;
  children: string;
  className?: string;
};

/** Small state indicator. The text carries the meaning; the dot reinforces it. */
export function Status({ tone = "active", children, className }: StatusProps) {
  return (
    <span className={cn("type-label inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className={cn("size-2 rounded-full", dotStyles[tone])} />
      {children}
    </span>
  );
}
