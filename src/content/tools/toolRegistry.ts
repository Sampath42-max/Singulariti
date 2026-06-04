export type SectionRegistryItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
};

export type SubSectionRegistryItem = {
  id: string;
  sectionId: string;
  name: string;
  slug: string;
  description: string;
};

export type UtilityRegistryItem = {
  id: string;
  name: string;
  sectionId: string;
  subSectionId: string;
  utilityUrl: string;
  guideSlug: string;
  shortDescription: string;
  inputType: string[];
  outputType: string[];
  operationType:
    | "formatter"
    | "converter"
    | "compressor"
    | "calculator"
    | "generator"
    | "checker"
    | "scanner"
    | "editor"
    | "previewer"
    | "utility"
    | "management"
    | "test";
  runsInBrowser?: boolean;
  requiresBackend?: boolean;
  hasFormula?: boolean;
  relatedToolIds?: string[];
};

export const sectionRegistry: SectionRegistryItem[] = [
  {
    "id": "image",
    "name": "Image Utilities",
    "slug": "image-utilities",
    "description": "Free online image tools to compress, convert, and edit images entirely in your browser."
  },
  {
    "id": "editing",
    "name": "Image Editing Utilities",
    "slug": "image-editing-utilities",
    "description": "Edit, resize, crop, and apply filters to images instantly."
  },
  {
    "id": "pdf",
    "name": "PDF Utilities",
    "slug": "pdf-utilities",
    "description": "Free online PDF tools to merge, split, rotate, delete pages, sign, watermark, and convert PDFs entirely in your browser."
  },
  {
    "id": "qr",
    "name": "QR Utilities",
    "slug": "qr-utilities",
    "description": "Free online tools to generate and scan custom QR codes in your browser."
  },
  {
    "id": "calculators",
    "name": "Calculator Utilities",
    "slug": "calculator-utilities",
    "description": "Free online calculators to compute financial, mathematical, tax, health, and date-related queries instantly in your browser."
  },
  {
    "id": "text",
    "name": "Text Utilities",
    "slug": "text-utilities",
    "description": "Convert case, count words, remove duplicate lines, compare texts, and generate placeholder text securely."
  },
  {
    "id": "dev",
    "name": "Developer Utilities",
    "slug": "developer-utilities",
    "description": "Format JSON, XML, YAML, format SQL, minify code, decode JWTs, and run regex patterns."
  },
  {
    "id": "convert",
    "name": "Unit Conversion Utilities",
    "slug": "unit-conversion-utilities",
    "description": "Convert lengths, weights, temperatures, data storage, areas, speed, and time bases."
  },
  {
    "id": "seo",
    "name": "SEO Utilities",
    "slug": "seo-utilities",
    "description": "Generate meta tags, robots.txt, sitemaps, verify OG/Twitter tags, and check heading structures."
  }
];

export const subSectionRegistry: SubSectionRegistryItem[] = [
  {
    "id": "image-compression",
    "sectionId": "image",
    "name": "Compression Utilities",
    "slug": "compression-utilities",
    "description": "Reduce image file sizes without losing quality. Works instantly in your browser."
  },
  {
    "id": "image-conversion",
    "sectionId": "image",
    "name": "Conversion Utilities",
    "slug": "conversion-utilities",
    "description": "Convert images between different formats instantly and securely."
  },
  {
    "id": "image-utility",
    "sectionId": "image",
    "name": "Utility Utilities",
    "slug": "utility-utilities",
    "description": "Extract metadata, colors, and analyze image dimensions."
  },
  {
    "id": "image-developer",
    "sectionId": "image",
    "name": "Developer Utilities",
    "slug": "developer-utilities",
    "description": "Convert between base64 strings and image files."
  },
  {
    "id": "editing-tools",
    "sectionId": "editing",
    "name": "Image Editing Utilities",
    "slug": "tools-utilities",
    "description": "Edit, resize, crop, and apply filters to images instantly."
  },
  {
    "id": "pdf-management",
    "sectionId": "pdf",
    "name": "PDF Management",
    "slug": "management-utilities",
    "description": "Organize, merge, split, rotate, delete, and extract PDF pages inside your browser."
  },
  {
    "id": "pdf-conversion",
    "sectionId": "pdf",
    "name": "PDF Conversion",
    "slug": "conversion-utilities",
    "description": "Convert documents and images to and from PDF files in your browser."
  },
  {
    "id": "pdf-utility",
    "sectionId": "pdf",
    "name": "PDF Utilities",
    "slug": "utility-utilities",
    "description": "Compress, sign, watermark, count pages, and view metadata of PDF documents."
  },
  {
    "id": "pdf-text",
    "sectionId": "pdf",
    "name": "PDF Text Extraction",
    "slug": "text-utilities",
    "description": "Extract textual content from PDF files in the browser."
  },
  {
    "id": "qr-qr-tools",
    "sectionId": "qr",
    "name": "QR Code Utilities",
    "slug": "qr-tools-utilities",
    "description": "Generate customized QR codes or scan QR codes instantly in the browser."
  },
  {
    "id": "calculators-financial",
    "sectionId": "calculators",
    "name": "Financial Calculators",
    "slug": "financial-utilities",
    "description": "Calculate EMI, SIP, FD returns, compound interest, mortgage, and investment performance."
  },
  {
    "id": "calculators-tax-business",
    "sectionId": "calculators",
    "name": "Tax & Business Calculators",
    "slug": "tax-business-utilities",
    "description": "Calculate income tax payable under old or new regimes, GST, profit/loss, and revenue."
  },
  {
    "id": "calculators-math-science",
    "sectionId": "calculators",
    "name": "Math & Science Calculators",
    "slug": "math-science-utilities",
    "description": "Basic and advanced scientific math functions, percentages, and CGPA conversions."
  },
  {
    "id": "calculators-health-date",
    "sectionId": "calculators",
    "name": "Health & Date Calculators",
    "slug": "health-date-utilities",
    "description": "Track exact chronological age, calendar differences, BMI, and calorie goals."
  },
  {
    "id": "text-text-manipulation",
    "sectionId": "text",
    "name": "Text Formatting & Manipulation",
    "slug": "text-manipulation-utilities",
    "description": "Format cases, replace text, and clean up formatting."
  },
  {
    "id": "text-generators",
    "sectionId": "text",
    "name": "Text Generators",
    "slug": "generators-utilities",
    "description": "Generate dummy lorem ipsum text or random text sequences."
  },
  {
    "id": "dev-dev-formatters",
    "sectionId": "dev",
    "name": "Formatters & Beautifiers",
    "slug": "dev-formatters-utilities",
    "description": "Format and beautify structured data."
  },
  {
    "id": "dev-dev-encoders",
    "sectionId": "dev",
    "name": "Encoders, Decoders & Decrypters",
    "slug": "dev-encoders-utilities",
    "description": "Encode or decode common formats securely in the browser."
  },
  {
    "id": "dev-dev-minifiers",
    "sectionId": "dev",
    "name": "Minifiers & Testers",
    "slug": "dev-minifiers-utilities",
    "description": "Minify markup and test expression matches."
  },
  {
    "id": "dev-dev-utilities",
    "sectionId": "dev",
    "name": "Utilities & Previewers",
    "slug": "dev-utilities-utilities",
    "description": "Common developer aids, colors, and preview tools."
  },
  {
    "id": "convert-conversions",
    "sectionId": "convert",
    "name": "Unit Converters",
    "slug": "conversions-utilities",
    "description": "Convert between standard units of measurement."
  },
  {
    "id": "seo-seo-generators",
    "sectionId": "seo",
    "name": "SEO Generators & Checkers",
    "slug": "seo-generators-utilities",
    "description": "Generate metadata files and validate page SEO formats."
  }
];

