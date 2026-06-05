import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogSeriesList, blogSubSeriesList } from '@/content/tools/toolRegistry';
import { SubSeriesContent } from './SubSeriesClient';
import { constructMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ seriesSlug: string; subSectionSlug: string }>;
}

export async function generateStaticParams() {
  const paths: { seriesSlug: string; subSectionSlug: string }[] = [];
  
  blogSeriesList.forEach((series) => {
    const subSections = blogSubSeriesList.filter(ss => ss.seriesId === series.sectionId);
    subSections.forEach((sub) => {
      paths.push({
        seriesSlug: series.slug,
        subSectionSlug: sub.slug,
      });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: PageProps) {
  const { seriesSlug, subSectionSlug } = await params;
  const series = blogSeriesList.find(s => s.slug === seriesSlug);
  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  const subSection = blogSubSeriesList.find(
    ss => ss.slug === subSectionSlug && ss.seriesId === series.sectionId
  );
  if (!subSection) {
    return {
      title: 'Sub-section Not Found',
    };
  }

  return constructMetadata({
    title: `${subSection.name} Guides | ${series.name} Tools | Singulariti`,
    description: subSection.description,
    path: `/blog/series/${seriesSlug}/${subSectionSlug}`,
  });
}

export default function SubSeriesPage(props: PageProps) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <Suspense fallback={
          <div className="container mx-auto px-4 max-w-7xl text-center py-20 font-sans text-slate">
            Loading sub-series guides...
          </div>
        }>
          <SubSeriesContent {...props} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
