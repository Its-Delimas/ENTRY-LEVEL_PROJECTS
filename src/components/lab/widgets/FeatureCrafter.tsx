"use client";

import { useMemo, useState } from "react";
import { CROPS_CSV } from "@/lib/curriculum/data/crops";

const rows = CROPS_CSV.trim().split("\n").slice(1).map((l) => l.split(",")).map((c) => ({ temp: Number(c[4]), d: Number(c[10]) }));

/** The disease rate by temperature is a hump — a straight line in temp can't follow it. */
export default function FeatureCrafter({ onInteract }: { onInteract: () => void }) {
  const [feature, setFeature] = useState<"temp" | "dev">("temp");

  const bins = useMemo(() => {
    const out: { t: number; rate: number; n: number }[] = [];
    for (let t = 16; t < 32; t += 2) {
      const g = rows.filter((r) => r.temp >= t && r.temp < t + 2);
      if (g.length >= 5) out.push({ t: t + 1, rate: g.filter((r) => r.d).length / g.length, n: g.length });
    }
    return out;
  }, []);

  // Least-squares line of disease rate on the chosen feature, weighted by bin size.
  const f = (t: number) => (feature === "temp" ? t : -((t - 25.5) ** 2));
  const fit = useMemo(() => {
    const n = bins.reduce((a, b) => a + b.n, 0);
    const mx = bins.reduce((a, b) => a + b.n * f(b.t), 0) / n;
    const my = bins.reduce((a, b) => a + b.n * b.rate, 0) / n;
    const w = bins.reduce((a, b) => a + b.n * (f(b.t) - mx) * (b.rate - my), 0) / bins.reduce((a, b) => a + b.n * (f(b.t) - mx) ** 2, 0);
    return { w, b: my - w * mx };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature, bins]);
  const pred = (t: number) => fit.w * f(t) + fit.b;
  const err = bins.reduce((a, b) => a + b.n * Math.abs(pred(b.t) - b.rate), 0) / bins.reduce((a, b) => a + b.n, 0);

  const W = 480, H = 240, P = 28;
  const sx = (t: number) => P + ((t - 16) / 16) * (W - 2 * P);
  const sy = (r: number) => H - P - (r / 0.5) * (H - 2 * P);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Disease rate by temperature with a model fit">
        {bins.map((b) => (
          <rect key={b.t} x={sx(b.t - 0.9)} y={sy(b.rate)} width={sx(1.8) - sx(0)} height={sy(0) - sy(b.rate)} fill="var(--color-ink)" opacity="0.2" rx="2" />
        ))}
        <polyline points={Array.from({ length: 65 }, (_, i) => 16 + i * 0.25).map((t) => `${sx(t)},${sy(Math.max(0, Math.min(0.5, pred(t))))}`).join(" ")} fill="none" stroke="var(--color-lime-deep)" strokeWidth="3" />
        <text x={W - P} y={H - 8} textAnchor="end" className="fill-ink/50 text-[10px]">temperature °C →</text>
        <text x={P} y={16} className="fill-ink/50 text-[10px]">share of fields diseased</text>
      </svg>
      <div className="space-y-5">
        <div className="inline-flex flex-col gap-2">
          {[
            { id: "temp" as const, label: "use temp_c as it is" },
            { id: "dev" as const, label: "use (temp_c − 25.5)² — distance from the sweet spot" },
          ].map((o) => (
            <button key={o.id} type="button" onClick={() => { setFeature(o.id); onInteract(); }} className={`rounded-lg px-3 py-2 text-left text-sm ring-1 ${feature === o.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}>
              {o.label}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-lime-soft p-4 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">Average gap between the line and the bars</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{(err * 100).toFixed(1)} percentage points</p>
        </div>
        <p className="text-xs leading-relaxed text-ink/55">
          Blight peaks around 25 °C and falls off either side. A linear model can only draw a straight line in each feature — unless you give it a feature that is itself curved.
        </p>
      </div>
    </div>
  );
}
