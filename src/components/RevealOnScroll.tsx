'use client';

import { useEffect } from 'react';

export default function RevealOnScroll() {
  useEffect(() => {
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

    let observedElements = new WeakSet<HTMLElement>();

    const observeRevealElements = (root: ParentNode = document) => {
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>('[data-reveal]'),
      );

      for (const element of elements) {
        if (observedElements.has(element)) continue;

        observedElements.add(element);
        observer.observe(element);
      }
    };

    observeRevealElements();

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;

          if (node.matches('[data-reveal]')) {
            observeRevealElements(node.parentNode || document);
          } else {
            observeRevealElements(node);
          }
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleRevealRefresh = () => {
      observedElements = new WeakSet<HTMLElement>();
      observeRevealElements();
    };

    window.addEventListener('reveal:refresh', handleRevealRefresh);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('reveal:refresh', handleRevealRefresh);
    };
  }, []);

  return null;
}
