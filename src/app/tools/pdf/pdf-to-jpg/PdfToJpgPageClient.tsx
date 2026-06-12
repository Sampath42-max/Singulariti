"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <PdfToJpgClient />
      <ToolContentBlock utilityId="pdf-to-jpg" article={article} />
    </>
  );
}
