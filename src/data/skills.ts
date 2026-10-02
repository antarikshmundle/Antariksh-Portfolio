/**
 * Technologies and areas Antariksh works across. These describe what is
 * used in projects — not proficiency levels. Each technology appears once.
 */

export type PipelineStage = "data" | "model" | "application" | "device" | "all";

export type SkillGroup = {
  number: string;
  title: string;
  description: string;
  skills: string[];
  /** Where this group feeds the stack pipeline diagram. */
  stage: PipelineStage;
};

export const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "AI / Machine learning",
    description: "Building and evaluating models, including work with text and language.",
    skills: ["Artificial intelligence", "Machine learning", "NLP"],
    stage: "model",
  },
  {
    number: "02",
    title: "Data / Programming",
    description: "The languages and data work underneath everything else.",
    skills: ["Python", "Data science", "C", "Java"],
    stage: "data",
  },
  {
    number: "03",
    title: "Web / Software",
    description: "Interfaces and services that turn a model into something people can use.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flask", "HTML", "CSS"],
    stage: "application",
  },
  {
    number: "04",
    title: "IoT / Hardware",
    description: "Microcontrollers and sensors for projects that read the physical world.",
    skills: ["Arduino", "ESP32", "ESP8266 / NodeMCU", "DHT11", "Tinkercad"],
    stage: "device",
  },
  {
    number: "05",
    title: "Tools / Workflow",
    description: "Version control and the everyday setup every project runs through.",
    skills: ["Git", "GitHub", "VS Code"],
    stage: "all",
  },
];
