import Image from 'next/image';
import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import { profileLinks } from './about.data';

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 pt-24 pb-16 text-white md:pt-32 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(190,242,100,0.12),transparent_28%)]" />
      <div className="container mx-auto px-4">
        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_360px]">
          <div data-reveal className="reveal-on-scroll max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              About
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              I build software products with AI as part of the workflow.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              I am a full-stack developer focused on AI product engineering:
              combining product thinking, UX taste, system design, and
              AI-assisted workflows to turn ideas into shipped products.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                View projects
                <IconArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/journal"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-cyan-100"
              >
                Read journal
              </Link>
            </div>
          </div>

          <div
            data-reveal
            className="reveal-on-scroll relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/20 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06] hover:shadow-cyan-950/30"
          >
            <Image
              className="aspect-square rounded-[1.5rem] object-cover"
              src="/avatar.jpg"
              alt="Roger Twan"
              width={640}
              height={640}
              priority
            />
            <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
              <p className="text-sm font-semibold text-white">
                AI-assisted product engineer
              </p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Full-stack execution, product sense, UX background, and
                practical AI workflows.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/65 transition hover:border-cyan-300/45 hover:text-cyan-100"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
