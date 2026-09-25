"use client";

import { useMemo, useState } from "react";
import Slider from "./Slider";

// Correlated 2D data (e.g. monthly transactions vs average amount, scaled), centred.
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const r = seeded(5);
const g = () => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
const PTS = Array.from({ length: 60 }, () => {
  const a = g() * 1.3, b = g() * 0.4;
  return [a * Math.cos(0.6) - b * Math.sin(0.6), a * Math.sin(0.6) + b * Math.cos(0.6)];
});
const total = PTS.reduce((s, p) => s + p[0] ** 2 + p[1] ** 2, 0);

/** Rotate a line through the data and see how much variation a single direction can keep. */
export default function PcaProjector({ onInteract }: { onInteract: () => void }) {
  const [deg, setDeg] = useState(0);
  const theta = (deg * Math.PI) / 180;
  const u = [Math.cos(theta), Math.sin(theta)];
  const { kept, best } = useMemo(() => {
    const proj = PTS.map((p) => p[0] * u[0] + p[1] * u[1]);
    const kept = proj.reduce((s, v) => s + v * v, 0) / total;
    let best = 0, bestKept = 0;
    for (let d = 0; d < 180; d++) {
      const t = (d * Math.PI) / 180;
      const k = PTS.reduce((s, p) => s + (p[0] * Math.cos(t) + p[1] * Math.sin(t)) ** 2, 0) / total;
      if (k > bestKept) { bestKept = k; best = d; }
    }
    return { kept, best };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deg]);

  const S = 300, C = S / 2, sc = 45;
  const X = (v: number) => C + v * sc;
  const Y = (v: number) => C - v * sc;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full max-w-md rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Points projected onto a rotating direction">
        <line x1={X(-u[0] * 4)} y1={Y(-u[1] * 4)} x2={X(u[0] * 4)} y2={Y(u[1] * 4)} stroke="var(--color-lime-deep)" strokeWidth="2.5" />
        {PTS.map((p, i) => {
          const t = p[0] * u[0] + p[1] * u[1];
          return (
            <g key={i}>
              <line x1={X(p[0])} y1={Y(p[1])} x2={X(t * u[0])} y2={Y(t * u[1])} stroke="#e5484d" strokeOpacity="0.35" />
              <circle cx={X(p[0])} cy={Y(p[1])} r="4" fill="var(--color-ink)" opacity="0.7" />
              <circle cx={X(t * u[0])} cy={Y(t * u[1])} r="2.5" fill="var(--color-lime-deep)" />
            </g>
          );
        })}
      </svg>
      <div className="space-y-5">
        <Slider label="direction of the line" value={deg} min={0} max={179} unit="°" onChange={(v) => { setDeg(v); onInteract(); }} />
        <div className="rounded-2xl bg-lime-soft p-5 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">Variation kept by this one direction</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink">{Math.round(kept * 100)}%</p>
        </div>
        <button type="button" onClick={() => { setDeg(best); onInteract(); }} className="rounded-md px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/15">
          Jump to the best direction (the first principal component)
        </button>
        <p className="text-xs leading-relaxed text-ink/55">
          Each dot is squashed onto the line (green). The red lines are the information thrown away. PCA finds the direction that keeps the most — then the next best at right angles, and so on.
        </p>
      </div>
    </div>
  );
}
