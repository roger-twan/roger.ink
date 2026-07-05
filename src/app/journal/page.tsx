import Link from 'next/link';
import { Metadata } from 'next';
import { format } from 'date-fns';
import IconChevronLeft from '@public/icons/chevron-left.svg';
import IconChevronRight from '@public/icons/chevron-right.svg';
import RevealOnScroll from '@/components/RevealOnScroll';
import SnapshotStatCard from '@/components/SnapshotStatCard';
import getPosts, { Post } from './journal.data';
import JournalCard from './journal-card';
import JournalRevealRefresh from './journal-reveal-refresh';
import JournalTopicFilter from './journal-topic-filter';

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
  const revealRefreshKey = paginatedPosts.map((post) => post.slug).join('|');

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

  const latestPostDate = journalPosts[0]?.date
    ? format(new Date(journalPosts[0].date), 'LLL dd, yyyy')
    : 'N/A';
  const topicEntries = Object.entries(tags);
  const journalStats = [
    { label: 'Entries', value: journalPosts.length },
    { label: 'Topics', value: Object.keys(tags).length },
    { label: 'Current view', value: filteredPosts.length },
    { label: 'Latest', value: latestPostDate },
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      <RevealOnScroll />
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 py-20 text-white md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(190,242,100,0.12),transparent_28%)]" />
        <div className="container mx-auto px-4">
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,400px)] lg:items-center">
            <div data-reveal className="reveal-on-scroll max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Journal
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Build notes on product, systems, and AI-assisted engineering.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Writing that shows how I think through product direction, UX
                decisions, architecture tradeoffs, and practical AI workflows.
              </p>
            </div>

            <div
              data-reveal
              className="reveal-on-scroll rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Journal snapshot
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Current writing archive
                  </p>
                </div>
                <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-xs font-semibold text-lime-200">
                  notes
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {journalStats.map((stat, index) => (
                  <SnapshotStatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div
            data-reveal
            className="reveal-on-scroll relative z-20 mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                All entries
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                Browse the notes.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
                Filter by topic to scan writing on AI workflows, product
                decisions, system design, and lessons from building.
              </p>
            </div>
            <div className="max-w-3xl">
              <JournalTopicFilter
                allCount={journalPosts.length}
                selectedTag={selectedTag}
                topics={topicEntries}
              />
            </div>
          </div>

          <JournalRevealRefresh refreshKey={revealRefreshKey} />
          <div
            data-journal-list
            className="relative z-0 grid grid-cols-1 gap-5 xl:grid-cols-2"
          >
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post, index) => (
                <JournalCard key={post.slug} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-neutral-600">
                <h3 className="text-xl">
                  No posts found matching the criteria.
                </h3>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <Link
                  href={getPageUrl(Math.max(1, currentPage - 1), selectedTag)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 transition ${
                    currentPage === 1
                      ? 'cursor-not-allowed text-neutral-300'
                      : 'text-neutral-500 hover:border-cyan-300 hover:text-cyan-700'
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                  <IconChevronLeft className="size-6" />
                </Link>

                {pageNumbers.map((page) => (
                  <Link
                    key={page}
                    href={getPageUrl(page, selectedTag)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-sm font-semibold transition ${
                      page === currentPage
                        ? 'cursor-not-allowed bg-neutral-950 text-white'
                        : 'text-neutral-500 hover:border-cyan-300 hover:text-cyan-700'
                    }`}
                    aria-disabled={page === currentPage}
                  >
                    {page}
                  </Link>
                ))}

                <Link
                  href={getPageUrl(
                    Math.min(totalPages, currentPage + 1),
                    selectedTag,
                  )}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 transition ${
                    currentPage === totalPages
                      ? 'cursor-not-allowed text-neutral-300'
                      : 'text-neutral-500 hover:border-cyan-300 hover:text-cyan-700'
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
