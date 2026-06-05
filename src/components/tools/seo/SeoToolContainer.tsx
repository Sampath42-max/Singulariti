"use client";

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../shared/ToolLayout';
import { TextBox } from '../shared/TextBox';
import { ResultBox } from '../shared/ResultBox';
import { Button } from '@/components/ui/Button';

interface SeoToolContainerProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
}

export function SeoToolContainer({ toolId, toolName, toolDescription }: SeoToolContainerProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // Form states for Keyword Density Checker
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordDensityTotalWords, setKeywordDensityTotalWords] = useState(0);

  // Form states for Meta Tag Generator
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [metaPageUrl, setMetaPageUrl] = useState('');
  const [metaImageUrl, setMetaImageUrl] = useState('');
  const [metaSiteName, setMetaSiteName] = useState('');
  const [metaPageType, setMetaPageType] = useState('website');
  const [metaRobotsIndex, setMetaRobotsIndex] = useState('index');
  const [metaRobotsFollow, setMetaRobotsFollow] = useState('follow');
  const [metaLanguage, setMetaLanguage] = useState('English');
  const [metaCharset, setMetaCharset] = useState('UTF-8');

  // Form states for Robots.txt Generator
  const [robotsUserAgent, setRobotsUserAgent] = useState('*');
  const [robotsCrawlDelay, setRobotsCrawlDelay] = useState('none');
  const [robotsSitemapUrl, setRobotsSitemapUrl] = useState('');
  const [robotsDisallowed, setRobotsDisallowed] = useState('/admin\n/cgi-bin\n/temp');

  // Form states for Sitemap Generator
  const [sitemapBaseUrl, setSitemapBaseUrl] = useState('https://example.com');
  const [sitemapPaths, setSitemapPaths] = useState('/\n/about\n/contact\n/blog');
  const [sitemapFreq, setSitemapFreq] = useState('weekly');
  const [sitemapPriority, setSitemapPriority] = useState('0.8');

  // Form states for Open Graph
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogUrl, setOgUrl] = useState('');
  const [ogType, setOgType] = useState('website');
  const [ogImage, setOgImage] = useState('');
  const [ogSiteName, setOgSiteName] = useState('');

  // Form states for Twitter Card
  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterDescription, setTwitterDescription] = useState('');
  const [twitterImage, setTwitterImage] = useState('');
  const [twitterCard, setTwitterCard] = useState('summary_large_image');
  const [twitterSite, setTwitterSite] = useState('');

  // Analysis result states
  const [keywordDensity, setKeywordDensity] = useState<{ word: string; count: number; density: string }[]>([]);
  const [seoWordStats, setSeoWordStats] = useState<{
    words: number;
    chars: number;
    paragraphs: number;
    sentences: number;
    readTime: number;
    speakTime: number;
    seoEvaluation: string;
    seoEvaluationColor: string;
  } | null>(null);

  const [headingTree, setHeadingTree] = useState<{ tag: string; text: string; level: number; error?: string }[]>([]);
  const [headingIssues, setHeadingIssues] = useState<string[]>([]);

  // Automatically compute values as user interacts
  useEffect(() => {
    setError('');

    if (toolId === 'meta-title-checker') {
      const length = input.length;
      let evaluation = '';
      if (length === 0) {
        setOutput('');
        return;
      }
      if (length < 30) {
        evaluation = `Length: ${length} characters. Too short. (Recommended: 50-60 characters)`;
      } else if (length > 60) {
        evaluation = `Length: ${length} characters. Too long. Search engines may truncate it. (Recommended: 50-60 characters)`;
      } else {
        evaluation = `Length: ${length} characters. Perfect! (Recommended: 50-60 characters)`;
      }
      setOutput(evaluation);
    } else if (toolId === 'meta-description-checker') {
      const length = input.length;
      let evaluation = '';
      if (length === 0) {
        setOutput('');
        return;
      }
      if (length < 120) {
        evaluation = `Length: ${length} characters. Too short. (Recommended: 150-160 characters)`;
      } else if (length > 160) {
        evaluation = `Length: ${length} characters. Too long. Search engines may truncate it. (Recommended: 150-160 characters)`;
      } else {
        evaluation = `Length: ${length} characters. Perfect! (Recommended: 150-160 characters)`;
      }
      setOutput(evaluation);
    } else if (toolId === 'seo-slug-generator') {
      if (!input) {
        setOutput('');
        return;
      }
      const slug = input
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // remove special characters
        .trim()
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // replace duplicate hyphens
      setOutput(slug);
    } else if (toolId === 'seo-keyword-density') {
      if (!input.trim()) {
        setKeywordDensity([]);
        setOutput('');
        return;
      }
      if (!keywordInput.trim()) {
        setKeywordDensity([]);
        setOutput('');
        setError('Keyword is required to calculate density.');
        return;
      }

      // Count raw words in text (excluding punctuation except inside words, like hyphens)
      const rawWords = input
        .toLowerCase()
        .replace(/[^\w\s-]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
      const rawWordCount = rawWords.length;

      // Clean keyword
      const cleanKeyword = keywordInput.trim().toLowerCase();
      const kwWords = cleanKeyword.split(/\s+/).filter(Boolean);
      const keywordWordCount = kwWords.length;

      if (keywordWordCount === 0 || rawWordCount === 0) {
        setKeywordDensity([]);
        setOutput('');
        return;
      }

      // Construct Regex for matching keyword exactly with word boundaries
      const escapedWords = kwWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const regexStr = '\\b' + escapedWords.join('\\s+') + '\\b';
      let occurrences = 0;
      try {
        const regex = new RegExp(regexStr, 'gi');
        const matches = input.match(regex);
        occurrences = matches ? matches.length : 0;
      } catch (e) {
        occurrences = 0;
      }

      // adjustedTotalWords = rawWordCount - (keywordWordCount - 1) * occurrences
      const adjustedTotalWords = Math.max(1, rawWordCount - (keywordWordCount - 1) * occurrences);
      const densityVal = ((occurrences / adjustedTotalWords) * 100).toFixed(2);
      const densityStr = densityVal + '%';

      setKeywordDensity([{
        word: keywordInput.trim(),
        count: occurrences,
        density: densityStr
      }]);
      setKeywordDensityTotalWords(adjustedTotalWords);

      setOutput(`Keyword: ${keywordInput.trim()}\nOccurrences: ${occurrences}\nTotal words: ${adjustedTotalWords}\nDensity: ${densityStr}`);
    } else if (toolId === 'seo-word-count') {
      if (!input.trim()) {
        setSeoWordStats(null);
        return;
      }
      const words = input.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = input.length;
      const paragraphs = input.split(/\n+/).filter(p => p.trim().length > 0).length;
      const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      const readTime = Math.ceil(words / 200); // 200 wpm
      const speakTime = Math.ceil(words / 130); // 130 wpm

      let evaluation = '';
      let color = '';
      if (words < 300) {
        evaluation = 'Thin content. Below 300 words. Search engines prefer more detailed, informative text for article indexation.';
        color = 'text-red-500 bg-red-500/10 border-red-500/20';
      } else if (words < 600) {
        evaluation = 'Short content. Good for brief announcements or product pages, but might struggle to rank for competitive keywords.';
        color = 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      } else if (words <= 1200) {
        evaluation = 'Standard article depth. Great size for blog posts and standard SEO content. Easy to read and cover key queries.';
        color = 'text-green-500 bg-green-500/10 border-green-500/20';
      } else {
        evaluation = 'Excellent high-depth content! Ideal for pillar pages, ultimate guides, and high-authority search queries.';
        color = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      }

      setSeoWordStats({
        words,
        chars,
        paragraphs,
        sentences,
        readTime,
        speakTime,
        seoEvaluation: evaluation,
        seoEvaluationColor: color
      });
    } else if (toolId === 'heading-structure-checker') {
      if (!input.trim()) {
        setHeadingTree([]);
        setHeadingIssues([]);
        setOutput('');
        return;
      }
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, 'text/html');
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const parsedTree: { tag: string; text: string; level: number; error?: string }[] = [];
        const issues: string[] = [];
        const counts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };

        const headingList = Array.from(headings).map((node, index) => {
          const tag = node.tagName.toLowerCase();
          const level = parseInt(tag.substring(1));
          const text = (node.textContent || '').trim();
          
          if (tag in counts) {
            counts[tag as keyof typeof counts]++;
          }

          return { node, tag, level, text, index };
        });

        // 1. Missing H1
        if (counts.h1 === 0) {
          issues.push('Missing H1 heading: A page should contain exactly one H1 tag defining its primary topic.');
          issues.push('- Suggestion: Add an H1 heading at the beginning of your HTML content.');
        }
        // 2. Multiple H1 tags
        if (counts.h1 > 1) {
          issues.push(`Multiple H1 headings detected (${counts.h1}): Standard SEO recommends a single primary H1 heading per page.`);
          issues.push('- Suggestion: Change subsequent H1 headings to H2 or H3 headings.');
        }
        // 3. First heading is not H1
        if (headingList.length > 0 && headingList[0].level !== 1) {
          issues.push(`First heading is not H1: The heading structure starts with H${headingList[0].level} ("${headingList[0].text || '(Empty Heading)'}").`);
          issues.push(`- Suggestion: Change "${headingList[0].text || 'the first heading'}" to H1 to establish proper hierarchy.`);
        }

        let lastLevel = 0;
        let lastHeadingText = '';
        let correctedLastLevel = 0;
        const correctedHeadings: { text: string; level: number }[] = [];

        headingList.forEach((h, index) => {
          let errMessage = '';
          const tagUpper = h.tag.toUpperCase();

          // 4. Empty heading text
          if (!h.text) {
            issues.push(`Empty heading text: The H${h.level} heading at position ${index + 1} has no text content.`);
            issues.push(`- Suggestion: Add descriptive text inside the empty H${h.level} heading tag.`);
            errMessage = `Empty H${h.level} heading.`;
          }

          // Corrected level logic
          let correctedLevel = h.level;
          if (index === 0) {
            if (h.level > 1) {
              correctedLevel = 1;
            }
          } else {
            // 5. Heading level skipped (jumps deeper by > 1 level, e.g. H2 to H4)
            if (lastLevel > 0 && h.level - lastLevel > 1) {
              errMessage = `Skipped heading level. Jumped from H${lastLevel} directly to H${h.level}.`;
              issues.push(`Heading level skipped: H${lastLevel} to H${h.level}.`);
              
              const parentInfo = lastHeadingText ? ` because it comes under "${lastHeadingText}"` : '';
              issues.push(`"${h.text || '(Empty Heading)'}" should probably be H${lastLevel + 1}${parentInfo}.`);
              
              correctedLevel = correctedLastLevel + 1;
            }
          }

          parsedTree.push({
            tag: tagUpper,
            text: h.text || '(Empty Heading Text)',
            level: h.level,
            error: errMessage
          });

          correctedHeadings.push({
            text: h.text || '(Empty Heading Text)',
            level: correctedLevel
          });

          lastLevel = h.level;
          lastHeadingText = h.text;
          correctedLastLevel = correctedLevel;
        });

        setHeadingTree(parsedTree);
        setHeadingIssues(issues);

        // Build output report text
        let outputReport = '';
        if (issues.length > 0) {
          outputReport += 'SEO Issues Found:\n' + issues.map(iss => `- ${iss}`).join('\n');
        } else {
          outputReport += 'SEO Issues Found:\n- No issues found. Heading structure is correct!';
        }

        outputReport += '\n\nHeading Map:\n';
        headingList.forEach((item, idx) => {
          // Use corrected level to compute indent spaces, but keep original tag
          const correctedLevel = correctedHeadings[idx].level;
          const indent = '  '.repeat(correctedLevel - 1);
          outputReport += `${indent}${item.tag.toUpperCase()} ${item.text || '(Empty Heading Text)'}\n`;
        });

        outputReport += '\nSuggested fixed HTML:\n';
        correctedHeadings.forEach(h => {
          outputReport += `<h${h.level}>${h.text}</h${h.level}>\n`;
        });

        setOutput(outputReport.trim());
      } catch (err: any) {
        setError('Failed to parse pasted HTML. Make sure it is valid HTML markup.');
      }
    }
  }, [input, keywordInput, toolId]);

  // Handler for generating Meta Tags
  const generateMetaTags = () => {
    if (!metaTitle.trim()) {
      setError('Page Title is required.');
      return;
    }
    setError('');

    let tags = '';
    
    // Basic Meta Tags
    tags += `<title>${metaTitle}</title>\n`;
    if (metaDescription) {
      tags += `<meta name="description" content="${metaDescription}">\n`;
    }
    if (metaKeywords) {
      tags += `<meta name="keywords" content="${metaKeywords}">\n`;
    }
    if (metaAuthor) {
      tags += `<meta name="author" content="${metaAuthor}">\n`;
    }
    if (metaPageUrl) {
      tags += `<link rel="canonical" href="${metaPageUrl}">\n`;
    }
    
    tags += `\n`;

    // Open Graph Tags
    tags += `<meta property="og:title" content="${metaTitle}">\n`;
    if (metaDescription) {
      tags += `<meta property="og:description" content="${metaDescription}">\n`;
    }
    if (metaPageUrl) {
      tags += `<meta property="og:url" content="${metaPageUrl}">\n`;
    }
    if (metaImageUrl) {
      tags += `<meta property="og:image" content="${metaImageUrl}">\n`;
    }
    if (metaSiteName) {
      tags += `<meta property="og:site_name" content="${metaSiteName}">\n`;
    }
    if (metaPageType) {
      tags += `<meta property="og:type" content="${metaPageType}">\n`;
    }
    
    tags += `\n`;

    // Twitter Card Tags
    tags += `<meta name="twitter:card" content="summary_large_image">\n`;
    tags += `<meta name="twitter:title" content="${metaTitle}">\n`;
    if (metaDescription) {
      tags += `<meta name="twitter:description" content="${metaDescription}">\n`;
    }
    if (metaImageUrl) {
      tags += `<meta name="twitter:image" content="${metaImageUrl}">\n`;
    }

    setOutput(tags.trim());
  };

  const clearMetaTagsForm = () => {
    setMetaTitle('');
    setMetaDescription('');
    setMetaKeywords('');
    setMetaAuthor('');
    setMetaPageUrl('');
    setMetaImageUrl('');
    setMetaSiteName('');
    setMetaPageType('website');
    setOutput('');
    setError('');
  };

  // Handler for generating Robots.txt
  const generateRobotsTxt = () => {
    let content = `User-agent: ${robotsUserAgent}\n`;
    if (robotsCrawlDelay !== 'none') {
      content += `Crawl-delay: ${robotsCrawlDelay}\n`;
    }
    const disallowedList = robotsDisallowed.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    disallowedList.forEach(path => {
      content += `Disallow: ${path}\n`;
    });

    if (robotsSitemapUrl) {
      content += `Sitemap: ${robotsSitemapUrl}\n`;
    }
    setOutput(content);
  };

  // Handler for generating Sitemap
  const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const paths = sitemapPaths.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    const dateStr = new Date().toISOString().split('T')[0];

    paths.forEach(p => {
      // Ensure slash structure
      const relative = p.startsWith('/') ? p : '/' + p;
      const fullUrl = sitemapBaseUrl.replace(/\/$/, '') + relative;
      xml += `  <url>\n`;
      xml += `    <loc>${fullUrl}</loc>\n`;
      xml += `    <lastmod>${dateStr}</lastmod>\n`;
      xml += `    <changefreq>${sitemapFreq}</changefreq>\n`;
      xml += `    <priority>${sitemapPriority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    setOutput(xml);
  };

  // Handler for generating Open Graph tags
  const generateOgTags = () => {
    let og = `<!-- Open Graph / Facebook -->\n`;
    og += `<meta property="og:type" content="${ogType}">\n`;
    if (ogUrl) og += `<meta property="og:url" content="${ogUrl}">\n`;
    if (ogTitle) og += `<meta property="og:title" content="${ogTitle}">\n`;
    if (ogDescription) og += `<meta property="og:description" content="${ogDescription}">\n`;
    if (ogImage) og += `<meta property="og:image" content="${ogImage}">\n`;
    if (ogSiteName) og += `<meta property="og:site_name" content="${ogSiteName}">\n`;
    setOutput(og);
  };

  // Handler for generating Twitter cards tags
  const generateTwitterTags = () => {
    let tw = `<!-- Twitter Card -->\n`;
    tw += `<meta name="twitter:card" content="${twitterCard}">\n`;
    if (twitterSite) tw += `<meta name="twitter:site" content="${twitterSite}">\n`;
    if (twitterTitle) tw += `<meta name="twitter:title" content="${twitterTitle}">\n`;
    if (twitterDescription) tw += `<meta name="twitter:description" content="${twitterDescription}">\n`;
    if (twitterImage) tw += `<meta name="twitter:image" content="${twitterImage}">\n`;
    setOutput(tw);
  };

  // Form rendering helpers
  const renderGeneratorForm = () => {
    switch (toolId) {
      case 'meta-tag-generator':
        return (
          <div className="space-y-4 p-5 bg-background border border-border rounded-xl">
            <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider mb-2">Meta Tag Configuration</h3>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-sans">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Page Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Free Developer Tools"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Author</label>
                <input
                  type="text"
                  value={metaAuthor}
                  onChange={(e) => setMetaAuthor(e.target.value)}
                  placeholder="e.g. Sampath Kumar"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Page Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="e.g. Format JSON, validate XML, encode Base64, decode URLs, test regex, format SQL, and beautify code."
                  rows={2}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80 resize-none"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Keywords</label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="e.g. developer tools, json formatter, sql formatter, base64 encoder"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Page URL</label>
                <input
                  type="text"
                  value={metaPageUrl}
                  onChange={(e) => setMetaPageUrl(e.target.value)}
                  placeholder="e.g. https://example.com/developer-tools"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Image URL</label>
                <input
                  type="text"
                  value={metaImageUrl}
                  onChange={(e) => setMetaImageUrl(e.target.value)}
                  placeholder="e.g. https://example.com/images/developer-tools-og.png"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Site Name</label>
                <input
                  type="text"
                  value={metaSiteName}
                  onChange={(e) => setMetaSiteName(e.target.value)}
                  placeholder="e.g. Example Tools"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Page Type</label>
                <input
                  type="text"
                  value={metaPageType}
                  onChange={(e) => setMetaPageType(e.target.value)}
                  placeholder="e.g. website"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={clearMetaTagsForm}>Clear Form</Button>
              <Button variant="primary" onClick={generateMetaTags}>Generate Meta Tags</Button>
            </div>
          </div>
        );
      case 'robots-txt-generator':
        return (
          <div className="space-y-4 p-5 bg-background border border-border rounded-xl">
            <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider mb-2">Robots.txt Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">User Agent</label>
                <input
                  type="text"
                  value={robotsUserAgent}
                  onChange={(e) => setRobotsUserAgent(e.target.value)}
                  placeholder="e.g. *"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Crawl Delay</label>
                <select
                  value={robotsCrawlDelay}
                  onChange={(e) => setRobotsCrawlDelay(e.target.value)}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none"
                >
                  <option value="none">No Delay</option>
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Sitemap XML URL (Optional)</label>
                <input
                  type="text"
                  value={robotsSitemapUrl}
                  onChange={(e) => setRobotsSitemapUrl(e.target.value)}
                  placeholder="e.g. https://example.com/sitemap.xml"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Disallowed Directory Paths (one per line)</label>
                <textarea
                  value={robotsDisallowed}
                  onChange={(e) => setRobotsDisallowed(e.target.value)}
                  placeholder="e.g. /admin"
                  rows={3}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink font-mono text-sm outline-none focus:border-primary/80"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={generateRobotsTxt}>Generate Robots.txt</Button>
            </div>
          </div>
        );
      case 'sitemap-xml-generator':
        return (
          <div className="space-y-4 p-5 bg-background border border-border rounded-xl">
            <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider mb-2">Sitemap XML Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Website Base URL</label>
                <input
                  type="text"
                  value={sitemapBaseUrl}
                  onChange={(e) => setSitemapBaseUrl(e.target.value)}
                  placeholder="e.g. https://example.com"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Change Frequency</label>
                <select
                  value={sitemapFreq}
                  onChange={(e) => setSitemapFreq(e.target.value)}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none"
                >
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Default Priority</label>
                <select
                  value={sitemapPriority}
                  onChange={(e) => setSitemapPriority(e.target.value)}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none"
                >
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.8">0.8</option>
                  <option value="0.5">0.5 (Average)</option>
                  <option value="0.3">0.3</option>
                  <option value="0.1">0.1 (Lowest)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Relative URLs to Include (one per line)</label>
                <textarea
                  value={sitemapPaths}
                  onChange={(e) => setSitemapPaths(e.target.value)}
                  placeholder="e.g. /"
                  rows={4}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink font-mono text-sm outline-none focus:border-primary/80"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={generateSitemap}>Generate XML Sitemap</Button>
            </div>
          </div>
        );
      case 'open-graph-generator':
        return (
          <div className="space-y-4 p-5 bg-background border border-border rounded-xl">
            <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider mb-2">Open Graph Tag Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Page Title</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="e.g. Home - My Website"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Site Name</label>
                <input
                  type="text"
                  value={ogSiteName}
                  onChange={(e) => setOgSiteName(e.target.value)}
                  placeholder="e.g. Singulariti"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Page Description</label>
                <textarea
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="e.g. Short summary description about the content."
                  rows={2}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80 resize-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Page URL</label>
                <input
                  type="text"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  placeholder="e.g. https://example.com/page"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Object Type</label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="book">Book</option>
                  <option value="profile">Profile</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Image Banner URL (Absolute Path)</label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="e.g. https://example.com/assets/og-image.jpg"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={generateOgTags}>Generate OG Tags</Button>
            </div>
          </div>
        );
      case 'twitter-card-generator':
        return (
          <div className="space-y-4 p-5 bg-background border border-border rounded-xl">
            <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider mb-2">Twitter Card Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Card Title</label>
                <input
                  type="text"
                  value={twitterTitle}
                  onChange={(e) => setTwitterTitle(e.target.value)}
                  placeholder="e.g. Home - My Website"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Twitter Handle (username with @)</label>
                <input
                  type="text"
                  value={twitterSite}
                  onChange={(e) => setTwitterSite(e.target.value)}
                  placeholder="e.g. @singulariti"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Card Description</label>
                <textarea
                  value={twitterDescription}
                  onChange={(e) => setTwitterDescription(e.target.value)}
                  placeholder="e.g. Short summary description about the content."
                  rows={2}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80 resize-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-sans font-bold text-slate">Card Template Type</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none"
                >
                  <option value="summary_large_image">Summary Card with Large Image</option>
                  <option value="summary">Summary Card (Standard)</option>
                  <option value="app">Application Card</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[12px] font-sans font-bold text-slate">Banner Image URL</label>
                <input
                  type="text"
                  value={twitterImage}
                  onChange={(e) => setTwitterImage(e.target.value)}
                  placeholder="e.g. https://example.com/assets/og-image.jpg"
                  className="p-2.5 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={generateTwitterTags}>Generate Twitter Card</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isFormBasedTool = [
    'meta-tag-generator',
    'robots-txt-generator',
    'sitemap-xml-generator',
    'open-graph-generator',
    'twitter-card-generator'
  ].includes(toolId);

  return (
    <ToolLayout
      utilityId={toolId}
      title={toolName}
      description={toolDescription}
      categoryName="SEO Tools"
      categoryPath="/tools/seo"
      howToUse={[
        "Fill out target configuration values or paste HTML/Text context.",
        "View keyword counts, formatting evaluations, or generated codes in real-time.",
        "Use copy options to transfer output tags, sitemaps, or clean slug text directly."
      ]}
      faqs={[
        { question: "Do you transmit data to outer servers?", answer: "No. Everything (including keyword calculations, DOM heading hierarchies, and tags compilation) is computed directly in the local browser." },
        { question: "Why is meta tag verification important?", answer: "Google truncates titles past 60 characters and descriptions past 160 characters. Verifying optimal SEO lengths keeps pages looking crisp in SERPs." }
      ]}
    >
      <div className="space-y-6">
        {/* If Form-based, render form then output */}
        {isFormBasedTool && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {renderGeneratorForm()}
            <ResultBox value={output} downloadFileName={`${toolId}.txt`} label="Generated XML / HTML Tags" rows={18} />
          </div>
        )}

        {/* If Text-based, render text inputs and evaluations */}
        {!isFormBasedTool && (
          <div className="space-y-6">
            <TextBox
              value={input}
              onChange={setInput}
              label={
                toolId === 'heading-structure-checker'
                  ? 'Pasted HTML Source Code'
                  : 'Source Text for SEO Analysis'
              }
              error={error}
              placeholder={
                toolId === 'heading-structure-checker'
                  ? 'Paste raw page HTML here...'
                  : 'Paste your blog content or document description text here...'
              }
            />

            {/* Keyword Density Checker: Target Keyword Input */}
            {toolId === 'seo-keyword-density' && (
              <div className="flex flex-col gap-1.5 p-5 bg-background border border-border rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-sans font-bold text-ink uppercase tracking-wider">Target Keyword</label>
                  {keywordInput && (
                    <button
                      onClick={() => setKeywordInput('')}
                      className="text-[12px] font-sans font-medium text-red-500 hover:text-red-600 transition-colors"
                    >
                      Clear Keyword
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Enter keyword or phrase separately..."
                  className="w-full p-3 border border-border rounded-lg bg-surface text-ink text-sm outline-none focus:border-primary/80"
                />
              </div>
            )}

            {/* Clear All Button for Keyword Density and Heading Checker */}
            {toolId === 'seo-keyword-density' && (input || keywordInput) && (
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => { setInput(''); setKeywordInput(''); setOutput(''); setError(''); setKeywordDensity([]); }}>
                  Clear All Fields
                </Button>
              </div>
            )}

            {toolId === 'heading-structure-checker' && input && (
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => { setInput(''); setOutput(''); setError(''); setHeadingTree([]); setHeadingIssues([]); }}>
                  Clear Content
                </Button>
              </div>
            )}

            {/* Title & Description Evaluators */}
            {(toolId === 'meta-title-checker' || toolId === 'meta-description-checker') && output && (
              <div className="p-5 border border-border bg-background rounded-xl flex flex-col justify-center gap-1.5">
                <span className="text-[12px] font-sans font-bold text-slate uppercase tracking-wider">SEO Evaluation</span>
                <p className="font-mono text-[15px] font-semibold text-primary">{output}</p>
                {/* Visual bar */}
                <div className="w-full bg-border h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      input.length >= (toolId === 'meta-title-checker' ? 50 : 120) &&
                      input.length <= (toolId === 'meta-title-checker' ? 60 : 160)
                        ? 'bg-emerald-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (input.length / (toolId === 'meta-title-checker' ? 60 : 160)) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Keyword Density Results */}
            {toolId === 'seo-keyword-density' && output && keywordDensity.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-4 p-5 border border-border bg-background rounded-xl">
                  <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider mb-2">Keyword Density Analysis</h3>
                  <div className="space-y-3 font-sans text-sm text-slate">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="font-semibold text-ink">Keyword:</span>
                      <span className="font-mono text-primary font-bold">{keywordDensity[0]?.word}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="font-semibold text-ink">Occurrences:</span>
                      <span className="font-mono text-primary font-bold">{keywordDensity[0]?.count}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="font-semibold text-ink">Total words:</span>
                      <span className="font-mono text-primary font-bold">{keywordDensityTotalWords}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-semibold text-ink">Density:</span>
                      <span className="font-mono text-primary font-bold">{keywordDensity[0]?.density}</span>
                    </div>
                  </div>
                </div>
                <ResultBox value={output} downloadFileName="keyword-density-report.txt" label="Density Output Report" rows={10} />
              </div>
            )}

            {/* SEO Word Stats */}
            {toolId === 'seo-word-count' && seoWordStats && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Words', val: seoWordStats.words },
                    { label: 'Characters', val: seoWordStats.chars },
                    { label: 'Sentences', val: seoWordStats.sentences },
                    { label: 'Paragraphs', val: seoWordStats.paragraphs }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 border border-border bg-background rounded-xl text-center">
                      <span className="text-[11px] font-sans font-bold text-slate uppercase tracking-wider">{stat.label}</span>
                      <p className="text-2xl font-mono font-bold text-primary mt-1">{stat.val}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-border bg-background rounded-xl">
                    <span className="text-[11px] font-sans font-bold text-slate uppercase tracking-wider">Reading Time</span>
                    <p className="text-[15px] font-sans text-ink mt-1 font-semibold">
                      ~ <span className="font-mono text-primary text-lg">{seoWordStats.readTime}</span> minutes
                    </p>
                  </div>
                  <div className="p-4 border border-border bg-background rounded-xl">
                    <span className="text-[11px] font-sans font-bold text-slate uppercase tracking-wider">Speaking Time</span>
                    <p className="text-[15px] font-sans text-ink mt-1 font-semibold">
                      ~ <span className="font-mono text-primary text-lg">{seoWordStats.speakTime}</span> minutes
                    </p>
                  </div>
                </div>
                <div className={`p-4 border rounded-xl font-sans text-sm ${seoWordStats.seoEvaluationColor}`}>
                  <span className="font-bold uppercase tracking-wider text-[11px] block mb-1">SEO Readability Recommendation</span>
                  {seoWordStats.seoEvaluation}
                </div>
              </div>
            )}

            {/* Headings Structure Tree & Output */}
            {toolId === 'heading-structure-checker' && output && headingTree.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-5">
                  {headingIssues.length > 0 && (
                    <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl font-sans text-sm space-y-2">
                      <span className="font-bold uppercase tracking-wider text-[11px] block">SEO Issues Found</span>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs">
                        {headingIssues.map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {headingIssues.length === 0 && (
                    <div className="p-4 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 rounded-xl font-sans text-sm">
                      <span className="font-bold uppercase tracking-wider text-[11px] block">Heading Check Passed</span>
                      No heading hierarchy or syntax issues detected. Structure is ideal for indexing.
                    </div>
                  )}
                  <div className="p-5 border border-border bg-background rounded-xl space-y-4">
                    <h3 className="text-sm font-sans font-bold text-ink uppercase tracking-wider">Heading Hierarchy Map</h3>
                    <div className="space-y-2.5 font-mono text-[13px] border-l-2 border-border/80 pl-3 ml-2">
                      {headingTree.map((item, idx) => {
                        const paddingMap = [0, 0, 4, 8, 12, 16, 20];
                        const indent = paddingMap[item.level] || 0;
                        return (
                          <div
                            key={idx}
                            style={{ paddingLeft: `${indent * 4}px` }}
                            className="flex flex-col gap-1 py-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white ${
                                item.level === 1 ? 'bg-primary' : 'bg-slate/75'
                              }`}>
                                {item.tag}
                              </span>
                              <span className="text-ink font-sans">{item.text}</span>
                            </div>
                            {item.error && (
                              <span className="text-[11px] text-red-500 font-sans block mt-0.5">
                                ⚠️ {item.error}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <ResultBox value={output} downloadFileName="heading-structure-report.txt" label="Diagnostic Output & Suggestions" rows={18} />
              </div>
            )}

            {/* Standard Outputs */}
            {toolId === 'seo-slug-generator' && (
              <ResultBox value={output} downloadFileName="clean-slug.txt" label="URL Slug Result" />
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
