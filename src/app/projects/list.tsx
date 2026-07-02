'use client';

import { useState, useEffect } from 'react';
import IconLive from '@public/icons/live.svg';
import IconGithub from '@public/icons/github.svg';
import IconFigma from '@public/icons/figma.svg';
import IconJournal from '@public/icons/journal.svg';
import ClientImage from '@/components/ClientImage';
import { Project, Category, CategoryObj } from './projects.data';

const svgClasses = 'size-4 mr-1';
export const LinkTypeIconMap = {
  GitHub: <IconGithub className={svgClasses} />,
  Journal: <IconJournal className={svgClasses} />,
  Figma: <IconFigma className={svgClasses} />,
  Live: <IconLive className={svgClasses} />,
};

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((item) =>
          item.categories.includes(selectedCategory as Category),
        ),
      );
    }
  }, [selectedCategory, projects]);

  return (
    <>
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">All Projects</h2>
        <div className="text-center max-w-full overflow-x-auto">
          <div className="inline-flex rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <button
              className={`px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 border-r border-gray-200 cursor-pointer ${selectedCategory === 'All' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {Object.entries(CategoryObj).map(([key, value]) => (
              <button
                key={key}
                className={`px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 border-r border-gray-200 cursor-pointer ${selectedCategory === key ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setSelectedCategory(key as Category)}
              >
                {value.name}s
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProjects.map((item) => (
          <div
            key={item.title}
            className="group bg-gray-100 rounded-lg shadow flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
          >
            <ClientImage className="h-64" src={item.image} alt={item.title} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-lg mb-0">{item.title}</h6>
                <div className="flex justify-end gap-1">
                  {item.categories.map((category, index) => (
                    <span
                      key={index}
                      className={`${CategoryObj[category].textColor} border ${CategoryObj[category].borderColor} ${CategoryObj[category].backgroundColor} px-1 py-0.5 rounded-full text-xs`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mb-2 text-gray-700 text-sm">{item.description}</p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {item.links.map((item) => (
                  <a
                    className="inline-flex items-center py-1 px-2 rounded-full border border-gray-300 bg-white text-sm  hover:bg-gray-200 transition"
                    target="_blank"
                    href={item.url}
                    rel="noreferrer"
                    key={item.type}
                  >
                    {LinkTypeIconMap[item.type]}
                    {item.type}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
