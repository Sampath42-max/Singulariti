import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchResultsContent } from './SearchResultsClient';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Search Utility Guides | Singulariti',
  description: 'Search utility guides by name, section, operation type and usage topic.',
  path: '/blog/search',
  robots: 'noindex',
});

export default function SearchResultsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <Suspense fallback={
          <div className="container mx-auto px-4 max-w-7xl text-center py-20 font-sans text-slate">
            Loading search results...
          </div>
        }>
          <SearchResultsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
