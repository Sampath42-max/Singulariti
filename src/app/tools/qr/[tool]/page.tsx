import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';
import React from 'react';
import { notFound } from 'next/navigation';
import { getToolByPath, getCategoryById } from '@/registry';
import { QrCodeGeneratorClient } from '../qr-code-generator/QrCodeGeneratorClient';
import { QRType } from '@/lib/qr/qrHelpers';

export default async function QRToolPage(props: { params: Promise<{ tool: string }> }) {
  const params = await props.params;
  const category = getCategoryById('qr');
  if (!category) return notFound();

  // QR tools are all in the 'qr-tools' collection
  const collection = category.collections.find(c => c.id === 'qr-tools');
  if (!collection) return notFound();

  const tool = collection.tools.find(t => t.id === params.tool);
  if (!tool) return notFound();

  // Ensure it's a standalone tool
  if (tool.engine !== 'qr-standalone') return notFound();

  const initialType = (tool.options?.type as QRType) || 'url';

  return (
    <QrCodeGeneratorClient 
      initialType={initialType} 
      isStandalone={true}
      toolName={tool.name}
      toolDescription={tool.description}
      toolSeoTitle={tool.seoTitle}
      toolSeoDescription={tool.seoDescription}
    />
  );
}

export async function generateStaticParams() {
  const category = getCategoryById('qr');
  if (!category) return [];

  const collection = category.collections.find(c => c.id === 'qr-tools');
  if (!collection) return [];

  const paths: { tool: string }[] = [];
  
  collection.tools.forEach(tool => {
    if (tool.engine === 'qr-standalone') {
      paths.push({ tool: tool.id });
    }
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
