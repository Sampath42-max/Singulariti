import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { registry } from '@/registry';
import { Wand2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('category-editing')!;
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

export default function EditingCategoryPage() {
  const category = registry.categories.find(c => c.id === 'editing');

  if (!category) return null;

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-12">
        
        {/* Category Hero */}
        <section className="container mx-auto px-4 max-w-5xl mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Wand2 className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-6">
            Editing Tools
          </h1>
          <p className="font-sans text-lg text-slate max-w-2xl mx-auto">
            {category.description}
          </p>
        </section>

        {/* Collections */}
        <section className="container mx-auto px-4 max-w-7xl">
          {category.collections.map((collection) => (
            <div key={collection.id} className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <div>
                  <h2 className="font-display font-bold text-2xl text-ink mb-2">
                    {collection.name}
                  </h2>
                  <p className="font-sans text-[14px] text-slate">
                    {collection.description}
                  </p>
                </div>
                <Link href={collection.path} className="text-primary font-sans text-[13px] font-medium hover:underline">
                  View Collection →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collection.tools.map((tool) => (
                  <Card 
                    key={tool.id}
                    title={tool.name}
                    description={tool.description}
                    href={tool.path}
                    icon={<Wand2 className="w-6 h-6" />}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

      </main>
      <Footer />
    </>
  );
}
