"use client";

import { useState } from "react";

// Illustrative attention weights (each row sums to 1): which words each word "looks at".
const SENTENCES = [
  {
    words: ["The", "farmer", "sold", "the", "maize", "because", "it", "was", "ripe"],
    focus: 6,
    weights: [
      [0.5, 0.3, 0.05, 0.05, 0.05, 0.02, 0.01, 0.01, 0.01],
      [0.1, 0.5, 0.2, 0.02, 0.1, 0.02, 0.02, 0.02, 0.02],
      [0.02, 0.35, 0.3, 0.03, 0.25, 0.02, 0.01, 0.01, 0.01],
      [0.05, 0.05, 0.1, 0.4, 0.35, 0.02, 0.01, 0.01, 0.01],
      [0.02, 0.1, 0.25, 0.08, 0.5, 0.02, 0.01, 0.01, 0.01],
      [0.02, 0.1, 0.3, 0.02, 0.1, 0.35, 0.05, 0.03, 0.03],
      [0.01, 0.12, 0.05, 0.02, 0.62, 0.04, 0.08, 0.03, 0.03],
      [0.01, 0.05, 0.05, 0.02, 0.2, 0.05, 0.3, 0.2, 0.12],
      [0.01, 0.03, 0.05, 0.02, 0.45, 0.04, 0.2, 0.05, 0.15],
    ],
  },
  {
    words: ["The", "farmer", "sold", "the", "maize", "because", "she", "needed", "money"],
    focus: 6,
    weights: [
      [0.5, 0.3, 0.05, 0.05, 0.05, 0.02, 0.01, 0.01, 0.01],
      [0.1, 0.5, 0.2, 0.02, 0.1, 0.02, 0.02, 0.02, 0.02],
      [0.02, 0.35, 0.3, 0.03, 0.25, 0.02, 0.01, 0.01, 0.01],
      [0.05, 0.05, 0.1, 0.4, 0.35, 0.02, 0.01, 0.01, 0.01],
      [0.02, 0.1, 0.25, 0.08, 0.5, 0.02, 0.01, 0.01, 0.01],
      [0.02, 0.1, 0.3, 0.02, 0.1, 0.35, 0.05, 0.03, 0.03],
      [0.02, 0.66, 0.06, 0.01, 0.06, 0.04, 0.09, 0.03, 0.03],
      [0.01, 0.2, 0.05, 0.01, 0.03, 0.05, 0.35, 0.15, 0.15],
      [0.01, 0.1, 0.15, 0.01, 0.05, 0.03, 0.15, 0.3, 0.2],
    ],
  },
];

/** Click a word to see how strongly it attends to every other word. */
export default function AttentionHeatmap({ onInteract }: { onInteract: () => void }) {
  const [s, setS] = useState(0);
  const [q, setQ] = useState(SENTENCES[0].focus);
  const sent = SENTENCES[s];
  const row = sent.weights[q];

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-xl bg-ink/5 p-1">
        {SENTENCES.map((x, i) => (
          <button key={i} type="button" onClick={() => { setS(i); setQ(x.focus); onInteract(); }} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${s === i ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50"}`}>
            …because {x.words[6]} {x.words[7]} {x.words[8]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {sent.words.map((w, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setQ(i); onInteract(); }}
            className={`rounded-lg px-3 py-2 font-mono text-sm ring-1 transition-colors ${i === q ? "ring-2 ring-ink" : "ring-ink/10"}`}
            style={{ background: `rgba(215,255,61,${row[i] * 1.4})`, color: "var(--color-onlime)" }}
          >
            {w}
            <span className="ml-1.5 text-[10px] opacity-60">{Math.round(row[i] * 100)}%</span>
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-code p-4 font-mono text-xs leading-6 text-white/85">
        attention(&quot;{sent.words[q]}&quot;) = softmax(q · kᵢ / √d) over all words → a weighted mix of their values
      </div>
      <p className="text-sm text-ink/65">
        Click <span className="font-mono font-semibold text-ink">{sent.words[6]}</span>. In the first sentence &ldquo;it&rdquo; attends mostly to <span className="font-mono">maize</span> (maize is what&apos;s ripe); in the second, &ldquo;she&rdquo; attends to <span className="font-mono">farmer</span>. Same position, different meaning — resolved by attention. Weights here are illustrative; a real model learns them.
      </p>
    </div>
  );
}
