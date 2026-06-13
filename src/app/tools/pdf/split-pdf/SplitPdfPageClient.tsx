"use client";

import dynamic from 'next/dynamic';

const SplitPdfClient = dynamic(
  () => import('./SplitPdfClient').then((m) => m.SplitPdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function SplitPdfPageClient({ article }: Props) {
  return (
    <>
      <SplitPdfClient article={article} />
      
    </>
  );
}
