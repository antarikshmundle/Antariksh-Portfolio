"use client";

import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ActionArrow } from "@/components/ui/action-arrow";
import { Button, buttonStyles } from "@/components/ui/button";
import { TechLabel } from "@/components/ui/tech-label";

const spring = { type: "spring", stiffness: 420, damping: 30 } as const;

const navLabels = [
  { index: "01", label: "About" },
  { index: "02", label: "Selected work" },
  { index: "03", label: "Experience" },
];

const revealItems = ["Read the problem", "Shape the system", "Ship the detail"];

function DemoPanel({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col border border-border">
      <div className="border-b border-border px-4 py-3">
        <TechLabel>{title}</TechLabel>
      </div>
      <div className="flex min-h-56 flex-1 items-center justify-center bg-grid p-6">
        {children}
      </div>
      <p className="type-meta border-t border-border/20 px-4 py-3 text-muted-foreground">{note}</p>
    </div>
  );
}

export function MotionDemos() {
  const [revealKey, setRevealKey] = useState(0);

  return (
    <div className="grid gap-gutter md:grid-cols-2">
      <DemoPanel
        title="M.01 — Press feedback"
        note="Spring lift on hover/focus, compresses on press. Transform only — no layout shift."
      >
        <motion.button
          type="button"
          className={buttonStyles("secondary", "bg-background")}
          whileHover={{ y: -2 }}
          whileFocus={{ y: -2 }}
          whileTap={{ y: 0, scale: 0.97 }}
          transition={spring}
        >
          Start a project
          <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
        </motion.button>
      </DemoPanel>

      <DemoPanel
        title="M.02 — Card hover"
        note="Card rises 4px and its arrow inverts. Same response for keyboard focus."
      >
        <motion.a
          href="#motion"
          className="group block w-full max-w-xs border border-border bg-background p-5 outline-offset-4"
          initial="rest"
          animate="rest"
          whileHover="active"
          whileFocus="active"
          variants={{
            rest: { y: 0, boxShadow: "0 0 0 0 var(--color-border)" },
            active: { y: -4, boxShadow: "4px 4px 0 0 var(--color-border)" },
          }}
          transition={spring}
        >
          <div className="flex items-start justify-between gap-4">
            <TechLabel tone="muted">Case study</TechLabel>
            <ActionArrow />
          </div>
          <p className="type-subheading mt-8">Crop AI Analyzer</p>
        </motion.a>
      </DemoPanel>

      <DemoPanel
        title="M.03 — Reveal"
        note="16px rise + fade, 80ms stagger, plays once in view. Reduced motion: fade only."
      >
        <div className="flex w-full max-w-xs flex-col gap-4">
          <ol key={revealKey} className="flex flex-col">
            {revealItems.map((item, i) => (
              <li key={item}>
                <Reveal delay={i * 0.08} className="flex items-baseline gap-4 border-b border-border/20 py-3">
                  <span className="type-label text-muted-foreground">0{i + 1}</span>
                  <span className="type-subheading">{item}</span>
                </Reveal>
              </li>
            ))}
          </ol>
          <Button
            variant="minimal"
            className="self-start"
            icon={<RotateCcw className="size-3.5" strokeWidth={1.75} />}
            onClick={() => setRevealKey((key) => key + 1)}
          >
            Replay
          </Button>
        </div>
      </DemoPanel>

      <DemoPanel
        title="M.04 — Label interaction"
        note="Index slides aside and an accent rule draws in. Works on hover and keyboard focus."
      >
        <nav aria-label="Label interaction example" className="w-full max-w-xs">
          <ul className="flex flex-col">
            {navLabels.map(({ index, label }) => (
              <li key={index}>
                <motion.a
                  href="#motion"
                  className="relative flex items-center gap-3 py-3 outline-offset-2"
                  initial="rest"
                  animate="rest"
                  whileHover="active"
                  whileFocus="active"
                >
                  <motion.span
                    className="type-label text-muted-foreground"
                    variants={{ rest: { x: 0 }, active: { x: 6 } }}
                    transition={spring}
                  >
                    {index}
                  </motion.span>
                  <span className="type-label">{label}</span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                    variants={{ rest: { scaleX: 0 }, active: { scaleX: 1 } }}
                  />
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </DemoPanel>
    </div>
  );
}
