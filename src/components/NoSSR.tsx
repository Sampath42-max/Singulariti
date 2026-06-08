"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});

export default NoSSR;
