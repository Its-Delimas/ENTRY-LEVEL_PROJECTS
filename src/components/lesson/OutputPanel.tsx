interface OutputPanelProps {
  output: string;
  running: boolean;
  error: string | null;
}

export default function OutputPanel({
  output,
  running,
  error,
}: OutputPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-4 py-2">
        <span className="eyebrow text-skyblue">Output</span>
      </div>
      <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-skyblue">
        {running && !output && "Running…"}
        {output}
        {error && (
          <span className="mt-2 block text-red-300">{"\n" + error}</span>
        )}
        {!running && !output && !error && (
          <span className="text-white/30">
            Press Run to execute your code.
          </span>
        )}
      </pre>
    </div>
  );
}
