"use client";

import dynamic from 'next/dynamic';

const MergePdfClient = dynamic(
  () => import('./MergePdfClient').then((m) => m.MergePdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function MergePdfPageClient({ article }: Props) {
  return (
    <>
      <MergePdfClient article={article} />
      
    </>
  );
}
