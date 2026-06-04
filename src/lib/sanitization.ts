/**
 * Utility helper methods for sanitizing inputs and preventing XSS.
 */

/**
 * Escapes special HTML characters to prevent raw HTML rendering.
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes a file name to prevent path traversal and strip illegal characters.
 */
export function sanitizeFileName(name: string): string {
  if (!name) return 'file';
  // Extract base filename only
  const base = name.replace(/^.*[\\\/]/, '');
  // Keep alphanumeric, dots, dashes, and underscores
  let clean = base.replace(/[^a-zA-Z0-9._-]/g, '_');
  // Strip multiple consecutive underscores
  clean = clean.replace(/_+/g, '_');
  return clean || 'file';
}

/**
 * Validates and sanitizes a URL, blocking javascript: and data: schemes.
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  
  if (lower.startsWith('javascript:') || lower.startsWith('data:')) {
    return 'about:blank';
  }
  
  try {
    const parsed = new URL(trimmed);
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return parsed.toString();
    }
  } catch {
    // If not a full URL, allow simple relative paths or domain shapes
    if (/^[a-zA-Z0-9_\-\/]+(\.[a-zA-Z0-9_\-\/]+)*$/.test(trimmed)) {
      return trimmed;
    }
  }
  return '';
}

/**
 * Parses and bounds-checks integer inputs (e.g. for dimensions or page numbers).
 */
export function sanitizeNumberInput(val: any, min: number, max: number, defaultValue: number): number {
  const parsed = parseInt(val, 10);
  if (isNaN(parsed)) return defaultValue;
  return Math.min(Math.max(parsed, min), max);
}

/**
 * HTML Sanitizer using DOMParser (browser-safe, handles SSR fallbacks).
 * Recursively removes script tags, style/iframe nodes, and event handler attributes.
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side basic fallback: strip obvious script tags
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const cleanNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        
        // Remove dangerous/unwanted tags completely
        if (['script', 'iframe', 'object', 'embed', 'link', 'style', 'meta', 'base'].includes(tagName)) {
          element.remove();
          return;
        }
        
        // Remove all event handlers (on*) and javascript: protocols in attributes
        const attrs = Array.from(element.attributes);
        for (const attr of attrs) {
          const name = attr.name.toLowerCase();
          if (name.startsWith('on')) {
            element.removeAttribute(attr.name);
          } else if (
            ['src', 'href', 'action'].includes(name) && 
            attr.value.trim().toLowerCase().startsWith('javascript:')
          ) {
            element.removeAttribute(attr.name);
          }
        }
      }
      
      const children = Array.from(node.childNodes);
      for (const child of children) {
        cleanNode(child);
      }
    };
    
    cleanNode(doc.body);
    return doc.body.innerHTML;
  } catch (e) {
    console.error("HTML Sanitization failed, returning cleaned fallback string", e);
    return '';
  }
}
