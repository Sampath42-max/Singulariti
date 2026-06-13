"use client";

import dynamic from 'next/dynamic';

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
      <ProtectPdfClient article={article} />
      
    </>
  );
}
