import { rainfallYieldLesson } from "./lessons/rainfall-yield";

export interface MissionSummary {
  number: string;
  title: string;
  subject: string;
  slug: string | null;
}

export const missions: MissionSummary[] = [
  {
    number: rainfallYieldLesson.missionNumber,
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
];
