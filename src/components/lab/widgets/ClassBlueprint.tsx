"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Slider from "./Slider";

interface Farm {
  name: string;
  acres: number;
  rain: number;
}

const names = ["Wanjiru's farm", "Otieno's farm", "Achieng's farm", "Kiprop's farm"];
const predict = (f: Farm) => Math.round((0.075 * f.rain - 0.76) * f.acres * 10) / 10;

/** One class, many objects: each farm has its own data and shares the same methods. */
export default function ClassBlueprint({ onInteract }: { onInteract: () => void }) {
  const [acres, setAcres] = useState(2);
  const [rain, setRain] = useState(220);
  const [farms, setFarms] = useState<Farm[]>([{ name: names[0], acres: 3, rain: 180 }]);

  function create() {
    const name = names[farms.length % names.length];
    setFarms((f) => [...f, { name, acres, rain }].slice(-4));
    onInteract();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-5">
        <pre className="overflow-x-auto rounded-3xl bg-code p-5 font-mono text-[12.5px] leading-6 text-white/85">
          <span className="text-lime">class</span> Farm:{"\n"}
          {"    "}<span className="text-lime">def</span> __init__(self, name, acres, rain_mm):{"\n"}
          {"        "}self.name = name{"\n"}
          {"        "}self.acres = acres{"\n"}
          {"        "}self.rain_mm = rain_mm{"\n\n"}
          {"    "}<span className="text-lime">def</span> predicted_bags(self):{"\n"}
          {"        "}per_acre = <span className="text-[#8fd3ff]">0.075</span> * self.rain_mm - <span className="text-[#8fd3ff]">0.76</span>{"\n"}
          {"        "}<span className="text-lime">return</span> per_acre * self.acres
        </pre>
        <Slider label="acres" value={acres} min={1} max={10} onChange={(v) => { setAcres(v); onInteract(); }} />
        <Slider label="rain_mm" value={rain} min={100} max={350} step={10} onChange={(v) => { setRain(v); onInteract(); }} />
        <button
          type="button"
          onClick={create}
          className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper"
        >
          <Plus size={15} />
          farm = Farm(&quot;…&quot;, {acres}, {rain})
        </button>
      </div>

      <div>
        <p className="eyebrow text-ink/40">Objects in memory — {farms.length}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AnimatePresence>
            {farms.map((f, i) => (
              <motion.div
                key={f.name + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-paper p-4 ring-1 ring-ink/10"
              >
                <p className="font-mono text-[11px] text-ink/40">Farm object</p>
                <p className="mt-1 font-display text-sm font-semibold text-ink">{f.name}</p>
                <dl className="mt-3 space-y-1 font-mono text-xs text-ink/70">
                  <div className="flex justify-between"><dt>.acres</dt><dd>{f.acres}</dd></div>
                  <div className="flex justify-between"><dt>.rain_mm</dt><dd>{f.rain}</dd></div>
                </dl>
                <p className="mt-3 rounded-lg bg-lime-soft px-2.5 py-1.5 font-mono text-xs text-ink">
                  .predicted_bags() → {predict(f)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
