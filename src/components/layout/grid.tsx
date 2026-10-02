import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type GridProps = ComponentPropsWithoutRef<"div">;

/**
 * Layout grid: 1 column on mobile, 6 on tablet, 12 on desktop.
 * Children place themselves with col-span / col-start utilities.
 */
export function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-gutter md:grid-cols-6 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}
