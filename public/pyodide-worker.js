import { loadPyodide } from "/pyodide/pyodide.mjs";

let pyodideReadyPromise = null;

async function initPyodide() {
  const pyodide = await loadPyodide({
    indexURL: "/pyodide/",
    stdout: (msg) => postMessage({ type: "stdout", data: msg }),
    stderr: (msg) => postMessage({ type: "stderr", data: msg }),
  });
  return pyodide;
}

function getPyodide() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = initPyodide();
  }
  return pyodideReadyPromise;
}

let lastNamespace = null;

function compare(actual, op, value) {
  switch (op) {
    case ">=":
      return actual >= value;
    case ">":
      return actual > value;
    case "<=":
      return actual <= value;
    case "<":
      return actual < value;
    default:
      return false;
  }
}

self.onmessage = async (event) => {
  const { type, code, runId, checks } = event.data;

  if (type === "init") {
    try {
      await getPyodide();
      postMessage({ type: "ready" });
    } catch (err) {
      postMessage({ type: "init-error", error: String(err) });
    }
    return;
  }

  if (type === "run") {
    try {
      const pyodide = await getPyodide();
      // Fresh globals per run: a re-run (or switching stages) never sees
      // variables left over from a previous or different run.
      const ns = pyodide.toPy({});
      postMessage({ type: "run-start", runId });
      await pyodide.runPythonAsync(code, { globals: ns });
      lastNamespace = ns;
      postMessage({ type: "run-end", runId, ok: true });
    } catch (err) {
      postMessage({
        type: "run-end",
        runId,
        ok: false,
        error: String(err && err.message ? err.message : err),
      });
    }
    return;
  }

  if (type === "review") {
    try {
      const results = checks.map((check) => {
        const raw = lastNamespace ? lastNamespace.get(check.variable) : undefined;
        const actual = typeof raw === "number" ? raw : Number(raw);
        const hasValue = raw !== undefined && !Number.isNaN(actual);
        const passed = hasValue && compare(actual, check.op, check.value);
        return { id: check.id, passed, actual: hasValue ? actual : null };
      });
      postMessage({ type: "review-result", runId, results });
    } catch (err) {
      postMessage({
        type: "review-result",
        runId,
        results: [],
        error: String(err && err.message ? err.message : err),
      });
    }
  }
};
