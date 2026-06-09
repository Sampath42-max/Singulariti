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
  
  let robotsConfig;
  if (robots === 'noindex') {
    robotsConfig = { index: false, follow: true };
  } else if (typeof robots === 'object') {
    robotsConfig = {
      ...robots,
      googleBot: {
        index: robots.index,
        follow: robots.follow,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      }
    };
  } else {
    robotsConfig = {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    };
  }

  const imageUrl = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : DEFAULT_OG_IMAGE;

  const finalTitle = title.endsWith(' | Singulariti') ? { absolute: title } : title;

  return {
    title: finalTitle,
    description,
    authors: [{ name: "Singulariti", url: "https://singulariti.in" }],
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsConfig,
    openGraph: {
      title: typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute,
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
          alt: typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime: updatedAt,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@singulariti_in',
      creator: '@singulariti_in',
      title: typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute,
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
  const finalTitle = input.title.endsWith(' | Singulariti') ? { absolute: input.title } : input.title;
  const titleString = typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute;

  const robotsConfig = input.robots
    ? {
        ...input.robots,
        googleBot: {
          index: input.robots.index,
          follow: input.robots.follow,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        }
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      };

  return {
    title: finalTitle,
    description: input.description,
    authors: [{ name: "Singulariti", url: "https://singulariti.in" }],
    alternates: {
      canonical: input.canonical,
    },
    robots: robotsConfig,
    openGraph: {
      title: input.openGraph?.title ?? titleString,
      description: input.openGraph?.description ?? input.description,
      url: input.openGraph?.url ?? input.canonical,
      siteName: 'Singulariti',
      locale: 'en_US',
      type: input.openGraph?.type ?? "website",
      images: [
        {
          url: input.openGraph?.image ?? "https://singulariti.in/og-fallback.png",
          alt: titleString,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: '@singulariti_in',
      creator: '@singulariti_in',
      title: input.twitter?.title ?? titleString,
      description: input.twitter?.description ?? input.description,
      images: [input.twitter?.image ?? input.openGraph?.image ?? "https://singulariti.in/og-fallback.png"],
    },
  };
}

