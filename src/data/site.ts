export const siteConfig = {
  name: "Antariksh Mundle",
  title: "Antariksh Mundle — Portfolio",
  role: "AI & Data Science Engineer",
  description:
    "Building intelligent systems that turn complex problems into useful products.",
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
  work: "/#work",
  about: "/about",
  journey: "/#journey",
  contact: "/#contact",
} as const;

/** Primary navigation, shared by the header and footer. */
export const navigation = [
  { label: "Work", href: routes.work },
  { label: "About", href: routes.about },
  { label: "Journey", href: routes.journey },
  { label: "Contact", href: routes.contact },
] as const;
