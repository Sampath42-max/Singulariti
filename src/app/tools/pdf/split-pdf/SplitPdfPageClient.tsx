"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <SplitPdfClient />
      <ToolContentBlock utilityId="split-pdf" article={article} />
    </>
  );
}
