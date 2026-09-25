"use client";

import { useState } from "react";
import Slider from "./Slider";

const features = [
  { name: "rain (100s of mm)", value: 7.2 },
  { name: "fertiliser (10s of kg)", value: 4.5 },
  { name: "irrigated (0 or 1)", value: 1 },
];

/** A prediction is a weighted sum: tune the weights and watch the dot product. */
export default function VectorDot({ onInteract }: { onInteract: () => void }) {
  const [w, setW] = useState([1.2, 0.8, 3.0]);
  const [b, setB] = useState(2);
  const products = features.map((f, i) => f.value * w[i]);
  const pred = products.reduce((a, c) => a + c, 0) + b;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="space-y-5">
        <p className="eyebrow text-ink/40">Weights — what the model learns</p>
        {features.map((f, i) => (
          <Slider
            key={f.name}
            label={`w for ${f.name}`}
            value={w[i]}
            min={-2}
            max={5}
            step={0.1}
            format={(v) => v.toFixed(1)}
            onChange={(v) => {
              setW((cur) => cur.map((x, j) => (j === i ? v : x)));
              onInteract();
            }}
          />
        ))}
        <Slider label="b (bias)" value={b} min={-5} max={10} step={0.5} format={(v) => v.toFixed(1)} onChange={(v) => { setB(v); onInteract(); }} />
      </div>

      <div className="space-y-4">
        <div className="overflow-x-auto rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <table className="w-full min-w-[360px] font-mono text-sm">
            <thead>
              <tr className="text-left text-[11px] text-ink/40">
                <th className="pb-2 font-semibold">feature x</th>
                <th className="pb-2 font-semibold">× weight w</th>
                <th className="pb-2 text-right font-semibold">= product</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.name} className="border-t border-ink/5">
                  <td className="py-2 text-ink">{f.value}</td>
                  <td className="py-2 text-ink/60">× {w[i].toFixed(1)}</td>
                  <td className="py-2 text-right text-ink">{products[i].toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t border-ink/10">
                <td className="py-2 text-ink/60" colSpan={2}>+ bias b</td>
                <td className="py-2 text-right text-ink">{b.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-lime-soft p-5 ring-1 ring-lime-deep/20">
          <p className="font-mono text-xs text-ink/55">prediction = x @ w + b</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink">
            {pred.toFixed(1)} <span className="text-base font-normal text-ink/50">bags per acre</span>
          </p>
        </div>
        <p className="text-xs leading-relaxed text-ink/55">
          Try setting the irrigation weight to 0 — that feature stops mattering. A negative weight makes a feature push the prediction down.
        </p>
      </div>
    </div>
  );
}
