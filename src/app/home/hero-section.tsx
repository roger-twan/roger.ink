import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import IconChatbot from '@public/icons/chatbot.svg';
import IconGithub from '@public/icons/github.svg';
import ProductBuildWorkflow from './product-build-workflow';

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-white pt-28 text-neutral-950 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_38%_42%,rgba(163,230,53,0.10),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="container mx-auto grid min-h-[720px] items-center gap-12 px-4 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20">
        <div className="animate-workflow-rise max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm">
            <span className="size-2 rounded-full bg-lime-400" />
            Building products with AI as a force multiplier
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
            I use AI to build better products, faster.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
            I combine full-stack engineering, product thinking, and AI-assisted
            workflows to research, prototype, build, and ship thoughtful
            software products.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              View Projects
              <IconArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-950 shadow-sm shadow-cyan-900/5 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-100"
            >
              <IconChatbot className="mr-2 size-5" />
              Chat with my AI assistant
            </Link>
            <a
              href="https://github.com/roger-twan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-400"
            >
              <IconGithub className="mr-2 size-5" />
              GitHub
            </a>
          </div>
        </div>

        <ProductBuildWorkflow />
      </div>
    </section>
  );
}
