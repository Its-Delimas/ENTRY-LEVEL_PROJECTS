"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { missions } from "@/lib/missions";
import { getCompletedMissions } from "@/lib/progress";

export default function DashboardPage() {
  const [completed, setCompleted] = useState<Set<string> | null>(null);

  useEffect(() => {
    // localStorage isn't available during SSR, so progress has to be
    // read after mount rather than computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(getCompletedMissions());
  }, []);

  const doneCount = completed
    ? missions.filter((m) => m.slug && completed.has(m.slug)).length
    : 0;

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
        <p className="eyebrow text-lime-deep">Your dashboard</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
          Missions
        </h1>
        <p className="mt-3 text-ink/60">
          {completed === null
            ? "Loading your progress…"
            : `${doneCount} of ${missions.length} missions complete.`}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => {
            const isDone = !!(
              completed &&
              mission.slug &&
              completed.has(mission.slug)
            );
            const isLocked = !mission.slug;
            return (
              <div
                key={mission.number}
                className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl font-semibold text-ink/15">
                    {mission.number}
                  </span>
                  {isDone && (
                    <span className="flex items-center gap-1 rounded-md bg-lime-soft px-2 py-1 text-xs font-semibold text-lime-deep">
                      <CheckCircle2 size={12} />
                      Complete
                    </span>
                  )}
                  {isLocked && (
                    <span className="flex items-center gap-1 rounded-md bg-cream px-2 py-1 text-xs font-semibold text-ink/40">
                      <Lock size={12} />
                      Coming soon
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                  {mission.title}
                </h2>
                <p className="mt-1 text-sm text-ink/50">{mission.subject}</p>

                <div className="mt-6">
                  {mission.slug ? (
                    <Link
                      href={`/lesson/${mission.slug}`}
                      className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      {isDone ? "Review again" : "Start mission"}
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span className="inline-block rounded-md border border-ink/10 px-4 py-2.5 text-sm font-semibold text-ink/30">
                      Not available yet
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
