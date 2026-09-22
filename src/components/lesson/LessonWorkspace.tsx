"use client";

import { useMemo, useState } from "react";
import { Play, PartyPopper } from "lucide-react";
import type { Lesson } from "@/lib/lessons/rainfall-yield";
import { usePyodideWorker } from "@/hooks/usePyodideWorker";
import Logo from "@/components/landing/Logo";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import MissionChecklist from "./MissionChecklist";
import MentorPanel from "./MentorPanel";

export default function LessonWorkspace({ lesson }: { lesson: Lesson }) {
  const [code, setCode] = useState(lesson.starterCode);
  const [lastError, setLastError] = useState<string | null>(null);
  const { status, output, running, run } = usePyodideWorker();

  const completed = useMemo(() => {
    const done = new Set<string>();
    for (const step of lesson.checklist) {
      if (output.includes(step.marker)) done.add(step.id);
    }
    return done;
  }, [output, lesson.checklist]);

  async function handleRun() {
    setLastError(null);
    const result = await run(code);
    if (!result.ok) setLastError(result.error ?? "Something went wrong.");
  }

  const missionComplete = completed.size === lesson.checklist.length;

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4">
        <Logo />
        <span className="eyebrow text-lime-deep">
          Mission {lesson.missionNumber} · {lesson.subject}
        </span>
      </header>

      <div className="grid flex-1 md:grid-cols-[minmax(0,360px)_1fr]">
        <aside className="border-b border-ink/10 bg-white p-6 md:border-r md:border-b-0">
          <p className="eyebrow text-lime-deep">Lesson</p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
            {lesson.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            {lesson.intro}
          </p>

          <div className="mt-6">
            <p className="eyebrow mb-3 text-ink/40">Mission checklist</p>
            <MissionChecklist steps={lesson.checklist} completed={completed} />
          </div>

          {missionComplete && (
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-lime-deep/20 bg-lime-soft p-4 text-sm text-ink">
              <PartyPopper size={18} className="mt-0.5 shrink-0 text-lime-deep" />
              <div>
                <p className="font-semibold">Mission complete.</p>
                <p className="mt-1 text-ink/65">
                  You trained a real model on real data. Try changing the
                  train/test split or adding a farm to see how the result
                  shifts.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <MentorPanel
              conceptHints={lesson.conceptHints}
              errorHints={lesson.errorHints}
              lastError={lastError}
            />
          </div>
        </aside>

        <div className="grid grid-rows-[1fr_auto] bg-ink md:grid-rows-[1fr_220px]">
          <div className="min-h-[320px]">
            <CodeEditor value={code} onChange={setCode} />
          </div>
          <div className="flex flex-col border-t border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <RunButton
                status={status}
                running={running}
                onRun={handleRun}
              />
              {status === "loading" && (
                <span className="text-xs text-white/50">
                  Loading Python environment…
                </span>
              )}
              {status === "error" && (
                <span className="text-xs text-red-300">
                  Couldn&apos;t load the Python environment. Check your
                  connection and reload the page.
                </span>
              )}
            </div>
            <OutputPanel output={output} running={running} error={lastError} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RunButton({
  status,
  running,
  onRun,
}: {
  status: "loading" | "ready" | "error";
  running: boolean;
  onRun: () => void;
}) {
  const disabled = status !== "ready" || running;
  return (
    <button
      type="button"
      onClick={onRun}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-1.5 text-xs font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Play size={12} fill="currentColor" />
      {running ? "Running…" : "Run"}
    </button>
  );
}
