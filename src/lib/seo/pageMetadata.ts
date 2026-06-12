export type PageSEO = {
  title: string;
  description: string;
  path: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: "website" | "article";
    image: string;
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
};

export const pageMetadataRegistry: Record<string, PageSEO> = {
  "home": {
    title: "Free PDF, Image, Text, Developer, SEO & More Tools | Singulariti",
    description: "All-in-one collection of free utility tools for PDF, images, text, code, SEO and productivity. Fast, privacy-friendly and works directly in your browser. No signup required.",
    path: "/",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Free PDF, Image, Text, Developer, SEO & More Tools | Singulariti",
      description: "All-in-one collection of free utility tools for PDF, images, text, code, SEO and productivity. Fast, privacy-friendly and works directly in your browser. No signup required.",
      url: "https://singulariti.in",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Free PDF, Image, Text, Developer, SEO & More Tools | Singulariti",
      description: "All-in-one collection of free utility tools for PDF, images, text, code, SEO and productivity. Fast, privacy-friendly and works directly in your browser. No signup required.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "about": {
    title: "About Singulariti – Free Browser-Based Utility Tools",
    description: "Learn about Singulariti's mission to provide fast, secure, and free browser-based utility tools for image editing, PDF compression, and developer encoding with zero server uploads.",
    path: "/about",
    robots: { index: true, follow: true },
    openGraph: {
      title: "About Singulariti – Free Browser-Based Utility Tools",
      description: "Learn about Singulariti's mission to provide fast, secure, and free browser-based utility tools for image editing, PDF compression, and developer encoding with zero server uploads.",
      url: "https://singulariti.in/about",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "About Singulariti – Free Browser-Based Utility Tools",
      description: "Learn about Singulariti's mission to provide fast, secure, and free browser-based utility tools for image editing, PDF compression, and developer encoding with zero server uploads.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "contact": {
    title: "Contact Us - Online Utility Tools",
    description: "Get in touch for questions, comments, feature requests, or feedback regarding the browser-side utility tools.",
    path: "/contact",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Contact Us - Online Utility Tools",
      description: "Get in touch for questions, comments, feature requests, or feedback regarding the browser-side utility tools.",
      url: "https://singulariti.in/contact",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us - Online Utility Tools",
      description: "Get in touch for questions, comments, feature requests, or feedback regarding the browser-side utility tools.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "feedback": {
    title: "Submit Feedback / Request Tool - Singulariti",
    description: "Submit feedback, report bugs, or request new utility tools for Singulariti. Help us improve our browser-side utilities.",
    path: "/feedback",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Submit Feedback / Request Tool - Singulariti",
      description: "Submit feedback, report bugs, or request new utility tools for Singulariti. Help us improve our browser-side utilities.",
      url: "https://singulariti.in/feedback",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Submit Feedback / Request Tool - Singulariti",
      description: "Submit feedback, report bugs, or request new utility tools for Singulariti. Help us improve our browser-side utilities.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "privacy": {
    title: "Privacy Policy - Online Utility Tools",
    description: "Read how this website handles browser-side processing, temporary file handling, analytics and privacy-related information.",
    path: "/privacy",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Privacy Policy - Online Utility Tools",
      description: "Read how this website handles browser-side processing, temporary file handling, analytics and privacy-related information.",
      url: "https://singulariti.in/privacy",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy - Online Utility Tools",
      description: "Read how this website handles browser-side processing, temporary file handling, analytics and privacy-related information.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "cookie-policy": {
    title: "Cookie Policy - Singulariti",
    description: "Read our cookie policy to understand how we use cookies for analytics, advertising (Google AdSense), and website functionality.",
    path: "/cookie-policy",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Cookie Policy - Singulariti",
      description: "Read our cookie policy to understand how we use cookies for analytics, advertising (Google AdSense), and website functionality.",
      url: "https://singulariti.in/cookie-policy",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Cookie Policy - Singulariti",
      description: "Read our cookie policy to understand how we use cookies for analytics, advertising (Google AdSense), and website functionality.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "terms": {
    title: "Terms and Conditions - Online Utility Tools",
    description: "Read usage terms for online utilities, output limitations, user responsibilities and general website conditions.",
    path: "/terms",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Terms and Conditions - Online Utility Tools",
      description: "Read usage terms for online utilities, output limitations, user responsibilities and general website conditions.",
      url: "https://singulariti.in/terms",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms and Conditions - Online Utility Tools",
      description: "Read usage terms for online utilities, output limitations, user responsibilities and general website conditions.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "blog": {
    title: "Utility Guides and Operation Articles - Blog",
    description: "Read guides that explain how utilities work, what input they need, what output they produce and how each operation happens step by step.",
    path: "/blog",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Utility Guides and Operation Articles - Blog",
      description: "Read guides that explain how utilities work, what input they need, what output they produce and how each operation happens step by step.",
      url: "https://singulariti.in/blog",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Utility Guides and Operation Articles - Blog",
      description: "Read guides that explain how utilities work, what input they need, what output they produce and how each operation happens step by step.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },

  // Section index pages
  "category-image": {
    title: "Image Utilities for Compression, Conversion and Resizing",
    description: "Use image utilities to compress, convert and resize image files for uploads, sharing, previews and web preparation.",
    path: "/image",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Utilities for Compression, Conversion and Resizing",
      description: "Use image utilities to compress, convert and resize image files for uploads, sharing, previews and web preparation.",
      url: "https://singulariti.in/image",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Utilities for Compression, Conversion and Resizing",
      description: "Use image utilities to compress, convert and resize image files for uploads, sharing, previews and web preparation.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-editing": {
    title: "Image Editing Utilities for Cropping, Filters, Watermarks and Enhancements",
    description: "Edit images with cropping, filters, text overlays, watermarks, color adjustments and enhancement utilities.",
    path: "/editing",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Editing Utilities for Cropping, Filters, Watermarks and Enhancements",
      description: "Edit images with cropping, filters, text overlays, watermarks, color adjustments and enhancement utilities.",
      url: "https://singulariti.in/editing",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Editing Utilities for Cropping, Filters, Watermarks and Enhancements",
      description: "Edit images with cropping, filters, text overlays, watermarks, color adjustments and enhancement utilities.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-pdf": {
    title: "PDF Utilities for Merging, Splitting, Compressing and Converting Files",
    description: "Use PDF utilities to merge, split, compress, convert, rotate, sign, watermark and manage document pages.",
    path: "/tools/pdf",
    robots: { index: true, follow: true },
    openGraph: {
      title: "PDF Utilities for Merging, Splitting, Compressing and Converting Files",
      description: "Use PDF utilities to merge, split, compress, convert, rotate, sign, watermark and manage document pages.",
      url: "https://singulariti.in/tools/pdf",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "PDF Utilities for Merging, Splitting, Compressing and Converting Files",
      description: "Use PDF utilities to merge, split, compress, convert, rotate, sign, watermark and manage document pages.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-qr": {
    title: "QR Utilities for Generating, Customizing and Scanning QR Codes",
    description: "Generate, customize and scan QR codes for links, text, labels, documents and quick access information.",
    path: "/tools/qr",
    robots: { index: true, follow: true },
    openGraph: {
      title: "QR Utilities for Generating, Customizing and Scanning QR Codes",
      description: "Generate, customize and scan QR codes for links, text, labels, documents and quick access information.",
      url: "https://singulariti.in/tools/qr",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "QR Utilities for Generating, Customizing and Scanning QR Codes",
      description: "Generate, customize and scan QR codes for links, text, labels, documents and quick access information.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-calculators": {
    title: "Calculator Utilities for Finance, Health, Math, Tax and Date Calculations",
    description: "Use calculator utilities for finance, health, math, tax, percentage, date and everyday calculation tasks.",
    path: "/tools/calculators",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Calculator Utilities for Finance, Health, Math, Tax and Date Calculations",
      description: "Use calculator utilities for finance, health, math, tax, percentage, date and everyday calculation tasks.",
      url: "https://singulariti.in/tools/calculators",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Calculator Utilities for Finance, Health, Math, Tax and Date Calculations",
      description: "Use calculator utilities for finance, health, math, tax, percentage, date and everyday calculation tasks.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-text": {
    title: "Text Utilities for Counting, Cleaning, Formatting and Comparing Text",
    description: "Explore text utilities for word counting, character counting, case conversion, text cleaning, sorting and comparison tasks.",
    path: "/tools/text",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Text Utilities for Counting, Cleaning, Formatting and Comparing Text",
      description: "Explore text utilities for word counting, character counting, case conversion, text cleaning, sorting and comparison tasks.",
      url: "https://singulariti.in/tools/text",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Text Utilities for Counting, Cleaning, Formatting and Comparing Text",
      description: "Explore text utilities for word counting, character counting, case conversion, text cleaning, sorting and comparison tasks.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-dev": {
    title: "Developer Utilities for Formatting, Encoding, Previewing and Generating Data",
    description: "Use developer utilities for formatting code, validating structured data, encoding values, previewing HTML and generating identifiers.",
    path: "/tools/dev",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Developer Utilities for Formatting, Encoding, Previewing and Generating Data",
      description: "Use developer utilities for formatting code, validating structured data, encoding values, previewing HTML and generating identifiers.",
      url: "https://singulariti.in/tools/dev",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Developer Utilities for Formatting, Encoding, Previewing and Generating Data",
      description: "Use developer utilities for formatting code, validating structured data, encoding values, previewing HTML and generating identifiers.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-convert": {
    title: "Unit Conversion Utilities for Length, Weight, Temperature, Area and Data",
    description: "Convert units for length, weight, temperature, area, volume, speed, time, data storage and number systems.",
    path: "/tools/convert",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Unit Conversion Utilities for Length, Weight, Temperature, Area and Data",
      description: "Convert units for length, weight, temperature, area, volume, speed, time, data storage and number systems.",
      url: "https://singulariti.in/tools/convert",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Unit Conversion Utilities for Length, Weight, Temperature, Area and Data",
      description: "Convert units for length, weight, temperature, area, volume, speed, time, data storage and number systems.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "category-seo": {
    title: "SEO Utilities for Meta Tags, Keywords, Headings, Sitemaps and Robots Files",
    description: "Use SEO utilities to generate meta tags, check keyword usage, review headings, create sitemaps and prepare robots.txt files.",
    path: "/tools/seo",
    robots: { index: true, follow: true },
    openGraph: {
      title: "SEO Utilities for Meta Tags, Keywords, Headings, Sitemaps and Robots Files",
      description: "Use SEO utilities to generate meta tags, check keyword usage, review headings, create sitemaps and prepare robots.txt files.",
      url: "https://singulariti.in/tools/seo",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "SEO Utilities for Meta Tags, Keywords, Headings, Sitemaps and Robots Files",
      description: "Use SEO utilities to generate meta tags, check keyword usage, review headings, create sitemaps and prepare robots.txt files.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "tools": {
    title: "Tools Directory - Singulariti",
    description: "Explore the complete directory of browser-based utility tools. Compress, edit, and convert images, PDFs, and generate or scan QR codes locally and securely.",
    path: "/tools",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Tools Directory - Singulariti",
      description: "Explore the complete directory of browser-based utility tools. Compress, edit, and convert images, PDFs, and generate or scan QR codes locally and securely.",
      url: "https://singulariti.in/tools",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Tools Directory - Singulariti",
      description: "Explore the complete directory of browser-based utility tools. Compress, edit, and convert images, PDFs, and generate or scan QR codes locally and securely.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "typing-speed-test": {
    title: "Typing Speed Test - Check WPM and Accuracy Online | Singulariti",
    description: "Test typing speed (WPM) and accuracy with the free online typing test. Features real-time metrics, interactive charts, and mistake analysis entirely in the browser.",
    path: "/typing-speed-test",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Typing Speed Test - Check WPM and Accuracy Online | Singulariti",
      description: "Test typing speed (WPM) and accuracy with the free online typing test. Features real-time metrics, interactive charts, and mistake analysis entirely in the browser.",
      url: "https://singulariti.in/typing-speed-test",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Typing Speed Test - Check WPM and Accuracy Online | Singulariti",
      description: "Test typing speed (WPM) and accuracy with the free online typing test. Features real-time metrics, interactive charts, and mistake analysis entirely in the browser.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "online-whiteboard": {
    title: "Online Whiteboard - Draw, Write and Export Ideas | Singulariti",
    description: "Draw, write, sketch, add shapes, and export the whiteboard directly in the browser. Free, secure, and operates client-side.",
    path: "/tools/editing/online-whiteboard",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Online Whiteboard - Draw, Write and Export Ideas | Singulariti",
      description: "Draw, write, sketch, add shapes, and export the whiteboard directly in the browser. Free, secure, and operates client-side.",
      url: "https://singulariti.in/tools/editing/online-whiteboard",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Online Whiteboard - Draw, Write and Export Ideas | Singulariti",
      description: "Draw, write, sketch, add shapes, and export the whiteboard directly in the browser. Free, secure, and operates client-side.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "pomodoro-timer": {
    title: "Pomodoro Timer - Deep Focus Environment | Singulariti",
    description: "A beautiful, distraction-free Pomodoro timer designed for deep work. Includes ambient sounds, task management, and focus modes.",
    path: "/pomodoro-timer",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Pomodoro Timer - Deep Focus Environment | Singulariti",
      description: "A beautiful, distraction-free Pomodoro timer designed for deep work. Includes ambient sounds, task management, and focus modes.",
      url: "https://singulariti.in/pomodoro-timer",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Pomodoro Timer - Deep Focus Environment | Singulariti",
      description: "A beautiful, distraction-free Pomodoro timer designed for deep work. Includes ambient sounds, task management, and focus modes.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "image-editor": {
    title: "Image Editor Tools - Edit & Adjust Images Online | Singulariti",
    description: "Free online browser-based image editor. Upscale, sharpen, denoise, enhance, adjust brightness, and overlay watermarks locally without uploading.",
    path: "/tools/image/editor",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Editor Tools - Edit & Adjust Images Online | Singulariti",
      description: "Free online browser-based image editor. Upscale, sharpen, denoise, enhance, adjust brightness, and overlay watermarks locally without uploading.",
      url: "https://singulariti.in/tools/image/editor",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Editor Tools - Edit & Adjust Images Online | Singulariti",
      description: "Free online browser-based image editor. Upscale, sharpen, denoise, enhance, adjust brightness, and overlay watermarks locally without uploading.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "blog-utility-guides": {
    title: "Utility Guides Directory - Index Archive | Singulariti",
    description: "Browse the complete directory index of utility guides. Discover sections and subsections covering formatting, compression, health, and math calculators.",
    path: "/blog/utility-guides",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Utility Guides Directory - Index Archive | Singulariti",
      description: "Browse the complete directory index of utility guides. Discover sections and subsections covering formatting, compression, health, and math calculators.",
      url: "https://singulariti.in/blog/utility-guides",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Utility Guides Directory - Index Archive | Singulariti",
      description: "Browse the complete directory index of utility guides. Discover sections and subsections covering formatting, compression, health, and math calculators.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "collection-image-compression": {
    title: "Image Compression Utilities - Compress Images Online",
    description: "Use image compression utilities to reduce image file sizes without losing quality. Works instantly in the web browser.",
    path: "/image/compression",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Compression Utilities - Compress Images Online",
      description: "Use image compression utilities to reduce image file sizes without losing quality. Works instantly in the web browser.",
      url: "https://singulariti.in/image/compression",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Compression Utilities - Compress Images Online",
      description: "Use image compression utilities to reduce image file sizes without losing quality. Works instantly in the web browser.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "collection-image-conversion": {
    title: "Image Conversion Utilities - Convert Images Online",
    description: "Use image conversion utilities to convert images between different formats instantly and securely in the web browser.",
    path: "/image/conversion",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Conversion Utilities - Convert Images Online",
      description: "Use image conversion utilities to convert images between different formats instantly and securely in the web browser.",
      url: "https://singulariti.in/image/conversion",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Conversion Utilities - Convert Images Online",
      description: "Use image conversion utilities to convert images between different formats instantly and securely in the web browser.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "collection-image-utility": {
    title: "Image Utility Tools - Analyze Images Online",
    description: "Use image utility tools to extract color palettes, pick colors, check dimensions, and view EXIF metadata.",
    path: "/image/utility",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Utility Tools - Analyze Images Online",
      description: "Use image utility tools to extract color palettes, pick colors, check dimensions, and view EXIF metadata.",
      url: "https://singulariti.in/image/utility",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Utility Tools - Analyze Images Online",
      description: "Use image utility tools to extract color palettes, pick colors, check dimensions, and view EXIF metadata.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "collection-image-developer": {
    title: "Image Developer Utilities - Base64 Conversion",
    description: "Use image developer utilities to convert images to Base64 strings and decode Base64 data URIs securely.",
    path: "/image/developer",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Developer Utilities - Base64 Conversion",
      description: "Use image developer utilities to convert images to Base64 strings and decode Base64 data URIs securely.",
      url: "https://singulariti.in/image/developer",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Developer Utilities - Base64 Conversion",
      description: "Use image developer utilities to convert images to Base64 strings and decode Base64 data URIs securely.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "collection-editing-tools": {
    title: "Image Editing Utilities - Edit Images Online",
    description: "Use image editing utilities to resize, crop, rotate, flip, and apply filters to images directly in the browser.",
    path: "/editing/tools",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Image Editing Utilities - Edit Images Online",
      description: "Use image editing utilities to resize, crop, rotate, flip, and apply filters to images directly in the browser.",
      url: "https://singulariti.in/editing/tools",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Editing Utilities - Edit Images Online",
      description: "Use image editing utilities to resize, crop, rotate, flip, and apply filters to images directly in the browser.",
      image: "https://singulariti.in/og-fallback.png"
    }
  },
  "disclaimer": {
    title: "Disclaimer | Singulariti",
    description: "Read the disclaimer and limitations of liability for the tools, content, and calculators provided by Singulariti.",
    path: "/disclaimer",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Disclaimer | Singulariti",
      description: "Read the disclaimer and limitations of liability for the tools, content, and calculators provided by Singulariti.",
      url: "https://singulariti.in/disclaimer",
      type: "website",
      image: "https://singulariti.in/og-fallback.png"
    },
    twitter: {
      card: "summary",
      title: "Disclaimer | Singulariti",
      description: "Read the disclaimer and limitations of liability for the tools, content, and calculators provided by Singulariti.",
      image: "https://singulariti.in/og-fallback.png"
    }
  }
};

export function getPageSEO(key: string): PageSEO | undefined {
  return pageMetadataRegistry[key];
}
