/**
 * Current direction — what Antariksh is focusing on now. These are directions
 * drawn from his resume and coursework, not proficiency claims.
 */

export type FocusItem = {
  number: string;
  title: string;
  description: string;
  tags?: string[];
};

export const focusItems: FocusItem[] = [
  {
    number: "01",
    title: "AI / Machine learning",
    description:
      "Applied machine learning, computer vision and AI-based applications — getting models out of notebooks and into things that run.",
    tags: ["AI", "ML", "Computer vision"],
  },
  {
    number: "02",
    title: "Data → Intelligence",
    description:
      "Data analysis, preprocessing and model-oriented workflows: the work that turns raw information into something an application can act on.",
    tags: ["Data", "Analysis", "Models"],
  },
  {
    number: "03",
    title: "Software engineering",
    description:
      "Strengthening the software layer around AI — web applications, REST APIs, databases and full-stack development.",
    tags: ["Web", "APIs", "Databases"],
  },
  {
    number: "04",
    title: "Applied systems",
    description:
      "Connecting software and intelligent processing to physical devices through IoT and sensor-based projects.",
    tags: ["IoT", "ESP32", "Sensors"],
  },
];

/** Quadrants of the focus map, in reading order (top-left → bottom-right). */
export const focusQuadrants = ["AI", "Data", "Software", "Systems"];
