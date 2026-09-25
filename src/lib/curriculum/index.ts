import type { Lab, Track } from "./types";
import type { Progress } from "@/lib/progress";
import { tracks } from "./tracks";
import { allLabs } from "./labs";

export { tracks };
export type * from "./types";

const labsBySlug = new Map(allLabs.map((l) => [l.slug, l]));

export function getLab(slug: string): Lab | undefined {
  return labsBySlug.get(slug);
}

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

/** All built labs of a track, in path order. */
export function trackLabs(track: Track): Lab[] {
  return track.modules.flatMap((m) =>
    m.labs.map((s) => labsBySlug.get(s)).filter((l): l is Lab => !!l),
  );
}

export function trackOfLab(slug: string): Track | undefined {
  return tracks.find((t) => t.modules.some((m) => m.labs.includes(slug)));
}

export function isLabDone(progress: Progress | null, slug: string) {
  return !!progress?.labs[slug]?.completedAt;
}

export function trackStats(track: Track, progress: Progress | null) {
  const labs = trackLabs(track);
  const done = labs.filter((l) => isLabDone(progress, l.slug)).length;
  return {
    total: labs.length,
    done,
    percent: labs.length ? Math.round((done / labs.length) * 100) : 0,
    complete: labs.length > 0 && done === labs.length,
    next: labs.find((l) => !isLabDone(progress, l.slug)),
  };
}

/** Tracks listed in `requires` that aren't finished yet. */
export function missingPrerequisites(track: Track, progress: Progress | null): Track[] {
  return (track.requires ?? [])
    .map(getTrack)
    .filter((t): t is Track => !!t && !trackStats(t, progress).complete);
}

export function isTrackUnlocked(track: Track, progress: Progress | null) {
  return track.status === "active" && missingPrerequisites(track, progress).length === 0;
}

/**
 * A lab is open when its track is unlocked and every lab before it on the
 * path is done. Returns the lab that has to come first when it isn't.
 */
export function labAccess(
  slug: string,
  progress: Progress | null,
): { open: true } | { open: false; reason: "track"; tracks: Track[] } | { open: false; reason: "order"; first: Lab } {
  const track = trackOfLab(slug);
  if (!track) return { open: true };
  const missing = missingPrerequisites(track, progress);
  if (missing.length) return { open: false, reason: "track", tracks: missing };
  const labs = trackLabs(track);
  const idx = labs.findIndex((l) => l.slug === slug);
  const firstUndone = labs.slice(0, idx).find((l) => !isLabDone(progress, l.slug));
  return firstUndone ? { open: false, reason: "order", first: firstUndone } : { open: true };
}

/** The lab after this one on its track's path, if any. */
export function nextLabAfter(slug: string): Lab | undefined {
  const track = trackOfLab(slug);
  if (!track) return undefined;
  const labs = trackLabs(track);
  const idx = labs.findIndex((l) => l.slug === slug);
  return labs[idx + 1];
}

/** The learner's single best next action across all tracks. */
export function continueTarget(progress: Progress | null) {
  for (const track of tracks) {
    if (!isTrackUnlocked(track, progress)) continue;
    const next = trackStats(track, progress).next;
    if (next) return { track, lab: next };
  }
  return undefined;
}
