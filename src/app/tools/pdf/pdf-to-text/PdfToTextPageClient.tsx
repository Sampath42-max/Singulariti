"use client";

import dynamic from 'next/dynamic';

const PdfToTextClient = dynamic(
  () => import('./PdfToTextClient').then((m) => m.PdfToTextClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function PdfToTextPageClient({ article }: Props) {
  return (
    <>
      <PdfToTextClient article={article} />
      
    </>
  );
}
