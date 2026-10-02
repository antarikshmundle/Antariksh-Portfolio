import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const corners = [
  "-top-px -left-px border-t-2 border-l-2",
  "-top-px -right-px border-t-2 border-r-2",
  "-bottom-px -left-px border-b-2 border-l-2",
  "-bottom-px -right-px border-b-2 border-r-2",
];

type FrameProps = ComponentPropsWithoutRef<"div"> & {
  /** Caption set into the top edge, e.g. a TechLabel. */
  caption?: ReactNode;
};

/** Technical frame: hairline box with registration-mark corners. */
export function Frame({ caption, className, children, ...props }: FrameProps) {
  return (
    <div
      className={cn("relative border border-border/25 p-6 md:p-8", className)}
      {...props}
    >
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={cn("absolute size-3 border-border", position)}
        />
      ))}
      {caption && (
        <div className="absolute -top-2 left-5 bg-background px-2 leading-none">
          {caption}
        </div>
      )}
      {children}
    </div>
  );
}
