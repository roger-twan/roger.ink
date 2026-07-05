import { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';
import IconArrowRight from '@public/icons/arrow-right.svg';
import IconChatbot from '@public/icons/chatbot.svg';
import IconEmail from '@public/icons/email.svg';
import IconGithub from '@public/icons/github.svg';
import IconLinkedin from '@public/icons/linkedin.svg';
import Form from './form';

export const metadata: Metadata = {
  title: 'Contact | Roger Twan',
  description:
    'Get in touch with Roger Twan about AI-assisted product engineering, full-stack products, and practical AI workflows.',
};

const contactLinks = [
  {
    label: 'Email',
    value: 'roger.twan@gmail.com',
    href: 'mailto:roger.twan@gmail.com',
    icon: <IconEmail className="size-5" />,
  },
  {
    label: 'LinkedIn',
    value: 'roger-twan',
    href: 'https://www.linkedin.com/in/roger-twan',
    icon: <IconLinkedin className="size-5" />,
  },
  {
    label: 'GitHub',
    value: 'roger-twan',
    href: 'https://github.com/roger-twan',
    icon: <IconGithub className="size-5" />,
  },
];

const conversationTopics = [
  'AI-assisted product engineering',
  'RAG systems and AI workflows',
  'Full-stack product builds',
  'UX, product polish, and delivery quality',
];

export default function Contact() {
  return (
    <div className="w-full bg-white">
      <RevealOnScroll />
      <section className="relative overflow-hidden border-b border-white/10 bg-neutral-950 pt-24 pb-16 text-white md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(190,242,100,0.12),transparent_28%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_380px] lg:items-end">
            <div data-reveal className="reveal-on-scroll max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Contact
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Let&apos;s talk about building better products with AI.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
                Reach out if you want to discuss AI-assisted product workflows,
                RAG systems, full-stack product builds, or practical ways to
                move from idea to shipped software.
              </p>
            </div>

            <div
              data-reveal
              className="reveal-on-scroll rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur"
            >
              <p className="text-sm font-semibold text-white">
                Good topics to start with
              </p>
              <div className="mt-4 grid gap-2">
                {conversationTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70"
                  >
                    <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.5)]" />
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <aside data-reveal className="reveal-on-scroll">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                Reach me
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                Send a note, or start with my AI assistant.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                For a quick overview of my work, the AI assistant can answer
                questions from my portfolio, projects, and writing. For direct
                conversations, email or the form works best.
              </p>

              <div className="mt-8 grid gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-sm"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800 transition group-hover:border-cyan-200 group-hover:text-cyan-700">
                        {link.icon}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-neutral-950">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-sm text-neutral-600">
                          {link.value}
                        </span>
                      </span>
                    </span>
                    <IconArrowRight className="size-4 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700" />
                  </a>
                ))}
              </div>

              <a
                href="/chat"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                <IconChatbot className="mr-2 size-5" />
                Chat with my AI assistant
              </a>
            </aside>

            <div
              data-reveal
              className="reveal-on-scroll rounded-[2rem] border border-neutral-200 bg-neutral-50 p-5 md:p-6"
            >
              <Form />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
