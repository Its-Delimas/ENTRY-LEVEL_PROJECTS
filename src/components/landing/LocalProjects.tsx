const projects = [
  {
    title: "Crop disease classification",
    body: "Identify disease in cassava and maize leaves from photos taken on a phone.",
  },
  {
    title: "Nairobi traffic prediction",
    body: "Forecast congestion on major routes using historical trip data.",
  },
  {
    title: "Mobile-money anomaly detection",
    body: "Flag unusual M-Pesa transaction patterns that might indicate fraud.",
  },
  {
    title: "Rainfall prediction",
    body: "Model seasonal rainfall from county-level weather station data.",
  },
  {
    title: "Kenyan-language NLP",
    body: "Build text models that actually understand Swahili and Sheng.",
  },
  {
    title: "Local image classification",
    body: "Train a classifier on datasets built from local, not generic stock, images.",
  },
];

export default function LocalProjects() {
  return (
    <section id="projects" className="bg-skyblue/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow text-teal">Not another Titanic dataset</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-navy md:text-4xl">
          Projects pulled from problems around you.
        </h2>
        <p className="mt-5 max-w-2xl text-navy/70">
          Every mission track ends in a project built on data and problems
          that are actually relevant to Kenyan and African students —
          not another dataset of iris flowers or Titanic passengers.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="bg-beige p-6">
              <h3 className="font-display text-base font-semibold text-navy">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">
                {project.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
