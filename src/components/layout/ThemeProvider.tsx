"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress the React 19 script tag warning and Monaco cancellation rejections in development mode
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    orig.apply(console, args);
  };

  // Suppress Monaco's manual cancellation rejections to prevent terminal noise
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (reason && (reason.type === 'cancelation' || reason.msg === 'operation is manually canceled' || reason.message === 'operation is manually canceled')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, { capture: true });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
