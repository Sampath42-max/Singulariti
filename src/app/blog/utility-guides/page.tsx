import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { sectionRegistry, subSectionRegistry, toolRegistry } from '@/content/tools/toolRegistry';
import { FolderKanban, ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Utility Guides Directory — Index Archive | Singulariti',
  description: 'Browse the complete directory index of utility guides. Discover sections and subsections covering formatting, compression, health, and math calculators.',
  alternates: {
    canonical: 'https://singulariti.in/blog/utility-guides'
  }
};

export default function UtilityGuidesDirectoryLanding() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-sans text-slate">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Utility Directory</span>
          </div>

          {/* Title & Introduction */}
          <header className="max-w-4xl border-b border-border pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[12px] font-sans font-semibold">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Full Archive Index</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-ink tracking-tight">
              Utility Guides Index
            </h1>
            <p className="font-sans text-sm text-slate leading-relaxed">
              This directory lists guides for each utility available on the website. Each guide explains what the utility does, how the operation works, what input is required, what output is produced, and where the utility can be opened. Use the category hierarchy below to discover grouped tools.
            </p>
          </header>

          {/* Main Directory List */}
          <section className="space-y-10 max-w-5xl">
            {sectionRegistry.map((section) => {
              const subs = subSectionRegistry.filter(ss => ss.sectionId === section.id);
              const totalCount = toolRegistry.filter(t => t.sectionId === section.id).length;

              return (
                <div 
                  key={section.id} 
                  className="bg-surface border border-border p-6 md:p-8 rounded-3xl space-y-6 shadow-xs hover:border-primary/20 transition-all"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                    <div className="space-y-1">
                      <h2 className="font-display font-bold text-xl text-ink">
                        {section.name}
                      </h2>
                      <p className="text-[11px] text-slate font-sans max-w-xl">{section.description}</p>
                    </div>
                    <Link 
                      href={`/blog/series/${section.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline flex-shrink-0"
                    >
                      Explore Section <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Sub-sections links grid */}
                  {subs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subs.map((sub) => {
                        const count = toolRegistry.filter(t => t.subSectionId === sub.id).length;
                        return (
                          <Link 
                            key={sub.id}
                            href={`/blog/series/${section.slug}/${sub.slug}`}
                            className="bg-background border border-border/80 hover:border-primary/60 hover:bg-primary/[0.02] p-4 rounded-xl flex items-center justify-between group transition-all"
                          >
                            <div className="space-y-1">
                              <span className="font-sans font-bold text-xs text-ink group-hover:text-primary transition-colors block">
                                {sub.name}
                              </span>
                              <span className="text-[10px] text-slate block">{sub.description}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate bg-border/40 px-2 py-0.5 rounded-md flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-all ml-4">
                              {count} tools
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate">No subcategories defined for this section.</p>
                  )}
                </div>
              );
            })}
          </section>

          {/* Navigation Back */}
          <div className="pt-4">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-slate hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog Home
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
