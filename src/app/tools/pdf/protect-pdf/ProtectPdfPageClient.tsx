"use client";

import dynamic from 'next/dynamic';

const ProtectPdfClient = dynamic(
  () => import('./ProtectPdfClient').then((m) => m.ProtectPdfClient),
  { ssr: false }
);

export function ProtectPdfPageClient() {
  return <ProtectPdfClient />;
}
