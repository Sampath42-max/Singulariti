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
    default: "Singulariti | One Place. Every Tool.",
    template: "%s | Singulariti",
  },
  description: "Fast, secure, browser-based utility tools designed for creators, developers, students and professionals. Zero uploads, absolute privacy.",
  keywords: ["pdf tools", "image editing", "qr code generator", "online tools", "browser-based tools", "privacy-first tools", "financial calculators", "typing speed test", "utility tools"],
  openGraph: {
    title: "Singulariti | One Place. Every Tool.",
    description: "Fast, secure, browser-based utility tools designed for creators, developers, students and professionals.",
    url: "https://singulariti.in",
    siteName: "Singulariti",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singulariti | One Place. Every Tool.",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
