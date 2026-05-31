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
