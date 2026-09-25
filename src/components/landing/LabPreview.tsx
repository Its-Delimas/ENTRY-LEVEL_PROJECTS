"use client";

import { motion } from "framer-motion";
import { Bot, Check, X } from "lucide-react";

const rail = [
  { label: "Lesson", state: "done" },
  { label: "Interactive", state: "done" },
  { label: "Quiz", state: "done" },
  { label: "Practice", state: "current" },
  { label: "Reflect", state: "todo" },
] as const;

const checks = [
  { label: "18 mm gives \"wait\"", ok: true },
  { label: "40 mm gives \"plant\"", ok: true },
  { label: "Exactly 25 mm gives \"plant\"", ok: false },
];

/** A faithful, static picture of a real lab step — Lab 02, "Plant or wait?". */
export default function LabPreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
      <div className="border-b border-ink/10 px-5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink/45">Python for AI · Lab 02</p>
          <p className="font-display text-sm font-semibold text-ink">Making Decisions</p>
        </div>
        <div className="mt-3 flex gap-1">
          {rail.map((r) => (
            <div key={r.label} className="flex-1">
              <span
                className={`block h-1.5 rounded-full ${
                  r.state === "done" ? "bg-lime-deep" : r.state === "current" ? "bg-ink" : "bg-ink/10"
                }`}
              />
              <span className={`mt-1.5 block text-[10px] font-semibold ${r.state === "todo" ? "text-ink/30" : "text-ink/60"}`}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-4 p-5">
          <div>
            <p className="eyebrow text-lime-deep">Practice</p>
            <p className="mt-1 font-display text-base font-semibold text-ink">Plant or wait?</p>
          </div>
          <ul className="space-y-2">
            {checks.map((c, i) => (
              <motion.li
                key={c.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="flex items-center gap-2 text-xs text-ink/75"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    c.ok ? "bg-lime text-onlime" : "bg-danger-soft text-danger"
                  }`}
                >
                  {c.ok ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                </span>
                {c.label}
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="rounded-2xl bg-cream p-3.5"
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-lime-deep">
              <Bot size={12} /> MENTOR
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
              At exactly 25 mm the farmer should plant. <code className="rounded bg-ink/10 px-1 font-mono">&gt;</code> means
              more than — you need at least: <code className="rounded bg-ink/10 px-1 font-mono">&gt;=</code>.
            </p>
          </motion.div>
        </div>
        <div className="bg-code p-5 font-mono text-[12px] leading-6 whitespace-pre text-white/85">
          <p>
            rain_mm = <span className="text-[#8fd3ff]">18</span>
          </p>
          <p className="mt-2">
            <span className="text-lime">if</span> rain_mm <span className="rounded bg-[#ff8a8a]/25 px-0.5">&gt;</span>{" "}
            <span className="text-[#8fd3ff]">25</span>:
          </p>
          <p>
            {"    "}advice = <span className="text-[#f5c07a]">&quot;plant&quot;</span>
          </p>
          <p>
            <span className="text-lime">else</span>:
          </p>
          <p>
            {"    "}advice = <span className="text-[#f5c07a]">&quot;wait&quot;</span>
          </p>
          <p className="mt-4 border-t border-white/10 pt-3 text-white/45">Output</p>
          <p className="text-white/80">Advice: wait</p>
        </div>
      </div>
    </div>
  );
}