export const toolRegistry: UtilityRegistryItem[] = [
  {
    "id": "image-compressor",
    "name": "Image Compressor",
    "sectionId": "image",
    "subSectionId": "image-compression",
    "utilityUrl": "/image/compression/image-compressor",
    "guideSlug": "image-compressor-guide",
    "shortDescription": "Reduce image file size while keeping quality. Free, secure, no upload to server.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "jpg-compressor",
      "jpeg-compressor",
      "png-compressor"
    ]
  },
  {
    "id": "jpg-compressor",
    "name": "JPG Compressor",
    "sectionId": "image",
    "subSectionId": "image-compression",
    "utilityUrl": "/image/compression/jpg-compressor",
    "guideSlug": "jpg-compressor-guide",
    "shortDescription": "Reduce JPG file size while keeping quality. Free, secure, no upload to server.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-compressor",
      "jpeg-compressor",
      "png-compressor"
    ]
  },
  {
    "id": "jpeg-compressor",
    "name": "JPEG Compressor",
    "sectionId": "image",
    "subSectionId": "image-compression",
    "utilityUrl": "/image/compression/jpeg-compressor",
    "guideSlug": "jpeg-compressor-guide",
    "shortDescription": "Reduce JPEG file size while keeping quality. Free, secure, no upload to server.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-compressor",
      "jpg-compressor",
      "png-compressor"
    ]
  },
  {
    "id": "png-compressor",
    "name": "PNG Compressor",
    "sectionId": "image",
    "subSectionId": "image-compression",
    "utilityUrl": "/image/compression/png-compressor",
    "guideSlug": "png-compressor-guide",
    "shortDescription": "Reduce PNG file size while keeping quality. Free, secure, no upload to server.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-compressor",
      "jpg-compressor",
      "jpeg-compressor"
    ]
  },
  {
    "id": "webp-compressor",
    "name": "WebP Compressor",
    "sectionId": "image",
    "subSectionId": "image-compression",
    "utilityUrl": "/image/compression/webp-compressor",
    "guideSlug": "webp-compressor-guide",
    "shortDescription": "Reduce WebP file size while keeping quality. Free, secure, no upload to server.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-compressor",
      "jpg-compressor",
      "jpeg-compressor"
    ]
  },
  {
    "id": "svg-compressor",
    "name": "SVG Compressor",
    "sectionId": "image",
    "subSectionId": "image-compression",
    "utilityUrl": "/image/compression/svg-compressor",
    "guideSlug": "svg-compressor-guide",
    "shortDescription": "Minify SVG files to reduce file size. Free, secure, no upload to server.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-compressor",
      "jpg-compressor",
      "jpeg-compressor"
    ]
  },
  {
    "id": "jpg-to-png",
    "name": "JPG to PNG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/jpg-to-png",
    "guideSlug": "jpg-to-png-guide",
    "shortDescription": "Convert JPG images to PNG format with transparency support. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "png-to-jpg",
      "jpg-to-webp",
      "png-to-webp"
    ]
  },
  {
    "id": "png-to-jpg",
    "name": "PNG to JPG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/png-to-jpg",
    "guideSlug": "png-to-jpg-guide",
    "shortDescription": "Convert PNG images to JPG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "jpg-to-webp",
      "png-to-webp"
    ]
  },
  {
    "id": "jpg-to-webp",
    "name": "JPG to WebP",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/jpg-to-webp",
    "guideSlug": "jpg-to-webp-guide",
    "shortDescription": "Convert JPG images to WebP format for better compression. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "png-to-webp"
    ]
  },
  {
    "id": "png-to-webp",
    "name": "PNG to WebP",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/png-to-webp",
    "guideSlug": "png-to-webp-guide",
    "shortDescription": "Convert PNG images to WebP format for better compression. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "webp-to-jpg",
    "name": "WebP to JPG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/webp-to-jpg",
    "guideSlug": "webp-to-jpg-guide",
    "shortDescription": "Convert WebP images to JPG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "webp-to-png",
    "name": "WebP to PNG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/webp-to-png",
    "guideSlug": "webp-to-png-guide",
    "shortDescription": "Convert WebP images to PNG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "jpg-to-jpeg",
    "name": "JPG to JPEG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/jpg-to-jpeg",
    "guideSlug": "jpg-to-jpeg-guide",
    "shortDescription": "Convert JPG images to JPEG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "jpeg-to-jpg",
    "name": "JPEG to JPG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/jpeg-to-jpg",
    "guideSlug": "jpeg-to-jpg-guide",
    "shortDescription": "Convert JPEG images to JPG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "svg-to-png",
    "name": "SVG to PNG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/svg-to-png",
    "guideSlug": "svg-to-png-guide",
    "shortDescription": "Convert SVG vector images to PNG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "svg-to-jpg",
    "name": "SVG to JPG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/svg-to-jpg",
    "guideSlug": "svg-to-jpg-guide",
    "shortDescription": "Convert SVG vector images to JPG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "svg-to-webp",
    "name": "SVG to WebP",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/svg-to-webp",
    "guideSlug": "svg-to-webp-guide",
    "shortDescription": "Convert SVG vector images to WebP format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "png-to-svg",
    "name": "PNG to SVG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/png-to-svg",
    "guideSlug": "png-to-svg-guide",
    "shortDescription": "Convert PNG images to SVG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "jpg-to-svg",
    "name": "JPG to SVG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/jpg-to-svg",
    "guideSlug": "jpg-to-svg-guide",
    "shortDescription": "Convert JPG images to SVG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "webp-to-svg",
    "name": "WebP to SVG",
    "sectionId": "image",
    "subSectionId": "image-conversion",
    "utilityUrl": "/image/conversion/webp-to-svg",
    "guideSlug": "webp-to-svg-guide",
    "shortDescription": "Convert WebP images to SVG format. Free, secure, no upload to server.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp"
    ]
  },
  {
    "id": "image-metadata-viewer",
    "name": "Image Metadata Viewer",
    "sectionId": "image",
    "subSectionId": "image-utility",
    "utilityUrl": "/image/utility/image-metadata-viewer",
    "guideSlug": "image-metadata-viewer-guide",
    "shortDescription": "View EXIF and file metadata from an image. Free, secure, no upload to server.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-dimension-checker",
      "image-format-detector",
      "color-picker-from-image"
    ]
  },
  {
    "id": "image-dimension-checker",
    "name": "Image Dimension Checker",
    "sectionId": "image",
    "subSectionId": "image-utility",
    "utilityUrl": "/image/utility/image-dimension-checker",
    "guideSlug": "image-dimension-checker-guide",
    "shortDescription": "Instantly check exact width, height, and aspect ratio of an image.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-metadata-viewer",
      "image-format-detector",
      "color-picker-from-image"
    ]
  },
  {
    "id": "image-format-detector",
    "name": "Image Format Detector",
    "sectionId": "image",
    "subSectionId": "image-utility",
    "utilityUrl": "/image/utility/image-format-detector",
    "guideSlug": "image-format-detector-guide",
    "shortDescription": "Detect the true MIME type and format of an image file.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-metadata-viewer",
      "image-dimension-checker",
      "color-picker-from-image"
    ]
  },
  {
    "id": "color-picker-from-image",
    "name": "Color Picker From Image",
    "sectionId": "image",
    "subSectionId": "image-utility",
    "utilityUrl": "/image/utility/color-picker-from-image",
    "guideSlug": "color-picker-from-image-guide",
    "shortDescription": "Click anywhere on an image to extract precise HEX and RGB colors.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-metadata-viewer",
      "image-dimension-checker",
      "image-format-detector"
    ]
  },
  {
    "id": "image-color-palette-extractor",
    "name": "Image Color Palette Extractor",
    "sectionId": "image",
    "subSectionId": "image-utility",
    "utilityUrl": "/image/utility/image-color-palette-extractor",
    "guideSlug": "image-color-palette-extractor-guide",
    "shortDescription": "Automatically extract the dominant color palette from any image.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-metadata-viewer",
      "image-dimension-checker",
      "image-format-detector"
    ]
  },
  {
    "id": "image-to-base64",
    "name": "Image to Base64",
    "sectionId": "image",
    "subSectionId": "image-developer",
    "utilityUrl": "/image/developer/image-to-base64",
    "guideSlug": "image-to-base64-guide",
    "shortDescription": "Convert image files to Base64 strings for CSS and HTML embedding.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "base64-to-image"
    ]
  },
  {
    "id": "base64-to-image",
    "name": "Base64 to Image",
    "sectionId": "image",
    "subSectionId": "image-developer",
    "utilityUrl": "/image/developer/base64-to-image",
    "guideSlug": "base64-to-image-guide",
    "shortDescription": "Convert Base64 data URI strings back into downloadable image files.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-to-base64"
    ]
  },
  {
    "id": "crop-image",
    "name": "Crop Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/crop-image",
    "guideSlug": "crop-image-guide",
    "shortDescription": "Crop images easily to remove unwanted edges or fit specific aspect ratios locally.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "image-resizer",
      "rotate-image",
      "flip-image"
    ]
  },
  {
    "id": "image-resizer",
    "name": "Image Resizer",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/image-resizer",
    "guideSlug": "image-resizer-guide",
    "shortDescription": "Resize image dimensions (width & height) quickly while maintaining aspect ratio.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "rotate-image",
      "flip-image"
    ]
  },
  {
    "id": "rotate-image",
    "name": "Rotate Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/rotate-image",
    "guideSlug": "rotate-image-guide",
    "shortDescription": "Rotate images by custom angles or standard 90-degree increments.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "flip-image"
    ]
  },
  {
    "id": "flip-image",
    "name": "Flip Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/flip-image",
    "guideSlug": "flip-image-guide",
    "shortDescription": "Mirror images horizontally or vertically instantly.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "image-upscaler",
    "name": "Image Upscaler",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/image-upscaler",
    "guideSlug": "image-upscaler-guide",
    "shortDescription": "Enlarge and upscale images smoothly with advanced browser algorithms.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "image-enhancer",
    "name": "Image Enhancer",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/image-enhancer",
    "guideSlug": "image-enhancer-guide",
    "shortDescription": "Auto-enhance image clarity, exposure, and color.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "image-sharpen",
    "name": "Sharpen Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/image-sharpen",
    "guideSlug": "image-sharpen-guide",
    "shortDescription": "Sharpen blurry images to improve crispness and detail.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "image-denoiser",
    "name": "Denoise Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/image-denoiser",
    "guideSlug": "image-denoiser-guide",
    "shortDescription": "Remove noise and grain from photos for a smoother look.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "brightness-and-contrast-adjuster",
    "name": "Brightness & Contrast",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/brightness-and-contrast-adjuster",
    "guideSlug": "brightness-and-contrast-adjuster-guide",
    "shortDescription": "Adjust image brightness, contrast, highlights, and shadows.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "color-adjuster",
    "name": "Color Adjuster",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/color-adjuster",
    "guideSlug": "color-adjuster-guide",
    "shortDescription": "Fine-tune image saturation, hue, vibrance, and temperature.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "grayscale",
    "name": "Grayscale Converter",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/grayscale",
    "guideSlug": "grayscale-guide",
    "shortDescription": "Convert images to pure grayscale instantly.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "color-to-black-and-white",
    "name": "Color to Black & White",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/color-to-black-and-white",
    "guideSlug": "color-to-black-and-white-guide",
    "shortDescription": "Apply high-contrast black and white filters to photos.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "black-and-white-to-color",
    "name": "Black & White to Color",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/black-and-white-to-color",
    "guideSlug": "black-and-white-to-color-guide",
    "shortDescription": "Add vintage and warmth color tints to black & white images.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "blur-image",
    "name": "Blur Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/blur-image",
    "guideSlug": "blur-image-guide",
    "shortDescription": "Apply adjustable gaussian blur to your images.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "pixelate-image",
    "name": "Pixelate Image",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/pixelate-image",
    "guideSlug": "pixelate-image-guide",
    "shortDescription": "Censor or pixelate images with an adjustable pixel size.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "add-watermark-to-image",
    "name": "Add Watermark",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/add-watermark-to-image",
    "guideSlug": "add-watermark-to-image-guide",
    "shortDescription": "Overlay custom text watermarks repeatedly to protect images.",
    "inputType": [
      "File Canvas / Canvas Drawings"
    ],
    "outputType": [
      "Modified Document File"
    ],
    "operationType": "editor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "add-text-on-image",
    "name": "Add Text",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/add-text-on-image",
    "guideSlug": "add-text-on-image-guide",
    "shortDescription": "Write customizable text directly on top of your images.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "add-logo-overlay",
    "name": "Add Logo Overlay",
    "sectionId": "editing",
    "subSectionId": "editing-tools",
    "utilityUrl": "/editing/tools/add-logo-overlay",
    "guideSlug": "add-logo-overlay-guide",
    "shortDescription": "Place a secondary logo or image perfectly on top of another image.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "crop-image",
      "image-resizer",
      "rotate-image"
    ]
  },
  {
    "id": "merge-pdf",
    "name": "Merge PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-management",
    "utilityUrl": "/tools/pdf/merge-pdf",
    "guideSlug": "merge-pdf-guide",
    "shortDescription": "Combine multiple PDF files into one directly in your browser.",
    "inputType": [
      "File Canvas / Canvas Drawings"
    ],
    "outputType": [
      "Modified Document File"
    ],
    "operationType": "editor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "split-pdf",
      "rotate-pdf",
      "delete-pdf-pages"
    ]
  },
  {
    "id": "split-pdf",
    "name": "Split PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-management",
    "utilityUrl": "/tools/pdf/split-pdf",
    "guideSlug": "split-pdf-guide",
    "shortDescription": "Split a PDF into multiple documents by defining page ranges.",
    "inputType": [
      "File Canvas / Canvas Drawings"
    ],
    "outputType": [
      "Modified Document File"
    ],
    "operationType": "editor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "merge-pdf",
      "rotate-pdf",
      "delete-pdf-pages"
    ]
  },
  {
    "id": "rotate-pdf",
    "name": "Rotate PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-management",
    "utilityUrl": "/tools/pdf/rotate-pdf",
    "guideSlug": "rotate-pdf-guide",
    "shortDescription": "Rotate pages in a PDF document by 90, 180, or 270 degrees.",
    "inputType": [
      "File Canvas / Canvas Drawings"
    ],
    "outputType": [
      "Modified Document File"
    ],
    "operationType": "editor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "merge-pdf",
      "split-pdf",
      "delete-pdf-pages"
    ]
  },
  {
    "id": "delete-pdf-pages",
    "name": "Delete PDF Pages",
    "sectionId": "pdf",
    "subSectionId": "pdf-management",
    "utilityUrl": "/tools/pdf/delete-pdf-pages",
    "guideSlug": "delete-pdf-pages-guide",
    "shortDescription": "Remove pages from your PDF document easily in your browser.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "merge-pdf",
      "split-pdf",
      "rotate-pdf"
    ]
  },
  {
    "id": "rearrange-pdf-pages",
    "name": "Rearrange PDF Pages",
    "sectionId": "pdf",
    "subSectionId": "pdf-management",
    "utilityUrl": "/tools/pdf/rearrange-pdf-pages",
    "guideSlug": "rearrange-pdf-pages-guide",
    "shortDescription": "Reorder pages of a PDF document using drag and drop.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "merge-pdf",
      "split-pdf",
      "rotate-pdf"
    ]
  },
  {
    "id": "extract-pdf-pages",
    "name": "Extract PDF Pages",
    "sectionId": "pdf",
    "subSectionId": "pdf-management",
    "utilityUrl": "/tools/pdf/extract-pdf-pages",
    "guideSlug": "extract-pdf-pages-guide",
    "shortDescription": "Extract specific pages or page ranges from your PDF document.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "merge-pdf",
      "split-pdf",
      "rotate-pdf"
    ]
  },
  {
    "id": "jpg-to-pdf",
    "name": "JPG to PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-conversion",
    "utilityUrl": "/tools/pdf/jpg-to-pdf",
    "guideSlug": "jpg-to-pdf-guide",
    "shortDescription": "Convert JPG, JPEG, and PNG images into a PDF document.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "pdf-to-jpg"
    ]
  },
  {
    "id": "pdf-to-jpg",
    "name": "PDF to JPG",
    "sectionId": "pdf",
    "subSectionId": "pdf-conversion",
    "utilityUrl": "/tools/pdf/pdf-to-jpg",
    "guideSlug": "pdf-to-jpg-guide",
    "shortDescription": "Extract pages of a PDF as high-quality JPG images.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": true,
    "hasFormula": false,
    "relatedToolIds": [
      "jpg-to-pdf"
    ]
  },
  {
    "id": "compress-pdf",
    "name": "Compress PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-utility",
    "utilityUrl": "/tools/pdf/compress-pdf",
    "guideSlug": "compress-pdf-guide",
    "shortDescription": "Reduce the file size of your PDF documents in the browser.",
    "inputType": [
      "Large File / Document"
    ],
    "outputType": [
      "Compressed File / Document"
    ],
    "operationType": "compressor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "sign-pdf",
      "watermark-pdf",
      "protect-pdf"
    ]
  },
  {
    "id": "sign-pdf",
    "name": "Sign PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-utility",
    "utilityUrl": "/tools/pdf/sign-pdf",
    "guideSlug": "sign-pdf-guide",
    "shortDescription": "Draw or upload a signature and place it on your PDF pages.",
    "inputType": [
      "File Canvas / Canvas Drawings"
    ],
    "outputType": [
      "Modified Document File"
    ],
    "operationType": "editor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "compress-pdf",
      "watermark-pdf",
      "protect-pdf"
    ]
  },
  {
    "id": "watermark-pdf",
    "name": "Add Watermark to PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-utility",
    "utilityUrl": "/tools/pdf/watermark-pdf",
    "guideSlug": "watermark-pdf-guide",
    "shortDescription": "Add text or image watermarks to your PDF pages.",
    "inputType": [
      "File Canvas / Canvas Drawings"
    ],
    "outputType": [
      "Modified Document File"
    ],
    "operationType": "editor",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "compress-pdf",
      "sign-pdf",
      "protect-pdf"
    ]
  },
  {
    "id": "protect-pdf",
    "name": "Protect PDF",
    "sectionId": "pdf",
    "subSectionId": "pdf-utility",
    "utilityUrl": "/tools/pdf/protect-pdf",
    "guideSlug": "protect-pdf-guide",
    "shortDescription": "Encrypt and lock your PDF document with a password.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "compress-pdf",
      "sign-pdf",
      "watermark-pdf"
    ]
  },
  {
    "id": "metadata-viewer",
    "name": "PDF Metadata Viewer",
    "sectionId": "pdf",
    "subSectionId": "pdf-utility",
    "utilityUrl": "/tools/pdf/metadata-viewer",
    "guideSlug": "metadata-viewer-guide",
    "shortDescription": "View and inspect hidden metadata of any PDF document.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "compress-pdf",
      "sign-pdf",
      "watermark-pdf"
    ]
  },
  {
    "id": "page-counter",
    "name": "PDF Page Counter",
    "sectionId": "pdf",
    "subSectionId": "pdf-utility",
    "utilityUrl": "/tools/pdf/page-counter",
    "guideSlug": "page-counter-guide",
    "shortDescription": "Count pages of multiple PDF files and calculate totals.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "compress-pdf",
      "sign-pdf",
      "watermark-pdf"
    ]
  },
  {
    "id": "pdf-to-text",
    "name": "PDF to Text",
    "sectionId": "pdf",
    "subSectionId": "pdf-text",
    "utilityUrl": "/tools/pdf/pdf-to-text",
    "guideSlug": "pdf-to-text-guide",
    "shortDescription": "Extract readable text from a PDF document.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": []
  },
  {
    "id": "qr-code-generator",
    "name": "QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/qr-code-generator",
    "guideSlug": "qr-code-generator-guide",
    "shortDescription": "Generate custom QR codes for text, URLs, Wi-Fi, UPI, email, phone, and more.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-scanner",
      "url-qr-code-generator",
      "text-qr-code-generator"
    ]
  },
  {
    "id": "qr-code-scanner",
    "name": "QR Code Scanner",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/qr-code-scanner",
    "guideSlug": "qr-code-scanner-guide",
    "shortDescription": "Scan QR codes using camera, image files, or PDF documents.",
    "inputType": [
      "Camera Stream",
      "Image File Upload"
    ],
    "outputType": [
      "Decoded Text / Action Link"
    ],
    "operationType": "scanner",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "url-qr-code-generator",
      "text-qr-code-generator"
    ]
  },
  {
    "id": "url-qr-code-generator",
    "name": "URL QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/url-qr-code-generator",
    "guideSlug": "url-qr-code-generator-guide",
    "shortDescription": "Convert a website URL into a scannable QR code.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "text-qr-code-generator"
    ]
  },
  {
    "id": "text-qr-code-generator",
    "name": "Text QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/text-qr-code-generator",
    "guideSlug": "text-qr-code-generator-guide",
    "shortDescription": "Convert plain text into a scannable QR code.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "wifi-qr-code-generator",
    "name": "Wi-Fi QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/wifi-qr-code-generator",
    "guideSlug": "wifi-qr-code-generator-guide",
    "shortDescription": "Create a Wi-Fi QR code to easily share network credentials.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "vcard-qr-code-generator",
    "name": "vCard QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/vcard-qr-code-generator",
    "guideSlug": "vcard-qr-code-generator-guide",
    "shortDescription": "Generate a vCard QR code to easily share contact information.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "email-qr-code-generator",
    "name": "Email QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/email-qr-code-generator",
    "guideSlug": "email-qr-code-generator-guide",
    "shortDescription": "Generate a QR code that opens an email draft with recipient and subject pre-filled.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "phone-qr-code-generator",
    "name": "Phone QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/phone-qr-code-generator",
    "guideSlug": "phone-qr-code-generator-guide",
    "shortDescription": "Create a QR code that initiates a phone call when scanned.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "sms-qr-code-generator",
    "name": "SMS QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/sms-qr-code-generator",
    "guideSlug": "sms-qr-code-generator-guide",
    "shortDescription": "Create a QR code that opens an SMS with a prefilled message.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "upi-qr-code-generator",
    "name": "UPI QR Code Generator",
    "sectionId": "qr",
    "subSectionId": "qr-qr-tools",
    "utilityUrl": "/tools/qr/upi-qr-code-generator",
    "guideSlug": "upi-qr-code-generator-guide",
    "shortDescription": "Generate QR codes for UPI payments.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "qr-code-generator",
      "qr-code-scanner",
      "url-qr-code-generator"
    ]
  },
  {
    "id": "emi-calculator",
    "name": "EMI Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/emi-calculator",
    "guideSlug": "emi-calculator-guide",
    "shortDescription": "Calculate monthly loan EMI, total interest, and total repayment amount.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "sip-calculator",
      "compound-interest-calculator",
      "cagr-calculator"
    ]
  },
  {
    "id": "sip-calculator",
    "name": "SIP Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/sip-calculator",
    "guideSlug": "sip-calculator-guide",
    "shortDescription": "Estimate maturity value and estimated returns of your mutual fund SIP investments.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "compound-interest-calculator",
      "cagr-calculator"
    ]
  },
  {
    "id": "compound-interest-calculator",
    "name": "Compound Interest Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/compound-interest-calculator",
    "guideSlug": "compound-interest-calculator-guide",
    "shortDescription": "Calculate future compound interest earnings with flexible compounding frequencies.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "cagr-calculator"
    ]
  },
  {
    "id": "cagr-calculator",
    "name": "CAGR Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/cagr-calculator",
    "guideSlug": "cagr-calculator-guide",
    "shortDescription": "Calculate Compound Annual Growth Rate of investments over years.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "id": "fd-calculator",
    "name": "FD Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/fd-calculator",
    "guideSlug": "fd-calculator-guide",
    "shortDescription": "Calculate Fixed Deposit maturity amount and interest earned.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "id": "roi-calculator",
    "name": "ROI Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/roi-calculator",
    "guideSlug": "roi-calculator-guide",
    "shortDescription": "Calculate Return on Investment percentage and annualized performance.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "id": "currency-converter",
    "name": "Currency Converter",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/currency-converter",
    "guideSlug": "currency-converter-guide",
    "shortDescription": "Convert between different currencies using standard exchange rates.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "id": "mortgage-calculator",
    "name": "Mortgage Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/mortgage-calculator",
    "guideSlug": "mortgage-calculator-guide",
    "shortDescription": "Estimate monthly mortgage payments, including property tax and home insurance.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "id": "loan-calculator",
    "name": "Loan Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-financial",
    "utilityUrl": "/tools/calculators/loan-calculator",
    "guideSlug": "loan-calculator-guide",
    "shortDescription": "Calculate monthly loan payments, total interest, and amortized schedules.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "emi-calculator",
      "sip-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "id": "income-tax-calculator",
    "name": "Income Tax Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/income-tax-calculator",
    "guideSlug": "income-tax-calculator-guide",
    "shortDescription": "Estimate income tax payable under Old and New tax regimes with deductions.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "gst-calculator",
      "discount-calculator",
      "profit-calculator"
    ]
  },
  {
    "id": "gst-calculator",
    "name": "GST Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/gst-calculator",
    "guideSlug": "gst-calculator-guide",
    "shortDescription": "Calculate GST amounts by adding or removing GST with custom rates.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "discount-calculator",
      "profit-calculator"
    ]
  },
  {
    "id": "discount-calculator",
    "name": "Discount Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/discount-calculator",
    "guideSlug": "discount-calculator-guide",
    "shortDescription": "Calculate discount savings, final sales price, and additional discounts.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "gst-calculator",
      "profit-calculator"
    ]
  },
  {
    "id": "profit-calculator",
    "name": "Profit Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/profit-calculator",
    "guideSlug": "profit-calculator-guide",
    "shortDescription": "Calculate cost, selling price, profit amount, and profit margins.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "gst-calculator",
      "discount-calculator"
    ]
  },
  {
    "id": "youtube-earnings-calculator",
    "name": "YouTube Earnings Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/youtube-earnings-calculator",
    "guideSlug": "youtube-earnings-calculator-guide",
    "shortDescription": "Estimate daily, monthly, and yearly YouTube video creation earnings.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "gst-calculator",
      "discount-calculator"
    ]
  },
  {
    "id": "adsense-revenue-calculator",
    "name": "AdSense Revenue Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/adsense-revenue-calculator",
    "guideSlug": "adsense-revenue-calculator-guide",
    "shortDescription": "Estimate Google AdSense earnings based on page views, CPC, and CTR.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "gst-calculator",
      "discount-calculator"
    ]
  },
  {
    "id": "simple-interest-calculator",
    "name": "Simple Interest Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/simple-interest-calculator",
    "guideSlug": "simple-interest-calculator-guide",
    "shortDescription": "Calculate simple interest earnings, principal amounts, or active interest rates.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "gst-calculator",
      "discount-calculator"
    ]
  },
  {
    "id": "salary-calculator",
    "name": "Salary Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-tax-business",
    "utilityUrl": "/tools/calculators/salary-calculator",
    "guideSlug": "salary-calculator-guide",
    "shortDescription": "Convert salary figures between hourly, daily, weekly, monthly, and annual amounts.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "income-tax-calculator",
      "gst-calculator",
      "discount-calculator"
    ]
  },
  {
    "id": "percentage-calculator",
    "name": "Percentage Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-math-science",
    "utilityUrl": "/tools/calculators/percentage-calculator",
    "guideSlug": "percentage-calculator-guide",
    "shortDescription": "Compute percentages, percentage increases, decreases, and fractions.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "cgpa-calculator",
      "scientific-calculator",
      "basic-calculator"
    ]
  },
  {
    "id": "cgpa-calculator",
    "name": "CGPA Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-math-science",
    "utilityUrl": "/tools/calculators/cgpa-calculator",
    "guideSlug": "cgpa-calculator-guide",
    "shortDescription": "Calculate cumulative grade point average (CGPA) and convert to percentages.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "percentage-calculator",
      "scientific-calculator",
      "basic-calculator"
    ]
  },
  {
    "id": "scientific-calculator",
    "name": "Scientific Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-math-science",
    "utilityUrl": "/tools/calculators/scientific-calculator",
    "guideSlug": "scientific-calculator-guide",
    "shortDescription": "Full scientific calculator supporting trigonometry, logs, factorials, and powers.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "percentage-calculator",
      "cgpa-calculator",
      "basic-calculator"
    ]
  },
  {
    "id": "basic-calculator",
    "name": "Basic Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-math-science",
    "utilityUrl": "/tools/calculators/basic-calculator",
    "guideSlug": "basic-calculator-guide",
    "shortDescription": "Simple mathematical calculator for addition, subtraction, multiplication, and division.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "percentage-calculator",
      "cgpa-calculator",
      "scientific-calculator"
    ]
  },
  {
    "id": "age-calculator",
    "name": "Age Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-health-date",
    "utilityUrl": "/tools/calculators/age-calculator",
    "guideSlug": "age-calculator-guide",
    "shortDescription": "Calculate chronological age in years, months, and days, and countdown to next birthday.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "date-difference-calculator",
      "bmi-calculator",
      "calorie-calculator"
    ]
  },
  {
    "id": "date-difference-calculator",
    "name": "Date Difference Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-health-date",
    "utilityUrl": "/tools/calculators/date-difference-calculator",
    "guideSlug": "date-difference-calculator-guide",
    "shortDescription": "Calculate exact years, months, and days difference between two selected dates.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "age-calculator",
      "bmi-calculator",
      "calorie-calculator"
    ]
  },
  {
    "id": "bmi-calculator",
    "name": "BMI Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-health-date",
    "utilityUrl": "/tools/calculators/bmi-calculator",
    "guideSlug": "bmi-calculator-guide",
    "shortDescription": "Calculate body mass index (BMI) and identify healthy weight ranges.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "age-calculator",
      "date-difference-calculator",
      "calorie-calculator"
    ]
  },
  {
    "id": "calorie-calculator",
    "name": "Calorie Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-health-date",
    "utilityUrl": "/tools/calculators/calorie-calculator",
    "guideSlug": "calorie-calculator-guide",
    "shortDescription": "Calculate BMR and daily calorie maintenance requirements based on fitness goals.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "age-calculator",
      "date-difference-calculator",
      "bmi-calculator"
    ]
  },
  {
    "id": "tip-calculator",
    "name": "Tip Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-health-date",
    "utilityUrl": "/tools/calculators/tip-calculator",
    "guideSlug": "tip-calculator-guide",
    "shortDescription": "Calculate split bills, tip percentages, and exact share payments.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "age-calculator",
      "date-difference-calculator",
      "bmi-calculator"
    ]
  },
  {
    "id": "time-duration-calculator",
    "name": "Time Duration Calculator",
    "sectionId": "calculators",
    "subSectionId": "calculators-health-date",
    "utilityUrl": "/tools/calculators/time-duration-calculator",
    "guideSlug": "time-duration-calculator-guide",
    "shortDescription": "Calculate exact elapsed time durations in hours, minutes, and seconds between times.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "age-calculator",
      "date-difference-calculator",
      "bmi-calculator"
    ]
  },
  {
    "id": "word-counter",
    "name": "Word Counter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/word-counter",
    "guideSlug": "word-counter-guide",
    "shortDescription": "Count words, characters, sentences, and paragraphs in real time.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "character-counter",
      "case-converter",
      "remove-duplicate-lines"
    ]
  },
  {
    "id": "character-counter",
    "name": "Character Counter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/character-counter",
    "guideSlug": "character-counter-guide",
    "shortDescription": "Count characters and spaces in your text instantly.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "case-converter",
      "remove-duplicate-lines"
    ]
  },
  {
    "id": "case-converter",
    "name": "Case Converter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/case-converter",
    "guideSlug": "case-converter-guide",
    "shortDescription": "Convert text between uppercase, lowercase, sentence case, and title case.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "remove-duplicate-lines"
    ]
  },
  {
    "id": "remove-duplicate-lines",
    "name": "Remove Duplicate Lines",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/remove-duplicate-lines",
    "guideSlug": "remove-duplicate-lines-guide",
    "shortDescription": "Remove duplicate lines from text or lists instantly.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "text-sorter",
    "name": "Text Sorter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/text-sorter",
    "guideSlug": "text-sorter-guide",
    "shortDescription": "Sort text lines alphabetically or reverse list order.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "text-compare",
    "name": "Text Compare",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/text-compare",
    "guideSlug": "text-compare-guide",
    "shortDescription": "Compare two text blocks side-by-side to highlight differences.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "text-diff",
    "name": "Text Diff Checker",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/text-diff",
    "guideSlug": "text-diff-guide",
    "shortDescription": "Find differences between two versions of text with inline highlights.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "remove-extra-spaces",
    "name": "Remove Extra Spaces",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/remove-extra-spaces",
    "guideSlug": "remove-extra-spaces-guide",
    "shortDescription": "Strip multiple spaces, trailing white spaces, and empty lines.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "line-counter",
    "name": "Line Counter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/line-counter",
    "guideSlug": "line-counter-guide",
    "shortDescription": "Count the total number of lines in a text document.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "sentence-counter",
    "name": "Sentence Counter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/sentence-counter",
    "guideSlug": "sentence-counter-guide",
    "shortDescription": "Count sentences in a block of text.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "paragraph-counter",
    "name": "Paragraph Counter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/paragraph-counter",
    "guideSlug": "paragraph-counter-guide",
    "shortDescription": "Count paragraphs in a block of text.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "text-reverser",
    "name": "Text Reverser",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/text-reverser",
    "guideSlug": "text-reverser-guide",
    "shortDescription": "Reverse character letters or word orders.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "slug-generator",
    "name": "Slug Generator",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/slug-generator",
    "guideSlug": "slug-generator-guide",
    "shortDescription": "Convert text to URL-friendly slugs.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "find-replace",
    "name": "Find and Replace Text",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/find-replace",
    "guideSlug": "find-replace-guide",
    "shortDescription": "Find text patterns and replace with other values.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "text-uppercase",
    "name": "Text to Uppercase",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/text-uppercase",
    "guideSlug": "text-uppercase-guide",
    "shortDescription": "Convert text to all capital letters.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "text-lowercase",
    "name": "Text to Lowercase",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/text-lowercase",
    "guideSlug": "text-lowercase-guide",
    "shortDescription": "Convert text to all lowercase letters.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "capitalize-text",
    "name": "Capitalize Text",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/capitalize-text",
    "guideSlug": "capitalize-text-guide",
    "shortDescription": "Capitalize the first letter of each sentence.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "title-case",
    "name": "Title Case Converter",
    "sectionId": "text",
    "subSectionId": "text-text-manipulation",
    "utilityUrl": "/tools/text/title-case",
    "guideSlug": "title-case-guide",
    "shortDescription": "Convert text to Title Case capitalization.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "word-counter",
      "character-counter",
      "case-converter"
    ]
  },
  {
    "id": "lorem-ipsum",
    "name": "Lorem Ipsum Generator",
    "sectionId": "text",
    "subSectionId": "text-generators",
    "utilityUrl": "/tools/text/lorem-ipsum",
    "guideSlug": "lorem-ipsum-guide",
    "shortDescription": "Generate dummy Lorem Ipsum paragraphs for design layouts.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "random-text"
    ]
  },
  {
    "id": "random-text",
    "name": "Random Text Generator",
    "sectionId": "text",
    "subSectionId": "text-generators",
    "utilityUrl": "/tools/text/random-text",
    "guideSlug": "random-text-guide",
    "shortDescription": "Generate random strings, passwords, or alphanumeric lists.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "lorem-ipsum"
    ]
  },
  {
    "id": "json-formatter",
    "name": "JSON Formatter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-formatters",
    "utilityUrl": "/tools/dev/json-formatter",
    "guideSlug": "json-formatter-guide",
    "shortDescription": "Prettify and format JSON data with customizable spacing.",
    "inputType": [
      "Code / Raw String"
    ],
    "outputType": [
      "Formatted / Indented Code"
    ],
    "operationType": "formatter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "json-validator",
      "xml-formatter",
      "yaml-formatter"
    ]
  },
  {
    "id": "json-validator",
    "name": "JSON Validator",
    "sectionId": "dev",
    "subSectionId": "dev-dev-formatters",
    "utilityUrl": "/tools/dev/json-validator",
    "guideSlug": "json-validator-guide",
    "shortDescription": "Validate and check JSON syntax structure.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "json-formatter",
      "xml-formatter",
      "yaml-formatter"
    ]
  },
  {
    "id": "xml-formatter",
    "name": "XML Formatter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-formatters",
    "utilityUrl": "/tools/dev/xml-formatter",
    "guideSlug": "xml-formatter-guide",
    "shortDescription": "Format and beautify XML strings.",
    "inputType": [
      "Code / Raw String"
    ],
    "outputType": [
      "Formatted / Indented Code"
    ],
    "operationType": "formatter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "json-formatter",
      "json-validator",
      "yaml-formatter"
    ]
  },
  {
    "id": "yaml-formatter",
    "name": "YAML Formatter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-formatters",
    "utilityUrl": "/tools/dev/yaml-formatter",
    "guideSlug": "yaml-formatter-guide",
    "shortDescription": "Clean up and format YAML documents.",
    "inputType": [
      "Code / Raw String"
    ],
    "outputType": [
      "Formatted / Indented Code"
    ],
    "operationType": "formatter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "json-formatter",
      "json-validator",
      "xml-formatter"
    ]
  },
  {
    "id": "sql-formatter",
    "name": "SQL Formatter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-formatters",
    "utilityUrl": "/tools/dev/sql-formatter",
    "guideSlug": "sql-formatter-guide",
    "shortDescription": "Format and beautify SQL queries.",
    "inputType": [
      "Code / Raw String"
    ],
    "outputType": [
      "Formatted / Indented Code"
    ],
    "operationType": "formatter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "json-formatter",
      "json-validator",
      "xml-formatter"
    ]
  },
  {
    "id": "code-beautifier",
    "name": "Code Beautifier",
    "sectionId": "dev",
    "subSectionId": "dev-dev-formatters",
    "utilityUrl": "/tools/dev/code-beautifier",
    "guideSlug": "code-beautifier-guide",
    "shortDescription": "Beautify HTML, CSS, and JS code formatting.",
    "inputType": [
      "Code / Raw String"
    ],
    "outputType": [
      "Formatted / Indented Code"
    ],
    "operationType": "formatter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "json-formatter",
      "json-validator",
      "xml-formatter"
    ]
  },
  {
    "id": "base64-encoder-decoder",
    "name": "Base64 Encoder/Decoder",
    "sectionId": "dev",
    "subSectionId": "dev-dev-encoders",
    "utilityUrl": "/tools/dev/base64-encoder-decoder",
    "guideSlug": "base64-encoder-decoder-guide",
    "shortDescription": "Encode plain text to Base64 or decode Base64 strings.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "url-encoder-decoder",
      "jwt-decoder",
      "html-encoder-decoder"
    ]
  },
  {
    "id": "url-encoder-decoder",
    "name": "URL Encoder/Decoder",
    "sectionId": "dev",
    "subSectionId": "dev-dev-encoders",
    "utilityUrl": "/tools/dev/url-encoder-decoder",
    "guideSlug": "url-encoder-decoder-guide",
    "shortDescription": "Percent-encode or decode URL component parameters.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "base64-encoder-decoder",
      "jwt-decoder",
      "html-encoder-decoder"
    ]
  },
  {
    "id": "jwt-decoder",
    "name": "JWT Decoder",
    "sectionId": "dev",
    "subSectionId": "dev-dev-encoders",
    "utilityUrl": "/tools/dev/jwt-decoder",
    "guideSlug": "jwt-decoder-guide",
    "shortDescription": "Decode JWT headers and payload values locally.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "html-encoder-decoder"
    ]
  },
  {
    "id": "html-encoder-decoder",
    "name": "HTML Encoder/Decoder",
    "sectionId": "dev",
    "subSectionId": "dev-dev-encoders",
    "utilityUrl": "/tools/dev/html-encoder-decoder",
    "guideSlug": "html-encoder-decoder-guide",
    "shortDescription": "Convert characters to HTML entities and decode them.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "jwt-decoder"
    ]
  },
  {
    "id": "html-minifier",
    "name": "HTML Minifier",
    "sectionId": "dev",
    "subSectionId": "dev-dev-minifiers",
    "utilityUrl": "/tools/dev/html-minifier",
    "guideSlug": "html-minifier-guide",
    "shortDescription": "Compress HTML files to reduce loading size.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "css-minifier",
      "js-minifier",
      "regex-tester"
    ]
  },
  {
    "id": "css-minifier",
    "name": "CSS Minifier",
    "sectionId": "dev",
    "subSectionId": "dev-dev-minifiers",
    "utilityUrl": "/tools/dev/css-minifier",
    "guideSlug": "css-minifier-guide",
    "shortDescription": "Minify CSS files to reduce loading size.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "html-minifier",
      "js-minifier",
      "regex-tester"
    ]
  },
  {
    "id": "js-minifier",
    "name": "JS Minifier",
    "sectionId": "dev",
    "subSectionId": "dev-dev-minifiers",
    "utilityUrl": "/tools/dev/js-minifier",
    "guideSlug": "js-minifier-guide",
    "shortDescription": "Compress JavaScript code files to reduce loading size.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "html-minifier",
      "css-minifier",
      "regex-tester"
    ]
  },
  {
    "id": "regex-tester",
    "name": "Regex Tester",
    "sectionId": "dev",
    "subSectionId": "dev-dev-minifiers",
    "utilityUrl": "/tools/dev/regex-tester",
    "guideSlug": "regex-tester-guide",
    "shortDescription": "Test and check regular expression patterns live.",
    "inputType": [
      "Interactive Keyboard Typings"
    ],
    "outputType": [
      "Speed (WPM)",
      "Accuracy Rate"
    ],
    "operationType": "test",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "html-minifier",
      "css-minifier",
      "js-minifier"
    ]
  },
  {
    "id": "uuid-generator",
    "name": "UUID Generator",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/uuid-generator",
    "guideSlug": "uuid-generator-guide",
    "shortDescription": "Generate RFC4122 compliant UUIDs (v4) instantly.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "hash-generator",
      "color-picker-tool",
      "hex-to-rgb"
    ]
  },
  {
    "id": "hash-generator",
    "name": "Hash Generator",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/hash-generator",
    "guideSlug": "hash-generator-guide",
    "shortDescription": "Generate SHA-256, SHA-512, MD5, and SHA-1 hashes.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "color-picker-tool",
      "hex-to-rgb"
    ]
  },
  {
    "id": "color-picker-tool",
    "name": "Color Picker",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/color-picker-tool",
    "guideSlug": "color-picker-tool-guide",
    "shortDescription": "Pick colors, create gradients, and explore palettes.",
    "inputType": [
      "User Inputs"
    ],
    "outputType": [
      "Processed Results"
    ],
    "operationType": "utility",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "hex-to-rgb"
    ]
  },
  {
    "id": "hex-to-rgb",
    "name": "HEX to RGB Converter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/hex-to-rgb",
    "guideSlug": "hex-to-rgb-guide",
    "shortDescription": "Convert HEX color codes to RGB format values.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "color-picker-tool"
    ]
  },
  {
    "id": "rgb-to-hex",
    "name": "RGB to HEX Converter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/rgb-to-hex",
    "guideSlug": "rgb-to-hex-guide",
    "shortDescription": "Convert RGB color codes to HEX format values.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "color-picker-tool"
    ]
  },
  {
    "id": "timestamp-converter",
    "name": "Timestamp Converter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/timestamp-converter",
    "guideSlug": "timestamp-converter-guide",
    "shortDescription": "Convert human dates to epoch timestamps and vice versa.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "color-picker-tool"
    ]
  },
  {
    "id": "unix-time-converter",
    "name": "Unix Time Converter",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/unix-time-converter",
    "guideSlug": "unix-time-converter-guide",
    "shortDescription": "Show current Unix epoch time in seconds and milliseconds.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "color-picker-tool"
    ]
  },
  {
    "id": "markdown-previewer",
    "name": "Markdown Previewer",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/markdown-previewer",
    "guideSlug": "markdown-previewer-guide",
    "shortDescription": "Compose Markdown formatting and render HTML preview live.",
    "inputType": [
      "HTML/CSS/JS Markup Code"
    ],
    "outputType": [
      "Isolated Interactive Sandbox Preview"
    ],
    "operationType": "previewer",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "color-picker-tool"
    ]
  },
  {
    "id": "html-previewer",
    "name": "HTML Previewer",
    "sectionId": "dev",
    "subSectionId": "dev-dev-utilities",
    "utilityUrl": "/tools/dev/html-previewer",
    "guideSlug": "html-previewer-guide",
    "shortDescription": "Render raw HTML code elements live in a safe frame.",
    "inputType": [
      "HTML/CSS/JS Markup Code"
    ],
    "outputType": [
      "Isolated Interactive Sandbox Preview"
    ],
    "operationType": "previewer",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "uuid-generator",
      "hash-generator",
      "color-picker-tool"
    ]
  },
  {
    "id": "length-converter",
    "name": "Length Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/length-converter",
    "guideSlug": "length-converter-guide",
    "shortDescription": "Convert between kilometers, meters, centimeters, miles, and inches.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "weight-converter",
      "temperature-converter",
      "area-converter"
    ]
  },
  {
    "id": "weight-converter",
    "name": "Weight Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/weight-converter",
    "guideSlug": "weight-converter-guide",
    "shortDescription": "Convert between kilograms, grams, pounds, ounces, and tons.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "temperature-converter",
      "area-converter"
    ]
  },
  {
    "id": "temperature-converter",
    "name": "Temperature Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/temperature-converter",
    "guideSlug": "temperature-converter-guide",
    "shortDescription": "Convert Celsius, Fahrenheit, and Kelvin scales.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "area-converter"
    ]
  },
  {
    "id": "area-converter",
    "name": "Area Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/area-converter",
    "guideSlug": "area-converter-guide",
    "shortDescription": "Convert between square meters, square feet, acres, and hectares.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "volume-converter",
    "name": "Volume Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/volume-converter",
    "guideSlug": "volume-converter-guide",
    "shortDescription": "Convert liters, milliliters, gallons, and cubic meters.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "speed-converter",
    "name": "Speed Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/speed-converter",
    "guideSlug": "speed-converter-guide",
    "shortDescription": "Convert km/h, mph, m/s, and knots.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "time-converter",
    "name": "Time Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/time-converter",
    "guideSlug": "time-converter-guide",
    "shortDescription": "Convert hours, minutes, seconds, days, and weeks.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "data-storage-converter",
    "name": "Data Storage Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/data-storage-converter",
    "guideSlug": "data-storage-converter-guide",
    "shortDescription": "Convert gigabytes, megabytes, terabytes, and bits.",
    "inputType": [
      "Numeric Parameters",
      "Rates / Tenures"
    ],
    "outputType": [
      "Calculated Metrics",
      "Schedules"
    ],
    "operationType": "calculator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "fuel-efficiency-converter",
    "name": "Fuel Efficiency Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/fuel-efficiency-converter",
    "guideSlug": "fuel-efficiency-converter-guide",
    "shortDescription": "Convert mpg, L/100km, and km/L values.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "angle-converter",
    "name": "Angle Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/angle-converter",
    "guideSlug": "angle-converter-guide",
    "shortDescription": "Convert degrees, radians, and gradians.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "pressure-converter",
    "name": "Pressure Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/pressure-converter",
    "guideSlug": "pressure-converter-guide",
    "shortDescription": "Convert Pascal, Bar, PSI, and Atmosphere units.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "energy-converter",
    "name": "Energy Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/energy-converter",
    "guideSlug": "energy-converter-guide",
    "shortDescription": "Convert Joules, Calories, Kilowatt-hours, and BTUs.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "power-converter",
    "name": "Power Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/power-converter",
    "guideSlug": "power-converter-guide",
    "shortDescription": "Convert Watts, Kilowatts, and Horsepower.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "frequency-converter",
    "name": "Frequency Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/frequency-converter",
    "guideSlug": "frequency-converter-guide",
    "shortDescription": "Convert Hertz, Kilohertz, Megahertz, and Gigahertz.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "number-base-converter",
    "name": "Number Base Converter",
    "sectionId": "convert",
    "subSectionId": "convert-conversions",
    "utilityUrl": "/tools/convert/number-base-converter",
    "guideSlug": "number-base-converter-guide",
    "shortDescription": "Convert binary, octal, decimal, and hexadecimal bases.",
    "inputType": [
      "Source Format File / Value"
    ],
    "outputType": [
      "Target Format File / Value"
    ],
    "operationType": "converter",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "length-converter",
      "weight-converter",
      "temperature-converter"
    ]
  },
  {
    "id": "meta-tag-generator",
    "name": "Meta Tag Generator",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/meta-tag-generator",
    "guideSlug": "meta-tag-generator-guide",
    "shortDescription": "Generate HTML search engine tags (Title, Description, Robots).",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-title-checker",
      "meta-description-checker",
      "seo-keyword-density"
    ]
  },
  {
    "id": "meta-title-checker",
    "name": "Meta Title Length Checker",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/meta-title-checker",
    "guideSlug": "meta-title-checker-guide",
    "shortDescription": "Verify that your web page titles meet standard SEO lengths.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-description-checker",
      "seo-keyword-density"
    ]
  },
  {
    "id": "meta-description-checker",
    "name": "Meta Description Length Checker",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/meta-description-checker",
    "guideSlug": "meta-description-checker-guide",
    "shortDescription": "Verify descriptions fit the Google snippet pixel length limits.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "seo-keyword-density"
    ]
  },
  {
    "id": "seo-keyword-density",
    "name": "Keyword Density Checker",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/seo-keyword-density",
    "guideSlug": "seo-keyword-density-guide",
    "shortDescription": "Analyze your page texts for keyword density optimization.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": true,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "seo-slug-generator",
    "name": "Slug Generator",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/seo-slug-generator",
    "guideSlug": "seo-slug-generator-guide",
    "shortDescription": "Create search-friendly slugs for web page routing structures.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "robots-txt-generator",
    "name": "Robots.txt Generator",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/robots-txt-generator",
    "guideSlug": "robots-txt-generator-guide",
    "shortDescription": "Generate robots.txt crawl directives files for web crawlers.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "sitemap-xml-generator",
    "name": "Sitemap XML Generator",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/sitemap-xml-generator",
    "guideSlug": "sitemap-xml-generator-guide",
    "shortDescription": "Build search XML sitemap files to index page paths.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "open-graph-generator",
    "name": "Open Graph Tag Generator",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/open-graph-generator",
    "guideSlug": "open-graph-generator-guide",
    "shortDescription": "Generate HTML OG metadata tags for Facebook, LinkedIn sharing.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "twitter-card-generator",
    "name": "Twitter Card Generator",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/twitter-card-generator",
    "guideSlug": "twitter-card-generator-guide",
    "shortDescription": "Generate summary cards tags for Twitter formatting previews.",
    "inputType": [
      "Configuration Settings",
      "Parameters"
    ],
    "outputType": [
      "Generated Output String / Key"
    ],
    "operationType": "generator",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "seo-word-count",
    "name": "Word Count for SEO",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/seo-word-count",
    "guideSlug": "seo-word-count-guide",
    "shortDescription": "Measure keyword presence and total read lengths for articles.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  },
  {
    "id": "heading-structure-checker",
    "name": "Heading Structure Checker",
    "sectionId": "seo",
    "subSectionId": "seo-seo-generators",
    "utilityUrl": "/tools/seo/heading-structure-checker",
    "guideSlug": "heading-structure-checker-guide",
    "shortDescription": "Analyze hierarchy structures (H1-H6 tags) of pasted code.",
    "inputType": [
      "Input Text / Domain"
    ],
    "outputType": [
      "Validation Rules Report"
    ],
    "operationType": "checker",
    "runsInBrowser": true,
    "requiresBackend": false,
    "hasFormula": false,
    "relatedToolIds": [
      "meta-tag-generator",
      "meta-title-checker",
      "meta-description-checker"
    ]
  }
];

