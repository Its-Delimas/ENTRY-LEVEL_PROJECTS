"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="dot-grid-inverted relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-20 text-center text-white md:px-16"
      >
        <div className="glow-blob pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/25 blur-3xl" />

        <div className="relative">
          <p className="eyebrow text-lime">Affordable by design</p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Real AI education, priced for African students.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-white/60">
            The first mission is free — no card, no signup wall. Write real
            code and train a real model in the next five minutes.
          </p>
          <motion.a
            href="/lesson/rainfall-yield"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink"
          >
            Start Mission 01
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
