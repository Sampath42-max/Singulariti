"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const ProtectPdfClient = dynamic(
  () => import('./ProtectPdfClient').then((m) => m.ProtectPdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function ProtectPdfPageClient({ article }: Props) {
  return (
    <>
      <ProtectPdfClient />
      <ToolContentBlock utilityId="protect-pdf" article={article} />
    </>
  );
}
