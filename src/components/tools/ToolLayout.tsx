"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

interface ToolLayoutProps {
  title: string;
  description: string;
  categoryName: string;
  categoryHref: string;
  error?: string | null;
  warning?: string | null;
  privacyLabel?: string;
  onClearError?: () => void;
  children: React.ReactNode;
}

export function ToolLayout({
  title,
  description,
  categoryName,
  categoryHref,
  error,
  warning,
  privacyLabel,
  onClearError,
  children
}: ToolLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 pt-24">
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 max-w-7xl mb-8">
          <nav className="flex text-[13px] font-sans text-slate">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={categoryHref} className="hover:text-ink transition-colors">{categoryName}</Link>
            <span className="mx-2">/</span>
            <span className="text-ink font-medium">{title}</span>
          </nav>
        </div>

        {/* Tool Header */}
        <section className="container mx-auto px-4 md:px-6 max-w-3xl text-center mb-10">
          <h1 className="font-display font-bold text-3xl md:text-5xl text-ink mb-4 leading-tight">
            {title}
          </h1>
          <p className="font-sans text-base md:text-lg text-slate max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </section>

        {/* Privacy Lock Banner */}
        <section className="container mx-auto px-4 md:px-6 max-w-5xl mb-8">
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4 text-primary max-w-3xl mx-auto">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <p className="text-[13px] font-sans font-medium leading-relaxed">
              {privacyLabel || (() => {
                const cat = (categoryName || '').toLowerCase();
                if (cat.includes('pdf')) {
                  return "PDFs are processed only for the selected action. No files are uploaded to our server.";
                }
                if (cat.includes('image') || cat.includes('editing')) {
                  return "Images are processed locally in your browser. Nothing is uploaded to any server.";
                }
                if (cat.includes('text')) {
                  return "Text is processed temporarily and not stored. No files are uploaded to our server.";
                }
                return "Your files are processed locally in your browser. Nothing is uploaded to any server.";
              })()}
            </p>
          </div>
        </section>

        {/* Warnings and Errors */}
        <section className="container mx-auto px-4 md:px-6 max-w-5xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-start gap-3 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Error occurred</p>
                <p className="text-[13px] mt-0.5 opacity-90">{error}</p>
              </div>
              {onClearError && (
                <button 
                  onClick={onClearError}
                  className="text-[11px] font-medium uppercase tracking-wider bg-red-500/20 hover:bg-red-500/30 px-2.5 py-1 rounded transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}

          {warning && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-sm rounded-xl flex items-start gap-3 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Warning</p>
                <p className="text-[13px] mt-0.5 opacity-90">{warning}</p>
              </div>
            </div>
          )}
        </section>

        {/* Core Tool Interface Workspace */}
        <section className="container mx-auto px-4 md:px-6 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            {children}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
