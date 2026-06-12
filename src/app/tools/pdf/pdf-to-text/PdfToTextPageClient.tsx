"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <PdfToTextClient />
      <ToolContentBlock utilityId="pdf-to-text" article={article} />
    </>
  );
}
