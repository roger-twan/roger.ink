import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { options } from '@/utils/mdx';

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  return (
    <article className="overflow-hidden prose prose-lg prose-img:m-0 prose-table:block prose-table:overflow-x-auto prose-svg:overflow-x-auto">
      <MDXRemote source={content} options={options} />
    </article>
  );
}
