"use client";

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../shared/ToolLayout';
import { TextBox } from '../shared/TextBox';
import { ResultBox } from '../shared/ResultBox';
import { Button } from '@/components/ui/Button';
import js_beautify from 'js-beautify';
import { format as formatSql } from 'sql-formatter';
import { sanitizeHtml } from '@/lib/sanitization';

interface DevToolContainerProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
}

// Color conversion helpers
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitized = hex.trim().replace('#', '');
  if (sanitized.length !== 3 && sanitized.length !== 6) return null;
  const r = parseInt(sanitized.length === 3 ? sanitized[0] + sanitized[0] : sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.length === 3 ? sanitized[1] + sanitized[1] : sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.length === 3 ? sanitized[2] + sanitized[2] : sanitized.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function DevToolContainer({ toolId, toolName, toolDescription }: DevToolContainerProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  
  // Custom states for specific tools
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z]+');
  const [regexFlags, setRegexFlags] = useState('g');
  const [hashType, setHashType] = useState('SHA-256');
  const [unixTime, setUnixTime] = useState<number>(0);
  
  // Color Picker states
  const [colorInput, setColorInput] = useState('#0f766e');
  const [colorRgb, setColorRgb] = useState('rgb(15, 118, 110)');
  const [colorHsl, setColorHsl] = useState('hsl(175, 77%, 26%)');
  const [colorError, setColorError] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Code Beautifier language selection
  const [beautifyLanguage, setBeautifyLanguage] = useState<'js' | 'html' | 'css'>('js');

  // UUID states
  const [uuidResult, setUuidResult] = useState('');
  const [copiedUuid, setCopiedUuid] = useState(false);
  
  // Live Unix clock interval
  useEffect(() => {
    if (toolId !== 'unix-time-converter') return;
    setUnixTime(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      setUnixTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [toolId]);

  // Auto-run logic for immediate formatters/converters
  useEffect(() => {
    setError('');
    
    if (!input && !['uuid-generator', 'unix-time-converter', 'color-picker-tool'].includes(toolId)) {
      setOutput('');
      return;
    }

    try {
      switch (toolId) {
        case 'json-formatter': {
          const parsed = JSON.parse(input);
          setOutput(JSON.stringify(parsed, null, 2));
          break;
        }
        case 'json-validator': {
          JSON.parse(input);
          setOutput("JSON is Valid.");
          break;
        }
        case 'base64-encoder-decoder': {
          try {
            if (/^[a-zA-Z0-9+/]*={0,2}$/.test(input.trim()) && input.length % 4 === 0) {
              setOutput(decodeURIComponent(escape(atob(input.trim()))));
            } else {
              setOutput(btoa(unescape(encodeURIComponent(input))));
            }
          } catch {
            setOutput(btoa(unescape(encodeURIComponent(input))));
          }
          break;
        }
        case 'url-encoder-decoder': {
          if (input.includes('%')) {
            setOutput(decodeURIComponent(input));
          } else {
            setOutput(encodeURIComponent(input));
          }
          break;
        }
        case 'jwt-decoder': {
          const parts = input.split('.');
          if (parts.length < 2) {
            throw new Error("Invalid JWT token format (must contain at least Header and Payload segments separated by dots).");
          }
          const base64UrlDecode = (str: string) => {
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
              base64 += '=';
            }
            return decodeURIComponent(escape(atob(base64)));
          };
          const header = JSON.parse(base64UrlDecode(parts[0]));
          const payload = JSON.parse(base64UrlDecode(parts[1]));
          setOutput(`// HEADER:\n${JSON.stringify(header, null, 2)}\n\n// PAYLOAD:\n${JSON.stringify(payload, null, 2)}`);
          break;
        }
        case 'html-encoder-decoder': {
          if (input.includes('&') && input.includes(';')) {
            const txt = document.createElement("textarea");
            txt.innerHTML = input;
            setOutput(txt.value);
          } else {
            setOutput(input.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`));
          }
          break;
        }
        case 'html-minifier':
          setOutput(input.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim());
          break;
        case 'css-minifier':
          setOutput(input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([\{\}:;,])\s*/g, '$1').trim());
          break;
        case 'js-minifier':
          setOutput(input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/\s+/g, ' ').trim());
          break;
        case 'hex-to-rgb': {
          const hex = input.trim().replace('#', '');
          if (hex.length !== 3 && hex.length !== 6) {
            throw new Error("Invalid HEX color code (must be 3 or 6 hex characters).");
          }
          const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
          const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
          const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
          setOutput(`rgb(${r}, ${g}, ${b})`);
          break;
        }
        case 'rgb-to-hex': {
          const matches = input.match(/\d+/g);
          if (!matches || matches.length < 3) {
            throw new Error("Please enter three comma-separated numbers (e.g. 255, 255, 255).");
          }
          const r = Math.min(255, Math.max(0, parseInt(matches[0])));
          const g = Math.min(255, Math.max(0, parseInt(matches[1])));
          const b = Math.min(255, Math.max(0, parseInt(matches[2])));
          const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
          setOutput(hex.toUpperCase());
          break;
        }
        case 'timestamp-converter': {
          if (/^\d+$/.test(input.trim())) {
            let val = parseInt(input.trim());
            if (input.trim().length === 10) val *= 1000;
            const date = new Date(val);
            setOutput(`GMT: ${date.toUTCString()}\nLocal Time: ${date.toString()}`);
          } else {
            const date = new Date(input.trim());
            if (isNaN(date.getTime())) {
              throw new Error("Invalid date string. Try: '2026-06-04 12:00:00' or UTC format.");
            }
            setOutput(`Seconds: ${Math.floor(date.getTime() / 1000)}\nMilliseconds: ${date.getTime()}`);
          }
          break;
        }
        case 'xml-formatter': {
          let formatted = '';
          let reg = /(>)(<)(\/*)/g;
          let xml = input.replace(reg, '$1\r\n$2$3');
          let pad = 0;
          xml.split('\r\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
              indent = 0;
            } else if (node.match(/^<\/\w/)) {
              if (pad !== 0) pad -= 1;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
              indent = 1;
            }
            formatted += '  '.repeat(pad) + node + '\r\n';
            pad += indent;
          });
          setOutput(formatted.trim());
          break;
        }
        case 'yaml-formatter': {
          let indentLevel = 0;
          const lines = input.split('\n');
          const beauty = lines.map(line => {
            let l = line.trim();
            if (l.startsWith('}') || l.startsWith(']')) indentLevel = Math.max(0, indentLevel - 1);
            const res = '  '.repeat(indentLevel) + l;
            if (l.endsWith('{') || l.endsWith('[') || l.endsWith('(')) indentLevel += 1;
            return res;
          }).join('\n');
          setOutput(beauty);
          break;
        }
        case 'sql-formatter': {
          if (!input.trim()) {
            setOutput('');
            break;
          }
          try {
            const formatted = formatSql(input, {
              language: 'sql',
              tabWidth: 2,
              keywordCase: 'upper'
            });
            setOutput(formatted);
          } catch (err: any) {
            throw new Error('Invalid SQL syntax: ' + (err.message || 'Check your query syntax.'));
          }
          break;
        }
        case 'code-beautifier': {
          if (!input.trim()) {
            setOutput('');
            break;
          }
          try {
            const options = {
              indent_size: 2,
              space_in_empty_paren: true,
              jslint_happy: true,
              end_with_newline: true
            };
            let formatted = '';
            if (beautifyLanguage === 'js') {
              formatted = js_beautify.js(input, options);
            } else if (beautifyLanguage === 'html') {
              formatted = js_beautify.html(input, options);
            } else if (beautifyLanguage === 'css') {
              formatted = js_beautify.css(input, options);
            }
            setOutput(formatted);
          } catch (err: any) {
            throw new Error('Beautification failed: ' + (err.message || 'Verify your code layout.'));
          }
          break;
        }
        case 'markdown-previewer': {
          let html = input
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`(.*)`/gim, '<code>$1</code>')
            .replace(/\n$/gim, '<br />');
          setOutput(html);
          break;
        }
        case 'html-previewer': {
          setOutput(input);
          break;
        }
        default:
          break;
      }
    } catch (err: any) {
      setError(err.message || 'Formatting error. Please check your syntax.');
    }
  }, [input, toolId, beautifyLanguage]);

  // Execute hash generation (uses async Web Crypto)
  const handleHash = async () => {
    setError('');
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(hashType, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
    } catch (err: any) {
      setError('Hash generation failed.');
    }
  };

  const handleRegexTest = () => {
    setError('');
    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = input.match(regex);
      if (matches) {
        setOutput(`Matches Found (${matches.length}):\n${JSON.stringify(matches, null, 2)}`);
      } else {
        setOutput("No matches found.");
      }
    } catch (err: any) {
      setError(err.message || 'Invalid regex pattern.');
    }
  };

  const generateUuid = () => {
    setError('');
    try {
      const uuid = crypto.randomUUID();
      setUuidResult(uuid);
      setCopiedUuid(false);
    } catch (err) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      setUuidResult(uuid);
      setCopiedUuid(false);
    }
  };

  const handleCopyUuid = () => {
    if (!uuidResult) return;
    navigator.clipboard.writeText(uuidResult);
    setCopiedUuid(true);
    setTimeout(() => setCopiedUuid(false), 2000);
  };

  const handleColorChange = (value: string) => {
    setColorInput(value);
    
    let hex = value.trim();
    if (!hex.startsWith('#')) {
      hex = '#' + hex;
    }
    
    const hexReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (!hexReg.test(hex)) {
      setColorError('Invalid HEX color code (must be e.g. #0f766e or #0f7).');
      return;
    }
    
    setColorError('');
    const rgb = hexToRgb(hex);
    if (rgb) {
      const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      
      setColorRgb(rgbStr);
      setColorHsl(hslStr);
    }
  };

  const handleCopyValue = (val: string, type: string) => {
    navigator.clipboard.writeText(val);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <ToolLayout
      utilityId={toolId}
      title={toolName}
      description={toolDescription}
      categoryName="Developer Tools"
      categoryPath="/tools/dev"
      howToUse={["Enter code, text, or parameters into the source input.", "View formatted or computed result instantly in the output section.", "Click Copy Result to save the formatted result."]}
      faqs={[
        { question: "Is my code secure?", answer: "Yes, all formatting, minification, and encodings occur strictly inside your browser. No files or text segments are uploaded." }
      ]}
    >
      <div className="space-y-6">
        {/* Custom Actions */}
        {toolId === 'uuid-generator' && (
          <div className="space-y-6 bg-background border border-border rounded-xl p-6 text-center max-w-xl mx-auto font-sans">
            <div className="space-y-3">
              <span className="text-[12px] uppercase font-bold text-slate tracking-wider block">Generated UUID</span>
              {uuidResult ? (
                <h2 className="text-2xl md:text-3xl font-mono font-bold text-primary break-all p-4 bg-surface rounded-xl border border-border select-all">
                  {uuidResult}
                </h2>
              ) : (
                <div className="p-4 bg-surface rounded-xl border border-border text-slate font-mono">
                  No UUID generated yet.
                </div>
              )}
            </div>
            
            <div className="flex justify-center gap-3">
              {uuidResult && (
                <Button variant="outline" onClick={handleCopyUuid}>
                  {copiedUuid ? 'Copied!' : 'Copy UUID'}
                </Button>
              )}
              <Button variant="primary" onClick={generateUuid}>
                {uuidResult ? 'Generate Another' : 'Generate UUID'}
              </Button>
            </div>
          </div>
        )}

        {toolId === 'unix-time-converter' && (
          <div className="p-5 bg-background border border-border rounded-xl text-center space-y-3">
            <p className="text-[12px] uppercase font-sans font-bold text-slate tracking-wider">Current Unix Epoch Time</p>
            <h2 className="text-3xl font-mono font-bold text-primary">{unixTime}</h2>
            <p className="text-sm font-sans text-slate">Updates live every second. Copy the value below.</p>
            <div className="flex justify-center gap-3">
              <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(unixTime.toString())}>Copy Timestamp</Button>
            </div>
          </div>
        )}

        {toolId === 'hash-generator' && (
          <div className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-sans font-bold text-ink">Algorithm:</label>
              <select 
                value={hashType} 
                onChange={(e) => setHashType(e.target.value)}
                className="p-2 border border-border rounded bg-surface text-ink text-sm outline-none w-36"
              >
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-512">SHA-512</option>
                <option value="SHA-1">SHA-1</option>
              </select>
            </div>
            <Button variant="primary" onClick={handleHash} className="mt-5">Generate Hash</Button>
          </div>
        )}

        {toolId === 'regex-tester' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background border border-border rounded-xl">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-sans font-bold text-ink">Regex Pattern:</label>
              <input 
                type="text" 
                value={regexPattern} 
                onChange={(e) => setRegexPattern(e.target.value)} 
                placeholder="[a-zA-Z]+" 
                className="p-2 border border-border rounded bg-surface text-ink text-sm outline-none" 
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-sans font-bold text-ink">Flags:</label>
              <input 
                type="text" 
                value={regexFlags} 
                onChange={(e) => setRegexFlags(e.target.value)} 
                placeholder="g" 
                className="p-2 border border-border rounded bg-surface text-ink text-sm outline-none" 
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button variant="primary" onClick={handleRegexTest}>Test Pattern</Button>
            </div>
          </div>
        )}

        {toolId === 'code-beautifier' && (
          <div className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl font-sans">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-ink">Language:</label>
              <select 
                value={beautifyLanguage} 
                onChange={(e) => setBeautifyLanguage(e.target.value as any)}
                className="p-2 border border-border rounded bg-surface text-ink text-sm outline-none w-36"
              >
                <option value="js">JavaScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>
          </div>
        )}

        {/* Color Picker Custom UI */}
        {toolId === 'color-picker-tool' && (
          <div className="space-y-6 bg-background border border-border rounded-xl p-6 font-sans">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Color Block Preview */}
              <div 
                className="w-24 h-24 rounded-2xl border border-border shadow-inner shrink-0 transition-colors" 
                style={{ backgroundColor: colorError ? '#ccc' : colorInput }} 
              />
              
              {/* Pickers and Inputs */}
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-ink">Choose Color:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={colorError ? '#000000' : (colorInput.startsWith('#') ? colorInput : '#' + colorInput)}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-10 h-10 rounded border border-border cursor-pointer p-0 bg-transparent"
                      />
                      <span className="text-xs text-slate">Click to pick</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-ink">Hex Code Input:</label>
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => handleColorChange(e.target.value)}
                      placeholder="#0f766e"
                      className={`p-2 border rounded bg-surface text-ink font-mono text-sm outline-none w-full ${
                        colorError ? 'border-red-500/80 focus:border-red-500' : 'border-border'
                      }`}
                    />
                  </div>
                </div>
                {colorError && (
                  <p className="text-xs text-red-500 font-medium">{colorError}</p>
                )}
              </div>
            </div>

            {/* Results Grid with Copy Buttons */}
            {!colorError && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="flex flex-col gap-1.5 p-3.5 bg-surface border border-border rounded-lg relative">
                  <span className="text-[11px] font-bold text-slate uppercase tracking-wider">HEX Code</span>
                  <div className="flex justify-between items-center mt-1">
                    <code className="text-[14px] font-mono font-bold text-primary">{colorInput}</code>
                    <button
                      onClick={() => handleCopyValue(colorInput, 'hex')}
                      className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                    >
                      {copiedType === 'hex' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 p-3.5 bg-surface border border-border rounded-lg relative">
                  <span className="text-[11px] font-bold text-slate uppercase tracking-wider">RGB Format</span>
                  <div className="flex justify-between items-center mt-1">
                    <code className="text-[14px] font-mono font-bold text-primary">{colorRgb}</code>
                    <button
                      onClick={() => handleCopyValue(colorRgb, 'rgb')}
                      className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                    >
                      {copiedType === 'rgb' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 p-3.5 bg-surface border border-border rounded-lg relative">
                  <span className="text-[11px] font-bold text-slate uppercase tracking-wider">HSL Format</span>
                  <div className="flex justify-between items-center mt-1">
                    <code className="text-[14px] font-mono font-bold text-primary">{colorHsl}</code>
                    <button
                      onClick={() => handleCopyValue(colorHsl, 'hsl')}
                      className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                    >
                      {copiedType === 'hsl' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input & Output */}
        {toolId !== 'uuid-generator' && toolId !== 'unix-time-converter' && toolId !== 'color-picker-tool' && (
          <div className="grid grid-cols-1 gap-6">
            <TextBox 
              value={input} 
              onChange={setInput} 
              label="Source Input" 
              error={error} 
              placeholder={
                toolId === 'jwt-decoder' 
                  ? 'Paste encoded JWT token here...' 
                  : toolId === 'html-previewer' 
                  ? 'Paste raw HTML and styles here...' 
                  : 'Paste raw content here...'
              }
            />
            {toolId === 'html-previewer' && output && (
              <div className="space-y-2">
                <label className="text-[13px] font-sans font-semibold text-ink uppercase tracking-wider">Live Preview</label>
                <iframe 
                  srcDoc={output}
                  title="HTML Previewer Frame" 
                  className="w-full min-h-[400px] border border-border bg-white rounded-xl"
                  sandbox=""
                />
              </div>
            )}
            {toolId === 'markdown-previewer' && output && (
              <div className="space-y-2">
                <label className="text-[13px] font-sans font-semibold text-ink uppercase tracking-wider">Markdown Output Preview</label>
                <div 
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(output) }}
                  className="w-full p-4 border border-border bg-surface rounded-xl prose max-w-none text-ink font-sans"
                />
              </div>
            )}
            {toolId !== 'html-previewer' && (
              <ResultBox value={output} downloadFileName={`${toolId}-result.txt`} />
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
