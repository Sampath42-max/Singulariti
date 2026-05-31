import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { registry } from '@/registry';
import { ImageIcon } from 'lucide-react';

export default function ImageCategoryPage() {
  const category = registry.categories.find(c => c.id === 'image');

  if (!category) return null;

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-12">
        
        {/* Category Hero */}
        <section className="container mx-auto px-4 max-w-5xl mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-6">
            Image Tools
          </h1>
          <p className="font-sans text-lg text-slate max-w-2xl mx-auto">
            {category.description}
          </p>
        </section>

        {/* Featured Image Tools */}
        <section className="container mx-auto px-4 max-w-7xl mb-24 bg-background border border-border rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-ink mb-4">Featured Tools</h2>
            <p className="text-slate font-sans max-w-2xl mx-auto">Access our most popular image tools instantly.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.collections.flatMap(c => c.tools).slice(0, 4).map(tool => (
              <Link key={tool.id} href={tool.path} className="group block">
                <div className="p-4 bg-surface border border-border rounded-lg hover:border-slate hover:shadow-sm transition-all h-full">
                  <h4 className="font-display font-bold text-[15px] text-ink mb-1 group-hover:text-primary transition-colors">{tool.name}</h4>
                  <p className="text-[12px] text-slate font-sans line-clamp-2">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
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
                    icon={<ImageIcon className="w-6 h-6" />}
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
