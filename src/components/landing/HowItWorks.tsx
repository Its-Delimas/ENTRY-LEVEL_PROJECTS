"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, PenLine, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    label: "Learn",
    body: "A short, plain-language explanation of the concept. No code yet — just what you're about to build and why.",
  },
  {
    icon: Code2,
    label: "Example",
    body: "A fully worked demo on its own small dataset. Read it, run it, see the pattern before you touch the real exercise.",
  },
  {
    icon: PenLine,
    label: "Practice",
    body: "A new dataset with the real exercise left as TODOs. Nothing is pre-solved. Your mentor hints — it never hands you the fix.",
  },
  {
    icon: ClipboardCheck,
    label: "Review",
    body: "Hidden checks grade your own code — accuracy, sanity checks — so you know it actually worked, not just that it ran.",
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
          Every mission is the same four stages, in this order — this is
          exactly what you&apos;ll click through, not a metaphor for it.
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
                {i + 1}. {step.label}
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
