import { ArrowRight, Play } from "lucide-react";
import type { Lesson } from "@/lib/lessons/rainfall-yield";
import type { PyodideStatus } from "@/hooks/usePyodideWorker";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import EditorWindow from "./EditorWindow";

export default function ExampleStage({
  example,
  status,
  running,
  output,
  onRun,
  onContinue,
}: {
  example: Lesson["example"];
  status: PyodideStatus;
  running: boolean;
  output: string;
  onRun: () => void;
  onContinue: () => void;
}) {
  const disabled = status !== "ready" || running;

  return (
    <div className="grid flex-1 md:grid-cols-[minmax(0,360px)_1fr]">
      <aside className="border-b border-ink/10 bg-white p-6 md:border-r md:border-b-0">
        <p className="eyebrow text-lime-deep">Example</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
          {example.heading}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          {example.body}
        </p>
        <p className="mt-4 text-xs text-ink/40">
          This code is read-only — it&apos;s worked out for you. Run it,
          read it, then move on to write the same idea yourself.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Try it yourself
          <ArrowRight size={16} />
        </button>
      </aside>

      <div className="bg-cream">
        <EditorWindow
          filename="example.py"
          footer={
            <>
              <div className="flex items-center justify-between px-4 py-2">
                <button
                  type="button"
                  onClick={onRun}
                  disabled={disabled}
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
              </div>
              <div className="h-40 border-t border-white/10">
                <OutputPanel output={output} running={running} error={null} />
              </div>
            </>
          }
        >
          <CodeEditor value={example.code} readOnly />
        </EditorWindow>
      </div>
    </div>
  );
}
