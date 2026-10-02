import { skillGroups, type PipelineStage } from "@/data/skills";
import { cn } from "@/lib/cn";

/**
 * Vertical system pipeline. Each skill group branches into the stage it
 * serves; workflow tools bracket the whole path. Built from skills.ts so
 * the diagram cannot drift from the content. Decorative only.
 */

const stages: { id: Exclude<PipelineStage, "all">; label: string }[] = [
  { id: "data", label: "Data" },
  { id: "model", label: "Model" },
  { id: "application", label: "Application" },
  { id: "device", label: "Device / User" },
];

export function StackPipeline() {
  const spanning = skillGroups.filter((group) => group.stage === "all");

  return (
    <div aria-hidden className="flex gap-4">
      <ol className="flex flex-1 flex-col">
        {stages.map((stage, i) => {
          const feeds = skillGroups.filter((group) => group.stage === stage.id);
          const last = i === stages.length - 1;
          return (
            <li key={stage.id} className="flex flex-col">
              <div className="flex items-center">
                <span className="type-label w-8 shrink-0 text-muted-foreground">
                  {feeds.map((group) => group.number).join(" ")}
                </span>
                <span className="h-px w-5 shrink-0 bg-border/40" />
                <span
                  className={cn(
                    "flex flex-1 items-center justify-between gap-3 border px-4 py-3",
                    last ? "border-foreground bg-foreground text-background" : "border-border bg-background",
                  )}
                >
                  <span className="font-display text-base font-medium tracking-[-0.01em] md:text-lg">
                    {stage.label}
                  </span>
                  <span className={cn("size-2", last ? "bg-accent" : "border border-current/50")} />
                </span>
              </div>
              {!last && (
                <span className="ml-[3.25rem] flex h-7 justify-center">
                  <span className="w-px bg-accent" />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {spanning.length > 0 && (
        <div className="flex w-8 shrink-0 flex-col items-center">
          <span className="type-label text-muted-foreground">
            {spanning.map((group) => group.number).join(" ")}
          </span>
          <span className="mt-2 w-2.5 flex-1 border-y border-r border-border/60" />
        </div>
      )}
    </div>
  );
}
