"use client";

import dynamic from 'next/dynamic';

const DeletePdfPagesClient = dynamic(
  () => import('./DeletePdfPagesClient').then((m) => m.DeletePdfPagesClient),
  { ssr: false }
);

export function DeletePdfPagesPageClient() {
  return <DeletePdfPagesClient />;
}
