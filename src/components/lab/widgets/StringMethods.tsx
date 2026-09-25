"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Method = { id: string; label: string; apply: (v: string | string[]) => string | string[] };

const methods: Method[] = [
  { id: "strip", label: ".strip()", apply: (v) => (typeof v === "string" ? v.trim() : v) },
  { id: "lower", label: ".lower()", apply: (v) => (typeof v === "string" ? v.toLowerCase() : v) },
  { id: "upper", label: ".upper()", apply: (v) => (typeof v === "string" ? v.toUpperCase() : v) },
  {
    id: "title",
    label: ".title()",
    apply: (v) => (typeof v === "string" ? v.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : v),
  },
  { id: "replace", label: '.replace("market", "")', apply: (v) => (typeof v === "string" ? v.split("market").join("") : v) },
  { id: "split", label: '.split(",")', apply: (v) => (typeof v === "string" ? v.split(",") : v) },
];

const samples = ["  gikomba MARKET  ", "Kibuye,Kisumu,55", "  NAKURU  "];

function show(v: string | string[]) {
  return typeof v === "string" ? JSON.stringify(v) : `[${v.map((s) => JSON.stringify(s)).join(", ")}]`;
}

/** Chain string methods on messy real-world text and watch each step. */
export default function StringMethods({ onInteract }: { onInteract: () => void }) {
  const [input, setInput] = useState(samples[0]);
  const [chain, setChain] = useState<string[]>([]);

  const steps: { label: string; value: string | string[]; error?: string }[] = [];
  let value: string | string[] = input;
  let broken = false;
  for (const id of chain) {
    const m = methods.find((x) => x.id === id)!;
    if (broken) break;
    if (typeof value !== "string") {
      steps.push({ label: m.label, value, error: `AttributeError: 'list' object has no attribute '${id}'` });
      broken = true;
      break;
    }
    value = m.apply(value);
    steps.push({ label: m.label, value });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow text-ink/40">Messy text from a real form</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {samples.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setInput(s);
                setChain([]);
                onInteract();
              }}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs whitespace-pre ring-1 transition-colors ${
                input === s ? "bg-ink text-paper ring-ink" : "bg-cream text-ink ring-ink/10 hover:ring-ink/30"
              }`}
            >
              {JSON.stringify(s)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow text-ink/40">Add a method to the chain</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {methods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setChain((c) => [...c, m.id].slice(-5));
                onInteract();
              }}
              className="rounded-lg bg-paper px-3 py-1.5 font-mono text-xs text-ink ring-1 ring-ink/15 hover:ring-ink/40"
            >
              {m.label}
            </button>
          ))}
          {chain.length > 0 && (
            <button
              type="button"
              onClick={() => setChain([])}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-ink/50 hover:text-ink"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-code p-5 font-mono text-[13px] leading-7 text-white/85">
        <p>
          <span className="text-white/45">text = </span>
          <span className="whitespace-pre text-[#f5c07a]">{JSON.stringify(input)}</span>
        </p>
        <p className="mt-2 break-all">
          <span className="text-white/45">text</span>
          {chain.map((id, i) => (
            <span key={i} className="text-lime">
              {methods.find((m) => m.id === id)!.label}
            </span>
          ))}
        </p>
        <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
          {steps.length === 0 && <p className="text-white/35">Pick methods above — each one returns a new value.</p>}
          {steps.map((s, i) => (
            <p key={i} className="whitespace-pre-wrap">
              <span className="text-white/40">{s.label.padEnd(24, " ")}→ </span>
              {s.error ? <span className="text-[#ffb4b4]">{s.error}</span> : <span className="text-[#f5c07a]">{show(s.value)}</span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
