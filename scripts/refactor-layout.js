const fs = require('fs');
const path = require('path');

// 1. Refactor PDF tools
const pdfTools = [
  { id: 'delete-pdf-pages', dir: 'delete-pdf-pages', clientFn: 'DeletePdfPagesClient', pageClientFile: 'DeletePdfPagesPageClient.tsx', clientFile: 'DeletePdfPagesClient.tsx' },
  { id: 'extract-pdf-pages', dir: 'extract-pdf-pages', clientFn: 'ExtractPdfPagesClient', pageClientFile: 'ExtractPdfPagesPageClient.tsx', clientFile: 'ExtractPdfPagesClient.tsx' },
  { id: 'jpg-to-pdf', dir: 'jpg-to-pdf', clientFn: 'JpgToPdfClient', pageClientFile: 'JpgToPdfPageClient.tsx', clientFile: 'JpgToPdfClient.tsx' },
  { id: 'merge-pdf', dir: 'merge-pdf', clientFn: 'MergePdfClient', pageClientFile: 'MergePdfPageClient.tsx', clientFile: 'MergePdfClient.tsx' },
  { id: 'metadata-viewer', dir: 'metadata-viewer', clientFn: 'MetadataViewerClient', pageClientFile: 'MetadataViewerPageClient.tsx', clientFile: 'MetadataViewerClient.tsx' },
  { id: 'page-counter', dir: 'page-counter', clientFn: 'PageCounterClient', pageClientFile: 'PageCounterPageClient.tsx', clientFile: 'PageCounterClient.tsx' },
  { id: 'pdf-to-jpg', dir: 'pdf-to-jpg', clientFn: 'PdfToJpgClient', pageClientFile: 'PdfToJpgPageClient.tsx', clientFile: 'PdfToJpgClient.tsx' },
  { id: 'pdf-to-text', dir: 'pdf-to-text', clientFn: 'PdfToTextClient', pageClientFile: 'PdfToTextPageClient.tsx', clientFile: 'PdfToTextClient.tsx' },
  { id: 'protect-pdf', dir: 'protect-pdf', clientFn: 'ProtectPdfClient', pageClientFile: 'ProtectPdfPageClient.tsx', clientFile: 'ProtectPdfClient.tsx' },
  { id: 'rearrange-pdf-pages', dir: 'rearrange-pdf-pages', clientFn: 'RearrangePdfPagesClient', pageClientFile: 'RearrangePdfPagesPageClient.tsx', clientFile: 'RearrangePdfPagesClient.tsx' },
  { id: 'rotate-pdf', dir: 'rotate-pdf', clientFn: 'RotatePdfClient', pageClientFile: 'RotatePdfPageClient.tsx', clientFile: 'RotatePdfClient.tsx' },
  { id: 'sign-pdf', dir: 'sign-pdf', clientFn: 'SignPdfClient', pageClientFile: 'SignPdfPageClient.tsx', clientFile: 'SignPdfClient.tsx' },
  { id: 'split-pdf', dir: 'split-pdf', clientFn: 'SplitPdfClient', pageClientFile: 'SplitPdfPageClient.tsx', clientFile: 'SplitPdfClient.tsx' },
  { id: 'watermark-pdf', dir: 'watermark-pdf', clientFn: 'WatermarkPdfClient', pageClientFile: 'WatermarkPdfPageClient.tsx', clientFile: 'WatermarkPdfClient.tsx' }
];

const pdfBasePath = path.join(__dirname, '..', 'src', 'app', 'tools', 'pdf');

for (const tool of pdfTools) {
  const toolDir = path.join(pdfBasePath, tool.dir);
  const clientPath = path.join(toolDir, tool.clientFile);
  const pageClientPath = path.join(toolDir, tool.pageClientFile);

  if (fs.existsSync(clientPath)) {
    let clientContent = fs.readFileSync(clientPath, 'utf8');

    // Add article parameter to client function
    const fnDeclaration = `export function ${tool.clientFn}()`;
    const fnDeclarationWithProps = `export function ${tool.clientFn}({ article }: { article?: string })`;
    
    if (clientContent.includes(fnDeclaration)) {
      clientContent = clientContent.replace(fnDeclaration, fnDeclarationWithProps);
    }

    // Pass article to ToolLayout
    if (clientContent.includes('<ToolLayout') && !clientContent.includes('article={article}')) {
      // For merge-pdf, replace the hardcoded article prop
      if (tool.id === 'merge-pdf' && clientContent.includes('article={`')) {
        // Find the block of hardcoded article and replace it with article={article}
        clientContent = clientContent.replace(/article=\{\`[\s\S]*?\`\}/, 'article={article}');
      } else {
        clientContent = clientContent.replace('<ToolLayout', '<ToolLayout\n      article={article}');
      }
    }

    fs.writeFileSync(clientPath, clientContent);
    console.log(`Refactored client component: ${tool.clientFn}`);
  }

  if (fs.existsSync(pageClientPath)) {
    let pageContent = fs.readFileSync(pageClientPath, 'utf8');

    // Pass article to the client component
    const clientTag = `<${tool.clientFn} />`;
    const clientTagWithProp = `<${tool.clientFn} article={article} />`;
    
    if (pageContent.includes(clientTag)) {
      pageContent = pageContent.replace(clientTag, clientTagWithProp);
    }

    // Remove ToolContentBlock call
    const contentBlockRegex = /<ToolContentBlock[\s\S]*?\/>/;
    if (pageContent.match(contentBlockRegex)) {
      pageContent = pageContent.replace(contentBlockRegex, '');
    }

    // Clean up ToolContentBlock import
    pageContent = pageContent.replace(/import \{ ToolContentBlock \} from \'\@\/components\/seo\/ToolContentBlock\';\n?/, '');

    fs.writeFileSync(pageClientPath, pageContent);
    console.log(`Refactored page client: ${tool.pageClientFile}`);
  }
}

// 2. Refactor QR page client
const qrPageClientPath = path.join(__dirname, '..', 'src', 'app', 'tools', 'qr', '[tool]', 'QrPageClient.tsx');
if (fs.existsSync(qrPageClientPath)) {
  let qrPageContent = fs.readFileSync(qrPageClientPath, 'utf8');

  // Pass article to QrCodeGeneratorClient
  if (qrPageContent.includes('<QrCodeGeneratorClient') && !qrPageContent.includes('article={article}')) {
    qrPageContent = qrPageContent.replace('<QrCodeGeneratorClient', '<QrCodeGeneratorClient\n        article={article}');
  }

  // Remove ToolContentBlock call and import
  const contentBlockRegex = /<ToolContentBlock[\s\S]*?\/>/;
  if (qrPageContent.match(contentBlockRegex)) {
    qrPageContent = qrPageContent.replace(contentBlockRegex, '');
  }
  qrPageContent = qrPageContent.replace(/import \{ ToolContentBlock \} from \'\@\/components\/seo\/ToolContentBlock\';\n?/, '');

  fs.writeFileSync(qrPageClientPath, qrPageContent);
  console.log(`Refactored QR page client: QrPageClient.tsx`);
}

console.log("Refactoring complete!");
