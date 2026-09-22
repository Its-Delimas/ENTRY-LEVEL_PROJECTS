"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import type { ChecklistStep } from "@/lib/lessons/rainfall-yield";

interface MissionChecklistProps {
  steps: ChecklistStep[];
  completed: Set<string>;
}

export default function MissionChecklist({
  steps,
  completed,
}: MissionChecklistProps) {
  return (
    <ul className="space-y-2.5">
      {steps.map((step) => {
        const done = completed.has(step.id);
        return (
          <li
            key={step.id}
            className={`flex items-center gap-2.5 text-sm transition-colors ${
              done ? "text-ink" : "text-ink/35"
            }`}
          >
            <span
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border transition-colors ${
                done
                  ? "border-lime bg-lime text-ink"
                  : "border-ink/25 bg-transparent"
              }`}
            >
              <AnimatePresence>
                {done && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            {step.label}
          </li>
        );
      })}
    </ul>
  );
}
