"use client";

import { useMemo, useState } from "react";
import Slider from "./Slider";

// Deterministic pseudo-random normals (Box–Muller over a seeded LCG).
function normals(n: number, seed = 7) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const out: number[] = [];
  while (out.length < n) {
    const u = rand() || 1e-9, v = rand();
    out.push(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
  }
  return out;
}
const Z = normals(600);

/** Shape a distribution and watch mean, median and spread respond. */
export default function DistributionExplorer({ onInteract }: { onInteract: () => void }) {
  const [mean, setMean] = useState(20);
  const [sd, setSd] = useState(4);
  const [skew, setSkew] = useState(false);

  const values = useMemo(
    () => Z.map((z) => (skew ? mean - sd + sd * Math.exp(z * 0.6) : mean + sd * z)),
    [mean, sd, skew],
  );
  const sorted = [...values].sort((a, b) => a - b);
  const m = values.reduce((a, b) => a + b, 0) / values.length;
  const median = (sorted[299] + sorted[300]) / 2;
  const std = Math.sqrt(values.reduce((a, v) => a + (v - m) ** 2, 0) / values.length);
  const within = values.filter((v) => Math.abs(v - m) <= std).length / values.length;

  const lo = 0, hi = 45, bins = 30, width = (hi - lo) / bins;
  const counts = Array(bins).fill(0);
  values.forEach((v) => {
    const i = Math.floor((v - lo) / width);
    if (i >= 0 && i < bins) counts[i]++;
  });
  const maxC = Math.max(...counts);
  const W = 480, H = 220, P = 24;
  const sx = (x: number) => P + ((x - lo) / (hi - lo)) * (W - 2 * P);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Histogram of simulated yields">
        <rect x={sx(m - std)} y={10} width={sx(m + std) - sx(m - std)} height={H - P - 10} fill="var(--color-lime)" opacity="0.18" />
        {counts.map((c, i) => (
          <rect key={i} x={sx(lo + i * width) + 1} y={H - P - (c / maxC) * (H - P - 20)} width={(W - 2 * P) / bins - 2} height={(c / maxC) * (H - P - 20)} fill="var(--color-ink)" opacity="0.55" />
        ))}
        <line x1={sx(m)} x2={sx(m)} y1={10} y2={H - P} stroke="var(--color-lime-deep)" strokeWidth="2.5" />
        <line x1={sx(median)} x2={sx(median)} y1={10} y2={H - P} stroke="#e5484d" strokeWidth="2" strokeDasharray="4 3" />
        <line x1={P} x2={W - P} y1={H - P} y2={H - P} stroke="var(--color-ink)" strokeOpacity="0.2" />
        {[0, 10, 20, 30, 40].map((t) => (
          <text key={t} x={sx(t)} y={H - 8} textAnchor="middle" className="fill-ink/45 font-mono text-[10px]">{t}</text>
        ))}
      </svg>
      <div className="space-y-5">
        <Slider label="centre (mean)" value={mean} min={10} max={30} onChange={(v) => { setMean(v); onInteract(); }} />
        <Slider label="spread (std)" value={sd} min={1} max={8} step={0.5} onChange={(v) => { setSd(v); onInteract(); }} />
        <label className="flex items-center gap-3 text-sm text-ink/70">
          <input type="checkbox" checked={skew} onChange={(e) => { setSkew(e.target.checked); onInteract(); }} className="h-4 w-4 accent-[var(--color-lime-deep)]" />
          Make it skewed (a long tail to the right)
        </label>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-lime-deep">mean</dt><dd className="font-mono text-ink">{m.toFixed(1)}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-[#e5484d]">median</dt><dd className="font-mono text-ink">{median.toFixed(1)}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">std</dt><dd className="font-mono text-ink">{std.toFixed(1)}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">within ±1 std</dt><dd className="font-mono text-ink">{Math.round(within * 100)}%</dd></div>
        </dl>
      </div>
    </div>
  );
}
