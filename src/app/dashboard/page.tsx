"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Hammer, Lock, Sparkles } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import WeekBars from "@/components/dashboard/WeekBars";
import ProgressBar from "@/components/ui/ProgressBar";
import { stepMeta } from "@/components/lab/StepRail";
import {
  continueTarget,
  isLabDone,
  isTrackUnlocked,
  missingPrerequisites,
  trackLabs,
  trackStats,
  tracks,
} from "@/lib/curriculum";
import { useActivityDates, useProgress, type Progress } from "@/lib/progress";

export default function DashboardPage() {
  const progress = useProgress();
  const activeDates = useActivityDates();
  const labsDone = progress ? Object.values(progress.labs).filter((l) => l.completedAt).length : 0;
  const stepsDone = progress ? Object.values(progress.labs).reduce((s, l) => s + l.steps.length, 0) : 0;
  const isNew = progress !== null && stepsDone === 0 && labsDone === 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          {isNew ? "Karibu to Nurulabs" : "Karibu back"}
        </h1>
        <p className="mt-1 text-sm text-ink/50">
          {isNew
            ? "Your lab is ready. Everything runs in your browser — no installs."
            : "Pick up exactly where you left off."}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-8">
            <ContinueCard progress={progress} />
            <PathOverview progress={progress} />
            <SkillMap progress={progress} />
          </div>

          <div className="min-w-0 space-y-6">
            <section className="rounded-3xl bg-ink p-6 text-white">
              <p className="font-display text-base font-semibold">Your progress</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-display text-2xl font-semibold">{labsDone}</p>
                  <p className="mt-0.5 text-xs text-white/50">Labs complete</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-display text-2xl font-semibold">{stepsDone}</p>
                  <p className="mt-0.5 text-xs text-white/50">Activities done</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-white/50">Days you ran code this week</p>
                <div className="mt-3">
                  <WeekBars activeDates={activeDates} />
                </div>
              </div>
            </section>
            <section className="rounded-3xl border border-ink/10 bg-white p-6">
              <StreakCalendar activeDates={activeDates} />
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ContinueCard({ progress }: { progress: Progress | null }) {
  if (!progress) return <div className="h-64 animate-pulse rounded-[28px] bg-ink/5" />;
  const target = continueTarget(progress);

  if (!target) {
    return (
      <section className="rounded-[28px] bg-ink p-8 text-white">
        <Sparkles className="text-lime" />
        <h2 className="mt-4 font-display text-2xl font-semibold">You&apos;ve finished every live lab.</h2>
        <p className="mt-2 max-w-md text-sm text-white/55">
          New labs are being built — NumPy, pandas, and your first classifier are next.
        </p>
      </section>
    );
  }

  const { track, lab } = target;
  const done = new Set(progress.labs[lab.slug]?.steps ?? []);
  const started = done.size > 0;
  const nextStep = lab.steps.find((s) => !done.has(s.id)) ?? lab.steps[0];
  const cover = lab.cover ?? track.cover;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid overflow-hidden rounded-[28px] bg-ink text-white md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
    >
      <div className="p-7 md:p-8">
        <p className="eyebrow text-lime">
          {started ? "Continue" : "Up next"} · {track.name}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">{lab.title}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">{lab.summary}</p>

        <div className="mt-6 flex gap-1.5">
          {lab.steps.map((s) => {
            const meta = stepMeta(s);
            const isDone = done.has(s.id);
            const isNext = s.id === nextStep.id;
            return (
              <span
                key={s.id}
                title={`${meta.label}: ${s.title}`}
                className={`flex h-8 flex-1 items-center justify-center rounded-lg ${
                  isDone ? "bg-lime text-ink" : isNext ? "bg-white text-ink" : "bg-white/10 text-white/40"
                }`}
              >
                <meta.icon size={13} />
              </span>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-white/50">
          {started ? "Next up: " : "Starts with: "}
          <span className="text-white/80">
            {stepMeta(nextStep).label} — {nextStep.title}
          </span>
        </p>

        <Link
          href={`/labs/${lab.slug}`}
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-sm font-semibold text-ink"
        >
          {started ? "Resume lab" : lab.kind === "project" ? "Start project" : `Start lab ${lab.number}`}
          <ArrowRight size={16} />
        </Link>
      </div>
      {cover && (
        <div className="relative hidden min-h-56 md:block">
          <Image src={cover.src} alt={cover.alt} fill sizes="360px" className="object-cover" priority />
        </div>
      )}
    </motion.section>
  );
}

function PathOverview({ progress }: { progress: Progress | null }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-ink">Your path</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tracks.map((track, i) => {
          const stats = trackStats(track, progress);
          const unlocked = isTrackUnlocked(track, progress);
          const soon = track.status === "coming-soon";
          const missing = missingPrerequisites(track, progress);
          const card = (
            <div
              className={`relative h-full rounded-2xl p-5 transition-colors ${
                soon
                  ? "border border-dashed border-ink/15"
                  : unlocked
                    ? "bg-white ring-1 ring-ink/10 hover:ring-ink/30"
                    : "bg-white/60 ring-1 ring-ink/5 hover:ring-ink/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-ink/35">STEP {i + 1}</span>
                {soon ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink/35">
                    <Hammer size={11} /> Coming soon
                  </span>
                ) : stats.complete ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-lime-soft px-2 py-0.5 text-[11px] font-semibold text-lime-deep">
                    <Check size={11} /> Done
                  </span>
                ) : !unlocked ? (
                  <Lock size={14} className="text-ink/30" />
                ) : null}
              </div>
              <p className={`mt-3 font-display text-base font-semibold ${soon ? "text-ink/40" : "text-ink"}`}>
                {track.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/45">
                {soon
                  ? track.tagline
                  : !unlocked && missing.length
                    ? `Unlocks after ${missing[0].name}`
                    : `${stats.done} of ${stats.total} labs`}
              </p>
              {!soon && (
                <div className="mt-4">
                  <ProgressBar value={stats.percent} />
                </div>
              )}
              {i < tracks.length - 1 && (
                <ChevronRight size={16} className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 rounded-full bg-cream text-ink/30 lg:block" />
              )}
            </div>
          );
          return soon ? (
            <div key={track.slug}>{card}</div>
          ) : (
            <Link key={track.slug} href={`/tracks/${track.slug}`}>
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SkillMap({ progress }: { progress: Progress | null }) {
  const active = tracks.filter((t) => t.status === "active");
  return (
    <section id="skills" className="rounded-3xl border border-ink/10 bg-white p-6 md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">What you can do</h2>
          <p className="mt-0.5 text-xs text-ink/50">
            Skills you&apos;ve proven by passing a lab&apos;s checks — not lessons you&apos;ve clicked through.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {active.map((track) => {
          const unlocked = isTrackUnlocked(track, progress);
          return (
            <div key={track.slug}>
              <p className="eyebrow flex items-center gap-2 text-ink/45">
                {!unlocked && <Lock size={11} />}
                {track.name}
              </p>
              <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {trackLabs(track).flatMap((lab) =>
                  lab.skills.map((skill) => {
                    const done = isLabDone(progress, lab.slug);
                    return (
                      <li key={lab.slug + skill} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                            done ? "bg-lime text-ink" : "border border-ink/15 text-ink/25"
                          }`}
                        >
                          {done ? <Check size={11} strokeWidth={3} /> : !unlocked ? <Lock size={9} /> : null}
                        </span>
                        <span className={done ? "text-ink" : "text-ink/40"}>{skill}</span>
                      </li>
                    );
                  }),
                )}
                {track.modules.flatMap((m) =>
                  (m.planned ?? []).map((p) => (
                    <li key={p.title} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-dashed border-ink/20" />
                      <span className="text-ink/30">{p.title} <span className="text-[11px]">· coming</span></span>
                    </li>
                  )),
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
