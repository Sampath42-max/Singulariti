import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-8">Terms of Service</h1>
          <p className="mb-4">Welcome to Singulariti. By using our website, you agree to these Terms of Service.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. Usage</h2>
          <p className="mb-4">Singulariti provides free online utility tools. You may use them for personal or commercial purposes.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. Disclaimer of Warranties</h2>
          <p className="mb-4">Our services are provided "as is". While we strive for accuracy, we make no guarantees about the results produced by our tools.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
