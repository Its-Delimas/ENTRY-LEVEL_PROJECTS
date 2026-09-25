"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Car, Smartphone, CloudRain, MessageSquareText, Images } from "lucide-react";

const mosaic = [
  { src: "/images/maize-field.jpg", alt: "A field of young maize under a blue sky", caption: "AI & ML Lab 01", sub: "Predict maize yield from rainfall" },
  { src: "/images/lamu-market.jpg", alt: "A busy covered produce market in Lamu, Kenya", caption: "Python capstone", sub: "Where and when to sell maize" },
  { src: "/images/nairobi-skyline.jpg", alt: "Nairobi's skyline at golden hour", caption: "On the roadmap", sub: "Forecast Nairobi traffic" },
];

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
    <section id="projects" className="bg-cream pb-24 md:pb-32">
      <div className="grid grid-cols-1 gap-px bg-ink sm:grid-cols-3">
        {mosaic.map((m, i) => (
          <motion.figure
            key={m.src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative aspect-[4/3] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]"
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 px-6 py-5 text-white">
              <p className="eyebrow text-lime">{m.caption}</p>
              <p className="mt-1 font-display text-lg font-semibold">{m.sub}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="eyebrow text-lime-deep"
        >
          Local data, local problems
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          Not another Titanic dataset.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-2xl text-ink/55"
        >
          The labs live today already use local data — Nakuru farms, Kisumu
          maize prices, Garissa heatwaves. As the AI &amp; ML track grows,
          these are the projects we&apos;re building next — problems that
          matter to Kenyan and African students, not another dataset of iris
          flowers or Titanic passengers. They&apos;re the plan, not the
          product yet.
        </motion.p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="bg-white/60 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink/50">
                  <project.icon size={18} />
                </div>
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-ink/40">
                  Planned
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink/70">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/45">
                {project.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
