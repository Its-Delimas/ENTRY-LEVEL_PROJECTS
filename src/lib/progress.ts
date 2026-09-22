"use client";

const STORAGE_KEY = "nurulabs:progress";
const ACTIVITY_KEY = "nurulabs:activity";

export function getCompletedMissions(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function markMissionComplete(slug: string): void {
  try {
    const completed = getCompletedMissions();
    completed.add(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch {
    // localStorage unavailable (private mode, blocked) — progress just won't persist.
  }
}

export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayKey(): string {
  return dateKey(new Date());
}

/** Records that the student actually ran code today — a real activity signal. */
export function recordActivityToday(): void {
  try {
    const dates = getActivityDates();
    dates.add(todayKey());
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify([...dates]));
  } catch {
    // localStorage unavailable — streak just won't persist.
  }
}

export function getActivityDates(): Set<string> {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}
