import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryById } from '@/registry';
import { ConvertToolContainer } from '@/components/tools/convert/ConvertToolContainer';

export default async function ConvertToolPage(props: { params: Promise<{ tool: string }> }) {
  const params = await props.params;
  const category = getCategoryById('convert');
  if (!category) return notFound();

  let tool = null;
  for (const collection of category.collections) {
    const found = collection.tools.find(t => t.id === params.tool);
    if (found) {
      tool = found;
      break;
    }
  }

  if (!tool) return notFound();

  return (
    <ConvertToolContainer 
      toolId={tool.id}
      toolName={tool.name}
      toolDescription={tool.description}
    />
  );
}

export async function generateStaticParams() {
  const category = getCategoryById('convert');
  if (!category) return [];

  const paths: { tool: string }[] = [];
  category.collections.forEach(collection => {
    collection.tools.forEach(tool => {
      paths.push({ tool: tool.id });
    });
  });

  return paths;
}

export async function generateMetadata(props: { params: Promise<{ tool: string }> }) {
  const params = await props.params;
  const category = getCategoryById('convert');
  let tool = null;
  if (category) {
    for (const collection of category.collections) {
      const found = collection.tools.find(t => t.id === params.tool);
      if (found) {
        tool = found;
        break;
      }
    }
  }

  if (!tool) return {};

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `https://singulariti.app/tools/convert/${tool.id}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://singulariti.app/tools/convert/${tool.id}`,
      siteName: 'Singulariti',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}
