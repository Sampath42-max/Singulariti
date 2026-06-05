import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { blogSeriesList, blogGuidesList, toolRegistry, subSectionRegistry } from '@/content/tools/toolRegistry';
import { getAllPosts } from '@/lib/blog';
import { constructMetadata } from '@/lib/seo/metadata';
import { 
  Search, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ArrowRight,
  Play,
  Calendar,
  Grid,
  Lock,
  Eye,
  FileText
} from 'lucide-react';

import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('blog')!;
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

export default async function BlogHomePage() {
  const posts = getAllPosts();
  
  // Show 6 latest guides from our registry
  const recentGuides = blogGuidesList.slice(0, 6);

  // Operation types definition for the operation-based section
  const opCategories = [
    { name: "Formatter Guides", op: "formatter", desc: "Understand data beautification, code indentation, and styling." },
    { name: "Converter Guides", op: "converter", desc: "Learn file transitions, character encoding, and numeric transformations." },
    { name: "Compressor Guides", op: "compressor", desc: "Read about file size optimization, pixel density reductions, and quality ratios." },
    { name: "Calculator Guides", op: "calculator", desc: "Inspect algebraic formulas, rate calculations, and calendar computations." },
    { name: "Generator Guides", op: "generator", desc: "Discover how random strings, cryptographically secure keys, and templates are made." },
    { name: "Checker Guides", op: "checker", desc: "Analyze markup validation rules, keyword percentages, and syntax checks." },
    { name: "Editor Guides", op: "editor", desc: "Learn image cropping parameters, filters, and digital document sketch controls." },
    { name: "Scanner Guides", op: "scanner", desc: "Understand camera matrix extraction, file decoding, and MIME detectors." }
  ];

  // Privacy / Educational static guides list matching requirements
  const privacyArticles = [
    {
      title: "Why Online Utility Tools Are Useful for Everyday Digital Work",
      slug: "why-online-utility-tools-are-useful",
      description: "Understand why browser-based utility tools are essential for digital workflows, how they save time, and why local browser processing keeps files secure.",
      icon: BookOpen
    },
    {
      title: "How Browser-Side Utilities Process Files Locally",
      slug: "why-online-utility-tools-are-useful", // Anchor to privacy section
      description: "Explore the internal processing flow using Web Workers and client memory canvas sandboxes that guarantee data never leaves the computer.",
      icon: Lock
    },
    {
      title: "What Happens When a File is Uploaded for Processing",
      slug: "why-online-utility-tools-are-useful",
      description: "Learn the security differences between client-side HTML5 engines and server-side processing pipelines that require document transport.",
      icon: ShieldCheck
    },
    {
      title: "How to Use Document Utilities Safely online",
      slug: "why-online-utility-tools-are-useful",
      description: "Key rules for checking file size limits, validating credentials, and removing metadata before distributing output documents.",
      icon: Eye
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-16">
          
          {/* 1. Hero Section */}
          <section className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[13px] font-sans font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Singulariti Educational Library</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-6xl text-ink leading-tight tracking-tight">
              Utility Guides and Usage Articles
            </h1>
            
            <p className="font-sans text-base md:text-lg text-slate leading-relaxed max-w-3xl mx-auto">
              Read clear guides that explain how each utility works, what input it needs, what output it produces, and how the operation happens step by step.
            </p>
          </section>

          {/* 2. Interactive Search Form Component */}
          <section className="max-w-2xl mx-auto bg-surface border border-border p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider">Search Utility Guides</h3>
            <form action="/blog/search" method="GET" className="relative flex gap-3">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4.5 w-4.5 text-slate" />
                </span>
                <input
                  type="text"
                  name="q"
                  placeholder="Enter JSON, PDF, word counter, or calculation formulas..."
                  required
                  className="w-full font-sans text-xs text-ink bg-background border border-border rounded-xl pl-10 pr-4 py-3.5 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white font-sans font-bold text-xs px-5 py-3.5 rounded-xl transition-colors shadow-sm"
              >
                Search
              </button>
            </form>
          </section>

          {/* 3. Main Guide Series (Dashboard Layout) */}
          <section className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-primary" /> Guide Series
                </h2>
                <p className="text-slate text-sm font-sans mt-1">
                  Discover sub-sections and individual tools grouped by utility classes.
                </p>
              </div>
              <Link 
                href="/blog/series"
                className="inline-flex items-center gap-1 font-semibold text-xs text-primary hover:underline"
              >
                View All Series <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogSeriesList.map((series, idx) => {
                const count = toolRegistry.filter(t => t.sectionId === series.sectionId).length;
                const gradients = [
                  'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/20',
                  'from-emerald-500/20 to-teal-500/20 text-teal-400 border-teal-500/20',
                  'from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/20',
                  'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/20',
                  'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/20',
                  'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/20'
                ];
                const gradient = gradients[idx % gradients.length];
                
                return (
                  <div key={series.id} className="bg-surface border border-border rounded-2xl flex flex-col justify-between overflow-hidden hover:border-primary/60 transition-colors shadow-sm">
                    <div className={`h-12 bg-gradient-to-r ${gradient} border-b flex items-center px-5`} />
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-display font-bold text-base text-ink">
                            {series.name}
                          </h3>
                          <span className="text-[10px] font-mono text-slate bg-border/40 px-2.5 py-1 rounded-full font-semibold">
                            {count} utilities
                          </span>
                        </div>
                        <p className="text-xs text-slate leading-relaxed line-clamp-3">
                          {series.description}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Link 
                          href={`/blog/series/${series.slug}`}
                          className="inline-flex w-full items-center justify-center py-2.5 bg-background border border-border hover:border-primary/60 hover:bg-primary/5 rounded-xl font-sans font-semibold text-xs text-ink hover:text-primary transition-all"
                        >
                          View Guide Series
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. Recent Guides Section */}
          <section className="space-y-6 max-w-6xl mx-auto">
            <div className="border-b border-border pb-4">
              <h2 className="font-display font-bold text-2xl text-ink tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Recent Guides
              </h2>
              <p className="text-slate text-sm font-sans mt-1">
                Deep dive tutorials describing calculations, operation flows, and logic structures.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentGuides.map((guide) => {
                const tool = toolRegistry.find(t => t.id === guide.utilityId);
                const series = blogSeriesList.find(s => s.sectionId === guide.seriesId);
                const sub = subSectionRegistry.find(ss => ss.id === guide.subSeriesId);
                
                return (
                  <div key={guide.id} className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-primary/45 transition-colors shadow-sm">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5 text-[9px] font-sans font-bold uppercase tracking-wider">
                        {series && (
                          <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {series.name}
                          </span>
                        )}
                        {sub && (
                          <span className="text-slate bg-border/40 px-2 py-0.5 rounded">
                            {sub.name}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-display font-bold text-sm text-ink leading-snug line-clamp-2">
                        {guide.title}
                      </h3>
                      
                      <p className="text-xs text-slate leading-relaxed line-clamp-3">
                        {guide.metaDescription}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-6 mt-4 border-t border-border/40 text-[11px] font-sans font-semibold">
                      {tool && (
                        <Link 
                          href={tool.utilityUrl}
                          className="flex-1 text-center py-2 bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors inline-flex items-center justify-center gap-0.5"
                        >
                          <Play className="w-2.5 h-2.5 fill-white" /> Use Utility
                        </Link>
                      )}
                      <Link 
                        href={`/blog/guides/${guide.slug}`}
                        className="flex-1 text-center py-2 bg-background border border-border hover:border-primary hover:text-primary rounded-lg transition-all inline-flex items-center justify-center gap-0.5"
                      >
                        Read Guide <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. Operation-Based Guides */}
          <section className="space-y-6 max-w-6xl mx-auto">
            <div className="border-b border-border pb-4">
              <h2 className="font-display font-bold text-2xl text-ink tracking-tight flex items-center gap-2">
                <Grid className="w-5 h-5 text-primary" /> Operation-Based Guides
              </h2>
              <p className="text-slate text-sm font-sans mt-1">
                Browse guide articles filtered by specialized utility operation classes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {opCategories.map((opCat) => (
                <Link
                  key={opCat.op}
                  href={`/blog/search?op=${opCat.op}`}
                  className="bg-surface border border-border p-5 rounded-2xl hover:border-primary/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-sm text-ink group-hover:text-primary transition-colors">
                      {opCat.name}
                    </h4>
                    <p className="text-[11px] text-slate leading-relaxed font-sans">
                      {opCat.desc}
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-sans font-bold flex items-center gap-0.5 pt-4 mt-2">
                    Browse Category <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* 6. Privacy and Safe Usage Articles */}
          <section className="space-y-6 max-w-6xl mx-auto">
            <div className="border-b border-border pb-4">
              <h2 className="font-display font-bold text-2xl text-ink tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Privacy and Safe Usage Articles
              </h2>
              <p className="text-slate text-sm font-sans mt-1">
                Read educational articles explaining browser sandboxing, metadata logs, and security standards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {privacyArticles.map((art, idx) => {
                const Icon = art.icon;
                return (
                  <div key={idx} className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between hover:border-primary/45 transition-colors shadow-sm">
                    <div className="space-y-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-bold text-xs text-ink leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-slate leading-relaxed line-clamp-4 font-sans">
                        {art.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border/40 mt-4 text-xs font-semibold">
                      <Link 
                        href={`/blog/articles/${art.slug}`}
                        className="text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        Read Article <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 7. Directory Banner */}
          <section className="max-w-6xl mx-auto bg-surface/50 border border-border p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="font-display font-bold text-lg text-ink">Full Tool Directory</h3>
              <p className="text-xs text-slate leading-relaxed font-sans">
                Looking for a structured list of all available tools? Access the directory index to browse the entire hierarchy tree grouped by categories and folder structures.
              </p>
            </div>
            <Link 
              href="/blog/utility-guides"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/95 text-white font-sans font-bold text-xs rounded-xl transition-all shadow-sm flex-shrink-0"
            >
              Browse Full Directory
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
