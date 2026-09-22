"use client";

import { Check } from "lucide-react";

export type Stage = "learn" | "example" | "practice" | "review";

const stages: { id: Stage; label: string }[] = [
  { id: "learn", label: "Learn" },
  { id: "example", label: "Example" },
  { id: "practice", label: "Practice" },
  { id: "review", label: "Review" },
];

export default function LessonStepper({
  current,
  unlocked,
  onSelect,
}: {
  current: Stage;
  unlocked: Set<Stage>;
  onSelect: (stage: Stage) => void;
}) {
  return (
    <ol className="flex items-center gap-1">
      {stages.map((stage, i) => {
        const isUnlocked = unlocked.has(stage.id);
        const isCurrent = current === stage.id;
        const isDone =
          stages.findIndex((s) => s.id === current) > i && isUnlocked;
        return (
          <li key={stage.id} className="flex items-center gap-1">
            {i > 0 && <span className="h-px w-4 bg-ink/15" aria-hidden />}
            <button
              type="button"
              disabled={!isUnlocked}
              onClick={() => onSelect(stage.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                isCurrent
                  ? "bg-ink text-white"
                  : isUnlocked
                    ? "text-ink/60 hover:bg-cream"
                    : "cursor-not-allowed text-ink/25"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                  isDone
                    ? "bg-lime text-ink"
                    : isCurrent
                      ? "bg-white text-ink"
                      : "bg-ink/10 text-ink/40"
                }`}
              >
                {isDone ? <Check size={10} strokeWidth={3} /> : i + 1}
              </span>
              {stage.label}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
