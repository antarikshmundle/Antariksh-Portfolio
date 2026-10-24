import type { ReactNode } from "react";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { TechLabel } from "@/components/ui/tech-label";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Heading id, referenced by the section's aria-labelledby. */
  id: string;
  index: string;
  label: string;
  /** Decorative Japanese label shown beside the section label (hidden from assistive tech). */
  kanji?: string;
  /** Trailing detail on the rule, e.g. a count. */
  meta?: ReactNode;
  /** Sentence-case title; wrap one phrase in <em> for the serif accent. */
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

/**
 * The one opening every homepage section shares: an indexed rule, then a
 * heading with an offset introduction. Keeps hierarchy identical across the page.
 */
export function SectionHeading({ id, index, label, kanji, meta, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Divider
        weight="strong"
        label={
          <span className="inline-flex items-center gap-3">
            <TechLabel index={index} className="text-accent">
              {label}
            </TechLabel>
            {kanji && (
              <span lang="ja" aria-hidden="true" className="text-xs tracking-[0.35em] text-muted-foreground">
                {kanji}
              </span>
            )}
          </span>
        }
        meta={meta ? <TechLabel tone="muted">{meta}</TechLabel> : undefined}
      />
      <Grid className="mt-10 gap-y-6 md:mt-14 lg:items-end">
        <Reveal className={cn("md:col-span-6", intro ? "lg:col-span-7" : "lg:col-span-10")}>
          <h2 id={id} className="type-display max-w-[16ch] text-balance">
            {title}
          </h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.08} className="md:col-span-5 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="type-body-lg max-w-sm text-muted-foreground">{intro}</p>
          </Reveal>
        )}
      </Grid>
    </div>
  );
}
