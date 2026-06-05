import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogSeriesList, toolRegistry } from '@/content/tools/toolRegistry';
import { SimilarTopicsSidebar } from '@/components/blog/SimilarTopicsSidebar';
import { ArrowLeft, Compass, Layers } from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Utility Guide Series Directory | Singulariti',
  description: 'Explore the complete directory of utility guide series covering formatting, compression, health, math, and code validators.',
  path: '/blog/series',
});

export default function SeriesDirectoryPage() {
  const totalTools = toolRegistry.length;
  
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
            <span className="text-ink font-semibold">Series</span>
          </div>

          {/* Title & Introduction */}
          <header className="max-w-4xl border-b border-border pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[12px] font-sans font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Guide Series Category Index</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-ink tracking-tight">
              Utility Guide Series
            </h1>
            <p className="font-sans text-sm text-slate leading-relaxed">
              Explore the available utility tools grouped by their functional categories. Each series provides targeted sub-sections covering specialized actions such as compression, layout modification, mathematical checks, and format validations.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
            
            {/* Left Sidebar */}
            <aside className="lg:col-span-1">
              <SimilarTopicsSidebar />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="flex justify-between items-center text-xs font-sans text-slate border-b border-border/60 pb-3">
                <span>Total Series: {blogSeriesList.length}</span>
                <span>Total Utilities: {totalTools}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogSeriesList.map((series, idx) => {
                  const count = toolRegistry.filter(t => t.sectionId === series.sectionId).length;
                  
                  // Generate custom header gradient based on index for variety
                  const gradients = [
                    'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/20',
                    'from-emerald-500/20 to-teal-500/20 text-teal-400 border-teal-500/20',
                    'from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/20',
                    'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/20',
                    'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/20',
                    'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/20'
                  ];
                  const gradient = gradients[idx % gradients.length];

                  return (
                    <div 
                      key={series.id} 
                      className="bg-surface border border-border rounded-2xl flex flex-col justify-between overflow-hidden hover:border-primary/60 transition-colors shadow-sm"
                    >
                      {/* Gradient Header Block */}
                      <div className={`h-16 bg-gradient-to-r ${gradient} border-b flex items-center px-6`}>
                        <span className="font-mono text-[10px] font-bold tracking-wider uppercase bg-white/80 px-2 py-0.5 rounded text-ink">
                          Series {idx + 1}
                        </span>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-display font-bold text-base text-ink">
                            {series.name} Guides
                          </h3>
                          <p className="text-xs text-slate leading-relaxed line-clamp-3">
                            {series.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border/40 flex justify-between items-center text-[11px] text-slate font-sans">
                          <span className="font-semibold">{count} Utilities Included</span>
                          <Link 
                            href={`/blog/series/${series.slug}`}
                            className="inline-flex items-center gap-1 py-2 px-4 bg-primary hover:bg-primary/95 text-white rounded-xl font-sans font-semibold transition-all shadow-xs"
                          >
                            View Guide Series
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Back Action Link */}
          <div className="pt-4 border-t border-border/60">
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
