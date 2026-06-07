"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { mergePDFs, countPDFPages } from '@/lib/pdf/pdfHelpers';
import { downloadBlob } from '@/lib/downloadHelpers';
import { formatFileSize } from '@/lib/fileHelpers';
import { ArrowUp, ArrowDown, Trash2, Plus, FileText } from 'lucide-react';
import { checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';

export function MergePdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageCounts, setPageCounts] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);

  const handleFilesSelected = async (selectedFiles: File[]) => {
    setError(null);
    setMergedBlobUrl(null);
    
    // Check for validation and password protection
    const validFiles: File[] = [];
    for (const file of selectedFiles) {
      const validation = validatePdfFile(file);
      if (!validation.isValid) {
        setError(validation.error || `Invalid PDF file: ${file.name}`);
        return;
      }
      try {
        const buffer = await file.arrayBuffer();
        const isProtected = await checkPdfPasswordProtected(buffer);
        if (isProtected) {
          setError(`File "${file.name}" is password protected. Password protected files are not supported.`);
          return;
        }
        validFiles.push(file);
      } catch (err) {
        setError(`Failed to parse file "${file.name}". It might be corrupted.`);
        return;
      }
    }

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);

    // Set or clear warning based on the updated queue
    const largeFile = updatedFiles.find(f => f.size > 100 * 1024 * 1024);
    if (largeFile) {
      setWarning(`Large file warning: File "${largeFile.name}" is ${(largeFile.size / (1024 * 1024)).toFixed(1)}MB. Processing files between 100MB and 1GB entirely in the browser is supported, but may cause the page to lag or run out of memory depending on your computer's RAM. Keep other tabs closed for best performance.`);
    } else {
      setWarning(null);
    }

    // Load page counts
    try {
      const { counts } = await countPDFPages(validFiles);
      setPageCounts(prev => {
        const next = { ...prev };
        counts.forEach(c => {
          next[c.fileName] = c.pages;
        });
        return next;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    
    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFiles(updated);
    setMergedBlobUrl(null);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setMergedBlobUrl(null);

    // Set or clear warning based on remaining files in the queue
    const largeFile = updated.find(f => f.size > 100 * 1024 * 1024);
    if (largeFile) {
      setWarning(`Large file warning: File "${largeFile.name}" is ${(largeFile.size / (1024 * 1024)).toFixed(1)}MB. Processing files between 100MB and 1GB entirely in the browser is supported, but may cause the page to lag or run out of memory depending on your computer's RAM. Keep other tabs closed for best performance.`);
    } else {
      setWarning(null);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please upload at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const mergedBytes = await mergePDFs(files);
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while merging PDF files.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPageCounts({});
    setMergedBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Select your file or input your data.",
        "Adjust any specific settings or options as needed.",
        "Click the main action button to process.",
        "Download or copy the result instantly."
      ]}
      faqs={[
        { question: "Is this tool free to use?", answer: "Yes, this tool is completely free with no hidden limits." },
        { question: "Are my files uploaded to a server?", answer: "No, all processing happens locally in your browser ensuring complete privacy and security." }
      ]}
      
      title="Merge PDF"
      description="Combine multiple PDF files into one single PDF document online. Safe, secure, and processed completely inside your browser."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      {files.length === 0 ? (
        <FileUploader
          onFilesSelected={handleFilesSelected}
          multiple={true}
          title="Upload PDF files to merge"
          subtitle="Select two or more PDF documents from your device"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-lg text-ink">Merge Queue</h3>
              <p className="font-sans text-[13px] text-slate mt-0.5">
                {files.length} file{files.length > 1 ? 's' : ''} loaded. Drag or use arrows to rearrange order.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                id="add-more-pdf"
                multiple
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                }}
              />
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => document.getElementById('add-more-pdf')?.click()}
              >
                Add More
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Clear All
              </Button>
            </div>
          </div>

          {/* File Queue List */}
          <div className="space-y-3 mb-8">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg group hover:border-slate transition-colors"
              >
                <div className="p-2 bg-primary/10 text-primary rounded-md">
                  <FileText className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans font-bold text-sm text-ink truncate">{file.name}</h4>
                  <p className="font-sans text-[12px] text-slate mt-0.5">
                    {formatFileSize(file.size)} • {pageCounts[file.name] !== undefined ? `${pageCounts[file.name]} page${pageCounts[file.name] > 1 ? 's' : ''}` : 'Loading...'}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveFile(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded hover:bg-slate/10 text-slate disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-1.5 rounded hover:bg-slate/10 text-slate disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1.5 rounded hover:bg-red-500/10 text-slate hover:text-red-500 transition-colors ml-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Processing Indicator */}
          {isProcessing && <LoadingSpinner text="Merging PDF documents..." />}

          {/* Result Action Area */}
          {mergedBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Merged Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your merged PDF has been compiled successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={mergedBlobUrl} download="singulariti_merged.pdf">
                Download Merged PDF
              </DownloadButton>
            </div>
          )}

          {/* Merge Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
            >
              Merge PDFs
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
