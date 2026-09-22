"use client";

import { motion } from "framer-motion";
import { MousePointerClick, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    label: "Attempt",
    body: "You start writing code immediately — no lecture required first.",
  },
  {
    icon: AlertTriangle,
    label: "Struggle",
    body: "You hit an error, a bad result, a model that won't learn. That's expected.",
  },
  {
    icon: Lightbulb,
    label: "Hint",
    body: "Your mentor points at the concept you're missing — never the fix itself.",
  },
  {
    icon: CheckCircle2,
    label: "Understand",
    body: "You implement it yourself, run it, and the idea actually sticks.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="eyebrow text-lime"
        >
          How it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl"
        >
          We don&apos;t hand you the answer. We hand you the editor.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-2xl text-white/55"
        >
          Most platforms teach AI with videos and quizzes. Nurulabs puts a
          real, running Python environment next to every lesson. You read a
          short explanation, then you write the code that makes it true.
        </motion.p>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-6 left-0 hidden h-px w-full bg-white/10 lg:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-ink">
                <step.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
