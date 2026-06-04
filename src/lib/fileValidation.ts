/**
 * Utility helper methods for validating file uploads in the browser.
 */

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export interface FileValidationConfig {
  maxSizeBytes?: number;
  allowedExtensions?: string[];
  allowedMimes?: string[];
}

export const LIMITS = {
  PDF_MAX_SIZE: 100 * 1024 * 1024,      // 100MB
  IMAGE_MAX_SIZE: 50 * 1024 * 1024,     // 50MB
  TEXT_MAX_SIZE: 5 * 1024 * 1024,       // 5MB
  MAX_UPLOAD_FILES: 10,                 // 10 files max
  WARNING_SIZE_THRESHOLD: 80 * 1024 * 1024, // 80MB warns users about lag
};

/**
 * Validates a single file against type, size, and corruption criteria.
 */
export function validateFile(
  file: File,
  type: 'pdf' | 'image' | 'text' | 'json' | 'any',
  customConfig?: FileValidationConfig
): FileValidationResult {
  if (!file) {
    return { isValid: false, error: "No file selected." };
  }

  // 1. Check for empty or obviously corrupted files (0 bytes)
  if (file.size === 0) {
    return { isValid: false, error: "The uploaded file appears to be empty or corrupted." };
  }

  const nameLower = file.name.toLowerCase();
  const mimeLower = file.type.toLowerCase();

  // 2. Validate File Types, extensions and MIME types
  let maxBytes = customConfig?.maxSizeBytes;
  let allowedExts = customConfig?.allowedExtensions || [];
  let allowedMimes = customConfig?.allowedMimes || [];

  if (type === 'pdf') {
    maxBytes = maxBytes || LIMITS.PDF_MAX_SIZE;
    allowedExts = allowedExts.length ? allowedExts : ['.pdf'];
    allowedMimes = allowedMimes.length ? allowedMimes : ['application/pdf'];

    const hasValidExt = allowedExts.some(ext => nameLower.endsWith(ext));
    const hasValidMime = allowedMimes.includes(mimeLower);

    if (!hasValidExt && !hasValidMime) {
      return { isValid: false, error: "This file type is not supported. Only PDF files are allowed." };
    }
  } else if (type === 'image') {
    maxBytes = maxBytes || LIMITS.IMAGE_MAX_SIZE;
    allowedExts = allowedExts.length ? allowedExts : ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
    allowedMimes = allowedMimes.length ? allowedMimes : ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif'];

    const hasValidExt = allowedExts.some(ext => nameLower.endsWith(ext));
    const hasValidMime = allowedMimes.some(mime => mimeLower.startsWith('image/') || mimeLower === mime);

    if (!hasValidExt && !hasValidMime) {
      return { isValid: false, error: "This file type is not supported. Only images are allowed." };
    }
  } else if (type === 'text') {
    maxBytes = maxBytes || LIMITS.TEXT_MAX_SIZE;
    allowedExts = allowedExts.length ? allowedExts : ['.txt', '.md', '.csv', '.html', '.css', '.js', '.xml', '.yaml', '.yml'];
    
    const hasValidExt = allowedExts.some(ext => nameLower.endsWith(ext));
    if (!hasValidExt && !mimeLower.startsWith('text/') && mimeLower !== 'application/javascript') {
      return { isValid: false, error: "This file type is not supported. Only text files are allowed." };
    }
  } else if (type === 'json') {
    maxBytes = maxBytes || LIMITS.TEXT_MAX_SIZE;
    allowedExts = allowedExts.length ? allowedExts : ['.json'];
    allowedMimes = allowedMimes.length ? allowedMimes : ['application/json'];

    const hasValidExt = allowedExts.some(ext => nameLower.endsWith(ext));
    const hasValidMime = allowedMimes.includes(mimeLower);

    if (!hasValidExt && !hasValidMime) {
      return { isValid: false, error: "This file type is not supported. Only JSON files are allowed." };
    }
  }

  // 3. Size constraints validation
  if (maxBytes && file.size > maxBytes) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const limitInMB = (maxBytes / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File size is too large (${sizeInMB}MB). Maximum supported size is ${limitInMB}MB.`
    };
  }

  // 4. Generate warnings for memory-intensive local processing
  const result: FileValidationResult = { isValid: true };
  if (file.size > LIMITS.WARNING_SIZE_THRESHOLD) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    result.warning = `Large file warning: This file is ${sizeInMB}MB. Processing large files in the browser is supported, but may cause the page to lag or run out of memory depending on your computer's RAM.`;
  }

  return result;
}

/**
 * Validates a list of files for multiple uploads (checks total count limits).
 */
export function validateFileList(
  files: File[],
  type: 'pdf' | 'image' | 'text' | 'json' | 'any',
  maxCount: number = LIMITS.MAX_UPLOAD_FILES
): FileValidationResult {
  if (!files || files.length === 0) {
    return { isValid: false, error: "No files selected." };
  }

  if (files.length > maxCount) {
    return { isValid: false, error: `Too many files selected. You can upload a maximum of ${maxCount} files.` };
  }

  for (const file of files) {
    const validation = validateFile(file, type);
    if (!validation.isValid) {
      return validation;
    }
  }

  return { isValid: true };
}
