"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const farm: Record<string, string> = {
  county: '"Nakuru"',
  crop: '"maize"',
  acres: "2.5",
  rainfall_mm: "640",
  yield_bags: "38",
};

export default function DictLookup({ onInteract }: { onInteract: () => void }) {
  const [key, setKey] = useState("crop");
  const [safe, setSafe] = useState(false);
  const found = Object.prototype.hasOwnProperty.call(farm, key);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-3xl bg-code p-5 font-mono text-[13px] leading-7 text-white/85">
        <span className="text-white/90">farm</span> = {"{"}
        {Object.entries(farm).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setKey(k);
              onInteract();
            }}
            className={`block w-full rounded-md px-4 text-left transition-colors ${
              key === k ? "bg-lime/20 shadow-[inset_3px_0_0_var(--color-lime)]" : "hover:bg-white/5"
            }`}
          >
            <span className="text-[#f5c07a]">&quot;{k}&quot;</span>: <span className={v.startsWith('"') ? "text-[#f5c07a]" : "text-[#8fd3ff]"}>{v}</span>,
          </button>
        ))}
        {"}"}
        <p className="mt-3 font-sans text-xs text-white/40">Click a line, or type any key on the right.</p>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Look up a key</span>
          <div className="mt-2 flex items-center rounded-2xl bg-cream p-2 font-mono text-sm">
            <span className="pl-2 text-ink/60">farm{safe ? '.get("' : '["'}</span>
            <input
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                onInteract();
              }}
              className="min-w-0 flex-1 rounded-lg bg-paper px-2 py-1.5 text-ink outline-none ring-1 ring-ink/10 focus:ring-ink/40"
            />
            <span className="pr-2 text-ink/60">{safe ? '", "unknown")' : '"]'}</span>
          </div>
        </label>

        <motion.div
          key={key + safe}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-5 font-mono text-sm ${
            found || safe ? "bg-lime-soft text-ink" : "bg-danger-soft text-danger"
          }`}
        >
          {found ? farm[key] : safe ? '"unknown"' : `KeyError: '${key}'`}
          {!found && !safe && (
            <p className="mt-3 font-sans text-xs leading-relaxed text-ink/60">
              Keys that exist:{" "}
              {Object.keys(farm).map((k) => (
                <code key={k} className="mr-1 rounded bg-paper px-1.5 py-0.5 font-mono text-ink">
                  {k}
                </code>
              ))}
            </p>
          )}
        </motion.div>

        <label className="flex items-center gap-3 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={safe}
            onChange={(e) => {
              setSafe(e.target.checked);
              onInteract();
            }}
            className="h-4 w-4 accent-ink"
          />
          Use <code className="font-mono">.get()</code> with a fallback instead of <code className="font-mono">[ ]</code>
        </label>
      </div>
    </div>
  );
}
