"use client";

import { useState } from "react";

const prices = [80, 120, 95, 150, 60, 210];

const transforms = [
  { id: "same", label: "keep it", expr: "p", fn: (p: number) => p },
  { id: "vat", label: "add 16% VAT", expr: "round(p * 1.16)", fn: (p: number) => Math.round(p * 1.16) },
  { id: "usd", label: "to USD", expr: "round(p / 129, 2)", fn: (p: number) => Math.round((p / 129) * 100) / 100 },
];
const filters = [
  { id: "all", label: "every price", expr: "", fn: () => true },
  { id: "over100", label: "only over 100", expr: " if p > 100", fn: (p: number) => p > 100 },
  { id: "under100", label: "only under 100", expr: " if p < 100", fn: (p: number) => p < 100 },
];

/** Build a list comprehension and see the loop it replaces. */
export default function ComprehensionBuilder({ onInteract }: { onInteract: () => void }) {
  const [t, setT] = useState(transforms[1]);
  const [f, setF] = useState(filters[0]);
  const result = prices.filter(f.fn).map(t.fn);

  const pick = <T,>(set: (v: T) => void, v: T) => {
    set(v);
    onInteract();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="eyebrow text-ink/40">Do this to each price</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {transforms.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => pick(setT, x)}
                className={`rounded-lg px-3 py-1.5 text-sm ring-1 ${t.id === x.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-ink/40">Keep</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => pick(setF, x)}
                className={`rounded-lg px-3 py-1.5 text-sm ring-1 ${f.id === x.id ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/15"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-code p-5 font-mono text-[13px] leading-7 text-white/85">
          <p className="eyebrow mb-2 font-sans text-white/40">The loop way — 4 lines</p>
          <p>result = []</p>
          <p>
            <span className="text-lime">for</span> p <span className="text-lime">in</span> prices:
          </p>
          {f.expr ? (
            <>
              <p>
                {"    "}
                <span className="text-lime">if</span> {f.expr.replace(" if ", "")}:
              </p>
              <p className="whitespace-pre">{"        "}result.append({t.expr})</p>
            </>
          ) : (
            <p className="whitespace-pre">{"    "}result.append({t.expr})</p>
          )}
        </div>
        <div className="rounded-3xl bg-code p-5 font-mono text-[13px] leading-7 text-white/85">
          <p className="eyebrow mb-2 font-sans text-white/40">The comprehension way — 1 line</p>
          <p>
            result = [<span className="text-[#8fd3ff]">{t.expr}</span> <span className="text-lime">for</span> p{" "}
            <span className="text-lime">in</span> prices<span className="text-[#f5c07a]">{f.expr}</span>]
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-cream p-5">
        <p className="font-mono text-sm text-ink/55">prices = [{prices.join(", ")}]</p>
        <p className="mt-2 font-mono text-sm text-ink">result = [{result.join(", ")}]</p>
      </div>
    </div>
  );
}
