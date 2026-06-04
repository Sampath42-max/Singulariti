import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { registry } from '@/registry';
import { Scale, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Unit Conversion Tools — Convert Anything Online | Singulariti',
  description: 'Free online unit converters. Convert length, weight, temperature, speed, area, volume, time, frequency, pressure, data storage, and number bases instantly in your browser.',
};

export default function ConvertCategoryPage() {
  const category = registry.categories.find(c => c.id === 'convert');

  if (!category) return null;

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        {/* Category Hero */}
        <section className="container mx-auto px-4 max-w-5xl mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-4">
            Unit Conversion Tools
          </h1>
          <p className="font-sans text-base md:text-lg text-slate max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </section>

        {/* Privacy locks */}
        <section className="container mx-auto px-4 max-w-3xl mb-12">
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4 text-primary">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <p className="text-[13px] font-sans font-medium">
              100% Client-Side: Conversion ratios are hardcoded dynamically in JavaScript. No server calculations or network transfers occur.
            </p>
          </div>
        </section>

        {/* Collections */}
        <section className="container mx-auto px-4 max-w-7xl">
          {category.collections.map((collection) => (
            <div key={collection.id} className="mb-16">
              <div className="mb-6 pb-3 border-b border-border">
                <h2 className="font-display font-bold text-2xl text-ink mb-1">
                  {collection.name}
                </h2>
                <p className="font-sans text-sm text-slate">
                  {collection.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collection.tools.map((tool) => (
                  <Card 
                    key={tool.id}
                    title={tool.name}
                    description={tool.description}
                    href={tool.path}
                    icon={<Scale className="w-6 h-6" />}
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
