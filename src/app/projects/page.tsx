import { Metadata } from 'next';

import getProjects from './projects.data';
import ProjectsOverview from './overview';
import ProjectsList from './list';

export const metadata: Metadata = {
  title: 'Projects | Roger Twan',
  description:
    'Selected AI products, full-stack applications, workflow tools, and product experiments by Roger Twan.',
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="w-full p-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white pt-16 pb-8 sm:pt-24 sm:pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate__animated animate__fadeInDown">
              Projects
            </h1>
            <p className="text-lg mb-8 text-center max-w-2xl animate__animated animate__flipInX">
              Selected AI products, full-stack applications, workflow tools, and
              product experiments with an emphasis on polished interfaces and
              practical systems.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <ProjectsOverview />
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ProjectsList projects={projects} />
        </div>
      </section>
    </div>
  );
}
