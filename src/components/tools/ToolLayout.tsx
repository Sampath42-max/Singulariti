"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { SeoSchema } from './shared/SeoSchema';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';
import { RelatedTools } from '../layout/RelatedTools';

interface ToolLayoutProps {
  utilityId?: string;
  title: string;
  description: string;
  categoryName: string;
  categoryHref: string;
  error?: string | null;
  warning?: string | null;
  privacyLabel?: string;
  onClearError?: () => void;
  children: React.ReactNode;
  howToUse?: string[];
  faqs?: { question: string; answer: string }[];
  relatedTools?: { name: string; url: string; description: string }[];
  article?: string;
}

export function ToolLayout({
  utilityId,
  title,
  description,
  categoryName,
  categoryHref,
  error,
  warning,
  privacyLabel,
  onClearError,
  children,
  howToUse,
  faqs,
  relatedTools,
  article
}: ToolLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


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

  const seo = utilityId ? getUtilitySEO(utilityId) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {seo && (
        <SeoSchema
          name={seo.name}
          description={seo.description}
          section={seo.section}
          canonical={seo.canonical}
        />
      )}
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}}
        />
      )}
      {howToUse && howToUse.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to use ${title}`,
            "description": description,
            "step": howToUse.map((step, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "text": step
            }))
          })}}
        />
      )}
      <Header />
      
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 max-w-7xl mb-8">
          <nav aria-label="Breadcrumb" className="flex text-[13px] font-sans text-slate">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">Home</Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="mx-2 text-border">/</span>
                <Link href={categoryHref} className="hover:text-ink transition-colors">{categoryName}</Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="mx-2 text-border">/</span>
                <span className="text-ink font-medium" aria-current="page">{title}</span>
              </li>
            </ol>
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
                  return "This tool may temporarily send files to a secure backend for processing, then deletes them immediately after processing.";
                }
                if (cat.includes('image') || cat.includes('editing')) {
                  return "Images are processed locally in your browser. Nothing is uploaded to any server.";
                }
                if (cat.includes('text')) {
                  return "Text is processed locally and not stored. Nothing is uploaded to any server.";
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

        {/* Details & FAQ Area */}
        <section className="container mx-auto px-4 md:px-6 max-w-4xl mt-12 space-y-12">
          {/* Article / Comprehensive Content */}
          {article && (
            <div className="bg-surface/50 border border-border/60 rounded-2xl p-6 md:p-8 prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-sans prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article}
              </ReactMarkdown>
            </div>
          )}

          {/* How to Use */}
          {howToUse && howToUse.length > 0 && (
            <div className="bg-surface/50 border border-border/60 rounded-2xl p-6 md:p-8">
              <h2 className="font-display font-bold text-xl text-ink mb-6">How to Use</h2>
              <ol className="space-y-4">
                {howToUse.map((step, i) => (
                  <li key={i} className="flex gap-4 font-sans text-sm text-slate">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* FAQs */}
          {faqs && faqs.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-ink mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-border bg-surface rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-[15px] text-ink hover:text-primary transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <span className="text-slate flex-shrink-0 text-xl font-light">
                        {openFaq === i ? '-' : '+'}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 pt-0 text-sm font-sans text-slate leading-relaxed border-t border-border/50 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Related Tools Cross-linking */}
        {utilityId && <RelatedTools currentToolId={utilityId} />}
      </main>

      <Footer />
    </div>
  );
}
