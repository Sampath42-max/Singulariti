import React from 'react';
import { WebCompilerClient } from '@/components/tools/dev/WebCompilerClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';

const seo = getUtilitySEO('web-compiler');

export const metadata = buildMetadata({
  title: seo?.seoTitle || 'HTML/CSS/JS Web Compiler | Singulariti',
  description: seo?.seoDescription || 'Write HTML, CSS, and JavaScript and see the results instantly in your browser.',
  canonical: `https://singulariti.in/tools/dev/web-compiler`,
});

export default function WebCompilerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <WebCompilerClient />
      </main>
      <Footer />
    </div>
  );
}
