import { learningAreas } from './about.data';

export default function LearningSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="reveal-on-scroll grid gap-8 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
              Still learning
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
              I keep strengthening the fundamentals behind better products.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {learningAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
