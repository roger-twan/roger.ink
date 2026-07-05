'use client';

import { useEffect, useState } from 'react';
import Drawer from '@/components/Drawer';
import IconUpDown from '@public/icons/chevron-up-down.svg';

interface TocProps {
  toc: any;
  isMobile?: boolean;
}

const renderTOC = (
  tocItem: any,
  isDrawer: boolean = false,
  cb?: () => void,
  activeId: string = '',
) => {
  switch (tocItem.tagName) {
    case 'nav':
      return (
        <nav
          className={`leading-tight ${
            isDrawer ? '-mx-2 space-y-1' : '-ml-4 -mt-2'
          }`}
        >
          {tocItem.children.map((item: any) =>
            renderTOC(item, isDrawer, cb, activeId),
          )}
        </nav>
      );
    case 'ol':
      return (
        <ul className="ml-4" key={Math.random()}>
          {tocItem.children.map((item: any) =>
            renderTOC(item, isDrawer, cb, activeId),
          )}
        </ul>
      );
    case 'li':
      return (
        <li key={Math.random()} className={isDrawer ? 'mt-1' : 'mt-2'}>
          {tocItem.children.map((item: any) =>
            renderTOC(item, isDrawer, cb, activeId),
          )}
        </li>
      );
    case 'a': {
      const href = tocItem.properties?.href || '';
      const isActive = href === `#${activeId}`;
      const linkClasses = isActive
        ? isDrawer
          ? 'block rounded-xl bg-cyan-50 px-3 py-2 font-semibold text-cyan-800'
          : 'font-semibold text-neutral-950'
        : isDrawer
          ? 'block rounded-xl px-3 py-2 text-neutral-700 transition hover:bg-neutral-50 hover:text-cyan-700'
          : 'text-neutral-500 transition hover:text-cyan-700';

      return (
        <a
          key={Math.random()}
          {...tocItem.properties}
          className={linkClasses}
          onClick={() => cb?.()}
        >
          {tocItem.children.map((item: any) =>
            renderTOC(item, isDrawer, cb, activeId),
          )}
        </a>
      );
    }
    default:
      return (
        <span key={Math.random()} className="inline-block">
          {tocItem.value}
        </span>
      );
  }
};

export default function Toc({ toc, isMobile = false }: TocProps) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        'article h2[id], article h3[id], article h4[id]',
      ),
    );

    if (!headings.length) return;

    setActiveId(headings[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryA.boundingClientRect.top - entryB.boundingClientRect.top,
          );

        if (visibleHeadings[0]?.target instanceof HTMLElement) {
          setActiveId(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (!toc || toc.children[0].children.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <>
        <button
          className="flex items-center rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-3 pr-2 text-sm font-semibold text-white/70 transition hover:border-cyan-300/40 hover:text-cyan-100 lg:hidden"
          onClick={() => setIsOpenDrawer(true)}
        >
          Contents
          <IconUpDown className="ml-1 size-4" />
        </button>
        <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
          <div className="text-sm">
            <div className="mb-6 border-b border-neutral-200 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Contents
              </p>
            </div>
            {renderTOC(toc, true, () => setIsOpenDrawer(false), activeId)}
          </div>
        </Drawer>
      </>
    );
  }

  return (
    <aside className="hidden lg:block">
      <div className="toc-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm shadow-sm">
        <div className="mb-4 border-b border-neutral-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Contents
          </p>
        </div>
        {renderTOC(toc, false, undefined, activeId)}
      </div>
    </aside>
  );
}
