"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, Lock } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Logo from "@/components/landing/Logo";
import GreetingIllustration from "@/components/dashboard/GreetingIllustration";
import StatTile from "@/components/dashboard/StatTile";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import Modal from "@/components/ui/Modal";
import ProgressBar from "@/components/ui/ProgressBar";
import { tracks, activeTrack, type Track } from "@/lib/tracks";
import { getCompletedMissions, getActivityDates } from "@/lib/progress";

export default function DashboardPage() {
  const [completed, setCompleted] = useState<Set<string> | null>(null);
  const [activeDates, setActiveDates] = useState<Set<string>>(new Set());
  const [lockedTrack, setLockedTrack] = useState<Track | null>(null);

  useEffect(() => {
    // localStorage isn't available during SSR, so progress has to be
    // read after mount rather than computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(getCompletedMissions());
    setActiveDates(getActivityDates());
  }, []);

  const doneCount = completed
    ? activeTrack.missions.filter((m) => m.slug && completed.has(m.slug))
        .length
    : 0;
  const trackMissionsWithSlug = activeTrack.missions.filter((m) => m.slug);
  const trackProgress = trackMissionsWithSlug.length
    ? (doneCount / trackMissionsWithSlug.length) * 100
    : 0;
  const nextMission =
    activeTrack.missions.find(
      (m) => m.slug && completed && !completed.has(m.slug),
    ) ?? activeTrack.missions.find((m) => m.slug);
  const comingSoonTracks = tracks.filter((t) => t.status === "coming-soon");

  return (
    <div className="flex min-h-screen flex-col bg-cream md:flex-row">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4 md:hidden">
        <Logo />
        <Link href="/" className="text-sm font-medium text-ink/60">
          Home
        </Link>
      </header>

      <Sidebar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-6"
            >
              <div>
                <p className="eyebrow text-lime-deep">Your courses</p>
                <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
                  Welcome to Nurulabs
                </h1>
                <p className="mt-1 text-sm text-ink/55">
                  Pick up where you left off, or start something new.
                </p>
              </div>
              <GreetingIllustration />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl border border-ink/10 bg-white p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-lime-deep">
                    {activeTrack.shortName}
                  </p>
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
                  <ProgressBar value={trackProgress} />
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
                          <CheckCircle2
                            size={18}
                            className="shrink-0 text-lime-deep"
                          />
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
                          <p className="text-xs text-ink/45">
                            {mission.subject}
                          </p>
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

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-ink/10 bg-white p-6"
            >
              <StreakCalendar activeDates={activeDates} />
            </motion.section>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Missions complete" value={doneCount} />
              <StatTile
                label="Track progress"
                value={`${Math.round(trackProgress)}%`}
              />
            </div>

            <div>
              <p className="eyebrow text-ink/40">More tracks, coming soon</p>
              <div className="mt-4 space-y-2">
                {comingSoonTracks.map((track, i) => (
                  <motion.button
                    key={track.slug}
                    type="button"
                    onClick={() => setLockedTrack(track)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    className="flex w-full items-center gap-3 rounded-xl border border-ink/10 bg-white/60 p-4 text-left transition-colors hover:border-ink/20"
                  >
                    <Lock size={14} className="shrink-0 text-ink/30" />
                    <div>
                      <p className="text-sm font-semibold text-ink/70">
                        {track.name}
                      </p>
                      <p className="mt-0.5 text-xs text-ink/40">
                        {track.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        open={!!lockedTrack}
        onClose={() => setLockedTrack(null)}
        title={lockedTrack?.name ?? ""}
      >
        <p>
          We&apos;re starting with the {activeTrack.name} track.{" "}
          {lockedTrack?.name} is planned next — there&apos;s nothing to
          enroll in here yet.
        </p>
      </Modal>
    </div>
  );
}
