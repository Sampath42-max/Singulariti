"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { QRType } from '@/lib/qr/qrHelpers';

const QrCodeGeneratorClient = dynamic(() => import('../qr-code-generator/QrCodeGeneratorClient').then(mod => mod.QrCodeGeneratorClient), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading QR Generator...</div>
});

export function QrPageClient({
  initialType,
  isStandalone,
  toolName,
  toolDescription,
  toolSeoTitle,
  toolSeoDescription
}: {
  initialType: QRType;
  isStandalone: boolean;
  toolName: string;
  toolDescription: string;
  toolSeoTitle?: string;
  toolSeoDescription?: string;
}) {
  return (
    <QrCodeGeneratorClient 
      initialType={initialType} 
      isStandalone={isStandalone}
      toolName={toolName}
      toolDescription={toolDescription}
      toolSeoTitle={toolSeoTitle}
      toolSeoDescription={toolSeoDescription}
    />
  );
}
