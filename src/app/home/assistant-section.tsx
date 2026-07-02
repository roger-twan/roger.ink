import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import ChatModule from './chat';

const assistantCapabilities = [
  'RAG-backed answers',
  'Project context',
  'Streaming chat',
  'Personal knowledge base',
];

export default function AssistantSection() {
  return (
    <section className="bg-neutral-950 py-16 text-white md:py-24">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            AI Assistant
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Ask the assistant about my work and how I build.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            This is one example of AI inside a product experience: a RAG-powered
            assistant connected to my knowledge base, projects, and technical
            notes so visitors can explore context instead of only reading static
            pages.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ChatModule />
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Open full chat page
              <IconArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {assistantCapabilities.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <span
                className={`mb-5 block size-3 rounded-full ${
                  index % 2 ? 'bg-lime-300' : 'bg-cyan-300'
                }`}
              />
              <h3 className="font-semibold text-white">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                An example of turning knowledge and AI assistance into a useful
                product surface.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
