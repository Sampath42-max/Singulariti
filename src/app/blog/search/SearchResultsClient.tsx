"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toolRegistry, sectionRegistry, subSectionRegistry, UtilityRegistryItem } from '@/content/tools/toolRegistry';
import { Search, Compass, Play, ArrowLeft, ArrowRight, ListFilter, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search term
  const query = searchParams?.get('q') || '';
  const pageParam = parseInt(searchParams?.get('page') || '1', 10);
  const opParam = searchParams?.get('op') || '';

  // Filter States
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedSubSection, setSelectedSubSection] = useState<string>('');
  const [selectedOpType, setSelectedOpType] = useState<string>(opParam);

  // Sync operation type filter if the URL parameter changes
  useEffect(() => {
    if (opParam) {
      setSelectedOpType(opParam);
    }
  }, [opParam]);

  // Reset page parameter on query or filter changes
  useEffect(() => {
    // Reset page logic when filters are manipulated by user
  }, [query, selectedSection, selectedSubSection, selectedOpType]);

  // Perform search and filter calculations
  const matchesQuery = (tool: UtilityRegistryItem) => {
    if (!query) return true;
    const term = query.toLowerCase();
    const sec = sectionRegistry.find(s => s.id === tool.sectionId);
    const sub = subSectionRegistry.find(ss => ss.id === tool.subSectionId);
    const matchesSection = sec ? sec.name.toLowerCase().includes(term) : false;
    const matchesSubSection = sub ? sub.name.toLowerCase().includes(term) : false;
    
    return (
      tool.name.toLowerCase().includes(term) ||
      tool.shortDescription.toLowerCase().includes(term) ||
      matchesSection ||
      matchesSubSection
    );
  };

  const matchesFilters = (tool: UtilityRegistryItem) => {
    if (selectedSection && tool.sectionId !== selectedSection) return false;
    if (selectedSubSection && tool.subSectionId !== selectedSubSection) return false;
    if (selectedOpType && tool.operationType !== selectedOpType) return false;
    return true;
  };

  const filteredResults = toolRegistry.filter(tool => matchesQuery(tool) && matchesFilters(tool));

  // Pagination Parameters
  const pageSize = 12;
  const totalPages = Math.ceil(filteredResults.length / pageSize);
  const currentPage = Math.max(1, Math.min(pageParam, totalPages || 1));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedResults = filteredResults.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const filters = new URLSearchParams();
      if (query) filters.set('q', query);
      if (selectedOpType) filters.set('op', selectedOpType);
      filters.set('page', page.toString());
      router.push(`/blog/search?${filters.toString()}`);
    }
  };

  // Extract unique operation types from results to populate search filter option list
  const availableOpTypes = Array.from(new Set(toolRegistry.map(t => t.operationType)));

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-sans text-slate">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-ink font-semibold">Search Results</span>
      </div>

      {/* Heading Results Banner */}
      <header className="border-b border-border pb-6 space-y-2">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight flex items-center gap-2">
          Search results for &ldquo;<span className="text-primary">{query || selectedOpType || 'all tools'}</span>&rdquo;
        </h1>
        <p className="font-sans text-xs text-slate">
          Found {filteredResults.length} matching utility tools. Use the filter settings below to narrow down your results.
        </p>
      </header>

      {/* Search Inputs & Filters Panel */}
      <section className="bg-surface border border-border p-6 rounded-2xl space-y-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-display font-bold text-ink uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4 text-primary" /> Filter Options
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          
          {/* Main Section Filter */}
          <div className="space-y-1.5">
            <label className="text-slate font-semibold block">Main Section</label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setSelectedSubSection(''); // reset subsection on section change
              }}
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-slate focus:border-primary focus:outline-none"
            >
              <option value="">All Sections</option>
              {sectionRegistry.map(sec => (
                <option key={sec.id} value={sec.id}>{sec.name}</option>
              ))}
            </select>
          </div>

          {/* Sub-section Filter */}
          <div className="space-y-1.5">
            <label className="text-slate font-semibold block">Sub-Section</label>
            <select
              value={selectedSubSection}
              onChange={(e) => setSelectedSubSection(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-slate focus:border-primary focus:outline-none"
              disabled={!selectedSection}
            >
              <option value="">All Sub-Sections</option>
              {subSectionRegistry
                .filter(ss => ss.sectionId === selectedSection)
                .map(ss => (
                  <option key={ss.id} value={ss.id}>{ss.name}</option>
                ))}
            </select>
          </div>

          {/* Operation Type Filter */}
          <div className="space-y-1.5">
            <label className="text-slate font-semibold block">Operation Type</label>
            <select
              value={selectedOpType}
              onChange={(e) => setSelectedOpType(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-slate focus:border-primary focus:outline-none"
            >
              <option value="">All Operations</option>
              {availableOpTypes.map(op => (
                <option key={op} value={op}>
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Results Listings Grid */}
      <section className="space-y-8 max-w-5xl">
        {paginatedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedResults.map((tool) => {
              const sec = sectionRegistry.find(s => s.id === tool.sectionId);
              const sub = subSectionRegistry.find(ss => ss.id === tool.subSectionId);
              return (
                <div 
                  key={tool.id}
                  className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5 items-center mb-1">
                      <span className="text-[9px] font-mono text-slate bg-border/40 px-2 py-0.5 rounded">
                        {sec?.name || 'Utility'}
                      </span>
                      <span className="text-[9px] font-mono text-slate bg-border/40 px-2 py-0.5 rounded">
                        {sub?.name || 'General'}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-ink leading-snug">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate leading-relaxed">
                      {tool.shortDescription}
                    </p>

                    {/* Input Output Metrics */}
                    <div className="grid grid-cols-2 gap-4 bg-background border border-border/40 p-3 rounded-xl text-[9px] font-sans">
                      <div>
                        <strong className="text-ink block uppercase tracking-wider mb-0.5">Inputs</strong>
                        <span className="text-slate block truncate">{tool.inputType.join(', ')}</span>
                      </div>
                      <div>
                        <strong className="text-ink block uppercase tracking-wider mb-0.5">Outputs</strong>
                        <span className="text-slate block truncate">{tool.outputType.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-6 mt-4 border-t border-border/40 text-xs font-semibold">
                    <Link 
                      href={tool.utilityUrl}
                      className="flex-1 text-center py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl transition-colors inline-flex items-center justify-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-white" /> Use Tool
                    </Link>
                    <Link 
                      href={`/blog/guides/${tool.guideSlug}`}
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
            <p className="font-sans text-slate text-sm">No utility tools matched your search parameters.</p>
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
  );
}

export { SearchResultsContent };
