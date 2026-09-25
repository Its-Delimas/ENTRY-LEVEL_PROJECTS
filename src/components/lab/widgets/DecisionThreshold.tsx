"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "./Slider";

export default function DecisionThreshold({ onInteract }: { onInteract: () => void }) {
  const [rain, setRain] = useState(18);
  const [threshold, setThreshold] = useState(25);
  const condition = rain >= threshold;

  const line = (active: boolean, children: React.ReactNode) => (
    <span
      className={`block rounded-md px-3 transition-colors ${
        active ? "bg-lime/20 shadow-[inset_3px_0_0_var(--color-lime)]" : "opacity-40"
      }`}
    >
      {children}
    </span>
  );

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className="space-y-7">
        <Slider
          label="Rain this week"
          value={rain}
          min={0}
          max={60}
          unit="mm"
          onChange={(v) => {
            setRain(v);
            onInteract();
          }}
        />
        <Slider
          label="Your planting threshold"
          value={threshold}
          min={0}
          max={60}
          unit="mm"
          onChange={(v) => {
            setThreshold(v);
            onInteract();
          }}
        />
        <div className="flex items-center gap-3 rounded-2xl bg-cream p-4">
          <code className="font-mono text-sm text-ink/70">
            {rain} &gt;= {threshold}
          </code>
          <span className="text-ink/30">→</span>
          <motion.span
            key={String(condition)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-lg px-2.5 py-1 font-mono text-sm font-semibold ${
              condition ? "bg-lime text-onlime" : "bg-code text-white"
            }`}
          >
            {condition ? "True" : "False"}
          </motion.span>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-code">
        <pre className="p-5 font-mono text-[13px] leading-7 text-white/85">
          {line(true, <><span className="text-white/90">rain_mm</span> = <span className="text-[#8fd3ff]">{rain}</span></>)}
          {line(true, <><span className="text-lime">if</span> rain_mm &gt;= <span className="text-[#8fd3ff]">{threshold}</span>:</>)}
          {line(condition, <>    <span className="text-[#c5a3ff]">print</span>(<span className="text-[#f5c07a]">&quot;Plant this week&quot;</span>)</>)}
          {line(true, <><span className="text-lime">else</span>:</>)}
          {line(!condition, <>    <span className="text-[#c5a3ff]">print</span>(<span className="text-[#f5c07a]">&quot;Wait for more rain&quot;</span>)</>)}
        </pre>
        <div className="border-t border-white/10 px-5 py-4">
          <p className="eyebrow text-lime">Output</p>
          <motion.p
            key={String(condition)}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-2 font-mono text-sm text-white"
          >
            {condition ? "Plant this week" : "Wait for more rain"}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
