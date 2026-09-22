"use client";

import { useMemo, useState } from "react";
import { Bot } from "lucide-react";
import type { ErrorHint } from "@/lib/lessons/rainfall-yield";

interface MentorPanelProps {
  conceptHints: string[];
  errorHints: ErrorHint[];
  lastError: string | null;
}

export default function MentorPanel({
  conceptHints,
  errorHints,
  lastError,
}: MentorPanelProps) {
  const [hintIndex, setHintIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const errorHint = useMemo(() => {
    if (!lastError) return null;
    const match = errorHints.find((h) =>
      new RegExp(h.pattern, "i").test(lastError),
    );
    return match?.hint ?? null;
  }, [lastError, errorHints]);

  const activeHint = errorHint ?? (revealed ? conceptHints[hintIndex] : null);

  function handleClick() {
    if (errorHint) {
      setRevealed(false);
      return;
    }
    if (revealed) {
      setHintIndex((i) => (i + 1) % conceptHints.length);
    } else {
      setRevealed(true);
    }
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Bot size={14} className="text-lime-deep" />
          <p className="eyebrow text-lime-deep">Mentor</p>
        </div>
        {errorHint && (
          <span className="rounded-md bg-lime-soft px-2.5 py-0.5 text-xs font-semibold text-lime-deep">
            responding to your error
          </span>
        )}
      </div>

      {activeHint ? (
        <p className="mt-3 text-sm leading-relaxed text-ink/80">
          {activeHint}
        </p>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-ink/45">
          Stuck? Your mentor won&apos;t hand you the answer, but it will
          point you at what to look at.
        </p>
      )}

      <button
        type="button"
        onClick={handleClick}
        className="mt-4 rounded-md border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
      >
        {errorHint
          ? "Dismiss"
          : revealed
            ? "Another hint"
            : "Get a hint"}
      </button>
    </div>
  );
}
