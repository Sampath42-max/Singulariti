"use client";

import dynamic from 'next/dynamic';

const PageCounterClient = dynamic(
  () => import('./PageCounterClient').then((m) => m.PageCounterClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function PageCounterPageClient({ article }: Props) {
  return (
    <>
      <PageCounterClient article={article} />
      
    </>
  );
}
