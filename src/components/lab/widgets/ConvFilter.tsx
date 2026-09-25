"use client";

import { useMemo, useState } from "react";

// A 12×12 hand-drawn "7" (0 = paper, 9 = ink).
const IMG = [
  "000000000000",
  "099999999900",
  "099999999900",
  "000000009900",
  "000000099000",
  "000000990000",
  "000009900000",
  "000099000000",
  "000990000000",
  "000990000000",
  "000990000000",
  "000000000000",
].map((r) => r.split("").map(Number));

const kernels = {
  "vertical edges": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
  "horizontal edges": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
  blur: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  sharpen: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
} as const;
type K = keyof typeof kernels;

/** Slide a 3×3 filter over an image and watch it light up edges. */
export default function ConvFilter({ onInteract }: { onInteract: () => void }) {
  const [k, setK] = useState<K>("vertical edges");
  const [pos, setPos] = useState<[number, number]>([4, 5]);
  const ker = kernels[k];

  const out = useMemo(() => {
    const o: number[][] = [];
    for (let i = 0; i < 10; i++) {
      o.push([]);
      for (let j = 0; j < 10; j++) {
        let s = 0;
        for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) s += IMG[i + a][j + b] * ker[a][b];
        o[i].push(k === "blur" ? s / 9 : s);
      }
    }
    return o;
  }, [ker, k]);
  const maxAbs = Math.max(...out.flat().map(Math.abs), 1);

  const cell = 20;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(kernels) as K[]).map((name) => (
          <button key={name} type="button" onClick={() => { setK(name); onInteract(); }} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 ${k === name ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}>
            {name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <div>
          <p className="mb-2 text-xs text-ink/50">Image (12×12) — hover to move the window</p>
          <svg width={12 * cell} height={12 * cell} className="rounded-lg ring-1 ring-ink/10">
            {IMG.flatMap((row, i) =>
              row.map((v, j) => (
                <rect key={`${i}-${j}`} x={j * cell} y={i * cell} width={cell} height={cell} fill={`rgb(${255 - v * 26},${255 - v * 26},${255 - v * 26})`} onMouseEnter={() => { if (i <= 9 && j <= 9) { setPos([i, j]); onInteract(); } }} />
              )),
            )}
            <rect x={pos[1] * cell} y={pos[0] * cell} width={cell * 3} height={cell * 3} fill="none" stroke="#e5484d" strokeWidth="3" />
          </svg>
        </div>
        <div>
          <p className="mb-2 text-xs text-ink/50">Filter</p>
          <div className="grid grid-cols-3 gap-1">
            {ker.flat().map((v, i) => (
              <span key={i} className="flex h-10 w-10 items-center justify-center rounded-md bg-code font-mono text-sm text-white">{v}</span>
            ))}
          </div>
          <p className="mt-3 max-w-[9rem] text-xs text-ink/55">
            Output at the red window: <span className="font-mono font-semibold text-ink">{out[pos[0]][pos[1]].toFixed(k === "blur" ? 1 : 0)}</span>
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs text-ink/50">Feature map (10×10)</p>
          <svg width={10 * cell} height={10 * cell} className="rounded-lg ring-1 ring-ink/10">
            {out.flatMap((row, i) =>
              row.map((v, j) => {
                const t = v / maxAbs;
                const fill = t >= 0 ? `rgba(229,72,77,${t})` : `rgba(91,141,239,${-t})`;
                return <rect key={`${i}-${j}`} x={j * cell} y={i * cell} width={cell} height={cell} fill={fill} stroke={i === pos[0] && j === pos[1] ? "var(--color-ink)" : "none"} strokeWidth="2" />;
              }),
            )}
          </svg>
        </div>
      </div>
      <p className="text-xs text-ink/55">Red = strong positive response, blue = strong negative. Each output pixel is the sum of the 3×3 image patch multiplied by the filter.</p>
    </div>
  );
}
