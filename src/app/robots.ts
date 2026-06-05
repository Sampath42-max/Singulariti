import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Standard exclusion for API routes if any
    },
    sitemap: 'https://singulariti.in/sitemap.xml',
  };
}
