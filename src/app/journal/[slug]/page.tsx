import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import 'highlight.js/styles/github-dark-dimmed.css';
import { getToc } from '@/utils/mdx';
import GiscusComment from '@/components/Giscus';
import getPosts, { Post } from '../journal.data';
import Article from './article';
import Toc from './toc';

type JournalPostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: JournalPostProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const post: Post | undefined = posts.find(
    (post) => post.slug === decodeURIComponent(slug),
  );

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Roger's Journal`,
    description: post.description,
  };
}

export default async function JournalPost({ params }: JournalPostProps) {
  const { slug } = await params;
  const posts = await getPosts();
  const post: Post | undefined = posts.find(
    (post) => post.slug === decodeURIComponent(slug),
  );

  if (!post) {
    notFound();
  }
  const toc = await getToc(post.content);

  return (
    <div className="w-full bg-white">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 pt-24 pb-6 text-white md:pt-32 md:pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(190,242,100,0.12),transparent_28%)]" />
        <div className="container mx-auto px-4">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,760px)_260px] lg:justify-center xl:grid-cols-[minmax(0,820px)_280px]">
            <div className="min-w-0 lg:col-span-2">
              <Link
                href="/journal"
                className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/60 transition hover:border-cyan-300/40 hover:text-cyan-100"
              >
                Journal
              </Link>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <time className="text-sm font-medium text-cyan-200">
                  {format(new Date(post.date), 'LLL dd, yyyy')}
                </time>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/65"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-8">
                <Toc toc={toc} isMobile />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_260px] lg:justify-center xl:grid-cols-[minmax(0,820px)_280px]">
            <div className="min-w-0">
              <Article content={post.content} />

              <div className="my-12 border-t border-neutral-200" />
              <GiscusComment />
            </div>
            <Toc toc={toc} />
          </div>
        </div>
      </section>
    </div>
  );
}
