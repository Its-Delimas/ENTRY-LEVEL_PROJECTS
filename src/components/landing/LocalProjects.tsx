"use client";

import { motion } from "framer-motion";
import { Leaf, Car, Smartphone, CloudRain, MessageSquareText, Images } from "lucide-react";

const projects = [
  {
    icon: Leaf,
    title: "Crop disease classification",
    body: "Identify disease in cassava and maize leaves from photos taken on a phone.",
  },
  {
    icon: Car,
    title: "Nairobi traffic prediction",
    body: "Forecast congestion on major routes using historical trip data.",
  },
  {
    icon: Smartphone,
    title: "Mobile-money anomaly detection",
    body: "Flag unusual M-Pesa transaction patterns that might indicate fraud.",
  },
  {
    icon: CloudRain,
    title: "Rainfall prediction",
    body: "Model seasonal rainfall from county-level weather station data.",
  },
  {
    icon: MessageSquareText,
    title: "Kenyan-language NLP",
    body: "Build text models that actually understand Swahili and Sheng.",
  },
  {
    icon: Images,
    title: "Local image classification",
    body: "Train a classifier on datasets built from local, not generic stock, images.",
  },
];

export default function LocalProjects() {
  return (
    <section id="projects" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="eyebrow text-lime-deep"
        >
          Not another Titanic dataset
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          Projects pulled from problems around you.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-2xl text-ink/55"
        >
          Every mission track ends in a project built on data and problems
          that are actually relevant to Kenyan and African students — not
          another dataset of iris flowers or Titanic passengers.
        </motion.p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-ink/8 bg-white p-6 transition-colors hover:border-lime-deep/25"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-lime transition-colors group-hover:bg-lime group-hover:text-ink">
                <project.icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">
                {project.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
