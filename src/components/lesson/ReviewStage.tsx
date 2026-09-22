import Link from "next/link";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import type { ReviewCheck } from "@/lib/lessons/rainfall-yield";
import type { ReviewResult } from "@/hooks/usePyodideWorker";

export default function ReviewStage({
  checks,
  results,
  onBackToPractice,
}: {
  checks: ReviewCheck[];
  results: ReviewResult[];
  onBackToPractice: () => void;
}) {
  const byId = new Map(results.map((r) => [r.id, r]));
  const allPassed = checks.every((c) => byId.get(c.id)?.passed);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="eyebrow text-lime-deep">Review</p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
        {allPassed
          ? "Your model passes review."
          : "Close — a couple of things to fix."}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
        {allPassed
          ? "Your code ran end to end and met the bar for this mission. Here's what we checked:"
          : "Your code ran without errors, but didn't meet every bar we check for. Here's the breakdown:"}
      </p>

      <ul className="mt-8 space-y-3">
        {checks.map((check) => {
          const result = byId.get(check.id);
          const passed = !!result?.passed;
          return (
            <li
              key={check.id}
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                passed
                  ? "border-lime-deep/20 bg-lime-soft"
                  : "border-ink/10 bg-cream"
              }`}
            >
              {passed ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-lime-deep"
                />
              ) : (
                <XCircle size={18} className="mt-0.5 shrink-0 text-ink/40" />
              )}
              <div>
                <p className="text-sm font-semibold text-ink">
                  {check.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  {passed ? check.passDetail : check.failDetail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        {!allPassed && (
          <button
            type="button"
            onClick={onBackToPractice}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            <RotateCcw size={16} />
            Back to practice
          </button>
        )}
        <Link
          href="/dashboard"
          className="rounded-md border border-ink/15 px-6 py-3 text-sm font-semibold text-ink"
        >
          {allPassed ? "Back to dashboard" : "Leave it for now"}
        </Link>
      </div>
    </div>
  );
}
