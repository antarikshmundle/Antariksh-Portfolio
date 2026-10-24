export const siteConfig = {
  name: "Antariksh Mundle",
  title: "Antariksh Mundle — Portfolio",
  role: "AI & Data Science Engineer",
  description:
    "AI & Data Science engineering student in Nagpur, building machine-learning systems, full-stack products and IoT projects — from trained model to the software around it.",
  /** Production URL, as listed on the repository. Used for absolute metadata URLs. */
  url: "https://antariksh-portfolio-six.vercel.app",
  location: "Nagpur / India",
  coordinates: "21.15° N · 79.09° E",
} as const;

/** Verified profile facts only — leave a field out rather than guess it. */
export const profile = {
  discipline: "AI & Data Science",
  degree: "B.Tech in Artificial Intelligence & Data Science",
  college: "Priyadarshini College of Engineering",
  location: "Nagpur, India",
  graduation: "2027",
  cgpa: "7.47",
  focus: "AI · Data · Software",
  /** Areas Antariksh works across — not claims of expertise. */
  areas: ["Python", "Machine learning", "Data science", "Web development", "IoT"],
} as const;

/**
 * Internal destinations. Some targets are built in later steps; links point
 * at their final location so nothing needs rewiring when they land.
 */
export const routes = {
  home: "/",
  top: "/#top",
  work: "/#work",
  /** The full About page. The homepage section is aboutSection. */
  about: "/about",
  aboutSection: "/#about",
  skills: "/#skills",
  journey: "/#journey",
  achievements: "/#recognition",
  contact: "/#contact",
} as const;

/** Primary navigation, shared by the header and footer, in page order. */
export const navigation = [
  { label: "Home", href: routes.top },
  { label: "About", href: routes.aboutSection },
  { label: "Projects", href: routes.work },
  { label: "Skills", href: routes.skills },
  { label: "Experience", href: routes.journey },
  { label: "Achievements", href: routes.achievements },
  { label: "Contact", href: routes.contact },
] as const;
