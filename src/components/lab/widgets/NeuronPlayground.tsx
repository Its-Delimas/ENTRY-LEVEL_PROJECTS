"use client";

import { useState } from "react";
import Slider from "./Slider";

type Task = "AND" | "OR" | "XOR";
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const targets: Record<Task, number[]> = { AND: [0, 0, 0, 1], OR: [0, 1, 1, 1], XOR: [0, 1, 1, 0] };

/** One neuron: weighted sum, then a step. Which logic gates can it learn? */
export default function NeuronPlayground({ onInteract }: { onInteract: () => void }) {
  const [task, setTask] = useState<Task>("AND");
  const [w1, setW1] = useState(1);
  const [w2, setW2] = useState(1);
  const [b, setB] = useState(-0.5);

  const out = inputs.map(([x1, x2]) => (w1 * x1 + w2 * x2 + b > 0 ? 1 : 0));
  const correct = out.filter((o, i) => o === targets[task][i]).length;

  const S = 240, P = 40;
  const sx = (v: number) => P + v * (S - 2 * P);
  const sy = (v: number) => S - P - v * (S - 2 * P);
  // Decision line: w1*x + w2*y + b = 0
  const line = (() => {
    if (Math.abs(w2) < 1e-6) {
      if (Math.abs(w1) < 1e-6) return null;
      const x = -b / w1;
      return [[x, -0.5], [x, 1.5]];
    }
    return [[-0.5, (-b - w1 * -0.5) / w2], [1.5, (-b - w1 * 1.5) / w2]];
  })();

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div>
        <div className="inline-flex rounded-xl bg-ink/5 p-1">
          {(["AND", "OR", "XOR"] as Task[]).map((t) => (
            <button key={t} type="button" onClick={() => { setTask(t); onInteract(); }} className={`rounded-lg px-4 py-1.5 font-mono text-sm font-semibold ${task === t ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50"}`}>
              {t}
            </button>
          ))}
        </div>
        <svg viewBox={`0 0 ${S} ${S}`} className="mt-4 w-full max-w-xs rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Four inputs and the neuron's decision line">
          {line && <line x1={sx(line[0][0])} y1={sy(line[0][1])} x2={sx(line[1][0])} y2={sy(line[1][1])} stroke="var(--color-lime-deep)" strokeWidth="3" />}
          {inputs.map(([x1, x2], i) => (
            <g key={i}>
              <circle cx={sx(x1)} cy={sy(x2)} r="16" fill={targets[task][i] ? "#e5484d" : "var(--color-ink)"} opacity="0.85" />
              <text x={sx(x1)} y={sy(x2) + 4} textAnchor="middle" className="fill-white font-mono text-[11px] font-bold">{out[i]}</text>
              {out[i] !== targets[task][i] && <circle cx={sx(x1)} cy={sy(x2)} r="21" fill="none" stroke="#f5a524" strokeWidth="2.5" strokeDasharray="4 3" />}
            </g>
          ))}
          <text x={S - 8} y={S - 10} textAnchor="end" className="fill-ink/45 text-[10px]">x₁ →</text>
          <text x={10} y={16} className="fill-ink/45 text-[10px]">x₂ ↑</text>
        </svg>
        <p className="mt-2 text-xs text-ink/50">Colour = the right answer (red = 1). Number = the neuron&apos;s output. Dashed ring = wrong.</p>
      </div>
      <div className="space-y-5">
        <Slider label="w₁" value={w1} min={-2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(v) => { setW1(v); onInteract(); }} />
        <Slider label="w₂" value={w2} min={-2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(v) => { setW2(v); onInteract(); }} />
        <Slider label="bias b" value={b} min={-2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(v) => { setB(v); onInteract(); }} />
        <div className="rounded-2xl bg-code p-4 font-mono text-xs leading-6 text-white/85">
          output = 1 if w₁·x₁ + w₂·x₂ + b &gt; 0 else 0
        </div>
        <div className={`rounded-2xl p-4 ${correct === 4 ? "bg-lime-soft ring-1 ring-lime-deep/20" : "bg-paper ring-1 ring-ink/10"}`}>
          <p className="font-display text-2xl font-semibold text-ink">{correct} / 4 correct</p>
          {task === "XOR" && <p className="mt-1 text-sm text-ink/60">Try as long as you like. No single straight line can separate XOR&apos;s red and dark points.</p>}
        </div>
      </div>
    </div>
  );
}
