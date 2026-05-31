import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-8">Privacy Policy</h1>
          <p className="mb-4">At Singulariti, your privacy is our highest priority.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. Local Processing</h2>
          <p className="mb-4">All file processing (such as image compression or conversion) happens entirely within your web browser. Your files are never uploaded to our servers.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. Analytics</h2>
          <p className="mb-4">We may use standard analytics to monitor website traffic and improve user experience, but this never includes access to your files or personal data.</p>
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">3. Ads</h2>
          <p className="mb-4">We may display advertisements to keep this service free, provided by third-party vendors like Google AdSense, which may use cookies to serve personalized ads based on your visit history.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
