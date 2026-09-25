"use client";

import { motion } from "framer-motion";
import LineFit from "@/components/lab/widgets/LineFit";

/** A real interactive from AI & ML Lab 01, running on the landing page. */
export default function TryIt() {
  return (
    <section id="try" className="scroll-mt-20 border-y border-ink/10 bg-paper px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="eyebrow text-lime-deep">Try it right here</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
          Train a model with your hands.
        </h2>
        <p className="mt-5 text-ink/60">
          Each dot is a maize farm: rainfall on one axis, harvest on the other. Move the sliders until the line
          fits — and watch the error shrink. That search for the best two numbers is exactly what
          &ldquo;training&rdquo; means. This is a real interactive from the AI &amp; ML track.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-12 rounded-[28px] bg-cream p-5 ring-1 ring-ink/10 md:p-8"
      >
        <LineFit />
      </motion.div>
    </section>
  );
}
