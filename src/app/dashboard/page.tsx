"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, Lock } from "lucide-react";
import Logo from "@/components/landing/Logo";
import Modal from "@/components/ui/Modal";
import ProgressBar from "@/components/ui/ProgressBar";
import { tracks, activeTrack, type Track } from "@/lib/tracks";
import { getCompletedMissions } from "@/lib/progress";

export default function DashboardPage() {
  const [completed, setCompleted] = useState<Set<string> | null>(null);
  const [lockedTrack, setLockedTrack] = useState<Track | null>(null);

  useEffect(() => {
    // localStorage isn't available during SSR, so progress has to be
    // read after mount rather than computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(getCompletedMissions());
  }, []);

  const doneCount = completed
    ? activeTrack.missions.filter((m) => m.slug && completed.has(m.slug))
        .length
    : 0;
  const trackMissionsWithSlug = activeTrack.missions.filter((m) => m.slug);
  const nextMission =
    activeTrack.missions.find(
      (m) => m.slug && completed && !completed.has(m.slug),
    ) ?? activeTrack.missions.find((m) => m.slug);
  const comingSoonTracks = tracks.filter((t) => t.status === "coming-soon");

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-ink/60 hover:text-ink"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="eyebrow text-lime-deep">Your courses</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
          Enrolled
        </h1>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 rounded-2xl border border-ink/10 bg-white p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-lime-deep">{activeTrack.shortName}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                {activeTrack.name}
              </h2>
              <p className="mt-1 max-w-md text-sm text-ink/55">
                {activeTrack.description}
              </p>
            </div>
            {nextMission?.slug && (
              <Link
                href={`/lesson/${nextMission.slug}`}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white"
              >
                {doneCount === 0 ? "Start" : "Continue"}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-ink/50">
              <span>
                {completed === null
                  ? "Loading progress…"
                  : `${doneCount} of ${trackMissionsWithSlug.length} missions complete`}
              </span>
            </div>
            <div className="mt-2">
              <ProgressBar
                value={
                  trackMissionsWithSlug.length
                    ? (doneCount / trackMissionsWithSlug.length) * 100
                    : 0
                }
              />
            </div>
          </div>

          <ul className="mt-6 divide-y divide-ink/8 border-t border-ink/8">
            {activeTrack.missions.map((mission) => {
              const isDone = !!(
                completed &&
                mission.slug &&
                completed.has(mission.slug)
              );
              const isLocked = !mission.slug;
              return (
                <li
                  key={mission.number}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 size={18} className="shrink-0 text-lime-deep" />
                    ) : isLocked ? (
                      <Lock size={16} className="shrink-0 text-ink/25" />
                    ) : (
                      <Circle size={16} className="shrink-0 text-ink/25" />
                    )}
                    <div>
                      <p
                        className={`text-sm font-semibold ${isLocked ? "text-ink/40" : "text-ink"}`}
                      >
                        Mission {mission.number} · {mission.title}
                      </p>
                      <p className="text-xs text-ink/45">{mission.subject}</p>
                    </div>
                  </div>
                  {mission.slug ? (
                    <Link
                      href={`/lesson/${mission.slug}`}
                      className="shrink-0 text-sm font-semibold text-ink/60 hover:text-ink"
                    >
                      {isDone ? "Review" : "Start"}
                    </Link>
                  ) : (
                    <span className="shrink-0 text-xs font-semibold text-ink/30">
                      Coming soon
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.section>

        <div className="mt-14">
          <p className="eyebrow text-ink/40">More tracks, coming soon</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {comingSoonTracks.map((track, i) => (
              <motion.button
                key={track.slug}
                type="button"
                onClick={() => setLockedTrack(track)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                className="flex flex-col items-start rounded-2xl border border-ink/10 bg-white/60 p-5 text-left transition-colors hover:border-ink/20"
              >
                <Lock size={16} className="text-ink/30" />
                <p className="mt-3 text-sm font-semibold text-ink/70">
                  {track.name}
                </p>
                <p className="mt-1 text-xs text-ink/40">{track.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      <Modal
        open={!!lockedTrack}
        onClose={() => setLockedTrack(null)}
        title={lockedTrack?.name ?? ""}
      >
        <p>
          We&apos;re starting with the {activeTrack.name} track. {lockedTrack?.name}{" "}
          is planned next — there&apos;s nothing to enroll in here yet.
        </p>
      </Modal>
    </div>
  );
}
