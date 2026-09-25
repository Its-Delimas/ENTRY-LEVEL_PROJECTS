"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Hammer, Lock } from "lucide-react";
import type { Lab, Track } from "@/lib/curriculum/types";
import {
  getLab,
  isLabDone,
  isTrackUnlocked,
  labAccess,
  missingPrerequisites,
  trackLabs,
  trackStats,
} from "@/lib/curriculum";
import { useProgress, type Progress } from "@/lib/progress";
import ProgressBar from "@/components/ui/ProgressBar";
import { stepMeta } from "@/components/lab/StepRail";

export default function TrackView({ track }: { track: Track }) {
  const progress = useProgress();
  const stats = trackStats(track, progress);
  const unlocked = isTrackUnlocked(track, progress);
  const missing = missingPrerequisites(track, progress);
  const minutes = trackLabs(track).reduce((s, l) => s + l.minutes, 0);
  const next = stats.next;
  const nextStarted = next && progress?.labs[next.slug]?.steps.length;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <section className="grid overflow-hidden rounded-[28px] bg-ink text-white md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="p-7 md:p-10">
          <p className="eyebrow text-lime">Track</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight">
            {track.name}
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-white/60">{track.description}</p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-white/40">Labs</dt>
              <dd className="mt-0.5 font-display text-xl font-semibold">{stats.total}</dd>
            </div>
            <div>
              <dt className="text-white/40">Hands-on time</dt>
              <dd className="mt-0.5 font-display text-xl font-semibold">~{Math.round(minutes / 60)} hrs</dd>
            </div>
            <div>
              <dt className="text-white/40">Complete</dt>
              <dd className="mt-0.5 font-display text-xl font-semibold">{progress ? `${stats.percent}%` : "—"}</dd>
            </div>
          </dl>

          <div className="mt-6 max-w-sm">
            <ProgressBar value={stats.percent} dark />
          </div>

          {unlocked && next && (
            <Link
              href={`/labs/${next.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-sm font-semibold text-ink"
            >
              {nextStarted ? "Continue" : stats.done === 0 ? "Start" : "Next"}: {next.title}
              <ArrowRight size={16} />
            </Link>
          )}
          {unlocked && stats.complete && (
            <p className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime/15 px-4 py-2.5 text-sm font-semibold text-lime">
              <Check size={16} /> Track complete
            </p>
          )}
        </div>
        {track.cover && (
          <div className="relative min-h-56">
            <Image src={track.cover.src} alt={track.cover.alt} fill priority sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
          </div>
        )}
      </section>

      {!unlocked && missing.length > 0 && (
        <PrerequisiteBanner track={missing[0]} progress={progress} />
      )}

      {/* Path */}
      <div className="mt-12 space-y-12">
        {track.modules.map((mod, mi) => {
          const labs = mod.labs.map(getLab).filter((l): l is Lab => !!l);
          return (
            <section key={mod.slug}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold text-ink/35">
                  {String(mi + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">{mod.title}</h2>
                  <p className="mt-0.5 text-sm text-ink/50">{mod.summary}</p>
                </div>
              </div>

              <ol className="relative mt-5 space-y-3 pl-8 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-ink/10">
                {labs.map((lab, li) => (
                  <motion.li
                    key={lab.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: mi * 0.08 + li * 0.05 }}
                    className="relative"
                  >
                    <LabCard lab={lab} progress={progress} trackUnlocked={unlocked} isNext={next?.slug === lab.slug} />
                  </motion.li>
                ))}
                {mod.planned?.map((p) => (
                  <li key={p.title} className="relative">
                    <span className="absolute top-5 -left-8 flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-ink/25 bg-cream" />
                    <div className="rounded-2xl border border-dashed border-ink/15 p-5">
                      <div className="flex items-center gap-2">
                        <p className="font-display text-base font-semibold text-ink/45">{p.title}</p>
                        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-ink/40">
                          <Hammer size={11} /> Being built
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink/40">{p.summary}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function LabCard({
  lab,
  progress,
  trackUnlocked,
  isNext,
}: {
  lab: Lab;
  progress: Progress | null;
  trackUnlocked: boolean;
  isNext: boolean;
}) {
  const done = isLabDone(progress, lab.slug);
  const open = trackUnlocked && labAccess(lab.slug, progress).open;
  const stepsDone = progress?.labs[lab.slug]?.steps.length ?? 0;
  const kinds = lab.steps.map(stepMeta);
  const isProject = lab.kind === "project";

  const node = (
    <span
      className={`absolute top-5 -left-8 flex h-6 w-6 items-center justify-center rounded-full ${
        done
          ? "bg-lime-deep text-white"
          : isNext && open
            ? "bg-ink text-lime ring-4 ring-lime/40"
            : "border border-ink/15 bg-white text-ink/30"
      }`}
    >
      {done ? <Check size={13} strokeWidth={3} /> : !open ? <Lock size={11} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    </span>
  );

  const body = (
    <div
      className={`group flex gap-5 overflow-hidden rounded-2xl p-5 transition-all ${
        isProject ? "bg-ink text-white" : "bg-white ring-1 ring-ink/10"
      } ${open ? "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]" : "opacity-60"} ${
        isNext && open && !isProject ? "ring-2 ring-ink" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={`font-mono text-xs font-semibold ${isProject ? "text-lime" : "text-ink/40"}`}>
            {isProject ? "PROJECT" : `LAB ${lab.number}`}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs ${isProject ? "text-white/45" : "text-ink/40"}`}>
            <Clock size={11} /> {lab.minutes} min
          </span>
          {done && (
            <span className="rounded-md bg-lime-soft px-2 py-0.5 text-[11px] font-semibold text-lime-deep">Complete</span>
          )}
          {!done && stepsDone > 0 && (
            <span className={`text-[11px] font-semibold ${isProject ? "text-lime" : "text-lime-deep"}`}>
              {stepsDone}/{lab.steps.length} steps
            </span>
          )}
        </div>
        <h3 className={`mt-2 font-display text-lg font-semibold ${isProject ? "text-white" : "text-ink"}`}>
          {lab.title}
        </h3>
        <p className={`mt-1 text-sm leading-relaxed ${isProject ? "text-white/60" : "text-ink/55"}`}>
          {lab.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {kinds.map((k, i) => (
            <span
              key={i}
              title={k.label}
              className={`flex h-6 w-6 items-center justify-center rounded-md ${
                i < stepsDone || done
                  ? "bg-lime text-ink"
                  : isProject
                    ? "bg-white/10 text-white/50"
                    : "bg-cream text-ink/45"
              }`}
            >
              <k.icon size={12} />
            </span>
          ))}
          {open && (
            <span
              className={`ml-auto inline-flex items-center gap-1 text-sm font-semibold ${
                isProject ? "text-lime" : "text-ink"
              }`}
            >
              {done ? "Review" : stepsDone ? "Continue" : "Start"}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </div>
      {lab.cover && (
        <div className="relative hidden w-40 shrink-0 overflow-hidden rounded-xl sm:block">
          <Image src={lab.cover.src} alt="" fill sizes="160px" className="object-cover" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {node}
      {open ? (
        <Link href={`/labs/${lab.slug}`} className="block">
          {body}
        </Link>
      ) : (
        body
      )}
    </>
  );
}

function PrerequisiteBanner({ track, progress }: { track: Track; progress: Progress | null }) {
  const stats = trackStats(track, progress);
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 sm:flex-row sm:items-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-lime">
        <Lock size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-semibold text-ink">Unlocks after {track.name}</p>
        <p className="mt-1 text-sm text-ink/55">
          Every lab here assumes you can write Python on your own. You&apos;re {stats.done} of {stats.total} labs in.
        </p>
        <div className="mt-3 max-w-xs">
          <ProgressBar value={stats.percent} />
        </div>
      </div>
      <Link
        href={`/tracks/${track.slug}`}
        className="inline-flex shrink-0 items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white"
      >
        Go to {track.shortName}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
