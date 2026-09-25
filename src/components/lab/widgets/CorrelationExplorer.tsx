"use client";

import { useMemo, useState } from "react";
import { FARMS_CSV } from "@/lib/curriculum/data/farms";

type Field = "rainfall_mm" | "fertilizer_kg" | "acres";

const rows = FARMS_CSV.trim()
  .split("\n")
  .slice(1)
  .map((l) => l.split(","))
  .map((c) => ({
    rainfall_mm: Number(c[3]),
    fertilizer_kg: c[4] === "" ? null : Number(c[4]),
    acres: Number(c[2]),
    yield_bags: Number(c[7]),
  }));

function pearson(xs: number[], ys: number[]) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    dx += (xs[i] - mx) ** 2;
    dy += (ys[i] - my) ** 2;
  }
  return num / Math.sqrt(dx * dy);
}

const fields: { id: Field; label: string }[] = [
  { id: "rainfall_mm", label: "rainfall_mm" },
  { id: "fertilizer_kg", label: "fertilizer_kg" },
  { id: "acres", label: "acres" },
];

/** Explore how each column relates to yield — and what one bad row does. */
export default function CorrelationExplorer({ onInteract }: { onInteract: () => void }) {
  const [field, setField] = useState<Field>("rainfall_mm");
  const [dropOutlier, setDropOutlier] = useState(false);

  const pts = useMemo(
    () =>
      rows
        .filter((r) => r[field] !== null && (!dropOutlier || r.yield_bags < 60))
        .map((r) => ({ x: r[field] as number, y: r.yield_bags, outlier: r.yield_bags >= 60 })),
    [field, dropOutlier],
  );
  const r = pearson(pts.map((p) => p.x), pts.map((p) => p.y));
  const xMax = Math.max(...pts.map((p) => p.x)) * 1.05;
  const yMax = dropOutlier ? 40 : 100;
  const W = 460, H = 260, P = 36;
  const sx = (x: number) => P + (x / xMax) * (W - P - 10);
  const sy = (y: number) => H - P - (y / yMax) * (H - P - 12);
  const strength = Math.abs(r) > 0.6 ? "strong" : Math.abs(r) > 0.3 ? "moderate" : Math.abs(r) > 0.1 ? "weak" : "almost no";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label={`Scatter of ${field} against yield`}>
        <line x1={P} y1={H - P} x2={W - 10} y2={H - P} stroke="var(--color-ink)" strokeOpacity="0.2" />
        <line x1={P} y1={12} x2={P} y2={H - P} stroke="var(--color-ink)" strokeOpacity="0.2" />
        <text x={W - 10} y={H - 10} textAnchor="end" className="fill-ink/50 text-[11px]">{field} →</text>
        <text x={P + 4} y={20} className="fill-ink/50 text-[11px]">yield_bags</text>
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={p.outlier ? 6 : 4}
            fill={p.outlier ? "#e5484d" : "var(--color-lime-deep)"}
            fillOpacity={p.outlier ? 1 : 0.75}
          />
        ))}
      </svg>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {fields.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setField(f.id);
                onInteract();
              }}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs ring-1 ${field === f.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="font-mono text-xs text-ink/50">df[&quot;{field}&quot;].corr(df[&quot;yield_bags&quot;])</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink">{r.toFixed(2)}</p>
          <p className="mt-1 text-sm text-ink/60">{strength} {r < 0 ? "negative" : "positive"} relationship with yield</p>
        </div>
        <label className="flex items-center gap-3 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={dropOutlier}
            onChange={(e) => {
              setDropOutlier(e.target.checked);
              onInteract();
            }}
            className="h-4 w-4 accent-[var(--color-lime-deep)]"
          />
          Drop the red farm (a 95-bag yield — almost certainly a typo)
        </label>
      </div>
    </div>
  );
}
