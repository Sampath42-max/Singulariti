import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';
import React from 'react';
import { ExtractPdfPagesPageClient } from './ExtractPdfPagesPageClient';
import fs from 'fs';
import path from 'path';

const seo = getUtilitySEO('extract-pdf-pages')!;
export const metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  canonical: seo.canonical,
  robots: seo.robots,
  openGraph: {
    title: seo.openGraph.title,
    description: seo.openGraph.description,
    url: seo.openGraph.url,
    type: seo.openGraph.type,
    image: seo.openGraph.image,
  },
  twitter: {
    title: seo.twitter.title,
    description: seo.twitter.description,
    image: seo.twitter.image,
  },
});

export default async function ExtractPdfPagesPage() {
  let article = '';
  try {
    const articlePath = path.join(process.cwd(), 'src', 'content', 'articles', 'extract-pdf-pages.md');
    if (fs.existsSync(articlePath)) {
      article = fs.readFileSync(articlePath, 'utf8');
    }
  } catch (e) {
    // Ignore if not found
  }
  return <ExtractPdfPagesPageClient article={article || undefined} />;
}
