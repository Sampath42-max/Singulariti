'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toolRegistry } from '@/content/tools/toolRegistry';
import { getAllPosts } from '@/lib/blog';

export function BlogSearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(e.target.value.trim().length > 0);
  };

  // Get matching tools (for dynamic guides)
  const matchingTools = toolRegistry
    .filter(tool => 
      tool.name.toLowerCase().includes(query.toLowerCase()) || 
      tool.shortDescription.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3); // Max 3 tools

  // Get matching manual blog posts
  const allPosts = getAllPosts();
  const matchingPosts = allPosts
    .filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      (post.metaDescription && post.metaDescription.toLowerCase().includes(query.toLowerCase()))
    )
    .slice(0, 3); // Max 3 posts

  const hasResults = matchingTools.length > 0 || matchingPosts.length > 0;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="relative flex gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-slate" />
          </span>
          <input
            suppressHydrationWarning
            type="text"
            name="q"
            value={query}
            onChange={handleInputChange}
            onFocus={() => { if (query.trim()) setIsOpen(true); }}
            placeholder="Enter JSON, PDF, word counter, or calculation formulas..."
            required
            autoComplete="off"
            className="w-full font-sans text-xs text-ink bg-background border border-border rounded-xl pl-10 pr-4 py-3.5 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <button
          suppressHydrationWarning
          type="submit"
          className="bg-primary hover:bg-primary/95 text-white font-sans font-bold text-xs px-5 py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          {hasResults ? (
            <div className="max-h-[300px] overflow-y-auto p-2">
              
              {matchingPosts.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate uppercase tracking-wider">
                    Manual Guides
                  </div>
                  {matchingPosts.map(post => (
                    <Link
                      key={post.slug}
                      href={`/blog/guides/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <div className="font-display font-bold text-[13px] text-ink mb-0.5">
                        {post.title}
                      </div>
                      <div className="font-sans text-[11px] text-slate line-clamp-1">
                        {post.metaDescription}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {matchingTools.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate uppercase tracking-wider">
                    Utility Guides
                  </div>
                  {matchingTools.map(tool => (
                    <Link
                      key={tool.id}
                      href={`/blog/guides/${tool.guideSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <div className="font-display font-bold text-[13px] text-ink mb-0.5 flex justify-between">
                        <span>{tool.name} Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                      </div>
                      <div className="font-sans text-[11px] text-slate line-clamp-1">
                        {tool.shortDescription}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="pt-2 mt-2 border-t border-border/50">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full px-3 py-2 text-center text-[12px] font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  View all results for "{query}"
                </button>
              </div>

            </div>
          ) : (
            <div className="p-6 text-center text-slate text-xs font-sans">
              No matching guides found for "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}
