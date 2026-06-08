"use client";

import dynamic from 'next/dynamic';

const ExtractPdfPagesClient = dynamic(
  () => import('./ExtractPdfPagesClient').then((m) => m.ExtractPdfPagesClient),
  { ssr: false }
);

export function ExtractPdfPagesPageClient() {
  return <ExtractPdfPagesClient />;
}
