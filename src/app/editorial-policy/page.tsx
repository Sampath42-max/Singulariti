import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial & Transparency Policy | Singulariti',
  description: 'Learn about our commitment to accurate, secure, and privacy-first browser tools.',
  alternates: {
    canonical: 'https://singulariti.in/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          <div className="mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl text-primary mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4 tracking-tight">
              Editorial &amp; Transparency Policy
            </h1>
            <p className="text-sm text-slate mb-4">Last Updated: June 2026</p>
            <p className="text-lg md:text-xl font-sans text-slate leading-relaxed">
              At Singulariti Labs, we believe in building tools that empower users without compromising their privacy. This document outlines our core principles and editorial standards.
            </p>
          </div>

          <div className="max-w-none">
            
            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-ink mb-4">
                <Scale className="w-6 h-6 text-primary flex-shrink-0" />
                1. Our Privacy-First Commitment
              </h2>
              <p className="font-sans text-slate leading-relaxed mb-4">
                Every tool hosted on Singulariti.in is engineered to run <strong className="text-ink">100% locally in your web browser</strong> using client-side technologies (HTML5, WebAssembly, and modern JavaScript APIs).
              </p>
              <ul className="space-y-2 pl-5 list-disc font-sans text-slate leading-relaxed">
                <li><strong className="text-ink">No Data Collection:</strong> We do not upload your files, code, or text to any external server.</li>
                <li><strong className="text-ink">No Tracking:</strong> We do not monitor your input data or generated outputs.</li>
                <li><strong className="text-ink">Immediate Deletion:</strong> Once you close a tool tab, all processed data is instantly wiped from your machine's memory.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-ink mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                2. Accuracy &amp; Reliability Standard
              </h2>
              <p className="font-sans text-slate leading-relaxed mb-4">
                Our editorial team and engineers rigorously test every utility before publication to ensure it meets our high standards for accuracy.
              </p>
              <ul className="space-y-2 pl-5 list-disc font-sans text-slate leading-relaxed">
                <li><strong className="text-ink">Cryptographic Integrity:</strong> Tools like our Bcrypt Hash Generator and Password Generator utilize industry-standard Web Crypto APIs.</li>
                <li><strong className="text-ink">Conversion Fidelity:</strong> Image and PDF utilities are tested across hundreds of varied file inputs to guarantee format fidelity.</li>
                <li><strong className="text-ink">Continuous Review:</strong> If an API deprecates or a vulnerability is found in a local library, the tool is immediately pulled for maintenance.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-ink mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                3. Content &amp; Educational Guidelines
              </h2>
              <p className="font-sans text-slate leading-relaxed mb-4">
                The instructional articles and FAQs provided alongside each tool are authored and reviewed by the Singulariti Editorial Team. Our goal is to demystify complex technical tasks.
              </p>
              <ul className="space-y-2 pl-5 list-disc font-sans text-slate leading-relaxed">
                <li><strong className="text-ink">Clarity Over Jargon:</strong> We explain complex topics (e.g., CRON expressions, Bcrypt salts) in accessible, plain-English terms.</li>
                <li><strong className="text-ink">No Deceptive Practices:</strong> We do not use dark patterns, fake &quot;processing&quot; loading bars, or hidden subscription fees. All tools are entirely free to use.</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
