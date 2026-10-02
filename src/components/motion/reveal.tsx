"use client";

import { inView, useAnimate, useReducedMotionConfig } from "framer-motion";
import { useLayoutEffect, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before revealing — use small steps (0.06–0.1) to stagger. */
  delay?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * True once the server-rendered page has hydrated. Reveals mounted after that
 * (client navigation, re-mounts) are new content and may animate from hidden.
 */
let pageHydrated = false;

/**
 * Fades and lifts content into place once, when it scrolls into view.
 *
 * Progressive enhancement: the server renders content fully visible, and it is
 * only hidden on the client, right before it can be animated back in. If client
 * JavaScript never runs, nothing stays invisible.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduceMotion = useReducedMotionConfig();

  useLayoutEffect(() => {
    const element = scope.current;
    const fromServer = !pageHydrated;
    if (fromServer) requestAnimationFrame(() => (pageHydrated = true));
    // Reduced motion: content is shown immediately and never hidden.
    if (!element || reduceMotion) return;

    // Server-rendered content the reader can already see is left as it is.
    if (fromServer && element.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    animate(element, { opacity: 0, y: 16 }, { duration: 0 });

    return inView(
      element,
      () => {
        animate(element, { opacity: 1, y: [16, 0] }, { duration: 0.4, ease, delay });
      },
      { margin: "0px 0px -10% 0px" },
    );
  }, [animate, delay, reduceMotion, scope]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
