"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Link2 } from 'lucide-react';
import { RelatedTool } from '@/lib/blog';

interface RelatedToolsProps {
  tools: RelatedTool[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="bg-surface/50 border border-border/80 rounded-2xl p-6 md:p-8 space-y-4">
      <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
        <Link2 className="w-5 h-5 text-primary" /> Related Tools & Resources
      </h3>
      <p className="text-[13px] font-sans text-slate">
        Run these calculations or operations locally in the browser with these free utility tools:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {tools.map((tool, idx) => (
          <Link
            key={idx}
            href={tool.url}
            className="flex items-start justify-between p-4 bg-background border border-border hover:border-primary/60 hover:bg-primary/5 rounded-xl group transition-all duration-200"
          >
            <div className="space-y-1 pr-4">
              <span className="font-sans font-bold text-sm text-ink group-hover:text-primary transition-colors block">
                {tool.name}
              </span>
              <p className="font-sans text-[11px] text-slate leading-relaxed">
                {tool.reason}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
