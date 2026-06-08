import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';
import { readFileAsArrayBuffer, dataUrlToArrayBuffer } from '../fileHelpers';

// Helper to convert hex colors to normalized RGB values for pdf-lib
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

/**
 * Merge multiple PDF files into one.
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

/**
 * Split a PDF file by extracting selected page ranges into a new PDF.
 * Ranges: 1-based indices (e.g. [1, 2, 3, 5, 7, 8])
 */
export async function splitPDF(file: File, pageNumbers: number[]): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  // Convert 1-based page numbers to 0-based indices
  const pageIndices = pageNumbers.map(num => num - 1);
  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return newPdf.save();
}

/**
 * Rotate specific pages of a PDF.
 * pageRotations maps 1-based page numbers to rotation degrees (e.g., 90, 180, 270)
 */
export async function rotatePDF(
  file: File,
  pageRotations: Record<number, number>
): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  Object.entries(pageRotations).forEach(([pageIndexStr, rotation]) => {
    const pageIndex = parseInt(pageIndexStr, 10) - 1;
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const page = pages[pageIndex];
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + rotation) % 360));
    }
  });

  return pdfDoc.save();
}

/**
 * Delete specified pages from a PDF.
 * pageNumbersToDelete: 1-based page numbers (e.g., [2, 4])
 */
export async function deletePDFPages(
  file: File,
  pageNumbersToDelete: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  
  // Sort descending to avoid index shifting when deleting
  const indicesToDelete = pageNumbersToDelete
    .map(num => num - 1)
    .sort((a, b) => b - a);

  indicesToDelete.forEach(index => {
    if (index >= 0 && index < pdfDoc.getPageCount()) {
      pdfDoc.removePage(index);
    }
  });

  return pdfDoc.save();
}

/**
 * Rearranges PDF pages into a custom order.
 * newOrder: Array of 0-based indices representing the new page positions
 */
export async function rearrangePDFPages(
  file: File,
  newOrder: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(srcDoc, newOrder);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return newPdf.save();
}

/**
 * Extracts specific pages from a PDF.
 * pageNumbersToExtract: 1-based page numbers
 */
export async function extractPDFPages(
  file: File,
  pageNumbersToExtract: number[]
): Promise<Uint8Array> {
  return splitPDF(file, pageNumbersToExtract);
}

/**
 * Image-to-PDF Conversion Settings
 */
export interface ImageToPDFSettings {
  pageSize: 'A4' | 'Letter' | 'fit';
  orientation: 'portrait' | 'landscape';
  margin: number; // in points
}

/**
 * Convert multiple image files into a single PDF.
 */
export async function imagesToPDF(
  files: File[],
  settings: ImageToPDFSettings
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Page Dimensions in Points (1 inch = 72 points)
  const sizes = {
    A4: { width: 595.27, height: 841.89 },
    Letter: { width: 612.0, height: 792.0 }
  };

  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    let image;
    
    if (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')) {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else if (
      file.type === 'image/jpeg' || 
      file.type === 'image/jpg' || 
      file.name.toLowerCase().endsWith('.jpg') || 
      file.name.toLowerCase().endsWith('.jpeg')
    ) {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      // Fallback: try embedding PNG first, then JPG if failed
      try {
        image = await pdfDoc.embedPng(arrayBuffer);
      } catch {
        image = await pdfDoc.embedJpg(arrayBuffer);
      }
    }

    let pageWidth = sizes.A4.width;
    let pageHeight = sizes.A4.height;

    if (settings.pageSize === 'fit') {
      pageWidth = image.width + settings.margin * 2;
      pageHeight = image.height + settings.margin * 2;
    } else {
      const selectedSize = sizes[settings.pageSize] || sizes.A4;
      if (settings.orientation === 'landscape') {
        pageWidth = selectedSize.height;
        pageHeight = selectedSize.width;
      } else {
        pageWidth = selectedSize.width;
        pageHeight = selectedSize.height;
      }
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate dimensions to maintain aspect ratio
    const contentWidth = pageWidth - settings.margin * 2;
    const contentHeight = pageHeight - settings.margin * 2;
    
    const imgRatio = image.width / image.height;
    const pageRatio = contentWidth / contentHeight;

    let drawWidth = contentWidth;
    let drawHeight = contentHeight;

    if (imgRatio > pageRatio) {
      drawHeight = contentWidth / imgRatio;
    } else {
      drawWidth = contentHeight * imgRatio;
    }

    // Center the image
    const x = settings.margin + (contentWidth - drawWidth) / 2;
    const y = settings.margin + (contentHeight - drawHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: drawWidth,
      height: drawHeight
    });
  }

  return pdfDoc.save();
}

