"use client";

import { useState } from "react";
import { RotateCcw, StepForward } from "lucide-react";
import Slider from "./Slider";

const loss = (x: number) => (x - 3) ** 2 + 1;
const grad = (x: number) => 2 * (x - 3);

/** Roll a ball downhill one step at a time — and see what the learning rate does. */
export default function GradientDescent({ onInteract }: { onInteract: () => void }) {
  const [lr, setLr] = useState(0.1);
  const [path, setPath] = useState<number[]>([-2]);
  const x = path[path.length - 1];

  const W = 480, H = 260, P = 28;
  const sx = (v: number) => P + ((v + 3) / 12) * (W - 2 * P);
  const sy = (v: number) => H - P - (Math.min(v, 45) / 45) * (H - 2 * P);
  const curve = Array.from({ length: 121 }, (_, i) => -3 + i * 0.1).map((v) => `${sx(v)},${sy(loss(v))}`).join(" ");
  const diverging = Math.abs(x - 3) > 8;

  function step(n = 1) {
    setPath((p) => {
      const out = [...p];
      for (let i = 0; i < n; i++) {
        const cur = out[out.length - 1];
        if (Math.abs(cur) > 1e6) break;
        out.push(cur - lr * grad(cur));
      }
      return out.slice(-60);
    });
    onInteract();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Loss curve with the current position">
        <polyline points={curve} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        {path.slice(1).map((v, i) => (
          <line key={i} x1={sx(path[i])} y1={sy(loss(path[i]))} x2={sx(v)} y2={sy(loss(v))} stroke="#e5484d" strokeOpacity="0.6" strokeWidth="1.5" />
        ))}
        {Math.abs(x) < 9 && <circle cx={sx(x)} cy={sy(loss(x))} r="8" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2" />}
        <text x={sx(3)} y={H - 8} textAnchor="middle" className="fill-ink/45 text-[10px]">best x = 3</text>
      </svg>
      <div className="space-y-5">
        <Slider label="learning rate" value={lr} min={0.01} max={1.1} step={0.01} format={(v) => v.toFixed(2)} onChange={(v) => { setLr(v); setPath([-2]); onInteract(); }} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => step()} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper"><StepForward size={14} /> One step</button>
          <button type="button" onClick={() => step(10)} className="rounded-md px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/15">10 steps</button>
          <button type="button" onClick={() => { setPath([-2]); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ink/55"><RotateCcw size={13} /> Reset</button>
        </div>
        <div className="rounded-2xl bg-code p-4 font-mono text-xs leading-6 text-white/85">
          <p>x = x - learning_rate * slope(x)</p>
          <p className="mt-2 text-white/50">step {path.length - 1}: x = {Math.abs(x) > 1e5 ? "∞" : x.toFixed(3)}</p>
          <p className="text-white/50">loss = {Math.abs(x) > 1e5 ? "∞" : loss(x).toFixed(3)}</p>
        </div>
        <p className="text-sm text-ink/60">
          {diverging
            ? "Diverging! Each step overshoots further. The learning rate is too big."
            : lr < 0.05
              ? "Tiny steps — it'll get there, but slowly."
              : lr > 0.9
                ? "Big steps — watch it bounce from side to side."
                : "Try a very small and a very large learning rate too."}
        </p>
      </div>
    </div>
  );
}
