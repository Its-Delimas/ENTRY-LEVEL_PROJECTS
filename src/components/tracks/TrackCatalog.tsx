"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, Clock, Flag } from "lucide-react";
import { enrolledTrack, trackLabs, trackStats, tracks } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import ProgressBar from "@/components/ui/ProgressBar";
import EnrollAction from "./EnrollAction";

export default function TrackCatalog() {
  const progress = useProgress();
  const current = enrolledTrack(progress);

  return (
    <div className="mx-auto max-w-5xl">
      <p className="eyebrow text-lime-deep">Programmes</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
        {current ? "Tracks" : "Choose your track"}
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink/60">
        Nurulabs works like a programme, not a buffet. You enroll in one track, follow its syllabus
        milestone by milestone, and finish it before starting the next. New to code? Start with
        Python for AI — everything else builds on it.
      </p>

      <div className="mt-10 space-y-5">
        {tracks.map((track, i) => {
          const labs = trackLabs(track);
          const minutes = labs.reduce((s, l) => s + l.minutes, 0);
          const stats = trackStats(track, progress);
          const milestones = track.modules.filter((m) => m.milestone).length;
          const isCurrent = current?.slug === track.slug;
          const soon = track.status === "coming-soon";
          return (
            <motion.article
              key={track.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`grid overflow-hidden rounded-[28px] md:grid-cols-[280px_minmax(0,1fr)] ${
                isCurrent ? "bg-ink text-white" : soon ? "border border-dashed border-ink/15" : "bg-white ring-1 ring-ink/10"
              }`}
            >
              <div className={`relative min-h-44 ${soon ? "bg-mist/50" : "bg-mist"}`}>
                {track.cover ? (
                  <Image src={track.cover.src} alt={track.cover.alt} fill sizes="280px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center font-display text-5xl font-semibold text-ink/10">
                    {track.shortName}
                  </div>
                )}
                {isCurrent && (
                  <span className="absolute top-4 left-4 rounded-md bg-lime px-2.5 py-1 text-xs font-semibold text-ink">
                    Enrolled
                  </span>
                )}
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${isCurrent ? "bg-white/10 text-white/70" : "bg-cream text-ink/55"}`}>
                    {track.level}
                  </span>
                  {track.requires?.length ? (
                    <span className={`text-xs ${isCurrent ? "text-white/45" : "text-ink/40"}`}>
                      after {track.requires.map((r) => tracks.find((t) => t.slug === r)?.name).join(", ")}
                    </span>
                  ) : (
                    <span className={`text-xs ${isCurrent ? "text-white/45" : "text-ink/40"}`}>No experience needed</span>
                  )}
                </div>
                <h2 className={`mt-3 font-display text-2xl font-semibold ${soon ? "text-ink/45" : ""}`}>{track.name}</h2>
                <p className={`mt-2 max-w-xl text-sm leading-relaxed ${isCurrent ? "text-white/60" : soon ? "text-ink/40" : "text-ink/60"}`}>
                  {track.description}
                </p>

                {!soon && (
                  <dl className={`mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm ${isCurrent ? "text-white/60" : "text-ink/55"}`}>
                    <div className="inline-flex items-center gap-1.5"><BookOpen size={15} /> {labs.length} lab{labs.length === 1 ? "" : "s"}</div>
                    <div className="inline-flex items-center gap-1.5"><Flag size={15} /> {milestones} milestone{milestones === 1 ? "" : "s"}</div>
                    <div className="inline-flex items-center gap-1.5"><Clock size={15} /> ~{Math.max(1, Math.round(minutes / 60))} hrs hands-on</div>
                    <div className="inline-flex items-center gap-1.5"><BarChart3 size={15} /> {track.level}</div>
                  </dl>
                )}

                {isCurrent && (
                  <div className="mt-5 max-w-sm">
                    <ProgressBar value={stats.percent} dark />
                    <p className="mt-2 text-xs text-white/50">{stats.done} of {stats.total} labs complete</p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <EnrollAction track={track} progress={progress} dark={isCurrent} />
                  {!soon && (
                    <Link
                      href={`/tracks/${track.slug}`}
                      className={`text-sm font-semibold underline-offset-4 hover:underline ${isCurrent ? "text-white/70" : "text-ink/60"}`}
                    >
                      View syllabus
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
