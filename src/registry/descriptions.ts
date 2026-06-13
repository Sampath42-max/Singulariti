// Deterministic DJB2 hash helper
function getHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

// Map format abbreviations to full descriptive terms
function getFormatName(fmt: string): string {
  const f = fmt.toLowerCase();
  if (f === 'jpg' || f === 'jpeg') return 'JPEG image';
  if (f === 'png') return 'PNG graphic';
  if (f === 'webp') return 'WebP photo';
  if (f === 'svg') return 'SVG vector graphic';
  if (f === 'pdf') return 'PDF document';
  if (f === 'heic') return 'Apple HEIC image';
  if (f === 'gif') return 'animated GIF';
  return fmt.toUpperCase();
}

// Main vocabulary pool for specific tool actions
const toolActions: Record<string, string> = {
  // Calculators - Finance
  'cagr-calculator': 'Compute the Compound Annual Growth Rate (CAGR) for multi-year investment portfolios',
  'fd-calculator': 'Calculate Fixed Deposit maturity amounts, interest yields, and overall wealth gains',
  'roi-calculator': 'Evaluate return on investment metrics, annualized performance percentages, and capital growth',
  'currency-converter': 'Convert currency values across global exchange rates with accurate calculations',
  'mortgage-calculator': 'Estimate monthly mortgage installments including property taxes, interest, and home insurance fees',
  'loan-calculator': 'Compute monthly loan amortization schedules, total interest charges, and repayment timelines',
  
  // Calculators - Tax & Business
  'income-tax-calculator': 'Estimate income tax liabilities under Old and New tax regimes with custom deductions',
  'gst-calculator': 'Determine Goods and Services Tax (GST) amounts by adding or removing tax values',
  'discount-calculator': 'Calculate percentage discount savings, final markdown sales prices, and net price reductions',
  'profit-calculator': 'Assess sales markup values, cost parameters, profit amounts, and final profit margins',
  'youtube-earnings-calculator': 'Estimate daily, monthly, and annualized earnings potential for YouTube content creators',
  'adsense-revenue-calculator': 'Compute Google AdSense revenue projections based on page impressions, CTR, and CPC targets',
  'simple-interest-calculator': 'Calculate simple interest earnings, principal amounts, interest rates, or term durations',
  'salary-calculator': 'Convert wage rates across hourly, daily, weekly, monthly, and annual salaries',

  // Calculators - Math & Science
  'percentage-calculator': 'Evaluate percentage differences, growth rates, margins, and fractional proportions',
  'cgpa-calculator': 'Compute cumulative grade point averages (CGPA) and convert grades to percentages',
  'scientific-calculator': 'Solve complex mathematical formulas, trigonometry, logarithmic values, and algebraic equations',
  'basic-calculator': 'Run fundamental arithmetic equations including addition, subtraction, division, and multiplication',

  // Calculators - Health & Date
  'age-calculator': 'Determine exact chronological age in years, months, and days, and countdown to your next birthday',
  'date-difference-calculator': 'Calculate the exact number of years, months, and days difference between two selected calendar dates',
  'bmi-calculator': 'Estimate body mass index (BMI) ranges and evaluate healthy weight parameters',
  'calorie-calculator': 'Calculate Basal Metabolic Rate (BMR) and daily calorie targets based on exercise goals',
  'tip-calculator': 'Determine bill splitting ratios, exact tip percentages, and individual payment shares',
  'time-duration-calculator': 'Compute elapsed time spans in hours, minutes, and seconds between two timestamps',

  // Text Tools - Formatting & Manipulation
  'word-counter': 'Count raw word limits, character counts, sentences, and paragraph tags in real-time',
  'character-counter': 'Track character lengths, space counts, and text layouts instantly',
  'case-converter': 'Convert case structures between uppercase, lowercase, sentence case, and title case',
  'remove-duplicate-lines': 'Identify and purge identical lines or list items from text files',
  'text-sorter': 'Rearrange lists and content lines alphabetically, numerically, or in reverse order',
  'text-compare': 'Analyze differences between two text blocks side-by-side with visual highlights',
  'text-diff': 'Compare draft versions to identify line edits and character changes',
  'remove-extra-spaces': 'Clean up text strings by stripping redundant spacing, tabs, and empty line breaks',
  'line-counter': 'Determine the exact count of lines and blank lines in your documents',
  'sentence-counter': 'Count sentences in copy drafts to evaluate readability indices',
  'paragraph-counter': 'Inspect text structure to find paragraph counts and average reading times',
  'text-reverser': 'Reverse character letter orders or word positions in your text layouts',
  'slug-generator': 'Convert title phrases into clean, URL-friendly web routing slug formats',
  'find-replace': 'Locate target words and replace them with updated text parameters',
  'text-uppercase': 'Format all letters in your copy drafts to uppercase block layouts',
  'text-lowercase': 'Convert all text block structures to lowercase formats instantly',
  'capitalize-text': 'Capitalize the first letter of each sentence in your text block automatically',
  'title-case': 'Format headings and text lists to standard Title Case capitalization styles',

  // Text Tools - Generators
  'lorem-ipsum': 'Generate standard Lorem Ipsum placeholder paragraphs for layouts and templates',
  'random-text': 'Generate random alphanumeric strings, password sequences, or character lists',

  // Developer Tools - Formatters & Beautifiers
  'json-formatter': 'Prettify and format raw JSON data trees with custom indentation styles',
  'json-validator': 'Validate JSON schemas and troubleshoot formatting issues or syntax errors',
  'xml-formatter': 'Format and indent nested XML tag trees for improved code readability',
  'yaml-formatter': 'Beautify and format YAML documents to align parameters correctly',
  'sql-formatter': 'Format complex SQL queries to clean syntax structures and uppercase keywords',
  'code-beautifier': 'Beautify HTML markups, CSS rules, and JavaScript codes into clean layouts',

  // Developer Tools - Encoders, Decoders & Decrypters
  'base64-encoder-decoder': 'Convert plain text strings to Base64 formats or decode Base64 data coordinates',
  'url-encoder-decoder': 'Percent-encode query parameters or decode URL address components',
  'jwt-decoder': 'Decode JSON Web Token (JWT) header parameters and payload data locally',
  'html-encoder-decoder': 'Convert characters to HTML entities or parse entity codes back to text',

  // Developer Tools - Minifiers & Testers
  'html-minifier': 'Minify HTML source code by stripping spaces, comments, and empty blocks',
  'css-minifier': 'Compress CSS stylesheets by optimizing selectors, declarations, and line endings',
  'js-minifier': 'Minify JavaScript scripts by streamlining code structure and variable layouts',
  'regex-tester': 'Test regular expression patterns against target texts with live match highlighting',

  // Developer Tools - Utilities & Previewers
  'uuid-generator': 'Generate cryptographically secure version 4 RFC4122 compliant UUID strings',
  'hash-generator': 'Compute SHA-256, SHA-512, MD5, and SHA-1 cryptographic hashes locally',
  'color-picker-tool': 'Select color shades, build custom gradients, and design HEX palettes',
  'hex-to-rgb': 'Convert HEX hexadecimal color codes into RGB triplet values',
  'rgb-to-hex': 'Convert RGB color coordinates into standard HEX hexadecimal strings',
  'timestamp-converter': 'Convert human-readable calendar dates to epoch timestamps and vice versa',
  'unix-time-converter': 'Show the current Unix epoch time ticks in seconds and milliseconds',
  'markdown-previewer': 'Compose Markdown files and preview rendered HTML layers dynamically',
  'html-previewer': 'Render HTML codes in a secure, sandboxed frame with real-time updates',
  'web-compiler': 'Compile and run HTML, CSS, and JS codes live in your browser tab',
  'cron-generator': 'Build visual CRON expressions and decode scheduling configurations into plain English',
  'password-generator': 'Generate cryptographically strong, random passwords with custom parameters',
  'bcrypt-generator': 'Generate and verify Bcrypt password credentials with custom salt factors',
  'css-gradient-generator': 'Design linear, radial, and conic CSS background gradients visually',
  'css-box-shadow': 'Create custom CSS box shadow codes with offsets, spreads, and blur settings',
  'color-contrast-checker': 'Verify foreground and background color combinations against WCAG contrast rules',

  // Developer Tools - Media
  'svg-optimizer': 'Clean and optimize SVG vector markups by stripping metadata, tags, and coordinates',
  'pdf-image-extractor': 'Extract and download all image files embedded inside a PDF document',

  // PDF Tools - Management
  'merge-pdf': 'Combine multiple PDF documents into a single unified file in your chosen order',
  'split-pdf': 'Split a PDF document into multiple files by specifying custom page ranges',
  'rotate-pdf': 'Rotate PDF document pages by 90, 180, or 270 degrees locally',
  'delete-pdf-pages': 'Remove selected page layouts from your PDF document easily',
  'rearrange-pdf-pages': 'Rearrange the order of PDF pages visually using simple drag and drop features',
  'extract-pdf-pages': 'Extract and download specific pages or ranges from a PDF document',

  // PDF Tools - Conversion
  'jpg-to-pdf': 'Convert JPEG, PNG, or BMP image files into a single structured PDF document',
  'pdf-to-jpg': 'Convert PDF document pages into high-resolution JPG images',

  // PDF Tools - Utilities
  'compress-pdf': 'Optimize and reduce the file size of PDF documents while maintaining document layout',
  'sign-pdf': 'Place a digital signature on PDF pages by drawing or uploading signature files',
  'watermark-pdf': 'Add customized text or image watermark layers to PDF pages',
  'protect-pdf': 'Secure PDF files with custom passwords and encryption standards',
  'metadata-viewer': 'Inspect hidden PDF metadata details, creation dates, software producers, and file statistics',
  'page-counter': 'Inspect and count pages of multiple PDF documents to compute total sheets',
  'pdf-to-text': 'Extract readable text contents from PDF documents to copy or save',

  // QR Tools
  'qr-code-generator': 'Generate styled, custom QR code symbols for URLs, Wi-Fi networks, and contact details',
  'qr-code-scanner': 'Scan and decode QR codes from camera feeds, image files, or PDF document pages',
  'url-qr-code-generator': 'Convert web addresses and URLs into styled, scannable QR code symbols',
  'text-qr-code-generator': 'Convert plain text sentences or messages into scannable QR code grids',
  'wifi-qr-code-generator': 'Create scannable QR codes containing Wi-Fi access credentials and security settings',
  'vcard-qr-code-generator': 'Generate scannable vCard QR codes to easily share phone numbers and addresses',
  'email-qr-code-generator': 'Generate scannable email QR codes pre-filled with messages and subject parameters',
  'sms-qr-code-generator': 'Create scannable SMS QR codes pre-loaded with phone numbers and body layouts',
  'instagram-qr-code-generator': 'Generate scannable QR codes that link directly to Instagram profile pages',
  'facebook-qr-code-generator': 'Create scannable QR codes linking to Facebook profile timelines or business pages',
  'twitter-qr-code-generator': 'Generate scannable QR codes that direct users to Twitter profile links',
  'upi-qr-code-generator': 'Generate secure UPI payment QR codes pre-configured with merchant VPA IDs and amounts'
};

