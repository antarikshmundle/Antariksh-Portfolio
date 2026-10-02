import { Reveal } from "@/components/motion/reveal";
import { TechLabel } from "@/components/ui/tech-label";
import { journeyHorizon, journeyItems } from "@/data/journey";
import { cn } from "@/lib/cn";

/*
 * Spine geometry: the list is padded left and every marker/segment is
 * positioned into that gutter. The spine is solid through the stages so
 * far and dashed from the current stage toward the horizon.
 */
const gutter = "pl-10 md:pl-14";
const markerX = "-left-10 md:-left-14";
/** Marker is 18px wide, so its centre sits 9px in from the marker offset. */
const spineX = "-left-[31px] md:-left-[47px]";

export function JourneyTimeline() {
  const currentIndex = journeyItems.findIndex((item) => item.current);

  return (
    <ol className={cn("relative", gutter)}>
      {journeyItems.map((item, i) => {
        const isCurrent = item.current === true;
        const ahead = currentIndex !== -1 && i >= currentIndex;

        return (
          <li key={item.number} className="relative pb-14 md:pb-16">
            {/* Spine segment down to the next stage */}
            <span
              aria-hidden
              className={cn(
                "absolute top-2 bottom-0 border-l",
                spineX,
                ahead ? "border-dashed border-border/50" : "border-border/40",
              )}
            />
            {/* Stage marker */}
            <span
              aria-hidden
              className={cn(
                "absolute top-0.5 flex size-[1.125rem] items-center justify-center border",
                markerX,
                isCurrent ? "border-accent bg-background" : "border-border bg-background",
              )}
            >
              <span className={cn("size-2", isCurrent ? "bg-accent" : "bg-foreground")} />
            </span>

            <Reveal delay={i * 0.06}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <TechLabel tone={isCurrent ? "plain" : "muted"}>{item.period}</TechLabel>
                {isCurrent && <TechLabel tone="inverse">Current</TechLabel>}
              </div>

              <div className="mt-5 flex items-baseline gap-5 md:gap-6">
                <span
                  className={cn(
                    "type-section shrink-0",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.number}
                </span>
                <h3 className="type-subheading uppercase">{item.title}</h3>
              </div>

              <p className="type-body mt-4 max-w-xl text-muted-foreground">{item.description}</p>

              {item.tags && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${item.title} tags`}>
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <TechLabel tone="boxed">{tag}</TechLabel>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        );
      })}

      {/* Horizon: where the timeline is heading */}
      <li className="relative">
        <span
          aria-hidden
          className={cn("absolute top-0.5 size-[1.125rem] border border-dashed border-border bg-background", markerX)}
        />
        <Reveal className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="type-section">{journeyHorizon.period}</span>
          <TechLabel tone="muted">{journeyHorizon.label}</TechLabel>
        </Reveal>
      </li>
    </ol>
  );
}
