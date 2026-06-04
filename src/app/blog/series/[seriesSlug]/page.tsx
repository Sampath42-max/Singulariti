"use client";

import React, { use, useState, Suspense } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  sectionRegistry, 
  subSectionRegistry, 
  toolRegistry,
  blogSeriesList,
  blogSubSeriesList,
  blogGuidesList
} from '@/content/tools/toolRegistry';
import { getPostBySlug } from '@/lib/blog';
import { SimilarTopicsSidebar } from '@/components/blog/SimilarTopicsSidebar';
import { 
  ArrowLeft, 
  Layers, 
  Sparkles, 
  Play, 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

interface PageProps {
  params: Promise<{ seriesSlug: string }>;
}

// Map sectionSlug to guide slug inside blog.ts
function getPostGuideSlug(sectionSlug: string): string {
  const slug = sectionSlug.toLowerCase();
  if (slug === 'developer-utilities') return 'developer-tools-guide';
  if (slug === 'calculator-utilities') return 'calculator-tools-guide';
  if (slug === 'image-editing-utilities') return 'image-tools-guide';
  if (slug === 'unit-conversion-utilities') return 'productivity-tools-guide';
  return slug.replace('-utilities', '-tools-guide');
}

function SeriesDetailsContent({ params }: PageProps) {
  const { seriesSlug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Find series info
  const series = blogSeriesList.find(s => s.slug === seriesSlug);
  if (!series) {
    notFound();
  }

  // Load enriched content from blog.ts category guides
  const guideSlug = getPostGuideSlug(seriesSlug);
  const postGuide = getPostBySlug(guideSlug);

  // Retrieve sub-sections inside this section
  const subSections = blogSubSeriesList.filter(ss => ss.seriesId === series.sectionId);

  // Retrieve all guides belonging strictly to this series
  const allGuides = blogGuidesList.filter(g => g.seriesId === series.sectionId);
  const totalCount = allGuides.length;

  // Tabs for Recent / Featured Guides
  const [activeTab, setActiveTab] = useState<'recent' | 'featured'>('recent');

  const displayedGuides = activeTab === 'featured' 
    ? allGuides.filter(g => g.featured) 
    : allGuides;

  // Pagination Logic
  const currentPage = parseInt(searchParams?.get('page') || '1', 10);
  const pageSize = 12;
  const totalPages = Math.ceil(displayedGuides.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedGuides = displayedGuides.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/blog/series/${seriesSlug}?page=${page}`);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-12">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-sans text-slate">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span>/</span>
        <Link href="/blog/series" className="hover:text-primary transition-colors">Series</Link>
        <span>/</span>
        <span className="text-ink font-semibold">{series.name}</span>
      </div>

      {/* Series Banner */}
      <section className="bg-surface border border-border p-8 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-20 -translate-y-20" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[12px] font-sans font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Guide Series Overview</span>
        </div>
        
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display font-bold text-3xl md:text-5xl text-ink tracking-tight">
            {series.name} Guides
          </h1>
          <p className="font-sans text-sm md:text-base text-slate leading-relaxed">
            {series.heroDescription}
          </p>
        </div>

        <div className="flex gap-6 text-xs font-sans text-slate pt-2 border-t border-border/40 max-w-lg">
          <div>
            Utilities Included: <strong className="text-ink">{totalCount}</strong>
          </div>
          <div className="border-r border-border/80 h-4" />
          <div>
            Sub-sections: <strong className="text-ink">{subSections.length}</strong>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <SimilarTopicsSidebar currentSeriesId={series.sectionId} />
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          
          {postGuide && postGuide.sections.whatThisToolDoes && (
            <section className="bg-surface border border-border p-6 rounded-2xl space-y-2.5 shadow-xs">
              <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider">Functional Context & Purpose</h3>
              <p className="text-xs text-slate leading-relaxed">{postGuide.sections.whatThisToolDoes}</p>
            </section>
          )}

          {/* Sub-Section Cards */}
          <section className="space-y-6">
            <h2 className="font-display font-bold text-lg text-ink tracking-tight flex items-center gap-2 border-b border-border/60 pb-3">
              <Layers className="w-4 h-4 text-primary" /> Sub-sections inside {series.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subSections.map((sub) => {
                return (
                  <div 
                    key={sub.id} 
                    className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-primary/60 transition-colors shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-ink">
                          {sub.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate bg-border/40 px-2.5 py-1 rounded-full font-semibold">
                          {sub.utilityCount} utilities
                        </span>
                      </div>
                      <p className="text-xs text-slate leading-relaxed">
                        {sub.description}
                      </p>
                    </div>
                    <div className="pt-6">
                      <Link 
                        href={`/blog/series/${seriesSlug}/${sub.slug}`}
                        className="inline-flex w-full items-center justify-center py-2.5 bg-background border border-border hover:border-primary/60 hover:bg-primary/5 text-ink hover:text-primary rounded-xl font-sans font-semibold text-xs transition-all"
                      >
                        View Sub-Section
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Complete Guides List with Tabs */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-4">
              <h2 className="font-display font-bold text-lg text-ink tracking-tight flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Guide Articles
              </h2>
              
              <div className="flex gap-2 bg-surface p-1 rounded-xl border border-border text-xs font-sans">
                <button
                  onClick={() => {
                    setActiveTab('recent');
                    handlePageChange(1);
                  }}
                  className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'recent'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate hover:text-primary'
                  }`}
                >
                  Recent Guides
                </button>
                <button
                  onClick={() => {
                    setActiveTab('featured');
                    handlePageChange(1);
                  }}
                  className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'featured'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate hover:text-primary'
                  }`}
                >
                  Featured Guides
                </button>
              </div>
            </div>

            {paginatedGuides.length > 0 ? (
              <div className="space-y-6">
                {paginatedGuides.map((guide) => {
                  const tool = toolRegistry.find(t => t.id === guide.utilityId);
                  const sub = subSectionRegistry.find(s => s.id === guide.subSeriesId);
                  return (
                    <article 
                      key={guide.id} 
                      className="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-primary/45 transition-colors shadow-sm items-stretch"
                    >
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2 text-[10px] font-sans font-semibold">
                            <span className="text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              {series.name}
                            </span>
                            {sub && (
                              <span className="text-slate bg-border/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                {sub.name}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="font-display font-bold text-lg text-ink hover:text-primary leading-tight transition-colors">
                            <Link href={`/blog/guides/${guide.slug}`}>{guide.title}</Link>
                          </h3>
                          
                          <p className="text-xs text-slate leading-relaxed">
                            {guide.metaDescription}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-border/40 text-xs font-sans text-slate">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            Updated: {guide.updatedAt || '2026-06-04'}
                          </span>
                          
                          <div className="flex gap-2">
                            {tool && (
                              <Link 
                                href={tool.utilityUrl}
                                className="px-3.5 py-1.5 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1"
                              >
                                <Play className="w-2.5 h-2.5 fill-white" /> Use Utility
                              </Link>
                            )}
                            <Link 
                              href={`/blog/guides/${guide.slug}`}
                              className="px-3.5 py-1.5 bg-background border border-border hover:border-primary hover:text-primary text-ink font-semibold rounded-lg text-[11px] transition-all"
                            >
                              Read Guide
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-surface/50 border border-border border-dashed rounded-2xl">
                <p className="font-sans text-slate text-xs">No guides listed in this section.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 font-sans text-xs">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-border hover:border-primary rounded-xl text-slate hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-slate transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-xl font-bold transition-all border ${
                      currentPage === page
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-surface border-border text-slate hover:border-slate/60 hover:text-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-border hover:border-primary rounded-xl text-slate hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-slate transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>

        </div>

      </div>

      {/* Bottom Back Actions */}
      <div className="pt-4 border-t border-border/60">
        <Link 
          href="/blog/series" 
          className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-slate hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Series
        </Link>
      </div>

    </div>
  );
}

export default function SeriesDetailsPage(props: PageProps) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <Suspense fallback={
          <div className="container mx-auto px-4 max-w-7xl text-center py-20 font-sans text-slate">
            Loading series guides...
          </div>
        }>
          <SeriesDetailsContent {...props} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
