"use client";

import dynamic from 'next/dynamic';

const MergePdfClient = dynamic(
  () => import('./MergePdfClient').then((m) => m.MergePdfClient),
  { ssr: false }
);

export function MergePdfPageClient() {
  return <MergePdfClient />;
}
