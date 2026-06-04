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
          <p className="mb-6 leading-relaxed">
            Welcome to Singulariti. By using our website and utility tools, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. Permitted Use</h2>
          <p className="mb-4 leading-relaxed">
            Singulariti provides online utility tools (image processing, PDF adjustments, calculators, developers tools) for general utility use. You may use them for personal, educational, or commercial purposes.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. User Responsibility</h2>
          <p className="mb-4 leading-relaxed">
            You retain full ownership, responsibility, and liability for all files, text, and inputs you upload, paste, or process using our tools. You must ensure that you have all necessary rights, licenses, and permissions to process these files.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">3. Prohibited Activities</h2>
          <p className="mb-4 leading-relaxed">
            You agree not to use our website or tools for any illegal, harmful, malicious, or abusive activity. This includes, but is not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>Processing copyrighted files or documents without authorization.</li>
            <li>Attempting to upload viruses, malware, or executing payload scripts designed to bypass safety boundaries.</li>
            <li>Using tools to generate harmful, fraudulent, or abusive outputs (such as malicious QR codes or fraudulent documents).</li>
            <li>Abusing the server endpoints via scripts, spam, or high-volume automated traffic that breaches our rate limit rules.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">4. Disclaimer of Warranties</h2>
          <p className="mb-4 leading-relaxed">
            Our services are provided on an "as is" and "as available" basis. While we strive for accuracy, Singulariti does not guarantee perfect conversion, compression, formatting, or calculation results. We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of tool outputs.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">5. Output Verification</h2>
          <p className="mb-4 leading-relaxed">
            You should verify and double-check all critical outputs (especially financial calculations, tax calculations, formatted code, or compiled documents) before using them in official, professional, or financial contexts.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">6. Changes to Terms</h2>
          <p className="mb-4 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Your continued use of the website following any changes signifies your acceptance of the updated terms.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
