"use client";

import dynamic from 'next/dynamic';

const SignPdfClient = dynamic(
  () => import('./SignPdfClient').then((m) => m.SignPdfClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function SignPdfPageClient({ article }: Props) {
  return (
    <>
      <SignPdfClient article={article} />
      
    </>
  );
}
