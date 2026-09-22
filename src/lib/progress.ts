"use client";

const STORAGE_KEY = "nurulabs:progress";

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
