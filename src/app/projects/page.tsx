import { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';

import ArchiveStatCard from './archive-stat-card';
import getProjects from './projects.data';
import ProjectsList from './list';

export const metadata: Metadata = {
  title: 'Projects | Roger Twan',
  description:
    'Selected products, AI-assisted workflows, full-stack applications, and product experiments by Roger Twan.',
};

export default async function Projects() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  const technologies = new Set(
    projects.flatMap((project) => project.technologies),
  );
  const projectLinks = projects.reduce(
    (total, project) => total + project.links.length,
    0,
  );
  const archiveStats = [
    { label: 'Projects', value: projects.length },
    { label: 'Featured', value: featuredProjects.length },
    { label: 'Technologies', value: technologies.size },
    { label: 'Proof links', value: projectLinks },
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      <RevealOnScroll />
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 py-20 text-white md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(190,242,100,0.12),transparent_28%)]" />
        <div className="container mx-auto px-4">
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,420px)] lg:items-center xl:gap-8">
            <div data-reveal className="reveal-on-scroll max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Projects
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Product builds, AI systems, and full-stack experiments.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                A working archive of products and experiments that show how I
                connect product thinking, interface quality, AI workflows, and
                engineering execution.
              </p>
            </div>

            <div
              data-reveal
              className="reveal-on-scroll w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Archive snapshot
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    A quick read on the project collection
                  </p>
                </div>
                <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-xs font-semibold text-lime-200">
                  live data
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {archiveStats.map((stat, index) => (
                  <ArchiveStatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ProjectsList projects={projects} />
        </div>
      </section>
    </div>
  );
}
