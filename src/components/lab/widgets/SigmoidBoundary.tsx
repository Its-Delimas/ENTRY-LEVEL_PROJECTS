"use client";

import { useState } from "react";
import Slider from "./Slider";

// Illustrative fields: humidity (%) and whether blight was found.
const pts: [number, number][] = [
  [52, 0], [55, 0], [58, 0], [60, 0], [62, 0], [63, 1], [65, 0], [66, 0], [68, 0], [70, 0], [71, 1], [72, 0],
  [74, 0], [75, 1], [76, 0], [78, 1], [79, 0], [80, 1], [82, 1], [83, 0], [85, 1], [87, 1], [89, 1], [91, 1], [94, 1],
];
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

/** Logistic regression in one dimension: a weighted sum squashed into a probability. */
export default function SigmoidBoundary({ onInteract }: { onInteract: () => void }) {
  const [w, setW] = useState(0.1);
  const [b, setB] = useState(-6);
  const [threshold, setThreshold] = useState(0.5);

  const p = (x: number) => sigmoid(w * (x - 70) + b / 10);
  const correct = pts.filter(([x, y]) => (p(x) >= threshold ? 1 : 0) === y).length;
  const boundary = (() => {
    for (let x = 45; x <= 100; x += 0.25) if (p(x) >= threshold) return x;
    return null;
  })();

  const W = 480, H = 240, P = 30;
  const sx = (x: number) => P + ((x - 45) / 55) * (W - 2 * P);
  const sy = (v: number) => H - P - v * (H - 2 * P);
  const curve = Array.from({ length: 111 }, (_, i) => 45 + i * 0.5).map((x) => `${sx(x)},${sy(p(x))}`).join(" ");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Sigmoid probability curve over humidity">
        {boundary !== null && <rect x={sx(boundary)} y={P / 2} width={sx(100) - sx(boundary)} height={H - P - P / 2} fill="#e5484d" opacity="0.07" />}
        <line x1={P} x2={W - P} y1={sy(threshold)} y2={sy(threshold)} stroke="var(--color-ink)" strokeOpacity="0.25" strokeDasharray="4 4" />
        <polyline points={curve} fill="none" stroke="var(--color-lime-deep)" strokeWidth="3" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y) + (y ? 6 : -6)} r="5" fill={y ? "#e5484d" : "var(--color-ink)"} opacity="0.8" />
        ))}
        {boundary !== null && <line x1={sx(boundary)} x2={sx(boundary)} y1={P / 2} y2={H - P} stroke="#e5484d" strokeWidth="1.5" />}
        <text x={W - P} y={H - 8} textAnchor="end" className="fill-ink/50 text-[10px]">humidity % →</text>
        <text x={P} y={14} className="fill-ink/50 text-[10px]">P(diseased)</text>
      </svg>
      <div className="space-y-5">
        <Slider label="weight (steepness)" value={w} min={0} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(v) => { setW(v); onInteract(); }} />
        <Slider label="bias (shift)" value={b} min={-30} max={30} step={1} onChange={(v) => { setB(v); onInteract(); }} />
        <Slider label="decision threshold" value={threshold} min={0.1} max={0.9} step={0.05} format={(v) => v.toFixed(2)} onChange={(v) => { setThreshold(v); onInteract(); }} />
        <div className="rounded-2xl bg-lime-soft p-4 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">Fields above {boundary !== null ? `${boundary.toFixed(0)}% humidity` : "—"} are flagged as diseased.</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{correct} / {pts.length} correct</p>
        </div>
        <p className="text-xs text-ink/55">Red dots are diseased fields, dark dots healthy. The curve is the model&apos;s probability; the dashed line is the threshold where it says &ldquo;diseased&rdquo;.</p>
      </div>
    </div>
  );
}
