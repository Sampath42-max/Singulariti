import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { getCategoryById } from '@/registry';

// Next.js 15 page component params are generally Promises
export default async function CollectionPage(props: { params: Promise<{ collection: string }> }) {
  const params = await props.params;
  const category = getCategoryById('editing');
  if (!category) return notFound();

  const collection = category.collections.find(c => c.id === params.collection);
  if (!collection) return notFound();

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-12">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-7xl mb-8">
          <nav className="flex text-[13px] font-sans text-slate">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/editing" className="hover:text-ink">Editing Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-ink font-medium">{collection.name}</span>
          </nav>
        </div>

        {/* Collection Hero */}
        <section className="container mx-auto px-4 max-w-3xl mb-16 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-4">
            {collection.name}
          </h1>
          <p className="font-sans text-lg text-slate">
            {collection.description}
          </p>
        </section>

        {/* Tool Grid */}
        <section className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collection.tools.map((tool) => (
              <Card 
                key={tool.id}
                title={tool.name}
                description={tool.description}
                href={tool.path}
              />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const category = getCategoryById('editing');
  if (!category) return [];

  return category.collections.map((collection) => ({
    collection: collection.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ collection: string }> }) {
  const params = await props.params;
  const category = getCategoryById('editing');
  const collection = category?.collections.find(c => c.id === params.collection);

  if (!collection) return {};

  return {
    title: collection.seoTitle,
    description: collection.seoDescription,
  };
}
