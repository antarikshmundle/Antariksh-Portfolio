import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { TechLabel } from "@/components/ui/tech-label";
import { routes } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main id="content" className="relative flex flex-1 items-center overflow-hidden">
      <div aria-hidden className="bg-grid grid-fade absolute inset-0" />
      <Container className="relative py-section">
        <TechLabel tone="marked" className="text-accent">
          Error 404
        </TechLabel>
        <h1 className="type-display mt-6 max-w-[14ch] text-balance">
          This page isn&apos;t <em>here.</em>
        </h1>
        <p className="type-body-lg mt-8 max-w-md text-muted-foreground">
          The link may be out of date, or the address mistyped. The work is still where it was.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={routes.work} icon={<ArrowRight className="size-4" strokeWidth={1.75} />}>
            View selected work
          </ButtonLink>
          <ButtonLink href={routes.home} variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
