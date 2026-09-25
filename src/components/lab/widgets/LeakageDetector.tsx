"use client";

import { useState } from "react";
import { AlertTriangle, Check, Clock } from "lucide-react";

const columns = [
  { name: "humidity_pct", when: "Known before — from a weather sensor", leak: false },
  { name: "rain_7d_mm", when: "Known before — last week's rain", leak: false },
  { name: "variety", when: "Known before — chosen at planting", leak: false },
  { name: "plant_age_days", when: "Known before — from the planting date", leak: false },
  { name: "fungicide_after", when: "Recorded AFTER an agronomist diagnosed blight", leak: true },
];

// Cross-validated accuracies measured on the course dataset (logistic regression).
const HONEST = 0.815;
const LEAKY = 0.97;

/** Include a column recorded after the fact and watch the score become too good to be true. */
export default function LeakageDetector({ onInteract }: { onInteract: () => void }) {
  const [included, setIncluded] = useState<Set<string>>(new Set(columns.filter((c) => !c.leak).map((c) => c.name)));
  const leaking = included.has("fungicide_after");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <ul className="space-y-2">
        {columns.map((c) => {
          const on = included.has(c.name);
          return (
            <li key={c.name}>
              <label className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 ring-1 ${on ? (c.leak ? "bg-danger-soft ring-danger/30" : "bg-paper ring-ink/15") : "bg-cream ring-ink/5"}`}>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => {
                    setIncluded((s) => {
                      const n = new Set(s);
                      if (n.has(c.name)) n.delete(c.name);
                      else n.add(c.name);
                      return n;
                    });
                    onInteract();
                  }}
                  className="mt-1 h-4 w-4 accent-[var(--color-ink)]"
                />
                <span>
                  <span className="font-mono text-sm text-ink">{c.name}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink/55">
                    <Clock size={11} /> {c.when}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="space-y-3">
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="text-xs text-ink/50">Cross-validated accuracy in the lab</p>
          <p className="font-display text-4xl font-semibold text-ink">{Math.round((leaking ? LEAKY : HONEST) * 100)}%</p>
        </div>
        <div className={`rounded-2xl p-5 ${leaking ? "bg-danger-soft" : "bg-lime-soft ring-1 ring-lime-deep/20"}`}>
          <p className="text-xs text-ink/50">Accuracy when used on a new field, before anyone has looked at it</p>
          <p className="font-display text-4xl font-semibold text-ink">{leaking ? "?" : `≈${Math.round(HONEST * 100)}%`}</p>
          <p className="mt-2 flex items-start gap-2 text-sm text-ink/75">
            {leaking ? <AlertTriangle size={15} className="mt-0.5 shrink-0 text-danger" /> : <Check size={15} className="mt-0.5 shrink-0 text-lime-deep" />}
            {leaking
              ? "It can't be used at all: fungicide_after doesn't exist yet when you need the prediction. The 97% was the model reading the answer key."
              : "Every input exists at prediction time, so the lab score is an honest preview of real use."}
          </p>
        </div>
        <p className="text-xs text-ink/50">Accuracies measured on the course dataset with logistic regression.</p>
      </div>
    </div>
  );
}
