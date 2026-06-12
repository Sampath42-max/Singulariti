import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';
import React from 'react';
import { JpgToPdfPageClient } from './JpgToPdfPageClient';
import fs from 'fs';
import path from 'path';

const seo = getUtilitySEO('jpg-to-pdf')!;
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

export default async function JpgToPdfPage() {
  let article = '';
  try {
    const articlePath = path.join(process.cwd(), 'src', 'content', 'articles', 'jpg-to-pdf.md');
    if (fs.existsSync(articlePath)) {
      article = fs.readFileSync(articlePath, 'utf8');
    }
  } catch (e) {
    // Ignore if not found
  }
  return <JpgToPdfPageClient article={article || undefined} />;
}
