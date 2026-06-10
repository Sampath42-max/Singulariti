import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ImageIcon, FileText, QrCode, Wand2, Calculator, Keyboard, Timer, Brush, Type, Code, Scale, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PremiumIconContainer } from '@/components/ui/PremiumIconContainer';
import { registry } from '@/registry';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('home')!;
export const metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  canonical: 'https://singulariti.in',
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

export default function Home() {
  const getToolCount = (categoryId: string) => {
    const category = registry.categories.find(c => c.id === categoryId);
    if (!category) return 0;
    return category.collections.reduce((acc, collection) => acc + collection.tools.length, 0);
  };

  const imageToolsCount = getToolCount('image');
  const editingToolsCount = getToolCount('editing');
  const pdfToolsCount = getToolCount('pdf');
  const qrToolsCount = getToolCount('qr');
  const calculatorsToolsCount = getToolCount('calculators');
  const textToolsCount = getToolCount('text');
  const devToolsCount = getToolCount('dev');
  const convertToolsCount = getToolCount('convert');
  const seoToolsCount = getToolCount('seo');

  return (
    <>

      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center max-w-4xl mb-32">
          <Badge className="mb-8" variant="default">100% Free & Browser Based</Badge>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-ink leading-[1.1] tracking-tight mb-6">
            One Place. Every Tool.
          </h1>
          <p className="font-sans text-lg md:text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed">
            Fast, secure, browser-based utility tools designed for creators, developers, students and professionals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools">
              <Button size="lg" variant="primary">Explore Tools</Button>
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13px] font-sans text-slate">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Browser Based</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>No Upload Required</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Free</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Secure</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Fast</span>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 max-w-7xl mb-32">
          <div className="flex items-center justify-between mb-12 border-b border-border pb-4">
            <h2 className="font-display font-bold text-3xl text-ink">Explore Ecosystem</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card 
              title="Image Tools"
              description="Compress, convert, and resize images instantly in your browser."
              icon={<PremiumIconContainer color="blue"><ImageIcon /></PremiumIconContainer>}
              href="/image"
              badge={{ text: `${imageToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="PDF Tools"
              description="Merge, split, rotate, sign, compress and watermark PDF files."
              icon={<PremiumIconContainer color="red"><FileText /></PremiumIconContainer>}
              href="/tools/pdf"
              badge={{ text: `${pdfToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Developer Tools"
              description="Format JSON/XML/YAML/SQL, encode Base64/URLs, decode JWTs, and test regex."
              icon={<PremiumIconContainer color="purple"><Code /></PremiumIconContainer>}
              href="/tools/dev"
              badge={{ text: `${devToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Calculator Tools"
              description="Calculate financial, mathematical, tax, health, and date-related metrics."
              icon={<PremiumIconContainer color="orange"><Calculator /></PremiumIconContainer>}
              href="/tools/calculators"
              badge={{ text: `${calculatorsToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="SEO Tools"
              description="Generate meta tags, robots.txt, sitemaps, and check heading structures."
              icon={<PremiumIconContainer color="green"><Search /></PremiumIconContainer>}
              href="/tools/seo"
              badge={{ text: `${seoToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Text Tools"
              description="Count words, format cases, sort, reverse, and compare text instantly."
              icon={<PremiumIconContainer color="slate"><Type /></PremiumIconContainer>}
              href="/tools/text"
              badge={{ text: `${textToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Unit Conversion Tools"
              description="Convert lengths, weights, temperature, area, bases and data storage."
              icon={<PremiumIconContainer color="primary"><Scale /></PremiumIconContainer>}
              href="/tools/convert"
              badge={{ text: `${convertToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="QR Tools"
              description="Generate custom styled QR codes or scan them securely."
              icon={<PremiumIconContainer color="indigo"><QrCode /></PremiumIconContainer>}
              href="/tools/qr"
              badge={{ text: `${qrToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Image Editing Tools"
              description="Edit, crop, apply filters, and enhance images instantly."
              icon={<PremiumIconContainer color="blue"><Wand2 /></PremiumIconContainer>}
              href="/editing"
              badge={{ text: `${editingToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Typing Speed Test"
              description="Measure your WPM, analyze your mistakes, and improve your typing accuracy."
              icon={<PremiumIconContainer color="slate"><Keyboard /></PremiumIconContainer>}
              href="/typing-speed-test"
            />
            <Card 
              title="Pomodoro Timer"
              description="Deep focus environment with task management and ambient sounds."
              icon={<PremiumIconContainer color="orange"><Timer /></PremiumIconContainer>}
              href="/pomodoro-timer"
            />
            <Card 
              title="Online Whiteboard"
              description="Draw, write, sketch, add shapes, and export your whiteboard directly in your browser."
              icon={<PremiumIconContainer color="purple"><Brush /></PremiumIconContainer>}
              href="/tools/editing/online-whiteboard"
            />
          </div>
        </section>

        {/* Trust / How it Works */}
        <section className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display font-bold text-3xl text-ink mb-4">How Browser Processing Works</h2>
          <p className="text-slate font-sans text-lg mb-8">
            Unlike traditional utility sites, Singulariti doesn't upload your files to our servers. 
            We use WebAssembly and modern browser APIs (like Web Workers and Canvas) to process your 
            files directly on your device.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-display font-bold text-[17px] text-ink mb-2">1. Total Privacy</h4>
              <p className="text-[13px] text-slate font-sans">Your files never leave your device. No uploads means zero risk of data leaks.</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-[17px] text-ink mb-2">2. Blazing Fast</h4>
              <p className="text-[13px] text-slate font-sans">Skip the upload and download times. Processing starts instantly.</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-[17px] text-ink mb-2">3. Zero Limits</h4>
              <p className="text-[13px] text-slate font-sans">No arbitrary file size limits or wait queues. Use the full power of your machine.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

