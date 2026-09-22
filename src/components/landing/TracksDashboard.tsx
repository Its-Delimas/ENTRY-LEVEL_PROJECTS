"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Circle, Lock } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { tracks, activeTrack } from "@/lib/tracks";

const comingSoonTracks = tracks.filter((t) => t.status === "coming-soon");

export default function TracksDashboard() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-2 md:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-lime-deep"
          >
            Your dashboard
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl"
          >
            One dashboard. Every track.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-md text-ink/55"
          >
            Missions live inside tracks. You&apos;re enrolled in AI &amp;
            Machine Learning today — Data Science, Data Engineering, and
            Data Analytics are next. Your dashboard tracks progress across
            all of them, in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href="/dashboard"
              className="mt-7 inline-flex items-center gap-2 rounded-md border border-ink/15 px-6 py-3 text-sm font-semibold text-ink"
            >
              View your dashboard
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-ink/10 bg-white p-6"
        >
          <p className="eyebrow text-lime-deep">{activeTrack.shortName}</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink">
            {activeTrack.name}
          </h3>
          <div className="mt-4">
            <ProgressBar value={33} />
          </div>
          <ul className="mt-5 space-y-3">
            {activeTrack.missions.map((mission) => (
              <li
                key={mission.number}
                className="flex items-center gap-2.5 text-sm"
              >
                {mission.slug ? (
                  <Circle size={15} className="shrink-0 text-ink/25" />
                ) : (
                  <Lock size={14} className="shrink-0 text-ink/25" />
                )}
                <span className={mission.slug ? "text-ink/75" : "text-ink/35"}>
                  Mission {mission.number} · {mission.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/8 pt-5">
            {comingSoonTracks.map((track) => (
              <span
                key={track.slug}
                className="inline-flex items-center gap-1.5 rounded-md bg-cream px-2.5 py-1 text-xs font-medium text-ink/40"
              >
                <Lock size={11} />
                {track.shortName}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
