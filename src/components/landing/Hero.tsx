import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-teal">AI &amp; ML education, built for Africa</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            Learn machine learning by actually building it.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy/70">
            No 25-minute videos. No multiple-choice quizzes. Nurulabs puts a
            real code editor in front of you from lesson one, so you train
            actual models on problems that matter here — crop yields,
            traffic, mobile money, rainfall.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/lesson/rainfall-yield"
              className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal"
            >
              Try the first mission — free
            </Link>
            <a
              href="#how-it-works"
              className="rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy"
            >
              See how it works
            </a>
          </div>
        </div>
        <LessonPreviewCard />
      </div>
    </section>
  );
}

function LessonPreviewCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-navy/15 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-navy/10 bg-navy px-4 py-3">
        <span className="font-display text-sm font-semibold text-white">
          Nurulabs
        </span>
        <span className="eyebrow text-skyblue">Python · ML</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-navy/10 text-sm">
        <div className="p-4">
          <p className="eyebrow text-teal">Lesson</p>
          <p className="mt-2 font-display text-base font-semibold text-navy">
            Rainfall &amp; Crop Yield
          </p>
          <p className="mt-2 text-navy/60">
            Today you&apos;ll build your first ML model.
          </p>
          <ol className="mt-4 space-y-1.5 text-navy/70">
            <li>1. Load data</li>
            <li>2. Explore data</li>
            <li>3. Train model</li>
            <li>4. Evaluate</li>
          </ol>
          <ul className="mt-4 space-y-1.5">
            <li className="flex items-center gap-2 text-navy">
              <span className="text-teal">✓</span> Data loading
            </li>
            <li className="flex items-center gap-2 text-navy/40">
              <span>○</span> Training
            </li>
            <li className="flex items-center gap-2 text-navy/40">
              <span>○</span> Evaluation
            </li>
          </ul>
        </div>
        <div className="flex flex-col bg-[#1e293b]">
          <pre className="flex-1 overflow-hidden p-4 font-mono text-xs leading-relaxed text-skyblue">
{`import numpy as np

rainfall = [120, 160, 200, 260]
yield_ = [8, 11, 15, 19]

model = fit(rainfall, yield_)`}
          </pre>
          <div className="border-t border-white/10 p-3">
            <span className="rounded-md bg-teal px-3 py-1.5 text-xs font-semibold text-white">
              ▶ Run
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
