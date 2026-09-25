"use client";

import { useState } from "react";
import Slider from "./Slider";

// Illustrative per-fold MAE for a model, slightly different on each slice.
const foldScores: Record<number, number[]> = {
  3: [2.1, 1.7, 2.6],
  4: [2.3, 1.6, 2.0, 2.5],
  5: [2.2, 1.5, 2.4, 1.9, 2.6],
  8: [2.4, 1.4, 2.1, 1.9, 2.8, 1.7, 2.2, 2.3],
};

/** Rotate which slice is the test set, and see why the average beats any single split. */
export default function KFold({ onInteract }: { onInteract: () => void }) {
  const [k, setK] = useState(5);
  const [fold, setFold] = useState(0);
  const scores = foldScores[k];
  const mean = scores.reduce((a, b) => a + b, 0) / k;
  const std = Math.sqrt(scores.reduce((a, s) => a + (s - mean) ** 2, 0) / k);
  const N = 40;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="eyebrow text-ink/40">k = number of folds</p>
          <div className="mt-2 flex gap-2">
            {[3, 4, 5, 8].map((v) => (
              <button key={v} type="button" onClick={() => { setK(v); setFold(0); onInteract(); }} className={`rounded-lg px-4 py-1.5 font-mono text-sm ring-1 ${k === v ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <Slider label="which fold is the test set" value={fold} min={0} max={k - 1} format={(v) => `fold ${v + 1}`} onChange={(v) => { setFold(v); onInteract(); }} />
      </div>

      <div>
        <p className="font-mono text-xs text-ink/50">40 farms, split into {k} folds</p>
        <div className="mt-2 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
          {Array.from({ length: N }, (_, i) => {
            const f = Math.floor((i * k) / N);
            return <span key={i} className={`h-10 rounded-[3px] ${f === fold ? "bg-[#e5484d]" : "bg-lime-deep/70"}`} title={`farm ${i} · fold ${f + 1}`} />;
          })}
        </div>
        <div className="mt-2 flex gap-4 text-xs text-ink/60">
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-lime-deep/70" /> train on these</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#e5484d]" /> test on these</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex h-32 items-end gap-2 rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
          {scores.map((s, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[10px] text-ink/60">{s}</span>
              <span className={`w-full rounded-t ${i === fold ? "bg-[#e5484d]" : "bg-ink/25"}`} style={{ height: `${(s / 3) * 70}px` }} />
              <span className="font-mono text-[10px] text-ink/40">{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-lime-soft p-5 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">Cross-validated error (MAE)</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">
            {mean.toFixed(2)} <span className="text-base font-normal text-ink/55">± {std.toFixed(2)}</span>
          </p>
          <p className="mt-2 text-xs text-ink/55">
            A single split could have told you anything from {Math.min(...scores)} to {Math.max(...scores)}.
          </p>
        </div>
      </div>
    </div>
  );
}
