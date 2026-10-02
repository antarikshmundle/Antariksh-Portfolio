/**
 * Documented recognition only — as listed in Antariksh's resume. No dates,
 * placings beyond "Winner", counts or prizes. Add an entry here and the
 * Recognition section renders it; the type decides its treatment.
 */

export type AchievementType = "win" | "badge" | "participation";

export type Achievement = {
  number: string;
  type: AchievementType;
  title: string;
  description?: string;
  organization?: string;
};

export const achievements: Achievement[] = [
  {
    number: "01",
    type: "win",
    title: "Ashwamedh Ideathon",
    description: "Winner.",
  },
  {
    number: "02",
    type: "win",
    title: "Rocketry Competition",
    description: "Winner.",
  },
  {
    number: "03",
    type: "badge",
    title: "Google Cloud Arcade",
    description: "Arcade Legend Badge.",
  },
  {
    number: "04",
    type: "participation",
    title: "Technical project competitions",
    description: "Alongside technology-focused college initiatives.",
  },
];
