"use client";

import dynamic from 'next/dynamic';

const PageCounterClient = dynamic(
  () => import('./PageCounterClient').then((m) => m.PageCounterClient),
  { ssr: false }
);

export function PageCounterPageClient() {
  return <PageCounterClient />;
}
