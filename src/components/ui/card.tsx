import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "surface" | "outline" | "inverse";

const variantStyles: Record<CardVariant, string> = {
  surface: "bg-surface",
  outline: "border border-border/25 bg-background",
  inverse: "bg-surface-raised text-foreground",
};

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: CardVariant;
  as?: "div" | "article";
  /** Set false when the card's children manage their own edge-to-edge padding. */
  padded?: boolean;
};

/** Flat content container — defined by border, spacing and surface contrast. */
export function Card({
  variant = "outline",
  as: Component = "div",
  padded = true,
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(padded && "p-6 md:p-8", variantStyles[variant], className)}
      {...props}
    />
  );
}
