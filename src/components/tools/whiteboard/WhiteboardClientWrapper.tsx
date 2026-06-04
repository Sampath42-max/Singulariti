"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const OnlineWhiteboardClient = dynamic(
  () => import('./OnlineWhiteboardClient'),
  { ssr: false }
);

export default function WhiteboardClientWrapper() {
  return <OnlineWhiteboardClient />;
}
