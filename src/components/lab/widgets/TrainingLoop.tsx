"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import Slider from "./Slider";

// Rainfall scaled to roughly 0–1 (hundreds of mm / 10) and yield in bags.
const X = [0.12, 0.145, 0.16, 0.18, 0.2, 0.22, 0.25, 0.27, 0.3, 0.32].map((v) => v * 10);
const Y = [8, 10, 11, 13, 15, 16, 18, 19, 21, 23];

function mse(w: number, b: number) {
  return X.reduce((s, x, i) => s + (w * x + b - Y[i]) ** 2, 0) / X.length;
}

/** Watch gradient descent fit a line, epoch by epoch, with the loss curve beside it. */
export default function TrainingLoop({ onInteract }: { onInteract: () => void }) {
  const [lr, setLr] = useState(0.05);
  const [state, setState] = useState({ w: 0, b: 0, epoch: 0, losses: [mse(0, 0)] });
  const [playing, setPlaying] = useState(false);
  const lrRef = useRef(lr);
  useEffect(() => {
    lrRef.current = lr;
  }, [lr]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setState((s) => {
        if (s.epoch >= 300 || !Number.isFinite(s.w) || Math.abs(s.w) > 1e6) return s;
        const n = X.length;
        let dw = 0, db = 0;
        X.forEach((x, i) => {
          const err = s.w * x + s.b - Y[i];
          dw += (2 / n) * err * x;
          db += (2 / n) * err;
        });
        const w = s.w - lrRef.current * dw;
        const b = s.b - lrRef.current * db;
        return { w, b, epoch: s.epoch + 1, losses: [...s.losses, mse(w, b)].slice(-300) };
      });
    }, 40);
    return () => clearInterval(id);
  }, [playing]);

  const W = 300, H = 200, P = 26;
  const sx = (x: number) => P + (x / 3.4) * (W - 2 * P);
  const sy = (y: number) => H - P - (y / 26) * (H - 2 * P);
  const L = state.losses;
  const lMax = Math.max(...L.filter(Number.isFinite).slice(0, 5), 1);
  const lossPts = L.map((l, i) => `${P + (i / 300) * (W - 2 * P)},${H - P - (Math.min(l, lMax) / lMax) * (H - 2 * P)}`).join(" ");
  const current = L[L.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <figure>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Data and the current fitted line">
            {X.map((x, i) => <circle key={i} cx={sx(x)} cy={sy(Y[i])} r="4.5" fill="var(--color-ink)" />)}
            {Number.isFinite(state.w) && (
              <line x1={sx(0)} y1={sy(state.b)} x2={sx(3.4)} y2={sy(state.w * 3.4 + state.b)} stroke="var(--color-lime-deep)" strokeWidth="3" />
            )}
          </svg>
          <figcaption className="mt-2 text-center text-xs text-ink/50">The line after {state.epoch} epochs</figcaption>
        </figure>
        <figure>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Loss over epochs">
            <polyline points={lossPts} fill="none" stroke="#e5484d" strokeWidth="2" />
            <text x={W - P} y={H - 8} textAnchor="end" className="fill-ink/45 text-[10px]">epochs →</text>
            <text x={P} y={16} className="fill-ink/45 text-[10px]">loss (MSE)</text>
          </svg>
          <figcaption className="mt-2 text-center text-xs text-ink/50">Loss falling as it learns</figcaption>
        </figure>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Slider label="learning rate" value={lr} min={0.005} max={0.2} step={0.005} format={(v) => v.toFixed(3)} onChange={(v) => { setLr(v); onInteract(); }} />
        <div className="flex gap-2">
          <button type="button" onClick={() => { setPlaying((p) => !p); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
            {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Train"}
          </button>
          <button type="button" onClick={() => { setPlaying(false); setState({ w: 0, b: 0, epoch: 0, losses: [mse(0, 0)] }); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ink/55 ring-1 ring-ink/15">
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>
      <p className="rounded-2xl bg-cream px-5 py-3 font-mono text-sm text-ink">
        epoch {state.epoch} · w = {Number.isFinite(state.w) ? state.w.toFixed(2) : "∞"} · b = {Number.isFinite(state.b) ? state.b.toFixed(2) : "∞"} · loss = {Number.isFinite(current) ? current.toFixed(2) : "∞ (diverged)"}
      </p>
    </div>
  );
}
