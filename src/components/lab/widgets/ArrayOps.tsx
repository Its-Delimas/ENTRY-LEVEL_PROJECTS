"use client";

import { useState } from "react";

// Weekly rainfall (mm) for 3 farms (rows) over 4 weeks (columns).
const data = [
  [12, 30, 45, 8],
  [22, 51, 17, 39],
  [26, 5, 33, 41],
];

type Op = {
  id: string;
  code: string;
  kind: "grid" | "mask" | "scalar" | "cols" | "rows" | "flat";
  fn: () => number[][] | boolean[][] | number | number[];
};

const round = (n: number) => Math.round(n * 100) / 100;
const ops: Op[] = [
  { id: "add", code: "rain + 10", kind: "grid", fn: () => data.map((r) => r.map((v) => v + 10)) },
  { id: "mul", code: "rain * 2", kind: "grid", fn: () => data.map((r) => r.map((v) => v * 2)) },
  { id: "mask", code: "rain > 30", kind: "mask", fn: () => data.map((r) => r.map((v) => v > 30)) },
  { id: "filter", code: "rain[rain > 30]", kind: "flat", fn: () => data.flat().filter((v) => v > 30) },
  { id: "mean", code: "rain.mean()", kind: "scalar", fn: () => round(data.flat().reduce((a, b) => a + b, 0) / 12) },
  { id: "cols", code: "rain.mean(axis=0)", kind: "cols", fn: () => [0, 1, 2, 3].map((c) => round(data.reduce((s, r) => s + r[c], 0) / 3)) },
  { id: "rows", code: "rain.mean(axis=1)", kind: "rows", fn: () => data.map((r) => round(r.reduce((a, b) => a + b, 0) / 4)) },
];

/** Operate on a whole 2D array at once, and see what axis=0 vs axis=1 means. */
export default function ArrayOps({ onInteract }: { onInteract: () => void }) {
  const [op, setOp] = useState(ops[0]);
  const result = op.fn();

  const cell = (v: number | boolean, key: string, hl = false) => (
    <span
      key={key}
      className={`flex h-11 items-center justify-center rounded-lg font-mono text-sm ring-1 ${
        typeof v === "boolean"
          ? v
            ? "bg-lime text-onlime ring-lime"
            : "bg-paper text-ink/40 ring-ink/10"
          : hl
            ? "bg-lime-soft text-ink ring-lime-deep/30"
            : "bg-paper text-ink ring-ink/10"
      }`}
    >
      {typeof v === "boolean" ? (v ? "True" : "False") : v}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {ops.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => {
              setOp(o);
              onInteract();
            }}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs ring-1 ${
              op.id === o.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15 hover:ring-ink/40"
            }`}
          >
            {o.code}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs text-ink/50">rain — shape (3, 4): 3 farms × 4 weeks</p>
          <div className="mt-3 grid grid-cols-[auto_repeat(4,minmax(0,1fr))] gap-1.5">
            <span />
            {[1, 2, 3, 4].map((w) => (
              <span key={w} className={`text-center font-mono text-[10px] ${op.kind === "cols" ? "font-semibold text-lime-deep" : "text-ink/35"}`}>
                wk {w}
              </span>
            ))}
            {data.map((r, i) => (
              <div key={i} className="contents">
                <span className={`flex items-center pr-2 font-mono text-[10px] ${op.kind === "rows" ? "font-semibold text-lime-deep" : "text-ink/35"}`}>
                  farm {i}
                </span>
                {r.map((v, j) => cell(v, `${i}-${j}`, op.kind === "flat" && v > 30))}
              </div>
            ))}
          </div>
          {(op.kind === "cols" || op.kind === "rows") && (
            <p className="mt-3 text-xs text-ink/55">
              {op.kind === "cols"
                ? "axis=0 collapses down the rows — one answer per column (per week)."
                : "axis=1 collapses across the columns — one answer per row (per farm)."}
            </p>
          )}
        </div>

        <div>
          <p className="font-mono text-xs text-ink/50">{op.code}</p>
          <div className="mt-3">
            {op.kind === "scalar" && (
              <p className="flex h-24 items-center justify-center rounded-2xl bg-lime-soft font-mono text-3xl text-ink">{result as number}</p>
            )}
            {(op.kind === "grid" || op.kind === "mask") && (
              <div className="grid grid-cols-4 gap-1.5">
                {(result as (number | boolean)[][]).flatMap((r, i) => r.map((v, j) => cell(v, `r${i}-${j}`)))}
              </div>
            )}
            {(op.kind === "cols" || op.kind === "rows" || op.kind === "flat") && (
              <div className={`grid gap-1.5 ${op.kind === "rows" ? "grid-cols-1 max-w-32" : "grid-cols-4"}`}>
                {(result as number[]).map((v, i) => cell(v, `f${i}`, true))}
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-ink/50">No loop anywhere — the operation applies to every element at once.</p>
        </div>
      </div>
    </div>
  );
}
