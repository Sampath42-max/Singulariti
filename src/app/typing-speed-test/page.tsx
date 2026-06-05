import React from 'react';
import { TypingTestContainer } from '@/components/typing/TypingTestContainer';
import { TypingSeoContent } from '@/components/typing/TypingSeoContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('typing-speed-test')!;
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

export default function TypingSpeedTestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Typing Speed Test',
    description: 'Free online typing speed test to measure WPM and accuracy.',
    url: 'https://singulariti.in/typing-speed-test',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Singulariti Typing Speed Test',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is WPM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WPM stands for Words Per Minute. It is the standard measurement for typing speed, where one word is standardized as 5 keystrokes.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is typing speed calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typing speed is calculated by taking the total number of correctly typed characters, dividing by 5 to get standard words, and then dividing by the elapsed time in minutes.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      
      <Header />
      <main className="min-h-screen bg-background flex flex-col items-center pt-24 pb-12 w-full">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Typing Speed Test</h1>
            <p className="text-slate font-sans max-w-2xl mx-auto">Test your WPM, analyze your mistakes, and improve your typing accuracy.</p>
          </div>
          
          <TypingTestContainer />
          
          <div className="mt-32 border-t border-border pt-16">
            <TypingSeoContent />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
