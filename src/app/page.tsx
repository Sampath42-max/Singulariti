import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ImageIcon, FileText, QrCode, Wand2, Calculator, Keyboard, Timer, Brush, Type, Code, Scale, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PremiumIconContainer } from '@/components/ui/PremiumIconContainer';
import HeroOrbitalEcosystem from '@/components/ui/HeroOrbitalEcosystem';
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
      <main className="flex-1 w-full flex flex-col items-center pt-28 lg:pt-6 pb-12">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-4 mt-2 lg:mt-6 mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-[650px]">
            
            {/* Left Column - Premium Copy */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
              <Badge className="mb-8 border-primary/20 bg-primary/5 text-primary shadow-sm backdrop-blur-sm" variant="outline">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                100% Free & Browser Based
              </Badge>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.1] tracking-tight mb-4 sm:mb-6">
                One Place.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Every Tool.</span>
              </h1>
              
              <p className="font-sans text-base sm:text-lg md:text-xl text-slate max-w-xl mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
                Fast, secure, browser-based utility tools designed for creators, developers, students, and professionals. Experience zero server uploads and instant processing.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link href="/tools" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Explore Ecosystem
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    How it Works
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-[13px] font-sans font-medium text-slate/80">
                <span className="flex items-center"><svg className="w-4 h-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Browser Based</span>
                <span className="flex items-center"><svg className="w-4 h-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>No Upload Required</span>
                <span className="flex items-center"><svg className="w-4 h-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>100% Free</span>
                <span className="flex items-center"><svg className="w-4 h-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Instant Results</span>
              </div>
            </div>

            {/* Right Column - Orbital Ecosystem */}
            <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
              <HeroOrbitalEcosystem />
            </div>
            
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
              icon={<PremiumIconContainer><ImageIcon /></PremiumIconContainer>}
              href="/image"
              badge={{ text: `${imageToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="PDF Tools"
              description="Merge, split, rotate, sign, compress and watermark PDF files."
              icon={<PremiumIconContainer><FileText /></PremiumIconContainer>}
              href="/tools/pdf"
              badge={{ text: `${pdfToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Developer Tools"
              description="Format JSON/XML/YAML/SQL, encode Base64/URLs, decode JWTs, and test regex."
              icon={<PremiumIconContainer><Code /></PremiumIconContainer>}
              href="/tools/dev"
              badge={{ text: `${devToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Calculator Tools"
              description="Calculate financial, mathematical, tax, health, and date-related metrics."
              icon={<PremiumIconContainer><Calculator /></PremiumIconContainer>}
              href="/tools/calculators"
              badge={{ text: `${calculatorsToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="SEO Tools"
              description="Generate meta tags, robots.txt, sitemaps, and check heading structures."
              icon={<PremiumIconContainer><Search /></PremiumIconContainer>}
              href="/tools/seo"
              badge={{ text: `${seoToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Text Tools"
              description="Count words, format cases, sort, reverse, and compare text instantly."
              icon={<PremiumIconContainer><Type /></PremiumIconContainer>}
              href="/tools/text"
              badge={{ text: `${textToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Unit Conversion Tools"
              description="Convert lengths, weights, temperature, area, bases and data storage."
              icon={<PremiumIconContainer><Scale /></PremiumIconContainer>}
              href="/tools/convert"
              badge={{ text: `${convertToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="QR Tools"
              description="Generate custom styled QR codes or scan them securely."
              icon={<PremiumIconContainer><QrCode /></PremiumIconContainer>}
              href="/tools/qr"
              badge={{ text: `${qrToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Image Editing Tools"
              description="Edit, crop, apply filters, and enhance images instantly."
              icon={<PremiumIconContainer><Wand2 /></PremiumIconContainer>}
              href="/editing"
              badge={{ text: `${editingToolsCount} Tools`, variant: 'default' }}
            />
            <Card 
              title="Typing Speed Test"
              description="Measure your WPM, analyze your mistakes, and improve your typing accuracy."
              icon={<PremiumIconContainer><Keyboard /></PremiumIconContainer>}
              href="/typing-speed-test"
            />
            <Card 
              title="Pomodoro Timer"
              description="Deep focus environment with task management and ambient sounds."
              icon={<PremiumIconContainer><Timer /></PremiumIconContainer>}
              href="/pomodoro-timer"
            />
            <Card 
              title="Online Whiteboard"
              description="Draw, write, sketch, add shapes, and export your whiteboard directly in your browser."
              icon={<PremiumIconContainer><Brush /></PremiumIconContainer>}
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

