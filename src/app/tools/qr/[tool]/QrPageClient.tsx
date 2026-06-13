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
  toolId,
  toolName,
  toolDescription,
  toolSeoTitle,
  toolSeoDescription,
  article
}: {
  initialType: QRType;
  isStandalone: boolean;
  toolId: string;
  toolName: string;
  toolDescription: string;
  toolSeoTitle?: string;
  toolSeoDescription?: string;
  article?: string;
}) {
  return (
    <>
      <QrCodeGeneratorClient 
        initialType={initialType} 
        isStandalone={isStandalone}
        toolName={toolName}
        toolDescription={toolDescription}
        toolSeoTitle={toolSeoTitle}
        toolSeoDescription={toolSeoDescription}
      />
      
    </>
  );
}
