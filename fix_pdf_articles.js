const fs = require('fs');
const path = require('path');

// PDF tools and their client component/function names
const pdfTools = [
  { id: 'delete-pdf-pages', dir: 'delete-pdf-pages', clientFile: 'DeletePdfPagesPageClient', clientFn: 'DeletePdfPagesPageClient', innerImport: 'DeletePdfPagesClient', innerFile: 'DeletePdfPagesClient', innerFn: 'DeletePdfPagesClient' },
  { id: 'extract-pdf-pages', dir: 'extract-pdf-pages', clientFile: 'ExtractPdfPagesPageClient', clientFn: 'ExtractPdfPagesPageClient', innerImport: 'ExtractPdfPagesClient', innerFile: 'ExtractPdfPagesClient', innerFn: 'ExtractPdfPagesClient' },
  { id: 'jpg-to-pdf', dir: 'jpg-to-pdf', clientFile: 'JpgToPdfPageClient', clientFn: 'JpgToPdfPageClient', innerImport: 'JpgToPdfClient', innerFile: 'JpgToPdfClient', innerFn: 'JpgToPdfClient' },
  { id: 'merge-pdf', dir: 'merge-pdf', clientFile: 'MergePdfPageClient', clientFn: 'MergePdfPageClient', innerImport: 'MergePdfClient', innerFile: 'MergePdfClient', innerFn: 'MergePdfClient' },
  { id: 'metadata-viewer', dir: 'metadata-viewer', clientFile: 'MetadataViewerPageClient', clientFn: 'MetadataViewerPageClient', innerImport: 'MetadataViewerClient', innerFile: 'MetadataViewerClient', innerFn: 'MetadataViewerClient' },
  { id: 'page-counter', dir: 'page-counter', clientFile: 'PageCounterPageClient', clientFn: 'PageCounterPageClient', innerImport: 'PageCounterClient', innerFile: 'PageCounterClient', innerFn: 'PageCounterClient' },
  { id: 'pdf-to-jpg', dir: 'pdf-to-jpg', clientFile: 'PdfToJpgPageClient', clientFn: 'PdfToJpgPageClient', innerImport: 'PdfToJpgClient', innerFile: 'PdfToJpgClient', innerFn: 'PdfToJpgClient' },
  { id: 'pdf-to-text', dir: 'pdf-to-text', clientFile: 'PdfToTextPageClient', clientFn: 'PdfToTextPageClient', innerImport: 'PdfToTextClient', innerFile: 'PdfToTextClient', innerFn: 'PdfToTextClient' },
  { id: 'protect-pdf', dir: 'protect-pdf', clientFile: 'ProtectPdfPageClient', clientFn: 'ProtectPdfPageClient', innerImport: 'ProtectPdfClient', innerFile: 'ProtectPdfClient', innerFn: 'ProtectPdfClient' },
  { id: 'rearrange-pdf-pages', dir: 'rearrange-pdf-pages', clientFile: 'RearrangePdfPagesPageClient', clientFn: 'RearrangePdfPagesPageClient', innerImport: 'RearrangePdfPagesClient', innerFile: 'RearrangePdfPagesClient', innerFn: 'RearrangePdfPagesClient' },
  { id: 'rotate-pdf', dir: 'rotate-pdf', clientFile: 'RotatePdfPageClient', clientFn: 'RotatePdfPageClient', innerImport: 'RotatePdfClient', innerFile: 'RotatePdfClient', innerFn: 'RotatePdfClient' },
  { id: 'sign-pdf', dir: 'sign-pdf', clientFile: 'SignPdfPageClient', clientFn: 'SignPdfPageClient', innerImport: 'SignPdfClient', innerFile: 'SignPdfClient', innerFn: 'SignPdfClient' },
  { id: 'split-pdf', dir: 'split-pdf', clientFile: 'SplitPdfPageClient', clientFn: 'SplitPdfPageClient', innerImport: 'SplitPdfClient', innerFile: 'SplitPdfClient', innerFn: 'SplitPdfClient' },
  { id: 'watermark-pdf', dir: 'watermark-pdf', clientFile: 'WatermarkPdfPageClient', clientFn: 'WatermarkPdfPageClient', innerImport: 'WatermarkPdfClient', innerFile: 'WatermarkPdfClient', innerFn: 'WatermarkPdfClient' },
];

const basePath = 'src/app/tools/pdf';

for (const tool of pdfTools) {
  const toolDir = path.join(basePath, tool.dir);
  const clientPath = path.join(toolDir, `${tool.clientFile}.tsx`);
  
  // Read current client file
  const currentClient = fs.readFileSync(clientPath, 'utf8');
  
  // Skip if already has article prop
  if (currentClient.includes('article?')) {
    console.log(`Skipping ${tool.id} - already updated`);
    continue;
  }

  // Update the PageClient to accept article prop and pass to ToolContentBlock
  const newClientContent = `"use client";

import dynamic from 'next/dynamic';
import { ToolContentBlock } from '@/components/seo/ToolContentBlock';

const ${tool.innerImport} = dynamic(
  () => import('./${tool.innerFile}').then((m) => m.${tool.innerFn}),
  { ssr: false }
);

interface Props {
  article?: string;
}

export function ${tool.clientFn}({ article }: Props) {
  return (
    <>
      <${tool.innerImport} />
      <ToolContentBlock utilityId="${tool.id}" article={article} />
    </>
  );
}
`;
  fs.writeFileSync(clientPath, newClientContent);

  // Update page.tsx to read article and pass it
  const pagePath = path.join(toolDir, 'page.tsx');
  const currentPage = fs.readFileSync(pagePath, 'utf8');
  
  if (currentPage.includes('readFileSync')) {
    console.log(`Skipping page for ${tool.id} - already updated`);
    continue;
  }

  // Build the old import line pattern to replace
  const importLine = `import { ${tool.clientFn} } from './${tool.clientFile}';`;
  const newImportLines = `import { ${tool.clientFn} } from './${tool.clientFile}';
import fs from 'fs';
import path from 'path';`;

  // Replace the import
  let newPage = currentPage.replace(importLine, newImportLines);
  
  // Make export default async
  newPage = newPage.replace(
    `export default function`,
    `export default async function`
  );
  
  // Replace `return <ClientComponent />;` with article reading + passing
  newPage = newPage.replace(
    `return <${tool.clientFn} />;`,
    `let article = '';
  try {
    const articlePath = path.join(process.cwd(), 'src', 'content', 'articles', '${tool.id}.md');
    if (fs.existsSync(articlePath)) {
      article = fs.readFileSync(articlePath, 'utf8');
    }
  } catch (e) {
    // Ignore if not found
  }
  return <${tool.clientFn} article={article || undefined} />;`
  );
  
  fs.writeFileSync(pagePath, newPage);
  console.log(`Updated ${tool.id}`);
}

console.log('Done!');
