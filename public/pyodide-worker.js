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

self.onmessage = async (event) => {
  const { type, code, runId } = event.data;

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
      postMessage({ type: "run-start", runId });
      await pyodide.runPythonAsync(code);
      postMessage({ type: "run-end", runId, ok: true });
    } catch (err) {
      postMessage({
        type: "run-end",
        runId,
        ok: false,
        error: String(err && err.message ? err.message : err),
      });
    }
  }
};
