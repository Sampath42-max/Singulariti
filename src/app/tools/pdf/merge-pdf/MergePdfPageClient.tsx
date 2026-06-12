"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const MergePdfClient = dynamic(
  () => import('./MergePdfClient').then((m) => m.MergePdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function MergePdfPageClient({ article }: Props) {
  return (
    <>
      <MergePdfClient />
      <ToolContentBlock utilityId="merge-pdf" article={article} />
    </>
  );
}
