"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const WhiteboardClientWrapper = dynamic(() => import('@/components/tools/whiteboard/WhiteboardClientWrapper'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Whiteboard...</div>
});

export function WhiteboardPageClient() {
  return <WhiteboardClientWrapper />;
}
