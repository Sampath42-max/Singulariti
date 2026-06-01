"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import * as pdfjsLib from 'pdfjs-dist';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { compressPDF } from '@/lib/pdf/pdfHelpers';
import { checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Percent, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function CompressPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [resultPdfDoc, setResultPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; originalSize: number; newSize: number } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setResult(null);
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
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse PDF document. It might be corrupted.');
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const compressedBytes = await compressPDF(file);
      const blob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const resDoc = await loadPdfDocument(new File([blob], 'compressed.pdf', { type: 'application/pdf' }));
      setResultPdfDoc(resDoc);
      setResult({
        url,
        originalSize: file.size,
        newSize: blob.size
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while compressing the PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setResultPdfDoc(null);
    setResult(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      title="Compress PDF"
      description="Optimize and shrink PDF files to reduce file size in the browser. Processed securely and locally on your device."
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
          title="Upload a PDF file to compress"
          subtitle="Choose the PDF document you want to optimize"
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
                Original Size: {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          {/* Compression Note warning */}
          <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-500 text-[13px] flex gap-3 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="font-sans leading-relaxed font-medium">
              Note: Deep compression depends heavily on the PDF structure. Images inside the PDF are structurally preserved to avoid quality loss.
            </p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-bold text-[14px] text-ink">Visual Preview</h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-[12px] font-sans font-medium text-slate flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              {showPreview ? <><EyeOff className="w-4 h-4" /> Hide Preview</> : <><Eye className="w-4 h-4" /> Show Preview</>}
            </button>
          </div>

          {showPreview && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-background border border-border rounded-xl p-6">
              {/* Original Preview */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-sans font-bold text-slate uppercase tracking-wider mb-3">Original</span>
                <div className="border border-border/50 shadow-sm bg-white p-1 rounded min-h-[300px] flex items-center justify-center">
                  {pdfDoc ? (
                    <PageThumbnail pdfDoc={pdfDoc} pageNumber={1} scale={0.5} />
                  ) : (
                    <span className="text-[12px] text-slate">Loading preview...</span>
                  )}
                </div>
              </div>

              {/* Compressed Preview */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-sans font-bold text-slate uppercase tracking-wider mb-3">Compressed</span>
                <div className="border border-border/50 shadow-sm bg-white p-1 rounded min-h-[300px] flex items-center justify-center">
                  {resultPdfDoc ? (
                    <PageThumbnail pdfDoc={resultPdfDoc} pageNumber={1} scale={0.5} />
                  ) : isProcessing ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <LoadingSpinner text="" />
                    </div>
                  ) : (
                    <span className="text-[12px] text-slate">Ready to compress</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {isProcessing && <LoadingSpinner text="Optimizing PDF structure..." />}

          {/* Result Stats */}
          {result && (
            <div className="space-y-6 mb-8 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background border border-border rounded-lg text-center">
                  <p className="text-[11px] font-sans text-slate uppercase tracking-wider font-semibold">Original Size</p>
                  <p className="font-mono text-lg font-bold text-ink mt-1">{formatFileSize(result.originalSize)}</p>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center relative">
                  <p className="text-[11px] font-sans text-primary uppercase tracking-wider font-semibold">Compressed Size</p>
                  <p className="font-mono text-lg font-bold text-primary mt-1">{formatFileSize(result.newSize)}</p>
                  {result.newSize < result.originalSize && (
                    <span className="absolute top-2 right-2 bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      -{Math.round((1 - result.newSize / result.originalSize) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-base text-ink">Optimized PDF Ready!</h4>
                  <p className="font-sans text-[12px] text-slate mt-0.5">
                    Click the button below to download the compressed file.
                  </p>
                </div>
                <DownloadButton href={result.url} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_compressed.pdf`}>
                  Download Compressed PDF
                </DownloadButton>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCompress}
              disabled={isProcessing}
            >
              Compress PDF
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
