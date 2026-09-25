"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, FlaskConical } from "lucide-react";
import type { ExperimentStep, WidgetId } from "@/lib/curriculum/types";
import RichText from "../RichText";
import VariableBoxes from "../widgets/VariableBoxes";
import DecisionThreshold from "../widgets/DecisionThreshold";
import ListExplorer from "../widgets/ListExplorer";
import LoopStepper from "../widgets/LoopStepper";
import FunctionMachine from "../widgets/FunctionMachine";
import DictLookup from "../widgets/DictLookup";
import CsvRows from "../widgets/CsvRows";
import LineFit from "../widgets/LineFit";
import StringMethods from "../widgets/StringMethods";
import ComprehensionBuilder from "../widgets/ComprehensionBuilder";
import TryExcept from "../widgets/TryExcept";
import JsonExplorer from "../widgets/JsonExplorer";
import ClassBlueprint from "../widgets/ClassBlueprint";
import BugHunt from "../widgets/BugHunt";
import ArrayOps from "../widgets/ArrayOps";
import DataFrameOps from "../widgets/DataFrameOps";
import ChartChooser from "../widgets/ChartChooser";
import CorrelationExplorer from "../widgets/CorrelationExplorer";

const widgets: Record<WidgetId, React.ComponentType<{ onInteract: () => void }>> = {
  "variable-boxes": VariableBoxes,
  "decision-threshold": DecisionThreshold,
  "list-explorer": ListExplorer,
  "loop-stepper": LoopStepper,
  "function-machine": FunctionMachine,
  "dict-lookup": DictLookup,
  "csv-rows": CsvRows,
  "line-fit": LineFit,
  "string-methods": StringMethods,
  "comprehension-builder": ComprehensionBuilder,
  "try-except": TryExcept,
  "json-explorer": JsonExplorer,
  "class-blueprint": ClassBlueprint,
  "bug-hunt": BugHunt,
  "array-ops": ArrayOps,
  "dataframe-ops": DataFrameOps,
  "chart-chooser": ChartChooser,
  "correlation-explorer": CorrelationExplorer,
};

/** How much play before the takeaway is revealed. */
const INTERACTIONS_NEEDED = 4;

export default function ExperimentView({
  step,
  done,
  onComplete,
}: {
  step: ExperimentStep;
  done: boolean;
  onComplete: () => void;
}) {
  const [count, setCount] = useState(done ? INTERACTIONS_NEEDED : 0);
  const completedRef = useRef(done);
  const Widget = widgets[step.widget];
  const revealed = count >= INTERACTIONS_NEEDED;

  function onInteract() {
    setCount((c) => c + 1);
    if (!completedRef.current && count + 1 >= INTERACTIONS_NEEDED) {
      completedRef.current = true;
      onComplete();
    }
  }

  return (
    <div className="w-full px-6 md:px-10 xl:px-16 py-12 md:py-14">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-lime-deep">
          <FlaskConical size={16} />
          <p className="eyebrow">Interactive</p>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {step.title}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink/70">
          <RichText text={step.prompt} />
        </p>
      </div>

      <div className="mt-10 rounded-[28px] bg-paper p-5 ring-1 ring-ink/10 md:p-8">
        <Widget onInteract={onInteract} />
      </div>

      <div className="mt-6">
        {revealed ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 rounded-2xl bg-lime-soft p-5 text-ink ring-1 ring-lime-deep/20"
          >
            <Eye size={18} className="mt-0.5 shrink-0 text-lime-deep" />
            <div>
              <p className="eyebrow text-lime-deep">What you just saw</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                <RichText text={step.observe} />
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center gap-3 text-sm text-ink/45">
            <div className="flex gap-1">
              {Array.from({ length: INTERACTIONS_NEEDED }, (_, i) => (
                <span key={i} className={`h-1.5 w-6 rounded-full ${i < count ? "bg-lime-deep" : "bg-ink/10"}`} />
              ))}
            </div>
            Keep experimenting — change things and watch what happens.
          </div>
        )}
      </div>
    </div>
  );
}
