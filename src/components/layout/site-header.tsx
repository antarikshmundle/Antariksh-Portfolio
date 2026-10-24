"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { navigation, routes, siteConfig } from "@/data/site";
import { socials } from "@/data/socials";
import { cn } from "@/lib/cn";

const emailHref = socials.find((link) => link.id === "email")?.href ?? routes.contact;
const desktopQuery = "(min-width: 64rem)";

/** "/#work" → "work"; plain routes have no section. */
const sectionOf = (href: string) => (href.startsWith("/#") ? href.slice(2) : null);

/**
 * Tracks which homepage section sits in the middle band of the viewport, so
 * the matching nav item can be marked. Only runs on the homepage.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const ids = navigation.map((item) => sectionOf(item.href)).filter((id): id is string => id !== null);
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          // Sections between nav targets (skills, focus, …) clear the marker.
          setActive((current) => (entry.isIntersecting ? id : current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

/**
 * While the full-screen mobile menu is open: the page behind it can't scroll
 * (overflow on <html>, with the scrollbar width compensated so nothing
 * shifts) and is made inert, so focus and assistive tech stay in the menu.
 * Cleanup restores the previous inline styles — on close, Escape,
 * navigation and unmount alike.
 */
function useMenuLock(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    const scrollbar = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;

    const background = [...document.querySelectorAll<HTMLElement>("#content, body > footer")].filter(
      (el) => !el.inert,
    );
    background.forEach((el) => (el.inert = true));

    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
      background.forEach((el) => (el.inert = false));
    };
  }, [open]);
}

/**
 * Global header. A solid sticky bar — no blur, no floating pill. Links are
 * server-rendered; JS adds the mobile menu and the current-section marker.
 */
export function SiteHeader() {
  const pathname = usePathname();
  // The menu remembers the path it was opened on, so any route change
  // (link, back/forward) closes it without an extra effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection(pathname === routes.home);

  useMenuLock(open);

  // Growing past the mobile breakpoint hides the menu, so close it too.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(desktopQuery);
    const onChange = () => desktop.matches && setOpenPath(null);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [open]);

  // Escape closes the menu and returns focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        // preventScroll: WebKit otherwise scrolls the sticky trigger "into view".
        buttonRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isCurrent = (href: string) => {
    const section = sectionOf(href);
    return section ? section === activeSection : pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/15 bg-background">
      <Container className="flex h-header items-center justify-between gap-6">
        <Link
          href={routes.home}
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            aria-hidden="true"
            className="type-label flex size-8 items-center justify-center rounded-full border border-accent/70 text-[0.625rem] text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-foreground"
          >
            AM
          </span>
          {/* Seven nav items leave no room for the name between 1024 and 1280px. */}
          <span className="flex flex-col gap-1 lg:hidden xl:flex">
            <span className="font-display text-[0.9375rem] leading-none font-medium tracking-[-0.01em]">
              {siteConfig.name}
            </span>
            <span className="type-label hidden text-[0.625rem] text-muted-foreground xl:block">
              {siteConfig.role}
            </span>
          </span>
        </Link>

        <div className="hidden items-center lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-6 xl:gap-9">
              {navigation.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? (sectionOf(item.href) ? "location" : "page") : undefined}
                      // Full header height: a larger target, and the underline sits on the header's edge.
                      className={cn(
                        "type-label relative flex h-header items-center text-xs tracking-[0.1em] transition-colors duration-200 hover:text-foreground",
                        current ? "text-foreground" : "text-foreground/70",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent transition-transform duration-300",
                          current ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="type-label inline-flex items-center gap-2 py-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
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
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain border-t border-border/15 bg-background lg:hidden"
      >
        <Container className="flex h-full flex-col justify-between pb-8">
          <ul className="py-4">
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-border/15">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-5 py-4"
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="type-label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl font-medium tracking-[-0.03em]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={emailHref}
            className="type-label inline-flex h-12 items-center justify-center gap-2 bg-accent text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            Get in touch
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </a>
        </Container>
      </nav>
    </header>
  );
}
