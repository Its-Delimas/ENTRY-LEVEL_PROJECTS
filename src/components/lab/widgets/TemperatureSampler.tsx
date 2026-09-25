"use client";

import { useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import { REVIEWS_CSV } from "@/lib/curriculum/data/reviews";
import Slider from "./Slider";

// A real bigram model: next-word counts from the lab's review texts.
const texts = REVIEWS_CSV.trim().split("\n").slice(1).map((l) => l.slice(l.indexOf(",") + 2, l.lastIndexOf(",") - 1).toLowerCase());
const counts = new Map<string, Map<string, number>>();
for (const t of texts) {
  const words = ["<s>", ...(t.match(/[a-z]+|[.!,]/g) ?? [])];
  for (let i = 0; i < words.length - 1; i++) {
    const m = counts.get(words[i]) ?? new Map<string, number>();
    m.set(words[i + 1], (m.get(words[i + 1]) ?? 0) + 1);
    counts.set(words[i], m);
  }
}

function dist(word: string, temp: number) {
  const m = counts.get(word);
  if (!m) return [];
  const entries = [...m.entries()];
  const logits = entries.map(([, c]) => Math.log(c) / temp);
  const mx = Math.max(...logits);
  const ex = logits.map((l) => Math.exp(l - mx));
  const z = ex.reduce((a, b) => a + b, 0);
  return entries.map(([w], i) => ({ w, p: ex[i] / z })).sort((a, b) => b.p - a.p);
}

/** Next-word prediction from a tiny language model — and what temperature does to it. */
export default function TemperatureSampler({ onInteract }: { onInteract: () => void }) {
  const [temp, setTemp] = useState(1);
  const [context, setContext] = useState("the");
  const [sample, setSample] = useState<string[]>([]);
  const d = useMemo(() => dist(context, temp).slice(0, 8), [context, temp]);

  function generate() {
    let w = "the";
    const out = ["the"];
    for (let i = 0; i < 14; i++) {
      const dd = dist(w, temp);
      if (!dd.length) break;
      let r = Math.random(), next = dd[dd.length - 1].w;
      for (const x of dd) { r -= x.p; if (r <= 0) { next = x.w; break; } }
      out.push(next);
      if (next === "." || next === "!") break;
      w = next;
    }
    setSample(out);
    onInteract();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <p className="text-sm text-ink/60">
          After the word{" "}
          <select value={context} onChange={(e) => { setContext(e.target.value); onInteract(); }} className="rounded-md bg-paper px-2 py-1 font-mono text-ink ring-1 ring-ink/15">
            {["the", "was", "delivery", "agent", "app", "seeds", "not", "very"].map((w) => <option key={w}>{w}</option>)}
          </select>{" "}
          the model predicts:
        </p>
        <ul className="space-y-1.5">
          {d.map((x) => (
            <li key={x.w} className="flex items-center gap-3">
              <span className="w-24 truncate font-mono text-sm text-ink">{x.w}</span>
              <span className="h-3 rounded-full bg-lime-deep" style={{ width: `${Math.max(2, x.p * 260)}px` }} />
              <span className="font-mono text-xs text-ink/55">{Math.round(x.p * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-5">
        <Slider label="temperature" value={temp} min={0.2} max={2.5} step={0.1} format={(v) => v.toFixed(1)} onChange={(v) => { setTemp(v); onInteract(); }} />
        <button type="button" onClick={generate} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
          <Shuffle size={14} /> Generate a sentence
        </button>
        <p className="min-h-16 rounded-2xl bg-cream p-4 font-mono text-sm text-ink">{sample.length ? sample.join(" ") : "…"}</p>
        <p className="text-xs leading-relaxed text-ink/55">
          This model only knows word pairs from 400 reviews. Low temperature sticks to the most likely word (repetitive); high temperature flattens the odds (creative, then nonsense). LLMs do the same thing with far bigger models and far more text.
        </p>
      </div>
    </div>
  );
}
