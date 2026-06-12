import React from 'react';
import { seoContentRegistry } from '@/lib/seo/contentRegistry';
import { DynamicFAQSchema } from './DynamicFAQSchema';
import { CheckCircle2, ChevronDown } from 'lucide-react';

interface ToolContentBlockProps {
  utilityId: string;
  article?: string;
}

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ToolContentBlock({ utilityId, article }: ToolContentBlockProps) {
  const content = seoContentRegistry[utilityId];

  // If no content is defined for this tool yet, return null
  if (!content) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 mb-12 px-4 space-y-16">
      <DynamicFAQSchema faqs={content.faqs} />

      {article && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": `How to use the ${content.h2Title.replace('What is ', '').replace('?', '')}`,
                "author": {
                  "@type": "Organization",
                  "name": "Singulariti Editorial Team",
                  "url": "https://singulariti.in/editorial-policy"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Singulariti Labs",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://singulariti.in/og-fallback.png"
                  }
                },
                "datePublished": "2026-06-06",
                "dateModified": new Date().toISOString().split('T')[0]
              })
            }}
          />
          <div className="bg-surface/50 border border-border/60 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50 text-sm text-slate">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">S</div>
                <span className="font-medium text-ink">Singulariti Editorial Team</span>
              </div>
              <span>•</span>
              <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate prose-headings:font-display prose-headings:font-bold prose-headings:text-ink prose-strong:text-ink prose-p:font-sans prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article}
              </ReactMarkdown>
            </div>
          </div>
        </>
      )}
      
      {/* Introduction Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-ink tracking-tight">{content.h2Title}</h2>
        <div className="space-y-4 text-slate leading-relaxed text-lg">
          {content.introduction.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-ink">Why Use Our Tool?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.features.map((feature, idx) => (
            <div key={idx} className="bg-surface border border-border p-6 rounded-2xl hover:border-primary/30 transition-colors">
              <CheckCircle2 className="text-primary w-8 h-8 mb-4" />
              <h4 className="text-lg font-bold text-ink mb-2">{feature.title}</h4>
              <p className="text-slate text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How To Steps (Optional) */}
      {content.howToSteps && content.howToSteps.length > 0 && (
        <section className="space-y-6 bg-surface/50 rounded-3xl p-8 border border-border">
          <h3 className="text-2xl font-bold text-ink text-center mb-8">How to Use</h3>
          <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
            {content.howToSteps.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-ink">{step.name}</h4>
                <p className="text-sm text-slate">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section with Semantic Details/Summary */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-ink">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {content.faqs.map((faq, idx) => (
            <details key={idx} className="group bg-surface border border-border rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-ink">
                {faq.question}
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5 text-slate" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
