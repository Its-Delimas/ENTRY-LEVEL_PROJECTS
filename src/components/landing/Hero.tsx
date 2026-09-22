"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const checklist = [
  { label: "Data loading", done: true },
  { label: "Exploring data", done: true },
  { label: "Training model", done: false },
  { label: "Evaluating model", done: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-14 md:grid-cols-2 md:items-center">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="eyebrow text-lime-deep"
          >
            AI &amp; ML education, built for Africa
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl"
          >
            Learn machine learning by{" "}
            <span className="relative whitespace-nowrap">
              actually building it
              <svg
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 h-3 w-full text-lime"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 240 3 298 9"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink/60"
          >
            No 25-minute videos. No multiple-choice quizzes. Nurulabs puts
            a real code editor in front of you from lesson one, so you
            train actual models on problems that matter here — crop
            yields, traffic, mobile money, rainfall.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="/lesson/rainfall-yield"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-white"
            >
              Try the first mission — free
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="rounded-md border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink"
            >
              See how it works
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <LessonPreviewCard />
        </motion.div>
      </div>
    </section>
  );
}

function LessonPreviewCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <span className="eyebrow text-lime">Python · ML</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-white/10 text-sm">
        <div className="p-5">
          <p className="eyebrow text-lime">Lesson</p>
          <p className="mt-2 font-display text-base font-semibold text-white">
            Rainfall &amp; Crop Yield
          </p>
          <p className="mt-2 text-white/50">
            Today you&apos;ll build your first ML model.
          </p>
          <ul className="mt-5 space-y-2">
            {checklist.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                className={`flex items-center gap-2 ${
                  item.done ? "text-white" : "text-white/35"
                }`}
              >
                <span className={item.done ? "text-lime" : ""}>
                  {item.done ? "✓" : "○"}
                </span>
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <pre className="flex-1 overflow-hidden p-5 font-mono text-xs leading-relaxed">
            <code>
              <span className="text-lime">import</span>
              <span className="text-white/80"> numpy </span>
              <span className="text-lime">as</span>
              <span className="text-white/80"> np</span>
              {"\n\n"}
              <span className="text-white/50">rainfall</span>
              <span className="text-white/80"> = [120, 160, 200, 260]</span>
              {"\n"}
              <span className="text-white/50">yield_</span>
              <span className="text-white/80"> = [8, 11, 15, 19]</span>
              {"\n\n"}
              <span className="text-white/50">model</span>
              <span className="text-white/80"> = fit(rainfall, yield_)</span>
            </code>
          </pre>
          <div className="border-t border-white/10 p-3.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-lime px-3.5 py-1.5 text-xs font-semibold text-ink">
              ▶ Run
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
