"use client";

import { useMemo, useState } from "react";
import Slider from "./Slider";
import { TRANSACTIONS_CSV } from "@/lib/curriculum/data/transactions";

const rows = TRANSACTIONS_CSV.trim().split("\n").slice(1).map((l) => l.split(",")).map((c) => ({
  hour: Number(c[1]),
  amount: Number(c[3]),
  drain: Number(c[3]) / Number(c[4]),
  fraud: c[8] === "1",
}));
const night = (h: number) => h >= 22 || h <= 4;

type Rule = "amount" | "drain";

/** Flag transactions by a rule and see how many real frauds you catch — and how many honest people you bother. */
export default function AnomalyExplorer({ onInteract }: { onInteract: () => void }) {
  const [rule, setRule] = useState<Rule>("amount");
  const [cut, setCut] = useState(0.5);
  const [nightOnly, setNightOnly] = useState(false);

  const flagged = useMemo(
    () => rows.map((r) => (rule === "amount" ? r.amount >= cut * 20000 : r.drain >= cut) && (!nightOnly || night(r.hour))),
    [rule, cut, nightOnly],
  );
  const nFlag = flagged.filter(Boolean).length;
  const caught = rows.filter((r, i) => flagged[i] && r.fraud).length;
  const totalFraud = rows.filter((r) => r.fraud).length;

  const W = 480, H = 240, P = 26;
  const sx = (h: number) => P + ((h + 0.5) / 24) * (W - 2 * P);
  const sy = (v: number) => H - P - Math.min(v, 1) * (H - 2 * P);
  const yv = (r: (typeof rows)[number]) => (rule === "amount" ? Math.min(r.amount / 20000, 1) : r.drain);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl bg-paper ring-1 ring-ink/10" role="img" aria-label="Transactions by hour and the flagging rule">
        <rect x={P} y={sy(1)} width={W - 2 * P} height={sy(cut) - sy(1)} fill="#e5484d" opacity="0.06" />
        <line x1={P} x2={W - P} y1={sy(cut)} y2={sy(cut)} stroke="#e5484d" strokeDasharray="4 3" />
        {rows.map((r, i) => (
          <circle
            key={i}
            cx={sx(r.hour) + ((i * 37) % 11) - 5}
            cy={sy(yv(r))}
            r={r.fraud ? 5 : 3}
            fill={r.fraud ? "#e5484d" : "var(--color-ink)"}
            opacity={r.fraud ? 0.95 : flagged[i] ? 0.6 : 0.18}
            stroke={flagged[i] ? "var(--color-lime-deep)" : "none"}
            strokeWidth="2"
          />
        ))}
        <text x={W - P} y={H - 7} textAnchor="end" className="fill-ink/50 text-[10px]">hour of day →</text>
        <text x={P} y={14} className="fill-ink/50 text-[10px]">{rule === "amount" ? "amount (0–20k KSh)" : "share of balance sent"}</text>
      </svg>
      <div className="space-y-5">
        <div className="inline-flex rounded-xl bg-ink/5 p-1">
          {(["amount", "drain"] as Rule[]).map((r) => (
            <button key={r} type="button" onClick={() => { setRule(r); setCut(r === "drain" ? 0.6 : 0.5); onInteract(); }} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${rule === r ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50"}`}>
              {r === "drain" ? "% of balance" : "raw amount"}
            </button>
          ))}
        </div>
        <Slider label="flag above" value={cut} min={0.1} max={1} step={0.05} format={(v) => (rule === "drain" ? `${Math.round(v * 100)}%` : `KSh ${Math.round(v * 20000).toLocaleString()}`)} onChange={(v) => { setCut(v); onInteract(); }} />
        <label className="flex items-center gap-3 text-sm text-ink/70">
          <input type="checkbox" checked={nightOnly} onChange={(e) => { setNightOnly(e.target.checked); onInteract(); }} className="h-4 w-4 accent-[var(--color-ink)]" />
          …and only at night (10pm–4am)
        </label>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">frauds caught</dt><dd className="font-mono text-lg text-ink">{caught} / {totalFraud}</dd></div>
          <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10"><dt className="text-xs text-ink/50">honest people flagged</dt><dd className="font-mono text-lg text-ink">{nFlag - caught}</dd></div>
        </dl>
        <p className="text-xs text-ink/55">Red dots are the (hidden) frauds; green rings are what your rule flags.</p>
      </div>
    </div>
  );
}
