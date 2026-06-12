"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <MetadataViewerClient />
      <ToolContentBlock utilityId="metadata-viewer" article={article} />
    </>
  );
}
