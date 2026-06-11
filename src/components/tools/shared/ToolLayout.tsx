"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronDown, ChevronUp, ArrowLeft, ShieldCheck } from 'lucide-react';
import { SeoSchema } from './SeoSchema';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';

interface FaqItem {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  utilityId?: string;
  title: string;
  description: string;
  categoryName: string;
  categoryPath: string;
  howToUse: string[];
  faqs: FaqItem[];
  privacyLabel?: string;
  children: React.ReactNode;
  relatedTools?: { name: string; url: string; description: string }[];
  article?: string;
}

export function ToolLayout({
  utilityId,
  title,
  description,
  categoryName,
  categoryPath,
  howToUse,
  faqs,
  privacyLabel,
  children,
  relatedTools,
  article
}: ToolLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const seo = utilityId ? getUtilitySEO(utilityId) : undefined;

  return (
    <>
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
      <main className="flex-1 w-full flex flex-col items-center pt-20 pb-12 bg-background">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 max-w-6xl mb-6">
          <nav className="flex items-center text-[13px] font-sans text-slate">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
            <span className="mx-2">/</span>
            <Link href={categoryPath} className="hover:text-primary transition-colors">{categoryName}</Link>
            <span className="mx-2">/</span>
            <span className="text-ink font-medium">{title}</span>
          </nav>
        </div>

        {/* Hero Area */}
        <section className="container mx-auto px-4 max-w-3xl text-center mb-6">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3 tracking-tight">
            {title}
          </h1>
          <p className="font-sans text-base text-slate leading-relaxed">
            {description}
          </p>
        </section>

        {/* Privacy Lock Banner */}
        <section className="container mx-auto px-4 max-w-6xl mb-6 w-full">
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl p-3 text-primary max-w-3xl mx-auto">
            <ShieldCheck className="w-4.5 h-4.5 flex-shrink-0" />
            <p className="text-[12px] font-sans font-medium leading-relaxed">
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
                return "Your inputs are processed locally in your browser. Nothing is uploaded to any server.";
              })()}
            </p>
          </div>
        </section>

        {/* Active Tool Area */}
        <section className="container mx-auto px-4 max-w-6xl mb-12 w-full">
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            {children}
          </div>
        </section>

        {/* Details & FAQ Area */}
        <section className="container mx-auto px-4 max-w-4xl mt-6 space-y-12">
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
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-[15px] text-ink hover:text-primary transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-slate flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate flex-shrink-0" />
                      )}
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
        {/* Article / Educational Content */}
        {article && (
          <section className="container mx-auto px-4 max-w-4xl mt-6 mb-8">
            <div className="bg-surface/50 border border-border/60 rounded-2xl p-6 md:p-8">
              <h2 className="font-display font-bold text-xl text-ink mb-6">About This Tool</h2>
              <div className="font-sans text-sm text-slate leading-relaxed space-y-4 whitespace-pre-wrap">{article}</div>
            </div>
          </section>
        )}
        {/* Related Tools Cross-linking */}
        {relatedTools && relatedTools.length > 0 && (
          <section className="container mx-auto px-4 max-w-6xl mt-12 mb-6 w-full">
            <h2 className="font-display font-bold text-2xl text-ink mb-6 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((tool, i) => (
                <Link key={i} href={tool.url} className="group block bg-surface border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-sm transition-all duration-300">
                  <h3 className="font-display font-bold text-[17px] text-ink group-hover:text-primary transition-colors mb-2">{tool.name}</h3>
                  <p className="font-sans text-[14px] text-slate leading-relaxed">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
