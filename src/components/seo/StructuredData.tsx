import React from 'react';

type BreadcrumbItem = {
  name: string;
  item: string;
};

export type StructuredDataProps = {
  breadcrumbs?: BreadcrumbItem[];
  softwareApp?: {
    name: string;
    description: string;
    applicationCategory: string; // e.g. "UtilitiesApplication"
    operatingSystem?: string;
  };
};

export function StructuredData({ breadcrumbs, softwareApp }: StructuredDataProps) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://singulariti.in${crumb.item}`
              }))
            })
          }}
        />
      )}
      
      {softwareApp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": softwareApp.name,
              "description": softwareApp.description,
              "applicationCategory": softwareApp.applicationCategory,
              "operatingSystem": softwareApp.operatingSystem || "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      )}
    </>
  );
}
