import Link from 'next/link';
import ClientImage from '@/components/ClientImage';
import IconDocument from '@public/icons/document.svg';
import { format } from 'date-fns';
import { Post } from './journal.data';

type JournalCardProps = {
  post: Post;
  index?: number;
};

export default function JournalCard({ post, index = 0 }: JournalCardProps) {
  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      data-reveal
      className="reveal-on-scroll group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
    >
      <Link
        href={`/journal/${post.slug}`}
        className="flex h-full flex-col md:flex-row"
      >
        <div className="md:w-60 lg:w-64">
          {post.thumbnail ? (
            <ClientImage
              className="h-52 bg-neutral-100 md:h-full"
              src={post.thumbnail}
              alt={post.slug}
            />
          ) : (
            <div className="flex h-52 items-center justify-center bg-neutral-100 md:h-full">
              <IconDocument className="size-14 text-neutral-400" />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-cyan-700">
              {format(new Date(post.date), 'LLL dd, yyyy')}
            </span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-neutral-950 transition group-hover:text-cyan-700">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
            {post.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
