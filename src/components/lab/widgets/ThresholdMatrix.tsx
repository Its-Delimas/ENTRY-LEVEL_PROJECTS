"use client";

import { useState } from "react";
import Slider from "./Slider";

// 40 fields: the model's predicted probability of disease, and the truth.
const cases: [number, number][] = [
  [0.95, 1], [0.91, 1], [0.88, 1], [0.84, 0], [0.8, 1], [0.76, 1], [0.72, 0], [0.7, 1], [0.66, 1], [0.62, 0],
  [0.58, 1], [0.55, 0], [0.51, 1], [0.48, 0], [0.45, 0], [0.42, 1], [0.4, 0], [0.37, 0], [0.34, 1], [0.31, 0],
  [0.29, 0], [0.27, 0], [0.25, 1], [0.22, 0], [0.2, 0], [0.18, 0], [0.16, 0], [0.15, 0], [0.13, 0], [0.12, 1],
  [0.1, 0], [0.09, 0], [0.08, 0], [0.07, 0], [0.06, 0], [0.05, 0], [0.04, 0], [0.03, 0], [0.02, 0], [0.01, 0],
];

function counts(t: number) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  cases.forEach(([p, y]) => {
    const pred = p >= t;
    if (pred && y) tp++;
    else if (pred) fp++;
    else if (y) fn++;
    else tn++;
  });
  return { tp, fp, fn, tn };
}

/** Move the threshold and watch the confusion matrix, precision and recall trade off. */
export default function ThresholdMatrix({ onInteract }: { onInteract: () => void }) {
  const [t, setT] = useState(0.5);
  const { tp, fp, fn, tn } = counts(t);
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const acc = (tp + tn) / cases.length;
  const roc = Array.from({ length: 101 }, (_, i) => {
    const c = counts(1 - i / 100);
    return [c.fp / (c.fp + c.tn), c.tp / (c.tp + c.fn)];
  });
  const S = 150;

  const cell = (label: string, n: number, cls: string) => (
    <div className={`rounded-xl p-3 text-center ${cls}`}>
      <p className="font-display text-2xl font-semibold">{n}</p>
      <p className="text-[11px] opacity-70">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <Slider label="flag as diseased when probability ≥" value={t} min={0.05} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(v) => { setT(v); onInteract(); }} />
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
        <div>
          <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-sm">
            <span />
            <span className="text-center text-xs font-semibold text-ink/50">predicted diseased</span>
            <span className="text-center text-xs font-semibold text-ink/50">predicted healthy</span>
            <span className="self-center text-xs font-semibold text-ink/50">actually diseased</span>
            {cell("true positives", tp, "bg-lime-soft text-ink ring-1 ring-lime-deep/20")}
            {cell("missed (false negatives)", fn, "bg-danger-soft text-ink")}
            <span className="self-center text-xs font-semibold text-ink/50">actually healthy</span>
            {cell("false alarms (false positives)", fp, "bg-danger-soft text-ink")}
            {cell("true negatives", tn, "bg-paper text-ink ring-1 ring-ink/10")}
          </div>
        </div>
        <svg viewBox={`0 0 ${S + 20} ${S + 20}`} className="mx-auto w-40" role="img" aria-label="ROC curve">
          <rect x="10" y="10" width={S} height={S} fill="var(--color-paper)" stroke="var(--color-ink)" strokeOpacity="0.15" />
          <line x1="10" y1={S + 10} x2={S + 10} y2="10" stroke="var(--color-ink)" strokeOpacity="0.15" strokeDasharray="3 3" />
          <polyline points={roc.map(([x, y]) => `${10 + x * S},${10 + (1 - y) * S}`).join(" ")} fill="none" stroke="var(--color-lime-deep)" strokeWidth="2.5" />
          <circle cx={10 + (fp / (fp + tn)) * S} cy={10 + (1 - recall) * S} r="5" fill="#e5484d" />
          <text x="12" y={S + 19} className="fill-ink/45 text-[8px]">false alarm rate →</text>
        </svg>
        <dl className="grid grid-cols-3 gap-2 text-center text-sm md:grid-cols-1">
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">precision</dt><dd className="font-mono text-lg text-ink">{precision.toFixed(2)}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">recall</dt><dd className="font-mono text-lg text-ink">{recall.toFixed(2)}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">accuracy</dt><dd className="font-mono text-lg text-ink">{acc.toFixed(2)}</dd></div>
        </dl>
      </div>
    </div>
  );
}
