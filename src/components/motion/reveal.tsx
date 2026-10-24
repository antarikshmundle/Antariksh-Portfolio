"use client";

import { inView, useReducedMotionConfig } from "framer-motion";
import { useLayoutEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before revealing — use small steps (0.06–0.1) to stagger. */
  delay?: number;
  className?: string;
};

const DURATION_MS = 400;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * True once the server-rendered page has hydrated. Reveals mounted after that
 * (client navigation, re-mounts) are new content and may animate from hidden.
 */
let pageHydrated = false;

/** Drops every inline style Reveal set, leaving the element in its natural, visible state. */
function settle(element: HTMLElement) {
  element.style.removeProperty("opacity");
  element.style.removeProperty("transform");
  element.style.removeProperty("transition");
}

/**
 * Fades and lifts content into place once, when it scrolls into view.
 *
 * Progressive enhancement: the server renders content fully visible, and it is
 * only hidden on the client, right before it can be animated back in. If client
 * JavaScript never runs, nothing stays invisible.
 *
 * The motion is a plain CSS transition, with a failsafe that clears the inline
 * styles once it should have finished. (A script-driven opacity animation was
 * seen to stall in WebKit, leaving content at opacity 0.)
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionConfig();

  useLayoutEffect(() => {
    const element = ref.current;
    const fromServer = !pageHydrated;
    if (fromServer) requestAnimationFrame(() => (pageHydrated = true));
    // Reduced motion: content is shown immediately and never hidden.
    if (!element || reduceMotion) return;

    // Server-rendered content the reader can already see is left as it is.
    if (fromServer && element.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    element.style.opacity = "0";
    element.style.transform = "translateY(16px)";

    let failsafe: number | undefined;
    const stop = inView(
      element,
      () => {
        element.style.transition = `opacity ${DURATION_MS}ms ${EASE} ${delay}s, transform ${DURATION_MS}ms ${EASE} ${delay}s`;
        // Next frame, so the hidden state is committed before the transition runs.
        requestAnimationFrame(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        });
        failsafe = window.setTimeout(() => settle(element), DURATION_MS + delay * 1000 + 250);
      },
      { margin: "0px 0px -10% 0px" },
    );

    return () => {
      stop();
      window.clearTimeout(failsafe);
      settle(element);
    };
  }, [delay, reduceMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
