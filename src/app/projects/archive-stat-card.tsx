'use client';

import { useEffect, useState } from 'react';

type ArchiveStatCardProps = {
  label: string;
  value: number;
  index: number;
};

export default function ArchiveStatCard({
  label,
  value,
  index,
}: ArchiveStatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const delay = index * 120;
    const duration = 900;
    let animationFrame = 0;
    let startTime: number | null = null;

    const timeout = window.setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }

        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setDisplayValue(Math.round(value * easedProgress));

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animate);
        }
      };

      animationFrame = window.requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [index, value]);

  return (
    <div
      style={{ animationDelay: `${index * 120}ms` }}
      className="animate-workflow-rise group rounded-2xl border border-white/10 bg-neutral-900/70 p-4 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:shadow-lg hover:shadow-cyan-950/20"
    >
      <p className="text-3xl font-semibold tracking-tight text-white transition group-hover:text-cyan-100">
        {displayValue}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45 transition group-hover:text-white/65">
        {label}
      </p>
    </div>
  );
}
