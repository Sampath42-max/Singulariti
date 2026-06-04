"use client";

import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface TextBoxProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  rows?: number;
  showCounter?: boolean;
  allowFileUpload?: boolean;
}

export function TextBox({
  value,
  onChange,
  placeholder = "Enter or paste your content here...",
  label,
  error,
  rows = 8,
  showCounter = true,
  allowFileUpload = true
}: TextBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStats = () => {
    const chars = value.length;
    const words = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
    const lines = value === "" ? 0 : value.split('\n').length;
    return { chars, words, lines };
  };

  const stats = getStats();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text !== undefined) {
        onChange(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-[13px] font-sans font-semibold text-ink uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">
          {allowFileUpload && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center text-[12px] font-sans font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 mr-1" /> Load File
            </button>
          )}
          {value && (
            <button
              onClick={() => onChange("")}
              className="inline-flex items-center text-[12px] font-sans font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5 mr-1" /> Clear
            </button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt,.json,.xml,.csv,.html,.css,.js,.yaml,.yml,.md"
          className="hidden"
        />
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`w-full p-4 border rounded-xl font-mono text-[14px] bg-background text-ink outline-none transition-all focus:border-primary/80 ${
            error ? 'border-red-500/80 focus:border-red-500' : 'border-border'
          }`}
        />
      </div>

      <div className="flex items-center justify-between min-h-6">
        {error ? (
          <p className="text-[12px] font-sans font-medium text-red-500">{error}</p>
        ) : (
          <div />
        )}
        {showCounter && value && (
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate">
            <span>{stats.lines} Lines</span>
            <span>·</span>
            <span>{stats.words} Words</span>
            <span>·</span>
            <span>{stats.chars} Characters</span>
          </div>
        )}
      </div>
    </div>
  );
}
