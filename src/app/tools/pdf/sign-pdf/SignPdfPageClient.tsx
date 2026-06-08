"use client";

import dynamic from 'next/dynamic';

const SignPdfClient = dynamic(
  () => import('./SignPdfClient').then((m) => m.SignPdfClient),
  { ssr: false }
);

export function SignPdfPageClient() {
  return <SignPdfClient />;
}
