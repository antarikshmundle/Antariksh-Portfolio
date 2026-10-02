import { projects } from "./projects";
import { profile } from "./site";

/**
 * The journey so far. Stages use labels rather than years: only the expected
 * graduation date is verified, so nothing else claims calendar precision.
 * Roles, wins and certifications below are as supplied by Antariksh.
 */

export type JourneyItem = {
  number: string;
  period: string;
  title: string;
  description: string;
  tags?: string[];
  /** Marks the stage Antariksh is in now. */
  current?: boolean;
};

export const journeyItems: JourneyItem[] = [
  {
    number: "01",
    period: "Foundation",
    title: "AI & Data Science",
    description: `Starting a ${profile.degree} at ${profile.college}, ${profile.location.split(",")[0]} — the base in computing, data and problem solving. CGPA ${profile.cgpa}.`,
  },
  {
    number: "02",
    period: "Exploration",
    title: "Technical groundwork",
    description:
      "Learning by doing across Python, programming, web development and machine learning — including a Python Programming course certified through Udemy.",
    tags: ["Python", "Web", "AI / ML"],
  },
  {
    number: "03",
    period: "Community",
    title: "Leadership + communities",
    description:
      "Design Lead at GDG On Campus, Chief Head Secretary of Sophia Forum and Social Media Head of the Tuning Fork Club — with design and digital marketing work running alongside.",
    tags: ["Leadership", "Design"],
  },
  {
    number: "04",
    period: "Building",
    title: "Applied systems",
    description:
      "Moving from exercises to projects that combine models, software, data and hardware — from Crop AI Analyzer and PCE Campus Navigator to a Gym Management System and an IoT Environmental Monitoring System.",
    tags: ["AI", "Software", "IoT"],
  },
  {
    number: "05",
    period: "Competing",
    title: "Wins + recognition",
    description:
      "Winning the Ashwamedh Ideathon and a Rocketry Competition, and earning the Arcade Legend tier in Google Cloud Arcade.",
    tags: ["Ideathon", "Rocketry", "Cloud"],
  },
  {
    number: "06",
    period: "Now",
    title: "Current direction",
    description:
      "Going deeper into AI and data science while building a stronger software-engineering foundation for what comes after graduation.",
    current: true,
  },
];

/** Where the timeline is heading — the one verified date. */
export const journeyHorizon = {
  period: `${profile.graduation} →`,
  label: "Expected graduation",
};

export type RecordEntry = {
  title: string;
  detail?: string;
};

export type RecordGroup = {
  label: string;
  entries: RecordEntry[];
};

/** Compact factual record shown under the timeline. */
export const journeyRecord: RecordGroup[] = [
  {
    label: "Education",
    entries: [
      { title: "B.Tech AI & Data Science", detail: profile.college },
      { title: `Expected ${profile.graduation}`, detail: `CGPA ${profile.cgpa}` },
    ],
  },
  {
    label: "Projects",
    entries: projects.map(({ title, category }) => ({ title, detail: category })),
  },
  {
    label: "Leadership",
    entries: [
      { title: "GDG On Campus", detail: "Design Lead" },
      { title: "Sophia Forum", detail: "Chief Head Secretary" },
      { title: "Tuning Fork Club", detail: "Social Media Head" },
    ],
  },
  {
    label: "Achievements",
    entries: [
      { title: "Ashwamedh Ideathon", detail: "Winner" },
      { title: "Rocketry Competition", detail: "Winner" },
      { title: "Google Cloud Arcade", detail: "Arcade Legend" },
    ],
  },
  {
    label: "Certifications",
    entries: [
      { title: "Python Programming", detail: "Udemy" },
      { title: "Google Cloud Arcade", detail: "Arcade Legend Badge" },
    ],
  },
  {
    label: "Additional",
    entries: [
      { title: "Digital Marketing & Graphic Design" },
      { title: "My Captain / GreekForGreek", detail: "Campus Ambassador" },
    ],
  },
];

export const coursework = [
  "ML",
  "AI",
  "DSA",
  "OOP",
  "DBMS",
  "Data Analysis",
  "Networks",
  "Web",
  "IoT",
  "Software Engineering",
];
