"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PyodideStatus = "loading" | "ready" | "error";

export interface VarInfo {
  name: string;
  type: string;
  preview: string;
  /** Dict keys, or the keys of the first row for a list of dicts. */
  keys?: string[];
}

export interface PyError {
  type: string;
  /** The final "ErrorType: message" line, including Python's suggestions. */
  summary: string;
  traceback: string;
  line: number | null;
  vars: VarInfo[];
}

export interface RunResult {
  ok: boolean;
  error?: PyError;
}

interface WorkerMessage {
  type: "ready" | "init-error" | "stdout" | "stderr" | "run-start" | "run-end" | "check-result";
  data?: string;
  ok?: boolean;
  runId?: number;
  error?: PyError;
  results?: boolean[];
}

/** Code that runs longer than this is almost always an infinite loop. */
const RUN_TIMEOUT_MS = 8000;

const TIMEOUT_ERROR: PyError = {
  type: "TimeoutError",
  summary: "TimeoutError: your code ran for more than 8 seconds and was stopped",
  traceback: "",
  line: null,
  vars: [],
};

export function usePyodideWorker() {
  const workerRef = useRef<Worker | null>(null);
  const runResolverRef = useRef<((result: RunResult) => void) | null>(null);
  const checkResolverRef = useRef<((results: boolean[]) => void) | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runIdRef = useRef(0);

  const [status, setStatus] = useState<PyodideStatus>("loading");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const startWorker = useCallback(() => {
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
          setOutput((prev) => (prev ? `${prev}\n${msg.data}` : (msg.data ?? "")));
          break;
        case "run-end":
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setRunning(false);
          runResolverRef.current?.({ ok: !!msg.ok, error: msg.error });
          runResolverRef.current = null;
          break;
        case "check-result":
          checkResolverRef.current?.(msg.results ?? []);
          checkResolverRef.current = null;
          break;
      }
    };

    worker.onerror = () => setStatus("error");
    worker.postMessage({ type: "init" });
    return worker;
  }, []);

  useEffect(() => {
    const worker = startWorker();
    return () => {
      worker.terminate();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startWorker]);

  const run = useCallback(
    (code: string, files?: Record<string, string>) => {
      return new Promise<RunResult>((resolve) => {
        if (!workerRef.current) {
          resolve({ ok: false, error: { ...TIMEOUT_ERROR, type: "InternalError", summary: "The Python worker isn't available." } });
          return;
        }
        setOutput("");
        setRunning(true);
        runIdRef.current += 1;
        runResolverRef.current = resolve;
        workerRef.current.postMessage({ type: "run", code, files, runId: runIdRef.current });

        // A worker stuck in a loop can't be interrupted, only replaced.
        timeoutRef.current = setTimeout(() => {
          workerRef.current?.terminate();
          setRunning(false);
          setStatus("loading");
          runResolverRef.current?.({ ok: false, error: TIMEOUT_ERROR });
          runResolverRef.current = null;
          startWorker();
        }, RUN_TIMEOUT_MS);
      });
    },
    [startWorker],
  );

  /** Evaluates Python expressions against the namespace of the last run. */
  const check = useCallback((exprs: string[]) => {
    return new Promise<boolean[]>((resolve) => {
      if (!workerRef.current || exprs.length === 0) {
        resolve(exprs.map(() => false));
        return;
      }
      checkResolverRef.current = resolve;
      workerRef.current.postMessage({ type: "check", exprs, runId: runIdRef.current });
    });
  }, []);

  const clearOutput = useCallback(() => setOutput(""), []);

  return { status, output, running, run, check, clearOutput };
}
