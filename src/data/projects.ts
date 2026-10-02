export type ProjectVisualType = "campus" | "field" | "inference" | "records" | "sensor";
export type ProjectVisualTone = "surface" | "inverse" | "outline";

export type ProjectSystemNode = { name: string; role: string };

/** A layered architecture: the main path top to bottom, plus systems beside it. */
export type ProjectSystemMap = {
  layers: ProjectSystemNode[];
  aside?: { label: string; note: string; items: ProjectSystemNode[] };
};

/** One technical subsection of the Build chapter. */
export type ProjectBuildNote = {
  title: string;
  paragraphs: string[];
  /** Optional ordered sequence (tiers, pipeline stages), shown as numbered labels. */
  steps?: { label: string; items: string[] };
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  /** One or two factual sentences. No unverified metrics or outcomes. */
  summary: string;
  category: string;
  /** Domain tags shown as labels. */
  tags: string[];
  /** Verified implementation stack — rendered only when provided. */
  technologies?: string[];
  status?: string;
  visual: {
    type: ProjectVisualType;
    tone: ProjectVisualTone;
  };

  /*
   * Case-study content — all optional. The case-study page renders only the
   * chapters that have documented content; nothing is filled in for you.
   */
  overview?: string;
  problem?: string;
  approach?: string;
  features?: string[];
  architecture?: string;
  system?: ProjectSystemMap;
  buildNotes?: ProjectBuildNote[];
  /** Real constraints and trade-offs, rendered as their own chapter. */
  challenges?: string[];
  outcome?: string;
  future?: string;
  roadmap?: string[];
  /** Verified repository URL — the "View source" link appears only when set. */
  github?: string | null;
  /** Verified live URL — the "Open project" link appears only when set. */
  liveUrl?: string | null;
};

