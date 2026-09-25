"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Trophy } from "lucide-react";
import type { Lab } from "@/lib/curriculum/types";
import { nextLabAfter, trackOfLab } from "@/lib/curriculum";
import Logo from "@/components/landing/Logo";

export default function LabComplete({ lab }: { lab: Lab }) {
  const track = trackOfLab(lab.slug);
  const next = nextLabAfter(lab.slug);

  return (
    <div className="flex min-h-screen flex-col bg-ink text-white">
      <header className="px-6 py-5">
        <Logo withWordmark={false} />
      </header>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 pb-20">
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime text-ink"
        >
          <Trophy size={28} />
        </motion.span>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="eyebrow mt-8 text-lime">
            {lab.kind === "project" ? "Project shipped" : `Lab ${lab.number} complete`}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
            {lab.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-3xl bg-white/[0.06] p-6"
        >
          <p className="text-sm font-semibold text-white">You can now</p>
          <ul className="mt-4 space-y-3">
            {lab.skills.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="flex items-start gap-3 text-[15px] text-white/80"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check size={12} strokeWidth={3} />
                </span>
                {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {next ? (
            <Link
              href={`/labs/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3.5 text-sm font-semibold text-ink"
            >
              Next: {next.title}
              <ArrowRight size={16} />
            </Link>
          ) : (
            track && (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3.5 text-sm font-semibold text-ink"
              >
                Back to dashboard
                <ArrowRight size={16} />
              </Link>
            )
          )}
          <Link href="/dashboard" className="rounded-md border border-white/15 px-6 py-3.5 text-sm font-semibold text-white">
            Dashboard
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
