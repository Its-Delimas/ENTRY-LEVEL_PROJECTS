const steps = [
  {
    label: "Attempt",
    body: "You start writing code immediately — no lecture required first.",
  },
  {
    label: "Struggle",
    body: "You hit an error, a bad result, a model that won't learn. That's expected.",
  },
  {
    label: "Hint",
    body: "Your mentor points at the concept you're missing — never the fix itself.",
  },
  {
    label: "Understand",
    body: "You implement it yourself, run it, and the idea actually sticks.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow text-skyblue">How it works</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
          We don&apos;t hand you the answer. We hand you the editor.
        </h2>
        <p className="mt-5 max-w-2xl text-white/70">
          Most platforms teach AI with videos and quizzes. Nurulabs puts a
          real, running Python environment next to every lesson. You read a
          short explanation, then you write the code that makes it true.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.label} className="border-t border-white/20 pt-5">
              <span className="eyebrow text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
