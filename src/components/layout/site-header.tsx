"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { TechLabel } from "@/components/ui/tech-label";
import { navigation, routes, siteConfig } from "@/data/site";

const linkStyles =
  "type-label decoration-accent decoration-2 underline-offset-[6px] hover:underline aria-[current=page]:underline";

/**
 * Global header. A plain sticky bar on the canvas colour — no blur, no
 * floating pill. Links are server-rendered; only the mobile menu needs JS.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isCurrent = (href: string) => (href.startsWith("/#") ? false : pathname === href);

  return (
    <header className="sticky top-0 z-40 border-b border-border/20 bg-background">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link href={routes.home} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <TechLabel tone="inverse" aria-hidden="true">
            AM
          </TechLabel>
          <span className="type-label">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkStyles}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="type-label inline-flex items-center gap-2 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
          {open ? (
            <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" className="size-4" strokeWidth={1.75} />
          )}
        </button>
      </Container>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b-2 bg-background md:hidden"
      >
        <Container>
          <ul className="py-2">
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-border/20 last:border-b-0">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-4"
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="type-label text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-subheading uppercase">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
