"use client";

import { motion } from "framer-motion";
import { Sprout, Network, ImageIcon, ClipboardCheck } from "lucide-react";

const missions = [
  {
    number: "01",
    icon: Sprout,
    title: "Rainfall & Crop Yield",
    body: "Load data, explore it, split it, train your first model — and see exactly what 'training' means. Live today.",
    live: true,
  },
  {
    number: "15",
    icon: Network,
    title: "Build a neural network",
    body: "Move from a single line to layers and weights. You'll debug a model that isn't learning, on purpose.",
    live: false,
  },
  {
    number: "30",
    icon: ImageIcon,
    title: "Build an image classifier",
    body: "Go from 'I don't understand what training means' to 'I trained a model myself,' on a dataset you chose.",
    live: false,
  },
];

export default function Missions() {
  return (
    <section id="missions" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="eyebrow text-lime-deep"
      >
        A path, not a playlist
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Every mission builds on the last one.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 max-w-2xl text-ink/55"
      >
        We&apos;re starting with the AI &amp; Machine Learning track. Mission
        01 is live today — the rest of this track is what we&apos;re
        building next.
      </motion.p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {missions.map((mission, i) => (
          <motion.div
            key={mission.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-semibold text-ink/15 transition-colors group-hover:text-lime-deep">
                {mission.number}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-ink transition-colors group-hover:bg-lime">
                <mission.icon size={18} />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-ink">
                {mission.title}
              </h3>
              {mission.live ? (
                <span className="rounded-md bg-lime-soft px-2 py-0.5 text-[11px] font-semibold text-lime-deep">
                  Live
                </span>
              ) : (
                <span className="rounded-md bg-cream px-2 py-0.5 text-[11px] font-semibold text-ink/40">
                  Coming soon
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">
              {mission.body}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex items-start gap-3 rounded-2xl border border-lime-deep/15 bg-lime-soft p-6"
      >
        <ClipboardCheck size={20} className="mt-0.5 shrink-0 text-lime-deep" />
        <p className="text-sm leading-relaxed text-ink/75">
          <span className="font-semibold text-ink">
            Automatic mission checks:
          </span>{" "}
          submit your code and Nurulabs runs hidden tests against it —
          dataset loaded, model trained, accuracy threshold met — so you know
          a mission is actually complete, not just that a video finished
          playing.
        </p>
      </motion.div>
    </section>
  );
}
