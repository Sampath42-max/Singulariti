import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPageSEO } from '@/lib/seo/pageMetadata';

const seo = getPageSEO('cookie-policy')!;
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

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl font-sans text-slate">
          <h1 className="font-display font-bold text-4xl text-ink mb-3">Cookie Policy</h1>
          <p className="text-sm text-slate mb-8">Last Updated: June 2026</p>
          <p className="mb-6 leading-relaxed">
            This Cookie Policy explains how Singulariti uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">1. What are cookies?</h2>
          <p className="mb-4 leading-relaxed">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">2. Why do we use cookies?</h2>
          <p className="mb-4 leading-relaxed">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">3. Third-Party Advertising (Google AdSense)</h2>
          <p className="mb-4 leading-relaxed">
            Third parties, such as Google AdSense, serve cookies on your computer or mobile device to serve advertising through our website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">4. Analytics</h2>
          <p className="mb-4 leading-relaxed">
            We may use analytics tools (such as Google Analytics) to help us measure traffic and usage trends for the service. These tools collect information sent by your device or our service, including the web pages you visit, add-ons, and other information that assists us in improving the service. This analytics data is collected in aggregate form.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">5. How can I control cookies?</h2>
          <p className="mb-4 leading-relaxed">
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">6. Updates to this policy</h2>
          <p className="mb-4 leading-relaxed">
            We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>

          <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-4">7. Contact</h2>
          <p className="mb-4 leading-relaxed">
            For questions or feedback regarding this Cookie Policy, please contact Singulariti Labs:
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
