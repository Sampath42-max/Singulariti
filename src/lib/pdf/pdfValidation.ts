import { PDFDocument } from 'pdf-lib';

/**
 * Parses page range strings (e.g., "1-3, 5, 7-10") into an array of 1-based page numbers.
 * @throws Error if any part of the range is invalid.
 */
export function parsePageRanges(rangeStr: string, maxPages: number): number[] {
  if (!rangeStr.trim()) {
    throw new Error('Page range cannot be empty.');
  }

  const pagesSet = new Set<number>();
  const parts = rangeStr.split(',');

  for (let part of parts) {
    part = part.trim();
    if (!part) continue;

    // Matches simple numbers like "5" or ranges like "1-3"
    if (/^\d+$/.test(part)) {
      const page = parseInt(part, 10);
      if (page < 1 || page > maxPages) {
        throw new Error(`Page number ${page} is out of bounds (must be between 1 and ${maxPages}).`);
      }
      pagesSet.add(page);
    } else if (/^\d+\s*-\s*\d+$/.test(part)) {
      const [startStr, endStr] = part.split('-');
      const start = parseInt(startStr.trim(), 10);
      const end = parseInt(endStr.trim(), 10);

      if (start < 1 || start > maxPages || end < 1 || end > maxPages) {
        throw new Error(`Range ${part} is out of bounds (pages must be between 1 and ${maxPages}).`);
      }
      if (start > end) {
        throw new Error(`Invalid range ${part}: start page must be less than or equal to end page.`);
      }

      for (let i = start; i <= end; i++) {
        pagesSet.add(i);
      }
    } else {
      throw new Error(`Invalid format: "${part}". Use formats like "1-3" or "5".`);
    }
  }

  return Array.from(pagesSet).sort((a, b) => a - b);
}

/**
 * Checks if a PDF is password protected / encrypted.
 */
export async function checkPdfPasswordProtected(arrayBuffer: ArrayBuffer): Promise<boolean> {
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
    return pdfDoc.isEncrypted;
  } catch (error: any) {
    if (error.message && error.message.includes('password')) {
      return true;
    }
    // If it's another parsing error, throw it so it can be handled as corrupted
    throw error;
  }
}

/**
 * Basic checks for valid PDF and size warning.
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validatePdfFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file selected.' };
  }
  
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    return { isValid: false, error: 'Unsupported file type. Only PDF files are allowed.' };
  }

  const result: FileValidationResult = { isValid: true };

  const MAX_SIZE_BYTES = 1024 * 1024 * 1024; // 1GB
  const WARNING_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

  if (file.size > MAX_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File is too large (${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB). The maximum supported file size for browser-based processing is 1GB.`
    };
  }

  if (file.size > WARNING_SIZE_BYTES) {
    result.warning = `Large file warning: This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Processing files between 100MB and 1GB entirely in the browser is supported, but may cause the page to lag or run out of memory depending on your computer's RAM. Keep other tabs closed for best performance.`;
  }

  return result;
}
