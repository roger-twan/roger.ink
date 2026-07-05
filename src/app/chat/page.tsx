import type { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';
import ChatBox from '@/components/ChatBox';
import IconChatbot from '@public/icons/chatbot.svg';
import IconSparkle from '@public/icons/sparkle.svg';

export const metadata: Metadata = {
  title: "Chat with Roger's AI | Roger Twan",
  description:
    "Ask Roger's AI about his work, projects, notes, and product-building approach.",
};

const promptIdeas = [
  'What AI products have you built?',
  'How do you use AI in your product-building workflow?',
  'Which projects best show your full-stack product engineering?',
  'What is inside your RAG system?',
];

const systemCapabilities = [
  'Portfolio and project context',
  'Technical writing retrieval',
  'Conversation memory',
  'Streaming responses',
  'RAG-backed answers',
  'Product workflow context',
];

export default function ChatPage() {
  return (
    <div className="w-full bg-neutral-950 text-white">
      <RevealOnScroll />
      <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(190,242,100,0.12),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div data-reveal className="reveal-on-scroll max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
                <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.65)]" />
                RAG-powered AI
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Ask Roger&apos;s AI about my work.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                This AI version of me is connected to my RAG system, so you can
                ask about my projects, writing, product-building workflow, and
                engineering decisions through a conversational interface.
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-white">Try asking</p>
                <div className="mt-4 grid gap-3">
                  {promptIdeas.map((prompt) => (
                    <p
                      key={prompt}
                      className="rounded-2xl border border-white/10 bg-neutral-950/30 px-4 py-3 text-sm leading-6 text-white/65 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.06] hover:text-white/80"
                    >
                      {prompt}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-reveal
              className="reveal-on-scroll relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-neutral-950 p-px shadow-2xl shadow-cyan-950/30"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[60%] origin-center animate-workflow-border bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
              <div className="relative h-[620px] overflow-hidden rounded-[calc(2rem-1px)] border border-white/10 bg-neutral-950">
                <ChatBox isOpen={true} embedded={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16 text-neutral-950 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div data-reveal className="reveal-on-scroll">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                How it helps
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                A conversational entry point into my portfolio.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                Instead of making you browse every page, Roger&apos;s AI gives a
                faster way to explore my projects, technical notes, and how I
                approach product engineering with AI.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {systemCapabilities.map((capability, index) => (
                <div
                  key={capability}
                  data-reveal
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="reveal-on-scroll flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700">
                    {capability.includes('RAG') ? (
                      <IconSparkle className="size-4" />
                    ) : (
                      <IconChatbot className="size-4" />
                    )}
                  </span>
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
