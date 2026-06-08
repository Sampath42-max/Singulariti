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
    await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return false;
  } catch (error: any) {
    const message = (error?.message || '').toLowerCase();
    if (
      message.includes('password') || 
      message.includes('encrypt') || 
      message.includes('decrypt') ||
      message.includes('security')
    ) {
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
    return { isValid: false, error: 'Please upload a PDF file.' };
  }
  
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) {
    return { isValid: false, error: 'Only PDF files are allowed.' };
  }

  if (file.size === 0) {
    return { isValid: false, error: 'The selected PDF file is empty.' };
  }

  const MAX_SIZE_BYTES = 500 * 1024 * 1024; // 500MB
  const WARNING_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

  if (file.size > MAX_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). The maximum supported file size for browser-based processing is 500MB.`
    };
  }

  const result: FileValidationResult = { isValid: true };

  if (file.size > WARNING_SIZE_BYTES) {
    result.warning = `Large file warning: This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Processing files between 100MB and 500MB entirely in the browser is supported, but may cause the page to lag or run out of memory depending on your computer's RAM. Keep other tabs closed for best performance.`;
  }

  return result;
}

/**
 * Converts parsing/runtime errors into diagnostic user friendly messages.
 */
export function getPdfErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred while reading the PDF.';
  
  const message = (error.message || '').toLowerCase();
  
  // toHex Error
  if (message.includes('tohex')) {
    return 'PDF rendering failed because the production PDF.js worker setup is invalid. Please refresh and try again.';
  }

  // Encrypted / Password Protected
  if (
    message.includes('password') || 
    message.includes('encrypt') || 
    message.includes('decrypt') ||
    message.includes('security')
  ) {
    return 'This PDF may be encrypted or password-protected. Please upload an unlocked PDF.';
  }
  
  // Format / Parsing issues
  if (message.includes('corrupt') || message.includes('failed to parse') || message.includes('pdf chain') || message.includes('parse')) {
    return 'Failed to parse PDF document. It might be corrupted or in an unsupported format.';
  }
  
  // File size / Empty
  if (message.includes('empty') || message.includes('size is 0') || message.includes('0 bytes')) {
    return 'The selected PDF file is empty.';
  }

  if (message.includes('large') || message.includes('too large') || message.includes('size limit')) {
    return 'The file size is too large for processing in the browser.';
  }

  // Fallback but descriptive
  return error.message || 'PDF could not be read correctly in the browser.';
}
