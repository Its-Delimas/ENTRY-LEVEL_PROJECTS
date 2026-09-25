import type { CodeStep } from "@/lib/curriculum/types";
import type { PyError } from "@/hooks/usePyodideWorker";

export type Attempt =
  | { kind: "error"; error: PyError }
  | { kind: "checks"; failed: number[] }
  | { kind: "success" };

export interface MentorMessage {
  tone: "idle" | "error" | "checks" | "success" | "stuck";
  /** Why the mentor is saying this — the learner behavior it's reacting to. */
  reason?: string;
  body: string;
}

function lessonErrorHint(step: CodeStep, error: PyError) {
  const text = `${error.type}: ${error.summary}`;
  return step.errorHints?.find((h) => new RegExp(h.pattern, "i").test(text))?.hint;
}

function sameError(a: Attempt | undefined, b: Attempt | undefined) {
  return (
    a?.kind === "error" &&
    b?.kind === "error" &&
    a.error.type === b.error.type &&
    a.error.line === b.error.line
  );
}

/**
 * The mentor reacts to what the learner has actually done on this step —
 * how many runs, whether they're repeating a mistake — and gets more
 * specific the longer they're stuck. It never hands over the answer
 * unprompted.
 */
export function mentorFor(
  step: CodeStep,
  attempts: Attempt[],
  code: string,
): MentorMessage {
  const last = attempts[attempts.length - 1];
  const prev = attempts[attempts.length - 2];
  const failures = attempts.filter((a) => a.kind !== "success").length;

  if (!last) {
    return {
      tone: "idle",
      body: step.challenge
        ? "No instructions this time — just the goal. Try something, run it, and read what happens."
        : "Read the brief, change the code, and press **Run**. Mistakes are part of it — I'll help you read them.",
    };
  }

  if (last.kind === "success") {
    return {
      tone: "success",
      reason: failures === 0 ? "First try" : `Solved after ${failures} attempt${failures === 1 ? "" : "s"}`,
      body: step.why,
    };
  }

  if (last.kind === "error") {
    const specific = lessonErrorHint(step, last.error);
    if (sameError(last, prev)) {
      const line = last.error.line
        ? code.split("\n")[last.error.line - 1]?.trim()
        : undefined;
      return {
        tone: "error",
        reason: `Same ${last.error.type} twice in a row`,
        body: line
          ? `Your change didn't touch the real problem yet. Put your attention on line ${last.error.line} only: \`${line}\`. ${specific ?? "Read it slowly, piece by piece — which part does the error message point at?"}`
          : (specific ?? "Your change didn't touch the real problem yet. Re-read the error message word by word."),
      };
    }
    return {
      tone: "error",
      reason: `${last.error.type} on run ${attempts.length}`,
      body:
        specific ??
        "Errors are Python telling you exactly what it didn't understand. Read the last line of the error, then the line it points to.",
    };
  }

  // Ran cleanly but checks failed.
  const firstFailed = step.checks[last.failed[0]];
  const repeated =
    prev?.kind === "checks" && prev.failed[0] === last.failed[0];
  if (failures >= 3 && step.hints.length) {
    const hint = step.hints[Math.min(failures - 3, step.hints.length - 1)];
    return {
      tone: "stuck",
      reason: `${failures} attempts on this step`,
      body: `${firstFailed?.failHint ?? ""} Here's a more direct pointer: ${hint}`,
    };
  }
  return {
    tone: "checks",
    reason: repeated
      ? "Same check failing again"
      : `Your code ran — ${last.failed.length} check${last.failed.length === 1 ? "" : "s"} not met yet`,
    body: firstFailed?.failHint ?? "Almost — compare your output with what the brief asks for.",
  };
}