// Generic sentence template sets to build structural variation
const processVerbs = [
  'Executes locally on your CPU using HTML5 APIs for rapid loading.',
  'Works fully inside your client web tab without data transmission delays.',
  'Runs client-side in your browser cache to ensure high-speed operation.',
  'Processes parameters entirely in-memory for instant feedback loops.'
];

const safetyGuarantees = [
  'Your inputs are never uploaded to any remote server, guaranteeing 100% data safety.',
  'Keeps your files and parameters completely private with zero server logging.',
  'Guarantees absolute data privacy, leaving no digital footprint on third-party networks.',
  'Provides a highly secure, sandboxed workspace that respects your confidentiality.'
];

const userBenefits = [
  'Perfect for developers, students, and professionals looking for secure utility tools.',
  'Provides a lightweight, ad-free, and signup-free utility workspace.',
  'Enables instant operation without software installation or account setup.',
  'A fast and reliable browser-based utility that respects your time and data.'
];

export function getDynamicToolDescription(
  toolId: string,
  toolName: string,
  categoryId: string,
  collectionId: string,
  type: 'description' | 'seoDescription'
): string {
  const hash = getHash(toolId);
  const offset = type === 'seoDescription' ? 1 : 0;

  // Determine structural indices
  const verbIdx = (hash + offset) % processVerbs.length;
  const safetyIdx = ((hash >> 2) + offset) % safetyGuarantees.length;
  const benefitIdx = ((hash >> 4) + offset) % userBenefits.length;

  let primarySentence = '';

  // 1. Check if tool has an explicit action description
  if (toolActions[toolId]) {
    primarySentence = toolActions[toolId] + '.';
  } else {
    // Fallback parsing based on common pattern names
    if (toolId.includes('-to-')) {
      const parts = toolId.split('-to-');
      const from = getFormatName(parts[0]);
      const to = getFormatName(parts[1].replace('-guide', ''));
      primarySentence = `Convert ${from} files into ${to} formats instantly.`;
    } else if (toolId.includes('compress')) {
      const label = toolId.replace('-compressor', '').replace('compress-', '');
      const format = getFormatName(label);
      primarySentence = `Reduce the file size and compress ${format} assets while preserving quality.`;
    } else if (toolId.includes('generator') || toolId.includes('maker')) {
      primarySentence = `Generate customized ${toolName.toLowerCase()} assets using local browser configurations.`;
    } else if (toolId.includes('scanner') || toolId.includes('picker') || toolId.includes('detector')) {
      primarySentence = `Analyze and extract information from your files using the local ${toolName.toLowerCase()} script.`;
    } else {
      // General fallback based on category
      if (categoryId === 'image') {
        primarySentence = `Process, optimize, and analyze ${toolName.toLowerCase()} parameters in your browser.`;
      } else if (categoryId === 'pdf') {
        primarySentence = `Manage, edit, and adjust ${toolName.toLowerCase()} files locally without downloads.`;
      } else if (categoryId === 'calculators') {
        primarySentence = `Evaluate numerical equations and verify results with the online ${toolName.toLowerCase()}.`;
      } else if (categoryId === 'convert') {
        primarySentence = `Convert measurements and calculate units with the ${toolName.toLowerCase()} module.`;
      } else {
        primarySentence = `Free online ${toolName.toLowerCase()} utility to help format and inspect parameters.`;
      }
    }
  }

  // 2. Select secondary and tertiary sentences based on type
  if (type === 'description') {
    // Brief, actionable description (max 2 sentences, ideal for cards and grids)
    const secondary = processVerbs[verbIdx];
    return `${primarySentence} ${secondary}`;
  } else {
    // Riper SEO description (ideal for page metadata)
    const secondary = safetyGuarantees[safetyIdx];
    const tertiary = userBenefits[benefitIdx];
    return `${primarySentence} ${secondary} ${tertiary}`;
  }
}
