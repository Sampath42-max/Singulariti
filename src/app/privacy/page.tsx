import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('privacy')!;
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

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-3">Privacy Policy</h1>
          <p className="text-sm text-slate mb-8">Last Updated: June 2026</p>
          <p className="mb-6 leading-relaxed">
            Privacy is a top priority on this website. This Privacy Policy details how information, files, and data are handled when utilizing the tools.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. No Login, Signup, or User Accounts</h2>
          <p className="mb-4 leading-relaxed">
            This website does not require or offer any login, signup, or registration system. There is no creation of user accounts, maintenance of user profile databases, or collection of personal identifiers (such as names, email addresses, or phone numbers) to access the utility tools.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. Browser-Side (Local) File Processing</h2>
          <p className="mb-4 leading-relaxed">
            Most of our tools operate entirely inside your web browser. File operations, image compression, formatting, and calculations are computed locally on your device. For these tools, files are never uploaded to our servers, keeping your documents, images, and data strictly on your device.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">3. Temporary Backend Processing</h2>
          <p className="mb-4 leading-relaxed">
            For specific heavy processing tools that require backend computation (such as local PDF conversions):
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>Files are transmitted securely via HTTPS.</li>
            <li>Processing is performed in temporary, isolated directories.</li>
            <li>No files are stored permanently.</li>
            <li>Original file names are sanitized and randomized immediately.</li>
            <li>All input files and converted outputs are deleted from the disk automatically and immediately after output streaming finishes.</li>
            <li>Exposing or storing uploaded files publicly is prohibited.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">4. No Data Collection or Selling</h2>
          <p className="mb-4 leading-relaxed">
            Personal data or uploaded file content is not sold, traded, rented, or distributed to third parties. There is no intentional collection, inspection, or retention of file contents, text entries in development tools, QR code data, image metadata, or personal documents.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">5. Usage Analytics</h2>
          <p className="mb-4 leading-relaxed">
            Basic, anonymous analytics (such as page views, browser type, and country location) may be collected solely to monitor website health and performance. Analytics configurations exclude tracking:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>Uploaded file names or contents.</li>
            <li>Text or source codes entered into utility tools.</li>
            <li>QR code strings or metadata.</li>
            <li>Images, PDFs, or generated calculations.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">6. Third-Party Advertising</h2>
          <p className="mb-4 leading-relaxed">
            Advertisements may be displayed to keep this service free, provided by third-party vendors like Google AdSense, which may use cookies to serve personalized ads based on visit history.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">7. Contact</h2>
          <p className="mb-4 leading-relaxed">
            For questions or feedback regarding this policy or the privacy practices of the utility tools, please contact Singulariti Labs:
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
