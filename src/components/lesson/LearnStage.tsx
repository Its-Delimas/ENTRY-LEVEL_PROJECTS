import { ArrowRight } from "lucide-react";
import type { Lesson } from "@/lib/lessons/rainfall-yield";

export default function LearnStage({
  teach,
  onContinue,
}: {
  teach: Lesson["teach"];
  onContinue: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="eyebrow text-lime-deep">Learn</p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
        {teach.heading}
      </h1>

      <div className="mt-8 space-y-5">
        {teach.paragraphs.map((p) => (
          <p key={p} className="text-[15px] leading-relaxed text-ink/70">
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-10 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
        {teach.terms.map((t) => (
          <div key={t.term}>
            <dt className="text-sm font-semibold text-ink">{t.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink/60">
              {t.definition}
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onContinue}
        className="mt-10 inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white"
      >
        See it worked out
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
