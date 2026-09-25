"use client";

import { useState } from "react";
import Slider from "./Slider";

/** 1,000 people take a disease test: see why a positive result can still be unlikely. */
export default function BayesGrid({ onInteract }: { onInteract: () => void }) {
  const [prevalence, setPrevalence] = useState(2);
  const [sensitivity, setSensitivity] = useState(90);
  const [falsePos, setFalsePos] = useState(5);

  const sick = Math.round((prevalence / 100) * 1000);
  const healthy = 1000 - sick;
  const tp = Math.round(sick * (sensitivity / 100));
  const fp = Math.round(healthy * (falsePos / 100));
  const posterior = tp + fp ? tp / (tp + fp) : 0;

  // Order cells: true positives, missed sick, false positives, true negatives.
  const cells: ("tp" | "fn" | "fp" | "tn")[] = [
    ...Array(tp).fill("tp"),
    ...Array(sick - tp).fill("fn"),
    ...Array(fp).fill("fp"),
    ...Array(healthy - fp).fill("tn"),
  ];
  const color = { tp: "bg-lime-deep", fn: "bg-lime-deep/30", fp: "bg-[#e5484d]", tn: "bg-ink/10" };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(40, minmax(0, 1fr))" }} role="img" aria-label="1000 people coloured by disease and test result">
          {cells.map((c, i) => (
            <span key={i} className={`aspect-square rounded-[2px] ${color[c]}`} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/60">
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-lime-deep" /> sick, tested positive ({tp})</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#e5484d]" /> healthy, tested positive ({fp})</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-lime-deep/30" /> sick, missed ({sick - tp})</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-ink/10" /> healthy, negative</span>
        </div>
      </div>
      <div className="space-y-5">
        <Slider label="How common is the disease?" value={prevalence} min={0.5} max={30} step={0.5} unit="%" onChange={(v) => { setPrevalence(v); onInteract(); }} />
        <Slider label="Test catches the sick (sensitivity)" value={sensitivity} min={50} max={100} unit="%" onChange={(v) => { setSensitivity(v); onInteract(); }} />
        <Slider label="False alarms in healthy people" value={falsePos} min={0} max={20} step={0.5} unit="%" onChange={(v) => { setFalsePos(v); onInteract(); }} />
        <div className="rounded-2xl bg-lime-soft p-5 ring-1 ring-lime-deep/20">
          <p className="text-sm text-ink/70">You tested positive. Chance you&apos;re actually sick:</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink">{Math.round(posterior * 100)}%</p>
          <p className="mt-1 font-mono text-xs text-ink/55">
            {tp} true positives ÷ ({tp} + {fp}) positives
          </p>
        </div>
      </div>
    </div>
  );
}
