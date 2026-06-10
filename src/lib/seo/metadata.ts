import type { Metadata } from "next";

export function generateKeywords(title: string, description: string, customKeywords?: string[] | string): string[] {
  if (customKeywords) {
    return Array.isArray(customKeywords) ? customKeywords : customKeywords.split(',').map(k => k.trim());
  }

  const keywordsSet = new Set<string>();

  // 1. Core terms from the title (lowercase, normalized)
  const titleWords = title
    .toLowerCase()
    .replace(/[|–\-—,.:;|()]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 2);

  // Stop words to exclude from raw keyword extraction
  const stopWords = new Set([
    'and', 'the', 'for', 'you', 'with', 'from', 'your', 'free', 'online', 
    'tool', 'browser', 'local', 'private', 'secure', 'safe', 'without', 
    'uploads', 'login', 'signup', 'singulariti'
  ]);

  // Description text lowercase for duplicate check
  const descLower = description.toLowerCase();

  // Helper to check if a word is heavily used in the description
  const countOccurrences = (str: string, word: string) => {
    return str.split(word).length - 1;
  };

  // Add key terms from the title if they aren't overly used in description
  titleWords.forEach(word => {
    if (!stopWords.has(word)) {
      // If it appears less than twice in description, it's not mostly used in description
      if (countOccurrences(descLower, word) < 2) {
        keywordsSet.add(word);
      }
    }
  });

  // 2. Add typical action/modifier combinations
  const cleanTitle = title.split(/[|–\-—|]/)[0].trim();
  const toolBase = cleanTitle.toLowerCase().replace('free', '').replace('online', '').trim();

  if (toolBase.length > 3) {
    keywordsSet.add(`${toolBase} free`);
    keywordsSet.add(`browser ${toolBase}`);
    keywordsSet.add(`offline ${toolBase}`);
    keywordsSet.add(`${toolBase} online`);
    keywordsSet.add(`privacy safe ${toolBase}`);
    keywordsSet.add(`local ${toolBase}`);
  }

  // 3. Add category-specific keywords based on words in title
  const titleLower = title.toLowerCase();
  if (titleLower.includes('pdf')) {
    keywordsSet.add('pdf editor');
    keywordsSet.add('convert pdf');
    keywordsSet.add('pdf utility');
    keywordsSet.add('no upload pdf');
  } else if (titleLower.includes('image') || titleLower.includes('jpg') || titleLower.includes('png') || titleLower.includes('webp')) {
    keywordsSet.add('image optimizer');
    keywordsSet.add('convert image');
    keywordsSet.add('image converter');
    keywordsSet.add('privacy photo tool');
  } else if (titleLower.includes('json') || titleLower.includes('xml') || titleLower.includes('sql') || titleLower.includes('yaml')) {
    keywordsSet.add('code formatter');
    keywordsSet.add('developer utility');
    keywordsSet.add('json formatter online');
    keywordsSet.add('parse json');
  } else if (titleLower.includes('calculator')) {
    keywordsSet.add('free calculator');
    keywordsSet.add('online calculator');
    keywordsSet.add('math calculation');
  } else if (titleLower.includes('qr')) {
    keywordsSet.add('qr maker');
    keywordsSet.add('qr code scanner');
    keywordsSet.add('custom qr');
  }

  return Array.from(keywordsSet).slice(0, 12);
}

export interface MetadataOptions {
  title: string;
  description: string;
  path?: string; // URL path without domain, e.g., "/about" or "/tools/text/word-counter"
  robots?: 'index' | 'noindex' | { index: boolean; follow: boolean };
  type?: 'website' | 'article';
  image?: string; // path or URL, e.g., "/og-fallback.png"
  publishedTime?: string;
  updatedAt?: string;
  keywords?: string[] | string;
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
  keywords,
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
    keywords,
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
  keywords?: string[] | string;
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
    keywords: input.keywords,
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

