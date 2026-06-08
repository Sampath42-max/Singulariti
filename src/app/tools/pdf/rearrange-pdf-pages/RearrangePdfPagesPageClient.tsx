"use client";

import dynamic from 'next/dynamic';

const RearrangePdfPagesClient = dynamic(
  () => import('./RearrangePdfPagesClient').then((m) => m.RearrangePdfPagesClient),
  { ssr: false }
);

export function RearrangePdfPagesPageClient() {
  return <RearrangePdfPagesClient />;
}
