import { compareAsc } from 'date-fns';
import metadataParser from 'markdown-yaml-metadata-parser';
import { fetchNotesRepo } from '@/utils/octokit';

export const CategoryObj = {
  Web: {
    name: 'Web Application',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-600',
    backgroundColor: 'bg-yellow-50',
  },
  Mobile: {
    name: 'Mobile App',
    textColor: 'text-green-600',
    borderColor: 'border-green-600',
    backgroundColor: 'bg-green-50',
  },
  Design: {
    name: 'Design Project',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-600',
    backgroundColor: 'bg-purple-50',
  },
  Tool: {
    name: 'Tool',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-600',
    backgroundColor: 'bg-cyan-50',
  },
};
interface Link {
  type: 'GitHub' | 'Figma' | 'Live' | 'Journal';
  url: string;
}
export type Category = keyof typeof CategoryObj;
export interface Project {
  title: string;
  categories: Category[];
  description: string;
  technologies: string[];
  image: string;
  links: Link[];
  date: string;
  featured: boolean;
}

const isFeaturedProject = (value: unknown) =>
  value === true || String(value).toLowerCase() === 'true';

const getProjects = async () => {
  const result: Project[] = [];

  const folderData = await fetchNotesRepo('/contents/{path}', {
    path: 'Projects',
  });

  for (const project of folderData.data) {
    if (project.name === '_index.md') continue;

    const projectData = await fetchNotesRepo(
      '/contents/{path}',
      {
        path: project.path,
      },
      {
        Accept: 'application/vnd.github.v3.raw',
      },
    );

    const { content, metadata } = metadataParser(projectData.data);

    if (metadata) {
      const image = content.match(/!\[.*\]\((.*)\)/)?.[1] || '';
      const title = project.name.replace('.md', '');
      const links: Link[] = [];

      if (metadata['github-link']) {
        links.push({
          type: 'GitHub',
          url: metadata['github-link'],
        });
      }

      if (metadata['journal-link']) {
        links.push({
          type: 'Journal',
          url: metadata['journal-link'],
        });
      }

      if (metadata['figma-link']) {
        links.push({
          type: 'Figma',
          url: metadata['figma-link'],
        });
      }

      if (metadata['live-link']) {
        links.push({
          type: 'Live',
          url: metadata['live-link'],
        });
      }

      result.push({
        title: title,
        image: image,
        categories: metadata.categories || [],
        description: metadata.description || '',
        technologies: metadata.technologies || [],
        links: links,
        date: metadata.date || '',
        featured: isFeaturedProject(metadata.featured),
      });
    }
  }

  return result.sort((a: Project, b: Project) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  );
};

export default getProjects;
