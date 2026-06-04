import React from 'react';
import Link from 'next/link';
import { blogSeriesList, toolRegistry } from '@/content/tools/toolRegistry';
import { BookOpen } from 'lucide-react';

interface SimilarTopicsSidebarProps {
  currentSeriesId?: string;
}

export function SimilarTopicsSidebar({ currentSeriesId }: SimilarTopicsSidebarProps) {
  return (
    <div className="bg-surface border border-border p-6 rounded-2xl space-y-4 shadow-sm">
      <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-3">
        <BookOpen className="w-4 h-4 text-primary" />
        Similar Topics
      </h3>
      
      {/* Desktop Vertical List / Mobile Horizontal Scroll */}
      <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none whitespace-nowrap lg:whitespace-normal">
        {blogSeriesList.map((series) => {
          const count = toolRegistry.filter(t => t.sectionId === series.sectionId).length;
          const isActive = currentSeriesId === series.sectionId;
          
          return (
            <Link
              key={series.id}
              href={`/blog/series/${series.slug}`}
              className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border text-xs font-sans font-semibold transition-all flex-shrink-0 lg:flex-shrink-1 ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-background hover:bg-primary/5 hover:border-primary/45 border-border text-slate hover:text-primary'
              }`}
            >
              <span>{series.name}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                isActive ? 'bg-white/20 text-white' : 'bg-border/60 text-slate group-hover:bg-primary/10'
              }`}>
                {count}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
