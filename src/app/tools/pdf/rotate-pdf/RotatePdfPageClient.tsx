"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const RotatePdfClient = dynamic(
  () => import('./RotatePdfClient').then((m) => m.RotatePdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function RotatePdfPageClient({ article }: Props) {
  return (
    <>
      <RotatePdfClient />
      <ToolContentBlock utilityId="rotate-pdf" article={article} />
    </>
  );
}
