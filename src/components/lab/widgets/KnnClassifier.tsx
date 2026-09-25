"use client";

import { useState } from "react";
import Slider from "./Slider";

// Illustrative fields on two scaled features (0–1): humidity and recent rain.
const pts: { x: number; y: number; c: 0 | 1 }[] = [
  [0.1, 0.2, 0], [0.15, 0.5, 0], [0.2, 0.3, 0], [0.25, 0.7, 0], [0.3, 0.15, 0], [0.32, 0.45, 0], [0.38, 0.6, 1], [0.4, 0.25, 0],
  [0.45, 0.8, 1], [0.48, 0.4, 0], [0.52, 0.55, 1], [0.55, 0.2, 0], [0.58, 0.72, 1], [0.6, 0.45, 0], [0.63, 0.88, 1], [0.66, 0.35, 1],
  [0.7, 0.6, 1], [0.72, 0.15, 0], [0.76, 0.78, 1], [0.8, 0.5, 1], [0.84, 0.3, 0], [0.87, 0.9, 1], [0.9, 0.65, 1], [0.93, 0.4, 1],
  [0.2, 0.85, 0], [0.35, 0.9, 1], [0.62, 0.05, 0], [0.5, 0.95, 1],
].map(([x, y, c]) => ({ x, y, c: c as 0 | 1 }));

/** Click anywhere to classify a new field by a vote of its k nearest neighbours. */
export default function KnnClassifier({ onInteract }: { onInteract: () => void }) {
  const [q, setQ] = useState({ x: 0.5, y: 0.5 });
  const [k, setK] = useState(5);
  const S = 300, P = 14;
  const nearest = [...pts]
    .map((p) => ({ ...p, d: Math.hypot(p.x - q.x, p.y - q.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k);
  const votes = nearest.filter((p) => p.c === 1).length;
  const pred = votes > k / 2 ? 1 : 0;
  const tie = votes === k / 2;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <svg
        viewBox={`0 0 ${S} ${S}`}
        className="w-full max-w-md cursor-crosshair rounded-2xl bg-paper ring-1 ring-ink/10"
        role="img"
        aria-label="Scatter of fields; click to place a new field"
        onClick={(e) => {
          const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          setQ({ x: Math.min(1, Math.max(0, ((e.clientX - r.left) / r.width * S - P) / (S - 2 * P))), y: Math.min(1, Math.max(0, 1 - ((e.clientY - r.top) / r.height * S - P) / (S - 2 * P))) });
          onInteract();
        }}
      >
        {nearest.map((p, i) => (
          <line key={i} x1={P + q.x * (S - 2 * P)} y1={P + (1 - q.y) * (S - 2 * P)} x2={P + p.x * (S - 2 * P)} y2={P + (1 - p.y) * (S - 2 * P)} stroke="var(--color-ink)" strokeOpacity="0.3" />
        ))}
        {pts.map((p, i) => (
          <circle key={i} cx={P + p.x * (S - 2 * P)} cy={P + (1 - p.y) * (S - 2 * P)} r="6" fill={p.c ? "#e5484d" : "var(--color-ink)"} opacity="0.8" />
        ))}
        <rect x={P + q.x * (S - 2 * P) - 8} y={P + (1 - q.y) * (S - 2 * P) - 8} width="16" height="16" rx="3" fill={tie ? "var(--color-mist)" : pred ? "#e5484d" : "var(--color-ink)"} stroke="var(--color-lime)" strokeWidth="3" />
        <text x={S - P} y={S - 3} textAnchor="end" className="fill-ink/45 text-[9px]">humidity →</text>
        <text x={P} y={P - 3} className="fill-ink/45 text-[9px]">rain ↑</text>
      </svg>
      <div className="space-y-5">
        <Slider label="k (neighbours that vote)" value={k} min={1} max={15} onChange={(v) => { setK(v); onInteract(); }} />
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="text-sm text-ink/60">Of the {k} nearest fields:</p>
          <p className="mt-1 font-mono text-sm text-ink">{votes} diseased · {k - votes} healthy</p>
          <p className="mt-3 font-display text-2xl font-semibold text-ink">
            {tie ? "A tie — use an odd k" : pred ? "Predict: diseased" : "Predict: healthy"}
          </p>
        </div>
        <p className="text-xs leading-relaxed text-ink/55">
          Click near the boundary between red and dark dots, then change k. Small k follows every local quirk; large k smooths it out. Distances only make sense if features are on similar scales.
        </p>
      </div>
    </div>
  );
}
