"use client";

import { useMemo, useState } from "react";
import Slider from "./Slider";

// A smooth true pattern plus noise; every third point is held out for testing.
const truth = (x: number) => 10 + 8 * Math.sin(x * 1.1) + 1.5 * x;
const noise = [1.8, -2.1, 0.7, 2.6, -1.4, -0.3, 1.9, -2.7, 0.9, 2.2, -1.8, 0.4, -2.3, 1.1, 2.8, -0.9, -1.6, 2.4, 0.2, -2.0, 1.5];
const pts = noise.map((n, i) => ({ x: (i / 20) * 6, y: truth((i / 20) * 6) + n, test: i % 3 === 1 }));
const train = pts.filter((p) => !p.test);
const test = pts.filter((p) => p.test);

// Least-squares polynomial fit with a ridge penalty, via normal equations on scaled x.
function fit(deg: number, alpha: number) {
  const feats = (x: number) => Array.from({ length: deg + 1 }, (_, k) => (x / 6) ** k);
  const A = train.map((p) => feats(p.x));
  const n = deg + 1;
  const M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => A.reduce((s, r) => s + r[i] * r[j], 0) + (i === j && i > 0 ? alpha : 0)));
  const v = Array.from({ length: n }, (_, i) => A.reduce((s, r, k) => s + r[i] * train[k].y, 0));
  // Gaussian elimination.
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    [v[c], v[p]] = [v[p], v[c]];
    for (let r = 0; r < n; r++) {
      if (r === c || Math.abs(M[c][c]) < 1e-12) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k < n; k++) M[r][k] -= f * M[c][k];
      v[r] -= f * v[c];
    }
  }
  const coef = v.map((val, i) => (Math.abs(M[i][i]) < 1e-12 ? 0 : val / M[i][i]));
  return (x: number) => feats(x).reduce((s, f, i) => s + f * coef[i], 0);
}

const mse = (f: (x: number) => number, set: typeof pts) => set.reduce((s, p) => s + (f(p.x) - p.y) ** 2, 0) / set.length;

/** Raise the model's flexibility and watch training error fall while test error rises. */
export default function OverfitPoly({ onInteract }: { onInteract: () => void }) {
  const [deg, setDeg] = useState(1);
  const [alpha, setAlpha] = useState(0);
  const f = useMemo(() => fit(deg, alpha), [deg, alpha]);
  const trainErr = mse(f, train);
  const testErr = mse(f, test);

  const W = 480, H = 260, P = 24;
  const sx = (x: number) => P + (x / 6) * (W - 2 * P);
  const sy = (y: number) => H - P - (Math.max(-5, Math.min(y, 35)) / 35) * (H - 2 * P);
  const curve = Array.from({ length: 121 }, (_, i) => (i / 120) * 6).map((x) => `${sx(x)},${sy(f(x))}`).join(" ");
  const verdict = deg <= 2 && alpha < 1 ? "Underfitting — too simple to follow the pattern." : testErr > trainErr * 2.2 ? "Overfitting — it's memorising the training dots, noise included." : "A good balance: close to the training dots and to the unseen ones.";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Polynomial fit to training and test points">
        <polyline points={curve} fill="none" stroke="var(--color-lime-deep)" strokeWidth="3" />
        {pts.map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="5" fill={p.test ? "var(--color-paper)" : "var(--color-ink)"} stroke={p.test ? "#e5484d" : "none"} strokeWidth="2.5" />
        ))}
        <text x={W - P} y={18} textAnchor="end" className="fill-ink/50 text-[10px]">● train · ○ test (hidden while fitting)</text>
      </svg>
      <div className="space-y-5">
        <Slider label="polynomial degree (flexibility)" value={deg} min={1} max={12} onChange={(v) => { setDeg(v); onInteract(); }} />
        <Slider label="regularisation (alpha)" value={alpha} min={0} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(v) => { setAlpha(v); onInteract(); }} />
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">training error</dt><dd className="font-mono text-lg text-ink">{trainErr.toFixed(1)}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-[#e5484d]">test error</dt><dd className="font-mono text-lg text-ink">{testErr.toFixed(1)}</dd></div>
        </dl>
        <p className="rounded-2xl bg-cream px-4 py-3 text-sm text-ink/75">{verdict}</p>
      </div>
    </div>
  );
}
