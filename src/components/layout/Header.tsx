"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { CommandPalette } from '../ui/CommandPalette';
import { Logo } from '../ui/Logo';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      <header className="sticky top-0 z-50 h-[60px] w-full bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center bg-background border border-border rounded-md px-3 py-1.5 text-slate w-64 hover:border-slate transition-colors text-left"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-[13px] flex-1">Search tools...</span>
              <kbd className="ml-auto font-mono text-[11px] bg-border px-1.5 rounded text-ink">Ctrl+K</kbd>
            </button>
          </div>

          <nav className="flex items-center gap-4">
            <Link href="/tools" className="hidden md:block text-[15px] font-sans font-medium text-slate hover:text-primary transition-colors">Tools</Link>
            <Link href="/blog" className="hidden md:block text-[15px] font-sans font-medium text-slate hover:text-primary transition-colors">Blog</Link>
            
            {mounted && (
              <button 
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-slate/10 text-slate transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-slate/10 text-slate transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>
      
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
