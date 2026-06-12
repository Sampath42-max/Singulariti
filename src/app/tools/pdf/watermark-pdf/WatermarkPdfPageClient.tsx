"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const WatermarkPdfClient = dynamic(
  () => import('./WatermarkPdfClient').then((m) => m.WatermarkPdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function WatermarkPdfPageClient({ article }: Props) {
  return (
    <>
      <WatermarkPdfClient />
      <ToolContentBlock utilityId="watermark-pdf" article={article} />
    </>
  );
}
