"use client";

import { useState } from "react";
import { AlertTriangle, Check, ShieldCheck } from "lucide-react";

const raw = ["120", "95.5", "abc", "", "80", "1,200"];

function parse(v: string): number | null {
  if (!/^-?\d+(\.\d+)?$/.test(v.trim())) return null;
  return Number(v);
}

/** Feed messy values through float() with and without a safety net. */
export default function TryExcept({ onInteract }: { onInteract: () => void }) {
  const [guarded, setGuarded] = useState(false);
  const [upTo, setUpTo] = useState(raw.length);

  const rows: { v: string; out: string; kind: "ok" | "skipped" | "crash" | "never" }[] = [];
  let crashed = false;
  for (const [i, v] of raw.entries()) {
    if (i >= upTo) break;
    if (crashed) {
      rows.push({ v, out: "never ran", kind: "never" });
      continue;
    }
    const n = parse(v);
    if (n !== null) rows.push({ v, out: String(n), kind: "ok" });
    else if (guarded) rows.push({ v, out: "skipped — logged a warning", kind: "skipped" });
    else {
      rows.push({ v, out: `ValueError: could not convert string to float: '${v}'`, kind: "crash" });
      crashed = true;
    }
  }
  const total = rows.filter((r) => r.kind === "ok").reduce((s, r) => s + Number(r.out), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl bg-ink/5 p-1">
          {[false, true].map((g) => (
            <button
              key={String(g)}
              type="button"
              onClick={() => {
                setGuarded(g);
                onInteract();
              }}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${guarded === g ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50"}`}
            >
              {g ? "With try / except" : "Without"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setUpTo((u) => (u >= raw.length ? 1 : u + 1));
            onInteract();
          }}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-ink/60 ring-1 ring-ink/15 hover:ring-ink/40"
        >
          {upTo >= raw.length ? "Replay from the start" : "Next value"}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <pre className="overflow-x-auto rounded-3xl bg-code p-5 font-mono text-[13px] leading-7 text-white/85">
          {`total = 0
for v in values:
`}
          {guarded
            ? `    try:
        total += float(v)
    except ValueError:
        print("skipping", repr(v))`
            : `    total += float(v)`}
        </pre>

        <ul className="space-y-2">
          {rows.map((r, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 rounded-xl px-4 py-2.5 text-sm ring-1 ${
                r.kind === "ok"
                  ? "bg-paper ring-ink/10"
                  : r.kind === "skipped"
                    ? "bg-lime-soft ring-lime-deep/20"
                    : r.kind === "crash"
                      ? "bg-danger-soft ring-danger/30"
                      : "bg-cream text-ink/35 ring-ink/5"
              }`}
            >
              {r.kind === "ok" && <Check size={15} className="mt-0.5 shrink-0 text-lime-deep" />}
              {r.kind === "skipped" && <ShieldCheck size={15} className="mt-0.5 shrink-0 text-lime-deep" />}
              {r.kind === "crash" && <AlertTriangle size={15} className="mt-0.5 shrink-0 text-danger" />}
              {r.kind === "never" && <span className="w-[15px]" />}
              <span className="w-20 shrink-0 font-mono">{JSON.stringify(r.v)}</span>
              <span className={`font-mono text-xs ${r.kind === "crash" ? "text-danger" : "text-ink/60"}`}>{r.out}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="rounded-2xl bg-cream px-5 py-4 font-mono text-sm text-ink">
        {rows.some((r) => r.kind === "crash")
          ? "Program stopped. total was never printed."
          : `total = ${total}`}
      </p>
    </div>
  );
}
