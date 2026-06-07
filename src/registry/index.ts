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
              seoTitle: 'Image Compressor — Compress Images Online Free | Singulariti',
              seoDescription: 'Compress images online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/image-compressor',
            },
            {
              id: 'jpg-compressor',
              name: 'JPG Compressor',
              description: 'Reduce JPG file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'JPG Compressor — Compress JPG Online Free | Singulariti',
              seoDescription: 'Compress JPG files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/jpg-compressor',
            },
            {
              id: 'jpeg-compressor',
              name: 'JPEG Compressor',
              description: 'Reduce JPEG file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'JPEG Compressor — Compress JPEG Online Free | Singulariti',
              seoDescription: 'Compress JPEG files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/jpeg-compressor',
            },
            {
              id: 'png-compressor',
              name: 'PNG Compressor',
              description: 'Reduce PNG file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'PNG Compressor — Compress PNG Online Free | Singulariti',
              seoDescription: 'Compress PNG files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/png-compressor',
            },
            {
              id: 'webp-compressor',
              name: 'WebP Compressor',
              description: 'Reduce WebP file size while keeping quality. Free, secure, no upload to server.',
              seoTitle: 'WebP Compressor — Compress WebP Online Free | Singulariti',
              seoDescription: 'Compress WebP files online for free. Reduce file size up to 90% while maintaining quality.',
              engine: 'compression',
              path: '/image/compression/webp-compressor',
            },
            {
              id: 'svg-compressor',
              name: 'SVG Compressor',
              description: 'Minify SVG files to reduce file size. Free, secure, no upload to server.',
              seoTitle: 'SVG Compressor — Compress SVG Online Free | Singulariti',
              seoDescription: 'Compress SVG files online for free. Minify your vector graphics instantly in your browser.',
              engine: 'compression',
              path: '/image/compression/svg-compressor',
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
              seoTitle: 'JPG to PNG — Convert JPG to PNG Online Free | Singulariti',
              seoDescription: 'Convert JPG images to PNG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-png',
              options: { from: 'image/jpeg', to: 'image/png' }
            },
            {
              id: 'png-to-jpg',
              name: 'PNG to JPG',
              description: 'Convert PNG images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'PNG to JPG — Convert PNG to JPG Online Free | Singulariti',
              seoDescription: 'Convert PNG images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/png-to-jpg',
              options: { from: 'image/png', to: 'image/jpeg' }
            },
            {
              id: 'jpg-to-webp',
              name: 'JPG to WebP',
              description: 'Convert JPG images to WebP format for better compression. Free, secure, no upload to server.',
              seoTitle: 'JPG to WebP — Convert JPG to WebP Online Free | Singulariti',
              seoDescription: 'Convert JPG images to WebP online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-webp',
              options: { from: 'image/jpeg', to: 'image/webp' }
            },
            {
              id: 'png-to-webp',
              name: 'PNG to WebP',
              description: 'Convert PNG images to WebP format for better compression. Free, secure, no upload to server.',
              seoTitle: 'PNG to WebP — Convert PNG to WebP Online Free | Singulariti',
              seoDescription: 'Convert PNG images to WebP online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/png-to-webp',
              options: { from: 'image/png', to: 'image/webp' }
            },
            {
              id: 'webp-to-jpg',
              name: 'WebP to JPG',
              description: 'Convert WebP images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'WebP to JPG — Convert WebP to JPG Online Free | Singulariti',
              seoDescription: 'Convert WebP images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/webp-to-jpg',
              options: { from: 'image/webp', to: 'image/jpeg' }
            },
            {
              id: 'webp-to-png',
              name: 'WebP to PNG',
              description: 'Convert WebP images to PNG format. Free, secure, no upload to server.',
              seoTitle: 'WebP to PNG — Convert WebP to PNG Online Free | Singulariti',
              seoDescription: 'Convert WebP images to PNG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/webp-to-png',
              options: { from: 'image/webp', to: 'image/png' }
            },
            {
              id: 'jpg-to-jpeg',
              name: 'JPG to JPEG',
              description: 'Convert JPG images to JPEG format. Free, secure, no upload to server.',
              seoTitle: 'JPG to JPEG — Convert JPG to JPEG Online Free | Singulariti',
              seoDescription: 'Convert JPG images to JPEG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-jpeg',
              options: { from: 'image/jpeg', to: 'image/jpeg' }
            },
            {
              id: 'jpeg-to-jpg',
              name: 'JPEG to JPG',
              description: 'Convert JPEG images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'JPEG to JPG — Convert JPEG to JPG Online Free | Singulariti',
              seoDescription: 'Convert JPEG images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpeg-to-jpg',
              options: { from: 'image/jpeg', to: 'image/jpeg' }
            },
            {
              id: 'svg-to-png',
              name: 'SVG to PNG',
              description: 'Convert SVG vector images to PNG format. Free, secure, no upload to server.',
              seoTitle: 'SVG to PNG — Convert SVG to PNG Online Free | Singulariti',
              seoDescription: 'Convert SVG images to PNG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/svg-to-png',
              options: { from: 'image/svg+xml', to: 'image/png' }
            },
            {
              id: 'svg-to-jpg',
              name: 'SVG to JPG',
              description: 'Convert SVG vector images to JPG format. Free, secure, no upload to server.',
              seoTitle: 'SVG to JPG — Convert SVG to JPG Online Free | Singulariti',
              seoDescription: 'Convert SVG images to JPG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/svg-to-jpg',
              options: { from: 'image/svg+xml', to: 'image/jpeg' }
            },
            {
              id: 'svg-to-webp',
              name: 'SVG to WebP',
              description: 'Convert SVG vector images to WebP format. Free, secure, no upload to server.',
              seoTitle: 'SVG to WebP — Convert SVG to WebP Online Free | Singulariti',
              seoDescription: 'Convert SVG images to WebP online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/svg-to-webp',
              options: { from: 'image/svg+xml', to: 'image/webp' }
            },
            {
              id: 'png-to-svg',
              name: 'PNG to SVG',
              description: 'Convert PNG images to SVG format. Free, secure, no upload to server.',
              seoTitle: 'PNG to SVG — Convert PNG to SVG Online Free | Singulariti',
              seoDescription: 'Convert PNG images to SVG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/png-to-svg',
              options: { from: 'image/png', to: 'image/svg+xml' }
            },
            {
              id: 'jpg-to-svg',
              name: 'JPG to SVG',
              description: 'Convert JPG images to SVG format. Free, secure, no upload to server.',
              seoTitle: 'JPG to SVG — Convert JPG to SVG Online Free | Singulariti',
              seoDescription: 'Convert JPG images to SVG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/jpg-to-svg',
              options: { from: 'image/jpeg', to: 'image/svg+xml' }
            },
            {
              id: 'webp-to-svg',
              name: 'WebP to SVG',
              description: 'Convert WebP images to SVG format. Free, secure, no upload to server.',
              seoTitle: 'WebP to SVG — Convert WebP to SVG Online Free | Singulariti',
              seoDescription: 'Convert WebP images to SVG online for free. Fast, secure, and entirely in your browser.',
              engine: 'conversion',
              path: '/image/conversion/webp-to-svg',
              options: { from: 'image/webp', to: 'image/svg+xml' }
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
              seoTitle: 'Image Metadata Viewer — View EXIF Data Online Free | Singulariti',
              seoDescription: 'View image EXIF data online for free. Extract camera metadata, dates, and file properties.',
              engine: 'utility',
              path: '/image/utility/image-metadata-viewer',
              options: { action: 'metadata' }
            },
            {
              id: 'image-dimension-checker',
              name: 'Image Dimension Checker',
              description: 'Instantly check exact width, height, and aspect ratio of an image.',
              seoTitle: 'Image Dimension Checker — Check Image Size Online Free | Singulariti',
              seoDescription: 'Check image dimensions online for free. Quickly find the exact pixel width, height, and ratio.',
              engine: 'utility',
              path: '/image/utility/image-dimension-checker',
              options: { action: 'dimension' }
            },
            {
              id: 'image-format-detector',
              name: 'Image Format Detector',
              description: 'Detect the true MIME type and format of an image file.',
              seoTitle: 'Image Format Detector — Detect Image Type Online Free | Singulariti',
              seoDescription: 'Detect true image format online. Analyzes file headers to determine the exact MIME type.',
              engine: 'utility',
              path: '/image/utility/image-format-detector',
              options: { action: 'format' }
            },
            {
              id: 'color-picker-from-image',
              name: 'Color Picker From Image',
              description: 'Click anywhere on an image to extract precise HEX and RGB colors.',
              seoTitle: 'Color Picker From Image — Pick Colors Online Free | Singulariti',
              seoDescription: 'Pick colors from images online. Click on any pixel to instantly get HEX, RGB, and HSL codes.',
              engine: 'utility',
              path: '/image/utility/color-picker-from-image',
              options: { action: 'colorpicker' }
            },
            {
              id: 'image-color-palette-extractor',
              name: 'Image Color Palette Extractor',
              description: 'Automatically extract the dominant color palette from any image.',
              seoTitle: 'Image Color Palette Extractor — Extract Colors Online Free | Singulariti',
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
              seoTitle: 'Image to Base64 — Convert Image to Base64 String Online Free | Singulariti',
              seoDescription: 'Convert images to Base64 strings online for free. Instantly generate data URIs for web development.',
              engine: 'developer',
              path: '/image/developer/image-to-base64',
              options: { action: 'tobase64' }
            },
            {
              id: 'base64-to-image',
              name: 'Base64 to Image',
              description: 'Convert Base64 data URI strings back into downloadable image files.',
              seoTitle: 'Base64 to Image — Convert Base64 to Image Online Free | Singulariti',
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
      id: 'editing',
      name: 'Image Editing Tools',
      description: 'Edit, resize, crop, and apply filters to images instantly.',
      seoTitle: 'Image Editing Tools — Edit Images Online Free | Singulariti',
      seoDescription: 'Free online image editing tools. Resize, crop, rotate, flip, and apply filters directly in the browser.',
      path: '/editing',
      collections: [
        {
          id: 'tools',
          name: 'Image Editing Tools',
          description: 'Edit, resize, crop, and apply filters to images instantly.',
          seoTitle: 'Image Editing Tools — Edit Images Online Free | Singulariti',
          seoDescription: 'Free online image editing tools. Resize, crop, rotate, flip, and apply filters to your images directly in the browser.',
          path: '/editing/tools',
          tools: [
            {
              id: 'crop-image',
              name: 'Crop Image',
              description: 'Crop images easily to remove unwanted edges or fit specific aspect ratios locally.',
              seoTitle: 'Crop Image Online — Free Image Cropper | Singulariti',
              seoDescription: 'Crop images online for free. Adjust aspect ratios safely in your browser without uploading.',
              engine: 'single-editing',
              path: '/editing/tools/crop-image',
              options: { action: 'crop' }
            },
            {
              id: 'image-resizer',
              name: 'Image Resizer',
              description: 'Resize image dimensions (width & height) quickly while maintaining aspect ratio.',
              seoTitle: 'Image Resizer Online — Resize Images Free | Singulariti',
              seoDescription: 'Resize images online instantly. Free and secure browser-based image resizer.',
              engine: 'single-editing',
              path: '/editing/tools/image-resizer',
              options: { action: 'resize' }
            },
            {
              id: 'rotate-image',
              name: 'Rotate Image',
              description: 'Rotate images by custom angles or standard 90-degree increments.',
              seoTitle: 'Rotate Image Online — Free Image Rotator | Singulariti',
              seoDescription: 'Rotate images freely in your browser. Fast, secure, no uploads required.',
              engine: 'single-editing',
              path: '/editing/tools/rotate-image',
              options: { action: 'rotate' }
            },
            {
              id: 'flip-image',
              name: 'Flip Image',
              description: 'Mirror images horizontally or vertically instantly.',
              seoTitle: 'Flip Image Online — Free Image Flipper | Singulariti',
              seoDescription: 'Flip or mirror your images vertically and horizontally securely in your browser.',
              engine: 'single-editing',
              path: '/editing/tools/flip-image',
              options: { action: 'flip' }
            },
            {
              id: 'image-upscaler',
              name: 'Image Upscaler',
              description: 'Enlarge and upscale images smoothly with advanced browser algorithms.',
              seoTitle: 'Image Upscaler Online — Enlarge Images Free | Singulariti',
              seoDescription: 'Upscale and enlarge images without losing quality. Completely browser-based.',
              engine: 'single-editing',
              path: '/editing/tools/image-upscaler',
              options: { action: 'upscaler' }
            },
            {
              id: 'image-enhancer',
              name: 'Image Enhancer',
              description: 'Auto-enhance image clarity, exposure, and color.',
              seoTitle: 'Image Enhancer Online — Auto Enhance Images | Singulariti',
              seoDescription: 'Instantly auto-enhance photo colors and clarity securely in your web browser.',
              engine: 'single-editing',
              path: '/editing/tools/image-enhancer',
              options: { action: 'enhancer' }
            },
            {
              id: 'image-sharpen',
              name: 'Sharpen Image',
              description: 'Sharpen blurry images to improve crispness and detail.',
              seoTitle: 'Sharpen Image Online — Fix Blurry Photos | Singulariti',
              seoDescription: 'Apply sharpening filters to blurry photos online for free without uploading.',
              engine: 'single-editing',
              path: '/editing/tools/image-sharpen',
              options: { action: 'sharpen' }
            },
            {
              id: 'image-denoiser',
              name: 'Denoise Image',
              description: 'Remove noise and grain from photos for a smoother look.',
              seoTitle: 'Denoise Image Online — Remove Photo Grain | Singulariti',
              seoDescription: 'Remove noise and grain from your images safely in your web browser.',
              engine: 'single-editing',
              path: '/editing/tools/image-denoiser',
              options: { action: 'denoiser' }
            },
            {
              id: 'brightness-and-contrast-adjuster',
              name: 'Brightness & Contrast',
              description: 'Adjust image brightness, contrast, highlights, and shadows.',
              seoTitle: 'Brightness & Contrast Adjuster Online | Singulariti',
              seoDescription: 'Easily adjust brightness, contrast, highlights, and shadows securely online.',
              engine: 'single-editing',
              path: '/editing/tools/brightness-and-contrast-adjuster',
              options: { action: 'brightnessContrast' }
            },
            {
              id: 'color-adjuster',
              name: 'Color Adjuster',
              description: 'Fine-tune image saturation, hue, vibrance, and temperature.',
              seoTitle: 'Color Adjuster Online — Free Color Correction | Singulariti',
              seoDescription: 'Apply professional color correction to images completely locally in your browser.',
              engine: 'single-editing',
              path: '/editing/tools/color-adjuster',
              options: { action: 'colorAdjust' }
            },
            {
              id: 'grayscale',
              name: 'Grayscale Converter',
              description: 'Convert images to pure grayscale instantly.',
              seoTitle: 'Convert Image to Grayscale Online Free | Singulariti',
              seoDescription: 'Turn color images into grayscale/black-and-white instantly and securely.',
              engine: 'single-editing',
              path: '/editing/tools/grayscale',
              options: { action: 'grayscale' }
            },
            {
              id: 'color-to-black-and-white',
              name: 'Color to Black & White',
              description: 'Apply high-contrast black and white filters to photos.',
              seoTitle: 'Color to Black and White Image Converter | Singulariti',
              seoDescription: 'Convert color photos to artistic black and white securely without uploading.',
              engine: 'single-editing',
              path: '/editing/tools/color-to-black-and-white',
              options: { action: 'colorToBw' }
            },
            {
              id: 'black-and-white-to-color',
              name: 'Black & White to Color',
              description: 'Add vintage and warmth color tints to black & white images.',
              seoTitle: 'Colorize Black & White Images Online | Singulariti',
              seoDescription: 'Apply color tints to black and white photos safely and securely in your browser.',
              engine: 'single-editing',
              path: '/editing/tools/black-and-white-to-color',
              options: { action: 'bwToColor' }
            },
            {
              id: 'blur-image',
              name: 'Blur Image',
              description: 'Apply adjustable gaussian blur to your images.',
              seoTitle: 'Blur Image Online Free — Add Gaussian Blur | Singulariti',
              seoDescription: 'Apply professional blur effects to your images locally and securely.',
              engine: 'single-editing',
              path: '/editing/tools/blur-image',
              options: { action: 'blur' }
            },
            {
              id: 'pixelate-image',
              name: 'Pixelate Image',
              description: 'Censor or pixelate images with an adjustable pixel size.',
              seoTitle: 'Pixelate Image Online Free — Censor Photos | Singulariti',
              seoDescription: 'Pixelate and censor images securely in your browser without any server uploads.',
              engine: 'single-editing',
              path: '/editing/tools/pixelate-image',
              options: { action: 'pixelate' }
            },
            {
              id: 'add-watermark-to-image',
              name: 'Add Watermark',
              description: 'Overlay custom text watermarks repeatedly to protect images.',
              seoTitle: 'Add Watermark to Image Online Free | Singulariti',
              seoDescription: 'Protect your photos by adding a text watermark locally in your browser.',
              engine: 'single-editing',
              path: '/editing/tools/add-watermark-to-image',
              options: { action: 'watermark' }
            },
            {
              id: 'add-text-on-image',
              name: 'Add Text',
              description: 'Write customizable text directly on top of your images.',
              seoTitle: 'Add Text to Image Online Free | Singulariti',
              seoDescription: 'Overlay text onto images easily and securely entirely in your browser.',
              engine: 'single-editing',
              path: '/editing/tools/add-text-on-image',
              options: { action: 'text' }
            },
            {
              id: 'add-logo-overlay',
              name: 'Add Logo Overlay',
              description: 'Place a secondary logo or image perfectly on top of another image.',
              seoTitle: 'Add Logo Overlay to Image Online Free | Singulariti',
              seoDescription: 'Overlay logos or watermarks onto your images quickly and securely online.',
              engine: 'single-editing',
              path: '/editing/tools/add-logo-overlay',
              options: { action: 'logo' }
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
              id: 'protect-pdf',
              name: 'Protect PDF',
              description: 'Encrypt and lock your PDF document with a password.',
              seoTitle: 'Protect PDF Online Free — Encrypt and Lock PDF | Singulariti',
              seoDescription: 'Secure your PDF documents with a password entirely in your browser. No uploads, fast and private.',
              engine: 'utility',
              path: '/tools/pdf/protect-pdf'
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
            },
            {
              id: 'url-qr-code-generator',
              name: 'URL QR Code Generator',
              description: 'Convert a website URL into a scannable QR code.',
              seoTitle: 'URL QR Code Generator — Create Website QR Codes Online | Singulariti',
              seoDescription: 'Generate custom QR codes from any website URL for free.',
              engine: 'qr-standalone',
              path: '/tools/qr/url-qr-code-generator',
              options: { type: 'url' }
            },
            {
              id: 'text-qr-code-generator',
              name: 'Text QR Code Generator',
              description: 'Convert plain text into a scannable QR code.',
              seoTitle: 'Text QR Code Generator — Create Text QR Codes Online | Singulariti',
              seoDescription: 'Generate custom QR codes from plain text for free.',
              engine: 'qr-standalone',
              path: '/tools/qr/text-qr-code-generator',
              options: { type: 'text' }
            },
            {
              id: 'wifi-qr-code-generator',
              name: 'Wi-Fi QR Code Generator',
              description: 'Create a Wi-Fi QR code to easily share network credentials.',
              seoTitle: 'Wi-Fi QR Code Generator — Generate Wi-Fi QR Codes Online | Singulariti',
              seoDescription: 'Generate QR codes that allow users to connect directly to Wi-Fi networks.',
              engine: 'qr-standalone',
              path: '/tools/qr/wifi-qr-code-generator',
              options: { type: 'wifi' }
            },
            {
              id: 'vcard-qr-code-generator',
              name: 'vCard QR Code Generator',
              description: 'Generate a vCard QR code to easily share contact information.',
              seoTitle: 'vCard QR Code Generator — Generate Contact QR Codes | Singulariti',
              seoDescription: 'Create scannable vCard QR codes to instantly share phone numbers, emails, and contact details.',
              engine: 'qr-standalone',
              path: '/tools/qr/vcard-qr-code-generator',
              options: { type: 'vcard' }
            },
            {
              id: 'email-qr-code-generator',
              name: 'Email QR Code Generator',
              description: 'Generate a QR code that opens an email draft with recipient and subject pre-filled.',
              seoTitle: 'Email QR Code Generator — Generate Email QR Codes Online | Singulariti',
              seoDescription: 'Create QR codes that instantly open email clients with a prefilled message.',
              engine: 'qr-standalone',
              path: '/tools/qr/email-qr-code-generator',
              options: { type: 'email' }
            },
            {
              id: 'phone-qr-code-generator',
              name: 'Phone QR Code Generator',
              description: 'Create a QR code that initiates a phone call when scanned.',
              seoTitle: 'Phone QR Code Generator — Create Call QR Codes Online | Singulariti',
              seoDescription: 'Generate a QR code that dials a specific phone number when scanned.',
              engine: 'qr-standalone',
              path: '/tools/qr/phone-qr-code-generator',
              options: { type: 'phone' }
            },
            {
              id: 'sms-qr-code-generator',
              name: 'SMS QR Code Generator',
              description: 'Create a QR code that opens an SMS with a prefilled message.',
              seoTitle: 'SMS QR Code Generator — Create SMS QR Codes Online | Singulariti',
              seoDescription: 'Generate QR codes that trigger an SMS message to a specific number.',
              engine: 'qr-standalone',
              path: '/tools/qr/sms-qr-code-generator',
              options: { type: 'sms' }
            },
            {
              id: 'upi-qr-code-generator',
              name: 'UPI QR Code Generator',
              description: 'Generate QR codes for UPI payments.',
              seoTitle: 'UPI QR Code Generator — Create Payment QR Codes Online | Singulariti',
              seoDescription: 'Generate QR codes for quick payments using UPI IDs.',
              engine: 'qr-standalone',
              path: '/tools/qr/upi-qr-code-generator',
              options: { type: 'upi' }
            }
          ]
        }
      ]
    },
    {
      id: 'calculators',
      name: 'Calculator Tools',
      description: 'Free online calculators to compute financial, mathematical, tax, health, and date-related queries instantly in your browser.',
      seoTitle: 'Calculator Tools — Online Calculators Free | Singulariti',
      seoDescription: 'Free browser-based calculators. Calculate EMI, SIP, compound interest, CAGR, FD, and mortgage payments, tax, BMI, and date differences securely in your browser.',
      path: '/tools/calculators',
      collections: [
        {
          id: 'financial',
          name: 'Financial Calculators',
          description: 'Calculate EMI, SIP, FD returns, compound interest, mortgage, and investment performance.',
          seoTitle: 'Financial Calculators Online Free | Singulariti',
          seoDescription: 'Free online financial calculators. Compute loan EMIs, SIP maturity values, fixed deposits, CAGR, and mortgage payments.',
          path: '/tools/calculators',
          tools: [
            {
              id: 'emi-calculator',
              name: 'EMI Calculator',
              description: 'Calculate monthly loan EMI, total interest, and total repayment amount.',
              seoTitle: 'EMI Calculator Online - Singularity',
              seoDescription: 'Calculate monthly loan EMI, total interest, and total repayment amount instantly using Singularity’s free EMI calculator.',
              engine: 'utility',
              path: '/tools/calculators/emi-calculator'
            },
            {
              id: 'sip-calculator',
              name: 'SIP Calculator',
              description: 'Estimate maturity value and estimated returns of your mutual fund SIP investments.',
              seoTitle: 'SIP Calculator Online - Singularity',
              seoDescription: 'Estimate maturity value and estimated returns of mutual fund SIP investments instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/sip-calculator'
            },
            {
              id: 'compound-interest-calculator',
              name: 'Compound Interest Calculator',
              description: 'Calculate future compound interest earnings with flexible compounding frequencies.',
              seoTitle: 'Compound Interest Calculator - Singularity',
              seoDescription: 'Calculate future compound interest earnings with flexible compounding frequencies instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/compound-interest-calculator'
            },
            {
              id: 'cagr-calculator',
              name: 'CAGR Calculator',
              description: 'Calculate Compound Annual Growth Rate of investments over years.',
              seoTitle: 'CAGR Calculator Online - Singularity',
              seoDescription: 'Calculate Compound Annual Growth Rate of investments over years instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/cagr-calculator'
            },
            {
              id: 'fd-calculator',
              name: 'FD Calculator',
              description: 'Calculate Fixed Deposit maturity amount and interest earned.',
              seoTitle: 'FD Calculator Online - Singularity',
              seoDescription: 'Calculate Fixed Deposit maturity amount and interest earned instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/fd-calculator'
            },
            {
              id: 'roi-calculator',
              name: 'ROI Calculator',
              description: 'Calculate Return on Investment percentage and annualized performance.',
              seoTitle: 'ROI Calculator Online - Singularity',
              seoDescription: 'Calculate Return on Investment percentage and annualized performance instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/roi-calculator'
            },
            {
              id: 'currency-converter',
              name: 'Currency Converter',
              description: 'Convert between different currencies using standard exchange rates.',
              seoTitle: 'Currency Converter Online - Singularity',
              seoDescription: 'Convert between different currencies using standard exchange rates instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/currency-converter'
            },
            {
              id: 'mortgage-calculator',
              name: 'Mortgage Calculator',
              description: 'Estimate monthly mortgage payments, including property tax and home insurance.',
              seoTitle: 'Mortgage Calculator Online - Singularity',
              seoDescription: 'Estimate monthly mortgage payments, including property tax and home insurance instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/mortgage-calculator'
            },
            {
              id: 'loan-calculator',
              name: 'Loan Calculator',
              description: 'Calculate monthly loan payments, total interest, and amortized schedules.',
              seoTitle: 'Loan Calculator Online — Free Loan Repayments | Singulariti',
              seoDescription: 'Calculate monthly loan payments, interest charges, and dynamic amortized schedules instantly.',
              engine: 'utility',
              path: '/tools/calculators/loan-calculator'
            }
          ]
        },
        {
          id: 'tax-business',
          name: 'Tax & Business Calculators',
          description: 'Calculate income tax payable under old or new regimes, GST, profit/loss, and revenue.',
          seoTitle: 'Tax and Business Calculators Online Free | Singulariti',
          seoDescription: 'Free online tax and business calculators. Compute Indian Income Tax, GST, sales profit margins, and ad revenue.',
          path: '/tools/calculators',
          tools: [
            {
              id: 'income-tax-calculator',
              name: 'Income Tax Calculator',
              description: 'Estimate income tax payable under Old and New tax regimes with deductions.',
              seoTitle: 'Income Tax Calculator Online - Singularity',
              seoDescription: 'Estimate income tax payable under Old and New tax regimes with deductions instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/income-tax-calculator'
            },
            {
              id: 'gst-calculator',
              name: 'GST Calculator',
              description: 'Calculate GST amounts by adding or removing GST with custom rates.',
              seoTitle: 'GST Calculator Online - Singularity',
              seoDescription: 'Calculate GST amounts by adding or removing GST with custom rates instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/gst-calculator'
            },
            {
              id: 'discount-calculator',
              name: 'Discount Calculator',
              description: 'Calculate discount savings, final sales price, and additional discounts.',
              seoTitle: 'Discount Calculator Online - Singularity',
              seoDescription: 'Calculate discount savings, final sales price, and additional discounts instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/discount-calculator'
            },
            {
              id: 'profit-calculator',
              name: 'Profit Calculator',
              description: 'Calculate cost, selling price, profit amount, and profit margins.',
              seoTitle: 'Profit Calculator Online - Singularity',
              seoDescription: 'Calculate cost, selling price, profit amount, and profit margins instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/profit-calculator'
            },
            {
              id: 'youtube-earnings-calculator',
              name: 'YouTube Earnings Calculator',
              description: 'Estimate daily, monthly, and yearly YouTube video creation earnings.',
              seoTitle: 'YouTube Earnings Calculator Online - Singularity',
              seoDescription: 'Estimate daily, monthly, and yearly YouTube video creation earnings instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/youtube-earnings-calculator'
            },
            {
              id: 'adsense-revenue-calculator',
              name: 'AdSense Revenue Calculator',
              description: 'Estimate Google AdSense earnings based on page views, CPC, and CTR.',
              seoTitle: 'AdSense Revenue Calculator Online - Singularity',
              seoDescription: 'Estimate Google AdSense earnings based on page views, CPC, and CTR instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/adsense-revenue-calculator'
            },
            {
              id: 'simple-interest-calculator',
              name: 'Simple Interest Calculator',
              description: 'Calculate simple interest earnings, principal amounts, or active interest rates.',
              seoTitle: 'Simple Interest Calculator Online — Free Math Tool | Singulariti',
              seoDescription: 'Calculate simple interest earnings, principal amounts, or active interest rates instantly.',
              engine: 'utility',
              path: '/tools/calculators/simple-interest-calculator'
            },
            {
              id: 'salary-calculator',
              name: 'Salary Calculator',
              description: 'Convert salary figures between hourly, daily, weekly, monthly, and annual amounts.',
              seoTitle: 'Salary Calculator — Hourly, Monthly, Annual Wage Converter | Singulariti',
              seoDescription: 'Convert salary figures between hourly, daily, weekly, monthly, and annual amounts instantly.',
              engine: 'utility',
              path: '/tools/calculators/salary-calculator'
            }
          ]
        },
        {
          id: 'math-science',
          name: 'Math & Science Calculators',
          description: 'Basic and advanced scientific math functions, percentages, and CGPA conversions.',
          seoTitle: 'Math and Science Calculators Online Free | Singulariti',
          seoDescription: 'Free online math and educational calculators. Compute percentages, semester CGPAs, and scientific equations.',
          path: '/tools/calculators',
          tools: [
            {
              id: 'percentage-calculator',
              name: 'Percentage Calculator',
              description: 'Compute percentages, percentage increases, decreases, and fractions.',
              seoTitle: 'Percentage Calculator Online - Singularity',
              seoDescription: 'Compute percentages, percentage increases, decreases, and fractions instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/percentage-calculator'
            },
            {
              id: 'cgpa-calculator',
              name: 'CGPA Calculator',
              description: 'Calculate cumulative grade point average (CGPA) and convert to percentages.',
              seoTitle: 'CGPA Calculator Online - Singularity',
              seoDescription: 'Calculate cumulative grade point average (CGPA) and convert to percentages instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/cgpa-calculator'
            },
            {
              id: 'scientific-calculator',
              name: 'Scientific Calculator',
              description: 'Full scientific calculator supporting trigonometry, logs, factorials, and powers.',
              seoTitle: 'Scientific Calculator Online - Singularity',
              seoDescription: 'Full scientific calculator supporting trigonometry, logs, factorials, and powers instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/scientific-calculator'
            },
            {
              id: 'basic-calculator',
              name: 'Basic Calculator',
              description: 'Simple mathematical calculator for addition, subtraction, multiplication, and division.',
              seoTitle: 'Basic Calculator Online — Free Arithmetic Tool | Singulariti',
              seoDescription: 'Simple mathematical calculator for addition, subtraction, multiplication, and division.',
              engine: 'utility',
              path: '/tools/calculators/basic-calculator'
            }
          ]
        },
        {
          id: 'health-date',
          name: 'Health & Date Calculators',
          description: 'Track exact chronological age, calendar differences, BMI, and calorie goals.',
          seoTitle: 'Health and Date Calculators Online Free | Singulariti',
          seoDescription: 'Free online health and calendar calculators. Compute chronological age, day counts, BMI ranges, and metabolic BMR.',
          path: '/tools/calculators',
          tools: [
            {
              id: 'age-calculator',
              name: 'Age Calculator',
              description: 'Calculate chronological age in years, months, and days, and countdown to next birthday.',
              seoTitle: 'Age Calculator Online - Singularity',
              seoDescription: 'Calculate chronological age in years, months, and days instantly using Singularity’s free Age calculator.',
              engine: 'utility',
              path: '/tools/calculators/age-calculator'
            },
            {
              id: 'date-difference-calculator',
              name: 'Date Difference Calculator',
              description: 'Calculate exact years, months, and days difference between two selected dates.',
              seoTitle: 'Date Difference Calculator Online - Singularity',
              seoDescription: 'Calculate exact years, months, and days difference between two selected dates instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/date-difference-calculator'
            },
            {
              id: 'bmi-calculator',
              name: 'BMI Calculator',
              description: 'Calculate body mass index (BMI) and identify healthy weight ranges.',
              seoTitle: 'BMI Calculator Online - Singularity',
              seoDescription: 'Calculate body mass index (BMI) and identify healthy weight ranges instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/bmi-calculator'
            },
            {
              id: 'calorie-calculator',
              name: 'Calorie Calculator',
              description: 'Calculate BMR and daily calorie maintenance requirements based on fitness goals.',
              seoTitle: 'Calorie Calculator Online - Singularity',
              seoDescription: 'Calculate BMR and daily calorie maintenance requirements based on fitness goals instantly using Singularity.',
              engine: 'utility',
              path: '/tools/calculators/calorie-calculator'
            },
            {
              id: 'tip-calculator',
              name: 'Tip Calculator',
              description: 'Calculate split bills, tip percentages, and exact share payments.',
              seoTitle: 'Tip Calculator Online — Split Bills & Tips | Singulariti',
              seoDescription: 'Calculate split bills, tip percentages, and exact share payments instantly.',
              engine: 'utility',
              path: '/tools/calculators/tip-calculator'
            },
            {
              id: 'time-duration-calculator',
              name: 'Time Duration Calculator',
              description: 'Calculate exact elapsed time durations in hours, minutes, and seconds between times.',
              seoTitle: 'Time Duration Calculator — Elapsed Time Counter | Singulariti',
              seoDescription: 'Calculate exact elapsed time durations in hours, minutes, and seconds between times instantly.',
              engine: 'utility',
              path: '/tools/calculators/time-duration-calculator'
            }
          ]
        }
      ]
    },
    {
      id: 'text',
      name: 'Text Tools',
      description: 'Convert case, count words, remove duplicate lines, compare texts, and generate placeholder text securely.',
      seoTitle: 'Text Tools — Convert, Count & Format Text Online | Singulariti',
      seoDescription: 'A complete collection of free online text tools. Count words, lines, paragraphs, format cases, sort lists, compare texts, and generate dummy text.',
      path: '/tools/text',
      collections: [
        {
          id: 'text-manipulation',
          name: 'Text Formatting & Manipulation',
          description: 'Format cases, replace text, and clean up formatting.',
          seoTitle: 'Text Manipulation Tools | Singulariti',
          seoDescription: 'Format cases, replace text, and clean up formatting.',
          path: '/tools/text',
          tools: [
            { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs in real time.', seoTitle: 'Word Counter — Count Words & Chars Online | Singulariti', seoDescription: 'Count words, characters, sentences, and paragraphs in real time with this free online counter.', engine: 'text-tool', path: '/tools/text/word-counter' },
            { id: 'character-counter', name: 'Character Counter', description: 'Count characters and spaces in your text instantly.', seoTitle: 'Character Counter — Free Char Count Online | Singulariti', seoDescription: 'Count characters and spaces in your text instantly with this free online counter.', engine: 'text-tool', path: '/tools/text/character-counter' },
            { id: 'case-converter', name: 'Case Converter', description: 'Convert text between uppercase, lowercase, sentence case, and title case.', seoTitle: 'Case Converter — Uppercase, Lowercase, Sentence Case | Singulariti', seoDescription: 'Convert text between uppercase, lowercase, sentence case, and title case instantly.', engine: 'text-tool', path: '/tools/text/case-converter' },
            { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Remove duplicate lines from text or lists instantly.', seoTitle: 'Remove Duplicate Lines — Clean Up Text Online | Singulariti', seoDescription: 'Remove duplicate lines from text or lists instantly with this free online utility.', engine: 'text-tool', path: '/tools/text/remove-duplicate-lines' },
            { id: 'text-sorter', name: 'Text Sorter', description: 'Sort text lines alphabetically or reverse list order.', seoTitle: 'Text Sorter — Sort Lists & Lines Online | Singulariti', seoDescription: 'Sort text lines alphabetically or reverse list order instantly with this free utility.', engine: 'text-tool', path: '/tools/text/text-sorter' },
            { id: 'text-compare', name: 'Text Compare', description: 'Compare two text blocks side-by-side to highlight differences.', seoTitle: 'Text Compare — Side-by-Side Text Comparison | Singulariti', seoDescription: 'Compare two text blocks side-by-side to highlight differences instantly.', engine: 'text-tool', path: '/tools/text/text-compare' },
            { id: 'text-diff', name: 'Text Diff Checker', description: 'Find differences between two versions of text with inline highlights.', seoTitle: 'Text Diff Checker — Compare Text Online | Singulariti', seoDescription: 'Find differences between two versions of text with inline highlights.', engine: 'text-tool', path: '/tools/text/text-diff' },
            { id: 'remove-extra-spaces', name: 'Remove Extra Spaces', description: 'Strip multiple spaces, trailing white spaces, and empty lines.', seoTitle: 'Remove Extra Spaces — Clean Up Text Online | Singulariti', seoDescription: 'Strip multiple spaces, trailing white spaces, and empty lines instantly.', engine: 'text-tool', path: '/tools/text/remove-extra-spaces' },
            { id: 'line-counter', name: 'Line Counter', description: 'Count the total number of lines in a text document.', seoTitle: 'Line Counter — Count Lines Online | Singulariti', seoDescription: 'Count the total number of lines in a text document instantly.', engine: 'text-tool', path: '/tools/text/line-counter' },
            { id: 'sentence-counter', name: 'Sentence Counter', description: 'Count sentences in a block of text.', seoTitle: 'Sentence Counter — Count Sentences Online | Singulariti', seoDescription: 'Count sentences in a block of text instantly.', engine: 'text-tool', path: '/tools/text/sentence-counter' },
            { id: 'paragraph-counter', name: 'Paragraph Counter', description: 'Count paragraphs in a block of text.', seoTitle: 'Paragraph Counter — Count Paragraphs Online | Singulariti', seoDescription: 'Count paragraphs in a block of text instantly.', engine: 'text-tool', path: '/tools/text/paragraph-counter' },
            { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse character letters or word orders.', seoTitle: 'Text Reverser — Reverse Text Online | Singulariti', seoDescription: 'Reverse character letters or word orders instantly.', engine: 'text-tool', path: '/tools/text/text-reverser' },
            { id: 'slug-generator', name: 'Slug Generator', description: 'Convert text to URL-friendly slugs.', seoTitle: 'Slug Generator — Convert Text to URL Slugs | Singulariti', seoDescription: 'Convert text to URL-friendly slugs instantly.', engine: 'text-tool', path: '/tools/text/slug-generator' },
            { id: 'find-replace', name: 'Find and Replace Text', description: 'Find text patterns and replace with other values.', seoTitle: 'Find and Replace Text Online — Free Utility | Singulariti', seoDescription: 'Find text patterns and replace with other values instantly.', engine: 'text-tool', path: '/tools/text/find-replace' },
            { id: 'text-uppercase', name: 'Text to Uppercase', description: 'Convert text to all capital letters.', seoTitle: 'Text to Uppercase — Uppercase Converter | Singulariti', seoDescription: 'Convert text to all capital letters instantly.', engine: 'text-tool', path: '/tools/text/text-uppercase' },
            { id: 'text-lowercase', name: 'Text to Lowercase', description: 'Convert text to all lowercase letters.', seoTitle: 'Text to Lowercase — Lowercase Converter | Singulariti', seoDescription: 'Convert text to all lowercase letters instantly.', engine: 'text-tool', path: '/tools/text/text-lowercase' },
            { id: 'capitalize-text', name: 'Capitalize Text', description: 'Capitalize the first letter of each sentence.', seoTitle: 'Capitalize Text — Capitalization Tool | Singulariti', seoDescription: 'Capitalize the first letter of each sentence instantly.', engine: 'text-tool', path: '/tools/text/capitalize-text' },
            { id: 'title-case', name: 'Title Case Converter', description: 'Convert text to Title Case capitalization.', seoTitle: 'Title Case Converter — Capitalize Titles | Singulariti', seoDescription: 'Convert text to Title Case capitalization instantly.', engine: 'text-tool', path: '/tools/text/title-case' }
          ]
        },
        {
          id: 'generators',
          name: 'Text Generators',
          description: 'Generate dummy lorem ipsum text or random text sequences.',
          seoTitle: 'Lorem Ipsum & Random Text Generators | Singulariti',
          seoDescription: 'Generate dummy lorem ipsum text or random text sequences.',
          path: '/tools/text',
          tools: [
            { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate dummy Lorem Ipsum paragraphs for design layouts.', seoTitle: 'Lorem Ipsum Generator — Create Placeholder Text | Singulariti', seoDescription: 'Generate dummy Lorem Ipsum paragraphs for design layouts.', engine: 'text-tool', path: '/tools/text/lorem-ipsum' },
            { id: 'random-text', name: 'Random Text Generator', description: 'Generate random strings, passwords, or alphanumeric lists.', seoTitle: 'Random Text Generator — Create Strings Online | Singulariti', seoDescription: 'Generate random strings, passwords, or alphanumeric lists instantly.', engine: 'text-tool', path: '/tools/text/random-text' }
          ]
        }
      ]
    },
    {
      id: 'dev',
      name: 'Developer Tools',
      description: 'Format JSON, XML, YAML, format SQL, minify code, decode JWTs, and run regex patterns.',
      seoTitle: 'Developer Tools — Code Formatters & Utilities | Singulariti',
      seoDescription: 'Free online developer tools. Prettify JSON, format XML/YAML/SQL, encode/decode URLs and Base64, and decode JWTs locally.',
      path: '/tools/dev',
      collections: [
        {
          id: 'dev-formatters',
          name: 'Formatters & Beautifiers',
          description: 'Format and beautify structured data.',
          seoTitle: 'Code Formatters & Beautifiers | Singulariti',
          seoDescription: 'Format and beautify structured data.',
          path: '/tools/dev',
          tools: [
            { id: 'json-formatter', name: 'JSON Formatter', description: 'Prettify and format JSON data with customizable spacing.', seoTitle: 'JSON Formatter — Prettify JSON Online | Singulariti', seoDescription: 'Prettify and format JSON data with customizable spacing.', engine: 'developer', path: '/tools/dev/json-formatter' },
            { id: 'json-validator', name: 'JSON Validator', description: 'Validate and check JSON syntax structure.', seoTitle: 'JSON Validator — Check JSON Syntax Online | Singulariti', seoDescription: 'Validate and check JSON syntax structure.', engine: 'developer', path: '/tools/dev/json-validator' },
            { id: 'xml-formatter', name: 'XML Formatter', description: 'Format and beautify XML strings.', seoTitle: 'XML Formatter — Prettify XML Online | Singulariti', seoDescription: 'Format and beautify XML strings.', engine: 'developer', path: '/tools/dev/xml-formatter' },
            { id: 'yaml-formatter', name: 'YAML Formatter', description: 'Clean up and format YAML documents.', seoTitle: 'YAML Formatter — Prettify YAML Online | Singulariti', seoDescription: 'Clean up and format YAML documents.', engine: 'developer', path: '/tools/dev/yaml-formatter' },
            { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format and beautify SQL queries.', seoTitle: 'SQL Formatter — Prettify SQL Online | Singulariti', seoDescription: 'Format and beautify SQL queries.', engine: 'developer', path: '/tools/dev/sql-formatter' },
            { id: 'code-beautifier', name: 'Code Beautifier', description: 'Beautify HTML, CSS, and JS code formatting.', seoTitle: 'Code Beautifier — Format HTML, CSS, JS | Singulariti', seoDescription: 'Beautify HTML, CSS, and JS code formatting.', engine: 'developer', path: '/tools/dev/code-beautifier' }
          ]
        },
        {
          id: 'dev-encoders',
          name: 'Encoders, Decoders & Decrypters',
          description: 'Encode or decode common formats securely in the browser.',
          seoTitle: 'Encoders & Decoders | Singulariti',
          seoDescription: 'Encode or decode common formats securely in the browser.',
          path: '/tools/dev',
          tools: [
            { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', description: 'Encode plain text to Base64 or decode Base64 strings.', seoTitle: 'Base64 Encoder/Decoder — Convert Strings Online | Singulariti', seoDescription: 'Encode plain text to Base64 or decode Base64 strings.', engine: 'developer', path: '/tools/dev/base64-encoder-decoder' },
            { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', description: 'Percent-encode or decode URL component parameters.', seoTitle: 'URL Encoder/Decoder — Encode URLs Online | Singulariti', seoDescription: 'Percent-encode or decode URL component parameters.', engine: 'developer', path: '/tools/dev/url-encoder-decoder' },
            { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT headers and payload values locally.', seoTitle: 'JWT Decoder — Decode JWT Tokens Online | Singulariti', seoDescription: 'Decode JWT headers and payload values locally.', engine: 'developer', path: '/tools/dev/jwt-decoder' },
            { id: 'html-encoder-decoder', name: 'HTML Encoder/Decoder', description: 'Convert characters to HTML entities and decode them.', seoTitle: 'HTML Encoder/Decoder — Convert Entities | Singulariti', seoDescription: 'Convert characters to HTML entities and decode them.', engine: 'developer', path: '/tools/dev/html-encoder-decoder' }
          ]
        },
        {
          id: 'dev-minifiers',
          name: 'Minifiers & Testers',
          description: 'Minify markup and test expression matches.',
          seoTitle: 'Minifiers & Testers | Singulariti',
          seoDescription: 'Minify markup and test expression matches.',
          path: '/tools/dev',
          tools: [
            { id: 'html-minifier', name: 'HTML Minifier', description: 'Compress HTML files to reduce loading size.', seoTitle: 'HTML Minifier — Compress HTML Online | Singulariti', seoDescription: 'Compress HTML files to reduce loading size.', engine: 'developer', path: '/tools/dev/html-minifier' },
            { id: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS files to reduce loading size.', seoTitle: 'CSS Minifier — Compress CSS Online | Singulariti', seoDescription: 'Minify CSS files to reduce loading size.', engine: 'developer', path: '/tools/dev/css-minifier' },
            { id: 'js-minifier', name: 'JS Minifier', description: 'Compress JavaScript code files to reduce loading size.', seoTitle: 'JS Minifier — Compress JS Online | Singulariti', seoDescription: 'Compress JavaScript code files to reduce loading size.', engine: 'developer', path: '/tools/dev/js-minifier' },
            { id: 'regex-tester', name: 'Regex Tester', description: 'Test and check regular expression patterns live.', seoTitle: 'Regex Tester — Test Regular Expressions | Singulariti', seoDescription: 'Test and check regular expression patterns live.', engine: 'developer', path: '/tools/dev/regex-tester' }
          ]
        },
        {
          id: 'dev-utilities',
          name: 'Utilities & Previewers',
          description: 'Common developer aids, colors, and preview tools.',
          seoTitle: 'Developer Utilities & Previewers | Singulariti',
          seoDescription: 'Common developer aids, colors, and preview tools.',
          path: '/tools/dev',
          tools: [
            { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate RFC4122 compliant UUIDs (v4) instantly.', seoTitle: 'UUID Generator — Create UUIDs Online | Singulariti', seoDescription: 'Generate RFC4122 compliant UUIDs (v4) instantly.', engine: 'developer', path: '/tools/dev/uuid-generator' },
            { id: 'hash-generator', name: 'Hash Generator', description: 'Generate SHA-256, SHA-512, MD5, and SHA-1 hashes.', seoTitle: 'Hash Generator — Create Cryptographic Hashes | Singulariti', seoDescription: 'Generate SHA-256, SHA-512, MD5, and SHA-1 hashes.', engine: 'developer', path: '/tools/dev/hash-generator' },
            { id: 'color-picker-tool', name: 'Color Picker', description: 'Pick colors, create gradients, and explore palettes.', seoTitle: 'Color Picker Tool — Custom Palettes Online | Singulariti', seoDescription: 'Pick colors, create gradients, and explore palettes.', engine: 'developer', path: '/tools/dev/color-picker-tool' },
            { id: 'hex-to-rgb', name: 'HEX to RGB Converter', description: 'Convert HEX color codes to RGB format values.', seoTitle: 'HEX to RGB Converter — Convert Colors Online | Singulariti', seoDescription: 'Convert HEX color codes to RGB format values.', engine: 'developer', path: '/tools/dev/hex-to-rgb' },
            { id: 'rgb-to-hex', name: 'RGB to HEX Converter', description: 'Convert RGB color codes to HEX format values.', seoTitle: 'RGB to HEX Converter — Convert Colors Online | Singulariti', seoDescription: 'Convert RGB color codes to HEX format values.', engine: 'developer', path: '/tools/dev/rgb-to-hex' },
            { id: 'timestamp-converter', name: 'Timestamp Converter', description: 'Convert human dates to epoch timestamps and vice versa.', seoTitle: 'Timestamp Converter — Epoch Date Converter | Singulariti', seoDescription: 'Convert human dates to epoch timestamps and vice versa.', engine: 'developer', path: '/tools/dev/timestamp-converter' },
            { id: 'unix-time-converter', name: 'Unix Time Converter', description: 'Show current Unix epoch time in seconds and milliseconds.', seoTitle: 'Unix Time Converter — Live Epoch Time | Singulariti', seoDescription: 'Show current Unix epoch time in seconds and milliseconds.', engine: 'developer', path: '/tools/dev/unix-time-converter' },
            { id: 'markdown-previewer', name: 'Markdown Previewer', description: 'Compose Markdown formatting and render HTML preview live.', seoTitle: 'Markdown Previewer — Live Markdown Rendering | Singulariti', seoDescription: 'Compose Markdown formatting and render HTML preview live.', engine: 'developer', path: '/tools/dev/markdown-previewer' },
            { id: 'html-previewer', name: 'HTML Previewer', description: 'Render raw HTML code elements live in a safe frame.', seoTitle: 'HTML Previewer — Live HTML Rendering | Singulariti', seoDescription: 'Render raw HTML code elements live in a safe frame.', engine: 'developer', path: '/tools/dev/html-previewer' },
            { id: 'web-compiler', name: 'Web Compiler', description: 'Write HTML, CSS, and JavaScript and see the results instantly in your browser.', seoTitle: 'HTML/CSS/JS Web Compiler | Singulariti', seoDescription: 'Write HTML, CSS, and JavaScript and see the results instantly in your browser.', engine: 'developer', path: '/tools/dev/web-compiler' }
          ]
        }
      ]
    },
    {
      id: 'convert',
      name: 'Unit Conversion Tools',
      description: 'Convert lengths, weights, temperatures, data storage, areas, speed, and time bases.',
      seoTitle: 'Unit Conversion Tools — Convert Anything Online | Singulariti',
      seoDescription: 'Free online unit converters. Convert length, weight, temperature, area, volume, speed, and data storage instantly.',
      path: '/tools/convert',
      collections: [
        {
          id: 'conversions',
          name: 'Unit Converters',
          description: 'Convert between standard units of measurement.',
          seoTitle: 'Measurement Converters | Singulariti',
          seoDescription: 'Convert between standard units of measurement.',
          path: '/tools/convert',
          tools: [
            { id: 'length-converter', name: 'Length Converter', description: 'Convert between kilometers, meters, centimeters, miles, and inches.', seoTitle: 'Length Converter — Convert Units Online | Singulariti', seoDescription: 'Convert between kilometers, meters, centimeters, miles, and inches.', engine: 'unit-converter', path: '/tools/convert/length-converter' },
            { id: 'weight-converter', name: 'Weight Converter', description: 'Convert between kilograms, grams, pounds, ounces, and tons.', seoTitle: 'Weight Converter — Convert Units Online | Singulariti', seoDescription: 'Convert between kilograms, grams, pounds, ounces, and tons.', engine: 'unit-converter', path: '/tools/convert/weight-converter' },
            { id: 'temperature-converter', name: 'Temperature Converter', description: 'Convert Celsius, Fahrenheit, and Kelvin scales.', seoTitle: 'Temperature Converter — Convert Units Online | Singulariti', seoDescription: 'Convert Celsius, Fahrenheit, and Kelvin scales.', engine: 'unit-converter', path: '/tools/convert/temperature-converter' },
            { id: 'area-converter', name: 'Area Converter', description: 'Convert between square meters, square feet, acres, and hectares.', seoTitle: 'Area Converter — Convert Units Online | Singulariti', seoDescription: 'Convert between square meters, square feet, acres, and hectares.', engine: 'unit-converter', path: '/tools/convert/area-converter' },
            { id: 'volume-converter', name: 'Volume Converter', description: 'Convert liters, milliliters, gallons, and cubic meters.', seoTitle: 'Volume Converter — Convert Units Online | Singulariti', seoDescription: 'Convert liters, milliliters, gallons, and cubic meters.', engine: 'unit-converter', path: '/tools/convert/volume-converter' },
            { id: 'speed-converter', name: 'Speed Converter', description: 'Convert km/h, mph, m/s, and knots.', seoTitle: 'Speed Converter — Convert Units Online | Singulariti', seoDescription: 'Convert km/h, mph, m/s, and knots.', engine: 'unit-converter', path: '/tools/convert/speed-converter' },
            { id: 'time-converter', name: 'Time Converter', description: 'Convert hours, minutes, seconds, days, and weeks.', seoTitle: 'Time Converter — Convert Units Online | Singulariti', seoDescription: 'Convert hours, minutes, seconds, days, and weeks.', engine: 'unit-converter', path: '/tools/convert/time-converter' },
            { id: 'data-storage-converter', name: 'Data Storage Converter', description: 'Convert gigabytes, megabytes, terabytes, and bits.', seoTitle: 'Data Storage Converter — Convert Units Online | Singulariti', seoDescription: 'Convert gigabytes, megabytes, terabytes, and bits.', engine: 'unit-converter', path: '/tools/convert/data-storage-converter' },
            { id: 'fuel-efficiency-converter', name: 'Fuel Efficiency Converter', description: 'Convert mpg, L/100km, and km/L values.', seoTitle: 'Fuel Efficiency Converter — Convert Units | Singulariti', seoDescription: 'Convert mpg, L/100km, and km/L values.', engine: 'unit-converter', path: '/tools/convert/fuel-efficiency-converter' },
            { id: 'angle-converter', name: 'Angle Converter', description: 'Convert degrees, radians, and gradians.', seoTitle: 'Angle Converter — Convert Units Online | Singulariti', seoDescription: 'Convert degrees, radians, and gradians.', engine: 'unit-converter', path: '/tools/convert/angle-converter' },
            { id: 'pressure-converter', name: 'Pressure Converter', description: 'Convert Pascal, Bar, PSI, and Atmosphere units.', seoTitle: 'Pressure Converter — Convert Units Online | Singulariti', seoDescription: 'Convert Pascal, Bar, PSI, and Atmosphere units.', engine: 'unit-converter', path: '/tools/convert/pressure-converter' },
            { id: 'energy-converter', name: 'Energy Converter', description: 'Convert Joules, Calories, Kilowatt-hours, and BTUs.', seoTitle: 'Energy Converter — Convert Units Online | Singulariti', seoDescription: 'Convert Joules, Calories, Kilowatt-hours, and BTUs.', engine: 'unit-converter', path: '/tools/convert/energy-converter' },
            { id: 'power-converter', name: 'Power Converter', description: 'Convert Watts, Kilowatts, and Horsepower.', seoTitle: 'Power Converter — Convert Units Online | Singulariti', seoDescription: 'Convert Watts, Kilowatts, and Horsepower.', engine: 'unit-converter', path: '/tools/convert/power-converter' },
            { id: 'frequency-converter', name: 'Frequency Converter', description: 'Convert Hertz, Kilohertz, Megahertz, and Gigahertz.', seoTitle: 'Frequency Converter — Convert Units Online | Singulariti', seoDescription: 'Convert Hertz, Kilohertz, Megahertz, and Gigahertz.', engine: 'unit-converter', path: '/tools/convert/frequency-converter' },
            { id: 'number-base-converter', name: 'Number Base Converter', description: 'Convert binary, octal, decimal, and hexadecimal bases.', seoTitle: 'Number Base Converter — Convert Bases Online | Singulariti', seoDescription: 'Convert binary, octal, decimal, and hexadecimal bases.', engine: 'unit-converter', path: '/tools/convert/number-base-converter' }
          ]
        }
      ]
    },
    {
      id: 'seo',
      name: 'SEO Tools',
      description: 'Generate meta tags, robots.txt, sitemaps, verify OG/Twitter tags, and check heading structures.',
      seoTitle: 'SEO Tools — Free Search Engine Optimization Utilities | Singulariti',
      seoDescription: 'Free online SEO utilities. Generate meta tags, sitemaps, robots.txt, preview Open Graph and Twitter cards, and analyze headings.',
      path: '/tools/seo',
      collections: [
        {
          id: 'seo-generators',
          name: 'SEO Generators & Checkers',
          description: 'Generate metadata files and validate page SEO formats.',
          seoTitle: 'Search Engine Optimization Builders | Singulariti',
          seoDescription: 'Generate metadata files and validate page SEO formats.',
          path: '/tools/seo',
          tools: [
            { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate HTML search engine tags (Title, Description, Robots).', seoTitle: 'Meta Tag Generator — Generate SEO Tags Online | Singulariti', seoDescription: 'Generate HTML search engine tags (Title, Description, Robots).', engine: 'seo-tool', path: '/tools/seo/meta-tag-generator' },
            { id: 'meta-title-checker', name: 'Meta Title Length Checker', description: 'Verify that your web page titles meet standard SEO lengths.', seoTitle: 'Meta Title Length Checker — SEO Checker | Singulariti', seoDescription: 'Verify that your web page titles meet standard SEO lengths.', engine: 'seo-tool', path: '/tools/seo/meta-title-checker' },
            { id: 'meta-description-checker', name: 'Meta Description Length Checker', description: 'Verify descriptions fit the Google snippet pixel length limits.', seoTitle: 'Meta Description Length Checker — SEO Checker | Singulariti', seoDescription: 'Verify descriptions fit the Google snippet pixel length limits.', engine: 'seo-tool', path: '/tools/seo/meta-description-checker' },
            { id: 'seo-keyword-density', name: 'Keyword Density Checker', description: 'Analyze your page texts for keyword density optimization.', seoTitle: 'Keyword Density Checker — SEO Text Checker | Singulariti', seoDescription: 'Analyze your page texts for keyword density optimization.', engine: 'seo-tool', path: '/tools/seo/seo-keyword-density' },
            { id: 'seo-slug-generator', name: 'Slug Generator', description: 'Create search-friendly slugs for web page routing structures.', seoTitle: 'SEO Slug Generator — Build Clean Slugs | Singulariti', seoDescription: 'Create search-friendly slugs for web page routing structures.', engine: 'seo-tool', path: '/tools/seo/seo-slug-generator' },
            { id: 'robots-txt-generator', name: 'Robots.txt Generator', description: 'Generate robots.txt crawl directives files for web crawlers.', seoTitle: 'Robots.txt Generator — Create robots.txt Online | Singulariti', seoDescription: 'Generate robots.txt crawl directives files for web crawlers.', engine: 'seo-tool', path: '/tools/seo/robots-txt-generator' },
            { id: 'sitemap-xml-generator', name: 'Sitemap XML Generator', description: 'Build search XML sitemap files to index page paths.', seoTitle: 'Sitemap XML Generator — Create sitemaps.xml | Singulariti', seoDescription: 'Build search XML sitemap files to index page paths.', engine: 'seo-tool', path: '/tools/seo/sitemap-xml-generator' },
            { id: 'open-graph-generator', name: 'Open Graph Tag Generator', description: 'Generate HTML OG metadata tags for Facebook, LinkedIn sharing.', seoTitle: 'Open Graph Generator — Generate OG Tags | Singulariti', seoDescription: 'Generate HTML OG metadata tags for Facebook, LinkedIn sharing.', engine: 'seo-tool', path: '/tools/seo/open-graph-generator' },
            { id: 'twitter-card-generator', name: 'Twitter Card Generator', description: 'Generate summary cards tags for Twitter formatting previews.', seoTitle: 'Twitter Card Generator — Create Twitter Tags | Singulariti', seoDescription: 'Generate summary cards tags for Twitter formatting previews.', engine: 'seo-tool', path: '/tools/seo/twitter-card-generator' },
            { id: 'seo-word-count', name: 'Word Count for SEO', description: 'Measure keyword presence and total read lengths for articles.', seoTitle: 'Word Count for SEO — Analyze Content Online | Singulariti', seoDescription: 'Measure keyword presence and total read lengths for articles.', engine: 'seo-tool', path: '/tools/seo/seo-word-count' },
            { id: 'heading-structure-checker', name: 'Heading Structure Checker', description: 'Analyze hierarchy structures (H1-H6 tags) of pasted code.', seoTitle: 'Heading Structure Checker — Analyze HTML Online | Singulariti', seoDescription: 'Analyze hierarchy structures (H1-H6 tags) of pasted code.', engine: 'seo-tool', path: '/tools/seo/heading-structure-checker' }
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
