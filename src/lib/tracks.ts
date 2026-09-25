import { rainfallYield as rainfallYieldLesson } from "./curriculum/labs/ai-ml";

export interface MissionSummary {
  number: string;
  title: string;
  subject: string;
  slug: string | null;
}

export interface Track {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  status: "active" | "coming-soon";
  missions: MissionSummary[];
}

export const tracks: Track[] = [
  {
    slug: "ai-ml",
    name: "AI & Machine Learning",
    shortName: "AI & ML",
    description:
      "Train real models on real problems, starting with the fundamentals.",
    status: "active",
    missions: [
      {
        number: rainfallYieldLesson.number,
        title: rainfallYieldLesson.title,
        subject: rainfallYieldLesson.subject,
        slug: rainfallYieldLesson.slug,
      },
      {
        number: "15",
        title: "Build a neural network",
        subject: "Deep Learning",
        slug: null,
      },
      {
        number: "30",
        title: "Build an image classifier",
        subject: "Computer Vision",
        slug: null,
      },
    ],
  },
  {
    slug: "data-science",
    name: "Data Science",
    shortName: "Data Science",
    description: "Exploratory analysis, statistics, and storytelling with data.",
    status: "coming-soon",
    missions: [],
  },
  {
    slug: "data-engineering",
    name: "Data Engineering",
    shortName: "Data Eng.",
    description: "Pipelines, warehouses, and the systems that feed ML models.",
    status: "coming-soon",
    missions: [],
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    shortName: "Analytics",
    description: "SQL, dashboards, and turning raw data into decisions.",
    status: "coming-soon",
    missions: [],
  },
];

export const activeTrack = tracks.find((t) => t.status === "active")!;
