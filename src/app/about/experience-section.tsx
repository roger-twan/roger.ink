import { experienceItems } from './about.data';

export default function ExperienceSection() {
  return (
    <section className="bg-neutral-950 py-16 text-white md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-reveal className="reveal-on-scroll">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              A full-stack foundation shaped by product delivery.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
              I have worked across freelance, contract, and product-team
              environments, moving between hands-on engineering, architecture
              decisions, delivery workflows, and team collaboration. My work
              spans product interfaces, backend systems, documentation,
              deployment, and improving how teams ship.
            </p>
          </div>
          <div className="space-y-4">
            {experienceItems.map((item) => (
              <div
                key={`${item.company}-${item.period}`}
                data-reveal
                className="reveal-on-scroll rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan-950/20"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-cyan-200">{item.company}</p>
                  </div>
                  <span className="text-sm font-medium text-white/45">
                    {item.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
