import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import ClientImage from '@/components/ClientImage';
import type { Project } from '../projects/projects.data';
import SectionHeader from './section-header';

const projectProof = [
  'AI workflow',
  'Product UI',
  'Architecture',
  'Deployment',
];

type FeaturedProjectSectionProps = {
  project?: Project;
};

export default function FeaturedProjectSection({
  project,
}: FeaturedProjectSectionProps) {
  if (!project) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Featured project"
          title="Product proof before technology lists."
          description="The homepage should lead with a showcase that feels inspectable: screenshots, workflow, architecture, and a clear reason the product exists."
        />

        <div className="grid overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-50 shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-[320px] bg-neutral-950 p-3">
            <ClientImage
              src={project.image}
              alt={project.title}
              className="h-full min-h-[320px] rounded-[1.5rem] bg-neutral-900"
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-neutral-950">
              {project.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              {project.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {projectProof.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-neutral-950">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.type}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {link.type}
                  <IconArrowRight className="ml-2 size-4" />
                </a>
              ))}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-400"
              >
                View all projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
