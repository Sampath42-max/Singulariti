import type { Metadata } from "next";

export interface MetadataOptions {
  title: string;
  description: string;
  path?: string; // URL path without domain, e.g., "/about" or "/tools/text/word-counter"
  robots?: 'index' | 'noindex' | { index: boolean; follow: boolean };
  type?: 'website' | 'article';
  image?: string; // path or URL, e.g., "/og-fallback.png"
  publishedTime?: string;
  updatedAt?: string;
}

const BASE_URL = 'https://singulariti.in';
const DEFAULT_OG_IMAGE = 'https://singulariti.in/og-fallback.png';

export function constructMetadata({
  title,
  description,
  path = '',
  robots = 'index',
  type = 'website',
  image,
  publishedTime,
  updatedAt,
}: MetadataOptions): Metadata {
  // Ensure paths are formatted properly without trailing slash unless it's homepage
  let cleanPath = path;
  if (cleanPath && cleanPath !== '/') {
    cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    // Strip trailing slash if present
    if (cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
  } else {
    cleanPath = '';
  }

  const canonicalUrl = `${BASE_URL}${cleanPath}`;
  
  const robotsConfig = robots === 'noindex' 
    ? { index: false, follow: true } 
    : (typeof robots === 'object' ? robots : { index: true, follow: true });

  const imageUrl = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsConfig,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Singulariti',
      locale: 'en_US',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime: updatedAt,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export interface BuildMetadataInput {
  title: string;
  description: string;
  canonical: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: "website" | "article";
    image?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.canonical,
    },
    robots: input.robots ?? {
      index: true,
      follow: true,
    },
    openGraph: {
      title: input.openGraph?.title ?? input.title,
      description: input.openGraph?.description ?? input.description,
      url: input.openGraph?.url ?? input.canonical,
      type: input.openGraph?.type ?? "website",
      images: [
        {
          url: input.openGraph?.image ?? "https://singulariti.in/og-fallback.png",
          alt: input.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.twitter?.title ?? input.title,
      description: input.twitter?.description ?? input.description,
      images: [input.twitter?.image ?? input.openGraph?.image ?? "https://singulariti.in/og-fallback.png"],
    },
  };
}

