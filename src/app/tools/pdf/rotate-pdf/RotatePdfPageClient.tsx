"use client";

import dynamic from 'next/dynamic';

const RotatePdfClient = dynamic(
  () => import('./RotatePdfClient').then((m) => m.RotatePdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function RotatePdfPageClient({ article }: Props) {
  return (
    <>
      <RotatePdfClient article={article} />
      
    </>
  );
}
