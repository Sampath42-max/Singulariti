import React from 'react';
import { HtmlPreviewerClient } from '@/components/tools/dev/HtmlPreviewerClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';

const seo = getUtilitySEO('html-previewer');

export const metadata = buildMetadata({
  title: seo?.seoTitle || 'Premium HTML Previewer | Singulariti',
  description: seo?.seoDescription || 'Render raw HTML code elements live in a safe frame with Monaco Editor.',
  canonical: `https://singulariti.in/tools/dev/html-previewer`,
});

export default function HtmlPreviewerPage() {
  return <HtmlPreviewerClient />;
}
