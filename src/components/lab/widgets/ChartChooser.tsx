"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

type Kind = "line" | "bar" | "scatter" | "hist";

const questions: { q: string; answer: Kind; why: string }[] = [
  { q: "How did maize prices change month by month?", answer: "line", why: "Change over time → a line connects each month to the next." },
  { q: "Which county has the highest average yield?", answer: "bar", why: "Comparing categories → bars, one per county." },
  { q: "Do farms with more rain get bigger harvests?", answer: "scatter", why: "Relationship between two numbers → a scatter plot, one dot per farm." },
  { q: "How are yields spread out — mostly similar, or all over?", answer: "hist", why: "Distribution of one number → a histogram of how many farms fall in each range." },
];

const labels: Record<Kind, string> = { line: "Line", bar: "Bar", scatter: "Scatter", hist: "Histogram" };

function Mini({ kind }: { kind: Kind }) {
  const s = "var(--color-lime-deep)";
  return (
    <svg viewBox="0 0 120 70" className="h-16 w-full">
      <line x1="8" y1="62" x2="116" y2="62" stroke="var(--color-ink)" strokeOpacity="0.2" />
      {kind === "line" && <polyline points="10,50 30,44 50,30 70,34 90,18 110,22" fill="none" stroke={s} strokeWidth="2.5" />}
      {kind === "bar" && [18, 42, 30, 52].map((h, i) => <rect key={i} x={14 + i * 26} y={62 - h} width="16" height={h} rx="2" fill={s} />)}
      {kind === "scatter" &&
        [[14, 50], [26, 46], [38, 40], [48, 42], [60, 32], [72, 30], [84, 22], [98, 20], [108, 14]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={s} />
        ))}
      {kind === "hist" && [8, 18, 34, 46, 30, 14, 6].map((h, i) => <rect key={i} x={10 + i * 15} y={62 - h} width="14" height={h} fill={s} />)}
    </svg>
  );
}

/** Match each question to the chart that answers it. */
export default function ChartChooser({ onInteract }: { onInteract: () => void }) {
  const [picks, setPicks] = useState<(Kind | null)[]>(questions.map(() => null));

  return (
    <div className="space-y-3">
      {questions.map((item, qi) => {
        const pick = picks[qi];
        const right = pick === item.answer;
        return (
          <div key={item.q} className="rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
            <p className="font-medium text-ink">{item.q}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.keys(labels) as Kind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    setPicks((p) => p.map((v, i) => (i === qi ? k : v)));
                    onInteract();
                  }}
                  className={`rounded-xl p-2 text-xs font-semibold ring-1 transition-colors ${
                    pick === k ? (right ? "bg-lime-soft ring-lime-deep/40" : "bg-danger-soft ring-danger/30") : "bg-cream ring-ink/5 hover:ring-ink/25"
                  }`}
                >
                  <Mini kind={k} />
                  <span className="text-ink/70">{labels[k]}</span>
                </button>
              ))}
            </div>
            {pick && (
              <p className={`mt-3 flex items-start gap-2 text-sm ${right ? "text-ink/75" : "text-danger"}`}>
                {right ? <Check size={15} className="mt-0.5 shrink-0 text-lime-deep" /> : <X size={15} className="mt-0.5 shrink-0" />}
                {right ? item.why : `Not quite — a ${labels[pick].toLowerCase()} chart doesn't answer this well. Think about what kind of comparison the question asks for.`}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