/**
 * Basic browser-side structural compression.
 */
export async function compressPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  
  // Re-serialization with object streams enabled removes unreferenced objects,
  // compresses cross-reference tables and standard streams
  return pdfDoc.save({ useObjectStreams: true });
}

/**
 * Draws a signature image onto a specific PDF page.
 * signatureDataUrl: Data URL string of signature image (PNG/JPG)
 * position: coordinates and dimensions relative to page (0 to 1 scaling, or absolute points)
 */
export async function signPDF(
  arrayBuffer: ArrayBuffer,
  pageIndex: number,
  signatureDataUrl: string,
  posX: number,
  posY: number,
  sigWidth: number,
  sigHeight: number,
  sigRotation: number
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const page = pdfDoc.getPage(pageIndex);
  const { width: pdfW, height: pdfH } = page.getSize();

  // Draw signature (signatureDataUrl is a PNG base64 data URI)
  const imageBytes = dataUrlToArrayBuffer(signatureDataUrl);
  const sigImage = signatureDataUrl.startsWith('data:image/png')
    ? await pdfDoc.embedPng(imageBytes)
    : await pdfDoc.embedJpg(imageBytes);

  const scaleX = (posX / 100) * pdfW;
  const scaleY = (posY / 100) * pdfH;
  const drawWidth = (sigWidth / 100) * pdfW;
  const drawHeight = (sigHeight / 100) * pdfH;

  // Convert HTML canvas center coordinates to PDF bottom-left coordinates
  page.drawImage(sigImage, {
    x: scaleX - drawWidth / 2,
    y: pdfH - scaleY - drawHeight / 2,
    width: drawWidth,
    height: drawHeight,
    rotate: degrees(-sigRotation)
  });

  return pdfDoc.save();
}

/**
 * Watermark Settings
 */
export interface WatermarkOptions {
  type: 'text' | 'image';
  text?: string;
  imageFile?: File; // For image watermarks
  color?: string; // Hex color string, e.g. '#FF0000'
  opacity?: number; // 0 to 1
  rotation?: number; // degrees
  xPercent: number; // Top-left visual x percentage (0 to 1)
  yPercent: number; // Top-left visual y percentage (0 to 1)
  fontSizePercent?: number; // Text font size percent (0 to 1)
  imageWidthPercent?: number; // Image width percent (0 to 1)
  imageHeightPercent?: number; // Image height percent (0 to 1)
  applyToAll: boolean;
  selectedPages?: number[]; // 1-based page numbers
  previewPageWidth?: number;
  previewPageHeight?: number;
}

/**
 * Add a text or image watermark to a PDF.
 */
