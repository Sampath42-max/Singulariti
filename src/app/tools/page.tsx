import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { registry } from '@/registry';
import { ImageIcon, FileText, QrCode, Calculator, Type, Code, Scale, Search } from 'lucide-react';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

import { ToolIcon } from '@/components/tools/ToolIcon';

const seo = getPageSEO('tools')!;
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

export default function ToolsDirectoryPage() {
  // Mapping of category icon
  const getIcon = (id: string) => {
    switch (id) {
      case 'image':
        return <ImageIcon className="w-6 h-6" />;
      case 'pdf':
        return <FileText className="w-6 h-6" />;
      case 'qr':
        return <QrCode className="w-6 h-6" />;
      case 'calculators':
        return <Calculator className="w-6 h-6" />;
      case 'text':
        return <Type className="w-6 h-6" />;
      case 'dev':
        return <Code className="w-6 h-6" />;
      case 'convert':
        return <Scale className="w-6 h-6" />;
      case 'seo':
        return <Search className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center max-w-4xl mb-16">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-ink leading-tight tracking-tight mb-4">
            Tools Directory
          </h1>
          <p className="font-sans text-base md:text-lg text-slate max-w-xl mx-auto leading-relaxed">
            Choose a category to find specialized, high-performance browser tools. Your privacy is guaranteed.
          </p>
        </section>

        {/* Directory Listing */}
        <section className="container mx-auto px-4 max-w-7xl space-y-16">
          {registry.categories.map((category) => (
            <div key={category.id} className="border border-border bg-surface rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
                <div>
                  <h2 className="font-display font-bold text-2xl text-ink flex items-center gap-3">
                    <span className="text-primary">{getIcon(category.id)}</span>
                    {category.name}
                  </h2>
                  <p className="font-sans text-sm text-slate mt-1">
                    {category.description}
                  </p>
                </div>
                <Link href={category.path}>
                  <span className="inline-flex items-center text-[13px] font-sans font-semibold text-primary hover:underline">
                    View Category Page →
                  </span>
                </Link>
              </div>

              {/* Collections Grid */}
              <div className="space-y-8">
                {category.collections.map((collection) => (
                  <div key={collection.id}>
                    <h3 className="font-display font-bold text-[15px] uppercase tracking-wider text-ink mb-4 opacity-80">
                      {collection.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {collection.tools.map((tool) => (
                        <Card
                          key={tool.id}
                          title={tool.name}
                          description={tool.description}
                          href={tool.path}
                          icon={<ToolIcon toolId={tool.id} />}
                        />
                      ))}
                    </div>
                  </div>
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
