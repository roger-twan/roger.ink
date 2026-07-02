import SectionHeader from './section-header';

const focusItems = [
  {
    title: 'Product discovery',
    text: 'Using AI to turn ambiguous ideas, user needs, notes, and constraints into clearer product direction.',
  },
  {
    title: 'Rapid prototyping',
    text: 'Moving from concept to working interaction faster with AI-assisted exploration, UI iteration, and implementation.',
  },
  {
    title: 'Engineering workflows',
    text: 'Leveraging AI to improve efficiency and quality across coding, code review, testing, documentation, automation, and delivery loops.',
  },
  {
    title: 'Systems foundations',
    text: 'Strengthening architecture, databases, cloud, security, distributed systems, and AI fundamentals for reliable delivery.',
  },
];

export default function CurrentFocusSection() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Current focus"
          title="What I am sharpening across product and engineering."
          description="I am focused on building better product instincts, stronger software systems, and practical AI workflows that help ideas become reliable shipped products."
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
