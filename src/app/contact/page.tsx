import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('contact')!;
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

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-8">Contact</h1>
          <p className="mb-8">Submit questions, feedback, or tool suggestions using the form below.</p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[13px] font-medium text-ink mb-2">Name</label>
              <input type="text" id="name" className="w-full h-10 px-4 rounded-md border border-border bg-surface focus:outline-primary" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-ink mb-2">Email</label>
              <input type="email" id="email" className="w-full h-10 px-4 rounded-md border border-border bg-surface focus:outline-primary" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-[13px] font-medium text-ink mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full p-4 rounded-md border border-border bg-surface focus:outline-primary" placeholder="Enter details here..."></textarea>
            </div>
            <Button variant="primary" size="lg" className="w-full cursor-pointer" type="button">
              Send Message
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
