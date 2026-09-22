import type { ReactNode } from "react";

export default function EditorWindow({
  filename,
  language = "Python",
  children,
  footer,
}: {
  filename: string;
  language?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <div className="flex h-full max-h-[640px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-white/50">
              {filename}
            </span>
          </div>
          <span className="eyebrow text-lime">{language}</span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

        {footer && (
          <div className="border-t border-white/10">{footer}</div>
        )}
      </div>
    </div>
  );
}
