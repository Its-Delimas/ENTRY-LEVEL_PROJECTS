"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Slider from "./Slider";

export default function FunctionMachine({ onInteract }: { onInteract: () => void }) {
  const [ksh, setKsh] = useState(5000);
  const [rate, setRate] = useState(129);
  const result = Math.round((ksh / rate) * 100) / 100;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Slider
          label="ksh (the input)"
          value={ksh}
          min={0}
          max={20000}
          step={250}
          format={(v) => v.toLocaleString()}
          onChange={(v) => {
            setKsh(v);
            onInteract();
          }}
        />
        <Slider
          label="rate (KSh per dollar)"
          value={rate}
          min={100}
          max={160}
          onChange={(v) => {
            setRate(v);
            onInteract();
          }}
        />
      </div>

      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <div className="rounded-2xl bg-paper p-4 text-center ring-1 ring-ink/10 md:w-40">
          <p className="eyebrow text-ink/40">In</p>
          <p className="mt-1 font-mono text-lg text-ink">{ksh.toLocaleString()}</p>
          <p className="font-mono text-xs text-ink/40">{rate}</p>
        </div>
        <ArrowRight className="mx-auto shrink-0 rotate-90 text-ink/30 md:rotate-0" />
        <div className="flex-1 rounded-3xl bg-code p-5">
          <pre className="font-mono text-[13px] leading-6 text-white/85">
            <span className="text-lime">def</span> to_usd(ksh, rate):{"\n"}
            {"    "}usd = ksh / rate{"\n"}
            {"    "}<span className="text-lime">return</span> <span className="text-[#c5a3ff]">round</span>(usd, <span className="text-[#8fd3ff]">2</span>)
          </pre>
          <p className="mt-4 border-t border-white/10 pt-3 font-mono text-xs text-white/50">
            {ksh} / {rate} = {(ksh / rate).toFixed(6)} → rounded
          </p>
        </div>
        <ArrowRight className="mx-auto shrink-0 rotate-90 text-ink/30 md:rotate-0" />
        <motion.div
          key={result}
          initial={{ scale: 0.94 }}
          animate={{ scale: 1 }}
          className="rounded-2xl bg-lime p-4 text-center md:w-40"
        >
          <p className="eyebrow text-ink/60">Returns</p>
          <p className="mt-1 font-mono text-lg font-semibold text-ink">{result}</p>
        </motion.div>
      </div>

      <p className="rounded-2xl bg-cream px-5 py-4 font-mono text-sm text-ink/80">
        price_usd = to_usd({ksh}, {rate}) <span className="text-ink/40"># price_usd is now {result}</span>
      </p>
    </div>
  );
}
