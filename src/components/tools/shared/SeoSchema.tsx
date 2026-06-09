import React from 'react';

interface SeoSchemaProps {
  name: string;
  description: string;
  section: string;
  canonical: string;
  collectionName?: string;
  collectionUrl?: string;
}

export function SeoSchema({ name, description, section, canonical, collectionName, collectionUrl }: SeoSchemaProps) {
  // Map sections to standard Google WebApplication categories
  const getStandardCategory = (sec: string) => {
    const s = sec.toLowerCase();
    if (s.includes('image') || s.includes('editing')) return 'PhotoVideoApplication';
    if (s.includes('pdf') || s.includes('text') || s.includes('calculator') || s.includes('convert')) return 'ProductivityApplication';
    if (s.includes('developer') || s.includes('seo') || s.includes('qr')) return 'DeveloperApplication';
    return 'UtilitiesApplication';
  };

  // 1. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "applicationCategory": getStandardCategory(section),
    "url": canonical,
    "description": description,
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0.0",
    "image": "https://singulariti.in/og-fallback.png",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Singulariti",
      "url": "https://singulariti.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://singulariti.in/og-fallback.png"
      }
    },
    "featureList": "Browser-based processing, No file upload required, Instant results, Zero privacy risk, No registration needed",
    "applicationSubCategory": "UtilityApplication",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true
  };

  // 2. BreadcrumbList Schema
  // Derive category slug from canonical URL or section
  const getSectionSlug = (sec: string) => {
    const s = sec.toLowerCase();
    if (s.includes('image editing')) return 'editing';
    if (s.includes('image')) return 'image';
    if (s.includes('pdf')) return 'tools/pdf';
    if (s.includes('qr')) return 'tools/qr';
    if (s.includes('calculator')) return 'tools/calculators';
    if (s.includes('text')) return 'tools/text';
    if (s.includes('developer')) return 'tools/dev';
    if (s.includes('unit conversion')) return 'tools/convert';
    if (s.includes('seo')) return 'tools/seo';
    return '';
  };

  const sectionSlug = getSectionSlug(section);
  const sectionUrl = `https://singulariti.in/${sectionSlug}`;

  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://singulariti.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": section,
      "item": sectionUrl
    }
  ];

  if (collectionName && collectionUrl) {
    itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": collectionName,
      "item": collectionUrl
    });
    itemListElement.push({
      "@type": "ListItem",
      "position": 4,
      "name": name,
      "item": canonical
    });
  } else {
    itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": name,
      "item": canonical
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
