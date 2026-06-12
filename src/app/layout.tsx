import "@/lib/polyfill";
import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Script from "next/script";
import "./globals.css";
import { DynamicStructuredData } from "@/components/seo/DynamicStructuredData";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AdsenseScript } from "@/components/seo/AdsenseScript";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://singulariti.in"),
  title: {
    default: "Online Utility Tools for PDF, Image, Text, Code, SEO and Calculations | Singulariti",
    template: "%s | Singulariti",
  },
  description: "Fast, secure, browser-based utility tools designed for creators, developers, students and professionals. Zero uploads, absolute privacy.",
  applicationName: "Singulariti",
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Singulariti", url: "https://singulariti.in" }],
  openGraph: {
    title: "Online Utility Tools for PDF, Image, Text, Code, SEO and Calculations | Singulariti",
    description: "Fast, secure, browser-based utility tools designed for creators, developers, students and professionals.",
    url: "https://singulariti.in",
    siteName: "Singulariti",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@singulariti_in",
    creator: "@singulariti_in",
    title: "Online Utility Tools for PDF, Image, Text, Code, SEO and Calculations | Singulariti",
    description: "Fast, secure, browser-based utility tools designed for creators, developers, students and professionals.",
  },
  verification: {
    google: "pP-iBJEuqbqGuEA8zoxRm675DyStL_AVhrFuJrhSJWk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(event) {
                var reason = event && event.reason;
                if (reason && (reason.type === 'cancelation' || reason.msg === 'operation is manually canceled' || reason.message === 'operation is manually canceled')) {
                  event.preventDefault();
                  event.stopImmediatePropagation();
                }
              }, { capture: true });
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Singulariti",
            "alternateName": ["Singulariti Tools", "Singulariti Utility Tools", "Singulariti Web Tools"],
            "url": "https://singulariti.in",
            "description": "Free browser-based utility tools for PDF, image, text, developer, SEO, and calculator tasks.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://singulariti.in/tools?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Singulariti",
            "url": "https://singulariti.in",
            "logo": {
              "@type": "ImageObject",
              "url": "https://singulariti.in/singulariti-prism.svg",
              "width": 512,
              "height": 512
            },
            "description": "Singulariti offers free browser-based utility tools for PDF management, image compression, text formatting, developer encoding, and calculator tasks — all processed locally with zero uploads.",
            "foundingDate": "2026-06-06",
            "sameAs": []
          })}}
        />
        <DynamicStructuredData />
        <AdsenseScript />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L34GDSVBFJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L34GDSVBFJ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <ThemeProvider>
          {children}
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
