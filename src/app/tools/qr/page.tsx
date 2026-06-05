import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { registry } from '@/registry';
import { QrCode, ShieldAlert } from 'lucide-react';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('category-qr')!;
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

export default function QRCategoryPage() {
  const category = registry.categories.find(c => c.id === 'qr');

  if (!category) return null;

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        {/* Category Hero */}
        <section className="container mx-auto px-4 max-w-5xl mb-12 text-center animate-in fade-in duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <QrCode className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-4">
            QR Code Tools
          </h1>
          <p className="font-sans text-base md:text-lg text-slate max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </section>

        {/* Privacy locks */}
        <section className="container mx-auto px-4 max-w-3xl mb-12">
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4 text-primary">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <p className="text-[13px] font-sans font-medium">
              Privacy guaranteed: All QR generation and scanning operations run 100% locally. Camera feeds are never transmitted.
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
                <p className="font-sans text-[13px] text-slate">
                  {collection.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {collection.tools.map((tool) => (
                  <Card 
                    key={tool.id}
                    title={tool.name}
                    description={tool.description}
                    href={tool.path}
                    icon={<QrCode className="w-6 h-6" />}
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
