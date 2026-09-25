"use client";

import { useMemo, useState } from "react";
import { MAIZE_PRICES_CSV } from "@/lib/curriculum/data/prices";

const y = MAIZE_PRICES_CSV.trim().split("\n").slice(1).map((l) => l.split(",")).filter((c) => c[1] === "Kibuye").map((c) => Number(c[2]));
const TRAIN = 84;

type Method = "naive" | "mean3" | "seasonal" | "seasonal-trend";

const labels: Record<Method, string> = {
  naive: "Naive — repeat last month",
  mean3: "Average of the last 3 months",
  seasonal: "Seasonal naive — same month last year",
  "seasonal-trend": "Seasonal naive + trend",
};

/** Hold out the last year and see which simple forecasting rule gets closest. */
export default function ForecastPlayground({ onInteract }: { onInteract: () => void }) {
  const [method, setMethod] = useState<Method>("naive");

  const forecast = useMemo(() => {
    const tr = y.slice(0, TRAIN);
    return Array.from({ length: 12 }, (_, h) => {
      if (method === "naive") return tr[TRAIN - 1];
      if (method === "mean3") return (tr[TRAIN - 1] + tr[TRAIN - 2] + tr[TRAIN - 3]) / 3;
      const last = tr[TRAIN - 12 + h];
      if (method === "seasonal") return last;
      const yearly = (tr.slice(-12).reduce((a, b) => a + b, 0) - tr.slice(-24, -12).reduce((a, b) => a + b, 0)) / 12;
      return last + yearly;
    });
  }, [method]);
  const actual = y.slice(TRAIN);
  const mae = forecast.reduce((s, f, i) => s + Math.abs(f - actual[i]), 0) / 12;

  const W = 520, H = 230, P = 28;
  const start = 60;
  const view = y.slice(start);
  const lo = Math.min(...view, ...forecast) - 2, hi = Math.max(...view, ...forecast) + 2;
  const sx = (i: number) => P + ((i - start) / (y.length - 1 - start)) * (W - 2 * P);
  const sy = (v: number) => H - P - ((v - lo) / (hi - lo)) * (H - 2 * P);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Price history, the held-out year and a forecast">
        <rect x={sx(TRAIN - 0.5)} y={P / 2} width={W - P - sx(TRAIN - 0.5)} height={H - P - P / 2} fill="var(--color-ink)" opacity="0.04" />
        <text x={sx(TRAIN) + 4} y={P} className="fill-ink/45 text-[10px]">held-out 2025</text>
        <polyline points={view.map((v, i) => `${sx(start + i)},${sy(v)}`).join(" ")} fill="none" stroke="var(--color-ink)" strokeOpacity="0.55" strokeWidth="2" />
        <polyline points={forecast.map((f, i) => `${sx(TRAIN + i)},${sy(f)}`).join(" ")} fill="none" stroke="var(--color-lime-deep)" strokeWidth="3" strokeDasharray="6 4" />
      </svg>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          {(Object.keys(labels) as Method[]).map((m) => (
            <button key={m} type="button" onClick={() => { setMethod(m); onInteract(); }} className={`rounded-lg px-3 py-2 text-left text-sm ring-1 ${method === m ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}>
              {labels[m]}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-lime-soft p-4 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">Average error over the held-out year</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">{mae.toFixed(2)} <span className="text-base font-normal text-ink/55">KSh/kg</span></p>
        </div>
      </div>
    </div>
  );
}
