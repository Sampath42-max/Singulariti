"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const ImageEditorClient = dynamic(() => import('@/components/tools/image-editor/ImageEditorClient').then(mod => mod.ImageEditorClient), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Image Editor...</div>
});

export function ImageEditorPageClient() {
  return <ImageEditorClient />;
}
