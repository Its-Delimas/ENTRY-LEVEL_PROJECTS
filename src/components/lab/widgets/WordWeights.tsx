"use client";

import { useState } from "react";
import { SENTIMENT_MODEL } from "@/lib/curriculum/data/sentiment-weights";

/** Type a review and see how the trained model's word weights add up to a verdict. */
export default function WordWeights({ onInteract }: { onInteract: () => void }) {
  const [text, setText] = useState("The delivery was late, but the agent was very helpful. Asante!");
  const words = text.toLowerCase().match(/[a-z]{2,}/g) ?? [];
  const contributions = words.map((w) => ({ w, c: SENTIMENT_MODEL.weights[w] ?? 0, known: w in SENTIMENT_MODEL.weights }));
  const z = contributions.reduce((s, x) => s + x.c, SENTIMENT_MODEL.bias);
  const p = 1 / (1 + Math.exp(-z));

  return (
    <div className="space-y-5">
      <textarea value={text} onChange={(e) => { setText(e.target.value); onInteract(); }} rows={2} className="w-full rounded-2xl border border-ink/15 bg-paper p-4 text-[15px] text-ink focus:border-ink focus:outline-none" />
      <div className="flex flex-wrap gap-1.5 rounded-2xl bg-cream p-4">
        {contributions.map((x, i) => (
          <span
            key={i}
            title={x.known ? `weight ${x.c.toFixed(2)}` : "not in the model's vocabulary"}
            className="rounded-md px-2 py-1 font-mono text-xs ring-1 ring-ink/10"
            style={{
              background: x.c > 0 ? `rgba(85,113,10,${Math.min(0.55, x.c / 2.5)})` : x.c < 0 ? `rgba(229,72,77,${Math.min(0.55, -x.c / 2.5)})` : "var(--color-paper)",
              color: "var(--color-ink)",
              opacity: x.known ? 1 : 0.45,
            }}
          >
            {x.w} {x.known && <span className="opacity-60">{x.c > 0 ? "+" : ""}{x.c.toFixed(1)}</span>}
          </span>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
          <p className="text-xs text-ink/50">sum of word weights + bias</p>
          <p className="font-mono text-xl text-ink">{z.toFixed(2)}</p>
        </div>
        <div className={`rounded-2xl p-4 ${p >= 0.5 ? "bg-lime-soft ring-1 ring-lime-deep/20" : "bg-danger-soft"}`}>
          <p className="text-xs text-ink/50">P(positive)</p>
          <p className="font-display text-2xl font-semibold text-ink">{Math.round(p * 100)}% — {p >= 0.5 ? "positive" : "negative"}</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-ink/55">
        These are the real weights of a model trained on the lab&apos;s reviews. Try &ldquo;the app never crashes&rdquo; and &ldquo;the app keeps crashing&rdquo;, or &ldquo;not fast&rdquo; — word counts ignore order, so &ldquo;not&rdquo; can only push the whole review down.
      </p>
    </div>
  );
}
