import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('terms')!;
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

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-3">Terms of Service</h1>
          <p className="text-sm text-slate mb-8">Last Updated: June 2026</p>
          <p className="mb-6 leading-relaxed">
            Welcome to Singulariti. By using this website and the utility tools, users agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. Permitted Use</h2>
          <p className="mb-4 leading-relaxed">
            Singulariti provides online utility tools (image processing, PDF adjustments, calculators, developer tools) for general utility use. Users may use them for personal, educational, or commercial purposes.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. User Responsibility</h2>
          <p className="mb-4 leading-relaxed">
            Users retain full ownership, responsibility, and liability for all files, text, and inputs uploaded, pasted, or processed using the tools. Users must ensure that they have all necessary rights, licenses, and permissions to process these files.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">3. Prohibited Activities</h2>
          <p className="mb-4 leading-relaxed">
            Users agree not to use this website or the tools for any illegal, harmful, malicious, or abusive activity. This includes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>Processing copyrighted files or documents without authorization.</li>
            <li>Attempting to upload viruses, malware, or executing payload scripts designed to bypass safety boundaries.</li>
            <li>Using tools to generate harmful, fraudulent, or abusive outputs (such as malicious QR codes or fraudulent documents).</li>
            <li>Abusing the server endpoints via scripts, spam, or high-volume automated traffic that breaches rate limit rules.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">4. Disclaimer of Warranties</h2>
          <p className="mb-4 leading-relaxed">
            The services are provided on an "as is" and "as available" basis. While accuracy is prioritized, Singulariti does not guarantee conversion, compression, formatting, or calculation results. No warranties, express or implied, are made regarding the accuracy, completeness, or reliability of tool outputs.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">5. Output Verification</h2>
          <p className="mb-4 leading-relaxed">
            Users should verify and double-check all critical outputs (especially financial calculations, tax calculations, formatted code, or compiled documents) before using them in official, professional, or financial contexts.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">6. Changes to Terms</h2>
          <p className="mb-4 leading-relaxed">
            The right is reserved to modify these Terms of Service at any time. Continued use of the website following changes signifies acceptance of the updated terms.
          </p>
          
          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">7. Contact</h2>
          <p className="mb-4 leading-relaxed">
            For questions or feedback regarding these terms, please contact Singulariti Labs:
          </p>
          <div className="bg-surface border border-border rounded-xl p-6 mt-6 mb-8">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Singulariti Labs</h3>
            <p className="mb-2 text-[15px]"><strong>Email:</strong> <a href="mailto:singulariti.contact@gmail.com" className="text-primary hover:underline">singulariti.contact@gmail.com</a></p>
            <p className="text-[15px]"><strong>Address:</strong> Visakhapatnam, Andhra Pradesh 530001, India</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
