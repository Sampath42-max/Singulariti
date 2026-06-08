"use client";

import dynamic from 'next/dynamic';

const SplitPdfClient = dynamic(
  () => import('./SplitPdfClient').then((m) => m.SplitPdfClient),
  { ssr: false }
);

export function SplitPdfPageClient() {
  return <SplitPdfClient />;
}
