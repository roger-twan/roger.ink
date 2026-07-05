import { compareAsc } from 'date-fns';
import metadataParser from 'markdown-yaml-metadata-parser';
import { fetchNotesRepo } from '@/utils/octokit';

export const CategoryObj = {
  AI: {
    name: 'AI System',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-600',
    backgroundColor: 'bg-cyan-50',
  },
  Product: {
    name: 'Product Build',
    textColor: 'text-lime-700',
    borderColor: 'border-lime-600',
    backgroundColor: 'bg-lime-50',
  },
  Frontend: {
    name: 'Frontend UI',
    textColor: 'text-sky-600',
    borderColor: 'border-sky-600',
    backgroundColor: 'bg-sky-50',
  },
  Backend: {
    name: 'Backend System',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-600',
    backgroundColor: 'bg-indigo-50',
  },
  Design: {
    name: 'UX / Design',
    textColor: 'text-fuchsia-600',
    borderColor: 'border-fuchsia-600',
    backgroundColor: 'bg-fuchsia-50',
  },
  Tool: {
    name: 'Developer Tool',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-600',
    backgroundColor: 'bg-emerald-50',
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

let _data: Project[] = [];

const isFeaturedProject = (value: unknown) =>
  value === true || String(value).toLowerCase() === 'true';

const isCategory = (value: string): value is Category => value in CategoryObj;

const _fetchProjects = async () => {
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
        categories: (metadata.categories || []).filter(isCategory),
        description: metadata.description || '',
        technologies: metadata.technologies || [],
        links: links,
        date: metadata.date || '',
        featured: isFeaturedProject(metadata.featured),
      });
    }
  }

  _data = result.sort((a: Project, b: Project) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  );
};

const getProjects = async () => {
  if (!_data.length) {
    await _fetchProjects();
  }

  return _data;
};

export default getProjects;
