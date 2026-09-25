import type { Track } from "./types";

export const tracks: Track[] = [
  {
    slug: "python-for-ai",
    name: "Python for AI",
    shortName: "Python",
    tagline: "The language every AI system is written in.",
    description:
      "Start from zero and finish able to load, clean and analyse a real dataset in Python — the foundation every lab in the AI & ML track builds on.",
    status: "active",
    modules: [
      {
        slug: "py-foundations",
        title: "Talking to Python",
        summary: "Values, variables, and decisions — the building blocks of every program.",
        labs: ["py-values", "py-decisions"],
      },
      {
        slug: "py-collections",
        title: "Working with many values",
        summary: "Lists and loops: how code handles a whole dataset, not one number.",
        labs: ["py-lists", "py-loops"],
      },
      {
        slug: "py-data",
        title: "Organising code and data",
        summary: "Functions, dictionaries and files — the shape of real data work.",
        labs: ["py-functions", "py-dicts", "py-files"],
      },
      {
        slug: "py-capstone",
        title: "Project",
        summary: "Put it all together on a real question with messy data.",
        labs: ["py-project-market"],
      },
      {
        slug: "py-scientific",
        title: "Scientific Python",
        summary: "The libraries data scientists use every day.",
        labs: [],
        planned: [
          { title: "Arrays with NumPy", summary: "Fast maths on whole columns at once." },
          { title: "DataFrames with pandas", summary: "Load, filter and group tables in a few lines." },
          { title: "Plotting your data", summary: "See the pattern before you model it." },
        ],
      },
    ],
  },
  {
    slug: "ai-ml",
    name: "AI & Machine Learning",
    shortName: "AI & ML",
    tagline: "Train real models on real problems.",
    description:
      "From your first straight-line model to neural networks and image classifiers — every concept built, run, and tested by you.",
    status: "active",
    requires: ["python-for-ai"],
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
