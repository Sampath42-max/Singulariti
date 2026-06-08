import { buildMetadata } from '@/lib/seo/metadata';
import { getUtilitySEO } from '@/lib/seo/utilityMetadata';
import { MetadataViewerClient } from './MetadataViewerClient';
import NoSSR from '@/components/NoSSR';

const seo = getUtilitySEO('metadata-viewer')!;
export const metadata = buildMetadata({
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

export default function MetadataViewerPage() {
  return (
    <NoSSR>
      <MetadataViewerClient />
    </NoSSR>
  );
}

