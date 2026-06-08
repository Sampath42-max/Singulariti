"use client";

import dynamic from 'next/dynamic';

const MetadataViewerClient = dynamic(
  () => import('./MetadataViewerClient').then((m) => m.MetadataViewerClient),
  { ssr: false }
);

export function MetadataViewerPageClient() {
  return <MetadataViewerClient />;
}
