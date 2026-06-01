import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolEngine } from '@/components/tool/ToolEngine';
import { EditingEngine } from '@/components/tool/EditingEngine';
import { UtilityEngine } from '@/components/tool/UtilityEngine';
import { DeveloperEngine } from '@/components/tool/DeveloperEngine';
import { SingleFeatureEditorClient } from '@/components/tools/image-editor/SingleFeatureEditorClient';
import { getToolByPath, getCategoryById } from '@/registry';

const EngineMap: Record<string, React.ElementType> = {
  compression: ToolEngine,
  conversion: ToolEngine,
  editing: EditingEngine,
  utility: UtilityEngine,
  developer: DeveloperEngine,
  'single-editing': SingleFeatureEditorClient
};

export default async function ToolPage(props: { params: Promise<{ collection: string; tool: string }> }) {
  const params = await props.params;
  const category = getCategoryById('editing');
  if (!category) return notFound();

  const collection = category.collections.find(c => c.id === params.collection);
  if (!collection) return notFound();

  const tool = collection.tools.find(t => t.id === params.tool);
  if (!tool) return notFound();

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-12">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-7xl mb-8">
          <nav className="flex text-[13px] font-sans text-slate">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/editing" className="hover:text-ink">Editing</Link>
            <span className="mx-2">/</span>
            <Link href={`/editing/${collection.id}`} className="hover:text-ink">{collection.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-ink font-medium">{tool.name}</span>
          </nav>
        </div>

        {/* Tool Header */}
        <section className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="font-display font-bold text-4xl text-ink mb-4">
            {tool.name}
          </h1>
          <p className="font-sans text-lg text-slate">
            {tool.description}
          </p>
        </section>

        {/* Engine UI */}
        <section className="container mx-auto px-4">
          {React.createElement(EngineMap[tool.engine] || ToolEngine, { tool })}
        </section>

        {/* SEO / Content Section */}
        <section className="container mx-auto px-4 max-w-3xl mt-16 text-slate font-sans">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold font-display text-ink mb-4">About {tool.name}</h2>
            <p className="mb-6">
              Welcome to the best online {tool.name}. Our tool is designed to be fast, secure, and run entirely within your web browser. This means that your files are never uploaded to our servers, ensuring your data remains completely private.
            </p>
            <h3 className="text-xl font-bold font-display text-ink mb-3">How it Works</h3>
            <p className="mb-6">
              Singulariti uses advanced WebAssembly and browser APIs like Web Workers and OffscreenCanvas to process images efficiently. When you select a file, the processing occurs locally using your device's resources. This eliminates upload/download times and provides instantaneous results.
            </p>
            <h3 className="text-xl font-bold font-display text-ink mb-3">Benefits of Browser-based Tools</h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Zero Privacy Risks:</strong> Your files never leave your device.</li>
              <li className="mb-2"><strong>No File Size Limits:</strong> Because there is no server upload, you aren't restricted by arbitrary server constraints.</li>
              <li className="mb-2"><strong>Instant Execution:</strong> Processing starts immediately.</li>
            </ul>
          </article>
        </section>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": tool.name,
              "description": tool.seoDescription,
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any"
            })
          }}
        />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const category = getCategoryById('editing');
  if (!category) return [];

  const paths: { collection: string; tool: string }[] = [];

  category.collections.forEach(collection => {
    collection.tools.forEach(tool => {
      paths.push({
        collection: collection.id,
        tool: tool.id
      });
    });
  });

  return paths;
}

export async function generateMetadata(props: { params: Promise<{ collection: string; tool: string }> }) {
  const params = await props.params;
  const category = getCategoryById('editing');
  const collection = category?.collections.find(c => c.id === params.collection);
  const tool = collection?.tools.find(t => t.id === params.tool);

  if (!tool) return {};

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `https://singulariti.app/editing/${params.collection}/${tool.id}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://singulariti.app/editing/${params.collection}/${tool.id}`,
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
