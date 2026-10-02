import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "minimal";

const baseStyles =
  "group inline-flex select-none items-center justify-center gap-3 whitespace-nowrap font-mono text-xs font-medium tracking-[0.08em] uppercase transition-[background-color,color,box-shadow,translate] duration-200 ease-out disabled:pointer-events-none disabled:opacity-40";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "h-12 rounded-sharp bg-foreground px-6 text-background hover:shadow-[3px_3px_0_0_var(--color-accent)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 active:shadow-none motion-safe:active:translate-x-0 motion-safe:active:translate-y-0",
  secondary:
    "h-12 rounded-sharp border border-border bg-transparent px-6 text-foreground hover:bg-surface active:bg-foreground/10",
  minimal:
    "h-auto px-0 py-1 text-foreground decoration-accent decoration-2 underline-offset-[6px] hover:underline",
};

/** Class list for a button variant — reuse it to style links as buttons. */
export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(baseStyles, variantStyles[variant], className);
}

function ButtonIcon({ icon }: { icon: ReactNode }) {
  return (
    <span
      aria-hidden
      className="inline-flex transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
    >
      {icon}
    </span>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  /** Trailing icon; nudges forward on hover. Rendered decoratively. */
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  icon,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles(variant, className)} {...props}>
      {children}
      {icon && <ButtonIcon icon={icon} />}
    </button>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

/** Internal navigation styled as a button. */
export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles(variant, className)} {...props}>
      {children}
      {icon && <ButtonIcon icon={icon} />}
    </Link>
  );
}
