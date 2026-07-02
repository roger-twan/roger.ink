'use client';

import { useEffect } from 'react';

export default function RevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
