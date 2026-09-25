"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Eye, FlaskConical, MessageSquareText, Target } from "lucide-react";

const steps = [
  { icon: BookOpen, label: "Lesson", body: "A short, plain-language explanation with a worked example. Theory first — but never a wall of text." },
  { icon: FlaskConical, label: "Interactive", body: "Drag sliders, step through loops, fit a line by hand. Build intuition before you write a line." },
  { icon: Eye, label: "Quiz", body: "Predict what code will do before you run it — then run it and find out if you were right." },
  { icon: Code2, label: "Practice", body: "Write real Python in the browser. Hidden checks test your logic on more than one input." },
  { icon: Target, label: "Challenge", body: "Just the goal, no instructions. Figure it out — the mentor steps in if you get stuck." },
  { icon: MessageSquareText, label: "Reflect", body: "Explain the idea in your own words. Nurulabs checks you covered the key ideas." },
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
          How every lab works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl"
        >
          Learn it, play with it, predict it, build it, explain it.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-2xl text-white/55"
        >
          Reading is the glue, not the product. Each lab moves through the same six kinds of activity, so
          you&apos;re doing something every few minutes — and you always know what comes next.
        </motion.p>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="bg-ink p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime text-ink">
                  <step.icon size={18} />
                </span>
                <span className="font-mono text-xs text-white/35">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
