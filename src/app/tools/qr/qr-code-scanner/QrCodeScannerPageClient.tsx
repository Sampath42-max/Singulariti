"use client";

import dynamic from 'next/dynamic';

const QrCodeScannerClient = dynamic(
  () => import('./QrCodeScannerClient').then((m) => m.QrCodeScannerClient),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function QrCodeScannerPageClient({ article }: Props) {
  return <QrCodeScannerClient article={article} />;
}
