"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { Lesson } from "@/lib/lessons/rainfall-yield";
import { usePyodideWorker, type ReviewResult } from "@/hooks/usePyodideWorker";
import { markMissionComplete, recordActivityToday } from "@/lib/progress";
import Logo from "@/components/landing/Logo";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import MissionChecklist from "./MissionChecklist";
import MentorPanel from "./MentorPanel";
import LessonStepper, { type Stage } from "./LessonStepper";
import EditorWindow from "./EditorWindow";
import LearnStage from "./LearnStage";
import ExampleStage from "./ExampleStage";
import ReviewStage from "./ReviewStage";

export default function LessonWorkspace({ lesson }: { lesson: Lesson }) {
  const [stage, setStage] = useState<Stage>("learn");
  const [unlocked, setUnlocked] = useState<Set<Stage>>(
    new Set<Stage>(["learn"]),
  );
  const [code, setCode] = useState(lesson.practice.starterCode);
  const [lastError, setLastError] = useState<string | null>(null);
  const [reviewResults, setReviewResults] = useState<ReviewResult[] | null>(
    null,
  );
  const { status, output, running, run, review } = usePyodideWorker();

  function unlock(next: Stage) {
    setUnlocked((prev) => new Set(prev).add(next));
    setStage(next);
  }

  const completed = useMemo(() => {
    const done = new Set<string>();
    for (const step of lesson.practice.checklist) {
      if (output.includes(step.marker)) done.add(step.id);
    }
    return done;
  }, [output, lesson.practice.checklist]);

  const practiceSucceeded =
    completed.size === lesson.practice.checklist.length;

  async function handleExampleRun() {
    const result = await run(lesson.example.code);
    if (result.ok) recordActivityToday();
  }

  async function handlePracticeRun() {
    setLastError(null);
    setReviewResults(null);
    const result = await run(code);
    if (!result.ok) {
      setLastError(result.error ?? "Something went wrong.");
      return;
    }
    recordActivityToday();
    const results = await review(lesson.reviewChecks);
    setReviewResults(results);
    // Unlock the Review step but let the student choose when to see it —
    // don't yank them off the code they just got working.
    setUnlocked((prev) => new Set(prev).add("review"));
  }

  useEffect(() => {
    if (!reviewResults) return;
    const allPassed = lesson.reviewChecks.every(
      (c) => reviewResults.find((r) => r.id === c.id)?.passed,
    );
    if (allPassed) markMissionComplete(lesson.slug);
  }, [reviewResults, lesson.reviewChecks, lesson.slug]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Logo />
          <Link
            href="/dashboard"
            className="hidden text-sm font-medium text-ink/50 hover:text-ink sm:block"
          >
            Dashboard
          </Link>
        </div>
        <LessonStepper current={stage} unlocked={unlocked} onSelect={setStage} />
        <span className="eyebrow text-lime-deep">
          Mission {lesson.missionNumber} · {lesson.subject}
        </span>
      </header>

      {stage === "learn" && (
        <LearnStage teach={lesson.teach} onContinue={() => unlock("example")} />
      )}

      {stage === "example" && (
        <ExampleStage
          example={lesson.example}
          status={status}
          running={running}
          output={output}
          onRun={handleExampleRun}
          onContinue={() => unlock("practice")}
        />
      )}

      {stage === "practice" && (
        <div className="grid flex-1 md:grid-cols-[minmax(0,360px)_1fr]">
          <aside className="border-b border-ink/10 bg-white p-6 md:border-r md:border-b-0">
            <p className="eyebrow text-lime-deep">Practice</p>
            <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
              {lesson.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              Fill in the three TODOs below. Nothing here is pre-solved —
              use what you just saw in the example.
            </p>

            <div className="mt-6">
              <p className="eyebrow mb-3 text-ink/40">Mission checklist</p>
              <MissionChecklist
                steps={lesson.practice.checklist}
                completed={completed}
              />
            </div>

            {practiceSucceeded && (
              <button
                type="button"
                onClick={() => setStage("review")}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-sm font-semibold text-ink"
              >
                See your review
                <ArrowRight size={16} />
              </button>
            )}

            <div className="mt-6">
              <MentorPanel
                conceptHints={lesson.conceptHints}
                errorHints={lesson.errorHints}
                lastError={lastError}
              />
            </div>
          </aside>

          <div className="bg-cream">
            <EditorWindow
              filename="practice.py"
              footer={
                <>
                  <div className="flex items-center justify-between px-4 py-2">
                    <button
                      type="button"
                      onClick={handlePracticeRun}
                      disabled={status !== "ready" || running}
                      className="inline-flex items-center gap-1.5 rounded-md bg-lime px-4 py-1.5 text-xs font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Play size={12} fill="currentColor" />
                      {running ? "Running…" : "Run"}
                    </button>
                    {status === "loading" && (
                      <span className="text-xs text-white/50">
                        Loading Python environment…
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-xs text-red-300">
                        Couldn&apos;t load the Python environment. Reload
                        the page.
                      </span>
                    )}
                  </div>
                  <div className="h-40 border-t border-white/10">
                    <OutputPanel
                      output={output}
                      running={running}
                      error={lastError}
                    />
                  </div>
                </>
              }
            >
              <CodeEditor value={code} onChange={setCode} />
            </EditorWindow>
          </div>
        </div>
      )}

      {stage === "review" && reviewResults && (
        <ReviewStage
          checks={lesson.reviewChecks}
          results={reviewResults}
          onBackToPractice={() => setStage("practice")}
        />
      )}
    </div>
  );
}
