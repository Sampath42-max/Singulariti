import { MetadataRoute } from 'next';
import { registry } from '@/registry';
import { blogSeriesList, blogSubSeriesList, blogGuidesList } from '@/content/tools/toolRegistry';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://singulariti.in';

  // Static dates to preserve crawl budget
  const STATIC_DATE = new Date('2026-06-01');
  const TOOLS_DATE = new Date('2026-06-07');
  const lastModified = TOOLS_DATE;

  const categories = registry.categories;

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_DATE,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_DATE,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/series`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/utility-guides`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/typing-speed-test`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pomodoro-timer`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/editing/online-whiteboard`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/image/editor`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
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

  // Blog Series (e.g., /blog/series/pdf-utilities)
  blogSeriesList.forEach((series) => {
    routes.push({
      url: `${baseUrl}/blog/series/${series.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Blog Sub-Series (e.g., /blog/series/pdf-utilities/management-utilities)
    const subSections = blogSubSeriesList.filter(ss => ss.seriesId === series.id);
    subSections.forEach((sub) => {
      routes.push({
        url: `${baseUrl}/blog/series/${series.slug}/${sub.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Blog Guides (e.g., /blog/guides/word-counter-guide)
  blogGuidesList.forEach((guide) => {
    routes.push({
      url: `${baseUrl}/blog/guides/${guide.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Blog Articles (non-tool guides, e.g., /blog/articles/why-online-utility-tools-are-useful)
  const posts = getAllPosts();
  const articles = posts.filter(p => !p.toolUrl);
  articles.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/articles/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return routes;
}
