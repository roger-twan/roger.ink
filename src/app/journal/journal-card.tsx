import Link from 'next/link';
import ClientImage from '@/components/ClientImage';
import IconDocument from '@public/icons/document.svg';
import { format } from 'date-fns';
import { Post } from './journal.data';

export default function JournalCard({ post }: { post: Post }) {
  return (
    <article className="group bg-gray-100 rounded-lg shadow overflow-hidden hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
      <Link href={`/journal/${post.slug}`} className="flex flex-col h-full">
        {post.thumbnail ? (
          <ClientImage className="h-64" src={post.thumbnail} alt={post.slug} />
        ) : (
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <IconDocument className="size-20 text-gray-500" />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-700">
              {format(new Date(post.date), 'LLL dd, yyyy')}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h6 className="font-bold text-lg mb-0">{post.title}</h6>
          </div>
          <p className="mb-3 text-gray-700 text-sm text-ellipsis line-clamp-3">
            {post.description}
          </p>
          <div className="flex gap-2 mt-auto">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
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
