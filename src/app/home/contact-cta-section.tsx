import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';

export default function ContactCtaSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 text-center shadow-sm md:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            Work together
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Building a product that should move faster with AI?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            I am interested in product builds where AI helps with research,
            automation, knowledge, UX, and delivery, as well as AI product
            experiences where intelligence is part of the core interface.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              Contact Roger
              <IconArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-400"
            >
              More about how I work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
