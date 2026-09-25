"use client";

import { useState } from "react";

type Mode = "characters" | "words" | "subwords";

// A small illustrative subword vocabulary (real tokenizers learn ~50,000 of these).
const PIECES = ["ing", "tion", "ed", "but", "was", "is", "on", "sana", "good", "well", "late", "fast", "time", "agent", "germin", "ate", "ele", "ile", "er", "ly", "ni", "wa", "ku", "li", "ta", "na", "ka", "ma", "ha", "an", "the", "and", "de", "liv", "ery", "app", "farm", "maize", "seed", "price", "mb", "ch", "sh"];

function subwords(word: string) {
  const out: string[] = [];
  let i = 0;
  while (i < word.length) {
    let best = word[i];
    for (const p of PIECES) if (word.startsWith(p, i) && p.length > best.length) best = p;
    out.push(best);
    i += best.length;
  }
  return out;
}

function tokenize(text: string, mode: Mode) {
  if (mode === "characters") return text.split("");
  const words = text.toLowerCase().match(/[a-z']+|[0-9]+|[^\sa-z0-9]/g) ?? [];
  if (mode === "words") return words;
  return words.flatMap((w) => (/^[a-z]+$/.test(w) ? subwords(w).map((p, i) => (i ? "##" + p : p)) : [w]));
}

/** See how text is chopped into tokens — the units every language model counts in. */
export default function TokenizerExplorer({ onInteract }: { onInteract: () => void }) {
  const [text, setText] = useState("Delivery ilichelewa sana, but the farmer's maize seeds germinated!");
  const [mode, setMode] = useState<Mode>("words");
  const tokens = tokenize(text, mode);

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); onInteract(); }}
        rows={2}
        className="w-full rounded-2xl border border-ink/15 bg-paper p-4 text-[15px] text-ink focus:border-ink focus:outline-none"
      />
      <div className="inline-flex rounded-xl bg-ink/5 p-1">
        {(["characters", "words", "subwords"] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => { setMode(m); onInteract(); }} className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${mode === m ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50"}`}>
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 rounded-2xl bg-cream p-4">
        {tokens.map((t, i) => (
          <span key={i} className="rounded-md bg-paper px-2 py-1 font-mono text-xs text-ink ring-1 ring-ink/10">{t === " " ? "␣" : t}</span>
        ))}
      </div>
      <p className="text-sm text-ink/65">
        <span className="font-semibold text-ink">{tokens.length} tokens.</span>{" "}
        {mode === "characters"
          ? "Tiny vocabulary, but sequences get very long and single letters carry little meaning."
          : mode === "words"
            ? "Short sequences, but every new word or spelling — ilichelewa, germinated — needs its own vocabulary entry."
            : "The compromise modern models use: common pieces are one token, rare words split into known pieces (## marks a continuation). This toy vocabulary is tiny; real ones have tens of thousands of pieces, and often split Swahili into more pieces than English."}
      </p>
    </div>
  );
}
