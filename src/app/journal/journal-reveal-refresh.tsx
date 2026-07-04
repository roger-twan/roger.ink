'use client';

import { useEffect } from 'react';

type JournalRevealRefreshProps = {
  refreshKey: string;
};

export default function JournalRevealRefresh({
  refreshKey,
}: JournalRevealRefreshProps) {
  useEffect(() => {
    const journalCards = document.querySelectorAll<HTMLElement>(
      '[data-journal-list] [data-reveal]',
    );

    journalCards.forEach((card) => {
      card.removeAttribute('data-revealed');
    });

    window.dispatchEvent(new Event('reveal:refresh'));
  }, [refreshKey]);

  return null;
}
