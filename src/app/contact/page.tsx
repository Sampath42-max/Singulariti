import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from './ContactForm';
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
          <p className="mb-8">
            Submit questions, feedback, or tool suggestions using the form below. You can also connect with us on{' '}
            <a href="https://x.com/singulariti_in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">X (Twitter)</a>,{' '}
            <a href="https://www.instagram.com/singulariti.in?igsh=cml2ZjI3c2ZwZHdw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Instagram</a>, and{' '}
            <a href="https://www.youtube.com/@singulariti_in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">YouTube</a>.
          </p>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
