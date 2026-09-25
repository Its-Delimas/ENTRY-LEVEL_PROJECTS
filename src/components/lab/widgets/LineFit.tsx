"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Slider from "./Slider";

/** Rainfall (mm) vs maize yield (bags/acre), Nakuru smallholder farms. */
export const FARMS: [number, number][] = [
  [120, 8], [145, 10], [160, 11], [180, 13], [200, 15],
  [220, 16], [250, 18], [270, 19], [300, 21], [320, 23],
];

function bestFit(points: [number, number][]) {
  const n = points.length;
  const mx = points.reduce((s, p) => s + p[0], 0) / n;
  const my = points.reduce((s, p) => s + p[1], 0) / n;
  const num = points.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0);
  const den = points.reduce((s, [x]) => s + (x - mx) ** 2, 0);
  const slope = num / den;
  return { slope, intercept: my - slope * mx };
}

const W = 520;
const H = 320;
const PAD = 40;
const X_MAX = 360;
const Y_MAX = 28;
const sx = (x: number) => PAD + (x / X_MAX) * (W - PAD * 1.5);
const sy = (y: number) => H - PAD - (y / Y_MAX) * (H - PAD * 1.6);

export default function LineFit({
  onInteract,
  compact = false,
}: {
  onInteract?: () => void;
  compact?: boolean;
}) {
  const [slope, setSlope] = useState(0.03);
  const [intercept, setIntercept] = useState(6);
  const [revealed, setRevealed] = useState(false);
  const best = useMemo(() => bestFit(FARMS), []);

  const mae =
    FARMS.reduce((s, [x, y]) => s + Math.abs(slope * x + intercept - y), 0) / FARMS.length;
  const bestMae =
    FARMS.reduce((s, [x, y]) => s + Math.abs(best.slope * x + best.intercept - y), 0) / FARMS.length;
  const quality = Math.max(0, Math.min(1, 1 - (mae - bestMae) / 6));

  const touch = () => onInteract?.();

  return (
    <div className={`grid gap-8 ${compact ? "" : "md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"} md:items-center`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-3xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Scatter plot of rainfall against maize yield with an adjustable line">
        {[0, 100, 200, 300].map((x) => (
          <g key={x}>
            <line x1={sx(x)} x2={sx(x)} y1={sy(0)} y2={sy(Y_MAX)} stroke="var(--color-ink)" strokeOpacity="0.06" />
            <text x={sx(x)} y={H - PAD + 18} textAnchor="middle" className="fill-ink/40 font-mono text-[10px]">{x}</text>
          </g>
        ))}
        {[0, 10, 20].map((y) => (
          <g key={y}>
            <line x1={sx(0)} x2={sx(X_MAX)} y1={sy(y)} y2={sy(y)} stroke="var(--color-ink)" strokeOpacity="0.06" />
            <text x={PAD - 10} y={sy(y) + 3} textAnchor="end" className="fill-ink/40 font-mono text-[10px]">{y}</text>
          </g>
        ))}
        <text x={sx(X_MAX)} y={H - 8} textAnchor="end" className="fill-ink/50 text-[11px]">rainfall (mm) →</text>
        <text x={PAD - 28} y={PAD - 16} className="fill-ink/50 text-[11px]">yield (bags/acre)</text>

        {revealed && (
          <line
            x1={sx(0)} y1={sy(best.intercept)} x2={sx(X_MAX)} y2={sy(best.slope * X_MAX + best.intercept)}
            stroke="var(--color-ink)" strokeOpacity="0.35" strokeDasharray="5 5" strokeWidth="1.5"
          />
        )}

        {FARMS.map(([x, y]) => (
          <line key={`r${x}`} x1={sx(x)} x2={sx(x)} y1={sy(y)} y2={sy(slope * x + intercept)} stroke="#e5484d" strokeOpacity="0.5" strokeWidth="1.5" />
        ))}

        <motion.line
          x1={sx(0)} x2={sx(X_MAX)}
          initial={{ y1: sy(intercept), y2: sy(slope * X_MAX + intercept) }}
          animate={{ y1: sy(intercept), y2: sy(slope * X_MAX + intercept) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          stroke="var(--color-lime-deep)" strokeWidth="3" strokeLinecap="round"
        />

        {FARMS.map(([x, y]) => (
          <circle key={x} cx={sx(x)} cy={sy(y)} r="5.5" fill="var(--color-ink)" stroke="var(--color-paper)" strokeWidth="2" />
        ))}
      </svg>

      <div className="space-y-6">
        <Slider
          label="slope"
          value={slope}
          min={-0.02}
          max={0.12}
          step={0.001}
          format={(v) => v.toFixed(3)}
          onChange={(v) => {
            setSlope(v);
            touch();
          }}
        />
        <Slider
          label="intercept"
          value={intercept}
          min={-10}
          max={20}
          step={0.1}
          format={(v) => v.toFixed(1)}
          onChange={(v) => {
            setIntercept(v);
            touch();
          }}
        />

        <div className="rounded-2xl bg-paper p-5 text-ink ring-1 ring-ink/10">
          <p className="font-mono text-xs text-ink/50">
            yield = {slope.toFixed(3)} × rainfall + {intercept.toFixed(1)}
          </p>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-ink/50">Average error (MAE)</p>
              <p className="font-display text-3xl font-semibold">
                {mae.toFixed(2)}
                <span className="ml-1 text-sm font-normal text-ink/40">bags</span>
              </p>
            </div>
            <div className="h-2 w-28 overflow-hidden rounded-full bg-ink/10">
              <motion.div className="h-full rounded-full bg-lime" animate={{ width: `${quality * 100}%` }} />
            </div>
          </div>
          <p className="mt-3 text-xs text-ink/45">
            The red lines are the errors — the gap between the line and each real farm.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setRevealed((r) => !r);
            touch();
          }}
          className="rounded-md border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:border-ink"
        >
          {revealed ? "Hide" : "Show"} the best possible line
          {revealed && ` (MAE ${bestMae.toFixed(2)})`}
        </button>
      </div>
    </div>
  );
}
