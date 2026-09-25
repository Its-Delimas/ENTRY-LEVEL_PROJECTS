# Nurulabs

Free, hands-on AI education for African students, structured like a
real programme. Learners enroll in one track, work through its syllabus
module by module (each ending in a milestone), and finish it before
starting the next. Every lab mixes short lessons with things to *do*:
interactives, quick quizzes, real Python that runs in the browser, and a
reflection in their own words.

## Tracks

| Track | Level | Status |
| --- | --- | --- |
| Python for AI | Beginner | 13 labs + capstone project, live (complete) |
| AI & Machine Learning | Intermediate | Requires Python for AI (or its placement check); lab 01 live |
| Data Science, Data Engineering | — | Planned |

Experienced learners can take the Python placement check
(`/placement/python-for-ai`) to go straight to AI & ML.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- [CodeMirror](https://codemirror.net/) for the code editor
- [Pyodide](https://pyodide.org) (self-hosted in `public/pyodide/`) in a Web
  Worker for client-side Python. There's no backend. Progress and enrollment
  are stored in `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Routes: `/` landing · `/tracks` choose a track · `/dashboard` the enrolled
track · `/tracks/<slug>` syllabus · `/labs/<slug>` a lab ·
`/placement/<slug>` placement check.

## How a lab works

Content lives in `src/lib/curriculum/`:

- `tracks.ts`: tracks, their modules and milestones, prerequisites, and
  placement questions.
- `labs/*.ts`: labs. Each lab is a list of steps:
  - `concept`: a lesson, short paragraphs plus an optional code sample or photo.
  - `experiment`: an interactive widget (see `src/components/lab/widgets/`).
  - `predict`: a "what will this print?" quiz the learner can then run.
  - `code`: the learner writes Python. `checks` are Python expressions
    evaluated against their namespace after a run. `_stdout` holds printed
    output, `_source` holds their code, and `_with(name=value)` re-runs their
    code with a variable changed, so a check can test logic on other inputs.
    `challenge: true` hides the instructions.
  - `explain`: a reflection, checked for key ideas with regex patterns.

The Python runtime (`public/pyodide-worker.js`) returns structured errors:
the error type, the line, and a snapshot of the learner's variables. The
mentor (`src/lib/mentor.ts`) uses these, along with the learner's attempt
history, to escalate hints.

### Validating content

```bash
npm run validate:labs
```

This runs every code step's starter code (it must fail the checks) and
solution (it must pass them), every quiz (the answer must match real output),
and every reflection's model answer (it must cover its ideas). Run it after
editing a lab.

## Photos

The photos in `public/images/` are from Unsplash and credited in
`public/images/CREDITS.md`.
