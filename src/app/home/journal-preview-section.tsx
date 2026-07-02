import Link from 'next/link';
import { format } from 'date-fns';
import IconArrowRight from '@public/icons/arrow-right.svg';
import type { Post } from '../journal/journal.data';
import SectionHeader from './section-header';

type JournalPreviewSectionProps = {
  posts: Post[];
};

export default function JournalPreviewSection({
  posts,
}: JournalPreviewSectionProps) {
  return (
    <section className="bg-neutral-950 py-16 text-white md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Journal"
          title="Read how I think through product and engineering."
          description="Build notes on AI-assisted workflows, system design, UX decisions, and the tradeoffs behind shipping software products."
          theme="dark"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              style={{ animationDelay: `${index * 100}ms` }}
              data-reveal
              className="reveal-on-scroll rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07]"
            >
              <p className="text-sm text-cyan-200">
                {format(new Date(post.date), 'LLL dd, yyyy')}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="mt-4 text-lg font-semibold text-white">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/60">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Read the journal
            <IconArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
