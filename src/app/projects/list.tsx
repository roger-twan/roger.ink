'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import IconFigma from '@public/icons/figma.svg';
import IconGithub from '@public/icons/github.svg';
import IconJournal from '@public/icons/journal.svg';
import IconLive from '@public/icons/live.svg';
import ClientImage from '@/components/ClientImage';
import { Category, CategoryObj, Project } from './projects.data';

const iconClasses = 'mr-1.5 size-4';
export const LinkTypeIconMap = {
  GitHub: <IconGithub className={iconClasses} />,
  Journal: <IconJournal className={iconClasses} />,
  Figma: <IconFigma className={iconClasses} />,
  Live: <IconLive className={iconClasses} />,
};

const categoryKeys = Object.keys(CategoryObj) as Category[];

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const projectGridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    'All',
  );

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(selectedCategory),
    );
  }, [selectedCategory, projects]);

  useEffect(() => {
    const projectCards =
      projectGridRef.current?.querySelectorAll<HTMLElement>('[data-reveal]');

    projectCards?.forEach((card) => {
      card.removeAttribute('data-revealed');
    });

    window.dispatchEvent(new Event('reveal:refresh'));
  }, [filteredProjects.length, selectedCategory]);

  return (
    <div>
      <div
        data-reveal
        className="reveal-on-scroll mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            All projects
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Browse the work.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Filter by project type, then inspect the screenshots, technology
            stack, and proof links behind each build.
          </p>
        </div>
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 shadow-sm">
            <button
              type="button"
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === 'All'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categoryKeys.map((category) => (
              <button
                key={category}
                type="button"
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {CategoryObj[category].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div
          ref={projectGridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.title}
              style={{ animationDelay: `${index * 70}ms` }}
              data-reveal
              className="reveal-on-scroll group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative">
                <ClientImage
                  className="h-64 bg-neutral-100"
                  src={project.image}
                  alt={project.title}
                />
                {project.featured && (
                  <span className="absolute left-4 top-4 rounded-full border border-cyan-200 bg-cyan-50/95 px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className={`${CategoryObj[category].textColor} ${CategoryObj[category].borderColor} ${CategoryObj[category].backgroundColor} rounded-full border px-2.5 py-1 text-xs font-semibold`}
                    >
                      {CategoryObj[category].name}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-950">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.links.map((link) => (
                      <a
                        className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
                        target="_blank"
                        href={link.url}
                        rel="noreferrer"
                        key={link.type}
                      >
                        {LinkTypeIconMap[link.type]}
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-neutral-600">
          No projects match this filter yet.
        </div>
      )}
    </div>
  );
}
