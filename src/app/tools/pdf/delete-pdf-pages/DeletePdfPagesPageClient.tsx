"use client";

import dynamic from 'next/dynamic';

const DeletePdfPagesClient = dynamic(
  () => import('./DeletePdfPagesClient').then((m) => m.DeletePdfPagesClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function DeletePdfPagesPageClient({ article }: Props) {
  return (
    <>
      <DeletePdfPagesClient article={article} />
      
    </>
  );
}
