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
    <ul className="space-y-2">
      {steps.map((step) => {
        const done = completed.has(step.id);
        return (
          <li
            key={step.id}
            className={`flex items-center gap-2 text-sm transition-colors ${
              done ? "text-navy" : "text-navy/40"
            }`}
          >
            <span className={done ? "text-teal" : ""}>{done ? "✓" : "○"}</span>
            {step.label}
          </li>
        );
      })}
    </ul>
  );
}
