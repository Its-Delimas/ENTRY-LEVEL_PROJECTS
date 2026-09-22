const missions = [
  {
    number: "01",
    title: "Teach a computer to classify flowers",
    body: "Load a dataset, explore it, split it, train your first model — and see exactly what 'training' means.",
  },
  {
    number: "15",
    title: "Build a neural network",
    body: "Move from a single line to layers and weights. You'll debug a model that isn't learning, on purpose.",
  },
  {
    number: "30",
    title: "Build an image classifier",
    body: "Go from 'I don't understand what training means' to 'I trained a model myself,' on a dataset you chose.",
  },
];

export default function Missions() {
  return (
    <section id="missions" className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow text-teal">A path, not a playlist</p>
      <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-navy md:text-4xl">
        Every mission builds on the last one.
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {missions.map((mission) => (
          <div
            key={mission.number}
            className="rounded-lg border border-navy/15 bg-white p-6"
          >
            <span className="font-display text-3xl font-semibold text-skyblue">
              {mission.number}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy">
              {mission.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/65">
              {mission.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg bg-beige/80 border border-navy/10 p-6">
        <p className="text-sm leading-relaxed text-navy/75">
          <span className="font-semibold text-navy">
            Automatic mission checks:
          </span>{" "}
          submit your code and Nurulabs runs hidden tests against it —
          dataset loaded, model trained, accuracy threshold met — so you know
          a mission is actually complete, not just that a video finished
          playing.
        </p>
      </div>
    </section>
  );
}
