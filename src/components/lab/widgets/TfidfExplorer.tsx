"use client";

import { useMemo, useState } from "react";

const docs = [
  "the delivery was late and the driver was rude",
  "the maize seeds germinated well and the harvest was good",
  "the app is fast and the delivery was on time",
];

/** Weigh each word by how often it appears here versus how common it is everywhere. */
export default function TfidfExplorer({ onInteract }: { onInteract: () => void }) {
  const [d, setD] = useState(0);

  const rows = useMemo(() => {
    const tokens = docs.map((x) => x.split(" "));
    const words = [...new Set(tokens[d])];
    return words
      .map((w) => {
        const tf = tokens[d].filter((t) => t === w).length;
        const df = tokens.filter((t) => t.includes(w)).length;
        const idf = Math.log((1 + docs.length) / (1 + df)) + 1; // scikit-learn's smoothed idf
        return { w, tf, df, idf, score: tf * idf };
      })
      .sort((a, b) => b.score - a.score);
  }, [d]);
  const max = Math.max(...rows.map((r) => r.score));

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {docs.map((doc, i) => (
          <button key={i} type="button" onClick={() => { setD(i); onInteract(); }} className={`block w-full rounded-xl px-4 py-2.5 text-left font-mono text-sm ring-1 ${d === i ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15 hover:ring-ink/40"}`}>
            doc {i + 1}: {doc}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-ink/10">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-cream font-mono text-xs text-ink">
            <tr><th className="px-3 py-2">word</th><th className="px-3 py-2">count here</th><th className="px-3 py-2">docs containing it</th><th className="px-3 py-2">idf</th><th className="px-3 py-2">tf × idf</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.w} className="border-t border-ink/5 bg-paper font-mono text-xs text-ink/80">
                <td className="px-3 py-2 text-ink">{r.w}</td>
                <td className="px-3 py-2">{r.tf}</td>
                <td className="px-3 py-2">{r.df} / 3</td>
                <td className="px-3 py-2">{r.idf.toFixed(2)}</td>
                <td className="px-3 py-2">
                  <span className="inline-block h-2 rounded-full bg-lime-deep align-middle" style={{ width: `${(r.score / max) * 80}px` }} /> {r.score.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink/55">&ldquo;the&rdquo; appears most often — but it&apos;s in every document, so its idf is lowest. Words unique to this document float to the top: they&apos;re what makes it distinctive.</p>
    </div>
  );
}
