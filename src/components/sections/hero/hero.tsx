import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, CalendarDays, MapPin, Target, Trophy, type LucideIcon } from "lucide-react";
import portrait from "@/assets/portrait/antariksh-mundle.png";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { TechLabel } from "@/components/ui/tech-label";
import { achievements } from "@/data/achievements";
import { getProject } from "@/data/projects";
import { profile, routes, siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import { NightScene } from "./night-scene";
import { RedMoon } from "./red-moon";

type ProofPoint = { icon: LucideIcon; value: string; label: string };

/**
 * Proof points, each read from the data files so the hero can never claim
 * more than the case studies and records document.
 */
function proofPoints(): ProofPoint[] {
  const crop = getProject("crop-ai-analyzer")?.results?.[0];
  const campus = getProject("pce-campus-navigator")?.results?.[0];
  const win = achievements.find((a) => a.type === "win");

  return [
    crop && { icon: Target, value: crop.value, label: "Test accuracy · plant-disease model" },
    campus && { icon: MapPin, value: campus.value, label: "Campus places mapped" },
    win && { icon: Trophy, value: "Winner", label: win.title },
    { icon: CalendarDays, value: profile.graduation, label: "B.Tech AI & DS · expected" },
  ].filter((point): point is ProofPoint => Boolean(point));
}

const delay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties;
const city = profile.location.split(",")[0];
const [givenName, familyName] = siteConfig.name.split(" ");

export function Hero() {
  const points = proofPoints();

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <NightScene />
      {/* Keeps the copy readable: from the top on narrow screens, from the left on wide ones */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,0.62)_0%,rgba(5,6,7,0.3)_38%,rgba(5,6,7,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,6,7,0.88)_0%,rgba(5,6,7,0.66)_36%,rgba(5,6,7,0.18)_58%,transparent_72%)]"
      />
      {/* Light vignette: holds the eye inside the frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(130%_100%_at_60%_40%,transparent_55%,rgba(0,0,0,0.42)_100%)]"
      />

      <Container className="relative grid min-h-[calc(100svh-var(--header-height))] grid-cols-1 gap-x-gutter lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto]">
        {/* 1–4: name, headline, description, calls to action */}
        <div className="@container z-10 pt-10 md:pt-14 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-center lg:pt-2">
          <p className="enter flex flex-wrap items-center gap-x-3 gap-y-2" style={delay(0)}>
            <TechLabel tone="marked" className="text-foreground">
              {profile.discipline}
            </TechLabel>
            <span aria-hidden="true" className="hidden text-foreground/40 sm:inline">
              ·
            </span>
            <TechLabel tone="muted" className="text-foreground/75">
              {profile.college}, {city}
            </TechLabel>
          </p>

          {/* The name and headline render immediately — no entrance animation on the main heading. */}
          <h1 id="hero-title" className="mt-5 md:mt-6 lg:mt-4">
            <span className="block font-display text-[21cqi] leading-[0.86] font-bold tracking-[-0.045em] [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]">
              <span className="block">{givenName}</span>{" "}
              <span className="flex items-center gap-[0.12em]">
                <span className="text-accent">{familyName}</span>
                {/* Decorative signature from the design: 創造 ("creation"). Drawn as CSS content so it
                    stays out of the heading's text — the h1 reads as the name and headline only. */}
                <span aria-hidden="true" className="hidden items-center gap-3 text-foreground/70 xl:flex">
                  <span className="h-px w-[0.5em] bg-foreground/45" />
                  <span lang="ja" className="font-serif text-[0.3em] leading-none font-normal whitespace-nowrap before:content-['創造']" />
                  <span className="type-label flex flex-col gap-1 text-[0.0625em] leading-tight font-medium text-foreground/60">
                    <span className="before:content-['Build']" />
                    <span className="before:content-['Solve']" />
                    <span className="before:content-['Impact']" />
                  </span>
                </span>
              </span>
            </span>
            <span className="sr-only"> — </span>
            <span className="mt-4 block max-w-[20ch] font-display text-[clamp(1.7rem,6.2cqi,3.25rem)] leading-[1.08] font-medium tracking-[-0.025em] md:mt-5 lg:mt-3">
              I turn models and data into <em className="text-accent">working software.</em>
            </span>
          </h1>

          <p className="enter type-body-lg mt-5 max-w-[36rem] text-foreground/78 lg:mt-4 lg:text-[1.0625rem]" style={delay(0.04)}>
            An {profile.discipline} engineering student at {profile.college}, {city} — building across
            machine learning, data, full-stack development and IoT.
          </p>

          <div className="enter mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-6" style={delay(0.08)}>
            <ButtonLink href={routes.work} icon={<ArrowRight className="size-4" strokeWidth={1.75} />}>
              Explore my work
            </ButtonLink>
            <ButtonLink
              href={routes.about}
              variant="secondary"
              className="bg-background/40"
              icon={<ArrowRight className="size-4" strokeWidth={1.75} />}
            >
              About me
            </ButtonLink>
          </div>
        </div>

        {/* Portrait, with the moon behind and a red rim light */}
        {/* No entrance animation: the portrait is the hero's main image and renders immediately. */}
        <div className="relative mt-6 h-[min(92vw,22rem)] md:mt-10 md:h-[42rem] lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:h-auto">
          <RedMoon className="absolute top-0 left-[6%] w-[62%] md:top-[2%] md:left-[-4%] md:w-[80%] lg:top-[9%] lg:left-[-8%] lg:w-[84%]" />
          {/* At xl+ the figure is drawn at 94% so the head clears the name's cap height and sits on the moon */}
          <div className="absolute inset-0 xl:inset-x-[3%] xl:top-[6%]">
            <Image
              src={portrait}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              className="object-contain object-bottom [filter:drop-shadow(-5px_-3px_9px_rgba(242,80,63,0.3))]"
            />
          </div>
          {/* The portrait settles into the night rather than turning see-through. Below lg the fade
              also softens at the sides and runs out across the gap, so it never reads as a dark box. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-6 h-[calc(24%+1.5rem)] bg-[linear-gradient(180deg,transparent_0%,rgba(10,11,13,0.55)_35%,rgba(12,13,14,0.92)_68%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)] lg:bottom-0 lg:h-[24%] lg:bg-[linear-gradient(180deg,transparent_0%,rgba(10,11,13,0.55)_45%,rgba(12,13,14,0.92)_80%,var(--color-background)_100%)] lg:[mask-image:none]"
          />
        </div>

        {/* Verified figures */}
        <dl className="enter z-10 mt-6 grid grid-cols-2 gap-y-5 border-t border-foreground/15 pt-5 sm:grid-cols-4 md:mt-8 md:gap-y-6 md:pt-6 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mt-5 lg:grid-cols-2 lg:gap-y-3 lg:border-t-0 lg:pt-0 xl:grid-cols-4" style={delay(0.12)}>
          {points.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              // Two columns on phones and at lg (narrow copy column), four on sm/md and xl+.
              className={cn(
                "flex items-start gap-3 border-foreground/15 pr-3",
                i % 2 === 1 && "border-l pl-4",
                i === 2 && "sm:border-l sm:pl-4 lg:border-l-0 lg:pl-0 xl:border-l xl:pl-4",
              )}
            >
              <Icon aria-hidden="true" className="mt-1 size-6 shrink-0 text-accent" strokeWidth={1.5} />
              <div className="flex flex-col gap-1.5">
                <dt className="type-label order-2 leading-snug tracking-[0.08em] text-foreground/78">{label}</dt>
                <dd className="order-1 font-display text-2xl leading-none font-medium tracking-[-0.03em] md:text-3xl">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* Scroll cue and location. Explicit placement: it shares row 3 with the portrait's faded base. */}
        <div className="z-10 flex items-center justify-between gap-4 py-5 sm:gap-6 lg:col-span-12 lg:col-start-1 lg:row-start-3 lg:py-1.5">
          <a href="#about" className="group inline-flex items-center gap-3 whitespace-nowrap text-foreground/75 hover:text-foreground sm:gap-4">
            <span className="flex size-10 shrink-0 items-center sm:size-11 justify-center rounded-full border border-foreground/30 transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
              <ArrowDown
                aria-hidden="true"
                className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-y-0.5"
                strokeWidth={1.75}
              />
            </span>
            <span className="type-label">Scroll to explore</span>
            <span aria-hidden="true" className="hidden h-px w-16 bg-foreground/30 sm:block" />
          </a>
          <p className="type-label inline-flex items-center gap-2.5 whitespace-nowrap text-foreground/75">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {profile.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
