"use client";

import dynamic from 'next/dynamic';

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
      <WatermarkPdfClient article={article} />
      
    </>
  );
}
