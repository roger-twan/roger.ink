import { notFound } from 'next/navigation';
import { Metadata } from 'next';
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
    <div className="w-full p-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white pt-16 pb-8 sm:pt-24 sm:pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate__animated animate__fadeInDown">
              {post.title}
            </h1>
            <div className="text-lg mb-6 text-center max-w-2xl animate__animated animate__flipInX">
              <div className="mt-2">
                {post.tags.map((tag: string) => (
                  <span
                    className="rounded-full text-gray-600 bg-gray-100 px-2 py-1 mx-1 text-sm"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm">
                {format(new Date(post.date), 'LLL dd, yyyy')}
              </p>
            </div>
            <Toc toc={toc} isMobile />
          </div>
        </div>
      </section>

      <section className="container mx-auto flex justify-center px-4 py-16">
        <div className="max-w-full">
          <Article content={post.content} />

          <hr className="my-8 border-gray-300" />
          <GiscusComment />
        </div>
        <Toc toc={toc} />
      </section>
    </div>
  );
}
