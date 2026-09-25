"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "./Slider";

const markets = ["Gikomba", "Wakulima", "Kongowea", "Muthurwa", "Marikiti"];

export default function ListExplorer({ onInteract }: { onInteract: () => void }) {
  const [mode, setMode] = useState<"index" | "slice">("index");
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(3);

  const n = markets.length;
  const resolved = index < 0 ? n + index : index;
  const inRange = resolved >= 0 && resolved < n;
  const selected = (i: number) =>
    mode === "index" ? inRange && i === resolved : i >= start && i < end;
  const sliceResult = markets.slice(start, end);

  return (
    <div>
      <div className="inline-flex rounded-xl bg-cream p-1">
        {(["index", "slice"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              onInteract();
            }}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === m ? "bg-paper text-ink shadow-sm" : "text-ink/50"
            }`}
          >
            {m === "index" ? "One item" : "A slice"}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          {markets.map((m, i) => (
            <div key={m} className="flex w-28 flex-col items-center gap-2">
              <span className="font-mono text-xs font-semibold text-ink/60">{i}</span>
              <motion.div
                animate={{ y: selected(i) ? -6 : 0 }}
                className={`flex h-16 w-full items-center justify-center rounded-2xl font-mono text-sm ring-1 ring-ink/10 transition-colors ${
                  selected(i) ? "bg-lime text-onlime" : "bg-paper text-ink"
                }`}
              >
                &quot;{m}&quot;
              </motion.div>
              <span className="font-mono text-xs text-ink/35">{i - n}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-6 text-[11px] text-ink/45">
          <span>Top: positions counting from the front (start at 0)</span>
          <span>Bottom: counting from the back</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          {mode === "index" ? (
            <Slider
              label="Position"
              value={index}
              min={-7}
              max={6}
              onChange={(v) => {
                setIndex(v);
                onInteract();
              }}
            />
          ) : (
            <>
              <Slider
                label="Start (included)"
                value={start}
                min={0}
                max={5}
                onChange={(v) => {
                  setStart(v);
                  if (v > end) setEnd(v);
                  onInteract();
                }}
              />
              <Slider
                label="End (not included)"
                value={end}
                min={0}
                max={5}
                onChange={(v) => {
                  setEnd(v);
                  if (v < start) setStart(v);
                  onInteract();
                }}
              />
            </>
          )}
        </div>
        <div className="rounded-3xl bg-code p-5 font-mono text-sm">
          <p className="text-white/85">
            {mode === "index" ? `markets[${index}]` : `markets[${start}:${end}]`}
          </p>
          <p className="mt-3">
            {mode === "index" ? (
              inRange ? (
                <span className="text-[#f5c07a]">&quot;{markets[resolved]}&quot;</span>
              ) : (
                <span className="text-[#ffb4b4]">IndexError: list index out of range</span>
              )
            ) : (
              <span className="text-[#f5c07a]">
                [{sliceResult.map((s) => `"${s}"`).join(", ")}]
              </span>
            )}
          </p>
          {mode === "slice" && (
            <p className="mt-2 text-xs text-white/40">
              {sliceResult.length} item{sliceResult.length === 1 ? "" : "s"} — end minus start
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
