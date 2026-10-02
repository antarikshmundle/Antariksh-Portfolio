import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type TechLabelTone = "plain" | "muted" | "boxed" | "inverse" | "marked";

const toneStyles: Record<TechLabelTone, string> = {
  plain: "",
  muted: "text-muted-foreground",
  boxed: "border border-current/80 px-2 py-1.5",
  inverse: "bg-foreground px-2 py-1.5 text-background",
  marked: "",
};

type TechLabelProps = ComponentPropsWithoutRef<"span"> & {
  tone?: TechLabelTone;
  /** Optional sequence number, rendered as "01 / LABEL". */
  index?: string;
};

/** Monospace uppercase label for section markers, metadata and tags. */
export function TechLabel({
  tone = "plain",
  index,
  className,
  children,
  ...props
}: TechLabelProps) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center gap-2",
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {tone === "marked" && <span aria-hidden className="size-1.5 bg-accent" />}
      {index && (
        <>
          <span>{index}</span>
          <span aria-hidden className="opacity-50">
            /
          </span>
        </>
      )}
      <span>{children}</span>
    </span>
  );
}
