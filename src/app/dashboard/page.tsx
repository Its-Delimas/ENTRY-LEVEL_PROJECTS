"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Code2,
  ImageIcon,
  Lock,
  Network,
  PenLine,
  Search,
  Sprout,
  X,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import GreetingIllustration from "@/components/dashboard/GreetingIllustration";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import WeekBars from "@/components/dashboard/WeekBars";
import Logo from "@/components/landing/Logo";
import Modal from "@/components/ui/Modal";
import ProgressBar from "@/components/ui/ProgressBar";
import { tracks, activeTrack, type Track } from "@/lib/tracks";
import { getCompletedMissions, getActivityDates } from "@/lib/progress";

const missionIcons: Record<string, typeof Sprout> = {
  "01": Sprout,
  "15": Network,
  "30": ImageIcon,
};

// Only missions with a real, on-topic photo get one — everything else
// falls back to its subject icon rather than a mismatched stock image.
const missionThumbnails: Record<string, string> = {
  "01": "/images/study-session.jpg",
};

const stages = [
  { label: "Learn", icon: BookOpen },
  { label: "Example", icon: Code2 },
  { label: "Practice", icon: PenLine },
  { label: "Review", icon: ClipboardCheck },
];

export default function DashboardPage() {
  const [completed, setCompleted] = useState<Set<string> | null>(null);
  const [activeDates, setActiveDates] = useState<Set<string>>(new Set());
  const [lockedTrack, setLockedTrack] = useState<Track | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // localStorage isn't available during SSR, so progress has to be
    // read after mount rather than computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(getCompletedMissions());
    setActiveDates(getActivityDates());
  }, []);

  const liveMissions = activeTrack.missions.filter((m) => m.slug);
  const doneCount = completed
    ? liveMissions.filter((m) => completed.has(m.slug!)).length
    : 0;
  const trackProgress = liveMissions.length
    ? (doneCount / liveMissions.length) * 100
    : 0;
  const nextMission = liveMissions.find(
    (m) => completed && !completed.has(m.slug!),
  );
  const allLiveDone = completed !== null && !nextMission;
  const comingSoonTracks = tracks.filter((t) => t.status === "coming-soon");

  const filteredMissions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeTrack.missions;
    return activeTrack.missions.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.number.includes(q),
    );
  }, [query]);

  return (
    <div id="top" className="flex min-h-screen flex-col bg-cream md:flex-row">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4 md:hidden">
        <Logo />
        <Link href="/" className="text-sm font-medium text-ink/60">
          Home
        </Link>
      </header>

      <Sidebar />

      <main className="w-full flex-1 px-6 py-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold text-ink">
            Dashboard
          </h1>
          <label className="relative block w-full sm:w-72">
            <span className="sr-only">Search missions</span>
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
            />
            <input
              type="text"
              role="searchbox"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search missions"
              className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink/40 focus:border-ink/30 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink/40 hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </label>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between gap-4 rounded-3xl bg-ink p-7 text-white"
            >
              <div>
                <p className="eyebrow text-lime">{activeTrack.shortName} track</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Hands-on, one mission at a time.
                </h2>
                <p className="mt-2 max-w-sm text-sm text-white/55">
                  {allLiveDone
                    ? "You've finished every live mission. The next ones are being built."
                    : "Learn it, see it worked out, build it yourself, get reviewed."}
                </p>
                {nextMission?.slug && (
                  <Link
                    href={`/lesson/${nextMission.slug}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-2.5 text-sm font-semibold text-ink"
                  >
                    {doneCount === 0 ? "Start Mission" : "Continue"}{" "}
                    {nextMission.number}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
              <div className="hidden sm:block">
                <GreetingIllustration dark />
              </div>
            </motion.section>

            <section id="missions" className="scroll-mt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">
                    {activeTrack.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-ink/50">
                    {completed === null
                      ? "Loading progress…"
                      : `${doneCount} of ${liveMissions.length} live mission${liveMissions.length === 1 ? "" : "s"} complete`}
                  </p>
                </div>
                <div className="w-32">
                  <ProgressBar value={trackProgress} />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <AnimatePresence initial={false}>
                  {filteredMissions.map((mission) => {
                    const Icon = missionIcons[mission.number] ?? Sprout;
                    const thumbnail = missionThumbnails[mission.number];
                    const isLive = !!mission.slug;
                    const isDone = !!(
                      completed &&
                      mission.slug &&
                      completed.has(mission.slug)
                    );
                    const card = (
                      <div
                        className={`flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors ${
                          isLive
                            ? "bg-lime-soft hover:bg-lime-soft/70"
                            : "bg-white/70"
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className={`truncate text-sm font-semibold ${isLive ? "text-ink" : "text-ink/45"}`}
                          >
                            Mission {mission.number} · {mission.title}
                          </p>
                          <p className="mt-1 text-xs text-ink/50">
                            <span className="font-semibold text-ink/70">
                              {mission.subject}
                            </span>
                            {" · "}
                            {isDone
                              ? "Complete — open to review"
                              : isLive
                                ? "Live now"
                                : "Coming soon"}
                          </p>
                        </div>
                        <span
                          className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ${
                            isLive ? "bg-lime text-ink" : "bg-cream text-ink/30"
                          }`}
                        >
                          {thumbnail ? (
                            <Image
                              src={thumbnail}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : isLive ? (
                            <Icon size={18} />
                          ) : (
                            <Lock size={16} />
                          )}
                        </span>
                      </div>
                    );
                    return (
                      <motion.div
                        key={mission.number}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        {mission.slug ? (
                          <Link href={`/lesson/${mission.slug}`} className="block">
                            {card}
                          </Link>
                        ) : (
                          card
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filteredMissions.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center">
                    <p className="text-sm font-semibold text-ink">
                      No missions match &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-ink/50">
                      Try a mission number, a title, or a subject like
                      &ldquo;regression&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="mt-4 rounded-md border border-ink/15 px-4 py-2 text-xs font-semibold text-ink"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-ink">
                  How every mission runs
                </h2>
                <span className="text-xs text-ink/40">4 stages</span>
              </div>
              <ol className="mt-5 grid gap-3 sm:grid-cols-4">
                {stages.map((stage, i) => (
                  <li
                    key={stage.label}
                    className="flex items-center gap-3 rounded-2xl bg-cream p-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ink">
                      <stage.icon size={16} />
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      <span className="text-ink/35">{i + 1}.</span>{" "}
                      {stage.label}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <div className="min-w-0 space-y-6">
            <section
              id="activity"
              className="scroll-mt-6 rounded-3xl border border-ink/10 bg-white p-6"
            >
              <StreakCalendar activeDates={activeDates} />
            </section>

            <section className="rounded-3xl bg-ink p-6 text-white">
              <p className="font-display text-base font-semibold">
                Your progress
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-display text-2xl font-semibold">
                    {doneCount}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    Missions complete
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-display text-2xl font-semibold">
                    {Math.round(trackProgress)}%
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">Track progress</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-white/50">Days active this week</p>
                <div className="mt-3">
                  <WeekBars activeDates={activeDates} />
                </div>
              </div>
            </section>

            <section>
              <p className="eyebrow text-ink/40">More tracks, coming soon</p>
              <div className="mt-3 space-y-2">
                {comingSoonTracks.map((track) => (
                  <button
                    key={track.slug}
                    type="button"
                    onClick={() => setLockedTrack(track)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white/70 p-4 text-left transition-colors hover:bg-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream text-ink/30">
                      <Lock size={14} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink/70">
                        {track.name}
                      </p>
                      <p className="truncate text-xs text-ink/40">
                        {track.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
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
