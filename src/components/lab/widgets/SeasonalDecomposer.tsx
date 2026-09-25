"use client";

import { useMemo, useState } from "react";
import { MAIZE_PRICES_CSV } from "@/lib/curriculum/data/prices";

const series = MAIZE_PRICES_CSV.trim().split("\n").slice(1).map((l) => l.split(",")).filter((c) => c[1] === "Kibuye").map((c) => ({ month: c[0], price: Number(c[2]) }));
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Part = "data" | "trend" | "season" | "residual";

/** Take a price series apart into trend, yearly cycle and what's left over. */
export default function SeasonalDecomposer({ onInteract }: { onInteract: () => void }) {
  const [part, setPart] = useState<Part>("data");

  const { trend, season, resid } = useMemo(() => {
    const y = series.map((s) => s.price);
    // Centred 12-month moving average as the trend.
    const trend = y.map((_, i) => (i < 6 || i > y.length - 7 ? null : (y.slice(i - 6, i + 6).reduce((a, b) => a + b, 0) + y.slice(i - 5, i + 7).reduce((a, b) => a + b, 0)) / 24));
    const detr = y.map((v, i) => (trend[i] === null ? null : v - (trend[i] as number)));
    const byMonth = MONTHS.map((_, m) => {
      const vals = detr.filter((v, i) => v !== null && i % 12 === m) as number[];
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    });
    const mean = byMonth.reduce((a, b) => a + b, 0) / 12;
    const season = y.map((_, i) => byMonth[i % 12] - mean);
    const resid = y.map((v, i) => (trend[i] === null ? null : v - (trend[i] as number) - season[i]));
    return { trend, season, resid };
  }, []);

  const W = 520, H = 220, P = 28;
  const vals = part === "data" ? series.map((s) => s.price) : part === "trend" ? trend : part === "season" ? season : resid;
  const nums = vals.filter((v): v is number => v !== null);
  const lo = Math.min(...nums), hi = Math.max(...nums);
  const sx = (i: number) => P + (i / (series.length - 1)) * (W - 2 * P);
  const sy = (v: number) => H - P - ((v - lo) / (hi - lo || 1)) * (H - 2 * P);
  const pts = vals.map((v, i) => (v === null ? null : `${sx(i)},${sy(v)}`)).filter(Boolean).join(" ");

  const blurb: Record<Part, string> = {
    data: "Eight years of monthly prices at Kibuye: it rises over time, wiggles every year, and spikes in 2022.",
    trend: "The trend: a 12-month moving average smooths the yearly cycle away, leaving the slow upward drift — and the 2022 drought bump.",
    season: "The seasonal pattern: prices climb before the long-rains harvest (May–June) and drop after it (Sep–Oct), the same shape every year.",
    residual: "What's left: mostly small noise — except around mid-2022, where the drought shock didn't fit either pattern.",
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["data", "trend", "season", "residual"] as Part[]).map((p) => (
          <button key={p} type="button" onClick={() => { setPart(p); onInteract(); }} className={`rounded-lg px-4 py-1.5 text-sm font-semibold ring-1 ${part === p ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}>
            {p === "data" ? "the data" : p === "season" ? "seasonality" : p}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label={`Kibuye maize price: ${part}`}>
        {[0, 12, 24, 36, 48, 60, 72, 84].map((i) => (
          <g key={i}>
            <line x1={sx(i)} x2={sx(i)} y1={P / 2} y2={H - P} stroke="var(--color-ink)" strokeOpacity="0.06" />
            <text x={sx(i) + 2} y={H - 10} className="fill-ink/45 font-mono text-[9px]">{2018 + i / 12}</text>
          </g>
        ))}
        {part === "residual" || part === "season" ? <line x1={P} x2={W - P} y1={sy(0)} y2={sy(0)} stroke="var(--color-ink)" strokeOpacity="0.25" /> : null}
        <polyline points={pts} fill="none" stroke={part === "residual" ? "#e5484d" : "var(--color-lime-deep)"} strokeWidth="2.2" />
      </svg>
      <p className="rounded-2xl bg-cream px-5 py-4 text-sm text-ink/75">{blurb[part]}</p>
    </div>
  );
}
