import Link from 'next/link';
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
          title="Notes on building products with AI."
          description="A quieter home for AI-assisted workflows, architecture decisions, UX tradeoffs, and reflections from building."
          theme="dark"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07]"
            >
              <p className="text-sm text-cyan-200">{post.date}</p>
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
            Read Journal
            <IconArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
