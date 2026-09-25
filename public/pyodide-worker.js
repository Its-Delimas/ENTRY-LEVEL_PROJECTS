import { loadPyodide } from "/pyodide/pyodide.mjs";

let pyodideReadyPromise = null;
let stdoutLines = [];

// Runs learner code and turns failures into structured, teachable data:
// the error type, the learner's line, the message (with Python's own
// "Did you mean" suggestions), and a snapshot of their variables.
const HARNESS = `
import traceback as _tb
import ast as _ast
import io as _io
import contextlib as _ctx

def _nl_preview(v):
    try:
        r = repr(v)
    except Exception:
        r = "<unprintable>"
    return r if len(r) <= 70 else r[:67] + "..."

def _nl_snapshot(ns):
    out = []
    for name, v in list(ns.items()):
        if name.startswith("_") or type(v).__name__ == "module":
            continue
        info = {"name": name, "type": type(v).__name__, "preview": _nl_preview(v)}
        if isinstance(v, dict):
            info["keys"] = [str(k) for k in list(v.keys())[:12]]
        elif isinstance(v, list) and v and isinstance(v[0], dict):
            info["keys"] = [str(k) for k in list(v[0].keys())[:12]]
        if callable(v):
            info["preview"] = "function " + name + "()"
            info["type"] = "function"
        out.append(info)
    return out[:24]

def _nl_run(code, ns):
    try:
        exec(compile(code, "main.py", "exec"), ns)
        return None
    except BaseException as e:
        te = _tb.TracebackException.from_exception(e)
        frames = [f for f in te.stack if f.filename == "main.py"]
        te.stack = _tb.StackSummary.from_list(frames)
        line = frames[-1].lineno if frames else getattr(e, "lineno", None)
        return {
            "type": type(e).__name__,
            "summary": "".join(te.format_exception_only()).strip().splitlines()[-1],
            "traceback": "".join(te.format()).strip(),
            "line": line,
            "vars": _nl_snapshot(ns),
        }

def _nl_make_with(source):
    # Re-runs the learner's code with a top-level variable overridden right
    # after its first assignment, so checks can test logic on other inputs.
    def _with(**overrides):
        tree = _ast.parse(source)
        inserts = {}
        for k, v in overrides.items():
            for node in tree.body:
                if isinstance(node, _ast.Assign) and any(
                    isinstance(t, _ast.Name) and t.id == k for t in node.targets
                ):
                    inserts.setdefault(node.end_lineno, []).append(k + " = " + repr(v))
                    break
        out = []
        for i, line in enumerate(source.split("\\n"), 1):
            out.append(line)
            out.extend(inserts.get(i, []))
        ns = {}
        with _ctx.redirect_stdout(_io.StringIO()):
            exec(compile("\\n".join(out), "main.py", "exec"), ns)
        return ns
    return _with

def _nl_check(exprs, ns):
    ns["_with"] = _nl_make_with(ns.get("_source", ""))
    results = []
    for expr in exprs:
        try:
            results.append(bool(eval(expr, ns)))
        except Exception:
            results.append(False)
    return results
`;

async function initPyodide() {
  const pyodide = await loadPyodide({
    indexURL: "/pyodide/",
    stdout: (msg) => {
      stdoutLines.push(msg);
      postMessage({ type: "stdout", data: msg });
    },
    stderr: (msg) => postMessage({ type: "stderr", data: msg }),
  });
  pyodide.runPython(HARNESS);
  return pyodide;
}

function getPyodide() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = initPyodide();
  }
  return pyodideReadyPromise;
}

let lastNamespace = null;

function writeFiles(pyodide, files) {
  if (!files) return;
  for (const [name, content] of Object.entries(files)) {
    pyodide.FS.writeFile(name, content);
  }
}

self.onmessage = async (event) => {
  const { type, code, runId, exprs, files } = event.data;

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
      // Fresh files and globals per run: a re-run never sees state
      // left over from a previous or different run.
      writeFiles(pyodide, files);
      const ns = pyodide.toPy({});
      stdoutLines = [];
      postMessage({ type: "run-start", runId });
      const runner = pyodide.globals.get("_nl_run");
      const result = runner(code, ns);
      runner.destroy();
      ns.set("_stdout", stdoutLines.join("\n"));
      ns.set("_source", code);
      lastNamespace = ns;
      if (result) {
        const error = result.toJs({ dict_converter: Object.fromEntries });
        result.destroy();
        postMessage({ type: "run-end", runId, ok: false, error });
      } else {
        postMessage({ type: "run-end", runId, ok: true });
      }
    } catch (err) {
      postMessage({
        type: "run-end",
        runId,
        ok: false,
        error: {
          type: "InternalError",
          summary: String(err && err.message ? err.message : err),
          traceback: "",
          line: null,
          vars: [],
        },
      });
    }
    return;
  }

  if (type === "check") {
    try {
      const pyodide = await getPyodide();
      if (!lastNamespace) {
        postMessage({ type: "check-result", runId, results: exprs.map(() => false) });
        return;
      }
      const checker = pyodide.globals.get("_nl_check");
      const proxy = checker(pyodide.toPy(exprs), lastNamespace);
      const results = proxy.toJs();
      proxy.destroy();
      checker.destroy();
      postMessage({ type: "check-result", runId, results });
    } catch {
      postMessage({ type: "check-result", runId, results: exprs.map(() => false) });
    }
  }
};
