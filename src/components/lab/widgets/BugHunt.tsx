"use client";

import { useState } from "react";
import { Bug, Check, StepForward, RotateCcw } from "lucide-react";
import RichText from "../RichText";

const code = [
  "def average(values):",
  "    total = 0",
  "    for v in values:",
  "        total = v",
  "    return total / len(values)",
  "",
  "print(average([10, 20, 30]))",
];

// Execution trace: which line runs and what the variables hold afterwards.
const trace: { line: number; vars: Record<string, string> }[] = [
  { line: 7, vars: {} },
  { line: 1, vars: { values: "[10, 20, 30]" } },
  { line: 2, vars: { values: "[10, 20, 30]", total: "0" } },
  { line: 3, vars: { values: "[10, 20, 30]", total: "0", v: "10" } },
  { line: 4, vars: { values: "[10, 20, 30]", total: "10", v: "10" } },
  { line: 3, vars: { values: "[10, 20, 30]", total: "10", v: "20" } },
  { line: 4, vars: { values: "[10, 20, 30]", total: "20", v: "20" } },
  { line: 3, vars: { values: "[10, 20, 30]", total: "20", v: "30" } },
  { line: 4, vars: { values: "[10, 20, 30]", total: "30", v: "30" } },
  { line: 5, vars: { values: "[10, 20, 30]", total: "30", v: "30" } },
  { line: 7, vars: { output: "10.0   (expected 20.0)" } },
];

const BUG_LINE = 4;

/** Step through a buggy function, watch the variables, and click the line that's wrong. */
export default function BugHunt({ onInteract }: { onInteract: () => void }) {
  const [t, setT] = useState(0);
  const [guess, setGuess] = useState<number | null>(null);
  const cur = trace[t];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <div className="overflow-hidden rounded-3xl bg-code">
          <pre className="p-5 font-mono text-[13px] leading-7 text-white/85">
            {code.map((c, i) => {
              const n = i + 1;
              const running = cur.line === n;
              const picked = guess === n;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!c}
                  onClick={() => {
                    setGuess(n);
                    onInteract();
                  }}
                  className={`block w-full rounded-md px-2 text-left transition-colors ${
                    picked
                      ? n === BUG_LINE
                        ? "bg-lime/25 ring-1 ring-lime"
                        : "bg-[#ff8a8a]/20 ring-1 ring-[#ff8a8a]/60"
                      : running
                        ? "bg-white/10 shadow-[inset_3px_0_0_var(--color-lime)]"
                        : "hover:bg-white/5"
                  }`}
                >
                  <span className="mr-4 inline-block w-4 text-right text-white/25">{n}</span>
                  <span className="whitespace-pre">{c || " "}</span>
                </button>
              );
            })}
          </pre>
          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <button
              type="button"
              onClick={() => {
                setT((x) => Math.min(x + 1, trace.length - 1));
                onInteract();
              }}
              disabled={t === trace.length - 1}
              className="inline-flex items-center gap-1.5 rounded-md bg-lime px-3.5 py-1.5 text-xs font-semibold text-onlime disabled:opacity-30"
            >
              <StepForward size={13} /> Step
            </button>
            <button
              type="button"
              onClick={() => setT(0)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-white/50 hover:bg-white/5"
            >
              <RotateCcw size={12} /> Restart
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-ink/55">Step through, then click the line you think is the bug.</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="eyebrow text-ink/40">Variables right now</p>
          <dl className="mt-3 space-y-1.5 font-mono text-sm">
            {Object.entries(cur.vars).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-lime-deep">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
            {Object.keys(cur.vars).length === 0 && <p className="text-ink/40">Nothing yet — press Step.</p>}
          </dl>
        </div>
        {guess !== null && (
          <div
            className={`flex gap-3 rounded-2xl p-5 text-sm leading-relaxed ${
              guess === BUG_LINE ? "bg-lime-soft text-ink" : "bg-danger-soft text-ink"
            }`}
          >
            {guess === BUG_LINE ? <Check size={17} className="mt-0.5 shrink-0 text-lime-deep" /> : <Bug size={17} className="mt-0.5 shrink-0 text-danger" />}
            <p>
              <RichText
                text={
                  guess === BUG_LINE
                    ? "Found it. `total = v` replaces the total instead of adding to it — watch total jump 10 → 20 → 30. It should be `total = total + v`."
                    : `Line ${guess} runs fine. Step again and watch how \`total\` changes each pass — does it grow the way a running total should?`
                }
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
