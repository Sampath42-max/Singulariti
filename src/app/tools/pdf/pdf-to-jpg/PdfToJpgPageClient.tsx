"use client";

import dynamic from 'next/dynamic';

const PdfToJpgClient = dynamic(
  () => import('./PdfToJpgClient').then((m) => m.PdfToJpgClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function PdfToJpgPageClient({ article }: Props) {
  return (
    <>
      <PdfToJpgClient article={article} />
      
    </>
  );
}
