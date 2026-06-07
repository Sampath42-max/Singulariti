"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { countPDFPages } from '@/lib/pdf/pdfHelpers';
import { checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Plus, Hash } from 'lucide-react';

export function PageCounterClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileCounts, setFileCounts] = useState<{ fileName: string; pages: number }[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleFilesSelected = async (selectedFiles: File[]) => {
    setError(null);
    setWarning(null);
    setIsProcessing(true);

    const validFiles: File[] = [];
    for (const file of selectedFiles) {
      const validation = validatePdfFile(file);
      if (!validation.isValid) {
        setError(validation.error || `Invalid PDF file: ${file.name}`);
        setIsProcessing(false);
        return;
      }
      try {
        const buffer = await file.arrayBuffer();
        const isProtected = await checkPdfPasswordProtected(buffer);
        if (isProtected) {
          setError(`File "${file.name}" is password protected. Password protected files are not supported.`);
          setIsProcessing(false);
          return;
        }
        validFiles.push(file);
      } catch (err) {
        setError(`Failed to read file "${file.name}".`);
        setIsProcessing(false);
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

    try {
      const result = await countPDFPages(updatedFiles);
      setFileCounts(result.counts);
      setTotalCount(result.total);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while counting PDF pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setFileCounts([]);
    setTotalCount(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Select one or multiple PDF documents.",
        "The tool will instantly analyze the files and display the page count for each.",
        "View the total combined page count across all uploaded documents."
]}
      faqs={[
        {
                "question": "Do I need to fully upload the PDFs to count them?",
                "answer": "No, the tool reads the file headers locally in your browser to determine the count instantly without full uploads."
        },
        {
                "question": "Is this tool free?",
                "answer": "Yes, completely free and unlimited."
        }
]}
      
      title="PDF Page Counter"
      description="Upload one or multiple PDF documents to count pages and calculate the total count. Safe and processed completely in the browser."
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
          title="Upload PDF files to count pages"
          subtitle="Drag one or multiple PDF documents here"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border mb-6">
            <div>
              <h3 className="font-display font-bold text-lg text-ink">Page Counter</h3>
              <p className="font-sans text-[13px] text-slate mt-0.5">
                {files.length} document{files.length > 1 ? 's' : ''} loaded.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                id="add-more-counter"
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
                onClick={() => document.getElementById('add-more-counter')?.click()}
              >
                Add More
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>

          {isProcessing && <LoadingSpinner text="Counting document pages..." />}

          {/* Result Stats dashboard */}
          {totalCount !== null && !isProcessing && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in duration-300">
              <div className="md:col-span-1 p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                  <Hash className="w-6 h-6" />
                </div>
                <h4 className="font-sans font-bold text-slate text-[11px] uppercase tracking-wider">Total Combined Pages</h4>
                <p className="font-display font-black text-5xl text-primary mt-2">{totalCount}</p>
              </div>

              <div className="md:col-span-2 border border-border bg-background/30 rounded-xl p-4 overflow-y-auto max-h-[220px] space-y-2">
                <span className="text-[11px] font-sans text-slate uppercase tracking-wider font-bold block mb-2">
                  Page Breakdown
                </span>
                {fileCounts.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-surface border border-border/60 p-2.5 rounded-lg text-sm">
                    <span className="font-sans font-medium text-ink truncate max-w-[250px]">{item.fileName}</span>
                    <span className="font-mono font-bold text-primary">{item.pages} pgs</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action reset */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Clear Files
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
