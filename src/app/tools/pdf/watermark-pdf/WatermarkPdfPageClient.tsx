"use client";

import dynamic from 'next/dynamic';

const WatermarkPdfClient = dynamic(
  () => import('./WatermarkPdfClient').then((m) => m.WatermarkPdfClient),
  { ssr: false }
);

export function WatermarkPdfPageClient() {
  return <WatermarkPdfClient />;
}
