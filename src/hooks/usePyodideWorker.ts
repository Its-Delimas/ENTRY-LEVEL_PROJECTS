"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PyodideStatus = "loading" | "ready" | "error";

interface RunResult {
  ok: boolean;
  error?: string;
}

interface WorkerMessage {
  type: "ready" | "init-error" | "stdout" | "stderr" | "run-start" | "run-end";
  data?: string;
  error?: string;
  ok?: boolean;
  runId?: number;
}

export function usePyodideWorker() {
  const workerRef = useRef<Worker | null>(null);
  const runResolverRef = useRef<((result: RunResult) => void) | null>(null);
  const runIdRef = useRef(0);

  const [status, setStatus] = useState<PyodideStatus>("loading");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const worker = new Worker("/pyodide-worker.js", { type: "module" });
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const msg = event.data;
      switch (msg.type) {
        case "ready":
          setStatus("ready");
          break;
        case "init-error":
          setStatus("error");
          break;
        case "stdout":
        case "stderr":
          setOutput((prev) => (prev ? `${prev}\n${msg.data}` : msg.data ?? ""));
          break;
        case "run-end":
          setRunning(false);
          runResolverRef.current?.({ ok: !!msg.ok, error: msg.error });
          runResolverRef.current = null;
          break;
      }
    };

    worker.onerror = () => setStatus("error");
    worker.postMessage({ type: "init" });

    return () => worker.terminate();
  }, []);

  const run = useCallback((code: string) => {
    return new Promise<RunResult>((resolve) => {
      if (!workerRef.current) {
        resolve({ ok: false, error: "The Python worker isn't available." });
        return;
      }
      setOutput("");
      setRunning(true);
      runIdRef.current += 1;
      runResolverRef.current = resolve;
      workerRef.current.postMessage({
        type: "run",
        code,
        runId: runIdRef.current,
      });
    });
  }, []);

  return { status, output, running, run };
}
