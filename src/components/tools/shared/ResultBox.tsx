"use client";

import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface ResultBoxProps {
  value: string;
  placeholder?: string;
  label?: string;
  rows?: number;
  downloadFileName?: string;
}

export function ResultBox({
  value,
  placeholder = "Your output will appear here...",
  label = "Result Output",
  rows = 8,
  downloadFileName
}: ResultBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFileName || 'singulariti-output.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-sans font-semibold text-ink uppercase tracking-wider">
          {label}
        </label>
        {value && (
          <div className="flex items-center gap-3">
            {downloadFileName && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center text-[12px] font-sans font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 mr-1" /> Download
              </button>
            )}
            <button
              onClick={handleCopy}
              className="inline-flex items-center text-[12px] font-sans font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy Result
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <textarea
          value={value}
          readOnly
          placeholder={placeholder}
          rows={rows}
          className="w-full p-4 border border-border rounded-xl font-mono text-[14px] bg-background/50 text-ink outline-none select-text cursor-default"
        />
      </div>
    </div>
  );
}
