"use client";

import dynamic from 'next/dynamic';

const MetadataViewerClient = dynamic(
  () => import('./MetadataViewerClient').then((m) => m.MetadataViewerClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function MetadataViewerPageClient({ article }: Props) {
  return (
    <>
      <MetadataViewerClient article={article} />
      
    </>
  );
}
