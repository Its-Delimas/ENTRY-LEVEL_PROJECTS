"use client";

import { useState } from "react";

/**
 * Shaped like a weather API response for Kisumu. Rain values keep a
 * non-zero decimal so the Python type shown (float) matches what
 * json.load would produce — JavaScript prints 31.0 as 31.
 */
const response = {
  city: "Kisumu",
  country: "KE",
  units: { rain: "mm", temp: "C" },
  daily: [
    { date: "2026-04-14", rain_mm: 12.4, temp_max: 29 },
    { date: "2026-04-15", rain_mm: 31.4, temp_max: 26 },
    { date: "2026-04-16", rain_mm: 0.6, temp_max: 31 },
  ],
};

type Path = (string | number)[];

function access(path: Path) {
  return "data" + path.map((p) => (typeof p === "number" ? `[${p}]` : `["${p}"]`)).join("");
}

function Node({
  value,
  path,
  selected,
  onPick,
  indent,
}: {
  value: unknown;
  path: Path;
  selected: Path;
  onPick: (p: Path) => void;
  indent: number;
}) {
  const pad = "  ".repeat(indent);
  const isSel = JSON.stringify(path) === JSON.stringify(selected);
  const cls = `rounded px-0.5 ${isSel ? "bg-lime/25 ring-1 ring-lime" : "hover:bg-white/10"} cursor-pointer`;

  if (Array.isArray(value)) {
    return (
      <>
        <span className={cls} onClick={() => onPick(path)}>[</span>
        {"\n"}
        {value.map((v, i) => (
          <span key={i}>
            {pad}
            {"  "}
            <Node value={v} path={[...path, i]} selected={selected} onPick={onPick} indent={indent + 1} />
            {i < value.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}]
      </>
    );
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return (
      <>
        <span className={cls} onClick={() => onPick(path)}>{"{"}</span>
        {"\n"}
        {entries.map(([k, v], i) => (
          <span key={k}>
            {pad}
            {"  "}
            <span className="text-[#f5c07a]">&quot;{k}&quot;</span>:{" "}
            <Node value={v} path={[...path, k]} selected={selected} onPick={onPick} indent={indent + 1} />
            {i < entries.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}
        {"}"}
      </>
    );
  }
  return (
    <span className={`${cls} ${typeof value === "string" ? "text-[#f5c07a]" : "text-[#8fd3ff]"}`} onClick={() => onPick(path)}>
      {JSON.stringify(value)}
    </span>
  );
}

/** Click anywhere in a JSON response to get the Python that reaches it. */
export default function JsonExplorer({ onInteract }: { onInteract: () => void }) {
  const [path, setPath] = useState<Path>(["daily", 1, "rain_mm"]);
  let value: unknown = response;
  for (const p of path) value = (value as Record<string | number, unknown>)[p];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <pre className="overflow-x-auto rounded-3xl bg-code p-5 font-mono text-[13px] leading-6 text-white/85">
        <Node
          value={response}
          path={[]}
          selected={path}
          indent={0}
          onPick={(p) => {
            setPath(p);
            onInteract();
          }}
        />
      </pre>
      <div className="space-y-4">
        <p className="text-sm text-ink/55">Click any value, list or object on the left.</p>
        <div className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
          <p className="eyebrow text-ink/40">Python to reach it</p>
          <p className="mt-2 font-mono text-sm break-all text-ink">{access(path)}</p>
        </div>
        <div className="rounded-2xl bg-cream p-5">
          <p className="eyebrow text-ink/40">What you get</p>
          <p className="mt-2 font-mono text-sm break-all text-ink">
            {typeof value === "object" ? (Array.isArray(value) ? `a list of ${value.length} items` : "a dictionary") : JSON.stringify(value)}
          </p>
          <p className="mt-2 text-xs text-ink/50">
            type: {Array.isArray(value) ? "list" : value === null ? "None" : typeof value === "object" ? "dict" : typeof value === "string" ? "str" : Number.isInteger(value) ? "int" : "float"}
          </p>
        </div>
      </div>
    </div>
  );
}
