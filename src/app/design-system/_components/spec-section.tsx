import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { TechLabel } from "@/components/ui/tech-label";

type SpecSectionProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  children: ReactNode;
};

/** One numbered chapter of the design specification. */
export function SpecSection({ id, index, title, description, children }: SpecSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <Section bordered id={id} aria-labelledby={headingId} className="scroll-mt-4">
      <Container>
        <Grid className="gap-y-6">
          <div className="md:col-span-6 lg:col-span-2">
            <TechLabel tone="marked" index={index}>
              Spec
            </TechLabel>
          </div>
          <h2 id={headingId} className="type-section md:col-span-6 lg:col-span-6">
            {title}
          </h2>
          <p className="type-body max-w-prose text-muted-foreground md:col-span-5 lg:col-span-4 lg:pt-2">
            {description}
          </p>
          <div className="mt-6 md:col-span-6 md:mt-10 lg:col-span-10 lg:col-start-3">
            {children}
          </div>
        </Grid>
      </Container>
    </Section>
  );
}

type SpecNoteProps = {
  children: ReactNode;
};

/** Small caption under a specimen, e.g. the utility class it demonstrates. */
export function SpecNote({ children }: SpecNoteProps) {
  return <p className="type-label mt-4 text-muted-foreground normal-case">{children}</p>;
}
