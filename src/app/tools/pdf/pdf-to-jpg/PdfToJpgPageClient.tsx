"use client";

import dynamic from 'next/dynamic';

const PdfToJpgClient = dynamic(
  () => import('./PdfToJpgClient').then((m) => m.PdfToJpgClient),
  { ssr: false }
);

export function PdfToJpgPageClient() {
  return <PdfToJpgClient />;
}
