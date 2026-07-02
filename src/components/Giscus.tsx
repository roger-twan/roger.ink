'use client';

import Giscus from '@giscus/react';

export default function GiscusComment() {
  return (
    <Giscus
      id="comments"
      repo="roger-twan/journal-comments"
      repoId="R_kgDOPYYXeg"
      category="General"
      categoryId="DIC_kwDOPYYXes4CtyLi"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
