"use client";

import dynamic from 'next/dynamic';

const CompressPdfClient = dynamic(
  () => import('./CompressPdfClient').then((m) => m.CompressPdfClient),
  { ssr: false }
);

export function CompressPdfPageClient() {
  return <CompressPdfClient />;
}