export async function addWatermarkToPDF(
  file: File,
  options: WatermarkOptions
): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  const pagesToWatermark: number[] = [];
  if (options.applyToAll) {
    for (let i = 1; i <= pageCount; i++) pagesToWatermark.push(i);
  } else if (options.selectedPages) {
    pagesToWatermark.push(...options.selectedPages);
  }

  let helveticaFont;
  let embeddedImage: any;

  if (options.type === 'text') {
    helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  } else if (options.type === 'image' && options.imageFile) {
    const imgBuffer = await readFileAsArrayBuffer(options.imageFile);
    if (
      options.imageFile.type === 'image/png' || 
      options.imageFile.name.toLowerCase().endsWith('.png')
    ) {
      embeddedImage = await pdfDoc.embedPng(imgBuffer);
    } else {
      embeddedImage = await pdfDoc.embedJpg(imgBuffer);
    }
  }

  for (const pageNum of pagesToWatermark) {
    const pageIndex = pageNum - 1;
    if (pageIndex < 0 || pageIndex >= pageCount) continue;

    const page = pdfDoc.getPage(pageIndex);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const pageRotation = page.getRotation().angle;
    
    const isRotated90or270 = pageRotation === 90 || pageRotation === 270;
    const pdfWidth = isRotated90or270 ? pageHeight : pageWidth;
    const pdfHeight = isRotated90or270 ? pageWidth : pageHeight;

    const opacity = options.opacity ?? 0.3;

    if (options.type === 'text' && options.text && helveticaFont) {
      const watermarkText = options.text;
      const rgbColor = hexToRgb(options.color ?? '#FF0000');

      const fontSizePercent = options.fontSizePercent ?? 0.08;
      const fontSize = pdfHeight * fontSizePercent;
      const watermarkHeight = fontSize;

      const pdfX = options.xPercent * pdfWidth;
      const pdfY = pdfHeight - (options.yPercent * pdfHeight) - watermarkHeight;

      const userRotation = options.rotation ?? 45;
      
      let x_p = pdfX;
      let y_p = pdfY;
      let rotation_p = userRotation;

      if (pageRotation === 90) {
        x_p = pageWidth - pdfY;
        y_p = pdfX;
        rotation_p = userRotation - 270;
      } else if (pageRotation === 180) {
        x_p = pageWidth - pdfX;
        y_p = pageHeight - pdfY;
        rotation_p = userRotation - 180;
      } else if (pageRotation === 270) {
        x_p = pdfY;
        y_p = pageHeight - pdfX;
        rotation_p = userRotation - 90;
      }

      page.drawText(watermarkText, {
        x: x_p,
        y: y_p,
        size: fontSize,
        font: helveticaFont,
        color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
        opacity,
        rotate: degrees(rotation_p)
      });
    } else if (options.type === 'image' && embeddedImage) {
      const imageWidthPercent = options.imageWidthPercent ?? 0.4;
      const imageHeightPercent = options.imageHeightPercent ?? 0.4;

      const imageWidth = imageWidthPercent * pdfWidth;
      const imageHeight = imageHeightPercent * pdfHeight;

      const pdfX = options.xPercent * pdfWidth;
      const pdfY = pdfHeight - (options.yPercent * pdfHeight) - imageHeight;

      const userRotation = options.rotation ?? 0;
      
      let x_p = pdfX;
      let y_p = pdfY;
      let rotation_p = userRotation;

      if (pageRotation === 90) {
        x_p = pageWidth - pdfY;
        y_p = pdfX;
        rotation_p = userRotation - 270;
      } else if (pageRotation === 180) {
        x_p = pageWidth - pdfX;
        y_p = pageHeight - pdfY;
        rotation_p = userRotation - 180;
      } else if (pageRotation === 270) {
        x_p = pdfY;
        y_p = pageHeight - pdfX;
        rotation_p = userRotation - 90;
      }

      page.drawImage(embeddedImage, {
        x: x_p,
        y: y_p,
        width: imageWidth,
        height: imageHeight,
        opacity,
        rotate: degrees(rotation_p)
      });
    }
  }

  return pdfDoc.save();
}

/**
 * Extracted PDF Metadata Structure
 */
export interface PDFMetadata {
  fileName: string;
  fileSize: number;
  totalPages: number;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modificationDate?: string;
}

/**
 * Retrieve metadata from a PDF file.
 */
export async function viewPDFMetadata(file: File): Promise<PDFMetadata> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  
  const title = pdfDoc.getTitle();
  const author = pdfDoc.getAuthor();
  const subject = pdfDoc.getSubject();
  const keywords = pdfDoc.getKeywords();
  const creator = pdfDoc.getCreator();
  const producer = pdfDoc.getProducer();
  const creationDate = pdfDoc.getCreationDate()?.toLocaleString();
  const modificationDate = pdfDoc.getModificationDate()?.toLocaleString();
  const totalPages = pdfDoc.getPageCount();

  return {
    fileName: file.name,
    fileSize: file.size,
    totalPages,
    title,
    author,
    subject,
    keywords,
    creator,
    producer,
    creationDate,
    modificationDate
  };
}

/**
 * Get page counts for a list of PDF files.
 */
export async function countPDFPages(
  files: File[]
): Promise<{ counts: { fileName: string; pages: number }[]; total: number }> {
  const counts: { fileName: string; pages: number }[] = [];
  let total = 0;

  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    counts.push({ fileName: file.name, pages: pageCount });
    total += pageCount;
  }

  return { counts, total };
}

/**
 * Encrypt and password protect a PDF file using RC4 128-bit encryption.
 * Supports standard browser-based encryption without server dependencies.
 */
export async function protectPDFDocument(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfBytes = new Uint8Array(arrayBuffer);
  
  // The encryptPDF function returns a Uint8Array
  const encryptedBytes = await encryptPDF(pdfBytes, password);
  return encryptedBytes;
}
