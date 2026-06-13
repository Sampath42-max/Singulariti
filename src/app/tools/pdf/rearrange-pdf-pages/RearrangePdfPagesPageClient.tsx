"use client";

import dynamic from 'next/dynamic';

const RearrangePdfPagesClient = dynamic(
  () => import('./RearrangePdfPagesClient').then((m) => m.RearrangePdfPagesClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function RearrangePdfPagesPageClient({ article }: Props) {
  return (
    <>
      <RearrangePdfPagesClient article={article} />
      
    </>
  );
}
