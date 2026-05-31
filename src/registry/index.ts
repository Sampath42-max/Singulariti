import { EcosystemRegistry } from './types';

export const registry: EcosystemRegistry = {
  categories: [
    {
      id: 'image',
      name: 'Image Tools',
      description: 'Free online image tools to compress, convert, and edit images entirely in your browser.',
      seoTitle: 'Image Tools — Free Image Tools Online | Singulariti',
      seoDescription: 'A complete collection of free online image tools. Compress, convert, and resize images without uploading them to any server.',
      path: '/image',
      collections: [
        {
          id: 'compression',
          name: 'Compression Tools',
          description: 'Reduce image file sizes without losing quality. Works instantly in your browser.',
          seoTitle: 'Image Compression Tools — Compress Images Online Free | Singulariti',
          seoDescription: 'Free image compression tools. Compress JPG, PNG, and WebP images quickly and securely in your browser.',
          path: '/image/compression',
          tools: [
            {
              id: 'image-compressor',
              name: 'Image Compressor',
              description: 'Reduce image file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'Image Compressor — Compress Images Online Free | singulariti.in',
              seoDescription: 'Compress images online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/image-compressor',
            },
            {
              id: 'jpg-compressor',
              name: 'JPG Compressor',
              description: 'Reduce JPG file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'JPG Compressor — Compress JPG Online Free | singulariti.in',
              seoDescription: 'Compress JPG files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/jpg-compressor',
            },
            {
              id: 'jpeg-compressor',
              name: 'JPEG Compressor',
              description: 'Reduce JPEG file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'JPEG Compressor — Compress JPEG Online Free | singulariti.in',
              seoDescription: 'Compress JPEG files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/jpeg-compressor',
            },
            {
              id: 'png-compressor',
              name: 'PNG Compressor',
              description: 'Reduce PNG file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'PNG Compressor — Compress PNG Online Free | singulariti.in',
              seoDescription: 'Compress PNG files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/png-compressor',
            },
            {
              id: 'webp-compressor',
              name: 'WebP Compressor',
              description: 'Reduce WebP file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'WebP Compressor — Compress WebP Online Free | singulariti.in',
              seoDescription: 'Compress WebP files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/webp-compressor',
            }
          ]
        },
        {
          id: 'conversion',
          name: 'Conversion Tools',
          description: 'Convert images between different formats instantly and securely.',
          seoTitle: 'Image Conversion Tools — Convert Images Online Free | Singulariti',
          seoDescription: 'Free image conversion tools. Convert between JPG, PNG, and WebP instantly in your browser.',
          path: '/image/conversion',
          tools: [
            {
              id: 'jpg-to-png',
              name: 'JPG to PNG',
              description: 'Convert JPG images to PNG format with transparency support. Free, secure, no upload to server.',
              seoTitle: 'JPG to PNG — Convert JPG to PNG Online Free | singulariti.in',
              seoDescription: 'Convert JPG images to PNG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-png',
              options: { from: 'image/jpeg', to: 'image/png' }
            },
            {
              id: 'png-to-jpg',
              name: 'PNG to JPG',
              description: 'Convert PNG images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'PNG to JPG — Convert PNG to JPG Online Free | singulariti.in',
              seoDescription: 'Convert PNG images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/png-to-jpg',
              options: { from: 'image/png', to: 'image/jpeg' }
            },
            {
              id: 'jpg-to-webp',
              name: 'JPG to WebP',
              description: 'Convert JPG images to WebP format for better compression. Free, secure, no upload to server.',
              seoTitle: 'JPG to WebP — Convert JPG to WebP Online Free | singulariti.in',
              seoDescription: 'Convert JPG images to WebP online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-webp',
              options: { from: 'image/jpeg', to: 'image/webp' }
            },
            {
              id: 'png-to-webp',
              name: 'PNG to WebP',
              description: 'Convert PNG images to WebP format for better compression. Free, secure, no upload to server.',
              seoTitle: 'PNG to WebP — Convert PNG to WebP Online Free | singulariti.in',
              seoDescription: 'Convert PNG images to WebP online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/png-to-webp',
              options: { from: 'image/png', to: 'image/webp' }
            },
            {
              id: 'webp-to-jpg',
              name: 'WebP to JPG',
              description: 'Convert WebP images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'WebP to JPG — Convert WebP to JPG Online Free | singulariti.in',
              seoDescription: 'Convert WebP images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/webp-to-jpg',
              options: { from: 'image/webp', to: 'image/jpeg' }
            },
            {
              id: 'webp-to-png',
              name: 'WebP to PNG',
              description: 'Convert WebP images to PNG format. Free, secure, no upload to server.',
              seoTitle: 'WebP to PNG — Convert WebP to PNG Online Free | singulariti.in',
              seoDescription: 'Convert WebP images to PNG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/webp-to-png',
              options: { from: 'image/webp', to: 'image/png' }
            },
            {
              id: 'jpg-to-jpeg',
              name: 'JPG to JPEG',
              description: 'Convert JPG images to JPEG format. Free, secure, no upload to server.',
              seoTitle: 'JPG to JPEG — Convert JPG to JPEG Online Free | singulariti.in',
              seoDescription: 'Convert JPG images to JPEG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-jpeg',
              options: { from: 'image/jpeg', to: 'image/jpeg' }
            },
            {
              id: 'jpeg-to-jpg',
              name: 'JPEG to JPG',
              description: 'Convert JPEG images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'JPEG to JPG — Convert JPEG to JPG Online Free | singulariti.in',
              seoDescription: 'Convert JPEG images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpeg-to-jpg',
              options: { from: 'image/jpeg', to: 'image/jpeg' }
            }
          ]
        },
        {
          id: 'editing',
          name: 'Editing Tools',
          description: 'Edit, resize, crop, and apply filters to images instantly.',
          seoTitle: 'Image Editing Tools — Edit Images Online Free | Singulariti',
          seoDescription: 'Free online image editing tools. Resize, crop, rotate, flip, and apply filters to your images directly in the browser.',
          path: '/image/editing',
          tools: [
            {
              id: 'crop-image',
              name: 'Crop Image',
              description: 'Crop images easily to remove unwanted edges or fit specific aspect ratios locally.',
              seoTitle: 'Crop Image Online — Free Image Cropper | Singulariti',
              seoDescription: 'Crop images online for free. Adjust aspect ratios safely in your browser without uploading.',
              engine: 'single-editing',
              path: '/image/editing/crop-image',
              options: { action: 'crop' }
            },
            {
              id: 'image-resizer',
              name: 'Image Resizer',
              description: 'Resize image dimensions (width & height) quickly while maintaining aspect ratio.',
              seoTitle: 'Image Resizer Online — Resize Images Free | Singulariti',
              seoDescription: 'Resize images online instantly. Free and secure browser-based image resizer.',
              engine: 'single-editing',
              path: '/image/editing/image-resizer',
              options: { action: 'resize' }
            },
            {
              id: 'rotate-image',
              name: 'Rotate Image',
              description: 'Rotate images by custom angles or standard 90-degree increments.',
              seoTitle: 'Rotate Image Online — Free Image Rotator | Singulariti',
              seoDescription: 'Rotate images freely in your browser. Fast, secure, no uploads required.',
              engine: 'single-editing',
              path: '/image/editing/rotate-image',
              options: { action: 'rotate' }
            },
            {
              id: 'flip-image',
              name: 'Flip Image',
              description: 'Mirror images horizontally or vertically instantly.',
              seoTitle: 'Flip Image Online — Free Image Flipper | Singulariti',
              seoDescription: 'Flip or mirror your images vertically and horizontally securely in your browser.',
              engine: 'single-editing',
              path: '/image/editing/flip-image',
              options: { action: 'flip' }
            },
            {
              id: 'image-upscaler',
              name: 'Image Upscaler',
              description: 'Enlarge and upscale images smoothly with advanced browser algorithms.',
              seoTitle: 'Image Upscaler Online — Enlarge Images Free | Singulariti',
              seoDescription: 'Upscale and enlarge images without losing quality. Completely browser-based.',
              engine: 'single-editing',
              path: '/image/editing/image-upscaler',
              options: { action: 'upscaler' }
            },
            {
              id: 'image-enhancer',
              name: 'Image Enhancer',
              description: 'Auto-enhance image clarity, exposure, and color.',
              seoTitle: 'Image Enhancer Online — Auto Enhance Images | Singulariti',
              seoDescription: 'Instantly auto-enhance photo colors and clarity securely in your web browser.',
              engine: 'single-editing',
              path: '/image/editing/image-enhancer',
              options: { action: 'enhancer' }
            },
            {
              id: 'image-sharpen',
              name: 'Sharpen Image',
              description: 'Sharpen blurry images to improve crispness and detail.',
              seoTitle: 'Sharpen Image Online — Fix Blurry Photos | Singulariti',
              seoDescription: 'Apply sharpening filters to blurry photos online for free without uploading.',
              engine: 'single-editing',
              path: '/image/editing/image-sharpen',
              options: { action: 'sharpen' }
            },
            {
              id: 'image-denoiser',
              name: 'Denoise Image',
              description: 'Remove noise and grain from photos for a smoother look.',
              seoTitle: 'Denoise Image Online — Remove Photo Grain | Singulariti',
              seoDescription: 'Remove noise and grain from your images safely in your web browser.',
              engine: 'single-editing',
              path: '/image/editing/image-denoiser',
              options: { action: 'denoiser' }
            },
            {
              id: 'brightness-and-contrast-adjuster',
              name: 'Brightness & Contrast',
              description: 'Adjust image brightness, contrast, highlights, and shadows.',
              seoTitle: 'Brightness & Contrast Adjuster Online | Singulariti',
              seoDescription: 'Easily adjust brightness, contrast, highlights, and shadows securely online.',
              engine: 'single-editing',
              path: '/image/editing/brightness-and-contrast-adjuster',
              options: { action: 'brightnessContrast' }
            },
            {
              id: 'color-adjuster',
              name: 'Color Adjuster',
              description: 'Fine-tune image saturation, hue, vibrance, and temperature.',
              seoTitle: 'Color Adjuster Online — Free Color Correction | Singulariti',
              seoDescription: 'Apply professional color correction to images completely locally in your browser.',
              engine: 'single-editing',
              path: '/image/editing/color-adjuster',
              options: { action: 'colorAdjust' }
            },
            {
              id: 'grayscale',
              name: 'Grayscale Converter',
              description: 'Convert images to pure grayscale instantly.',
              seoTitle: 'Convert Image to Grayscale Online Free | Singulariti',
              seoDescription: 'Turn color images into grayscale/black-and-white instantly and securely.',
              engine: 'single-editing',
              path: '/image/editing/grayscale',
              options: { action: 'grayscale' }
            },
            {
              id: 'color-to-black-and-white',
              name: 'Color to Black & White',
              description: 'Apply high-contrast black and white filters to photos.',
              seoTitle: 'Color to Black and White Image Converter | Singulariti',
              seoDescription: 'Convert color photos to artistic black and white securely without uploading.',
              engine: 'single-editing',
              path: '/image/editing/color-to-black-and-white',
              options: { action: 'colorToBw' }
            },
            {
              id: 'black-and-white-to-color',
              name: 'Black & White to Color',
              description: 'Add vintage and warmth color tints to black & white images.',
              seoTitle: 'Colorize Black & White Images Online | Singulariti',
              seoDescription: 'Apply color tints to black and white photos safely and securely in your browser.',
              engine: 'single-editing',
              path: '/image/editing/black-and-white-to-color',
              options: { action: 'bwToColor' }
            },
            {
              id: 'blur-image',
              name: 'Blur Image',
              description: 'Apply adjustable gaussian blur to your images.',
              seoTitle: 'Blur Image Online Free — Add Gaussian Blur | Singulariti',
              seoDescription: 'Apply professional blur effects to your images locally and securely.',
              engine: 'single-editing',
              path: '/image/editing/blur-image',
              options: { action: 'blur' }
            },
            {
              id: 'pixelate-image',
              name: 'Pixelate Image',
              description: 'Censor or pixelate images with an adjustable pixel size.',
              seoTitle: 'Pixelate Image Online Free — Censor Photos | Singulariti',
              seoDescription: 'Pixelate and censor images securely in your browser without any server uploads.',
              engine: 'single-editing',
              path: '/image/editing/pixelate-image',
              options: { action: 'pixelate' }
            },
            {
              id: 'add-watermark-to-image',
              name: 'Add Watermark',
              description: 'Overlay custom text watermarks repeatedly to protect images.',
              seoTitle: 'Add Watermark to Image Online Free | Singulariti',
              seoDescription: 'Protect your photos by adding a text watermark locally in your browser.',
              engine: 'single-editing',
              path: '/image/editing/add-watermark-to-image',
              options: { action: 'watermark' }
            },
            {
              id: 'add-text-on-image',
              name: 'Add Text',
              description: 'Write customizable text directly on top of your images.',
              seoTitle: 'Add Text to Image Online Free | Singulariti',
              seoDescription: 'Overlay text onto images easily and securely entirely in your browser.',
              engine: 'single-editing',
              path: '/image/editing/add-text-on-image',
              options: { action: 'text' }
            },
            {
              id: 'add-logo-overlay',
              name: 'Add Logo Overlay',
              description: 'Place a secondary logo or image perfectly on top of another image.',
              seoTitle: 'Add Logo Overlay to Image Online Free | Singulariti',
              seoDescription: 'Overlay logos or watermarks onto your images quickly and securely online.',
              engine: 'single-editing',
              path: '/image/editing/add-logo-overlay',
              options: { action: 'logo' }
            }
          ]
        },
        {
          id: 'utility',
          name: 'Utility Tools',
          description: 'Extract metadata, colors, and analyze image dimensions.',
          seoTitle: 'Image Utility Tools — Analyze Images Online Free | Singulariti',
          seoDescription: 'Free online image utilities. Extract color palettes, pick colors, check dimensions, and view EXIF metadata.',
          path: '/image/utility',
          tools: [
            {
              id: 'image-metadata-viewer',
              name: 'Image Metadata Viewer',
              description: 'View EXIF and file metadata from an image. Free, secure, no upload to server.',
              seoTitle: 'Image Metadata Viewer — View EXIF Data Online Free | singulariti.in',
              seoDescription: 'View image EXIF data online for free. Extract camera metadata, dates, and file properties.',
              engine: 'utility',
              path: '/image/utility/image-metadata-viewer',
              options: { action: 'metadata' }
            },
            {
              id: 'image-dimension-checker',
              name: 'Image Dimension Checker',
              description: 'Instantly check exact width, height, and aspect ratio of an image.',
              seoTitle: 'Image Dimension Checker — Check Image Size Online Free | singulariti.in',
              seoDescription: 'Check image dimensions online for free. Quickly find the exact pixel width, height, and ratio.',
              engine: 'utility',
              path: '/image/utility/image-dimension-checker',
              options: { action: 'dimension' }
            },
            {
              id: 'image-format-detector',
              name: 'Image Format Detector',
              description: 'Detect the true MIME type and format of an image file.',
              seoTitle: 'Image Format Detector — Detect Image Type Online Free | singulariti.in',
              seoDescription: 'Detect true image format online. Analyzes file headers to determine the exact MIME type.',
              engine: 'utility',
              path: '/image/utility/image-format-detector',
              options: { action: 'format' }
            },
            {
              id: 'color-picker-from-image',
              name: 'Color Picker From Image',
              description: 'Click anywhere on an image to extract precise HEX and RGB colors.',
              seoTitle: 'Color Picker From Image — Pick Colors Online Free | singulariti.in',
              seoDescription: 'Pick colors from images online. Click on any pixel to instantly get HEX, RGB, and HSL codes.',
              engine: 'utility',
              path: '/image/utility/color-picker-from-image',
              options: { action: 'colorpicker' }
            },
            {
              id: 'image-color-palette-extractor',
              name: 'Image Color Palette Extractor',
              description: 'Automatically extract the dominant color palette from any image.',
              seoTitle: 'Image Color Palette Extractor — Extract Colors Online Free | singulariti.in',
              seoDescription: 'Extract color palettes from images online. Find dominant HEX colors for design inspiration.',
              engine: 'utility',
              path: '/image/utility/image-color-palette-extractor',
              options: { action: 'palette' }
            }
          ]
        },
        {
          id: 'developer',
          name: 'Developer Tools',
          description: 'Convert between base64 strings and image files.',
          seoTitle: 'Image Developer Tools — Base64 Converters Online Free | Singulariti',
          seoDescription: 'Free online image developer tools. Convert images to Base64 strings and vice versa securely.',
          path: '/image/developer',
          tools: [
            {
              id: 'image-to-base64',
              name: 'Image to Base64',
              description: 'Convert image files to Base64 strings for CSS and HTML embedding.',
              seoTitle: 'Image to Base64 — Convert Image to Base64 String Online Free | singulariti.in',
              seoDescription: 'Convert images to Base64 strings online for free. Instantly generate data URIs for web development.',
              engine: 'developer',
              path: '/image/developer/image-to-base64',
              options: { action: 'tobase64' }
            },
            {
              id: 'base64-to-image',
              name: 'Base64 to Image',
              description: 'Convert Base64 data URI strings back into downloadable image files.',
              seoTitle: 'Base64 to Image — Convert Base64 to Image Online Free | singulariti.in',
              seoDescription: 'Convert Base64 strings to images online for free. Instantly decode and download Base64 data URIs.',
              engine: 'developer',
              path: '/image/developer/base64-to-image',
              options: { action: 'frombase64' }
            }
          ]
        }
      ]
    },
    {
      id: 'pdf',
      name: 'PDF Tools',
      description: 'Free online PDF tools to merge, split, rotate, delete pages, sign, watermark, and convert PDFs entirely in your browser.',
      seoTitle: 'PDF Tools — Edit and Convert PDFs Online Free | Singulariti',
      seoDescription: 'Free online browser-based PDF tools. Merge, split, rotate, sign, compress and convert PDFs instantly and securely without uploading to any server.',
      path: '/tools/pdf',
      collections: [
        {
          id: 'management',
          name: 'PDF Management',
          description: 'Organize, merge, split, rotate, delete, and extract PDF pages inside your browser.',
          seoTitle: 'PDF Management Tools — Organize PDFs Online Free | Singulariti',
          seoDescription: 'Free online PDF management tools. Merge, split, delete, rotate, rearrange, and extract PDF pages instantly.',
          path: '/tools/pdf',
          tools: [
            {
              id: 'merge-pdf',
              name: 'Merge PDF',
              description: 'Combine multiple PDF files into one directly in your browser.',
              seoTitle: 'Merge PDF Online Free — Combine PDF Files | Singulariti',
              seoDescription: 'Merge multiple PDF files into a single document. Safe, secure, and runs locally.',
              engine: 'utility',
              path: '/tools/pdf/merge-pdf'
            },
            {
              id: 'split-pdf',
              name: 'Split PDF',
              description: 'Split a PDF into multiple documents by defining page ranges.',
              seoTitle: 'Split PDF Online Free — Extract Page Ranges | Singulariti',
              seoDescription: 'Extract pages or ranges of pages from your PDF file into a new document.',
              engine: 'utility',
              path: '/tools/pdf/split-pdf'
            },
            {
              id: 'rotate-pdf',
              name: 'Rotate PDF',
              description: 'Rotate pages in a PDF document by 90, 180, or 270 degrees.',
              seoTitle: 'Rotate PDF Online Free — Rotate PDF Pages | Singulariti',
              seoDescription: 'Rotate single or multiple pages in a PDF file. Free and secure.',
              engine: 'utility',
              path: '/tools/pdf/rotate-pdf'
            },
            {
              id: 'delete-pdf-pages',
              name: 'Delete PDF Pages',
              description: 'Remove pages from your PDF document easily in your browser.',
              seoTitle: 'Delete PDF Pages Online Free — Remove PDF Pages | Singulariti',
              seoDescription: 'Remove unwanted pages from a PDF document and download the new file.',
              engine: 'utility',
              path: '/tools/pdf/delete-pdf-pages'
            },
            {
              id: 'rearrange-pdf-pages',
              name: 'Rearrange PDF Pages',
              description: 'Reorder pages of a PDF document using drag and drop.',
              seoTitle: 'Rearrange PDF Pages Online Free — Sort PDF Pages | Singulariti',
              seoDescription: 'Drag and drop PDF pages to rearrange their order easily in the browser.',
              engine: 'utility',
              path: '/tools/pdf/rearrange-pdf-pages'
            },
            {
              id: 'extract-pdf-pages',
              name: 'Extract PDF Pages',
              description: 'Extract specific pages or page ranges from your PDF document.',
              seoTitle: 'Extract PDF Pages Online Free — Extract Pages | Singulariti',
              seoDescription: 'Extract only the pages you need from a PDF document. Safe and secure.',
              engine: 'utility',
              path: '/tools/pdf/extract-pdf-pages'
            }
          ]
        },
        {
          id: 'conversion',
          name: 'PDF Conversion',
          description: 'Convert documents and images to and from PDF files in your browser.',
          seoTitle: 'PDF Conversion Tools — Convert PDFs Online Free | Singulariti',
          seoDescription: 'Free online PDF converter tools. Convert images to PDF and PDFs to images.',
          path: '/tools/pdf',
          tools: [
            {
              id: 'jpg-to-pdf',
              name: 'JPG to PDF',
              description: 'Convert JPG, JPEG, and PNG images into a PDF document.',
              seoTitle: 'JPG to PDF Online Free — Images to PDF Converter | Singulariti',
              seoDescription: 'Convert images to PDF files online. Reorder images, adjust margins, and orientation.',
              engine: 'conversion',
              path: '/tools/pdf/jpg-to-pdf'
            },
            {
              id: 'pdf-to-jpg',
              name: 'PDF to JPG',
              description: 'Extract pages of a PDF as high-quality JPG images.',
              seoTitle: 'PDF to JPG Online Free — PDF to Image Converter | Singulariti',
              seoDescription: 'Convert pages in your PDF file into JPG images. Download single images or ZIP files.',
              engine: 'conversion',
              path: '/tools/pdf/pdf-to-jpg'
            }
          ]
        },
        {
          id: 'utility',
          name: 'PDF Utilities',
          description: 'Compress, sign, watermark, count pages, and view metadata of PDF documents.',
          seoTitle: 'PDF Utility Tools — Edit PDFs Online Free | Singulariti',
          seoDescription: 'Free browser-based PDF utilities. Compress, sign, add watermarks, and inspect metadata.',
          path: '/tools/pdf',
          tools: [
            {
              id: 'compress-pdf',
              name: 'Compress PDF',
              description: 'Reduce the file size of your PDF documents in the browser.',
              seoTitle: 'Compress PDF Online Free — Reduce PDF Size | Singulariti',
              seoDescription: 'Optimize and compress PDF files locally on your device for fast sharing.',
              engine: 'compression',
              path: '/tools/pdf/compress-pdf'
            },
            {
              id: 'sign-pdf',
              name: 'Sign PDF',
              description: 'Draw or upload a signature and place it on your PDF pages.',
              seoTitle: 'Sign PDF Online Free — Draw and Place Signatures | Singulariti',
              seoDescription: 'Add digital signatures to your PDF files securely. Draw or upload signature.',
              engine: 'editing',
              path: '/tools/pdf/sign-pdf'
            },
            {
              id: 'watermark-pdf',
              name: 'Add Watermark to PDF',
              description: 'Add text or image watermarks to your PDF pages.',
              seoTitle: 'Add Watermark to PDF Online Free — Text and Image | Singulariti',
              seoDescription: 'Add customized text or image watermarks to select pages in your PDF file.',
              engine: 'editing',
              path: '/tools/pdf/watermark-pdf'
            },
            {
              id: 'metadata-viewer',
              name: 'PDF Metadata Viewer',
              description: 'View and inspect hidden metadata of any PDF document.',
              seoTitle: 'PDF Metadata Viewer — View PDF EXIF & Info | Singulariti',
              seoDescription: 'Inspect hidden PDF properties, creation dates, author, producer and file stats.',
              engine: 'utility',
              path: '/tools/pdf/metadata-viewer'
            },
            {
              id: 'page-counter',
              name: 'PDF Page Counter',
              description: 'Count pages of multiple PDF files and calculate totals.',
              seoTitle: 'PDF Page Counter — Count PDF Pages Online | Singulariti',
              seoDescription: 'Upload one or multiple PDF documents to count pages and get totals.',
              engine: 'utility',
              path: '/tools/pdf/page-counter'
            }
          ]
        },
        {
          id: 'text',
          name: 'PDF Text Extraction',
          description: 'Extract textual content from PDF files in the browser.',
          seoTitle: 'PDF Text Extraction — PDF to Text Online | Singulariti',
          seoDescription: 'Extract text from PDF files online. Copy or download as plain text.',
          path: '/tools/pdf',
          tools: [
            {
              id: 'pdf-to-text',
              name: 'PDF to Text',
              description: 'Extract readable text from a PDF document.',
              seoTitle: 'PDF to Text Online Free — Text Extractor | Singulariti',
              seoDescription: 'Extract text from PDF pages instantly in the browser. Copy or save as txt file.',
              engine: 'utility',
              path: '/tools/pdf/pdf-to-text'
            }
          ]
        }
      ]
    },
    {
      id: 'qr',
      name: 'QR Tools',
      description: 'Free online tools to generate and scan custom QR codes in your browser.',
      seoTitle: 'QR Code Tools — Generate & Scan QRs Online Free | Singulariti',
      seoDescription: 'Create custom styled QR codes or scan QR codes from camera, image files, or PDF documents locally.',
      path: '/tools/qr',
      collections: [
        {
          id: 'qr-tools',
          name: 'QR Code Tools',
          description: 'Generate customized QR codes or scan QR codes instantly in the browser.',
          seoTitle: 'QR Code Tools — Online Generators and Scanners | Singulariti',
          seoDescription: 'Free online QR tools. Customize color, size, margins, add logos, export to PDF/SVG, or scan.',
          path: '/tools/qr',
          tools: [
            {
              id: 'qr-code-generator',
              name: 'QR Code Generator',
              description: 'Generate custom QR codes for text, URLs, Wi-Fi, UPI, email, phone, and more.',
              seoTitle: 'QR Code Generator — Create Custom QR Codes | Singulariti',
              seoDescription: 'Create custom styled QR codes with logo overlays and download as PNG, SVG, or PDF.',
              engine: 'developer',
              path: '/tools/qr/qr-code-generator'
            },
            {
              id: 'qr-code-scanner',
              name: 'QR Code Scanner',
              description: 'Scan QR codes using camera, image files, or PDF documents.',
              seoTitle: 'QR Code Scanner — Scan QR Online | Singulariti',
              seoDescription: 'Scan QR codes from webcam, photos, or uploaded PDF pages locally.',
              engine: 'utility',
              path: '/tools/qr/qr-code-scanner'
            }
          ]
        }
      ]
    }
  ]
};

// Helper methods for easy lookup

export function getCategoryById(id: string) {
  return registry.categories.find(c => c.id === id);
}

export function getCollectionByPath(categoryPath: string, collectionId: string) {
  const category = getCategoryById(categoryPath.replace('/', ''));
  return category?.collections.find(c => c.id === collectionId);
}

export function getToolByPath(categoryPath: string, collectionId: string, toolId: string) {
  const collection = getCollectionByPath(categoryPath, collectionId);
  return collection?.tools.find(t => t.id === toolId);
}

export function getAllTools() {
  return registry.categories.flatMap(category => 
    category.collections.flatMap(collection => collection.tools)
  );
}