export const projects: Project[] = [
  {
    slug: "pce-campus-navigator",
    number: "01",
    title: "PCE Campus Navigator",
    summary:
      "Navigation for the PCE campus, built to help students and visitors find the right place, estimate the distance, and hand off to Google Maps for walking directions.",
    category: "Campus navigation",
    tags: ["Navigation", "Campus"],
    visual: { type: "campus", tone: "surface" },
    technologies: ["React", "Vite", "Tailwind CSS", "FastAPI", "PostgreSQL", "Google Maps", "OpenStreetMap"],
    liveUrl: "https://pce-campus-navigator-rdzl1c0rr-antariksh-s-team.vercel.app/",

    overview:
      "PCE Campus Navigator started with a simple problem: a campus map can show where a place is, but it can't help someone who doesn't know what that place is officially called. I built a map-first web app around a single directory of 69 canonical places on the Priyadarshini College of Engineering campus, then layered on ranked, typo-tolerant search, a Campus AI that answers only from stored records, Nearby discovery for the area around the college, and an admin area for keeping the directory accurate.",
    problem:
      "The places students and visitors look for are spread across several buildings and floors, and the words people use for them rarely match the names in the official directory. Generic map apps don't know these internal places at all. Static maps and signboards can't answer a question or say how far away something is. Behind all of this sits a quieter problem: the directory has to be maintained, and without tooling there is no easy way to see where its data is weak or what people are actually looking for.",
    approach:
      "The campus directory is the canonical source: every search result, assistant answer and map marker resolves back to one of its records. The React frontend is map-first, and search ranks the campus records the app has loaded. The Campus AI has no separate knowledge source. It sits on top of the same resolution system as search. Places from OpenStreetMap live in their own layer and are kept separate from the directory. Saved and recently viewed places stay on the device in localStorage, while a FastAPI and PostgreSQL backend handles the directory, the admin area and analytics.",

    architecture:
      "Three tiers carry the campus data: the browser runs the React and Vite application, which talks to a FastAPI REST API backed by PostgreSQL. Map rendering, external places, the user's position, voice input and on-device storage sit beside the browser rather than behind the API.",
    system: {
      layers: [
        { name: "Browser", role: "Where people search, ask and move around the map" },
        { name: "React / Vite application", role: "Map, ranked search, Campus AI, Nearby, saved places" },
        { name: "FastAPI REST API", role: "Campus directory, JWT-protected admin, analytics" },
        { name: "PostgreSQL", role: "Campus locations and categories" },
      ],
      aside: {
        label: "Alongside the browser",
        note: "Used directly by the application, outside the API.",
        items: [
          { name: "Google Maps", role: "Map and satellite views, Google Maps hand-off" },
          { name: "OpenStreetMap / Overpass", role: "External places for Nearby" },
          { name: "Geolocation", role: "The user's position, where permitted" },
          { name: "Web Speech", role: "Voice input, where supported" },
          { name: "localStorage", role: "Saved and recently viewed places" },
        ],
      },
    },
    features: [
      "69 canonical campus places on a Google Maps map and satellite view",
      "Ranked, typo-tolerant search, with voice input where the browser supports it",
      "Place detail pages with a direct-line distance, walking estimate and route preview",
      "Open in Google Maps hand-off for walking directions",
      "Campus AI that handles contextual follow-up questions",
      "Nearby discovery across Around PCE, On campus and Explore Nagpur",
      "Saved and recently viewed places, plus profile preferences",
      "JWT-protected admin area for the directory, data health, analytics and system status",
    ],

    buildNotes: [
      {
        title: "Ranked search",
        paragraphs: [
          "Search scores every campus record by the strongest way it matches the query, in a fixed order of tiers. An exact name beats a prefix, a prefix beats a match at the start of any word, and so on down through looser matches to the other fields and, last, the description. That order is what lets a loose query still put the most likely place first.",
          "Typo tolerance scales with word length. Longer words can absorb a mistake, while short words are deliberately kept out of fuzzy matching, since one wrong letter in a two- or three-letter word can easily match the wrong place.",
        ],
        steps: {
          label: "Match tiers, strongest first",
          items: ["Exact", "Prefix", "Word prefix", "Contains", "All terms", "Fuzzy", "Field", "Description"],
        },
      },
      {
        title: "Grounded Campus AI",
        paragraphs: [
          "The Campus AI is not a language model. It is a deterministic pipeline: it strips filler words from the question, detects the intent behind it and resolves the subject through the same ranked search and category resolution the rest of the app uses. The intents cover a lookup, a category, something nearby, a distance, navigation, and a request for information the directory doesn't hold.",
          "Every answer is a template populated only from stored records, so it never states anything the stored data doesn't contain, and a question the data can't answer is treated as unavailable information rather than guessed at. A small conversational context carries recent results forward, which is how follow-ups like “the second one” or “take me there” resolve to a specific place.",
        ],
        steps: {
          label: "Pipeline",
          items: ["Strip filler words", "Detect intent", "Resolve place or category", "Apply context", "Fill answer template"],
        },
      },
      {
        title: "Maps and route preview",
        paragraphs: [
          "The map runs on the Google Maps JavaScript API with map and satellite views, and Supercluster handles marker clustering. Distances use the Haversine formula, and walking time is an estimate at 1.3 m/s. It is a straight-line figure, not a measured walking route.",
          "A Google Routes API integration exists, but it isn't enabled in the current configuration. So the route preview is a clearly labelled direct-line estimate, and the in-app live navigation flow, though implemented, stays inactive. For real walking directions, a place can be opened in Google Maps.",
        ],
      },
      {
        title: "Nearby discovery",
        paragraphs: [
          "Places beyond the directory come from OpenStreetMap through a live Overpass lookup, with a bundled snapshot as the fallback. Results are de-duplicated against campus places, sorted by Haversine distance and filterable by category, and Nearby is organised into Around PCE, On campus and Explore Nagpur.",
          "OpenStreetMap data is shown alongside the directory but kept separate from it, so the campus records remain the one source that search and the Campus AI answer from.",
        ],
      },
      {
        title: "Admin and data health",
        paragraphs: [
          "The admin area sits behind JWT authentication, with passwords hashed using bcrypt. It covers create, edit and delete for campus locations, plus category management, and it audits the directory itself: a data-health view checks the quality of the records, and analytics show what people search for, what they ask the Campus AI and which places they open.",
          "Health checks for the Nearby and Nagpur snapshots and a system status view complete the maintenance side.",
        ],
      },
    ],

    challenges: [
      "The Google Routes API isn't enabled, so the route preview falls back to a direct-line estimate and walking directions hand off to Google Maps. The in-app navigation flow is built but inactive.",
      "The Campus AI is deterministic by design. It gives up open-ended language in exchange for answers that always trace back to a stored record.",
      "Nearby depends on the public Overpass API and its availability and rate limits, which is why a bundled snapshot backs the live lookup.",
      "Saved and recently viewed places live in localStorage, so they stay on one device and don't follow the user between devices.",
      "Campus data and OpenStreetMap data have to stay separate: external results are de-duplicated against the directory, never merged into it.",
      "Map availability depends on the Google Maps configuration and billing, which sit outside the application.",
    ],
    outcome:
      "The documented feature set is complete, from search and the Campus AI through Nearby and the admin area. The project went through a documented Stage 13 QA pass covering API and security checks, browser flows, error states, responsive layouts and reduced-motion behaviour, and the documentation records Stage 13's final status as PASS.",
    future: "The next steps remove the current constraints and harden what is already there.",
    roadmap: [
      "Enable the Google Routes API, with quotas, to switch on in-app navigation",
      "A campus footpath graph, then indoor, floor-level guidance",
      "Stronger admin authentication and session hardening",
      "Database migrations, automated unit and integration tests, and CI",
      "Docker-based deployment",
      "Optional account sync for saved places, and a PWA with offline mode",
      "Periodic refreshes of the OpenStreetMap snapshot",
      "An optional LLM layer that only rephrases answers, keeping the deterministic data and action core",
    ],
  },
  {
    slug: "agriverse",
    number: "02",
    title: "AgriVerse",
    summary:
      "An agriculture-focused project that brings farm and crop information together in one digital space.",
    category: "Agriculture",
    tags: ["Agriculture"],
    visual: { type: "field", tone: "inverse" },
  },
  {
    slug: "crop-ai-analyzer",
    number: "03",
    title: "Crop AI Analyzer",
    summary: "Applies AI to crop analysis, turning model output into insight that is clear and usable.",
    category: "Applied AI",
    tags: ["AI", "Agriculture", "Analysis"],
    visual: { type: "inference", tone: "outline" },
    liveUrl: "https://agriverse-crop-ai-analyzer.vercel.app/",
  },
  {
    slug: "gym-management-system",
    number: "04",
    title: "Gym Management System",
    summary:
      "A management system for running a gym, keeping members and day-to-day records organised in one place.",
    category: "Management software",
    tags: ["Software", "Management"],
    visual: { type: "records", tone: "inverse" },
  },
  {
    slug: "iot-environmental-monitoring-system",
    number: "05",
    title: "IoT Environmental Monitoring System",
    summary: "An IoT system for monitoring environmental conditions, reading sensor data from connected hardware.",
    category: "IoT",
    tags: ["IoT", "Monitoring"],
    visual: { type: "sensor", tone: "surface" },
  },
];

export function getProjectHref(slug: string) {
  return `/projects/${slug}`;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Neighbours in the projects list order — the single source of ordering. */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
