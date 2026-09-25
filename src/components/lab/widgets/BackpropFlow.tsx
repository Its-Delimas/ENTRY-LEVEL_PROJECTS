"use client";

import { useState } from "react";
import { RotateCcw, StepForward } from "lucide-react";

const X = 2, Y = 1; // one example: input 2, target 1
const LR = 0.5;
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

/** Follow one example forward through a neuron, then its error backward, then update. */
export default function BackpropFlow({ onInteract }: { onInteract: () => void }) {
  const [w, setW] = useState(-0.5);
  const [b, setB] = useState(0.2);
  const [phase, setPhase] = useState<"forward" | "backward" | "update">("forward");
  const [history, setHistory] = useState<number[]>([]);

  const z = w * X + b;
  const p = sigmoid(z);
  const loss = (p - Y) ** 2;
  const dL_dp = 2 * (p - Y);
  const dp_dz = p * (1 - p);
  const dL_dz = dL_dp * dp_dz;
  const dL_dw = dL_dz * X;
  const dL_db = dL_dz;

  function next() {
    if (phase === "forward") setPhase("backward");
    else if (phase === "backward") setPhase("update");
    else {
      setHistory((h) => [...h, loss].slice(-12));
      setW(w - LR * dL_dw);
      setB(b - LR * dL_db);
      setPhase("forward");
    }
    onInteract();
  }

  const node = (label: string, value: string, grad: string | null, active: boolean) => (
    <div className={`rounded-2xl p-3 text-center ring-1 transition-colors ${active ? "bg-lime-soft ring-lime-deep/30" : "bg-paper ring-ink/10"}`}>
      <p className="font-mono text-[11px] text-ink/50">{label}</p>
      <p className="font-mono text-base text-ink">{value}</p>
      {grad && <p className="mt-1 font-mono text-[11px] text-[#e5484d]">∂L = {grad}</p>}
    </div>
  );
  const back = phase !== "forward";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {node("input x", String(X), null, phase === "forward")}
        {node("z = w·x + b", z.toFixed(3), back ? dL_dz.toFixed(3) : null, phase === "forward")}
        {node("p = sigmoid(z)", p.toFixed(3), back ? dL_dp.toFixed(3) : null, phase === "forward")}
        {node("target y", String(Y), null, false)}
        {node("loss (p − y)²", loss.toFixed(3), null, true)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-code p-4 font-mono text-xs leading-6 text-white/85">
          {phase === "forward" && (
            <>
              <p className="text-white/45"># forward: compute the prediction and the loss</p>
              <p>z = {w.toFixed(3)} × {X} + {b.toFixed(3)} = {z.toFixed(3)}</p>
              <p>p = sigmoid(z) = {p.toFixed(3)}</p>
              <p>loss = ({p.toFixed(3)} − {Y})² = {loss.toFixed(3)}</p>
            </>
          )}
          {phase === "backward" && (
            <>
              <p className="text-white/45"># backward: chain rule, from the loss back to each weight</p>
              <p>∂L/∂p = 2(p − y) = {dL_dp.toFixed(3)}</p>
              <p>∂p/∂z = p(1 − p) = {dp_dz.toFixed(3)}</p>
              <p>∂L/∂w = ∂L/∂p · ∂p/∂z · x = {dL_dw.toFixed(3)}</p>
              <p>∂L/∂b = ∂L/∂p · ∂p/∂z = {dL_db.toFixed(3)}</p>
            </>
          )}
          {phase === "update" && (
            <>
              <p className="text-white/45"># update: step each weight against its gradient</p>
              <p>w ← {w.toFixed(3)} − {LR} × {dL_dw.toFixed(3)} = {(w - LR * dL_dw).toFixed(3)}</p>
              <p>b ← {b.toFixed(3)} − {LR} × {dL_db.toFixed(3)} = {(b - LR * dL_db).toFixed(3)}</p>
            </>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <button type="button" onClick={next} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
              <StepForward size={14} /> {phase === "forward" ? "Go backward" : phase === "backward" ? "Update weights" : "Forward again"}
            </button>
            <button type="button" onClick={() => { setW(-0.5); setB(0.2); setPhase("forward"); setHistory([]); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ink/55 ring-1 ring-ink/15">
              <RotateCcw size={13} /> Reset
            </button>
          </div>
          <div className="rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
            <p className="text-xs text-ink/50">Loss after each update</p>
            <div className="mt-2 flex h-16 items-end gap-1">
              {[...history, loss].map((l, i) => (
                <span key={i} className="flex-1 rounded-t bg-[#e5484d]/70" style={{ height: `${Math.max(4, (l / 0.8) * 64)}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
