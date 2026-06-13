"use client";

import dynamic from 'next/dynamic';

const JpgToPdfClient = dynamic(
  () => import('./JpgToPdfClient').then((m) => m.JpgToPdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function JpgToPdfPageClient({ article }: Props) {
  return (
    <>
      <JpgToPdfClient article={article} />
      
    </>
  );
}
