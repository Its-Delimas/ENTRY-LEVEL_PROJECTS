"""Validates every lab: starter code must fail its checks, the solution must
pass them, predictions must match real output, and each reflection's model
answer must cover its key ideas. Mirrors the checks harness in
public/pyodide-worker.js. Run with `npm run validate:labs`."""
import json, os, sys, io, ast, contextlib, tempfile, traceback, re
labs = json.load(open(sys.argv[1]))

def run(code, files):
    d = tempfile.mkdtemp(); os.chdir(d)
    for n, c in (files or {}).items(): open(n, "w").write(c)
    ns = {}; out = io.StringIO(); err = None
    try:
        with contextlib.redirect_stdout(out):
            exec(compile(code, "main.py", "exec"), ns)
    except BaseException as e:
        err = "".join(traceback.format_exception_only(e)).strip().splitlines()[-1]
    ns["_stdout"] = out.getvalue().rstrip("\n"); ns["_source"] = code
    def _with(**ov):
        tree = ast.parse(code); ins = {}
        for k, v in ov.items():
            for node in tree.body:
                if isinstance(node, ast.Assign) and any(isinstance(t, ast.Name) and t.id == k for t in node.targets):
                    ins.setdefault(node.end_lineno, []).append(f"{k} = {v!r}"); break
        o = []
        for i, l in enumerate(code.split("\n"), 1): o.append(l); o.extend(ins.get(i, []))
        n2 = {}
        with contextlib.redirect_stdout(io.StringIO()): exec(compile("\n".join(o), "main.py", "exec"), n2)
        return n2
    ns["_with"] = _with
    return ns, err

def checks(step, ns):
    res = []
    for c in step["checks"]:
        try: res.append(bool(eval(c["expr"], ns)))
        except Exception as e: res.append(False)
    return res

bad = 0
for lab in labs:
    for s in lab["steps"]:
        tag = f'{lab["slug"]}/{s["id"]}'
        if s["kind"] == "predict":
            ns, err = run(s["code"], lab.get("files"))
            got = ns["_stdout"] if not err else err
            want = s["options"][s["answer"]]
            ok = got == want
            print(("OK  " if ok else "BAD ") + tag, "" if ok else f"got {got!r} want {want!r}"); bad += not ok
        if s["kind"] == "code":
            ns, err = run(s["starterCode"], lab.get("files"))
            r0 = checks(s, ns) if not err else [False]*len(s["checks"])
            sol = s.get("solution")
            if not sol:
                print("NOSOL", tag); continue
            ns, err2 = run(sol, lab.get("files"))
            r1 = checks(s, ns)
            ok = all(r1) and not all(r0) and not err2
            print(("OK  " if ok else "BAD ") + tag, f"starter_err={err} starter={r0} solution={r1} solerr={err2}"); bad += not ok
        if s["kind"] == "explain":
            m = s["modelAnswer"]
            cov = [any(re.search(p, m, re.I) for p in i["patterns"]) for i in s["ideas"]]
            ok = all(cov)
            print(("OK  " if ok else "BAD ") + tag, "model answer covers", cov); bad += not ok
print("BAD:", bad)
sys.exit(1 if bad else 0)
