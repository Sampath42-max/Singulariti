"use client";

import dynamic from 'next/dynamic';

const ExtractPdfPagesClient = dynamic(
  () => import('./ExtractPdfPagesClient').then((m) => m.ExtractPdfPagesClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function ExtractPdfPagesPageClient({ article }: Props) {
  return (
    <>
      <ExtractPdfPagesClient article={article} />
      
    </>
  );
}
