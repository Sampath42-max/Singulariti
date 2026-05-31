import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ImageIcon, Sparkles } from 'lucide-react';

export default function Home() {
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
            <Link href="/image">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              title="Image Tools"
              description="Compress, convert, and resize images instantly in your browser."
              icon={<ImageIcon />}
              href="/image"
              badge={{ text: '13 Tools', variant: 'default' }}
            />
          </div>
        </section>

        {/* Trust / How it Works */}
        <section className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
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

function Badge({ children, className, variant = 'default' }: { children: React.ReactNode, className?: string, variant?: string }) {
  return (
    <span className={`inline-flex items-center justify-center font-sans text-[11px] font-medium leading-none px-3 py-1.5 rounded-full ${variant === 'default' ? 'bg-primary/10 text-primary' : ''} ${className}`}>
      {children}
    </span>
  );
}
