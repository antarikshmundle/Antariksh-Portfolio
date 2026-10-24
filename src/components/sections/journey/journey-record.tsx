import { Reveal } from "@/components/motion/reveal";
import { TagList } from "@/components/ui/tag-list";
import { TechLabel } from "@/components/ui/tech-label";
import { coursework, journeyRecord } from "@/data/journey";

/** Compact factual record: everything the timeline summarises, itemised. */
export function JourneyRecord() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 id="journey-record" className="type-subheading">
          The record
        </h3>
        <TechLabel tone="muted">At a glance</TechLabel>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-gutter lg:grid-cols-3">
        {journeyRecord.map((group, i) => (
          <Reveal key={group.label} delay={(i % 3) * 0.06} className="border-t border-border/40 pt-5">
            <h4>
              <TechLabel index={String(i + 1).padStart(2, "0")}>{group.label}</TechLabel>
            </h4>
            <ul className="mt-4">
              {group.entries.map((entry) => (
                <li
                  key={`${entry.title}-${entry.detail ?? ""}`}
                  className="flex flex-col gap-0.5 border-b border-border/15 py-3 last:border-b-0"
                >
                  <span className="type-meta font-medium text-foreground">{entry.title}</span>
                  {entry.detail && <span className="type-meta text-muted-foreground">{entry.detail}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 border-t border-border/40 pt-5">
        <h4>
          <TechLabel index={String(journeyRecord.length + 1).padStart(2, "0")}>Relevant coursework</TechLabel>
        </h4>
        <TagList className="mt-4" label="Relevant coursework" items={coursework} />
      </Reveal>
    </div>
  );
}
