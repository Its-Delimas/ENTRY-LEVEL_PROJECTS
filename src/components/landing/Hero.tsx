"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const checklist = [
  { label: "Data loading", done: true },
  { label: "Splitting train/test", done: true },
  { label: "Training model", done: false },
  { label: "Evaluating model", done: false },
];

const stages = [
  { label: "Learn", state: "done" },
  { label: "Example", state: "done" },
  { label: "Practice", state: "current" },
  { label: "Review", state: "locked" },
] as const;

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
            Africa&apos;s hands-on tech academy lab
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
            No 25-minute videos. No multiple-choice quizzes. Nurulabs is a
            hands-on lab — you write real code, train a real model, and get
            reviewed on what you actually built. AI &amp; Machine Learning
            is where we&apos;re starting; more tracks are on the way.
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
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-white/40">practice.py</span>
        <span className="eyebrow text-lime">Python</span>
      </div>

      <div className="flex items-center gap-1 border-b border-white/10 px-4 py-2.5">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-1">
            {i > 0 && <span className="h-px w-3 bg-white/15" aria-hidden />}
            <span
              className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                stage.state === "current"
                  ? "bg-lime text-ink"
                  : stage.state === "done"
                    ? "text-lime"
                    : "text-white/30"
              }`}
            >
              {stage.state === "done" && <Check size={9} strokeWidth={3} />}
              {stage.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 divide-x divide-white/10 text-sm">
        <div className="p-5">
          <p className="eyebrow text-lime">Mission 01</p>
          <p className="mt-2 font-display text-base font-semibold text-white">
            Rainfall &amp; Crop Yield
          </p>
          <p className="mt-2 text-white/50">
            Fill in the TODOs — nothing here is pre-solved.
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
              <span className="text-white/50"># TODO: fit a line to the data</span>
              {"\n"}
              <span className="text-lime">def</span>
              <span className="text-white/80"> fit_line(x, y):</span>
              {"\n"}
              <span className="text-white/80">    pass </span>
              <span className="text-white/50"># replace this</span>
              {"\n\n"}
              <span className="text-white/50">slope</span>
              <span className="text-white/80">, </span>
              <span className="text-white/50">intercept</span>
              <span className="text-white/80"> = fit_line(X_train, y_train)</span>
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
