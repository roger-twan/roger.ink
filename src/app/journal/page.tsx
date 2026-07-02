import Link from 'next/link';
import { Metadata } from 'next';
import IconChevronLeft from '@public/icons/chevron-left.svg';
import IconChevronRight from '@public/icons/chevron-right.svg';
import getPosts, { Post } from './journal.data';
import JournalCard from './journal-card';

const POSTS_PER_PAGE = 12;

export async function generateStaticParams() {
  const posts = await getPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  const allParams = [];

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let page = 1; page <= totalPages; page++) {
    allParams.push({ page: page.toString() });
  }

  for (const tag of tags) {
    const filteredPosts = posts.filter((post) => post.tags.includes(tag));
    const tagPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;

    for (let page = 1; page <= tagPages; page++) {
      allParams.push({
        page: page.toString(),
        tag: tag,
      });
    }
  }

  return allParams;
}

type JournalListProps = {
  searchParams: Promise<{ page?: string; tag?: string }>;
};

interface Tags {
  [tagName: string]: number;
}

export const metadata: Metadata = {
  title: 'Journal | Roger Twan',
  description:
    'Notes and reflections on AI-assisted product building, full-stack systems, design, and experiments.',
};

const getTags = (posts: Post[]) => {
  const allTags: Tags = {};
  const tags: Tags = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      allTags[tag] = (allTags[tag] || 0) + 1;
    }
  }

  const sortedTags = Object.keys(allTags).sort((a, b) => {
    if (allTags[b] !== allTags[a]) {
      return allTags[b] - allTags[a];
    }
    return a.localeCompare(b);
  });

  for (const tag of sortedTags) {
    tags[tag] = allTags[tag];
  }

  return tags;
};

export default async function JournalList({ searchParams }: JournalListProps) {
  const journalPosts = await getPosts();
  const tags = getTags(journalPosts);
  const currentPage = Number((await searchParams).page) || 1;
  const selectedTag = (await searchParams).tag || '';

  const filteredPosts = selectedTag
    ? journalPosts.filter((post) => post.tags.includes(selectedTag))
    : journalPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  const pageNumbers = [];
  const maxPageNumbers = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const getPageUrl = (page: number, tag?: string) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (page > 1) params.set('page', page.toString());
    return `/journal${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const getTagUrl = (tag: string) => {
    const params = new URLSearchParams();
    params.set('tag', tag);
    return `/journal?${params.toString()}`;
  };

  return (
    <div className="w-full p-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white pt-16 pb-8 sm:pt-24 sm:pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate__animated animate__fadeInDown">
              Journal
            </h1>
            <p className="text-lg mb-8 text-center max-w-2xl animate__animated animate__flipInX">
              Notes and reflections on AI-assisted product building, full-stack
              systems, design decisions, and experiments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tag Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/journal"
                className={`px-3 py-1 rounded-full text-sm transition duration-300 ${
                  selectedTag === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                All
                <span
                  className={`ml-2 ${selectedTag === '' ? 'text-white/80' : 'text-gray-500'}`}
                >
                  {journalPosts.length}
                </span>
              </Link>
              {Object.entries(tags).map(([tag, count]) => (
                <Link
                  key={tag}
                  href={getTagUrl(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition duration-300 ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                  <span
                    className={`ml-2 ${selectedTag === tag ? 'text-white/80' : 'text-gray-500'}`}
                  >
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Journal Posts */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <JournalCard key={post.slug} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl text-gray-600">
                  No posts found matching the criteria.
                </h3>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                {/* Previous Button */}
                <Link
                  href={getPageUrl(Math.max(1, currentPage - 1))}
                  className={`flex items-center justify-center w-10 h-10 rounded-md transition duration-300 ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-blue-600 hover:text-white'
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                  <IconChevronLeft className="size-6" />
                </Link>

                {/* Page Numbers */}
                {pageNumbers.map((page) => (
                  <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={`flex items-center justify-center w-10 h-10 rounded-md transition duration-300 ${
                      page === currentPage
                        ? 'bg-blue-600 text-white cursor-not-allowed'
                        : 'text-gray-500 hover:bg-blue-600 hover:text-white'
                    }`}
                    aria-disabled={page === currentPage}
                  >
                    {page}
                  </Link>
                ))}

                {/* Next Button */}
                <Link
                  href={getPageUrl(Math.min(totalPages, currentPage + 1))}
                  className={`flex items-center justify-center w-10 h-10 rounded-md transition duration-300 ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-blue-600 hover:text-white'
                  }`}
                  aria-disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next</span>
                  <IconChevronRight className="size-6" />
                </Link>
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
