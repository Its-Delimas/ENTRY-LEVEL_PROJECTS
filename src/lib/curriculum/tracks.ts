import type { Track } from "./types";

export const tracks: Track[] = [
  {
    slug: "ai-ml",
    name: "AI & Machine Learning",
    shortName: "AI & ML",
    tagline: "Train real models on real problems.",
    description:
      "From your first straight-line model to neural networks and image classifiers — every concept built, run, and tested by you.",
    status: "active",
    modules: [
      {
        slug: "ml-foundations",
        title: "How models learn",
        summary: "What training actually is, and how to test a model honestly.",
        labs: ["rainfall-yield"],
        planned: [
          { title: "Classify crop health", summary: "Your first classifier: healthy or diseased, from leaf measurements." },
          { title: "When models go wrong", summary: "Overfitting, noisy data, and how to catch both." },
        ],
      },
      {
        slug: "deep-learning",
        title: "Neural networks",
        summary: "From a single line to layers and weights.",
        labs: [],
        planned: [
          { title: "Build a neural network", summary: "Debug a network that isn't learning — on purpose." },
          { title: "Build an image classifier", summary: "Train a model on local images you chose." },
        ],
      },
    ],
  },
  {
    slug: "data-science",
    name: "Data Science",
    shortName: "Data Science",
    tagline: "Exploratory analysis, statistics, and storytelling with data.",
    description: "Exploratory analysis, statistics, and storytelling with data.",
    status: "coming-soon",
    modules: [],
  },
  {
    slug: "data-engineering",
    name: "Data Engineering",
    shortName: "Data Eng.",
    tagline: "Pipelines, warehouses, and the systems that feed ML models.",
    description: "Pipelines, warehouses, and the systems that feed ML models.",
    status: "coming-soon",
    modules: [],
  },
];
