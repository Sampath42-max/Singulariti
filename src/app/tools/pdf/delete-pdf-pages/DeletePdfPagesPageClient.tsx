"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <DeletePdfPagesClient />
      <ToolContentBlock utilityId="delete-pdf-pages" article={article} />
    </>
  );
}
