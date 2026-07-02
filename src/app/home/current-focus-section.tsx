import SectionHeader from './section-header';

const focusItems = [
  {
    title: 'AI-assisted discovery',
    text: 'Using AI to turn ambiguous ideas, notes, and constraints into clearer product direction.',
  },
  {
    title: 'Prototype acceleration',
    text: 'Moving from UX options to working flows faster without losing product taste.',
  },
  {
    title: 'Knowledge systems',
    text: 'Building RAG and context flows that make product and project knowledge usable.',
  },
  {
    title: 'Workflow automation',
    text: 'Connecting tools, data, and AI assistance around real shipping workflows.',
  },
];

export default function CurrentFocusSection() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Current focus"
          title="What I am building toward now."
          description="The throughline is practical: use AI to improve discovery, prototyping, implementation, and delivery while keeping product quality visible."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {focusItems.map((item, index) => (
            <div
              key={item.title}
              style={{ animationDelay: `${index * 90}ms` }}
              data-reveal
              className="reveal-on-scroll rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="mb-6 block h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" />
              <h3 className="text-lg font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
