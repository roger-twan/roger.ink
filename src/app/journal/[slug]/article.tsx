import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { options } from '@/utils/mdx';

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  return (
    <article className="prose prose-lg max-w-none overflow-hidden prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-neutral-950 prose-h2:border-t prose-h2:border-neutral-200 prose-h2:pt-10 prose-h2:text-neutral-950 prose-h3:text-neutral-900 prose-p:leading-8 prose-p:text-neutral-700 prose-a:font-medium prose-a:text-cyan-700 prose-a:no-underline hover:prose-a:text-cyan-900 prose-strong:text-neutral-950 prose-code:rounded-md prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-800 prose-pre:rounded-2xl prose-pre:border prose-pre:border-neutral-800 prose-pre:bg-neutral-950 prose-img:m-0 prose-img:rounded-2xl prose-img:border prose-img:border-neutral-200 prose-table:block prose-table:overflow-x-auto prose-th:text-neutral-950 prose-td:text-neutral-700 prose-svg:overflow-x-auto">
      <MDXRemote source={content} options={options} />
    </article>
  );
}
