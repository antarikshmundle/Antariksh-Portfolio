export type ProjectVisualType = "campus" | "inference" | "records" | "sensor";
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

/**
 * A documented result — a count, a recorded metric or a QA outcome.
 * Only values that appear in the project's own repository or docs.
 */
export type ProjectResult = {
  value: string;
  label: string;
  /** Context that keeps the number honest (dataset, split, caveat). */
  detail?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  /** Featured projects get the large case-study treatment on the homepage. */
  featured?: boolean;
  /** One-line positioning used on featured cards, e.g. "Grounded campus search". */
  kicker?: string;
  /** Another name the same project is documented or branded under. */
  alsoKnownAs?: string;
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
  results?: ProjectResult[];
  /** Where the results come from, shown under them. */
  resultsSource?: string;
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
    featured: true,
    kicker: "Grounded campus search and navigation",
    summary:
      "Navigation for the PCE campus, built to help students and visitors find the right place, estimate the distance, and hand off to Google Maps for walking directions.",
    category: "Campus navigation",
    tags: ["Navigation", "Campus"],
    visual: { type: "campus", tone: "surface" },
    technologies: ["React", "Vite", "Tailwind CSS", "FastAPI", "PostgreSQL", "Google Maps", "OpenStreetMap"],
    // The production URL listed on the repository. (The previous link pointed
    // at a protected preview deployment that redirected to a Vercel login.)
    liveUrl: "https://pce-campus-navigator.vercel.app/",
    github: "https://github.com/antarikshmundle/pce-campus-navigator",

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
    results: [
      { value: "69", label: "Canonical campus places", detail: "One directory that search, the Campus AI and the map all resolve to." },
      { value: "8", label: "Search match tiers", detail: "From exact name down to description, with length-aware typo tolerance." },
      { value: "105", label: "Nearby places outside the directory", detail: "71 around PCE and 34 across Nagpur, from OpenStreetMap." },
      { value: "PASS", label: "Stage 13 QA", detail: "API, security, browser flows, error states, responsive and reduced-motion checks." },
    ],
    resultsSource: "Figures from the project's README and Stage 13 QA documentation.",
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
  /*
   * Everything below is taken from the agriverse-crop-ai-analyzer repository:
   * backend/README.md, frontend/README.md and the *_metadata.json files that
   * ship beside each trained model in backend/ml_artifacts/.
   */
  {
    slug: "crop-ai-analyzer",
    number: "02",
    title: "Crop AI Analyzer",
    // One product: the repository, READMEs and app shell brand it AgriVerse;
    // the deployed app's page title is "CROP AI Analyzer". /projects/agriverse
    // redirects here (next.config.ts).
    alsoKnownAs: "AgriVerse",
    featured: true,
    kicker: "Three trained models, one honest advisory",
    summary:
      "A farm decision-support platform that combines three trained models — crop recommendation, plant-disease detection and yield prediction — with live weather and market data, and says plainly when evidence is missing.",
    category: "Applied AI",
    tags: ["Machine learning", "Computer vision", "Agriculture"],
    visual: { type: "inference", tone: "outline" },
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Recharts",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "scikit-learn",
      "TensorFlow / Keras",
      "Open-Meteo",
      "data.gov.in Agmarknet",
      "ReportLab",
      "pytest",
    ],
    liveUrl: "https://agriverse-crop-ai-analyzer.vercel.app/",
    github: "https://github.com/antarikshmundle/agriverse-crop-ai-analyzer",

    overview:
      "Crop AI Analyzer is the agricultural decision-support platform documented in its repository as AgriVerse / CROP AI Analyzer. A React frontend sits on a FastAPI and PostgreSQL backend that serves three trained models — a crop recommender, a plant-disease image classifier and a yield regressor — alongside live weather and mandi-price lookups. Their outputs feed an explainable advisory, with financial, risk and report modules built on the same persisted records.",
    problem:
      "The decisions a farm faces — what to plant, whether a leaf is diseased, what a season might yield — depend on evidence spread across soil readings, leaf images, historical production data, weather and market prices. A tool that blends that evidence into one recommendation is only useful if it is clear about which evidence it actually has, and never fills the gaps with numbers that look real.",
    approach:
      "Each model is trained offline, committed as an artifact with a metadata file that records its dataset, split and test metrics, and loaded by its own service in the API. A missing or corrupt artifact returns an explicit 503 rather than a silent fallback. The advisory engine combines a farm's latest persisted crop and yield results with live Open-Meteo weather and Agmarknet market data, and reports missing evidence through a data-completeness field instead of substituting it. Disease results are shown separately as farm-health context and never mixed into crop scoring. Financial, risk and credit-readiness calculations are deterministic rules, and the project documents them as rules, not as machine learning.",

    architecture:
      "A React and Vite single-page app talks to a FastAPI REST API backed by PostgreSQL. Every farm route is protected by JWT authentication and scoped to the farm's owner. Model artifacts load inside the API; weather and market data come from live external providers.",
    system: {
      layers: [
        { name: "Browser", role: "Dashboard, analysis workspace and one page per module" },
        { name: "React / Vite SPA", role: "Weather, market, credit readiness, schemes, crop comparison, alerts, history, reports" },
        { name: "FastAPI REST API", role: "JWT auth, farm-scoped ownership, advisory engine, PDF reports" },
        { name: "PostgreSQL", role: "Users, farms, analyses and reports" },
      ],
      aside: {
        label: "Inside and beside the API",
        note: "Models load from committed artifacts; providers are called live.",
        items: [
          { name: "Crop model", role: "RandomForestClassifier · scikit-learn" },
          { name: "Disease model", role: "MobileNetV2 transfer learning · Keras" },
          { name: "Yield model", role: "RandomForestRegressor with prediction intervals" },
          { name: "Open-Meteo", role: "Weather at the farm's stored coordinates" },
          { name: "data.gov.in Agmarknet", role: "Mandi prices, with retry and key redaction" },
        ],
      },
    },
    features: [
      "Crop recommendation from soil nutrients (N, P, K), pH, temperature, humidity and rainfall",
      "Plant-disease detection from a leaf photo across 38 PlantVillage classes",
      "Yield prediction by state, district, crop, season, year and area, with a 10th–90th percentile range",
      "Explainable advisory that combines model outputs with live weather and market data",
      "Credit readiness and EMI, financial and risk analysis as documented rule-based calculations",
      "Scheme recommendations, crop comparison and alerts",
      "Analysis history and PDF reports generated from persisted records",
      "JWT authentication with farm-scoped ownership on every farm route",
    ],

    buildNotes: [
      {
        title: "Crop recommendation",
        paragraphs: [
          "A 200-tree RandomForest trained on the Kaggle Crop Recommendation dataset: 2,200 rows, 22 crops and seven features, with an 80/20 stratified split and 5-fold cross-validation.",
          "It replaced an earlier DecisionTree. Inspection found that every one of that tree's 38 leaves held exactly one training sample, so it returned degenerate 100% / 0% probabilities on almost any input. On the same held-out split the RandomForest scored a macro-F1 of 0.9955 against the tree's 0.9794, with confidence spread across classes instead of always certain.",
        ],
        steps: {
          label: "Inputs",
          items: ["Nitrogen", "Phosphorus", "Potassium", "Temperature", "Humidity", "pH", "Rainfall"],
        },
      },
      {
        title: "Disease detection",
        paragraphs: [
          "MobileNetV2 transfer learning on the full PlantVillage colour set: 54,305 leaf images across 38 classes. The ImageNet base stays frozen; features are cached once and only the dense head is trained, then the two are reassembled into one inference model at 224 × 224 input.",
          "The split is leaf-group-aware for 30 of the 38 classes, so photos of the same leaf can't land on both sides. An earlier run passed the test set in as validation data, letting it influence early stopping. That was corrected: validation is now carved from training data only, and the 10,849-image test set was used exactly once, after the model was fixed.",
        ],
        steps: {
          label: "Pipeline",
          items: ["Leaf-group split", "Frozen MobileNetV2 features", "Train dense head", "Reassemble", "Single test pass"],
        },
      },
      {
        title: "Yield prediction",
        paragraphs: [
          "A RandomForestRegressor trained on India's crop production records: 326,999 rows after cleaning from 345,407, covering 36 states, 728 districts and 52 crops. The split is chronological — 1997–2014 for training, 2015–2017 for validation and 2018–2020 for test — so the model is judged on years it has never seen.",
          "Production is deliberately excluded as a feature because yield is derived from it. Each prediction carries an interval from the 10th to the 90th percentile of the individual trees' predictions.",
        ],
      },
      {
        title: "Evidence-grounded advisory",
        paragraphs: [
          "The advisory reads only real inputs: persisted model outputs, the farm's records and live provider responses. Weather comes from Open-Meteo at the farm's coordinates; a mock exists only as an explicit local-development opt-in. Market prices come from data.gov.in's Agmarknet with retry and back-off, and the API key is redacted from errors and logs.",
          "When a provider fails, the user sees an honest error rather than a fabricated price, and the advisory marks the gap in its data-completeness field.",
        ],
      },
    ],

    challenges: [
      "Yield R² on the test years is low (0.072) and the project reports it rather than hiding it. 13.4% of test crop-and-district combinations never appear in training, so MAE is the more meaningful measure.",
      "The yield dataset has no weather, soil or fertiliser fields. The API still accepts rainfall, temperature and fertiliser for compatibility, but they have no effect on the prediction.",
      "Uploaded leaf images are used once for inference and then discarded; there is no object-storage integration.",
      "Market data needs a data.gov.in API key and has no mock provider, so an outage surfaces as an error.",
      "Tables are created with create_all() and there is no migration tooling — workable because every schema change so far has been additive.",
    ],
    outcome:
      "All three models ship with the repository as trained artifacts, each beside a metadata file recording its dataset, split and test metrics, so the app runs without a training step. The backend includes pytest modules for authentication, farms, each model, weather, market, schemes, alerts, history and reports.",
    results: [
      { value: "95.8%", label: "Disease model test accuracy", detail: "MobileNetV2 · 38 classes · 10,849 held-out images · macro-F1 0.949" },
      { value: "0.9955", label: "Crop model held-out macro-F1", detail: "RandomForest · 22 crops · vs 0.9794 for the DecisionTree it replaced" },
      { value: "1.82", label: "Yield model test MAE, t/ha", detail: "Chronological split · tested on 2018–2020 · R² 0.072, reported with its diagnosis" },
      { value: "3", label: "Trained models in the API", detail: "Each fails with an explicit 503, never a silent fallback" },
    ],
    resultsSource: "Test metrics as recorded in the repository's model metadata files.",
  },
  {
    slug: "gym-management-system",
    number: "03",
    title: "Gym Management System",
    summary:
      "A management system for running a gym, keeping members and day-to-day records organised in one place.",
    category: "Management software",
    tags: ["Software", "Management"],
    visual: { type: "records", tone: "inverse" },
  },
  {
    slug: "iot-environmental-monitoring-system",
    number: "04",
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
