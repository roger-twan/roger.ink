import { capabilityGroups } from './about.data';

export default function CapabilitySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div data-reveal className="reveal-on-scroll">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
              Capability stack
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
              Product sense, AI workflow, and full-stack delivery.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
              My background combines UI/UX thinking, frontend craft, backend
              systems, and practical delivery experience. The current focus is
              using AI to make that product-building loop faster and better.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {capabilityGroups.map((group) => (
              <div
                key={group.title}
                data-reveal
                className="reveal-on-scroll rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
              >
                <h3 className="text-base font-semibold text-neutral-950">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
