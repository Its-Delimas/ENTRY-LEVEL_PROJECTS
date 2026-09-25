"use client";

import { useMemo, useState } from "react";
import { RotateCcw, StepForward } from "lucide-react";
import Slider from "./Slider";

const X = Array.from({ length: 40 }, (_, i) => i / 39);
const noise = [0.6, -0.8, 0.3, 1.1, -0.4, -1.2, 0.9, 0.1, -0.6, 1.3, -0.2, 0.5, -1.0, 0.8, 0.2, -0.7, 1.0, -0.3, 0.4, -1.1, 0.7, -0.5, 1.2, 0.0, -0.9, 0.6, -0.4, 0.3, 1.1, -0.8, 0.5, -0.2, 0.9, -1.0, 0.2, 0.7, -0.6, 1.0, -0.3, 0.4];
const Y = X.map((x, i) => 5 + 4 * Math.sin(5 * x) + 3 * x + noise[i]);

// Fit one decision stump (a single split) to the residuals.
function stump(res: number[]) {
  let best = { t: 0.5, l: 0, r: 0, sse: Infinity };
  for (let i = 1; i < X.length; i++) {
    const t = (X[i - 1] + X[i]) / 2;
    const L = res.filter((_, j) => X[j] < t), R = res.filter((_, j) => X[j] >= t);
    const lm = L.reduce((a, b) => a + b, 0) / L.length, rm = R.reduce((a, b) => a + b, 0) / R.length;
    const sse = L.reduce((a, v) => a + (v - lm) ** 2, 0) + R.reduce((a, v) => a + (v - rm) ** 2, 0);
    if (sse < best.sse) best = { t, l: lm, r: rm, sse };
  }
  return best;
}

/** Each round adds a tiny tree that fixes part of what the ensemble still gets wrong. */
export default function BoostingSteps({ onInteract }: { onInteract: () => void }) {
  const [rounds, setRounds] = useState(0);
  const [lr, setLr] = useState(0.3);

  const { pred, mse } = useMemo(() => {
    const base = Y.reduce((a, b) => a + b, 0) / Y.length;
    const pred = X.map(() => base);
    const history = [];
    for (let r = 0; r < rounds; r++) {
      const res = Y.map((y, i) => y - pred[i]);
      const s = stump(res);
      X.forEach((x, i) => (pred[i] += lr * (x < s.t ? s.l : s.r)));
      history.push(s);
    }
    const mse = Y.reduce((a, y, i) => a + (y - pred[i]) ** 2, 0) / Y.length;
    return { pred, mse };
  }, [rounds, lr]);

  const W = 480, H = 240, P = 24;
  const sx = (x: number) => P + x * (W - 2 * P);
  const sy = (y: number) => H - P - (y / 14) * (H - 2 * P);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Boosted ensemble fit">
        {X.map((x, i) => (
          <line key={`r${i}`} x1={sx(x)} x2={sx(x)} y1={sy(Y[i])} y2={sy(pred[i])} stroke="#e5484d" strokeOpacity="0.45" />
        ))}
        {X.map((x, i) => <circle key={i} cx={sx(x)} cy={sy(Y[i])} r="4" fill="var(--color-ink)" />)}
        <polyline points={X.map((x, i) => `${sx(x)},${sy(pred[i])}`).join(" ")} fill="none" stroke="var(--color-lime-deep)" strokeWidth="3" />
      </svg>
      <div className="space-y-5">
        <Slider label="learning rate (how much each tree counts)" value={lr} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(v) => { setLr(v); onInteract(); }} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setRounds((r) => r + 1); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper"><StepForward size={14} /> Add a tree</button>
          <button type="button" onClick={() => { setRounds((r) => r + 10); onInteract(); }} className="rounded-md px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/15">+10 trees</button>
          <button type="button" onClick={() => { setRounds(0); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ink/55"><RotateCcw size={13} /> Reset</button>
        </div>
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="font-mono text-sm text-ink">{rounds} trees · training MSE {mse.toFixed(2)}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink/55">
            {rounds === 0
              ? "Round 0 predicts the average for everything. Each new tree is fitted to the red gaps — the errors left so far."
              : "Each tree is just one split, but together they bend to the pattern. Keep adding trees and they'll start fitting the noise too."}
          </p>
        </div>
      </div>
    </div>
  );
}
