"use client";

import { useMemo, useState } from "react";
import { RotateCcw, StepForward } from "lucide-react";
import Slider from "./Slider";

// Three loose groups of customers on two scaled features.
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const rnd = seeded(11);
const gauss = () => Math.sqrt(-2 * Math.log(rnd() || 1e-9)) * Math.cos(2 * Math.PI * rnd());
const centres = [[0.25, 0.7], [0.7, 0.75], [0.55, 0.25]];
const PTS = Array.from({ length: 90 }, (_, i) => {
  const c = centres[i % 3];
  return [Math.min(0.97, Math.max(0.03, c[0] + gauss() * 0.08)), Math.min(0.97, Math.max(0.03, c[1] + gauss() * 0.08))];
});
const COLORS = ["#5b8def", "#e5484d", "var(--color-lime-deep)", "#f5a524", "#9b59b6", "#16a085"];

type State = { centroids: number[][]; labels: number[]; phase: "assign" | "update"; iter: number };

function init(k: number): State {
  const r = seeded(k * 7 + 3);
  return { centroids: Array.from({ length: k }, () => [r() * 0.8 + 0.1, r() * 0.8 + 0.1]), labels: PTS.map(() => -1), phase: "assign", iter: 0 };
}

/** Step through k-means: assign every point to its nearest centre, then move the centres. */
export default function KMeansStepper({ onInteract }: { onInteract: () => void }) {
  const [k, setK] = useState(3);
  const [st, setSt] = useState<State>(() => init(3));

  const inertia = useMemo(
    () => (st.labels[0] === -1 ? null : PTS.reduce((s, p, i) => s + (p[0] - st.centroids[st.labels[i]][0]) ** 2 + (p[1] - st.centroids[st.labels[i]][1]) ** 2, 0)),
    [st],
  );

  function step() {
    setSt((s) => {
      if (s.phase === "assign") {
        const labels = PTS.map((p) => {
          let best = 0, bd = Infinity;
          s.centroids.forEach((c, j) => {
            const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2;
            if (d < bd) { bd = d; best = j; }
          });
          return best;
        });
        return { ...s, labels, phase: "update" };
      }
      const centroids = s.centroids.map((c, j) => {
        const mine = PTS.filter((_, i) => s.labels[i] === j);
        return mine.length ? [mine.reduce((a, p) => a + p[0], 0) / mine.length, mine.reduce((a, p) => a + p[1], 0) / mine.length] : c;
      });
      return { ...s, centroids, phase: "assign", iter: s.iter + 1 };
    });
    onInteract();
  }

  const S = 300, P = 12;
  const sx = (v: number) => P + v * (S - 2 * P);
  const sy = (v: number) => S - P - v * (S - 2 * P);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full max-w-md rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="k-means clustering in progress">
        {PTS.map((p, i) => (
          <circle key={i} cx={sx(p[0])} cy={sy(p[1])} r="4.5" fill={st.labels[i] === -1 ? "var(--color-ink)" : COLORS[st.labels[i]]} opacity={st.labels[i] === -1 ? 0.35 : 0.8} />
        ))}
        {st.centroids.map((c, j) => (
          <g key={j}>
            <circle cx={sx(c[0])} cy={sy(c[1])} r="11" fill={COLORS[j]} stroke="var(--color-paper)" strokeWidth="3" />
            <text x={sx(c[0])} y={sy(c[1]) + 4} textAnchor="middle" className="fill-white text-[11px] font-bold">×</text>
          </g>
        ))}
      </svg>
      <div className="space-y-5">
        <Slider label="k (number of clusters)" value={k} min={2} max={6} onChange={(v) => { setK(v); setSt(init(v)); onInteract(); }} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={step} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
            <StepForward size={14} /> {st.phase === "assign" ? "Assign points" : "Move centres"}
          </button>
          <button type="button" onClick={() => { setSt(init(k)); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ink/55 ring-1 ring-ink/15">
            <RotateCcw size={13} /> New random start
          </button>
        </div>
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="font-mono text-sm text-ink">iteration {st.iter} · inertia {inertia === null ? "—" : inertia.toFixed(2)}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink/55">
            {st.phase === "assign"
              ? "Next: every point joins its nearest centre."
              : "Next: every centre moves to the average of its points."}{" "}
            Repeat until nothing changes. Inertia — the total squared distance to centres — can only go down.
          </p>
        </div>
      </div>
    </div>
  );
}
