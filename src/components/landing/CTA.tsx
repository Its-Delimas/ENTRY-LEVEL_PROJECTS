import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-lg bg-navy px-8 py-16 text-center text-white md:px-16">
        <p className="eyebrow text-skyblue">Affordable by design</p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">
          Real AI education, priced for African students.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-white/70">
          The first mission is free — no card, no signup wall. Write real
          code and train a real model in the next five minutes.
        </p>
        <Link
          href="/lesson/rainfall-yield"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-skyblue"
        >
          Start Mission 01
        </Link>
      </div>
    </section>
  );
}
