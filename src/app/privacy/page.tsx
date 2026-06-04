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
          <p className="mb-6 leading-relaxed">
            At Singulariti, your privacy is our highest priority. This Privacy Policy details how we handle information, files, and data when you use our website.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. No Login, Signup, or User Accounts</h2>
          <p className="mb-4 leading-relaxed">
            Our website does not require or offer any login, signup, or registration system. We do not create user accounts, maintain user profile databases, or collect any personal identifiers (such as names, email addresses, or phone numbers) to access our utility tools.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. Browser-Side (Local) File Processing</h2>
          <p className="mb-4 leading-relaxed">
            The vast majority of our tools operate entirely inside your web browser. File operations, image compression, formatting, conversions, and calculations are computed locally on your device. Your files are not uploaded to our servers, keeping your documents, images, and data strictly on your computer.
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
            <li>Exposing or storing uploaded files publicly is strictly prohibited.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">4. No Data Collection or Selling</h2>
          <p className="mb-4 leading-relaxed">
            We do not sell, trade, rent, or distribute personal data or user-uploaded file content to any third parties. We do not intentionally collect, inspect, or retain file contents, text entries in development tools, QR code data, image metadata, or personal documents.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">5. Usage Analytics</h2>
          <p className="mb-4 leading-relaxed">
            We may collect basic, anonymous analytics (such as page views, browser type, and country location) solely to monitor website health and performance. Our analytics configurations strictly exclude tracking:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>Uploaded file names or contents.</li>
            <li>Text or source codes entered into utility tools.</li>
            <li>QR code strings or metadata.</li>
            <li>Images, PDFs, or generated calculations.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">6. Third-Party Advertising</h2>
          <p className="mb-4 leading-relaxed">
            We may display advertisements to keep this service free, provided by third-party vendors like Google AdSense, which may use cookies to serve personalized ads based on your visit history.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">7. Contact</h2>
          <p className="mb-4 leading-relaxed">
            If you have any questions or feedback regarding this policy or the privacy practices of our tools, you can contact the website owner.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
