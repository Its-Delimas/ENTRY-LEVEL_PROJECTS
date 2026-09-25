"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Full-bleed photo with a single statement over it. */
export default function PhotoBand() {
  return (
    <section className="relative isolate flex min-h-[60vh] items-end overflow-hidden bg-code text-white">
      <Image
        src="/images/laptop-code.jpg"
        alt="Hands on a laptop keyboard with code on screen, other learners working alongside"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="w-full px-6 md:px-10 xl:px-16 py-16 md:py-20"
      >
        <p className="eyebrow text-lime">Real code from lesson one</p>
        <p className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          You don&apos;t watch someone else code. You write it, run it, break it, and fix it — in your browser.
        </p>
      </motion.div>
    </section>
  );
}
