import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('about')!;
export const metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  canonical: `https://singulariti.in${seo.path}`,
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

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-8">About Singulariti</h1>
          
          <p className="mb-4 text-lg">Singulariti is a growing ecosystem of powerful utility tools built to simplify everyday digital tasks.</p>
          
          <p className="mb-6 leading-relaxed">Whether you need to convert files, optimize images, generate content, format code, perform calculations, or streamline workflows, Singulariti brings everything together in one place—fast, secure, and accessible from any device.</p>
          
          <h2 className="font-display font-bold text-2xl text-ink mt-10 mb-4">Our philosophy is simple:</h2>
          
          <p className="mb-6 font-medium text-ink">Useful tools should be instant, privacy-first, and available to everyone.</p>
          
          <p className="mb-6 leading-relaxed">That's why many of our tools run directly in your browser using modern web technologies, ensuring faster performance while keeping your data under your control.</p>
          
          <p className="leading-relaxed">With a focus on simplicity, speed, and reliability, Singulariti is building the ultimate destination for creators, developers, students, professionals, and anyone looking to get things done more efficiently.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
