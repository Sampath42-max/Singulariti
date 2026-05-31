"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Download, Loader2, ArrowRight, Settings2, Image as ImageIcon, EyeOff, Eye } from 'lucide-react';
import { useCompression } from '../../hooks/useCompression';
import { useConversion } from '../../hooks/useConversion';
import { ToolRegistryItem } from '../../registry/types';
import { Button } from '../ui/Button';

interface ToolEngineProps {
  tool: ToolRegistryItem;
}

export function ToolEngine({ tool }: ToolEngineProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<{ url: string; originalSize: number; newSize: number; type?: string } | null>(null);
  
  // Advanced UI State
  const [mode, setMode] = useState<'default' | 'custom'>('default');
  const [compressionLevel, setCompressionLevel] = useState<number>(70); // 70% compression = 30% quality
  const [showPreview, setShowPreview] = useState(true);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);

  const { compress, isProcessing: isCompressing, error: compressError } = useCompression();
  const { convert, isProcessing: isConverting, error: convertError } = useConversion();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProcessing = isCompressing || isConverting;
  const error = compressError || convertError;

  // Store URLs in a ref to properly clean them up on unmount without breaking Strict Mode
  const urlsRef = useRef<{ original: string | null; result: string | null }>({ original: null, result: null });

  useEffect(() => {
    return () => {
      if (urlsRef.current.original) URL.revokeObjectURL(urlsRef.current.original);
      if (urlsRef.current.result) URL.revokeObjectURL(urlsRef.current.result);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const executeProcessing = async (selectedFile: File, compLevel: number = 70) => {
    setResult(null);
    try {
      if (tool.engine === 'compression') {
        // Convert compression level (1-100) to quality (1-100) where higher compression = lower quality
        const quality = Math.max(1, 100 - compLevel);
        const res = await compress(selectedFile, quality / 100);
        if (urlsRef.current.result) URL.revokeObjectURL(urlsRef.current.result);
        urlsRef.current.result = res.url;
        setResult({ url: res.url, originalSize: res.originalSize, newSize: res.compressedSize, type: res.blob.type });
      } else if (tool.engine === 'conversion') {
        const toFormat = tool.options?.to || 'image/jpeg';
        const res = await convert(selectedFile, toFormat);
        if (urlsRef.current.result) URL.revokeObjectURL(urlsRef.current.result);
        urlsRef.current.result = res.url;
        setResult({ url: res.url, originalSize: res.originalSize, newSize: res.newSize });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    if (urlsRef.current.original) URL.revokeObjectURL(urlsRef.current.original);
    
    const newOriginalUrl = URL.createObjectURL(selectedFile);
    urlsRef.current.original = newOriginalUrl;
    setOriginalPreviewUrl(newOriginalUrl);
    
    // Initial process
    executeProcessing(selectedFile, compressionLevel);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const applyCompressionPreset = (level: number) => {
    setCompressionLevel(level);
    if (file) executeProcessing(file, level);
  };

  const handleCompressionChange = (val: number) => {
    setCompressionLevel(val);
  };

  const handleCompressionCommit = () => {
    if (file) executeProcessing(file, compressionLevel);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            dragOver ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border bg-surface hover:border-slate'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept="image/*" 
          />
          <div className="w-20 h-20 mx-auto bg-background rounded-full flex items-center justify-center text-primary mb-6">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h3 className="font-display font-bold text-2xl text-ink mb-2">Drop {tool.engine === 'compression' ? 'image' : 'file'} here</h3>
          <p className="text-slate font-sans mb-8">or click to browse your device</p>
          <Button variant="primary" size="lg" className="w-full max-w-xs cursor-pointer">
            Choose File
          </Button>
          <div className="mt-6 flex items-center justify-center gap-4 text-[13px] font-sans text-slate">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Browser-based</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>No upload</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Secure</span>
          </div>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <p className="font-sans text-[13px] text-slate mb-1">Processing file</p>
              <h4 className="font-display font-bold text-lg text-ink truncate max-w-md">{file.name}</h4>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center text-[13px] font-medium text-slate hover:text-ink transition-colors px-3 py-1.5 bg-background rounded-md"
              >
                {showPreview ? <><EyeOff className="w-4 h-4 mr-2"/> Hide Preview</> : <><Eye className="w-4 h-4 mr-2"/> Show Preview</>}
              </button>
              {isProcessing ? (
                <div className="flex items-center text-primary font-medium bg-primary/10 px-4 py-2 rounded-full text-sm">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Working...
                </div>
              ) : error ? (
                <div className="text-red-500 font-medium text-sm">Error</div>
              ) : result && (
                <div className="flex items-center text-green-600 font-medium bg-green-500/10 px-4 py-2 rounded-full text-sm">
                  Ready
                </div>
              )}
            </div>
          </div>

          {/* Tool Settings (Compression only) */}
          {tool.engine === 'compression' && (
            <div className="mb-8 p-6 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Settings2 className="w-5 h-5 text-slate" />
                <h3 className="font-display font-bold text-[15px] text-ink">Compression Settings</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  onClick={() => { setMode('default'); applyCompressionPreset(70); }}
                  className={`px-4 py-2 rounded-md text-[13px] font-medium transition-colors ${mode === 'default' ? 'bg-ink text-surface' : 'bg-surface border border-border text-slate hover:border-slate'}`}
                >
                  Default (Auto)
                </button>
                <button 
                  onClick={() => setMode('custom')}
                  className={`px-4 py-2 rounded-md text-[13px] font-medium transition-colors ${mode === 'custom' ? 'bg-ink text-surface' : 'bg-surface border border-border text-slate hover:border-slate'}`}
                >
                  Custom
                </button>
              </div>

              {mode === 'custom' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => applyCompressionPreset(20)} className="px-3 py-1.5 rounded bg-surface border border-border text-[12px] text-slate hover:border-primary transition-colors">Low Compression</button>
                    <button onClick={() => applyCompressionPreset(50)} className="px-3 py-1.5 rounded bg-surface border border-border text-[12px] text-slate hover:border-primary transition-colors">Medium Compression</button>
                    <button onClick={() => applyCompressionPreset(80)} className="px-3 py-1.5 rounded bg-surface border border-border text-[12px] text-slate hover:border-primary transition-colors">High Compression</button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-slate mb-2 font-medium uppercase tracking-wider">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" max="99" 
                        value={compressionLevel} 
                        onChange={(e) => handleCompressionChange(Number(e.target.value))}
                        onMouseUp={handleCompressionCommit}
                        onTouchEnd={handleCompressionCommit}
                        className="w-full accent-primary"
                      />
                    </div>
                    <div className="w-20 pt-5">
                      <div className="flex items-center border border-border bg-surface rounded-md overflow-hidden">
                        <input 
                          type="number" 
                          min="1" max="99"
                          value={compressionLevel}
                          onChange={(e) => handleCompressionChange(Number(e.target.value))}
                          onBlur={handleCompressionCommit}
                          className="w-full bg-transparent text-center text-[13px] font-mono py-1.5 outline-none"
                        />
                        <span className="text-[12px] text-slate pr-2">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Area */}
          {!isProcessing && result && (
            <div className="space-y-8 mb-8">
              {/* Size Stats */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full bg-background border border-border rounded-lg p-5 text-center flex items-center justify-center gap-4">
                  <div className="text-left">
                    <p className="text-slate text-[12px] font-sans mb-1 uppercase tracking-wider">Original</p>
                    <p className="font-mono text-xl text-ink">{formatSize(result.originalSize)}</p>
                  </div>
                </div>
                <div className="text-slate">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="flex-1 w-full bg-primary/5 border border-primary/20 rounded-lg p-5 text-center flex items-center justify-center gap-4 relative">
                  <div className="text-left">
                    <p className="text-primary text-[12px] font-sans mb-1 uppercase tracking-wider">New Size</p>
                    <p className="font-mono font-bold text-xl text-primary">{formatSize(result.newSize)}</p>
                  </div>
                  {tool.engine === 'compression' && result.newSize <= result.originalSize && (
                    <div className="absolute top-2 right-2 bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded">
                      {result.newSize === result.originalSize ? '0% (Maxed)' : `-${Math.round((1 - result.newSize / result.originalSize) * 100)}%`}
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Preview */}
              {showPreview && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative rounded-lg border border-border bg-background overflow-hidden aspect-video flex items-center justify-center">
                    {originalPreviewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={originalPreviewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                    ) : <ImageIcon className="text-slate/20 w-12 h-12" />}
                    <div className="absolute top-2 left-2 bg-dark/70 backdrop-blur-sm text-surface text-[11px] px-2 py-1 rounded">Original</div>
                  </div>
                  <div className="relative rounded-lg border border-primary/20 bg-primary/5 overflow-hidden aspect-video flex items-center justify-center">
                    {result.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={result.url} alt="Result" className="max-w-full max-h-full object-contain" />
                    ) : <Loader2 className="animate-spin text-primary w-8 h-8" />}
                    <div className="absolute top-2 left-2 bg-primary text-dark font-medium text-[11px] px-2 py-1 rounded">Result</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
            <Button variant="outline" size="lg" onClick={() => {
              setFile(null);
              setResult(null);
            }}>
              Start Over
            </Button>
            {result && (
              <a 
                href={result.url} 
                download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}.${tool.options?.to ? tool.options.to.split('/')[1] : (result.type ? result.type.split('/')[1] : file.name.split('.').pop())}`}
              >
                <Button variant="primary" size="lg" leftIcon={<Download className="w-5 h-5" />}>
                  Download {tool.engine === 'compression' ? 'Compressed' : 'Converted'} Image
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
