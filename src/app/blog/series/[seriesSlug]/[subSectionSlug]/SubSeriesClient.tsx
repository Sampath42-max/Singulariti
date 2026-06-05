"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { 
  blogSeriesList,
  blogSubSeriesList,
  blogGuidesList,
  toolRegistry,
  subSectionRegistry
} from '@/content/tools/toolRegistry';
import { SimilarTopicsSidebar } from '@/components/blog/SimilarTopicsSidebar';
import { 
  ArrowLeft, 
  Play, 
  ArrowRight, 
  Layers, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

interface PageProps {
  params: Promise<{ seriesSlug: string; subSectionSlug: string }>;
}

export function SubSeriesContent({ params }: PageProps) {
  const { seriesSlug, subSectionSlug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Find series info
  const series = blogSeriesList.find(s => s.slug === seriesSlug);
  if (!series) {
    notFound();
  }

  // Find sub-series info
  const subSection = blogSubSeriesList.find(
    ss => ss.slug === subSectionSlug && ss.seriesId === series.sectionId
  );
  if (!subSection) {
    notFound();
  }

  // Filter guides belonging strictly to this sub-section
  const guides = blogGuidesList.filter(g => g.subSeriesId === subSection.id);

  // Pagination Logic
  const currentPage = parseInt(searchParams?.get('page') || '1', 10);
  const pageSize = 12;
  const totalPages = Math.ceil(guides.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedGuides = guides.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/blog/series/${seriesSlug}/${subSectionSlug}?page=${page}`);
    }
  };

  // Get other subsections of the same section for the sidebar layout
  const siblingSubsections = blogSubSeriesList.filter(
    ss => ss.seriesId === series.sectionId && ss.id !== subSection.id
  );

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
        <Link href={`/blog/series/${seriesSlug}`} className="hover:text-primary transition-colors">{series.name}</Link>
        <span>/</span>
        <span className="text-ink font-semibold">{subSection.name}</span>
      </div>

      {/* Header Title */}
      <header className="max-w-4xl border-b border-border pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[12px] font-sans font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Sub-Series Guide List</span>
        </div>
        <h1 className="font-display font-bold text-3xl md:text-5xl text-ink tracking-tight">
          {subSection.name}
        </h1>
        <p className="font-sans text-sm text-slate leading-relaxed">
          {subSection.description}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <SimilarTopicsSidebar currentSeriesId={series.sectionId} />
          
          {/* Sibling Subsections Widget */}
          {siblingSubsections.length > 0 && (
            <div className="bg-surface border border-border p-5 rounded-2xl space-y-3.5 shadow-sm">
              <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider border-b border-border pb-2.5">
                Other {series.name} Groups
              </h3>
              <ul className="space-y-2 text-xs font-sans">
                {siblingSubsections.map(sib => (
                  <li key={sib.id}>
                    <Link 
                      href={`/blog/series/${seriesSlug}/${sib.slug}`}
                      className="text-slate hover:text-primary font-semibold hover:underline block truncate"
                    >
                      {sib.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex justify-between items-center text-xs font-sans text-slate border-b border-border/60 pb-3">
            <span>Showing {startIndex + 1} - {Math.min(startIndex + pageSize, guides.length)} of {guides.length} guides</span>
          </div>

          {paginatedGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedGuides.map((guide) => {
                const tool = toolRegistry.find(t => t.id === guide.utilityId);
                return (
                  <div 
                    key={guide.id} 
                    className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display font-bold text-base text-ink leading-snug">
                          {tool?.name || guide.title}
                        </h4>
                        {tool?.runsInBrowser && (
                          <span className="text-[9px] font-sans font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            Local Browser
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate leading-relaxed">
                        {guide.metaDescription}
                      </p>

                      {tool && (
                        <div className="grid grid-cols-2 gap-4 bg-background border border-border/40 p-3.5 rounded-xl text-[10px] font-sans">
                          <div>
                            <strong className="text-ink block uppercase tracking-wider mb-1">Inputs</strong>
                            <span className="text-slate block truncate">{tool.inputType.join(', ')}</span>
                          </div>
                          <div>
                            <strong className="text-ink block uppercase tracking-wider mb-1">Outputs</strong>
                            <span className="text-slate block truncate">{tool.outputType.join(', ')}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2.5 pt-6 mt-4 border-t border-border/40 text-xs font-semibold">
                      {tool && (
                        <Link 
                          href={tool.utilityUrl}
                          className="flex-1 text-center py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl transition-colors inline-flex items-center justify-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-white" /> Use Utility
                        </Link>
                      )}
                      <Link 
                        href={`/blog/guides/${guide.slug}`}
                        className="flex-1 text-center py-2.5 bg-background border border-border hover:border-primary hover:text-primary rounded-xl transition-all inline-flex items-center justify-center gap-1"
                      >
                        Read Guide <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface/50 border border-border border-dashed rounded-2xl">
              <p className="font-sans text-slate text-sm">No utility guides found under this sub-section.</p>
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
        </div>

      </div>

      {/* Navigation Back */}
      <div className="pt-4 border-t border-border/60">
        <Link 
          href={`/blog/series/${seriesSlug}`} 
          className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-slate hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {series.name} Series
        </Link>
      </div>

    </div>
  );
}
