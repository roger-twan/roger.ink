'use client';

import { useEffect, useState } from 'react';

type SnapshotStatCardProps = {
  label: string;
  value: number | string;
  index: number;
};

export default function SnapshotStatCard({
  label,
  value,
  index,
}: SnapshotStatCardProps) {
  const isNumericValue = typeof value === 'number';
  const [displayValue, setDisplayValue] = useState(isNumericValue ? 0 : value);

  useEffect(() => {
    if (!isNumericValue) {
      setDisplayValue(value);
      return;
    }

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
  }, [index, isNumericValue, value]);

  return (
    <div
      style={{ animationDelay: `${index * 120}ms` }}
      className="animate-workflow-rise group rounded-2xl border border-white/10 bg-neutral-900/70 p-4 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:shadow-lg hover:shadow-cyan-950/20"
    >
      <p
        className={`flex h-9 items-end font-semibold tracking-tight text-white transition group-hover:text-cyan-100 ${
          isNumericValue ? 'text-3xl' : 'whitespace-nowrap text-xl md:text-2xl'
        }`}
      >
        {displayValue}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45 transition group-hover:text-white/65">
        {label}
      </p>
    </div>
  );
}
