import * as pdfjsLib from 'pdfjs-dist';

// Initialize the PDF.js worker dynamically from a CDN to avoid Next.js bundling issues
if (typeof window !== 'undefined') {
  // Use the matching version of pdfjs-dist from unpkg CDN
  const version = pdfjsLib.version || '4.0.370';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

/**
 * Loads a PDF file and returns the PDFJS Document Proxy.
 */
export async function loadPdfDocument(file: File): Promise<pdfjsLib.PDFDocumentProxy> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  return loadingTask.promise;
}

/**
 * Renders a specific page of a PDF document onto a canvas element.
 */
export async function renderPageToCanvas(
  pdfDoc: pdfjsLib.PDFDocumentProxy,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale = 1.5
): Promise<void> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  
  const canvasContext = canvas.getContext('2d');
  if (!canvasContext) {
    throw new Error('Could not get 2D context from canvas');
  }
  
  const renderContext = {
    canvasContext,
    viewport,
    canvas,
  };
  
  await page.render(renderContext).promise;
}

/**
 * Renders a specific page and returns it as a PNG/JPG Data URL.
 */
export async function renderPageToDataUrl(
  pdfDoc: pdfjsLib.PDFDocumentProxy,
  pageNumber: number,
  scale = 2.0,
  format = 'image/jpeg'
): Promise<string> {
  const canvas = document.createElement('canvas');
  await renderPageToCanvas(pdfDoc, pageNumber, canvas, scale);
  const dataUrl = canvas.toDataURL(format);
  canvas.width = 0;
  canvas.height = 0; // memory cleanup
  return dataUrl;
}

/**
 * Extracts all readable text from a single page of a PDF document.
 */
export async function extractTextFromPage(
  pdfDoc: pdfjsLib.PDFDocumentProxy,
  pageNumber: number
): Promise<string> {
  const page = await pdfDoc.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const items = textContent.items as { str: string; hasEOL: boolean }[];
  
  let text = '';
  
  for (const item of items) {
    // Basic heuristics to group text lines together
    text += item.str;
    if (item.hasEOL) {
      text += '\n';
    } else {
      text += ' ';
    }
  }
  
  return text;
}

/**
 * Extracts text from the entire PDF document.
 */
export async function extractTextFromPdf(
  pdfDoc: pdfjsLib.PDFDocumentProxy,
  onProgress?: (current: number, total: number) => void
): Promise<string> {
  let fullText = '';
  const totalPages = pdfDoc.numPages;
  
  for (let i = 1; i <= totalPages; i++) {
    const pageText = await extractTextFromPage(pdfDoc, i);
    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    if (onProgress) {
      onProgress(i, totalPages);
    }
  }
  
  return fullText.trim();
}