export type BlogSeries = {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroDescription: string;
  icon?: string;
  thumbnail?: string;
  sectionId: string;
  featured?: boolean;
};

export type BlogSubSeries = {
  id: string;
  seriesId: string;
  name: string;
  slug: string;
  description: string;
  utilityCount?: number;
};

export type BlogGuide = {
  id: string;
  utilityId: string;
  title: string;
  slug: string;
  seriesId: string;
  subSeriesId: string;
  metaTitle: string;
  metaDescription: string;
  featured?: boolean;
  priority?: "high" | "medium" | "low";
  updatedAt?: string;
};

export const blogSeriesList: BlogSeries[] = sectionRegistry.map(sec => {
  let heroDescription = `Guides for understanding ${sec.name.toLowerCase()} operations, calculations, formatting structures, and local browser processing.`;
  let description = sec.description;
  if (sec.id === 'pdf') {
    description = "Learn how PDF utilities handle compression, merging, splitting, conversion, page management, watermarking, and file preparation.";
    heroDescription = "Guides for understanding PDF compression, merging, splitting, conversion, page management, signing, watermarking, and document preparation.";
  } else if (sec.id === 'dev') {
    description = "Understand how formatting, validation, encoding, decoding, previewing, and generation utilities work for development tasks.";
    heroDescription = "Guides for formatting minified JSON, validating XML, parsing CSS parameters, generating UUIDs, and encoding base64 inputs.";
  } else if (sec.id === 'image') {
    description = "Understand image file optimization, compression algorithms, and formats like PNG, JPEG, SVG, and WebP.";
    heroDescription = "Guides for optimizing image files, adjusting quality metrics, and converting graphic structures locally.";
  } else if (sec.id === 'text') {
    description = "Learn how text counters, text case converters, cleaners, and differential validators process text data structures.";
    heroDescription = "Guides for counting tokens, splitting lines, comparing drafts, and formatting case rules.";
  } else if (sec.id === 'seo') {
    description = "Verify open graph tags, configure search directives like robots.txt and sitemaps, and check H1-H6 outline headers.";
    heroDescription = "Guides for generating robots directives, checking tag lengths, and auditing site heading outlines.";
  } else if (sec.id === 'qr') {
    description = "Learn QR code matrix formats, custom block styling, error correction levels, and local image scanning protocols.";
    heroDescription = "Guides for rendering custom QR images and scanning barcode profiles securely in the browser.";
  } else if (sec.id === 'calculators') {
    description = "Learn mathematical formulas and formulas for EMI, interest parameters, age calendars, and body index parameters.";
    heroDescription = "Guides for computing financial interest, age calculations, calendar ranges, and calorie goals.";
  }
  
  return {
    id: sec.id,
    name: sec.name,
    slug: sec.slug,
    description,
    heroDescription,
    icon: sec.icon || sec.id,
    thumbnail: `/blog/thumbnails/${sec.id}.svg`,
    sectionId: sec.id,
    featured: ['pdf', 'dev', 'image', 'text', 'calculators'].includes(sec.id)
  };
});

export const blogSubSeriesList: BlogSubSeries[] = subSectionRegistry.map(sub => {
  const count = toolRegistry.filter(t => t.subSectionId === sub.id).length;
  return {
    id: sub.id,
    seriesId: sub.sectionId,
    name: sub.name,
    slug: sub.slug,
    description: sub.description,
    utilityCount: count
  };
});

export const blogGuidesList: BlogGuide[] = toolRegistry.map(tool => {
  const title = `How the ${tool.name} Works: File Size Reduction, Operation Flow, and Limits`;
  const metaTitle = `How the ${tool.name} Works | Singulariti`;
  const metaDescription = `Learn how the ${tool.name.toLowerCase()} validates the file, processes values, and handles limits locally.`;
  const featured = ['image-compressor', 'pdf-compressor', 'json-formatter', 'word-counter', 'meta-tag-generator', 'emi-calculator'].includes(tool.id);
  
  return {
    id: tool.id + "-guide",
    utilityId: tool.id,
    title,
    slug: tool.guideSlug,
    seriesId: tool.sectionId,
    subSeriesId: tool.subSectionId,
    metaTitle,
    metaDescription,
    featured,
    priority: featured ? "high" : "medium",
    updatedAt: "2026-06-04"
  };
});

