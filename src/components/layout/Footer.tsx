import React from 'react';
import Link from 'next/link';

import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border mt-24">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Logo />
            </Link>
            <p className="text-slate text-[13px] font-sans">
              One place. Every tool.<br />
              Fast, secure, browser-based utility tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-[15px] text-ink mb-4">Ecosystem</h4>
            <ul className="space-y-2 flex flex-col">
              <Link href="/tools/pdf" className="text-[13px] text-slate hover:text-primary transition-colors">PDF Tools</Link>
              <Link href="/tools/image" className="text-[13px] text-slate hover:text-primary transition-colors">Image Tools</Link>
              <Link href="/tools/text" className="text-[13px] text-slate hover:text-primary transition-colors">Text Tools</Link>
              <Link href="/tools/dev" className="text-[13px] text-slate hover:text-primary transition-colors">Developer Tools</Link>
              <Link href="/tools/calculators" className="text-[13px] text-slate hover:text-primary transition-colors">Calculators</Link>
              <Link href="/tools/convert" className="text-[13px] text-slate hover:text-primary transition-colors">Converters</Link>
              <Link href="/tools/qr" className="text-[13px] text-slate hover:text-primary transition-colors">QR Tools</Link>
              <Link href="/tools/seo" className="text-[13px] text-slate hover:text-primary transition-colors">SEO Tools</Link>
              <Link href="/pomodoro-timer" className="text-[13px] text-slate hover:text-primary transition-colors">Pomodoro Timer</Link>
              <Link href="/typing-speed-test" className="text-[13px] text-slate hover:text-primary transition-colors">Typing Speed Test</Link>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-[15px] text-ink mb-4">Company</h4>
            <ul className="space-y-2 flex flex-col">
              <Link href="/about" className="text-[13px] text-slate hover:text-primary transition-colors">About</Link>
              <Link href="/blog" className="text-[13px] text-slate hover:text-primary transition-colors">Blog</Link>
              <Link href="/contact" className="text-[13px] text-slate hover:text-primary transition-colors">Contact</Link>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-[15px] text-ink mb-4">Legal</h4>
            <ul className="space-y-2 flex flex-col">
              <Link href="/privacy" className="text-[13px] text-slate hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[13px] text-slate hover:text-primary transition-colors">Terms of Service</Link>
            </ul>
          </div>
        </div>
        
        <div className="w-full h-px bg-border my-8"></div>
        
        <div className="flex justify-between items-center text-[11px] text-slate font-sans">
          <span>&copy; {new Date().getFullYear()} Singulariti. All rights reserved.</span>
          <span>Designed with precision.</span>
        </div>
      </div>
    </footer>
  );
}
