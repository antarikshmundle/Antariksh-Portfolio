import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { MetaRow } from "@/components/ui/meta-row";
import { TechLabel, type TechLabelTone } from "@/components/ui/tech-label";
import { achievements, type Achievement, type AchievementType } from "@/data/achievements";
import { cn } from "@/lib/cn";

/**
 * How each kind of recognition is presented. The type is always spelled
 * out in text; weight and rules reinforce it — colour never carries it alone.
 */
const treatments: Record<
  AchievementType,
  { label: string; plural: string; tone: TechLabelTone; rule: string; title: string }
> = {
  win: { label: "Win", plural: "Wins", tone: "inverse", rule: "border-t-2", title: "type-section" },
  badge: { label: "Badge", plural: "Badges", tone: "boxed", rule: "border-t", title: "type-section" },
  participation: {
    label: "Participation",
    plural: "Participation",
    tone: "muted",
    rule: "border-t border-border/30",
    title: "type-subheading",
  },
};

function AchievementRow({ achievement }: { achievement: Achievement }) {
  const t = treatments[achievement.type];
  const isWin = achievement.type === "win";

  return (
    <article
      className={cn(
        "grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 py-8 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-6 md:py-10",
        t.rule,
      )}
    >
      <TechLabel tone="muted" className="self-start pt-1.5">
        {achievement.number}
      </TechLabel>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          {isWin && <span aria-hidden="true" className="size-2 bg-accent" />}
          <TechLabel tone={t.tone}>{t.label}</TechLabel>
          {achievement.organization && <TechLabel tone="muted">{achievement.organization}</TechLabel>}
        </div>
        <h3 className={cn(t.title, "mt-5 text-balance")}>{achievement.title}</h3>
        {achievement.description && (
          <p className="type-body-lg mt-3 text-muted-foreground">{achievement.description}</p>
        )}
      </div>
    </article>
  );
}

export function RecognitionSection() {
  // Counts per type, derived from the data so the summary never drifts.
  const summary = (Object.keys(treatments) as AchievementType[])
    .map((type) => ({ type, count: achievements.filter((a) => a.type === type).length }))
    .filter(({ count }) => count > 0)
    .map(({ type, count }) => ({ label: treatments[type].plural, value: String(count).padStart(2, "0") }));

  return (
    <Section id="recognition" aria-labelledby="recognition-title" className="scroll-mt-4">
      <Container>
        <Divider
          weight="strong"
          label={<TechLabel index="07">Recognition</TechLabel>}
          meta={<TechLabel tone="muted">Documented</TechLabel>}
        />

        <Grid className="mt-12 gap-y-14 md:mt-16">
          <Reveal className="md:col-span-6 lg:col-span-5">
            <h2 id="recognition-title" className="type-display uppercase">
              Worth noting
            </h2>
            <p className="type-body-lg mt-6 max-w-sm text-muted-foreground">
              Documented wins, a Google Cloud badge and the competitions around them — in brief.
            </p>
            <MetaRow className="mt-10" items={summary} />
          </Reveal>

          <ol className="border-b border-border/30 md:col-span-6 lg:col-span-7">
            {achievements.map((achievement, i) => (
              <li key={achievement.number}>
                <Reveal delay={i * 0.06}>
                  <AchievementRow achievement={achievement} />
                </Reveal>
              </li>
            ))}
          </ol>
        </Grid>
      </Container>
    </Section>
  );
}
