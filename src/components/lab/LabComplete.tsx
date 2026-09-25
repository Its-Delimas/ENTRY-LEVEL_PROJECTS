"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Flag, Trophy, Unlock } from "lucide-react";
import type { Lab } from "@/lib/curriculum/types";
import { isModuleDone, moduleOfLab, nextLabAfter, trackOfLab, tracksUnlockedBy } from "@/lib/curriculum";
import { getProgress } from "@/lib/progress";
import Logo from "@/components/landing/Logo";

export default function LabComplete({ lab }: { lab: Lab }) {
  const track = trackOfLab(lab.slug);
  const next = nextLabAfter(lab.slug);
  // Finishing a track's last lab unlocks the tracks that require it.
  const unlocked = !next && track ? tracksUnlockedBy(track).filter((t) => t.status === "active") : [];
  const mod = moduleOfLab(lab.slug);
  const milestone = mod && isModuleDone(mod.module, getProgress()) ? mod.module.milestone : undefined;

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

        {milestone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 flex items-start gap-4 rounded-3xl border border-lime/30 p-6"
          >
            <Flag size={22} className="mt-0.5 shrink-0 text-lime" />
            <div>
              <p className="eyebrow text-lime">Milestone {mod!.index + 1} reached</p>
              <p className="mt-1 font-display text-lg font-semibold">{milestone.title}</p>
              <p className="mt-1 text-sm text-white/60">{milestone.description}</p>
            </div>
          </motion.div>
        )}

        {unlocked.map((t) => (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center gap-4 rounded-3xl bg-lime p-6 text-ink"
          >
            <Unlock size={22} className="shrink-0" />
            <div>
              <p className="font-display text-lg font-semibold">You&apos;ve unlocked {t.name}</p>
              <p className="mt-0.5 text-sm text-ink/70">{t.tagline}</p>
            </div>
          </motion.div>
        ))}

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
          ) : unlocked.length ? (
            <Link
              href={`/tracks/${unlocked[0].slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3.5 text-sm font-semibold text-ink"
            >
              Enroll in {unlocked[0].name}
              <ArrowRight size={16} />
            </Link>
          ) : (
            track && (
              <Link
                href={`/tracks/${track.slug}`}
                className="inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3.5 text-sm font-semibold text-ink"
              >
                See your track
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
