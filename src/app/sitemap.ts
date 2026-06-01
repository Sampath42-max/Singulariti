import { MetadataRoute } from 'next';
import { registry } from '@/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://singulariti.app';
  const lastModified = new Date();

  const categories = registry.categories;
  
  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic Category, Collection, and Tool routes
  categories.forEach((category) => {
    // Category root (e.g., /image)
    if (category.path) {
      routes.push({
        url: `${baseUrl}${category.path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    category.collections.forEach((collection) => {
      // Collection root (e.g., /image/compression)
      if (collection.path) {
        routes.push({
          url: `${baseUrl}${collection.path}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      // Individual tools (e.g., /tools/calculators/sip-calculator)
      collection.tools.forEach((tool) => {
        if (tool.path) {
          routes.push({
            url: `${baseUrl}${tool.path}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    });
  });

  return routes;
}
