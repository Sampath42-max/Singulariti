"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const RearrangePdfPagesClient = dynamic(
  () => import('./RearrangePdfPagesClient').then((m) => m.RearrangePdfPagesClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function RearrangePdfPagesPageClient({ article }: Props) {
  return (
    <>
      <RearrangePdfPagesClient />
      <ToolContentBlock utilityId="rearrange-pdf-pages" article={article} />
    </>
  );
}
