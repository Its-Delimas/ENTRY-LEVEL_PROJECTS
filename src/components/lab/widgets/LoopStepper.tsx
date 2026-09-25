"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";

const prices = [120, 95, 140, 110];

// Each tick is one line executing. 0: total = 0; then per item: for line, body line.
const ticks: { line: number; i: number; total: number }[] = [{ line: 2, i: -1, total: 0 }];
{
  let total = 0;
  prices.forEach((p, i) => {
    ticks.push({ line: 3, i, total });
    total += p;
    ticks.push({ line: 4, i, total });
  });
  ticks.push({ line: 5, i: prices.length, total });
}

export default function LoopStepper({ onInteract }: { onInteract: () => void }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tick = ticks[t];
  const finished = t === ticks.length - 1;

  useEffect(() => {
    if (!playing || finished) return;
    const id = setTimeout(() => {
      setT((x) => x + 1);
      if (t + 1 >= ticks.length - 1) setPlaying(false);
    }, 700);
    return () => clearTimeout(id);
  }, [playing, t, finished]);

  function step() {
    setT((x) => Math.min(x + 1, ticks.length - 1));
    onInteract();
  }

  const code = [
    "prices = [120, 95, 140, 110]",
    "total = 0",
    "for price in prices:",
    "    total = total + price",
    'print("Total:", total)',
  ];
  const price = tick.i >= 0 && tick.i < prices.length ? prices[tick.i] : null;

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div>
        <div className="overflow-hidden rounded-3xl bg-ink">
          <pre className="p-5 font-mono text-[13px] leading-7 text-white/85">
            {code.map((c, i) => (
              <span
                key={c}
                className={`block rounded-md px-3 transition-colors ${
                  tick.line === i + 1 ? "bg-lime/20 shadow-[inset_3px_0_0_var(--color-lime)]" : ""
                }`}
              >
                {c}
              </span>
            ))}
          </pre>
          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <button
              type="button"
              onClick={step}
              disabled={finished}
              className="inline-flex items-center gap-1.5 rounded-md bg-lime px-3.5 py-1.5 text-xs font-semibold text-ink disabled:opacity-30"
            >
              <StepForward size={13} />
              Next line
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying((p) => !p);
                onInteract();
              }}
              disabled={finished}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/5 disabled:opacity-30"
            >
              {playing ? <Pause size={13} /> : <Play size={13} />}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => {
                setT(0);
                setPlaying(false);
                onInteract();
              }}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-white/50 hover:bg-white/5"
            >
              <RotateCcw size={12} />
              Restart
            </button>
          </div>
        </div>
        {finished && (
          <p className="mt-3 rounded-xl bg-cream px-4 py-3 font-mono text-sm text-ink">
            Total: {tick.total}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {prices.map((p, i) => (
            <motion.div
              key={i}
              animate={{
                y: tick.i === i ? -6 : 0,
                backgroundColor:
                  tick.i === i ? "var(--color-lime)" : tick.i > i ? "var(--color-mist)" : "var(--color-paper)",
              }}
              className="flex h-14 flex-1 items-center justify-center rounded-xl font-mono text-sm text-ink ring-1 ring-ink/10"
            >
              {p}
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/10">
            <p className="font-mono text-xs text-ink/50">price</p>
            <p className="mt-1 font-mono text-2xl text-ink">{price ?? "—"}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/10">
            <p className="font-mono text-xs text-ink/50">total</p>
            <motion.p key={tick.total} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="mt-1 origin-left font-mono text-2xl text-ink">
              {tick.total}
            </motion.p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink/55">
          {tick.line === 2 && "Before the loop, total starts empty-handed at 0."}
          {tick.line === 3 && `The loop hands the next item to price: ${price}.`}
          {tick.line === 4 && `The body runs once for this item — total grows by ${price}.`}
          {tick.line === 5 && "No items left, so the loop ends and Python moves on."}
        </p>
      </div>
    </div>
  );
}
