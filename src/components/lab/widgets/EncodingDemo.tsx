"use client";

import { useState } from "react";

const rows = [
  { county: "Kitui", variety: "local", rain: 45, age: 30 },
  { county: "Bungoma", variety: "hybrid", rain: 110, age: 95 },
  { county: "Nakuru", variety: "resistant", rain: 60, age: 60 },
  { county: "Kitui", variety: "hybrid", rain: 20, age: 115 },
];
const counties = ["Bungoma", "Kitui", "Nakuru"];

type Mode = "raw" | "label" | "onehot";
type Scale = "none" | "standard";

function standardise(vals: number[]) {
  const m = vals.reduce((a, b) => a + b, 0) / vals.length;
  const s = Math.sqrt(vals.reduce((a, v) => a + (v - m) ** 2, 0) / vals.length);
  return vals.map((v) => ((v - m) / s).toFixed(2));
}

/** See what a model actually receives: categories as numbers, columns on one scale. */
export default function EncodingDemo({ onInteract }: { onInteract: () => void }) {
  const [mode, setMode] = useState<Mode>("raw");
  const [scale, setScale] = useState<Scale>("none");

  const rain = scale === "standard" ? standardise(rows.map((r) => r.rain)) : rows.map((r) => String(r.rain));
  const age = scale === "standard" ? standardise(rows.map((r) => r.age)) : rows.map((r) => String(r.age));
  const header =
    mode === "onehot" ? [...counties.map((c) => `county_${c}`), "rain", "age"] : ["county", "rain", "age"];
  const cells = rows.map((r, i) => {
    const county =
      mode === "raw" ? [r.county] : mode === "label" ? [String(counties.indexOf(r.county))] : counties.map((c) => (c === r.county ? "1" : "0"));
    return [...county, rain[i], age[i]];
  });

  const toggle = (active: boolean) => `rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 ${active ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink/45">county as:</span>
        {(["raw", "label", "onehot"] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => { setMode(m); onInteract(); }} className={toggle(mode === m)}>
            {m === "raw" ? "text" : m === "label" ? "label numbers" : "one-hot"}
          </button>
        ))}
        <span className="ml-3 text-xs font-semibold text-ink/45">numbers:</span>
        {(["none", "standard"] as Scale[]).map((s) => (
          <button key={s} type="button" onClick={() => { setScale(s); onInteract(); }} className={toggle(scale === s)}>
            {s === "none" ? "raw" : "standardised"}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-ink/10">
        <table className="w-full min-w-[420px] text-left font-mono text-sm">
          <thead className="bg-cream">
            <tr>{header.map((h) => <th key={h} className="px-3 py-2.5 text-xs font-semibold text-ink">{h}</th>)}</tr>
          </thead>
          <tbody>
            {cells.map((r, i) => (
              <tr key={i} className="border-t border-ink/5 bg-paper">
                {r.map((c, j) => <td key={j} className="px-3 py-2 text-ink/80">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rounded-2xl bg-cream px-5 py-4 text-sm leading-relaxed text-ink/75">
        {mode === "raw"
          ? "Models only understand numbers — text like \"Kitui\" has to be encoded first."
          : mode === "label"
            ? "Label numbers invent an order: the model now thinks Nakuru (2) is \"twice\" Kitui (1). That's nonsense for counties."
            : "One-hot gives each county its own 0/1 column — no fake order, at the cost of more columns."}{" "}
        {scale === "standard"
          ? "Standardised, rain and age now share one scale, so neither dominates distances or gradients."
          : "Raw rain and age live on different scales — distance-based models like k-NN will be dominated by the bigger numbers."}
      </p>
    </div>
  );
}
