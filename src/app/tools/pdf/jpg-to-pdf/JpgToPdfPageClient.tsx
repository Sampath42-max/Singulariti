"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const JpgToPdfClient = dynamic(
  () => import('./JpgToPdfClient').then((m) => m.JpgToPdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function JpgToPdfPageClient({ article }: Props) {
  return (
    <>
      <JpgToPdfClient />
      <ToolContentBlock utilityId="jpg-to-pdf" article={article} />
    </>
  );
}
