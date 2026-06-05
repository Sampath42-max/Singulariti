import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogSeriesList } from '@/content/tools/toolRegistry';
import { SeriesDetailsContent } from './SeriesDetailsClient';
import { constructMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ seriesSlug: string }>;
}

export async function generateStaticParams() {
  return blogSeriesList.map((series) => ({
    seriesSlug: series.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { seriesSlug } = await params;
  const series = blogSeriesList.find(s => s.slug === seriesSlug);
  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  return constructMetadata({
    title: `${series.name} Guides | Usage and Operations Series | Singulariti`,
    description: series.heroDescription || series.description,
    path: `/blog/series/${seriesSlug}`,
  });
}

export default function SeriesDetailsPage(props: PageProps) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <Suspense fallback={
          <div className="container mx-auto px-4 max-w-7xl text-center py-20 font-sans text-slate">
            Loading series guides...
          </div>
        }>
          <SeriesDetailsContent {...props} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
