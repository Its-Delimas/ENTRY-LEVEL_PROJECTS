"use client";

import { useState } from "react";

const lines = [
  "market,county,maize_ksh",
  "Gikomba,Nairobi,62",
  "Kongowea,Mombasa,71",
  "Kibuye,Kisumu,55",
  "Eldoret Main,Uasin Gishu,48",
];
const header = lines[0].split(",");
const rows = lines.slice(1).map((l) => l.split(","));

export default function CsvRows({ onInteract }: { onInteract: () => void }) {
  const [active, setActive] = useState(0);
  const [converted, setConverted] = useState(false);
  const row = rows[active];

  function pick(i: number) {
    setActive(i);
    onInteract();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="eyebrow text-ink/40">prices.csv — just text</p>
          <pre className="mt-3 rounded-3xl bg-cream p-4 font-mono text-[13px] leading-7 text-ink/80">
            {lines.map((l, i) => (
              <span
                key={l}
                onMouseEnter={() => i > 0 && pick(i - 1)}
                onClick={() => i > 0 && pick(i - 1)}
                className={`block cursor-default rounded-md px-3 ${
                  i === 0 ? "font-semibold text-ink" : i - 1 === active ? "bg-lime/40" : ""
                }`}
              >
                {l}
              </span>
            ))}
          </pre>
        </div>
        <div>
          <p className="eyebrow text-ink/40">The same data as a table</p>
          <div className="mt-3 overflow-hidden rounded-3xl ring-1 ring-ink/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  {header.map((h) => (
                    <th key={h} className="px-4 py-2.5 font-mono text-xs font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r[0]}
                    onMouseEnter={() => pick(i)}
                    onClick={() => pick(i)}
                    className={`cursor-default border-t border-ink/5 ${i === active ? "bg-lime/40" : "bg-white"}`}
                  >
                    {r.map((c, j) => (
                      <td key={j} className="px-4 py-2.5 text-ink/80">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-ink p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-lime">What Python gets for this row</p>
          <label className="flex items-center gap-2 text-xs text-white/70">
            <input
              type="checkbox"
              checked={converted}
              onChange={(e) => {
                setConverted(e.target.checked);
                onInteract();
              }}
              className="h-4 w-4 accent-[var(--color-lime)]"
            />
            Convert the price with <code className="font-mono">int()</code>
          </label>
        </div>
        <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-7 text-white/85">
          {"{"}
          {header.map((h, j) => {
            const isNum = converted && h === "maize_ksh";
            return (
              <span key={h}>
                <span className="text-[#f5c07a]">&quot;{h}&quot;</span>:{" "}
                <span className={isNum ? "rounded bg-lime/20 px-1 text-[#8fd3ff]" : "text-[#f5c07a]"}>
                  {isNum ? row[j] : `"${row[j]}"`}
                </span>
                {j < header.length - 1 ? ", " : ""}
              </span>
            );
          })}
          {"}"}
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          {converted
            ? `Now maize_ksh is the number ${row[2]} — you can add it, average it, compare it.`
            : `Notice the quotes: "${row[2]}" is text. "${row[2]}" + "5" would give "${row[2]}5", not ${Number(row[2]) + 5}.`}
        </p>
      </div>
    </div>
  );
}
