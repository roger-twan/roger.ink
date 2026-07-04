'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import IconChevronUpDown from '@public/icons/chevron-up-down.svg';

type JournalTopicFilterProps = {
  allCount: number;
  selectedTag: string;
  topics: [string, number][];
};

const getTagUrl = (tag: string) => {
  const params = new URLSearchParams();
  params.set('tag', tag);
  return `/journal?${params.toString()}`;
};

export default function JournalTopicFilter({
  allCount,
  selectedTag,
  topics,
}: JournalTopicFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const orderedTopics = useMemo(() => {
    if (!selectedTag) {
      return topics;
    }

    return [
      ...topics.filter(([tag]) => tag === selectedTag),
      ...topics.filter(([tag]) => tag !== selectedTag),
    ];
  }, [selectedTag, topics]);

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 shadow-sm">
      <div className="flex max-h-9 flex-wrap gap-2 overflow-hidden pr-10">
        <Link
          href="/journal"
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            selectedTag === ''
              ? 'bg-neutral-950 text-white shadow-sm'
              : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          All
          <span
            className={`ml-2 ${selectedTag === '' ? 'text-white/70' : 'text-neutral-400'}`}
          >
            {allCount}
          </span>
        </Link>
        {orderedTopics.map(([tag, count]) => (
          <Link
            key={tag}
            href={getTagUrl(tag)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              selectedTag === tag
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            {tag}
            <span
              className={`ml-2 ${selectedTag === tag ? 'text-white/70' : 'text-neutral-400'}`}
            >
              {count}
            </span>
          </Link>
        ))}
      </div>
      <button
        type="button"
        aria-label={expanded ? 'Show fewer topics' : 'Show more topics'}
        aria-expanded={expanded}
        className="absolute right-2 top-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-50/90 text-neutral-400 transition hover:bg-white hover:text-neutral-700"
        onClick={() => setExpanded((current) => !current)}
      >
        <IconChevronUpDown className="size-4" />
      </button>
      {expanded && (
        <div className="absolute -left-px -right-px -top-px z-[100] rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 shadow-xl shadow-neutral-950/10">
          <div className="pr-10">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/journal"
                onClick={() => setExpanded(false)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  selectedTag === ''
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                All
                <span
                  className={`ml-2 ${selectedTag === '' ? 'text-white/70' : 'text-neutral-400'}`}
                >
                  {allCount}
                </span>
              </Link>
              {orderedTopics.map(([tag, count]) => (
                <Link
                  key={tag}
                  href={getTagUrl(tag)}
                  onClick={() => setExpanded(false)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedTag === tag
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {tag}
                  <span
                    className={`ml-2 ${selectedTag === tag ? 'text-white/70' : 'text-neutral-400'}`}
                  >
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Show fewer topics"
            aria-expanded={expanded}
            className="absolute right-2 top-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-50/90 text-neutral-400 transition hover:bg-white hover:text-neutral-700"
            onClick={() => setExpanded(false)}
          >
            <IconChevronUpDown className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
