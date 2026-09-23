"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dateKey } from "@/lib/progress";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const leading = (first.getDay() + 6) % 7; // Monday-first
  const cells: (Date | null)[] = Array(leading).fill(null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function currentStreak(activeDates: Set<string>) {
  let streak = 0;
  const d = new Date();
  // A streak still counts if today hasn't been done yet but yesterday was.
  if (!activeDates.has(dateKey(d))) d.setDate(d.getDate() - 1);
  while (activeDates.has(dateKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export default function StreakCalendar({
  activeDates,
}: {
  activeDates: Set<string>;
}) {
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const cells = buildMonth(view.year, view.month);
  const todayKey = dateKey(today);
  const streak = currentStreak(activeDates);
  const isCurrentMonth =
    view.year === today.getFullYear() && view.month === today.getMonth();

  function shift(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-base font-semibold text-ink">
            Your streak
          </p>
          <p className="mt-0.5 text-xs text-ink/50">
            {streak === 0
              ? "Run some code today to start one."
              : `${streak} day${streak === 1 ? "" : "s"} in a row`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-ink/30 hover:text-ink"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-ink/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <p className="eyebrow mt-5 text-ink/60">{monthLabel}</p>

      <div className="mt-3 grid grid-cols-7 gap-y-1.5 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="pb-1 text-[10px] font-semibold uppercase text-ink/35">
            {d}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} />;
          const key = dateKey(date);
          const active = activeDates.has(key);
          const isToday = key === todayKey;
          const isFuture = key > todayKey;
          return (
            <span key={key} className="flex items-center justify-center">
              <span
                title={active ? `${key} — active` : key}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium ${
                  active
                    ? "bg-lime font-semibold text-ink"
                    : isToday
                      ? "ring-1 ring-ink text-ink"
                      : isFuture
                        ? "text-ink/20"
                        : "text-ink/60"
                }`}
              >
                {date.getDate()}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
