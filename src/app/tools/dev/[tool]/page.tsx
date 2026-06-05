import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';
import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryById } from '@/registry';
import { DevToolContainer } from '@/components/tools/dev/DevToolContainer';

export default async function DevToolPage(props: { params: Promise<{ tool: string }> }) {
  const params = await props.params;
  const category = getCategoryById('dev');
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
    <DevToolContainer 
      toolId={tool.id}
      toolName={tool.name}
      toolDescription={tool.description}
    />
  );
}

export async function generateStaticParams() {
  const category = getCategoryById('dev');
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
  const seo = getUtilitySEO(params.tool);

  if (!seo) {
    return {
      title: 'Utility Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    robots: seo.robots,
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.openGraph.url,
      type: seo.openGraph.type,
      image: seo.openGraph.image,
    },
    twitter: {
      title: seo.twitter.title,
      description: seo.twitter.description,
      image: seo.twitter.image,
    },
  });
}
