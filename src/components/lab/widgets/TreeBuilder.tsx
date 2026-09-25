"use client";

import { useState } from "react";
import Slider from "./Slider";

// Illustrative fields: humidity (%), plant age (days), diseased?
const pts: [number, number, number][] = [
  [55, 30, 0], [58, 90, 0], [60, 50, 0], [62, 110, 0], [64, 70, 0], [66, 40, 0], [68, 100, 1], [70, 60, 0],
  [72, 85, 1], [73, 30, 0], [75, 115, 1], [76, 45, 0], [78, 95, 1], [79, 55, 0], [80, 75, 1], [82, 105, 1],
  [83, 35, 0], [85, 65, 1], [86, 90, 1], [88, 50, 1], [90, 110, 1], [92, 40, 0], [94, 80, 1], [96, 60, 1],
];

type Feat = "humidity" | "age";
const val = (p: (typeof pts)[number], f: Feat) => (f === "humidity" ? p[0] : p[1]);

function gini(group: typeof pts) {
  if (!group.length) return 0;
  const p = group.filter((g) => g[2] === 1).length / group.length;
  return 1 - p * p - (1 - p) * (1 - p);
}

/** Choose a question to split the fields on, and see how pure each side becomes. */
export default function TreeBuilder({ onInteract }: { onInteract: () => void }) {
  const [feat, setFeat] = useState<Feat>("humidity");
  const [t, setT] = useState(70);
  const left = pts.filter((p) => val(p, feat) < t);
  const right = pts.filter((p) => val(p, feat) >= t);
  const majority = (g: typeof pts) => (g.filter((p) => p[2]).length >= g.length / 2 ? 1 : 0);
  const correct = left.filter((p) => p[2] === majority(left)).length + right.filter((p) => p[2] === majority(right)).length;
  const weighted = (left.length * gini(left) + right.length * gini(right)) / pts.length;

  const S = 300, P = 16;
  const sx = (h: number) => P + ((h - 50) / 50) * (S - 2 * P);
  const sy = (a: number) => S - P - ((a - 20) / 105) * (S - 2 * P);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full max-w-md rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Fields split by one question">
        {feat === "humidity" ? (
          <line x1={sx(t)} x2={sx(t)} y1={P} y2={S - P} stroke="var(--color-lime-deep)" strokeWidth="3" />
        ) : (
          <line x1={P} x2={S - P} y1={sy(t)} y2={sy(t)} stroke="var(--color-lime-deep)" strokeWidth="3" />
        )}
        {pts.map((p, i) => (
          <circle key={i} cx={sx(p[0])} cy={sy(p[1])} r="6" fill={p[2] ? "#e5484d" : "var(--color-ink)"} opacity="0.8" />
        ))}
        <text x={S - P} y={S - 3} textAnchor="end" className="fill-ink/45 text-[9px]">humidity →</text>
        <text x={P} y={P - 4} className="fill-ink/45 text-[9px]">plant age ↑</text>
      </svg>
      <div className="space-y-5">
        <div className="inline-flex rounded-xl bg-ink/5 p-1">
          {(["humidity", "age"] as Feat[]).map((f) => (
            <button key={f} type="button" onClick={() => { setFeat(f); setT(f === "humidity" ? 70 : 70); onInteract(); }} className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${feat === f ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50"}`}>
              split on {f}
            </button>
          ))}
        </div>
        <Slider label={`${feat} < threshold ?`} value={t} min={feat === "humidity" ? 52 : 25} max={feat === "humidity" ? 98 : 120} onChange={(v) => { setT(v); onInteract(); }} />
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[{ name: "yes →", g: left }, { name: "no →", g: right }].map(({ name, g }) => (
            <div key={name} className="rounded-xl bg-paper p-3 ring-1 ring-ink/10">
              <p className="text-xs text-ink/50">{name} {g.length} fields</p>
              <p className="font-mono text-ink">{g.filter((p) => p[2]).length} sick · {g.filter((p) => !p[2]).length} healthy</p>
              <p className="text-xs text-ink/50">gini {gini(g).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-lime-soft p-4 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">Weighted impurity after split: <span className="font-mono">{weighted.toFixed(3)}</span> (before: {gini(pts).toFixed(3)})</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink">{correct} / {pts.length} correct with one question</p>
        </div>
      </div>
    </div>
  );
}
