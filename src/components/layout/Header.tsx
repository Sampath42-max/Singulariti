"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sun, Moon, Home, Wrench, LayoutGrid, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import { CommandPalette } from '../ui/CommandPalette';
import { Logo } from '../ui/Logo';
import { NavBar } from '../ui/tubelight-navbar';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Tools', url: '/tools', icon: Wrench },
  { 
    name: 'Categories', 
    url: '#', 
    icon: LayoutGrid,
    dropdownItems: [
      { name: 'PDF Tools', url: '/tools/pdf' },
      { name: 'Image Tools', url: '/tools/image' },
      { name: 'Text Tools', url: '/tools/text' },
      { name: 'Developer Tools', url: '/tools/dev' },
      { name: 'Calculators', url: '/tools/calculators' },
      { name: 'Converters', url: '/tools/convert' },
      { name: 'QR Tools', url: '/tools/qr' },
      { name: 'SEO Tools', url: '/tools/seo' },
    ]
  },
  { name: 'Blog', url: '/blog', icon: FileText }
];

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
      <header className="sticky top-0 z-40 h-[70px] w-full bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between max-w-7xl">
          
          {/* Left: Logo */}
          <div className="flex items-center w-auto lg:w-[250px]">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Center: Tubelight Navbar (Hidden on mobile top header, shows at bottom) */}
          <div className="flex-1 flex justify-center">
            <NavBar items={navItems} />
          </div>

          {/* Right: Search and Theme Toggle */}
          <div className="flex items-center justify-end gap-2 w-auto lg:w-[250px]">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center bg-background border border-border rounded-full px-3 py-1.5 text-slate w-48 hover:border-slate transition-colors text-left"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-[13px] flex-1">Search...</span>
              <kbd className="ml-auto font-mono text-[11px] bg-border px-1.5 rounded text-ink">⌘K</kbd>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-slate/10 text-slate transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {mounted && (
              <button 
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-slate/10 text-slate transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>

        </div>
      </header>
      
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
