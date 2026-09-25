"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BuiltForAfrica() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow text-lime-deep">Built for Africa</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Learning that fits the desk you actually have.
          </h2>
          <p className="mt-5 max-w-md text-ink/60">
            No campus, no cohort start date, no laptop requirements beyond a
            browser. Open a lab between classes, on a break, or late at
            night, and pick up exactly where you left off.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src="/images/students-laptops.jpg"
              alt="Four students sitting together outdoors with laptops, one taking a selfie"
              fill
              sizes="(min-width: 768px) 480px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 h-28 w-28 overflow-hidden rounded-2xl border-4 border-paper shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] sm:h-32 sm:w-32">
            <Image
              src="/images/africa-globe.jpg"
              alt="Close-up of Africa on a globe"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
