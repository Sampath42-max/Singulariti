"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const PageCounterClient = dynamic(
  () => import('./PageCounterClient').then((m) => m.PageCounterClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function PageCounterPageClient({ article }: Props) {
  return (
    <>
      <PageCounterClient />
      <ToolContentBlock utilityId="page-counter" article={article} />
    </>
  );
}
