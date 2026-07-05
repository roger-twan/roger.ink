import { backgroundItems } from './about.data';

export default function BackgroundSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="reveal-on-scroll mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            Background
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Computer science and UI/UX shaped how I build products.
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-600">
            The combination gives me both systems thinking and product-surface
            judgment.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {backgroundItems.map((item) => (
            <div
              key={item.title}
              data-reveal
              className="reveal-on-scroll rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-cyan-700">
                    {item.credential}
                  </p>
                </div>
                <span className="text-sm font-medium text-neutral-500">
                  {item.period}
                </span>
              </div>
              <p className="mt-5 text-sm leading-6 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
