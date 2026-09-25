"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, X } from "lucide-react";
import { allLabs } from "@/lib/curriculum/labs";

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

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const liveLabs = allLabs.length;
const activities = allLabs.reduce((n, l) => n + l.steps.length, 0);

const stats = [
  { value: "Free", label: "Every track, every lab. No fees." },
  { value: String(liveLabs), label: "Hands-on labs live today" },
  { value: `${activities}+`, label: "Lessons, interactives and exercises" },
  { value: "0", label: "Installs — Python runs in your browser" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/images/coder-night.jpg"
        alt="A developer in headphones writing code on a large monitor"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      {/* Flat scrim: keeps the photo visible but the text readable. */}
      <div className="absolute inset-0 -z-10 bg-ink/75 md:bg-ink/70" />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 pt-36 pb-16 md:min-h-[92vh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:pt-32">
        <div>
          <motion.p custom={0} initial="hidden" animate="show" variants={fadeUp} className="eyebrow text-lime">
            Free · Africa&apos;s hands-on AI academy
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl"
          >
            Learn AI by{" "}
            <span className="relative whitespace-nowrap">
              building it
              <svg viewBox="0 0 300 12" className="absolute -bottom-1 left-0 h-3 w-full text-lime" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 9C60 3 240 3 298 9" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="show" variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            A free, structured programme that starts at your first line of Python and ends with models you
            trained yourself. Every lesson is followed by something you <em>do</em> — with a mentor that reads your
            errors with you.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/tracks" className="inline-flex items-center gap-2 rounded-md bg-lime px-7 py-4 text-sm font-semibold text-ink">
              Start learning — it&apos;s free
              <ArrowRight size={16} />
            </Link>
            <a href="#try" className="rounded-md border border-white/25 px-7 py-4 text-sm font-semibold text-white hover:border-white/60">
              Try an interactive
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="hidden md:block"
        >
          <LabPreview />
        </motion.div>
      </div>

      <div className="border-t border-white/10 bg-ink/40">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="py-7 md:py-8"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className={`font-display text-3xl font-semibold ${i === 0 ? "text-lime" : "text-white"}`}>{s.value}</span>
                <span className="mt-1 block text-xs text-white/55">{s.label}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** A faithful, static picture of a real lab step — Lab 02, "Plant or wait?". */
function LabPreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
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
                    c.ok ? "bg-lime text-ink" : "bg-[#ffe3e3] text-[#c4262b]"
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
        <div className="bg-ink p-5 font-mono text-[12px] leading-6 whitespace-pre text-white/85">
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
