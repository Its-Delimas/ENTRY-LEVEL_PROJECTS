"use client";

import { useState } from "react";

const rows = [
  { county: "Nakuru", soil: "loam", rainfall_mm: 711, yield_bags: 20.9 },
  { county: "Kitui", soil: "sandy", rainfall_mm: 545, yield_bags: 6.5 },
  { county: "Bungoma", soil: "sandy", rainfall_mm: 1348, yield_bags: 20.7 },
  { county: "Nakuru", soil: "loam", rainfall_mm: 672, yield_bags: 17.8 },
  { county: "Kakamega", soil: "loam", rainfall_mm: 1469, yield_bags: 26.4 },
  { county: "Kitui", soil: "clay", rainfall_mm: 498, yield_bags: 9.8 },
  { county: "Bungoma", soil: "loam", rainfall_mm: 1270, yield_bags: 23.1 },
  { county: "Kakamega", soil: "clay", rainfall_mm: 1355, yield_bags: 24.6 },
];
type Row = (typeof rows)[number];
type Col = keyof Row;

const views = [
  { id: "all", code: "df", run: () => ({ cols: Object.keys(rows[0]) as Col[], data: rows }) },
  { id: "cols", code: 'df[["county", "yield_bags"]]', run: () => ({ cols: ["county", "yield_bags"] as Col[], data: rows }) },
  { id: "filter", code: 'df[df["yield_bags"] > 20]', run: () => ({ cols: Object.keys(rows[0]) as Col[], data: rows.filter((r) => r.yield_bags > 20) }) },
  { id: "and", code: 'df[(df["soil"] == "loam") & (df["rainfall_mm"] > 700)]', run: () => ({ cols: Object.keys(rows[0]) as Col[], data: rows.filter((r) => r.soil === "loam" && r.rainfall_mm > 700) }) },
  { id: "sort", code: 'df.sort_values("yield_bags", ascending=False)', run: () => ({ cols: Object.keys(rows[0]) as Col[], data: [...rows].sort((a, b) => b.yield_bags - a.yield_bags) }) },
  {
    id: "group",
    code: 'df.groupby("county")["yield_bags"].mean()',
    run: () => {
      const g = new Map<string, number[]>();
      rows.forEach((r) => g.set(r.county, [...(g.get(r.county) ?? []), r.yield_bags]));
      const data = [...g.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([county, ys]) => ({ county, yield_bags: Math.round((ys.reduce((a, b) => a + b, 0) / ys.length) * 100) / 100 }));
      return { cols: ["county", "yield_bags"] as Col[], data: data as unknown as Row[] };
    },
  },
];

/** Select, filter, sort and group a DataFrame — and see the pandas for each. */
export default function DataFrameOps({ onInteract }: { onInteract: () => void }) {
  const [view, setView] = useState(views[0]);
  const { cols, data } = view.run();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => {
              setView(v);
              onInteract();
            }}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs ring-1 ${
              view.id === v.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15 hover:ring-ink/40"
            }`}
          >
            {v.code}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl ring-1 ring-ink/10">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-cream">
            <tr>
              <th className="w-10 px-3 py-2.5 font-mono text-[11px] font-semibold text-ink/35">{view.id === "group" ? "" : "idx"}</th>
              {cols.map((c) => (
                <th key={c} className="px-3 py-2.5 font-mono text-xs font-semibold text-ink">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-t border-ink/5 bg-paper">
                <td className="px-3 py-2 font-mono text-[11px] text-ink/35">{view.id === "group" ? "" : rows.indexOf(r)}</td>
                {cols.map((c) => (
                  <td key={c} className="px-3 py-2 font-mono text-xs text-ink/80">
                    {String(r[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink/50">
        {data.length} row{data.length === 1 ? "" : "s"} · the index on the left keeps each row&apos;s original label, even after filtering or sorting.
      </p>
    </div>
  );
}
