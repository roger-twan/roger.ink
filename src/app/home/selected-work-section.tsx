import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import ClientImage from '@/components/ClientImage';
import type { Project } from '../projects/projects.data';
import SectionHeader from './section-header';

type SelectedWorkSectionProps = {
  projects: Project[];
};

export default function SelectedWorkSection({
  projects,
}: SelectedWorkSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Selected work"
          title="A tighter project shelf, curated for product signal."
          description="Only the strongest projects should be pulled forward on the homepage, with screenshots, workflow, and proof links doing more work than a badge wall."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <ClientImage
                src={project.image}
                alt={project.title}
                className="h-56 bg-neutral-100"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-950">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-400"
          >
            Explore Projects
            <IconArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
