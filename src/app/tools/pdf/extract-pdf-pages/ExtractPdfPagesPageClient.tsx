"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <ExtractPdfPagesClient />
      <ToolContentBlock utilityId="extract-pdf-pages" article={article} />
    </>
  );
}
