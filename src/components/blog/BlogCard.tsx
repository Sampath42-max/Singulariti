"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const linkHref = post.toolUrl ? `/blog/guides/${post.slug}` : `/blog/articles/${post.slug}`;

  return (
    <article className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md">
      <div className="p-6 flex flex-col flex-1">
        {/* Category */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <Link href={linkHref} className="block group-hover:text-primary transition-colors mb-3">
          <h3 className="font-display font-bold text-xl text-ink leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Meta Description */}
        <p className="text-[13px] font-sans text-slate leading-relaxed mb-6 flex-1">
          {post.metaDescription}
        </p>

        {/* Metadata Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60 text-[12px] font-sans text-slate">
          {post.updatedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Updated: {post.updatedAt}
            </span>
          )}
          
          <Link href={linkHref} className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors">
            Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
