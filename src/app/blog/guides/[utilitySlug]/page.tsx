import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { FAQSection } from '@/components/blog/FAQSection';
import { RelatedTools } from '@/components/blog/RelatedTools';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { constructMetadata } from '@/lib/seo/metadata';
import { getPostBySlug } from '@/lib/blog';
import { toolRegistry, sectionRegistry, subSectionRegistry } from '@/content/tools/toolRegistry';
import { Calendar, ArrowLeft, ChevronRight, Shield, Play } from 'lucide-react';

interface PageProps {
  params: Promise<{ utilitySlug: string }>;
}

export async function generateStaticParams() {
  return toolRegistry.map((tool) => ({
    utilitySlug: tool.guideSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { utilitySlug } = await params;
  const post = getPostBySlug(utilitySlug);
  
  if (!post) {
    return {
      title: 'Guide Not Found',
    };
  }

  return constructMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/guides/${post.slug}`,
    type: 'article',
    image: post.featuredImage || undefined,
    publishedTime: post.publishedAt,
    updatedAt: post.updatedAt,
  });
}

export default async function UtilityGuidePage({ params }: PageProps) {
  const { utilitySlug } = await params;
  const post = getPostBySlug(utilitySlug);

  // Look up tool metadata in our registry
  const tool = toolRegistry.find(t => t.guideSlug === utilitySlug);

  if (!post || !tool) {
    notFound();
  }

  const section = sectionRegistry.find(s => s.id === tool.sectionId);
  const subSection = subSectionRegistry.find(ss => ss.id === tool.subSectionId);

  // Schema Markup generation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://singulariti.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://singulariti.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://singulariti.in/blog/guides/${tool.guideSlug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.featuredImage ? `https://singulariti.in${post.featuredImage}` : undefined,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "Singulariti"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Singulariti",
      "logo": {
        "@type": "ImageObject",
        "url": "https://singulariti.in/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://singulariti.in/blog/guides/${post.slug}`
    }
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {/* Inject schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header />
      <main className="flex-1 w-full bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[13px] font-sans text-slate mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            {section && (
              <>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                <Link href={`/blog/series/${section.slug}`} className="hover:text-primary transition-colors">{section.name}</Link>
              </>
            )}
            {section && subSection && (
              <>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                <Link href={`/blog/series/${section.slug}/${subSection.slug}`} className="hover:text-primary transition-colors">{subSection.name}</Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-sm">{tool.name}</span>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {section?.name || 'Utility'}
              </span>
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate bg-border/40 px-2.5 py-1 rounded-full">
                {subSection?.name || 'General'}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-5xl text-ink leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60 text-slate text-[13px] font-sans">
              <div className="flex items-center gap-6">
                {post.updatedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    Updated: <strong>{post.updatedAt}</strong>
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-medium text-[12px] text-primary">Local Browser-Side Processing</span>
              </div>
            </div>
          </header>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* Sidebar Table of Contents */}
            <aside className="hidden lg:block lg:col-span-1">
              <TableOfContents htmlContent={JSON.stringify(post.sections)} />
            </aside>

            {/* Post Workspace */}
            <div className="lg:col-span-3 space-y-10 max-w-3xl">
              
              {/* Tool CTA Block */}
              <div className="p-6 bg-primary/[0.03] border border-primary/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1.5 text-center md:text-left">
                  <h4 className="font-sans font-bold text-sm text-ink">Utility: {tool.name}</h4>
                  <p className="font-sans text-xs text-slate max-w-md">{tool.shortDescription}</p>
                </div>
                <div className="flex gap-2.5 w-full md:w-auto">
                  <Link 
                    href={tool.utilityUrl}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center px-5 py-3 bg-primary hover:bg-primary/95 text-white font-sans font-bold text-xs rounded-xl transition-all shadow-sm gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Use Utility
                  </Link>
                  {section && (
                    <Link 
                      href={`/blog/series/${section.slug}`}
                      className="flex-1 md:flex-initial inline-flex items-center justify-center px-5 py-3 bg-background border border-border hover:border-primary hover:text-primary text-slate font-sans font-semibold text-xs rounded-xl transition-all"
                    >
                      Back to {section.name} Guides
                    </Link>
                  )}
                </div>
              </div>

              {/* Back Navigation buttons under title (requested) */}
              {section && (
                <div className="flex flex-wrap gap-3 text-xs font-sans font-semibold">
                  <Link 
                    href={`/blog/series/${section.slug}`}
                    className="px-4 py-2 bg-surface border border-border hover:border-primary hover:text-primary rounded-xl transition-all"
                  >
                    Back to {section.name}
                  </Link>
                  {subSection && (
                    <Link 
                      href={`/blog/series/${section.slug}/${subSection.slug}`}
                      className="px-4 py-2 bg-surface border border-border hover:border-primary hover:text-primary rounded-xl transition-all"
                    >
                      Back to {subSection.name}
                    </Link>
                  )}
                </div>
              )}

              {/* Structured Article Content */}
              <BlogArticle post={post} />

              {/* FAQ Section Accordion */}
              <FAQSection faqs={post.faqs} />

              {/* Related Tools Navigation Links */}
              <RelatedTools tools={post.relatedTools} />

              {/* Back to Blog Button */}
              <div className="pt-6 border-t border-border/40 flex flex-wrap gap-4 text-xs font-sans font-semibold">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-slate hover:text-primary transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Blog Home
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
