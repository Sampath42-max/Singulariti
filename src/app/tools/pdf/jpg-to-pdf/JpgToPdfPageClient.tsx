"use client";

import dynamic from 'next/dynamic';

const JpgToPdfClient = dynamic(
  () => import('./JpgToPdfClient').then((m) => m.JpgToPdfClient),
  { ssr: false }
);

export function JpgToPdfPageClient() {
  return <JpgToPdfClient />;
}
