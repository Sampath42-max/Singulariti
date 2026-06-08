"use client";

import dynamic from 'next/dynamic';

const QrCodeScannerClient = dynamic(
  () => import('./QrCodeScannerClient').then((m) => m.QrCodeScannerClient),
  { ssr: false }
);

export function QrCodeScannerPageClient() {
  return <QrCodeScannerClient />;
}
