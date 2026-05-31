import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-8">About Singulariti</h1>
          <p className="mb-4">Singulariti is a premium utility tools ecosystem designed to offer the best, most secure, and fastest tools available on the web.</p>
          <p className="mb-4">Our philosophy is simple: tools should work for you, instantly, without compromising your privacy. We achieve this by running our processing engines entirely within your browser using modern Web APIs.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
