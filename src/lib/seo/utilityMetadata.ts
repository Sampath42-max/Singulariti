/**
 * SEO STANDARDS FOR SINGULARITI.IN UTILITIES
 *
 * TITLE: [Action] [Format] Online – [Benefit] (50-60 chars max)
 * DESCRIPTION: Unique, 120-155 characters. Must mention it's free, browser-based, and has zero privacy risk/no server uploads.
 * OG IMAGE: Always use "https://singulariti.in/og-fallback.png" unless a specific image exists in /public/og/[category].png.
 */
export type UtilitySEO = {
  utilityId: string;
  name: string;
  section: string;
  subSection: string;
  url: string;
  title: string;
  description: string;
  canonical: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: "website";
    image: string;
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
  schemaType?: "WebApplication" | "SoftwareApplication";
};

export const utilityMetadataRegistry: Record<string, UtilitySEO> = {
  "image-compressor": {
    "utilityId": "image-compressor",
    "name": "Image Compressor",
    "section": "Image Utilities",
    "subSection": "Compression Tools",
    "url": "/image/compression/image-compressor",
    "title": "Compress Image Online Free – Reduce Image File Size",
    "description": "Compress image files to reduce size for upload, sharing or storage. Useful for large photos, web images and form limits.",
    "canonical": "https://singulariti.in/image/compression/image-compressor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compress Image Online Free – Reduce Image File Size",
        "description": "Reduce image file sizes instantly without losing visible quality. Upload your image, choose your compression level, and download — all processed safely in your browser.",
        "url": "https://singulariti.in/image/compression/image-compressor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compress Image Online Free – Reduce Image File Size",
        "description": "Reduce image file sizes instantly without losing visible quality. Upload your image, choose your compression level, and download — all processed safely in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpg-compressor": {
    "utilityId": "jpg-compressor",
    "name": "JPG Compressor",
    "section": "Image Utilities",
    "subSection": "Compression Tools",
    "url": "/image/compression/jpg-compressor",
    "title": "JPG Compressor - Free Online Utility Tool",
    "description": "Reduce image file sizes instantly without losing visible quality. Upload your image, choose your compression level, and download — all processed safely in your browser.",
    "canonical": "https://singulariti.in/image/compression/jpg-compressor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compress JPG Online Free – Reduce File Size Without Quality Loss",
        "description": "Reduce JPG file sizes instantly without losing visible quality. Upload your JPG, choose your compression level, and download — all processed safely in your browser.",
        "url": "https://singulariti.in/image/compression/jpg-compressor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compress JPG Online Free – Reduce File Size Without Quality Loss",
        "description": "Reduce JPG file sizes instantly without losing visible quality. Upload your JPG, choose your compression level, and download — all processed safely in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpeg-compressor": {
    "utilityId": "jpeg-compressor",
    "name": "JPEG Compressor",
    "section": "Image Utilities",
    "subSection": "Compression Tools",
    "url": "/image/compression/jpeg-compressor",
    "title": "Compress JPEG Online Free – Reduce File Size Instantly",
    "description": "Reduce JPEG file sizes instantly without losing visible quality. Upload your JPEG, choose your compression level, and download — all processed safely in your browser.",
    "canonical": "https://singulariti.in/image/compression/jpeg-compressor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compress JPEG Online Free – Reduce File Size Instantly",
        "description": "Reduce JPEG file sizes instantly without losing visible quality. Upload your JPEG, choose your compression level, and download — all processed safely in your browser.",
        "url": "https://singulariti.in/image/compression/jpeg-compressor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compress JPEG Online Free – Reduce File Size Instantly",
        "description": "Reduce JPEG file sizes instantly without losing visible quality. Upload your JPEG, choose your compression level, and download — all processed safely in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "png-compressor": {
    "utilityId": "png-compressor",
    "name": "PNG Compressor",
    "section": "Image Utilities",
    "subSection": "Compression Tools",
    "url": "/image/compression/png-compressor",
    "title": "Compress PNG Online Free – Reduce File Size Safely",
    "description": "Reduce PNG file sizes instantly without losing visible quality. Upload your PNG, choose your compression level, and download — all processed safely in your browser.",
    "canonical": "https://singulariti.in/image/compression/png-compressor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compress PNG Online Free – Reduce File Size Safely",
        "description": "Reduce PNG file sizes instantly without losing visible quality. Upload your PNG, choose your compression level, and download — all processed safely in your browser.",
        "url": "https://singulariti.in/image/compression/png-compressor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compress PNG Online Free – Reduce File Size Safely",
        "description": "Reduce PNG file sizes instantly without losing visible quality. Upload your PNG, choose your compression level, and download — all processed safely in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "webp-compressor": {
    "utilityId": "webp-compressor",
    "name": "WebP Compressor",
    "section": "Image Utilities",
    "subSection": "Compression Tools",
    "url": "/image/compression/webp-compressor",
    "title": "Compress WebP Online Free – Reduce File Size Easily",
    "description": "Reduce WebP file sizes instantly without losing visible quality. Upload your WebP, choose your compression level, and download — all processed safely in your browser.",
    "canonical": "https://singulariti.in/image/compression/webp-compressor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compress WebP Online Free – Reduce File Size Easily",
        "description": "Reduce WebP file sizes instantly without losing visible quality. Upload your WebP, choose your compression level, and download — all processed safely in your browser.",
        "url": "https://singulariti.in/image/compression/webp-compressor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compress WebP Online Free – Reduce File Size Easily",
        "description": "Reduce WebP file sizes instantly without losing visible quality. Upload your WebP, choose your compression level, and download — all processed safely in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "svg-compressor": {
    "utilityId": "svg-compressor",
    "name": "SVG Compressor",
    "section": "Image Utilities",
    "subSection": "Compression Tools",
    "url": "/image/compression/svg-compressor",
    "title": "Compress SVG Online Free – Optimize Vector Graphics",
    "description": "Optimize SVG files by removing unnecessary metadata and whitespace. Drag and drop your SVG to get a smaller, cleaner file instantly without sending files to any server.",
    "canonical": "https://singulariti.in/image/compression/svg-compressor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compress SVG Online Free – Optimize Vector Graphics",
        "description": "Optimize SVG files by removing unnecessary metadata and whitespace. Drag and drop your SVG to get a smaller, cleaner file instantly without sending files to any server.",
        "url": "https://singulariti.in/image/compression/svg-compressor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compress SVG Online Free – Optimize Vector Graphics",
        "description": "Optimize SVG files by removing unnecessary metadata and whitespace. Drag and drop your SVG to get a smaller, cleaner file instantly without sending files to any server.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpg-to-png": {
    "utilityId": "jpg-to-png",
    "name": "JPG to PNG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/jpg-to-png",
    "title": "Convert JPG to PNG Online – Free Browser Image Converter",
    "description": "Easily convert standard JPG images to the transparent PNG format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/jpg-to-png",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert JPG to PNG Online – Free Browser Image Converter",
        "description": "Easily convert standard JPG images to the transparent PNG format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/jpg-to-png",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert JPG to PNG Online – Free Browser Image Converter",
        "description": "Easily convert standard JPG images to the transparent PNG format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "png-to-jpg": {
    "utilityId": "png-to-jpg",
    "name": "PNG to JPG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/png-to-jpg",
    "title": "Convert PNG to JPG Online – Free Browser Image Converter",
    "description": "Easily convert transparent or large PNG images to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/png-to-jpg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert PNG to JPG Online – Free Browser Image Converter",
        "description": "Easily convert transparent or large PNG images to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/png-to-jpg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert PNG to JPG Online – Free Browser Image Converter",
        "description": "Easily convert transparent or large PNG images to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpg-to-webp": {
    "utilityId": "jpg-to-webp",
    "name": "JPG to WebP",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/jpg-to-webp",
    "title": "Convert JPG to WebP Online – Free Browser Image Converter",
    "description": "Easily convert standard JPG images to the next-gen WebP format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/jpg-to-webp",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert JPG to WebP Online – Free Browser Image Converter",
        "description": "Easily convert standard JPG images to the next-gen WebP format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/jpg-to-webp",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert JPG to WebP Online – Free Browser Image Converter",
        "description": "Easily convert standard JPG images to the next-gen WebP format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "png-to-webp": {
    "utilityId": "png-to-webp",
    "name": "PNG to WebP",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/png-to-webp",
    "title": "Convert PNG to WebP Online – Free Browser Image Converter",
    "description": "Easily convert transparent PNG images to the highly compressed WebP format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/png-to-webp",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert PNG to WebP Online – Free Browser Image Converter",
        "description": "Easily convert transparent PNG images to the highly compressed WebP format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/png-to-webp",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert PNG to WebP Online – Free Browser Image Converter",
        "description": "Easily convert transparent PNG images to the highly compressed WebP format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "webp-to-jpg": {
    "utilityId": "webp-to-jpg",
    "name": "WebP to JPG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/webp-to-jpg",
    "title": "Convert WebP to JPG Online – Free Browser Image Converter",
    "description": "Easily convert next-gen WebP images to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/webp-to-jpg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert WebP to JPG Online – Free Browser Image Converter",
        "description": "Easily convert next-gen WebP images to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/webp-to-jpg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert WebP to JPG Online – Free Browser Image Converter",
        "description": "Easily convert next-gen WebP images to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "webp-to-png": {
    "utilityId": "webp-to-png",
    "name": "WebP to PNG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/webp-to-png",
    "title": "Convert WebP to PNG Online – Free Browser Image Converter",
    "description": "Easily convert next-gen WebP images to the transparent PNG format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/webp-to-png",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert WebP to PNG Online – Free Browser Image Converter",
        "description": "Easily convert next-gen WebP images to the transparent PNG format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/webp-to-png",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert WebP to PNG Online – Free Browser Image Converter",
        "description": "Easily convert next-gen WebP images to the transparent PNG format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpg-to-jpeg": {
    "utilityId": "jpg-to-jpeg",
    "name": "JPG to JPEG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/jpg-to-jpeg",
    "title": "Convert JPG to JPEG Online – Free Browser Image Converter",
    "description": "Easily convert JPG images to the JPEG extension format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/jpg-to-jpeg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert JPG to JPEG Online – Free Browser Image Converter",
        "description": "Easily convert JPG images to the JPEG extension format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/jpg-to-jpeg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert JPG to JPEG Online – Free Browser Image Converter",
        "description": "Easily convert JPG images to the JPEG extension format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpeg-to-jpg": {
    "utilityId": "jpeg-to-jpg",
    "name": "JPEG to JPG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/jpeg-to-jpg",
    "title": "Convert JPEG to JPG Online – Free Browser Image Converter",
    "description": "Easily convert JPEG images to the standard JPG extension format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/jpeg-to-jpg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert JPEG to JPG Online – Free Browser Image Converter",
        "description": "Easily convert JPEG images to the standard JPG extension format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/jpeg-to-jpg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert JPEG to JPG Online – Free Browser Image Converter",
        "description": "Easily convert JPEG images to the standard JPG extension format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "svg-to-png": {
    "utilityId": "svg-to-png",
    "name": "SVG to PNG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/svg-to-png",
    "title": "Convert SVG to PNG Online – Free Browser Image Converter",
    "description": "Easily convert scalable SVG vectors to the transparent PNG raster format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/svg-to-png",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert SVG to PNG Online – Free Browser Image Converter",
        "description": "Easily convert scalable SVG vectors to the transparent PNG raster format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/svg-to-png",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert SVG to PNG Online – Free Browser Image Converter",
        "description": "Easily convert scalable SVG vectors to the transparent PNG raster format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "svg-to-jpg": {
    "utilityId": "svg-to-jpg",
    "name": "SVG to JPG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/svg-to-jpg",
    "title": "Convert SVG to JPG Online – Free Browser Image Converter",
    "description": "Easily convert scalable SVG vectors to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/svg-to-jpg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert SVG to JPG Online – Free Browser Image Converter",
        "description": "Easily convert scalable SVG vectors to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/svg-to-jpg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert SVG to JPG Online – Free Browser Image Converter",
        "description": "Easily convert scalable SVG vectors to the universally accepted JPG format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "svg-to-webp": {
    "utilityId": "svg-to-webp",
    "name": "SVG to WebP",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/svg-to-webp",
    "title": "Convert SVG to WebP Online – Free Browser Image Converter",
    "description": "Easily convert scalable SVG vectors to the next-gen WebP format. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/svg-to-webp",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert SVG to WebP Online – Free Browser Image Converter",
        "description": "Easily convert scalable SVG vectors to the next-gen WebP format. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/svg-to-webp",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert SVG to WebP Online – Free Browser Image Converter",
        "description": "Easily convert scalable SVG vectors to the next-gen WebP format. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "png-to-svg": {
    "utilityId": "png-to-svg",
    "name": "PNG to SVG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/png-to-svg",
    "title": "Convert PNG to SVG Online – Free Browser Image Converter",
    "description": "Easily convert transparent PNG images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/png-to-svg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert PNG to SVG Online – Free Browser Image Converter",
        "description": "Easily convert transparent PNG images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/png-to-svg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert PNG to SVG Online – Free Browser Image Converter",
        "description": "Easily convert transparent PNG images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpg-to-svg": {
    "utilityId": "jpg-to-svg",
    "name": "JPG to SVG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/jpg-to-svg",
    "title": "Convert JPG to SVG Online – Free Browser Image Converter",
    "description": "Easily convert standard JPG images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/jpg-to-svg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert JPG to SVG Online – Free Browser Image Converter",
        "description": "Easily convert standard JPG images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/jpg-to-svg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert JPG to SVG Online – Free Browser Image Converter",
        "description": "Easily convert standard JPG images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "webp-to-svg": {
    "utilityId": "webp-to-svg",
    "name": "WebP to SVG",
    "section": "Image Utilities",
    "subSection": "Conversion Tools",
    "url": "/image/conversion/webp-to-svg",
    "title": "Convert WebP to SVG Online – Free Browser Image Converter",
    "description": "Easily convert next-gen WebP images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
    "canonical": "https://singulariti.in/image/conversion/webp-to-svg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Convert WebP to SVG Online – Free Browser Image Converter",
        "description": "Easily convert next-gen WebP images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
        "url": "https://singulariti.in/image/conversion/webp-to-svg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Convert WebP to SVG Online – Free Browser Image Converter",
        "description": "Easily convert next-gen WebP images to scalable SVG vectors. Fast, free, and processed entirely within your web browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-metadata-viewer": {
    "utilityId": "image-metadata-viewer",
    "name": "Image Metadata Viewer",
    "section": "Image Utilities",
    "subSection": "Utility Tools",
    "url": "/image/utility/image-metadata-viewer",
    "title": "Image Metadata Viewer Online – Read EXIF Data Free",
    "description": "Extract and read hidden EXIF data from your photos instantly. Upload an image to view camera settings, location data, and date taken with zero privacy risk.",
    "canonical": "https://singulariti.in/image/utility/image-metadata-viewer",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Metadata Viewer Online – Read EXIF Data Free",
        "description": "Extract and read hidden EXIF data from your photos instantly. Upload an image to view camera settings, location data, and date taken with zero privacy risk.",
        "url": "https://singulariti.in/image/utility/image-metadata-viewer",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Metadata Viewer Online – Read EXIF Data Free",
        "description": "Extract and read hidden EXIF data from your photos instantly. Upload an image to view camera settings, location data, and date taken with zero privacy risk.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-dimension-checker": {
    "utilityId": "image-dimension-checker",
    "name": "Image Dimension Checker",
    "section": "Image Utilities",
    "subSection": "Utility Tools",
    "url": "/image/utility/image-dimension-checker",
    "title": "Image Dimension Checker Online – Find Image Size Free",
    "description": "Check the exact pixel dimensions and aspect ratio of your image instantly. Upload a photo to see its width and height directly in your browser.",
    "canonical": "https://singulariti.in/image/utility/image-dimension-checker",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Dimension Checker Online – Find Image Size Free",
        "description": "Check the exact pixel dimensions and aspect ratio of your image instantly. Upload a photo to see its width and height directly in your browser.",
        "url": "https://singulariti.in/image/utility/image-dimension-checker",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Dimension Checker Online – Find Image Size Free",
        "description": "Check the exact pixel dimensions and aspect ratio of your image instantly. Upload a photo to see its width and height directly in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-format-detector": {
    "utilityId": "image-format-detector",
    "name": "Image Format Detector",
    "section": "Image Utilities",
    "subSection": "Utility Tools",
    "url": "/image/utility/image-format-detector",
    "title": "Image Format Detector Online – Identify Image Types Free",
    "description": "Determine the true file format of an image instantly. Upload a file to see its MIME type and extension directly in your browser without any server uploads.",
    "canonical": "https://singulariti.in/image/utility/image-format-detector",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Format Detector Online – Identify Image Types Free",
        "description": "Determine the true file format of an image instantly. Upload a file to see its MIME type and extension directly in your browser without any server uploads.",
        "url": "https://singulariti.in/image/utility/image-format-detector",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Format Detector Online – Identify Image Types Free",
        "description": "Determine the true file format of an image instantly. Upload a file to see its MIME type and extension directly in your browser without any server uploads.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "color-picker-from-image": {
    "utilityId": "color-picker-from-image",
    "name": "Color Picker From Image",
    "section": "Image Utilities",
    "subSection": "Utility Tools",
    "url": "/image/utility/color-picker-from-image",
    "title": "Color Picker From Image Online – Extract Colors Free",
    "description": "Extract HEX and RGB colors directly from your images. Upload a photo and use the eyedropper tool to pick any color instantly in your browser.",
    "canonical": "https://singulariti.in/image/utility/color-picker-from-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Color Picker From Image Online – Extract Colors Free",
        "description": "Extract HEX and RGB colors directly from your images. Upload a photo and use the eyedropper tool to pick any color instantly in your browser.",
        "url": "https://singulariti.in/image/utility/color-picker-from-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Color Picker From Image Online – Extract Colors Free",
        "description": "Extract HEX and RGB colors directly from your images. Upload a photo and use the eyedropper tool to pick any color instantly in your browser.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-color-palette-extractor": {
    "utilityId": "image-color-palette-extractor",
    "name": "Image Color Palette Extractor",
    "section": "Image Utilities",
    "subSection": "Utility Tools",
    "url": "/image/utility/image-color-palette-extractor",
    "title": "Image Color Palette Extractor Online – Generate Palettes",
    "description": "Automatically extract the dominant color palette from your images. Upload a photo to generate beautiful color schemes instantly without sending files to a server.",
    "canonical": "https://singulariti.in/image/utility/image-color-palette-extractor",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Color Palette Extractor Online – Generate Palettes",
        "description": "Automatically extract the dominant color palette from your images. Upload a photo to generate beautiful color schemes instantly without sending files to a server.",
        "url": "https://singulariti.in/image/utility/image-color-palette-extractor",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Color Palette Extractor Online – Generate Palettes",
        "description": "Automatically extract the dominant color palette from your images. Upload a photo to generate beautiful color schemes instantly without sending files to a server.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-to-base64": {
    "utilityId": "image-to-base64",
    "name": "Image to Base64",
    "section": "Image Utilities",
    "subSection": "Developer Tools",
    "url": "/image/developer/image-to-base64",
    "title": "Image to Base64 Converter Online – Free Developer Tool",
    "description": "Convert images to Base64 encoded strings for direct CSS or HTML embedding. Drag and drop your image to get the data URL instantly without any server uploads.",
    "canonical": "https://singulariti.in/image/developer/image-to-base64",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image to Base64 Converter Online – Free Developer Tool",
        "description": "Convert images to Base64 encoded strings for direct CSS or HTML embedding. Drag and drop your image to get the data URL instantly without any server uploads.",
        "url": "https://singulariti.in/image/developer/image-to-base64",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image to Base64 Converter Online – Free Developer Tool",
        "description": "Convert images to Base64 encoded strings for direct CSS or HTML embedding. Drag and drop your image to get the data URL instantly without any server uploads.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "base64-to-image": {
    "utilityId": "base64-to-image",
    "name": "Base64 to Image",
    "section": "Image Utilities",
    "subSection": "Developer Tools",
    "url": "/image/developer/base64-to-image",
    "title": "Base64 to Image Decoder Online – Free Developer Tool",
    "description": "Decode Base64 strings back into viewable and downloadable images. Paste your Base64 text to get the original image instantly without any server uploads.",
    "canonical": "https://singulariti.in/image/developer/base64-to-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Base64 to Image Decoder Online – Free Developer Tool",
        "description": "Decode Base64 strings back into viewable and downloadable images. Paste your Base64 text to get the original image instantly without any server uploads.",
        "url": "https://singulariti.in/image/developer/base64-to-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Base64 to Image Decoder Online – Free Developer Tool",
        "description": "Decode Base64 strings back into viewable and downloadable images. Paste your Base64 text to get the original image instantly without any server uploads.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "crop-image": {
    "utilityId": "crop-image",
    "name": "Crop Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/crop-image",
    "title": "Crop Image - Edit Image Online",
    "description": "Use this online image tool to crop image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/crop-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Crop Image - Edit Image Online",
        "description": "Use this online image tool to crop image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/crop-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Crop Image - Edit Image Online",
        "description": "Use this online image tool to crop image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-resizer": {
    "utilityId": "image-resizer",
    "name": "Image Resizer",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/image-resizer",
    "title": "Image Resizer - Resize Images by Width, Height or Ratio",
    "description": "Resize images using width, height or aspect ratio. Useful for uploads, previews, thumbnails and layout preparation.",
    "canonical": "https://singulariti.in/editing/tools/image-resizer",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Resizer - Resize Images by Width, Height or Ratio",
        "description": "Resize images using width, height or aspect ratio. Useful for uploads, previews, thumbnails and layout preparation.",
        "url": "https://singulariti.in/editing/tools/image-resizer",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Resizer - Resize Images by Width, Height or Ratio",
        "description": "Resize images using width, height or aspect ratio. Useful for uploads, previews, thumbnails and layout preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "rotate-image": {
    "utilityId": "rotate-image",
    "name": "Rotate Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/rotate-image",
    "title": "Rotate Image - Edit Image Online",
    "description": "Use this online image tool to rotate image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/rotate-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Rotate Image - Edit Image Online",
        "description": "Use this online image tool to rotate image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/rotate-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Rotate Image - Edit Image Online",
        "description": "Use this online image tool to rotate image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "flip-image": {
    "utilityId": "flip-image",
    "name": "Flip Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/flip-image",
    "title": "Flip Image - Edit Image Online",
    "description": "Use this online image tool to flip image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/flip-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Flip Image - Edit Image Online",
        "description": "Use this online image tool to flip image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/flip-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Flip Image - Edit Image Online",
        "description": "Use this online image tool to flip image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-upscaler": {
    "utilityId": "image-upscaler",
    "name": "Image Upscaler",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/image-upscaler",
    "title": "Image Upscaler - Edit Image Online",
    "description": "Use this online image tool to image upscaler directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/image-upscaler",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Upscaler - Edit Image Online",
        "description": "Use this online image tool to image upscaler directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/image-upscaler",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Upscaler - Edit Image Online",
        "description": "Use this online image tool to image upscaler directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-enhancer": {
    "utilityId": "image-enhancer",
    "name": "Image Enhancer",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/image-enhancer",
    "title": "Image Enhancer - Edit Image Online",
    "description": "Use this online image tool to image enhancer directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/image-enhancer",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Image Enhancer - Edit Image Online",
        "description": "Use this online image tool to image enhancer directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/image-enhancer",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Image Enhancer - Edit Image Online",
        "description": "Use this online image tool to image enhancer directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-sharpen": {
    "utilityId": "image-sharpen",
    "name": "Sharpen Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/image-sharpen",
    "title": "Sharpen Image - Edit Image Online",
    "description": "Use this online image tool to sharpen image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/image-sharpen",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Sharpen Image - Edit Image Online",
        "description": "Use this online image tool to sharpen image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/image-sharpen",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Sharpen Image - Edit Image Online",
        "description": "Use this online image tool to sharpen image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "image-denoiser": {
    "utilityId": "image-denoiser",
    "name": "Denoise Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/image-denoiser",
    "title": "Denoise Image - Edit Image Online",
    "description": "Use this online image tool to denoise image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/image-denoiser",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Denoise Image - Edit Image Online",
        "description": "Use this online image tool to denoise image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/image-denoiser",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Denoise Image - Edit Image Online",
        "description": "Use this online image tool to denoise image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "brightness-and-contrast-adjuster": {
    "utilityId": "brightness-and-contrast-adjuster",
    "name": "Brightness & Contrast",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/brightness-and-contrast-adjuster",
    "title": "Brightness & Contrast - Edit Image Online",
    "description": "Use this online image tool to brightness & contrast directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/brightness-and-contrast-adjuster",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Brightness & Contrast - Edit Image Online",
        "description": "Use this online image tool to brightness & contrast directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/brightness-and-contrast-adjuster",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Brightness & Contrast - Edit Image Online",
        "description": "Use this online image tool to brightness & contrast directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "color-adjuster": {
    "utilityId": "color-adjuster",
    "name": "Color Adjuster",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/color-adjuster",
    "title": "Color Adjuster - Edit Image Online",
    "description": "Use this online image tool to color adjuster directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/color-adjuster",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Color Adjuster - Edit Image Online",
        "description": "Use this online image tool to color adjuster directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/color-adjuster",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Color Adjuster - Edit Image Online",
        "description": "Use this online image tool to color adjuster directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "grayscale": {
    "utilityId": "grayscale",
    "name": "Grayscale Converter",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/grayscale",
    "title": "Grayscale Converter - Edit Image Online",
    "description": "Use this online image tool to grayscale converter directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/grayscale",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Grayscale Converter - Edit Image Online",
        "description": "Use this online image tool to grayscale converter directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/grayscale",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Grayscale Converter - Edit Image Online",
        "description": "Use this online image tool to grayscale converter directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "color-to-black-and-white": {
    "utilityId": "color-to-black-and-white",
    "name": "Color to Black & White",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/color-to-black-and-white",
    "title": "Color to Black & White - Edit Image Online",
    "description": "Use this online image tool to color to black & white directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/color-to-black-and-white",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Color to Black & White - Edit Image Online",
        "description": "Use this online image tool to color to black & white directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/color-to-black-and-white",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Color to Black & White - Edit Image Online",
        "description": "Use this online image tool to color to black & white directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "black-and-white-to-color": {
    "utilityId": "black-and-white-to-color",
    "name": "Black & White to Color",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/black-and-white-to-color",
    "title": "Black & White to Color - Edit Image Online",
    "description": "Use this online image tool to black & white to color directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/black-and-white-to-color",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Black & White to Color - Edit Image Online",
        "description": "Use this online image tool to black & white to color directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/black-and-white-to-color",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Black & White to Color - Edit Image Online",
        "description": "Use this online image tool to black & white to color directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "blur-image": {
    "utilityId": "blur-image",
    "name": "Blur Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/blur-image",
    "title": "Blur Image - Edit Image Online",
    "description": "Use this online image tool to blur image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/blur-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Blur Image - Edit Image Online",
        "description": "Use this online image tool to blur image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/blur-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Blur Image - Edit Image Online",
        "description": "Use this online image tool to blur image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "pixelate-image": {
    "utilityId": "pixelate-image",
    "name": "Pixelate Image",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/pixelate-image",
    "title": "Pixelate Image - Edit Image Online",
    "description": "Use this online image tool to pixelate image directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/pixelate-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Pixelate Image - Edit Image Online",
        "description": "Use this online image tool to pixelate image directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/pixelate-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Pixelate Image - Edit Image Online",
        "description": "Use this online image tool to pixelate image directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "add-watermark-to-image": {
    "utilityId": "add-watermark-to-image",
    "name": "Add Watermark",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/add-watermark-to-image",
    "title": "Add Watermark - Edit Image Online",
    "description": "Use this online image tool to add watermark directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/add-watermark-to-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Add Watermark - Edit Image Online",
        "description": "Use this online image tool to add watermark directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/add-watermark-to-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Add Watermark - Edit Image Online",
        "description": "Use this online image tool to add watermark directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "add-text-on-image": {
    "utilityId": "add-text-on-image",
    "name": "Add Text",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/add-text-on-image",
    "title": "Add Text to Image Online – Free Browser-Based Editor",
    "description": "Use this online image tool to add text directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/add-text-on-image",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Add Text to Image Online – Free Browser-Based Editor",
        "description": "Use this online image tool to add text directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/add-text-on-image",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Add Text to Image Online – Free Browser-Based Editor",
        "description": "Use this online image tool to add text directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "add-logo-overlay": {
    "utilityId": "add-logo-overlay",
    "name": "Add Logo Overlay",
    "section": "Image Editing Utilities",
    "subSection": "Image Editing Tools",
    "url": "/editing/tools/add-logo-overlay",
    "title": "Add Logo Overlay - Edit Image Online",
    "description": "Use this online image tool to add logo overlay directly in your web browser. Free, secure, and operates entirely client-side.",
    "canonical": "https://singulariti.in/editing/tools/add-logo-overlay",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Add Logo Overlay - Edit Image Online",
        "description": "Use this online image tool to add logo overlay directly in your web browser. Free, secure, and operates entirely client-side.",
        "url": "https://singulariti.in/editing/tools/add-logo-overlay",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Add Logo Overlay - Edit Image Online",
        "description": "Use this online image tool to add logo overlay directly in your web browser. Free, secure, and operates entirely client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "merge-pdf": {
    "utilityId": "merge-pdf",
    "name": "Merge PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Management",
    "url": "/tools/pdf/merge-pdf",
    "title": "PDF Merger - Combine Multiple PDF Files",
    "description": "Merge multiple PDF files into one document. Useful for combining reports, forms, notes and document pages.",
    "canonical": "https://singulariti.in/tools/pdf/merge-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF Merger - Combine Multiple PDF Files",
        "description": "Merge multiple PDF files into one document. Useful for combining reports, forms, notes and document pages.",
        "url": "https://singulariti.in/tools/pdf/merge-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF Merger - Combine Multiple PDF Files",
        "description": "Merge multiple PDF files into one document. Useful for combining reports, forms, notes and document pages.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "split-pdf": {
    "utilityId": "split-pdf",
    "name": "Split PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Management",
    "url": "/tools/pdf/split-pdf",
    "title": "PDF Splitter - Split PDF Pages into Separate Files",
    "description": "Split PDF files by selected pages or ranges. Useful for extracting sections, separating forms and managing large documents.",
    "canonical": "https://singulariti.in/tools/pdf/split-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF Splitter - Split PDF Pages into Separate Files",
        "description": "Split PDF files by selected pages or ranges. Useful for extracting sections, separating forms and managing large documents.",
        "url": "https://singulariti.in/tools/pdf/split-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF Splitter - Split PDF Pages into Separate Files",
        "description": "Split PDF files by selected pages or ranges. Useful for extracting sections, separating forms and managing large documents.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "rotate-pdf": {
    "utilityId": "rotate-pdf",
    "name": "Rotate PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Management",
    "url": "/tools/pdf/rotate-pdf",
    "title": "Rotate PDF Pages Online – Free Browser PDF Rotation Tool",
    "description": "Use the rotate pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/rotate-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Rotate PDF Pages Online – Free Browser PDF Rotation Tool",
        "description": "Use the rotate pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/rotate-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Rotate PDF Pages Online – Free Browser PDF Rotation Tool",
        "description": "Use the rotate pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "delete-pdf-pages": {
    "utilityId": "delete-pdf-pages",
    "name": "Delete PDF Pages",
    "section": "PDF Utilities",
    "subSection": "PDF Management",
    "url": "/tools/pdf/delete-pdf-pages",
    "title": "Delete PDF Pages - Manage PDF Pages",
    "description": "Use the delete pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/delete-pdf-pages",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Delete PDF Pages - Manage PDF Pages",
        "description": "Use the delete pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/delete-pdf-pages",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Delete PDF Pages - Manage PDF Pages",
        "description": "Use the delete pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "rearrange-pdf-pages": {
    "utilityId": "rearrange-pdf-pages",
    "name": "Rearrange PDF Pages",
    "section": "PDF Utilities",
    "subSection": "PDF Management",
    "url": "/tools/pdf/rearrange-pdf-pages",
    "title": "Rearrange PDF Pages - Manage PDF Pages",
    "description": "Use the rearrange pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/rearrange-pdf-pages",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Rearrange PDF Pages - Manage PDF Pages",
        "description": "Use the rearrange pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/rearrange-pdf-pages",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Rearrange PDF Pages - Manage PDF Pages",
        "description": "Use the rearrange pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "extract-pdf-pages": {
    "utilityId": "extract-pdf-pages",
    "name": "Extract PDF Pages",
    "section": "PDF Utilities",
    "subSection": "PDF Management",
    "url": "/tools/pdf/extract-pdf-pages",
    "title": "Extract PDF Pages - Manage PDF Pages",
    "description": "Use the extract pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/extract-pdf-pages",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Extract PDF Pages - Manage PDF Pages",
        "description": "Use the extract pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/extract-pdf-pages",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Extract PDF Pages - Manage PDF Pages",
        "description": "Use the extract pdf pages utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jpg-to-pdf": {
    "utilityId": "jpg-to-pdf",
    "name": "JPG to PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Conversion",
    "url": "/tools/pdf/jpg-to-pdf",
    "title": "JPG to PDF - Convert PDF Documents",
    "description": "Convert files between formats with the jpg to pdf utility seamlessly in the browser. Safe, fast, and fully client-side.",
    "canonical": "https://singulariti.in/tools/pdf/jpg-to-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "JPG to PDF - Convert PDF Documents",
        "description": "Convert files between formats with the jpg to pdf utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "url": "https://singulariti.in/tools/pdf/jpg-to-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "JPG to PDF - Convert PDF Documents",
        "description": "Convert files between formats with the jpg to pdf utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "pdf-to-jpg": {
    "utilityId": "pdf-to-jpg",
    "name": "PDF to JPG",
    "section": "PDF Utilities",
    "subSection": "PDF Conversion",
    "url": "/tools/pdf/pdf-to-jpg",
    "title": "PDF to JPG - Convert PDF Documents",
    "description": "Convert files between formats with the pdf to jpg utility seamlessly in the browser. Safe, fast, and fully client-side.",
    "canonical": "https://singulariti.in/tools/pdf/pdf-to-jpg",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF to JPG - Convert PDF Documents",
        "description": "Convert files between formats with the pdf to jpg utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "url": "https://singulariti.in/tools/pdf/pdf-to-jpg",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF to JPG - Convert PDF Documents",
        "description": "Convert files between formats with the pdf to jpg utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "compress-pdf": {
    "utilityId": "compress-pdf",
    "name": "Compress PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Utilities",
    "url": "/tools/pdf/compress-pdf",
    "title": "PDF Compressor - Reduce PDF File Size",
    "description": "Compress PDF files to reduce size for upload, sharing or storage. Learn file validation, size reduction and output handling.",
    "canonical": "https://singulariti.in/tools/pdf/compress-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF Compressor - Reduce PDF File Size",
        "description": "Compress PDF files to reduce size for upload, sharing or storage. Learn file validation, size reduction and output handling.",
        "url": "https://singulariti.in/tools/pdf/compress-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF Compressor - Reduce PDF File Size",
        "description": "Compress PDF files to reduce size for upload, sharing or storage. Learn file validation, size reduction and output handling.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "sign-pdf": {
    "utilityId": "sign-pdf",
    "name": "Sign PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Utilities",
    "url": "/tools/pdf/sign-pdf",
    "title": "Sign PDF Online Free – Add Signature to PDF in Browser",
    "description": "Use the sign pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/sign-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Sign PDF Online Free – Add Signature to PDF in Browser",
        "description": "Use the sign pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/sign-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Sign PDF Online Free – Add Signature to PDF in Browser",
        "description": "Use the sign pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "watermark-pdf": {
    "utilityId": "watermark-pdf",
    "name": "Add Watermark to PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Utilities",
    "url": "/tools/pdf/watermark-pdf",
    "title": "Add Watermark to PDF - Convert PDF Documents",
    "description": "Convert files between formats with the add watermark to pdf utility seamlessly in the browser. Safe, fast, and fully client-side.",
    "canonical": "https://singulariti.in/tools/pdf/watermark-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Add Watermark to PDF - Convert PDF Documents",
        "description": "Convert files between formats with the add watermark to pdf utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "url": "https://singulariti.in/tools/pdf/watermark-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Add Watermark to PDF - Convert PDF Documents",
        "description": "Convert files between formats with the add watermark to pdf utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "protect-pdf": {
    "utilityId": "protect-pdf",
    "name": "Protect PDF",
    "section": "PDF Utilities",
    "subSection": "PDF Utilities",
    "url": "/tools/pdf/protect-pdf",
    "title": "Protect PDF - Manage PDF Pages",
    "description": "Use the protect pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/protect-pdf",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Protect PDF - Manage PDF Pages",
        "description": "Use the protect pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/protect-pdf",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Protect PDF - Manage PDF Pages",
        "description": "Use the protect pdf utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "metadata-viewer": {
    "utilityId": "metadata-viewer",
    "name": "PDF Metadata Viewer",
    "section": "PDF Utilities",
    "subSection": "PDF Utilities",
    "url": "/tools/pdf/metadata-viewer",
    "title": "PDF Metadata Viewer - Manage PDF Pages",
    "description": "Use the pdf metadata viewer utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/metadata-viewer",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF Metadata Viewer - Manage PDF Pages",
        "description": "Use the pdf metadata viewer utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/metadata-viewer",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF Metadata Viewer - Manage PDF Pages",
        "description": "Use the pdf metadata viewer utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "page-counter": {
    "utilityId": "page-counter",
    "name": "PDF Page Counter",
    "section": "PDF Utilities",
    "subSection": "PDF Utilities",
    "url": "/tools/pdf/page-counter",
    "title": "PDF Page Counter - Manage PDF Pages",
    "description": "Use the pdf page counter utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
    "canonical": "https://singulariti.in/tools/pdf/page-counter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF Page Counter - Manage PDF Pages",
        "description": "Use the pdf page counter utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "url": "https://singulariti.in/tools/pdf/page-counter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF Page Counter - Manage PDF Pages",
        "description": "Use the pdf page counter utility to manage pages easily in the browser. Rearrange pages, combine files, or apply custom modifications safely.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "pdf-to-text": {
    "utilityId": "pdf-to-text",
    "name": "PDF to Text",
    "section": "PDF Utilities",
    "subSection": "PDF Text Extraction",
    "url": "/tools/pdf/pdf-to-text",
    "title": "PDF to Text - Convert PDF Documents",
    "description": "Convert files between formats with the pdf to text utility seamlessly in the browser. Safe, fast, and fully client-side.",
    "canonical": "https://singulariti.in/tools/pdf/pdf-to-text",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "PDF to Text - Convert PDF Documents",
        "description": "Convert files between formats with the pdf to text utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "url": "https://singulariti.in/tools/pdf/pdf-to-text",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "PDF to Text - Convert PDF Documents",
        "description": "Convert files between formats with the pdf to text utility seamlessly in the browser. Safe, fast, and fully client-side.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "qr-code-generator": {
    "utilityId": "qr-code-generator",
    "name": "QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/qr-code-generator",
    "title": "QR Code Generator - Generate QR Codes from Text or URLs",
    "description": "Create QR codes from text, URLs or contact information. Useful for sharing links, labels, documents and quick access data.",
    "canonical": "https://singulariti.in/tools/qr/qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "QR Code Generator - Generate QR Codes from Text or URLs",
        "description": "Create QR codes from text, URLs or contact information. Useful for sharing links, labels, documents and quick access data.",
        "url": "https://singulariti.in/tools/qr/qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "QR Code Generator - Generate QR Codes from Text or URLs",
        "description": "Create QR codes from text, URLs or contact information. Useful for sharing links, labels, documents and quick access data.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "qr-code-scanner": {
    "utilityId": "qr-code-scanner",
    "name": "QR Code Scanner",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/qr-code-scanner",
    "title": "QR Code Scanner - Scan and Read QR Code Data",
    "description": "Scan QR codes from camera or image input and view decoded text. Useful for reading links, labels and embedded QR data.",
    "canonical": "https://singulariti.in/tools/qr/qr-code-scanner",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "QR Code Scanner - Scan and Read QR Code Data",
        "description": "Scan QR codes from camera or image input and view decoded text. Useful for reading links, labels and embedded QR data.",
        "url": "https://singulariti.in/tools/qr/qr-code-scanner",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "QR Code Scanner - Scan and Read QR Code Data",
        "description": "Scan QR codes from camera or image input and view decoded text. Useful for reading links, labels and embedded QR data.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "url-qr-code-generator": {
    "utilityId": "url-qr-code-generator",
    "name": "URL QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/url-qr-code-generator",
    "title": "URL QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the url qr code generator for url instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/url-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "URL QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the url qr code generator for url instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/url-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "URL QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the url qr code generator for url instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-qr-code-generator": {
    "utilityId": "text-qr-code-generator",
    "name": "Text QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/text-qr-code-generator",
    "title": "Text QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the text qr code generator for text instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/text-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the text qr code generator for text instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/text-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the text qr code generator for text instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "wifi-qr-code-generator": {
    "utilityId": "wifi-qr-code-generator",
    "name": "Wi-Fi QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/wifi-qr-code-generator",
    "title": "Wi-Fi QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the wi-fi qr code generator for wi-fi instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/wifi-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Wi-Fi QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the wi-fi qr code generator for wi-fi instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/wifi-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Wi-Fi QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the wi-fi qr code generator for wi-fi instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "vcard-qr-code-generator": {
    "utilityId": "vcard-qr-code-generator",
    "name": "vCard QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/vcard-qr-code-generator",
    "title": "vCard QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the vcard qr code generator for vcard instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/vcard-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "vCard QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the vcard qr code generator for vcard instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/vcard-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "vCard QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the vcard qr code generator for vcard instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "email-qr-code-generator": {
    "utilityId": "email-qr-code-generator",
    "name": "Email QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/email-qr-code-generator",
    "title": "Email QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the email qr code generator for email instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/email-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Email QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the email qr code generator for email instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/email-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Email QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the email qr code generator for email instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "phone-qr-code-generator": {
    "utilityId": "phone-qr-code-generator",
    "name": "Phone QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/phone-qr-code-generator",
    "title": "Phone QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the phone qr code generator for phone instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/phone-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Phone QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the phone qr code generator for phone instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/phone-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Phone QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the phone qr code generator for phone instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "sms-qr-code-generator": {
    "utilityId": "sms-qr-code-generator",
    "name": "SMS QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/sms-qr-code-generator",
    "title": "SMS QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the sms qr code generator for sms instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/sms-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "SMS QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the sms qr code generator for sms instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/sms-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "SMS QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the sms qr code generator for sms instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "upi-qr-code-generator": {
    "utilityId": "upi-qr-code-generator",
    "name": "UPI QR Code Generator",
    "section": "QR Utilities",
    "subSection": "QR Code Tools",
    "url": "/tools/qr/upi-qr-code-generator",
    "title": "UPI QR Code Generator - Create QR Codes",
    "description": "Generate custom QR codes using the upi qr code generator for upi instantly. Customize size, download image, or share easily.",
    "canonical": "https://singulariti.in/tools/qr/upi-qr-code-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "UPI QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the upi qr code generator for upi instantly. Customize size, download image, or share easily.",
        "url": "https://singulariti.in/tools/qr/upi-qr-code-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "UPI QR Code Generator - Create QR Codes",
        "description": "Generate custom QR codes using the upi qr code generator for upi instantly. Customize size, download image, or share easily.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "emi-calculator": {
    "utilityId": "emi-calculator",
    "name": "EMI Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/emi-calculator",
    "title": "EMI Calculator - Calculate Monthly Loan Payments",
    "description": "Calculate EMI, total payment and interest from loan amount, rate and tenure using the standard EMI formula.",
    "canonical": "https://singulariti.in/tools/calculators/emi-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "EMI Calculator - Calculate Monthly Loan Payments",
        "description": "Calculate EMI, total payment and interest from loan amount, rate and tenure using the standard EMI formula.",
        "url": "https://singulariti.in/tools/calculators/emi-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "EMI Calculator - Calculate Monthly Loan Payments",
        "description": "Calculate EMI, total payment and interest from loan amount, rate and tenure using the standard EMI formula.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "sip-calculator": {
    "utilityId": "sip-calculator",
    "name": "SIP Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/sip-calculator",
    "title": "SIP Calculator - Calculate Values Online",
    "description": "Use the sip calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/sip-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "SIP Calculator - Calculate Values Online",
        "description": "Use the sip calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/sip-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "SIP Calculator - Calculate Values Online",
        "description": "Use the sip calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "compound-interest-calculator": {
    "utilityId": "compound-interest-calculator",
    "name": "Compound Interest Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/compound-interest-calculator",
    "title": "Compound Interest Calculator - Calculate Values Online",
    "description": "Use the compound interest calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/compound-interest-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Compound Interest Calculator - Calculate Values Online",
        "description": "Use the compound interest calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/compound-interest-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Compound Interest Calculator - Calculate Values Online",
        "description": "Use the compound interest calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "cagr-calculator": {
    "utilityId": "cagr-calculator",
    "name": "CAGR Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/cagr-calculator",
    "title": "CAGR Calculator - Calculate Values Online",
    "description": "Use the cagr calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/cagr-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "CAGR Calculator - Calculate Values Online",
        "description": "Use the cagr calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/cagr-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "CAGR Calculator - Calculate Values Online",
        "description": "Use the cagr calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "fd-calculator": {
    "utilityId": "fd-calculator",
    "name": "FD Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/fd-calculator",
    "title": "FD Calculator - Calculate Values Online",
    "description": "Use the fd calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/fd-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "FD Calculator - Calculate Values Online",
        "description": "Use the fd calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/fd-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "FD Calculator - Calculate Values Online",
        "description": "Use the fd calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "roi-calculator": {
    "utilityId": "roi-calculator",
    "name": "ROI Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/roi-calculator",
    "title": "ROI Calculator - Calculate Values Online",
    "description": "Use the roi calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/roi-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "ROI Calculator - Calculate Values Online",
        "description": "Use the roi calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/roi-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "ROI Calculator - Calculate Values Online",
        "description": "Use the roi calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "currency-converter": {
    "utilityId": "currency-converter",
    "name": "Currency Converter",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/currency-converter",
    "title": "Currency Converter - Calculate Values Online",
    "description": "Use the currency converter to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/currency-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Currency Converter - Calculate Values Online",
        "description": "Use the currency converter to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/currency-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Currency Converter - Calculate Values Online",
        "description": "Use the currency converter to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "mortgage-calculator": {
    "utilityId": "mortgage-calculator",
    "name": "Mortgage Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/mortgage-calculator",
    "title": "Mortgage Calculator - Calculate Values Online",
    "description": "Use the mortgage calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/mortgage-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Mortgage Calculator - Calculate Values Online",
        "description": "Use the mortgage calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/mortgage-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Mortgage Calculator - Calculate Values Online",
        "description": "Use the mortgage calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "loan-calculator": {
    "utilityId": "loan-calculator",
    "name": "Loan Calculator",
    "section": "Calculator Utilities",
    "subSection": "Financial Calculators",
    "url": "/tools/calculators/loan-calculator",
    "title": "Loan Calculator - Calculate Values Online",
    "description": "Use the loan calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/loan-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Loan Calculator - Calculate Values Online",
        "description": "Use the loan calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/loan-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Loan Calculator - Calculate Values Online",
        "description": "Use the loan calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "income-tax-calculator": {
    "utilityId": "income-tax-calculator",
    "name": "Income Tax Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/income-tax-calculator",
    "title": "Income Tax Calculator - Calculate Values Online",
    "description": "Use the income tax calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/income-tax-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Income Tax Calculator - Calculate Values Online",
        "description": "Use the income tax calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/income-tax-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Income Tax Calculator - Calculate Values Online",
        "description": "Use the income tax calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "gst-calculator": {
    "utilityId": "gst-calculator",
    "name": "GST Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/gst-calculator",
    "title": "GST Calculator - Calculate Values Online",
    "description": "Use the gst calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/gst-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "GST Calculator - Calculate Values Online",
        "description": "Use the gst calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/gst-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "GST Calculator - Calculate Values Online",
        "description": "Use the gst calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "discount-calculator": {
    "utilityId": "discount-calculator",
    "name": "Discount Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/discount-calculator",
    "title": "Discount Calculator - Calculate Values Online",
    "description": "Use the discount calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/discount-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Discount Calculator - Calculate Values Online",
        "description": "Use the discount calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/discount-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Discount Calculator - Calculate Values Online",
        "description": "Use the discount calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "profit-calculator": {
    "utilityId": "profit-calculator",
    "name": "Profit Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/profit-calculator",
    "title": "Profit Calculator - Calculate Values Online",
    "description": "Use the profit calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/profit-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Profit Calculator - Calculate Values Online",
        "description": "Use the profit calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/profit-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Profit Calculator - Calculate Values Online",
        "description": "Use the profit calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "youtube-earnings-calculator": {
    "utilityId": "youtube-earnings-calculator",
    "name": "YouTube Earnings Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/youtube-earnings-calculator",
    "title": "YouTube Earnings Calculator - Calculate Values Online",
    "description": "Use the youtube earnings calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/youtube-earnings-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "YouTube Earnings Calculator - Calculate Values Online",
        "description": "Use the youtube earnings calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/youtube-earnings-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "YouTube Earnings Calculator - Calculate Values Online",
        "description": "Use the youtube earnings calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "adsense-revenue-calculator": {
    "utilityId": "adsense-revenue-calculator",
    "name": "AdSense Revenue Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/adsense-revenue-calculator",
    "title": "AdSense Revenue Calculator - Calculate Values Online",
    "description": "Use the adsense revenue calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/adsense-revenue-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "AdSense Revenue Calculator - Calculate Values Online",
        "description": "Use the adsense revenue calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/adsense-revenue-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "AdSense Revenue Calculator - Calculate Values Online",
        "description": "Use the adsense revenue calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "simple-interest-calculator": {
    "utilityId": "simple-interest-calculator",
    "name": "Simple Interest Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/simple-interest-calculator",
    "title": "Simple Interest Calculator - Calculate Values Online",
    "description": "Use the simple interest calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/simple-interest-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Simple Interest Calculator - Calculate Values Online",
        "description": "Use the simple interest calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/simple-interest-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Simple Interest Calculator - Calculate Values Online",
        "description": "Use the simple interest calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "salary-calculator": {
    "utilityId": "salary-calculator",
    "name": "Salary Calculator",
    "section": "Calculator Utilities",
    "subSection": "Tax & Business Calculators",
    "url": "/tools/calculators/salary-calculator",
    "title": "Salary Calculator - Calculate Values Online",
    "description": "Use the salary calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/salary-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Salary Calculator - Calculate Values Online",
        "description": "Use the salary calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/salary-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Salary Calculator - Calculate Values Online",
        "description": "Use the salary calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "percentage-calculator": {
    "utilityId": "percentage-calculator",
    "name": "Percentage Calculator",
    "section": "Calculator Utilities",
    "subSection": "Math & Science Calculators",
    "url": "/tools/calculators/percentage-calculator",
    "title": "Percentage Calculator - Calculate Percentages Quickly",
    "description": "Calculate percentages from part and whole values. Useful for discounts, marks, comparisons and everyday math tasks.",
    "canonical": "https://singulariti.in/tools/calculators/percentage-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Percentage Calculator - Calculate Percentages Quickly",
        "description": "Calculate percentages from part and whole values. Useful for discounts, marks, comparisons and everyday math tasks.",
        "url": "https://singulariti.in/tools/calculators/percentage-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Percentage Calculator - Calculate Percentages Quickly",
        "description": "Calculate percentages from part and whole values. Useful for discounts, marks, comparisons and everyday math tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "cgpa-calculator": {
    "utilityId": "cgpa-calculator",
    "name": "CGPA Calculator",
    "section": "Calculator Utilities",
    "subSection": "Math & Science Calculators",
    "url": "/tools/calculators/cgpa-calculator",
    "title": "CGPA Calculator - Calculate Values Online",
    "description": "Use the cgpa calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/cgpa-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "CGPA Calculator - Calculate Values Online",
        "description": "Use the cgpa calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/cgpa-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "CGPA Calculator - Calculate Values Online",
        "description": "Use the cgpa calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "scientific-calculator": {
    "utilityId": "scientific-calculator",
    "name": "Scientific Calculator",
    "section": "Calculator Utilities",
    "subSection": "Math & Science Calculators",
    "url": "/tools/calculators/scientific-calculator",
    "title": "Scientific Calculator - Calculate Values Online",
    "description": "Use the scientific calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/scientific-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Scientific Calculator - Calculate Values Online",
        "description": "Use the scientific calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/scientific-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Scientific Calculator - Calculate Values Online",
        "description": "Use the scientific calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "basic-calculator": {
    "utilityId": "basic-calculator",
    "name": "Basic Calculator",
    "section": "Calculator Utilities",
    "subSection": "Math & Science Calculators",
    "url": "/tools/calculators/basic-calculator",
    "title": "Basic Calculator - Calculate Values Online",
    "description": "Use the basic calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/basic-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Basic Calculator - Calculate Values Online",
        "description": "Use the basic calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/basic-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Basic Calculator - Calculate Values Online",
        "description": "Use the basic calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "age-calculator": {
    "utilityId": "age-calculator",
    "name": "Age Calculator",
    "section": "Calculator Utilities",
    "subSection": "Health & Date Calculators",
    "url": "/tools/calculators/age-calculator",
    "title": "Age Calculator - Calculate Values Online",
    "description": "Use the age calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/age-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Age Calculator - Calculate Values Online",
        "description": "Use the age calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/age-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Age Calculator - Calculate Values Online",
        "description": "Use the age calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "date-difference-calculator": {
    "utilityId": "date-difference-calculator",
    "name": "Date Difference Calculator",
    "section": "Calculator Utilities",
    "subSection": "Health & Date Calculators",
    "url": "/tools/calculators/date-difference-calculator",
    "title": "Date Difference Calculator - Calculate Values Online",
    "description": "Use the date difference calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/date-difference-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Date Difference Calculator - Calculate Values Online",
        "description": "Use the date difference calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/date-difference-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Date Difference Calculator - Calculate Values Online",
        "description": "Use the date difference calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "bmi-calculator": {
    "utilityId": "bmi-calculator",
    "name": "BMI Calculator",
    "section": "Calculator Utilities",
    "subSection": "Health & Date Calculators",
    "url": "/tools/calculators/bmi-calculator",
    "title": "BMI Calculator - Calculate Body Mass Index",
    "description": "Calculate BMI from height and weight values. Useful for basic health reference and body mass index checks.",
    "canonical": "https://singulariti.in/tools/calculators/bmi-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "BMI Calculator - Calculate Body Mass Index",
        "description": "Calculate BMI from height and weight values. Useful for basic health reference and body mass index checks.",
        "url": "https://singulariti.in/tools/calculators/bmi-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "BMI Calculator - Calculate Body Mass Index",
        "description": "Calculate BMI from height and weight values. Useful for basic health reference and body mass index checks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "calorie-calculator": {
    "utilityId": "calorie-calculator",
    "name": "Calorie Calculator",
    "section": "Calculator Utilities",
    "subSection": "Health & Date Calculators",
    "url": "/tools/calculators/calorie-calculator",
    "title": "Calorie Calculator - Calculate Values Online",
    "description": "Use the calorie calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/calorie-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Calorie Calculator - Calculate Values Online",
        "description": "Use the calorie calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/calorie-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Calorie Calculator - Calculate Values Online",
        "description": "Use the calorie calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "tip-calculator": {
    "utilityId": "tip-calculator",
    "name": "Tip Calculator",
    "section": "Calculator Utilities",
    "subSection": "Health & Date Calculators",
    "url": "/tools/calculators/tip-calculator",
    "title": "Tip Calculator - Calculate Values Online",
    "description": "Use the tip calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/tip-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Tip Calculator - Calculate Values Online",
        "description": "Use the tip calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/tip-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Tip Calculator - Calculate Values Online",
        "description": "Use the tip calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "time-duration-calculator": {
    "utilityId": "time-duration-calculator",
    "name": "Time Duration Calculator",
    "section": "Calculator Utilities",
    "subSection": "Health & Date Calculators",
    "url": "/tools/calculators/time-duration-calculator",
    "title": "Time Duration Calculator - Calculate Values Online",
    "description": "Use the time duration calculator to compute values instantly in the browser using standard mathematical formulas.",
    "canonical": "https://singulariti.in/tools/calculators/time-duration-calculator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Time Duration Calculator - Calculate Values Online",
        "description": "Use the time duration calculator to compute values instantly in the browser using standard mathematical formulas.",
        "url": "https://singulariti.in/tools/calculators/time-duration-calculator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Time Duration Calculator - Calculate Values Online",
        "description": "Use the time duration calculator to compute values instantly in the browser using standard mathematical formulas.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "word-counter": {
    "utilityId": "word-counter",
    "name": "Word Counter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/word-counter",
    "title": "Word Counter - Count Words and Text Length",
    "description": "Count words from pasted text and review text length. Useful for assignments, forms, content writing and application limits.",
    "canonical": "https://singulariti.in/tools/text/word-counter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Word Counter - Count Words and Text Length",
        "description": "Count words from pasted text and review text length. Useful for assignments, forms, content writing and application limits.",
        "url": "https://singulariti.in/tools/text/word-counter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Word Counter - Count Words and Text Length",
        "description": "Count words from pasted text and review text length. Useful for assignments, forms, content writing and application limits.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "character-counter": {
    "utilityId": "character-counter",
    "name": "Character Counter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/character-counter",
    "title": "Character Counter - Count Characters With or Without Spaces",
    "description": "Count characters in text with or without spaces. Useful for descriptions, form limits, captions and short content checks.",
    "canonical": "https://singulariti.in/tools/text/character-counter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Character Counter - Count Characters With or Without Spaces",
        "description": "Count characters in text with or without spaces. Useful for descriptions, form limits, captions and short content checks.",
        "url": "https://singulariti.in/tools/text/character-counter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Character Counter - Count Characters With or Without Spaces",
        "description": "Count characters in text with or without spaces. Useful for descriptions, form limits, captions and short content checks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "case-converter": {
    "utilityId": "case-converter",
    "name": "Case Converter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/case-converter",
    "title": "Case Converter - Change Text Case Online",
    "description": "Convert text into uppercase, lowercase, title case or sentence case. Useful for formatting headings, notes and copied text.",
    "canonical": "https://singulariti.in/tools/text/case-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Case Converter - Change Text Case Online",
        "description": "Convert text into uppercase, lowercase, title case or sentence case. Useful for formatting headings, notes and copied text.",
        "url": "https://singulariti.in/tools/text/case-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Case Converter - Change Text Case Online",
        "description": "Convert text into uppercase, lowercase, title case or sentence case. Useful for formatting headings, notes and copied text.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "remove-duplicate-lines": {
    "utilityId": "remove-duplicate-lines",
    "name": "Remove Duplicate Lines",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/remove-duplicate-lines",
    "title": "Remove Duplicate Lines - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the remove duplicate lines utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/remove-duplicate-lines",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Remove Duplicate Lines - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the remove duplicate lines utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/remove-duplicate-lines",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Remove Duplicate Lines - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the remove duplicate lines utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-sorter": {
    "utilityId": "text-sorter",
    "name": "Text Sorter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/text-sorter",
    "title": "Text Sorter - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the text sorter utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/text-sorter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text Sorter - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text sorter utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/text-sorter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text Sorter - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text sorter utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-compare": {
    "utilityId": "text-compare",
    "name": "Text Compare",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/text-compare",
    "title": "Text Compare - Find Differences Between Two Texts",
    "description": "Compare two text inputs to identify added, removed or changed content. Useful for checking revisions, drafts and copied text.",
    "canonical": "https://singulariti.in/tools/text/text-compare",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text Compare - Find Differences Between Two Texts",
        "description": "Compare two text inputs to identify added, removed or changed content. Useful for checking revisions, drafts and copied text.",
        "url": "https://singulariti.in/tools/text/text-compare",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text Compare - Find Differences Between Two Texts",
        "description": "Compare two text inputs to identify added, removed or changed content. Useful for checking revisions, drafts and copied text.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-diff": {
    "utilityId": "text-diff",
    "name": "Text Diff Checker",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/text-diff",
    "title": "Text Diff Checker - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the text diff checker utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/text-diff",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text Diff Checker - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text diff checker utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/text-diff",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text Diff Checker - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text diff checker utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "remove-extra-spaces": {
    "utilityId": "remove-extra-spaces",
    "name": "Remove Extra Spaces",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/remove-extra-spaces",
    "title": "Remove Extra Spaces - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the remove extra spaces utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/remove-extra-spaces",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Remove Extra Spaces - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the remove extra spaces utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/remove-extra-spaces",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Remove Extra Spaces - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the remove extra spaces utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "line-counter": {
    "utilityId": "line-counter",
    "name": "Line Counter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/line-counter",
    "title": "Line Counter - Count Text Metrics",
    "description": "Analyze text input and count characters, words or patterns using the line counter in real time. Useful for content limits and copy editing.",
    "canonical": "https://singulariti.in/tools/text/line-counter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Line Counter - Count Text Metrics",
        "description": "Analyze text input and count characters, words or patterns using the line counter in real time. Useful for content limits and copy editing.",
        "url": "https://singulariti.in/tools/text/line-counter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Line Counter - Count Text Metrics",
        "description": "Analyze text input and count characters, words or patterns using the line counter in real time. Useful for content limits and copy editing.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "sentence-counter": {
    "utilityId": "sentence-counter",
    "name": "Sentence Counter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/sentence-counter",
    "title": "Sentence Counter - Count Text Metrics",
    "description": "Analyze text input and count characters, words or patterns using the sentence counter in real time. Useful for content limits and copy editing.",
    "canonical": "https://singulariti.in/tools/text/sentence-counter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Sentence Counter - Count Text Metrics",
        "description": "Analyze text input and count characters, words or patterns using the sentence counter in real time. Useful for content limits and copy editing.",
        "url": "https://singulariti.in/tools/text/sentence-counter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Sentence Counter - Count Text Metrics",
        "description": "Analyze text input and count characters, words or patterns using the sentence counter in real time. Useful for content limits and copy editing.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "paragraph-counter": {
    "utilityId": "paragraph-counter",
    "name": "Paragraph Counter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/paragraph-counter",
    "title": "Paragraph Counter - Count Text Metrics",
    "description": "Analyze text input and count characters, words or patterns using the paragraph counter in real time. Useful for content limits and copy editing.",
    "canonical": "https://singulariti.in/tools/text/paragraph-counter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Paragraph Counter - Count Text Metrics",
        "description": "Analyze text input and count characters, words or patterns using the paragraph counter in real time. Useful for content limits and copy editing.",
        "url": "https://singulariti.in/tools/text/paragraph-counter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Paragraph Counter - Count Text Metrics",
        "description": "Analyze text input and count characters, words or patterns using the paragraph counter in real time. Useful for content limits and copy editing.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-reverser": {
    "utilityId": "text-reverser",
    "name": "Text Reverser",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/text-reverser",
    "title": "Text Reverser - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the text reverser utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/text-reverser",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text Reverser - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text reverser utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/text-reverser",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text Reverser - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text reverser utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "slug-generator": {
    "utilityId": "slug-generator",
    "name": "Slug Generator",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/slug-generator",
    "title": "Slug Generator - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the slug generator utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/slug-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Slug Generator - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the slug generator utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/slug-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Slug Generator - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the slug generator utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "find-replace": {
    "utilityId": "find-replace",
    "name": "Find and Replace Text",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/find-replace",
    "title": "Find and Replace Text - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the find and replace text utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/find-replace",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Find and Replace Text - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the find and replace text utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/find-replace",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Find and Replace Text - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the find and replace text utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-uppercase": {
    "utilityId": "text-uppercase",
    "name": "Text to Uppercase",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/text-uppercase",
    "title": "Text to Uppercase - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the text to uppercase utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/text-uppercase",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text to Uppercase - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text to uppercase utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/text-uppercase",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text to Uppercase - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text to uppercase utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "text-lowercase": {
    "utilityId": "text-lowercase",
    "name": "Text to Lowercase",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/text-lowercase",
    "title": "Text to Lowercase - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the text to lowercase utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/text-lowercase",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Text to Lowercase - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text to lowercase utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/text-lowercase",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Text to Lowercase - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the text to lowercase utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "capitalize-text": {
    "utilityId": "capitalize-text",
    "name": "Capitalize Text",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/capitalize-text",
    "title": "Capitalize Text - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the capitalize text utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/capitalize-text",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Capitalize Text - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the capitalize text utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/capitalize-text",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Capitalize Text - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the capitalize text utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "title-case": {
    "utilityId": "title-case",
    "name": "Title Case Converter",
    "section": "Text Utilities",
    "subSection": "Text Formatting & Manipulation",
    "url": "/tools/text/title-case",
    "title": "Title Case Converter - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the title case converter utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/title-case",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Title Case Converter - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the title case converter utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/title-case",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Title Case Converter - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the title case converter utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "lorem-ipsum": {
    "utilityId": "lorem-ipsum",
    "name": "Lorem Ipsum Generator",
    "section": "Text Utilities",
    "subSection": "Text Generators",
    "url": "/tools/text/lorem-ipsum",
    "title": "Lorem Ipsum Generator - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the lorem ipsum generator utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/lorem-ipsum",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Lorem Ipsum Generator - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the lorem ipsum generator utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/lorem-ipsum",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Lorem Ipsum Generator - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the lorem ipsum generator utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "random-text": {
    "utilityId": "random-text",
    "name": "Random Text Generator",
    "section": "Text Utilities",
    "subSection": "Text Generators",
    "url": "/tools/text/random-text",
    "title": "Random Text Generator - Format and Edit Text",
    "description": "Clean, sort, or convert the casing of your text online using the random text generator utility. Useful for copywriting, formatting, and general content preparation.",
    "canonical": "https://singulariti.in/tools/text/random-text",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Random Text Generator - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the random text generator utility. Useful for copywriting, formatting, and general content preparation.",
        "url": "https://singulariti.in/tools/text/random-text",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Random Text Generator - Format and Edit Text",
        "description": "Clean, sort, or convert the casing of your text online using the random text generator utility. Useful for copywriting, formatting, and general content preparation.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "json-formatter": {
    "utilityId": "json-formatter",
    "name": "JSON Formatter",
    "section": "Developer Utilities",
    "subSection": "Formatters & Beautifiers",
    "url": "/tools/dev/json-formatter",
    "title": "JSON Formatter - Format and Read JSON Data",
    "description": "Format raw or minified JSON into readable output with indentation. Useful for API responses, configuration files and debugging.",
    "canonical": "https://singulariti.in/tools/dev/json-formatter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "JSON Formatter - Format and Read JSON Data",
        "description": "Format raw or minified JSON into readable output with indentation. Useful for API responses, configuration files and debugging.",
        "url": "https://singulariti.in/tools/dev/json-formatter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "JSON Formatter - Format and Read JSON Data",
        "description": "Format raw or minified JSON into readable output with indentation. Useful for API responses, configuration files and debugging.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "json-validator": {
    "utilityId": "json-validator",
    "name": "JSON Validator",
    "section": "Developer Utilities",
    "subSection": "Formatters & Beautifiers",
    "url": "/tools/dev/json-validator",
    "title": "JSON Validator - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the json validator utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/json-validator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "JSON Validator - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the json validator utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/json-validator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "JSON Validator - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the json validator utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "xml-formatter": {
    "utilityId": "xml-formatter",
    "name": "XML Formatter",
    "section": "Developer Utilities",
    "subSection": "Formatters & Beautifiers",
    "url": "/tools/dev/xml-formatter",
    "title": "XML Formatter - Format and Read XML Data",
    "description": "Format XML input into a readable structure with indentation. Useful for checking tags, nested data and structured documents.",
    "canonical": "https://singulariti.in/tools/dev/xml-formatter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "XML Formatter - Format and Read XML Data",
        "description": "Format XML input into a readable structure with indentation. Useful for checking tags, nested data and structured documents.",
        "url": "https://singulariti.in/tools/dev/xml-formatter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "XML Formatter - Format and Read XML Data",
        "description": "Format XML input into a readable structure with indentation. Useful for checking tags, nested data and structured documents.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "yaml-formatter": {
    "utilityId": "yaml-formatter",
    "name": "YAML Formatter",
    "section": "Developer Utilities",
    "subSection": "Formatters & Beautifiers",
    "url": "/tools/dev/yaml-formatter",
    "title": "YAML Formatter - Format and Read YAML Data",
    "description": "Format messy or minified code with the yaml formatter into a readable structured layout. Useful for debugging, formatting, and code syntax checks.",
    "canonical": "https://singulariti.in/tools/dev/yaml-formatter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "YAML Formatter - Format and Read YAML Data",
        "description": "Format messy or minified code with the yaml formatter into a readable structured layout. Useful for debugging, formatting, and code syntax checks.",
        "url": "https://singulariti.in/tools/dev/yaml-formatter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "YAML Formatter - Format and Read YAML Data",
        "description": "Format messy or minified code with the yaml formatter into a readable structured layout. Useful for debugging, formatting, and code syntax checks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "sql-formatter": {
    "utilityId": "sql-formatter",
    "name": "SQL Formatter",
    "section": "Developer Utilities",
    "subSection": "Formatters & Beautifiers",
    "url": "/tools/dev/sql-formatter",
    "title": "SQL Formatter - Format and Read SQL Data",
    "description": "Format messy or minified code with the sql formatter into a readable structured layout. Useful for debugging, formatting, and code syntax checks.",
    "canonical": "https://singulariti.in/tools/dev/sql-formatter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "SQL Formatter - Format and Read SQL Data",
        "description": "Format messy or minified code with the sql formatter into a readable structured layout. Useful for debugging, formatting, and code syntax checks.",
        "url": "https://singulariti.in/tools/dev/sql-formatter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "SQL Formatter - Format and Read SQL Data",
        "description": "Format messy or minified code with the sql formatter into a readable structured layout. Useful for debugging, formatting, and code syntax checks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "code-beautifier": {
    "utilityId": "code-beautifier",
    "name": "Code Beautifier",
    "section": "Developer Utilities",
    "subSection": "Formatters & Beautifiers",
    "url": "/tools/dev/code-beautifier",
    "title": "Code Beautifier - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the code beautifier utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/code-beautifier",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Code Beautifier - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the code beautifier utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/code-beautifier",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Code Beautifier - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the code beautifier utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "base64-encoder-decoder": {
    "utilityId": "base64-encoder-decoder",
    "name": "Base64 Encoder/Decoder",
    "section": "Developer Utilities",
    "subSection": "Encoders, Decoders & Decrypters",
    "url": "/tools/dev/base64-encoder-decoder",
    "title": "Base64 Encoder/Decoder - Encode and Decode Data",
    "description": "Encode or decode data payloads instantly using the base64 encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
    "canonical": "https://singulariti.in/tools/dev/base64-encoder-decoder",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Base64 Encoder/Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the base64 encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "url": "https://singulariti.in/tools/dev/base64-encoder-decoder",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Base64 Encoder/Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the base64 encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "url-encoder-decoder": {
    "utilityId": "url-encoder-decoder",
    "name": "URL Encoder/Decoder",
    "section": "Developer Utilities",
    "subSection": "Encoders, Decoders & Decrypters",
    "url": "/tools/dev/url-encoder-decoder",
    "title": "URL Encoder/Decoder - Encode and Decode Data",
    "description": "Encode or decode data payloads instantly using the url encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
    "canonical": "https://singulariti.in/tools/dev/url-encoder-decoder",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "URL Encoder/Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the url encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "url": "https://singulariti.in/tools/dev/url-encoder-decoder",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "URL Encoder/Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the url encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "jwt-decoder": {
    "utilityId": "jwt-decoder",
    "name": "JWT Decoder",
    "section": "Developer Utilities",
    "subSection": "Encoders, Decoders & Decrypters",
    "url": "/tools/dev/jwt-decoder",
    "title": "JWT Decoder - Encode and Decode Data",
    "description": "Encode or decode data payloads instantly using the jwt decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
    "canonical": "https://singulariti.in/tools/dev/jwt-decoder",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "JWT Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the jwt decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "url": "https://singulariti.in/tools/dev/jwt-decoder",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "JWT Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the jwt decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "html-encoder-decoder": {
    "utilityId": "html-encoder-decoder",
    "name": "HTML Encoder/Decoder",
    "section": "Developer Utilities",
    "subSection": "Encoders, Decoders & Decrypters",
    "url": "/tools/dev/html-encoder-decoder",
    "title": "HTML Encoder/Decoder - Encode and Decode Data",
    "description": "Encode or decode data payloads instantly using the html encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
    "canonical": "https://singulariti.in/tools/dev/html-encoder-decoder",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "HTML Encoder/Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the html encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "url": "https://singulariti.in/tools/dev/html-encoder-decoder",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "HTML Encoder/Decoder - Encode and Decode Data",
        "description": "Encode or decode data payloads instantly using the html encoder/decoder in the browser. Useful for developer configurations, JWT analysis, and secure url conversions.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "html-minifier": {
    "utilityId": "html-minifier",
    "name": "HTML Minifier",
    "section": "Developer Utilities",
    "subSection": "Minifiers & Testers",
    "url": "/tools/dev/html-minifier",
    "title": "HTML Minifier - Minify HTML Code",
    "description": "Minify and compress code using the html minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
    "canonical": "https://singulariti.in/tools/dev/html-minifier",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "HTML Minifier - Minify HTML Code",
        "description": "Minify and compress code using the html minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
        "url": "https://singulariti.in/tools/dev/html-minifier",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "HTML Minifier - Minify HTML Code",
        "description": "Minify and compress code using the html minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "css-minifier": {
    "utilityId": "css-minifier",
    "name": "CSS Minifier",
    "section": "Developer Utilities",
    "subSection": "Minifiers & Testers",
    "url": "/tools/dev/css-minifier",
    "title": "CSS Minifier - Minify CSS Code",
    "description": "Minify and compress code using the css minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
    "canonical": "https://singulariti.in/tools/dev/css-minifier",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "CSS Minifier - Minify CSS Code",
        "description": "Minify and compress code using the css minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
        "url": "https://singulariti.in/tools/dev/css-minifier",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "CSS Minifier - Minify CSS Code",
        "description": "Minify and compress code using the css minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "js-minifier": {
    "utilityId": "js-minifier",
    "name": "JS Minifier",
    "section": "Developer Utilities",
    "subSection": "Minifiers & Testers",
    "url": "/tools/dev/js-minifier",
    "title": "JS Minifier Online – Minify JavaScript Code Free",
    "description": "Minify and compress code using the js minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
    "canonical": "https://singulariti.in/tools/dev/js-minifier",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "JS Minifier Online – Minify JavaScript Code Free",
        "description": "Minify and compress code using the js minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
        "url": "https://singulariti.in/tools/dev/js-minifier",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "JS Minifier Online – Minify JavaScript Code Free",
        "description": "Minify and compress code using the js minifier by removing extra spaces and comments. Useful for optimizing load speed and file size.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "regex-tester": {
    "utilityId": "regex-tester",
    "name": "Regex Tester",
    "section": "Developer Utilities",
    "subSection": "Minifiers & Testers",
    "url": "/tools/dev/regex-tester",
    "title": "Regex Tester - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the regex tester utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/regex-tester",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Regex Tester - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the regex tester utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/regex-tester",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Regex Tester - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the regex tester utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "uuid-generator": {
    "utilityId": "uuid-generator",
    "name": "UUID Generator",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/uuid-generator",
    "title": "UUID Generator - Create Unique Identifier Values",
    "description": "Generate UUID values for testing, records, mock data and development workflows without manually creating identifiers.",
    "canonical": "https://singulariti.in/tools/dev/uuid-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "UUID Generator - Create Unique Identifier Values",
        "description": "Generate UUID values for testing, records, mock data and development workflows without manually creating identifiers.",
        "url": "https://singulariti.in/tools/dev/uuid-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "UUID Generator - Create Unique Identifier Values",
        "description": "Generate UUID values for testing, records, mock data and development workflows without manually creating identifiers.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "hash-generator": {
    "utilityId": "hash-generator",
    "name": "Hash Generator",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/hash-generator",
    "title": "Hash Generator - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the hash generator utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/hash-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Hash Generator - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the hash generator utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/hash-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Hash Generator - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the hash generator utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "color-picker-tool": {
    "utilityId": "color-picker-tool",
    "name": "Color Picker",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/color-picker-tool",
    "title": "Color Picker - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the color picker utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/color-picker-tool",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Color Picker - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the color picker utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/color-picker-tool",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Color Picker - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the color picker utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "hex-to-rgb": {
    "utilityId": "hex-to-rgb",
    "name": "HEX to RGB Converter",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/hex-to-rgb",
    "title": "HEX to RGB Converter - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the hex to rgb converter utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/hex-to-rgb",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "HEX to RGB Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the hex to rgb converter utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/hex-to-rgb",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "HEX to RGB Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the hex to rgb converter utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "rgb-to-hex": {
    "utilityId": "rgb-to-hex",
    "name": "RGB to HEX Converter",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/rgb-to-hex",
    "title": "RGB to HEX Converter - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the rgb to hex converter utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/rgb-to-hex",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "RGB to HEX Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the rgb to hex converter utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/rgb-to-hex",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "RGB to HEX Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the rgb to hex converter utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "timestamp-converter": {
    "utilityId": "timestamp-converter",
    "name": "Timestamp Converter",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/timestamp-converter",
    "title": "Timestamp Converter - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the timestamp converter utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/timestamp-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Timestamp Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the timestamp converter utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/timestamp-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Timestamp Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the timestamp converter utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "unix-time-converter": {
    "utilityId": "unix-time-converter",
    "name": "Unix Time Converter",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/unix-time-converter",
    "title": "Unix Time Converter - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the unix time converter utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/unix-time-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Unix Time Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the unix time converter utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/unix-time-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Unix Time Converter - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the unix time converter utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "markdown-previewer": {
    "utilityId": "markdown-previewer",
    "name": "Markdown Previewer",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/markdown-previewer",
    "title": "Markdown Previewer - Developer Utility Tool",
    "description": "Generate hashes, pick colors, or preview code files locally using the markdown previewer utility. Safe and secure client-side tools for software developer workflows.",
    "canonical": "https://singulariti.in/tools/dev/markdown-previewer",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Markdown Previewer - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the markdown previewer utility. Safe and secure client-side tools for software developer workflows.",
        "url": "https://singulariti.in/tools/dev/markdown-previewer",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Markdown Previewer - Developer Utility Tool",
        "description": "Generate hashes, pick colors, or preview code files locally using the markdown previewer utility. Safe and secure client-side tools for software developer workflows.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "html-previewer": {
    "utilityId": "html-previewer",
    "name": "HTML Previewer",
    "section": "Developer Utilities",
    "subSection": "Utilities & Previewers",
    "url": "/tools/dev/html-previewer",
    "title": "HTML Previewer Online – Render and Preview HTML Code Free",
    "description": "Render and preview raw HTML code live in your browser using this free online HTML Previewer. Secure client-side execution with responsive device sizing options.",
    "canonical": "https://singulariti.in/tools/dev/html-previewer",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "HTML Previewer Online – Render and Preview HTML Code Free",
        "description": "Render and preview raw HTML code live in your browser using this free online HTML Previewer. Secure client-side execution with responsive device sizing options.",
        "url": "https://singulariti.in/tools/dev/html-previewer",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "HTML Previewer Online – Render and Preview HTML Code Free",
        "description": "Render and preview raw HTML code live in your browser using this free online HTML Previewer. Secure client-side execution with responsive device sizing options.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "length-converter": {
    "utilityId": "length-converter",
    "name": "Length Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/length-converter",
    "title": "Length Converter - Convert Length Units",
    "description": "Convert length values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/length-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Length Converter - Convert Length Units",
        "description": "Convert length values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/length-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Length Converter - Convert Length Units",
        "description": "Convert length values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "weight-converter": {
    "utilityId": "weight-converter",
    "name": "Weight Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/weight-converter",
    "title": "Weight Converter - Convert Weight Units",
    "description": "Convert weight values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/weight-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Weight Converter - Convert Weight Units",
        "description": "Convert weight values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/weight-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Weight Converter - Convert Weight Units",
        "description": "Convert weight values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "temperature-converter": {
    "utilityId": "temperature-converter",
    "name": "Temperature Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/temperature-converter",
    "title": "Temperature Converter - Convert Temperature Units",
    "description": "Convert temperature values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/temperature-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Temperature Converter - Convert Temperature Units",
        "description": "Convert temperature values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/temperature-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Temperature Converter - Convert Temperature Units",
        "description": "Convert temperature values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "area-converter": {
    "utilityId": "area-converter",
    "name": "Area Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/area-converter",
    "title": "Area Converter - Convert Area Units",
    "description": "Convert area values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/area-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Area Converter - Convert Area Units",
        "description": "Convert area values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/area-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Area Converter - Convert Area Units",
        "description": "Convert area values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "volume-converter": {
    "utilityId": "volume-converter",
    "name": "Volume Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/volume-converter",
    "title": "Volume Converter - Convert Volume Units",
    "description": "Convert volume values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/volume-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Volume Converter - Convert Volume Units",
        "description": "Convert volume values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/volume-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Volume Converter - Convert Volume Units",
        "description": "Convert volume values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "speed-converter": {
    "utilityId": "speed-converter",
    "name": "Speed Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/speed-converter",
    "title": "Speed Converter - Convert Speed Units",
    "description": "Convert speed values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/speed-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Speed Converter - Convert Speed Units",
        "description": "Convert speed values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/speed-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Speed Converter - Convert Speed Units",
        "description": "Convert speed values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "time-converter": {
    "utilityId": "time-converter",
    "name": "Time Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/time-converter",
    "title": "Time Converter - Convert Time Units",
    "description": "Convert time values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/time-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Time Converter - Convert Time Units",
        "description": "Convert time values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/time-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Time Converter - Convert Time Units",
        "description": "Convert time values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "data-storage-converter": {
    "utilityId": "data-storage-converter",
    "name": "Data Storage Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/data-storage-converter",
    "title": "Data Storage Converter - Convert Data Storage Units",
    "description": "Convert data storage values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/data-storage-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Data Storage Converter - Convert Data Storage Units",
        "description": "Convert data storage values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/data-storage-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Data Storage Converter - Convert Data Storage Units",
        "description": "Convert data storage values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "fuel-efficiency-converter": {
    "utilityId": "fuel-efficiency-converter",
    "name": "Fuel Efficiency Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/fuel-efficiency-converter",
    "title": "Fuel Efficiency Converter - Convert Fuel Efficiency Units",
    "description": "Convert fuel efficiency values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/fuel-efficiency-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Fuel Efficiency Converter - Convert Fuel Efficiency Units",
        "description": "Convert fuel efficiency values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/fuel-efficiency-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Fuel Efficiency Converter - Convert Fuel Efficiency Units",
        "description": "Convert fuel efficiency values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "angle-converter": {
    "utilityId": "angle-converter",
    "name": "Angle Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/angle-converter",
    "title": "Angle Converter - Convert Angle Units",
    "description": "Convert angle values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/angle-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Angle Converter - Convert Angle Units",
        "description": "Convert angle values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/angle-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Angle Converter - Convert Angle Units",
        "description": "Convert angle values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "pressure-converter": {
    "utilityId": "pressure-converter",
    "name": "Pressure Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/pressure-converter",
    "title": "Pressure Converter - Convert Pressure Units",
    "description": "Convert pressure values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/pressure-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Pressure Converter - Convert Pressure Units",
        "description": "Convert pressure values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/pressure-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Pressure Converter - Convert Pressure Units",
        "description": "Convert pressure values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "energy-converter": {
    "utilityId": "energy-converter",
    "name": "Energy Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/energy-converter",
    "title": "Energy Converter - Convert Energy Units",
    "description": "Convert energy values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/energy-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Energy Converter - Convert Energy Units",
        "description": "Convert energy values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/energy-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Energy Converter - Convert Energy Units",
        "description": "Convert energy values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "power-converter": {
    "utilityId": "power-converter",
    "name": "Power Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/power-converter",
    "title": "Power Converter - Convert Power Units",
    "description": "Convert power values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/power-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Power Converter - Convert Power Units",
        "description": "Convert power values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/power-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Power Converter - Convert Power Units",
        "description": "Convert power values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "frequency-converter": {
    "utilityId": "frequency-converter",
    "name": "Frequency Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/frequency-converter",
    "title": "Frequency Converter - Convert Frequency Units",
    "description": "Convert frequency values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/frequency-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Frequency Converter - Convert Frequency Units",
        "description": "Convert frequency values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/frequency-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Frequency Converter - Convert Frequency Units",
        "description": "Convert frequency values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "number-base-converter": {
    "utilityId": "number-base-converter",
    "name": "Number Base Converter",
    "section": "Unit Conversion Utilities",
    "subSection": "Unit Converters",
    "url": "/tools/convert/number-base-converter",
    "title": "Number Base Converter - Convert Number Base Units",
    "description": "Convert number base values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
    "canonical": "https://singulariti.in/tools/convert/number-base-converter",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Number Base Converter - Convert Number Base Units",
        "description": "Convert number base values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "url": "https://singulariti.in/tools/convert/number-base-converter",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Number Base Converter - Convert Number Base Units",
        "description": "Convert number base values between different standard measurement units. Useful for school, science and everyday unit conversion tasks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "meta-tag-generator": {
    "utilityId": "meta-tag-generator",
    "name": "Meta Tag Generator",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/meta-tag-generator",
    "title": "Meta Tag Generator - Create SEO Meta Tags",
    "description": "Generate page title, description and social preview tags for webpages. Useful for preparing basic SEO metadata.",
    "canonical": "https://singulariti.in/tools/seo/meta-tag-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Meta Tag Generator - Create SEO Meta Tags",
        "description": "Generate page title, description and social preview tags for webpages. Useful for preparing basic SEO metadata.",
        "url": "https://singulariti.in/tools/seo/meta-tag-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Meta Tag Generator - Create SEO Meta Tags",
        "description": "Generate page title, description and social preview tags for webpages. Useful for preparing basic SEO metadata.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "meta-title-checker": {
    "utilityId": "meta-title-checker",
    "name": "Meta Title Length Checker",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/meta-title-checker",
    "title": "Meta Title Length Checker - SEO Optimization Tool",
    "description": "Use the meta title length checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/meta-title-checker",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Meta Title Length Checker - SEO Optimization Tool",
        "description": "Use the meta title length checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/meta-title-checker",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Meta Title Length Checker - SEO Optimization Tool",
        "description": "Use the meta title length checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "meta-description-checker": {
    "utilityId": "meta-description-checker",
    "name": "Meta Description Length Checker",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/meta-description-checker",
    "title": "Meta Description Length Checker - SEO Optimization Tool",
    "description": "Use the meta description length checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/meta-description-checker",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Meta Description Length Checker - SEO Optimization Tool",
        "description": "Use the meta description length checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/meta-description-checker",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Meta Description Length Checker - SEO Optimization Tool",
        "description": "Use the meta description length checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "seo-keyword-density": {
    "utilityId": "seo-keyword-density",
    "name": "Keyword Density Checker",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/seo-keyword-density",
    "title": "Keyword Density Checker - Calculate Keyword Usage in Text",
    "description": "Check keyword count and density percentage in text. Useful for reviewing content balance and basic SEO writing checks.",
    "canonical": "https://singulariti.in/tools/seo/seo-keyword-density",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Keyword Density Checker - Calculate Keyword Usage in Text",
        "description": "Check keyword count and density percentage in text. Useful for reviewing content balance and basic SEO writing checks.",
        "url": "https://singulariti.in/tools/seo/seo-keyword-density",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Keyword Density Checker - Calculate Keyword Usage in Text",
        "description": "Check keyword count and density percentage in text. Useful for reviewing content balance and basic SEO writing checks.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "seo-slug-generator": {
    "utilityId": "seo-slug-generator",
    "name": "Slug Generator",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/seo-slug-generator",
    "title": "Slug Generator - SEO Optimization Tool",
    "description": "Use the slug generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/seo-slug-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Slug Generator - SEO Optimization Tool",
        "description": "Use the slug generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/seo-slug-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Slug Generator - SEO Optimization Tool",
        "description": "Use the slug generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "robots-txt-generator": {
    "utilityId": "robots-txt-generator",
    "name": "Robots.txt Generator",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/robots-txt-generator",
    "title": "Robots.txt Generator - SEO Optimization Tool",
    "description": "Use the robots.txt generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/robots-txt-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Robots.txt Generator - SEO Optimization Tool",
        "description": "Use the robots.txt generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/robots-txt-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Robots.txt Generator - SEO Optimization Tool",
        "description": "Use the robots.txt generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "sitemap-xml-generator": {
    "utilityId": "sitemap-xml-generator",
    "name": "Sitemap XML Generator",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/sitemap-xml-generator",
    "title": "Sitemap XML Generator - SEO Optimization Tool",
    "description": "Use the sitemap xml generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/sitemap-xml-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Sitemap XML Generator - SEO Optimization Tool",
        "description": "Use the sitemap xml generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/sitemap-xml-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Sitemap XML Generator - SEO Optimization Tool",
        "description": "Use the sitemap xml generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "open-graph-generator": {
    "utilityId": "open-graph-generator",
    "name": "Open Graph Tag Generator",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/open-graph-generator",
    "title": "Open Graph Tag Generator - SEO Optimization Tool",
    "description": "Use the open graph tag generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/open-graph-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Open Graph Tag Generator - SEO Optimization Tool",
        "description": "Use the open graph tag generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/open-graph-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Open Graph Tag Generator - SEO Optimization Tool",
        "description": "Use the open graph tag generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "twitter-card-generator": {
    "utilityId": "twitter-card-generator",
    "name": "Twitter Card Generator",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/twitter-card-generator",
    "title": "Twitter Card Generator - SEO Optimization Tool",
    "description": "Use the twitter card generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/twitter-card-generator",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Twitter Card Generator - SEO Optimization Tool",
        "description": "Use the twitter card generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/twitter-card-generator",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Twitter Card Generator - SEO Optimization Tool",
        "description": "Use the twitter card generator to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "seo-word-count": {
    "utilityId": "seo-word-count",
    "name": "Word Count for SEO",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/seo-word-count",
    "title": "Word Count for SEO - SEO Optimization Tool",
    "description": "Use the word count for seo to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/seo-word-count",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Word Count for SEO - SEO Optimization Tool",
        "description": "Use the word count for seo to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/seo-word-count",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Word Count for SEO - SEO Optimization Tool",
        "description": "Use the word count for seo to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
  "heading-structure-checker": {
    "utilityId": "heading-structure-checker",
    "name": "Heading Structure Checker",
    "section": "SEO Utilities",
    "subSection": "SEO Generators & Checkers",
    "url": "/tools/seo/heading-structure-checker",
    "title": "Heading Structure Checker - SEO Optimization Tool",
    "description": "Use the heading structure checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
    "canonical": "https://singulariti.in/tools/seo/heading-structure-checker",
    "robots": {
        "index": true,
        "follow": true
    },
    "openGraph": {
        "title": "Heading Structure Checker - SEO Optimization Tool",
        "description": "Use the heading structure checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "url": "https://singulariti.in/tools/seo/heading-structure-checker",
        "type": "website",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "twitter": {
        "card": "summary_large_image",
        "title": "Heading Structure Checker - SEO Optimization Tool",
        "description": "Use the heading structure checker to check keyword density, generate meta tags, or analyze sitemap parameters to optimize your webpage structure for search engines.",
        "image": "https://singulariti.in/og-fallback.png"
    },
    "schemaType": "WebApplication"
},
};

export function getUtilitySEO(id: string): UtilitySEO | undefined {
  return utilityMetadataRegistry[id];
}
