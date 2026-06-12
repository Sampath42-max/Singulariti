"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

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
      <SignPdfClient />
      <ToolContentBlock utilityId="sign-pdf" article={article} />
    </>
  );
}
