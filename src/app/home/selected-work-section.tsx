import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import IconFigma from '@public/icons/figma.svg';
import IconGithub from '@public/icons/github.svg';
import IconJournal from '@public/icons/journal.svg';
import IconLive from '@public/icons/live.svg';
import ClientImage from '@/components/ClientImage';
import type { Project } from '../projects/projects.data';
import SectionHeader from './section-header';

type SelectedWorkSectionProps = {
  projects: Project[];
};

const linkIconClasses = 'mr-1.5 size-4';
const linkIconMap = {
  GitHub: <IconGithub className={linkIconClasses} />,
  Journal: <IconJournal className={linkIconClasses} />,
  Figma: <IconFigma className={linkIconClasses} />,
  Live: <IconLive className={linkIconClasses} />,
};

export default function SelectedWorkSection({
  projects,
}: SelectedWorkSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Selected work"
          title="See how I turn ideas into usable products."
          description="Browse a few projects that show how I think through product direction, interface design, engineering tradeoffs, and shipped workflows."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              style={{ animationDelay: `${index * 100}ms` }}
              data-reveal
              className="reveal-on-scroll group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <ClientImage
                src={project.image}
                alt={project.title}
                className="h-56 bg-neutral-100"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-neutral-950">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.links.map((link) => (
                      <a
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
                      >
                        {linkIconMap[link.type]}
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-400"
          >
            View all projects
            <IconArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
