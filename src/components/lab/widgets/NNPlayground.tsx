"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import Slider from "./Slider";

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
// Two interleaving half-moons.
const DATA = (() => {
  const r = seeded(3);
  const g = () => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
  return Array.from({ length: 160 }, (_, i) => {
    const t = Math.PI * r();
    const c = i % 2;
    const x = c ? 1 - Math.cos(t) : Math.cos(t);
    const y = c ? 0.5 - Math.sin(t) : Math.sin(t);
    return { x: (x + 1) / 3 + g() * 0.05, y: (y + 0.75) / 2 + g() * 0.05, c };
  });
})();

type Net = { W1: number[][]; b1: number[]; W2: number[]; b2: number };

function initNet(h: number): Net {
  const r = seeded(h * 13 + 1);
  return { W1: Array.from({ length: h }, () => [r() * 4 - 2, r() * 4 - 2]), b1: Array.from({ length: h }, () => r() * 2 - 1), W2: Array.from({ length: h }, () => r() * 2 - 1), b2: 0 };
}
const sig = (z: number) => 1 / (1 + Math.exp(-z));

function forward(n: Net, x: number, y: number) {
  const hid = n.W1.map((w, j) => Math.tanh(w[0] * (x - 0.5) * 4 + w[1] * (y - 0.5) * 4 + n.b1[j]));
  return { hid, out: sig(hid.reduce((s, h, j) => s + h * n.W2[j], n.b2)) };
}

function trainEpoch(n: Net, lr: number): Net {
  const W1 = n.W1.map((w) => [...w]), b1 = [...n.b1], W2 = [...n.W2];
  let b2 = n.b2;
  for (const p of DATA) {
    const xi = (p.x - 0.5) * 4, yi = (p.y - 0.5) * 4;
    const hid = W1.map((w, j) => Math.tanh(w[0] * xi + w[1] * yi + b1[j]));
    const out = sig(hid.reduce((s, h, j) => s + h * W2[j], b2));
    const d = out - p.c;
    for (let j = 0; j < W2.length; j++) {
      const dh = d * W2[j] * (1 - hid[j] ** 2);
      W2[j] -= lr * d * hid[j];
      W1[j][0] -= lr * dh * xi;
      W1[j][1] -= lr * dh * yi;
      b1[j] -= lr * dh;
    }
    b2 -= lr * d;
  }
  return { W1, b1, W2, b2 };
}

/** Train a tiny neural network live and watch its decision boundary bend. */
export default function NNPlayground({ onInteract }: { onInteract: () => void }) {
  const [hidden, setHidden] = useState(3);
  const [net, setNet] = useState<Net>(() => initNet(3));
  const [epoch, setEpoch] = useState(0);
  const [playing, setPlaying] = useState(false);
  const netRef = useRef(net);
  useEffect(() => { netRef.current = net; }, [net]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      let n = netRef.current;
      for (let i = 0; i < 5; i++) n = trainEpoch(n, 0.05);
      setNet(n);
      setEpoch((e) => e + 5);
    }, 60);
    return () => clearInterval(id);
  }, [playing]);

  const acc = useMemo(() => DATA.filter((p) => (forward(net, p.x, p.y).out > 0.5 ? 1 : 0) === p.c).length / DATA.length, [net]);
  const G = 28, S = 300;
  const cells = useMemo(() => {
    const out: { x: number; y: number; v: number }[] = [];
    for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) out.push({ x: i, y: j, v: forward(net, (i + 0.5) / G, 1 - (j + 0.5) / G).out });
    return out;
  }, [net]);

  function reset(h = hidden) {
    setPlaying(false);
    setNet(initNet(h));
    setEpoch(0);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full max-w-md rounded-2xl ring-1 ring-ink/10" role="img" aria-label="Neural network decision regions over two-moons data">
        {cells.map((c, i) => (
          <rect key={i} x={(c.x * S) / G} y={(c.y * S) / G} width={S / G + 0.5} height={S / G + 0.5} fill={c.v > 0.5 ? "#e5484d" : "#5b8def"} opacity={0.12 + Math.abs(c.v - 0.5) * 0.5} />
        ))}
        {DATA.map((p, i) => (
          <circle key={i} cx={p.x * S} cy={(1 - p.y) * S} r="3.5" fill={p.c ? "#e5484d" : "#1f3b8f"} stroke="white" strokeWidth="0.8" />
        ))}
      </svg>
      <div className="space-y-5">
        <Slider label="hidden neurons" value={hidden} min={1} max={8} onChange={(v) => { setHidden(v); reset(v); onInteract(); }} />
        <div className="flex gap-2">
          <button type="button" onClick={() => { setPlaying((p) => !p); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
            {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Train"}
          </button>
          <button type="button" onClick={() => { reset(); onInteract(); }} className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ink/55 ring-1 ring-ink/15">
            <RotateCcw size={13} /> Reset
          </button>
        </div>
        <div className="rounded-2xl bg-lime-soft p-5 ring-1 ring-lime-deep/20">
          <p className="font-mono text-sm text-ink">epoch {epoch}</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">{Math.round(acc * 100)}% correct</p>
        </div>
        <p className="text-xs leading-relaxed text-ink/55">
          Each hidden neuron draws one straight line; the output neuron combines them. One neuron can only split the plane in two — watch what a few more can do with the curved moons.
        </p>
      </div>
    </div>
  );
}
