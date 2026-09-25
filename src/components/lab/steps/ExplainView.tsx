"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, MessageSquareText } from "lucide-react";
import type { ExplainStep } from "@/lib/curriculum/types";
import RichText from "../RichText";

function coveredIdeas(step: ExplainStep, text: string) {
  return step.ideas.map((idea) =>
    idea.patterns.some((p) => new RegExp(p, "i").test(text)),
  );
}

export default function ExplainView({
  step,
  done,
  onComplete,
}: {
  step: ExplainStep;
  done: boolean;
  onComplete: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<boolean[] | null>(null);
  const [tries, setTries] = useState(0);
  const [showModel, setShowModel] = useState(done);

  const needed = Math.ceil(step.ideas.length / 2);
  const coveredCount = submitted?.filter(Boolean).length ?? 0;
  const tooShort = text.trim().split(/\s+/).filter(Boolean).length < 6;

  function submit() {
    const result = coveredIdeas(step, text);
    setSubmitted(result);
    const nextTries = tries + 1;
    setTries(nextTries);
    const count = result.filter(Boolean).length;
    if (count >= needed || nextTries >= 3) {
      setShowModel(true);
      onComplete();
    }
  }

  const firstMissing = submitted
    ? step.ideas.find((_, i) => !submitted[i])
    : undefined;

  return (
    <div className="w-full px-6 md:px-10 xl:px-16 py-12 md:py-16">
      <div className="max-w-4xl">
      <div className="flex items-center gap-2 text-lime-deep">
        <MessageSquareText size={16} />
        <p className="eyebrow">In your own words</p>
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {step.title}
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-ink/70">
        <RichText text={step.prompt} />
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Write it like you're explaining it to a friend who missed class…"
        className="mt-6 w-full resize-y rounded-2xl border border-ink/15 bg-paper p-5 text-[15px] leading-relaxed text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink/45">
          Nurulabs checks your answer for the key ideas. Wording is up to you.
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={tooShort}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper disabled:opacity-30"
        >
          {submitted ? "Check again" : "Check my explanation"}
        </button>
      </div>

      {submitted && (
        <motion.div
          key={tries}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl bg-paper p-6 ring-1 ring-ink/10"
        >
          <p className="font-display text-lg font-semibold text-ink">
            {coveredCount === step.ideas.length
              ? "You covered every key idea."
              : coveredCount >= needed
                ? "Solid — you've got the core of it."
                : "Good start. One idea is still missing."}
          </p>
          <ul className="mt-4 space-y-2.5">
            {step.ideas.map((idea, i) => (
              <li key={idea.label} className="flex items-center gap-2.5 text-sm">
                {submitted[i] ? (
                  <CheckCircle2 size={17} className="shrink-0 text-lime-deep" />
                ) : (
                  <CircleDashed size={17} className="shrink-0 text-ink/30" />
                )}
                <span className={submitted[i] ? "text-ink" : "text-ink/50"}>
                  {idea.label}
                </span>
              </li>
            ))}
          </ul>
          {firstMissing && (
            <p className="mt-5 border-t border-ink/10 pt-4 text-sm leading-relaxed text-ink/70">
              <span className="font-semibold text-ink">Think about this: </span>
              <RichText text={firstMissing.nudge} />
            </p>
          )}
        </motion.div>
      )}

      {showModel && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-3xl bg-lime-soft p-6 text-ink ring-1 ring-lime-deep/20"
        >
          <p className="eyebrow text-lime-deep">One way to say it</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
            <RichText text={step.modelAnswer} />
          </p>
        </motion.div>
      )}
      </div>
    </div>
  );
}
