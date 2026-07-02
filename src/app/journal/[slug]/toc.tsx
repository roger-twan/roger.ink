'use client';

import { useState } from 'react';
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
) => {
  switch (tocItem.tagName) {
    case 'nav':
      return (
        <nav className="-ml-4 -mt-2 leading-tight">
          {tocItem.children.map((item: any) => renderTOC(item, isDrawer, cb))}
        </nav>
      );
    case 'ol':
      return (
        <ul className="ml-4" key={Math.random()}>
          {tocItem.children.map((item: any) => renderTOC(item, isDrawer, cb))}
        </ul>
      );
    case 'li':
      return (
        <li key={Math.random()} className="mt-2">
          {tocItem.children.map((item: any) => renderTOC(item, isDrawer, cb))}
        </li>
      );
    case 'a':
      return (
        <a key={Math.random()} {...tocItem.properties} onClick={() => cb?.()}>
          {tocItem.children.map((item: any) => renderTOC(item, isDrawer, cb))}
        </a>
      );
    default:
      return (
        <span
          key={Math.random()}
          className="inline-block transition hover:text-blue-600 hover:underline"
        >
          {tocItem.value}
        </span>
      );
  }
};

export default function Toc({ toc, isMobile = false }: TocProps) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  if (!toc || toc.children[0].children.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <>
        <button
          className="flex items-center py-0.5 pl-2 pr-1 rounded-xl border border-white text-sm md:hidden"
          onClick={() => setIsOpenDrawer(true)}
        >
          Table of Contents
          <IconUpDown className="ml-1 size-4" />
        </button>
        <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
          <div className="text-black">
            {renderTOC(toc, true, () => setIsOpenDrawer(false))}
          </div>
        </Drawer>
      </>
    );
  }

  return (
    <aside className="hidden border-l border-gray-300 ml-10 pl-6 opacity-30 md:block transition duration-500 delay-1000 min-w-52 max-w-80 hover:opacity-100 hover:delay-0">
      <div className="sticky top-[80px] max-h-[calc(100vh-80px)] overflow-y-auto">
        {renderTOC(toc)}
      </div>
    </aside>
  );
}
