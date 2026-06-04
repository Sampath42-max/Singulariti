"use client";

import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';

interface HeaderItem {
  id: string;
  text: string;
  isSub: boolean;
}

interface TableOfContentsProps {
  htmlContent: string;
}

export function TableOfContents({ htmlContent }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeaderItem[]>([]);

  useEffect(() => {
    // Wait for DOM to render article content
    const container = document.querySelector('.blog-article-content');
    if (!container) return;

    const hElements = container.querySelectorAll('h2, h3');
    const items: HeaderItem[] = [];

    hElements.forEach((el, idx) => {
      const id = el.id || `heading-${idx}`;
      el.id = id;
      items.push({
        id,
        text: el.textContent || '',
        isSub: el.tagName.toLowerCase() === 'h3'
      });
    });

    setHeadings(items);
  }, [htmlContent]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-4 sticky top-24 p-5 bg-surface border border-border rounded-2xl max-h-[80vh] overflow-y-auto">
      <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider flex items-center gap-2 border-b border-border pb-2.5">
        <AlignLeft className="w-3.5 h-3.5 text-primary" /> Table of Contents
      </h3>
      <ul className="space-y-2.5 text-[13px] font-sans">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.isSub ? '12px' : '0' }}>
            <a
              href={`#${h.id}`}
              className={`hover:text-primary transition-colors block leading-tight ${
                h.isSub ? 'text-slate font-normal text-[12px]' : 'text-ink font-semibold'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
