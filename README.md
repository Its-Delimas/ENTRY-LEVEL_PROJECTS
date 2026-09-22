# Nurulabs

Affordable, hands-on AI & ML education for African students. Instead of
videos and quizzes, every lesson puts a real, running Python environment
next to the material — students write code, train real models, and get
Socratic hints instead of answers when they get stuck.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- [CodeMirror](https://codemirror.net/) for the in-lesson code editor
- [Pyodide](https://pyodide.org) (self-hosted core, see below) running in a
  Web Worker for real, client-side Python execution — no backend required

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page is at
`/`, and the first interactive mission is at `/lesson/rainfall-yield`.

## The Pyodide runtime

`public/pyodide/` and `public/pyodide-worker.js` vendor the Pyodide core
(interpreter + stdlib) so lessons work without depending on a third-party
CDN at runtime. The worker loads Pyodide as an ES module worker
(`new Worker(..., { type: "module" })`) — classic workers aren't supported
by this Pyodide build.

Lessons in this MVP are written in pure Python (no `numpy`/`sklearn`) so no
additional packages need to be fetched at runtime, keeping the first run
fast and fully self-contained.

## Adding a lesson

Lesson content lives in `src/lib/lessons/` as a typed `Lesson` object:
starter code, a mission checklist (each step matched against a stdout
marker string), conceptual hints, and error-pattern hints for the mentor
panel. Wire a new lesson up with a page under `src/app/lesson/<slug>/`
using `LessonWorkspace`.
