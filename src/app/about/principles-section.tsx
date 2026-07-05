import { workingPrinciples } from './about.data';

export default function PrinciplesSection() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="reveal-on-scroll mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            Principles
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            The way I approach product and engineering work.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {workingPrinciples.map((principle) => (
            <div
              key={principle.title}
              data-reveal
              className="reveal-on-scroll rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-6 block h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" />
              <h3 className="text-lg font-semibold text-neutral-950">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
