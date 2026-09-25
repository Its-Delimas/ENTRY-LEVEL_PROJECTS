"use client";

import { useState } from "react";

// Illustrative 2D positions: real embeddings have hundreds of dimensions,
// but the idea — similar words sit close together — is the same.
const WORDS: [string, number, number][] = [
  ["maize", 0.18, 0.78], ["beans", 0.25, 0.72], ["sorghum", 0.14, 0.68], ["cassava", 0.22, 0.62], ["mahindi", 0.12, 0.82],
  ["shilling", 0.78, 0.8], ["price", 0.72, 0.72], ["cash", 0.84, 0.72], ["pesa", 0.82, 0.86], ["loan", 0.68, 0.64],
  ["rain", 0.24, 0.28], ["drought", 0.32, 0.2], ["mvua", 0.18, 0.22], ["flood", 0.2, 0.14], ["harvest", 0.3, 0.44],
  ["happy", 0.74, 0.3], ["poa", 0.8, 0.24], ["angry", 0.66, 0.16], ["rude", 0.6, 0.22], ["helpful", 0.82, 0.38],
  ["nairobi", 0.48, 0.93], ["kisumu", 0.62, 0.9], ["nakuru", 0.42, 0.85],
];

/** Words as points: click one to find its nearest neighbours. */
export default function EmbeddingMap({ onInteract }: { onInteract: () => void }) {
  const [sel, setSel] = useState("maize");
  const [sx0, sy0] = WORDS.find((w) => w[0] === sel)!.slice(1) as number[];
  const near = WORDS.filter((w) => w[0] !== sel)
    .map((w) => ({ w: w[0], d: Math.hypot(w[1] - sx0, w[2] - sy0) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3);
  const W = 460, H = 320;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Words placed so that similar words are close">
        {near.map((n) => {
          const w = WORDS.find((x) => x[0] === n.w)!;
          return <line key={n.w} x1={sx0 * W} y1={(1 - sy0) * H} x2={w[1] * W} y2={(1 - w[2]) * H} stroke="var(--color-lime-deep)" strokeWidth="2" />;
        })}
        {WORDS.map(([w, x, y]) => (
          <g key={w} className="cursor-pointer" onClick={() => { setSel(w); onInteract(); }}>
            <circle cx={x * W} cy={(1 - y) * H} r={w === sel ? 7 : 5} fill={w === sel ? "var(--color-lime-deep)" : "var(--color-ink)"} opacity={w === sel ? 1 : 0.55} />
            <text x={x * W + 9} y={(1 - y) * H + 4} className={`text-[11px] ${w === sel ? "fill-ink font-semibold" : "fill-ink/65"}`}>{w}</text>
          </g>
        ))}
      </svg>
      <div className="space-y-4">
        <p className="text-sm text-ink/60">Nearest to <span className="font-mono font-semibold text-ink">{sel}</span>:</p>
        <ol className="space-y-2">
          {near.map((n, i) => (
            <li key={n.w} className="flex items-center justify-between rounded-xl bg-paper px-4 py-2.5 ring-1 ring-ink/10">
              <span className="font-mono text-sm text-ink">{i + 1}. {n.w}</span>
              <span className="font-mono text-xs text-ink/45">distance {n.d.toFixed(2)}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs leading-relaxed text-ink/55">
          A model learns these positions from how words are used: words that appear in similar sentences end up close together — even across languages, like <span className="font-mono">mvua</span> and <span className="font-mono">rain</span>. This 2D map is illustrative; real embeddings use hundreds of dimensions.
        </p>
      </div>
    </div>
  );
}
