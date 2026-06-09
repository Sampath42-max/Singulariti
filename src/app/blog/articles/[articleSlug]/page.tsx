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
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Calendar, ArrowLeft, ChevronRight, Shield } from 'lucide-react';

interface PageProps {
  params: Promise<{ articleSlug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  // Return post slugs for general articles (non-tool guides)
  return posts.filter(p => !p.toolUrl).map((post) => ({
    articleSlug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  const post = getPostBySlug(articleSlug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return constructMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/articles/${post.slug}`,
    type: 'article',
    image: post.featuredImage || undefined,
    publishedTime: post.publishedAt,
    updatedAt: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { articleSlug } = await params;
  const post = getPostBySlug(articleSlug);

  if (!post) {
    notFound();
  }

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
        "name": post.title,
        "item": `https://singulariti.in/blog/articles/${post.slug}`
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
      "@id": `https://singulariti.in/blog/articles/${post.slug}`
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
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-sm">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {post.category}
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
              {post.toolUrl && (
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="font-sans text-sm text-slate text-center sm:text-left leading-relaxed">
                    Use this utility: <strong>{post.toolUrl}</strong>. Run calculations and formatting locally with absolute privacy.
                  </div>
                  <Link 
                    href={post.toolUrl}
                    className="inline-flex items-center justify-center px-5 py-3 bg-primary hover:bg-primary/95 text-white font-sans font-bold text-xs rounded-xl transition-all shadow-sm flex-shrink-0"
                  >
                    Open Utility
                  </Link>
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
