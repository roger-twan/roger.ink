import { compareAsc } from 'date-fns';
import metadataParser from 'markdown-yaml-metadata-parser';
import { fetchNotesRepo } from '@/utils/octokit';

export interface Post {
  title: string;
  slug: string;
  date: string;
  thumbnail: string;
  tags: string[];
  description: string;
  content: string;
}

let _data: Post[] = [];

const _fetchPosts = async () => {
  const result: Post[] = [];

  const folderData = await fetchNotesRepo('/contents/{path}', {
    path: 'Technical',
  });

  for (const post of folderData.data) {
    const postData = await fetchNotesRepo(
      '/contents/{path}',
      {
        path: post.path,
      },
      {
        Accept: 'application/vnd.github.v3.raw',
      },
    );

    const { content, metadata } = metadataParser(postData.data);

    if (metadata && metadata.publish) {
      let thumbnail = content.match(/!\[.*\]\((.*)\)/)?.[1] || '';
      const title = post.name.replace('.md', '');

      if (thumbnail) {
        // youtube
        if (thumbnail.indexOf('youtu.be') > -1) {
          thumbnail =
            thumbnail.replace('youtu.be', 'i.ytimg.com/vi') +
            '/maxresdefault.jpg';
        }
        // mp4
        if (
          thumbnail.split('.').length &&
          thumbnail.split('.').pop() === 'mp4'
        ) {
          thumbnail = '';
        }
      }

      result.push({
        title: title,
        slug: title,
        thumbnail: thumbnail,
        date: String(metadata.date || ''),
        tags: metadata.tags.map((tag: string) => tag.split('/')[1]) || [],
        description: content
          .replace(/<[^>]+>/g, '') // remove html
          .replace(/!\[.*\]\((.*)\)/g, '') // remove image
          .replace(/\[.*\]\((.*)\)/g, '') // remove link
          .replace(/#{1,6}/g, '') // remove heading
          .replace(/(\*\*|__)[^\*\*]+(\*\*|__)/g, '') // remove bold
          .replace(/(\*|_)[^\*\_]+(\*|_)/g, '') // remove italic
          .replace(/```[\s\S]+?```/g, '') // remove code
          .replace(/\n+/g, ' ') // remove newline
          .trim()
          .slice(0, 300),
        content: content
          .replace(/\$(\S[^\$\n]+\S)\$/g, '$$$$$1$$$') // replace math expression
          .replaceAll('plantuml-svg', 'plantuml'),
      });
    }
  }

  _data = result.sort((a: Post, b: Post) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  );
};

const getPosts = async () => {
  if (!_data.length) {
    await _fetchPosts();
  }

  return _data;
};

export default getPosts;
