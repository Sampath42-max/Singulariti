import React from 'react';
import { WebCompilerClient } from '@/components/tools/dev/WebCompilerClient';
import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';

const seo = getUtilitySEO('web-compiler');

export const metadata = buildMetadata({
  title: seo?.title || 'HTML/CSS/JS Web Compiler | Singulariti',
  description: seo?.description || 'Write HTML, CSS, and JavaScript and see the results instantly in your browser.',
  canonical: `https://singulariti.in/tools/dev/web-compiler`,
});

export default function WebCompilerPage() {
  return <WebCompilerClient />;
}
