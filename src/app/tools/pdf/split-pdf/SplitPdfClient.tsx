"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { splitPDF, countPDFPages } from '@/lib/pdf/pdfHelpers';
import { parsePageRanges, checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Sliders, Scissors } from 'lucide-react';

export function SplitPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rangeInput, setRangeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [splitBlobUrl, setSplitBlobUrl] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setSplitBlobUrl(null);
    const selectedFile = selectedFiles[0];

    const validation = validatePdfFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid PDF file.');
      return;
    }
    if (validation.warning) {
      setWarning(validation.warning);
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const isProtected = await checkPdfPasswordProtected(buffer);
      if (isProtected) {
        setError('This PDF is password protected. Password protected PDFs are not supported.');
        return;
      }

      setFile(selectedFile);
      const { counts } = await countPDFPages([selectedFile]);
      setPageCount(counts[0].pages);
      setRangeInput(`1-${counts[0].pages}`);
    } catch (err: any) {
      console.error(err);
      setError('Failed to load the PDF file. It might be corrupted.');
    }
  };

  const handleSplit = async () => {
    if (!file || pageCount === null) return;
    setError(null);
    setSplitBlobUrl(null);
    setIsProcessing(true);

    try {
      const pageNumbers = parsePageRanges(rangeInput, pageCount);
      if (pageNumbers.length === 0) {
        setError('No pages selected.');
        setIsProcessing(false);
        return;
      }

      const splitBytes = await splitPDF(file, pageNumbers);
      const blob = new Blob([splitBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to split PDF. Please check your range settings.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPageCount(null);
    setRangeInput('');
    setSplitBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      title="Split PDF"
      description="Split a PDF document into specific pages or page ranges in your browser. Totally private and secure."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          title="Upload a PDF file to split"
          subtitle="Choose the PDF document you want to extract pages from"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
          {/* File Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-sans font-bold text-base text-ink truncate">{file.name}</h4>
              <p className="font-sans text-[13px] text-slate mt-0.5">
                {formatFileSize(file.size)} • {pageCount} pages
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-display font-bold text-[14px] text-ink flex items-center mb-3">
                <Sliders className="w-4 h-4 mr-2 text-primary" /> Define Page Ranges
              </h3>
              
              <div className="space-y-2">
                <label className="block text-[11px] font-sans text-slate uppercase tracking-wider font-semibold">
                  Pages to Extract (e.g. 1-3, 5, 7-10)
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder={`Example: 1-2, 4, 6-${pageCount}`}
                  className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-[14px] text-ink font-mono outline-none focus:border-primary transition-colors"
                />
              </div>
              <p className="text-[12px] text-slate font-sans mt-2">
                Specify pages or ranges separated by commas. Valid page range is between 1 and {pageCount}.
              </p>
            </div>
          </div>

          {/* Processing spinner */}
          {isProcessing && <LoadingSpinner text="Extracting selected pages..." />}

          {/* Download split result */}
          {splitBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Extracted PDF Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your split document is ready. Click the button to download.
                </p>
              </div>
              <DownloadButton href={splitBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_split.pdf`}>
                Download Split PDF
              </DownloadButton>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSplit}
              disabled={isProcessing}
              leftIcon={<Scissors className="w-4 h-4" />}
            >
              Split PDF
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
