import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import ChatModule from './chat';
import SectionHeader from './section-header';

const caseStudyPoints = [
  {
    title: 'Problem',
    text: 'Static portfolios hide context across pages, repos, notes, and posts.',
  },
  {
    title: 'AI role',
    text: 'Retrieval and generation work together to answer questions from my own knowledge base.',
  },
  {
    title: 'Product UX',
    text: 'You can explore my projects, process, and technical decisions through conversation.',
  },
  {
    title: 'Shipped system',
    text: 'FastAPI RAG backend, embedded chat widget, full chat page, streaming responses, and conversation memory.',
  },
];

const systemSignals = [
  'Hybrid retrieval',
  'Conversation memory',
  'Incremental ingestion',
  'Evaluated source-grounded responses',
];

const technicalTags = [
  'FastAPI',
  'Next.js',
  'LlamaIndex',
  'LangChain',
  'OpenAI',
  'DeepSeek',
  'Hybrid search',
  'PostgreSQL',
  'Pinecone',
  'LangSmith',
  'RAGAS',
  'Query rewriting',
  'Reranking',
  'Streaming responses',
  'Incremental ingestion',
  'Multi-source loaders',
  'Conversation context',
];

export default function FeaturedProjectSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(190,242,100,0.10),transparent_28%)]" />
      <div className="relative container mx-auto px-4">
        <SectionHeader
          eyebrow="Featured project"
          title="A RAG system powering an interactive portfolio."
          description="A full-stack retrieval system that turns project notes, technical writing, and site content into a conversational experience."
          theme="dark"
        />

        <div
          data-reveal
          className="reveal-on-scroll grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/20 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div
            data-reveal
            className="reveal-on-scroll min-h-[420px] bg-black/25 p-3"
          >
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900 p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(190,242,100,0.12),transparent_28%)]" />
              <div className="relative flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="animate-workflow-pulse size-3 rounded-full bg-cyan-400" />
                    <span className="text-xs font-medium text-white/70">
                      RAG system case study
                    </span>
                  </div>
                  <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2 py-1 text-[11px] font-medium text-lime-200">
                    live on site
                  </span>
                </div>

                <div className="grid flex-1 gap-3">
                  {caseStudyPoints.map((item, index) => (
                    <div
                      key={item.title}
                      className="reveal-on-scroll rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      style={{ animationDelay: `${index * 90}ms` }}
                      data-reveal
                    >
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                        {item.title}
                      </p>
                      <p className="text-sm leading-6 text-white/70">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="reveal-on-scroll bg-neutral-950/30 p-6 sm:p-6 lg:p-8"
            style={{ animationDelay: '120ms' }}
          >
            <div className="mb-5 flex flex-wrap gap-2">
              {technicalTags.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-3xl font-semibold tracking-tight text-white">
              Roger&apos;s AI, powered by RAG
            </h3>
            <p className="mt-4 text-base leading-7 text-white/65">
              I built a retrieval-augmented system that connects my portfolio,
              project notes, and technical writing to a conversational version
              of me. Behind the interface, it handles multi-source ingestion,
              retrieval, reranking, conversation context, streaming responses,
              LangSmith tracing, and RAGAS-backed evaluation.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {systemSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <p className="text-sm font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ChatModule />
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Open full chat page
                <IconArrowRight className="ml-2 size-4" />
              </Link>
              <a
                href="https://github.com/roger-twan/rag-server"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/35"
              >
                View code
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
