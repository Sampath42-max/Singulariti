"use client";

import dynamic from 'next/dynamic';

const RotatePdfClient = dynamic(
  () => import('./RotatePdfClient').then((m) => m.RotatePdfClient),
  { ssr: false }
);

export function RotatePdfPageClient() {
  return <RotatePdfClient />;
}
