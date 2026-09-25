import { AlertTriangle } from "lucide-react";
import type { PyError } from "@/hooks/usePyodideWorker";
import { explainError } from "@/lib/errors";
import RichText from "./RichText";

/**
 * Turns a Python error into something to learn from: what Python said,
 * where it stopped, what that means, and what the learner's variables
 * actually held at that moment.
 */
export default function ErrorExplainer({
  error,
  code,
}: {
  error: PyError;
  code: string;
}) {
  const guide = explainError(error.type);
  const lineText =
    error.line != null ? code.split("\n")[error.line - 1]?.trim() : undefined;
  const withKeys = error.vars.filter((v) => v.keys && v.keys.length);
  const showVars = error.vars.length > 0 && error.type !== "SyntaxError";

  return (
    <div className="space-y-3 font-sans">
      <div className="rounded-xl border border-[#ff8a8a]/25 bg-[#ff8a8a]/10 p-3.5">
        <div className="flex items-start gap-2.5">
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#ff9b9b]" />
          <div className="min-w-0">
            <p className="font-mono text-xs break-words text-[#ffb4b4]">
              {error.summary}
            </p>
            {lineText && (
              <p className="mt-2 text-xs text-white/55">
                Python stopped at <span className="font-semibold text-white/80">line {error.line}</span>:{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-white/85">
                  {lineText}
                </code>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.04] p-3.5">
        <p className="text-xs font-semibold text-white">{guide.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/60">
          <RichText text={guide.plain} />
        </p>
      </div>

      {withKeys.length > 0 && (error.type === "KeyError" || error.type === "TypeError") && (
        <div className="rounded-xl bg-white/[0.04] p-3.5">
          <p className="text-xs font-semibold text-white">Keys that do exist</p>
          <div className="mt-2 space-y-1.5">
            {withKeys.map((v) => (
              <p key={v.name} className="text-xs text-white/55">
                <span className="font-mono text-lime">{v.name}</span>
                {v.type === "list" ? " (each row)" : ""}:{" "}
                {v.keys!.map((k) => (
                  <code key={k} className="mr-1 rounded bg-white/10 px-1.5 py-0.5 font-mono text-white/85">
                    {k}
                  </code>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}

      {showVars && (
        <div className="overflow-hidden rounded-xl bg-white/[0.04]">
          <p className="px-3.5 pt-3 text-xs font-semibold text-white">
            Your variables when it stopped
          </p>
          <table className="mt-2 w-full text-left font-mono text-[11px]">
            <tbody>
              {error.vars.map((v) => (
                <tr key={v.name} className="border-t border-white/5">
                  <td className="py-1.5 pl-3.5 pr-2 text-lime">{v.name}</td>
                  <td className="px-2 py-1.5 text-white/40">{v.type}</td>
                  <td className="py-1.5 pr-3.5 pl-2 break-all text-white/70">{v.preview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
