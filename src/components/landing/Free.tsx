"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  { title: "Free, all of it", body: "Every track, every lab, the placement check and the mentor. No trials, no paywalled “premium” labs." },
  { title: "Any laptop with a browser", body: "Python runs on your own device inside the page, so there's nothing to install and no powerful machine needed." },
  { title: "Learn on your schedule", body: "No cohort start dates. Open a lab between classes or late at night — your progress saves on your device." },
  { title: "Built on African problems", body: "Farm yields, market prices, rainfall and heat. The data looks like the problems you'll actually solve." },
];

/** Half-bleed photo beside the promise that the platform is free. */
export default function Free() {
  return (
    <section id="free" className="grid scroll-mt-20 bg-paper md:grid-cols-2">
      <div className="relative min-h-[380px] md:min-h-[640px]">
        <Image
          src="/images/students-laptops.jpg"
          alt="Four students sitting together outdoors with laptops"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>
      <div className="flex items-center px-6 py-20 md:px-16 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <p className="eyebrow text-lime-deep">Free to learn</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Talent is everywhere. Access to good training shouldn&apos;t depend on money.
          </h2>
          <ul className="mt-10 space-y-6">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex gap-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-onlime">
                  <Check size={13} strokeWidth={3} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
