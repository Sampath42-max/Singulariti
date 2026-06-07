import "@/lib/polyfill";
import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

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
    title: "Online Utility Tools for PDF, Image, Text, Code, SEO and Calculations | Singulariti",
    description: "Fast, secure, browser-based utility tools designed for creators, developers, students and professionals.",
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
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
