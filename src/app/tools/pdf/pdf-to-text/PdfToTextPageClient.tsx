"use client";

import dynamic from 'next/dynamic';

const PdfToTextClient = dynamic(
  () => import('./PdfToTextClient').then((m) => m.PdfToTextClient),
  { ssr: false }
);

export function PdfToTextPageClient() {
  return <PdfToTextClient />;
}
