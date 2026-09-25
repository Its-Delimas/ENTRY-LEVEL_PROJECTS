"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Py = { value: string; type: "int" | "float" | "str" | "bool" | "NoneType" };

const typeColor: Record<Py["type"], string> = {
  int: "bg-[#dff1ff] text-[#0b5c8f]",
  float: "bg-[#e6e3ff] text-[#4b3aa8]",
  str: "bg-[#fff0d9] text-[#8a5300]",
  bool: "bg-lime-soft text-lime-deep",
  NoneType: "bg-mist text-ink/60",
};

function evaluate(raw: string, memory: Record<string, Py>): Py | { error: string } {
  const v = raw.trim();
  if (/^-?\d+$/.test(v)) return { value: v, type: "int" };
  if (/^-?\d*\.\d+$/.test(v)) return { value: v, type: "float" };
  if (/^(".*"|'.*')$/.test(v)) return { value: `"${v.slice(1, -1)}"`, type: "str" };
  if (v === "True" || v === "False") return { value: v, type: "bool" };
  if (v === "None") return { value: v, type: "NoneType" };
  if (v === "true" || v === "false")
    return { error: `NameError: name '${v}' is not defined. Python spells it with a capital: ${v === "true" ? "True" : "False"}.` };
  if (/^[A-Za-z_]\w*$/.test(v)) {
    if (memory[v]) return memory[v];
    return { error: `NameError: name '${v}' is not defined. If you meant text, put it in quotes: "${v}".` };
  }
  if (v === "") return { error: "Put a value on the right of the = sign." };
  return { error: "SyntaxError: Python can't read that value. Try a number, True/False, or text in quotes." };
}

export default function VariableBoxes({ onInteract }: { onInteract: () => void }) {
  const [memory, setMemory] = useState<Record<string, Py>>({
    market: { value: '"Gikomba"', type: "str" },
    price_ksh: { value: "120", type: "int" },
  });
  const [name, setName] = useState("price_ksh");
  const [value, setValue] = useState("135");
  const [message, setMessage] = useState<string | null>(null);

  function store() {
    if (!/^[A-Za-z_]\w*$/.test(name.trim())) {
      setMessage("Variable names use letters, digits and underscores, and can't start with a digit.");
      onInteract();
      return;
    }
    const result = evaluate(value, memory);
    onInteract();
    if ("error" in result) {
      setMessage(result.error);
      return;
    }
    const existed = !!memory[name.trim()];
    setMemory((m) => ({ ...m, [name.trim()]: result }));
    setMessage(existed ? `${name.trim()} now points at a new value — the old one is gone.` : null);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div>
        <p className="eyebrow text-ink/40">Write an assignment</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            store();
          }}
          className="mt-3 flex items-center gap-2 rounded-2xl bg-code p-3 font-mono text-sm"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Variable name"
            className="w-28 min-w-0 rounded-lg bg-white/10 px-3 py-2 text-lime outline-none focus:ring-1 focus:ring-lime"
          />
          <span className="text-white/60">=</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Value"
            className="min-w-0 flex-1 rounded-lg bg-white/10 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-lime"
          />
          <button type="submit" className="rounded-lg bg-lime px-3 py-2 font-sans text-xs font-semibold text-onlime">
            Run
          </button>
        </form>
        <p className="mt-3 text-xs leading-relaxed text-ink/50">
          Try: <code className="font-mono">120.5</code>, <code className="font-mono">&quot;Nakuru&quot;</code>,{" "}
          <code className="font-mono">Nakuru</code> (no quotes), <code className="font-mono">True</code>,{" "}
          <code className="font-mono">true</code>, or another variable&apos;s name like{" "}
          <code className="font-mono">market</code>.
        </p>
        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 rounded-xl p-3.5 font-mono text-xs leading-relaxed ${
                message.includes("Error") ? "bg-danger-soft text-danger" : "bg-cream text-ink/70"
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-3xl border border-dashed border-ink/15 bg-cream/60 p-5">
        <p className="eyebrow text-ink/40">Python&apos;s memory</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <AnimatePresence>
            {Object.entries(memory).map(([k, v]) => (
              <motion.div
                key={k + v.value}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-2xl bg-paper p-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-ink/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-xs font-semibold text-ink">{k}</span>
                  <span className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold ${typeColor[v.type]}`}>
                    {v.type}
                  </span>
                </div>
                <p className="mt-3 truncate font-mono text-lg text-ink">{v.value}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
