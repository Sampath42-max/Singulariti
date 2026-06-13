"use client";

import React, { useState } from 'react';
import { pdfjsLib } from '@/lib/pdfjsSetup';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { extractPDFPages } from '@/lib/pdf/pdfHelpers';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { checkPdfPasswordProtected, validatePdfFile, getPdfErrorMessage } from '@/lib/pdf/pdfValidation';
import { readPdfFile } from '@/lib/pdf/readPdfFile';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, CheckSquare, Square, Download } from 'lucide-react';

export function ExtractPdfPagesClient({ article }: { article?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [extractedPages, setExtractedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setResultBlobUrl(null);
    setExtractedPages(new Set());
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
      const buffer = await readPdfFile(selectedFile);
      const isProtected = await checkPdfPasswordProtected(buffer.slice(0));
      if (isProtected) {
        setError('This PDF may be encrypted or password-protected. Please upload an unlocked PDF.');
        return;
      }

      setFile(selectedFile);
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
    } catch (e) { const err = e as Error;
      console.error(err);
      setError(getPdfErrorMessage(err));
    }
  };

  const togglePageExtraction = (pageNum: number) => {
    setExtractedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      return next;
    });
    setResultBlobUrl(null);
  };

  const handleSelectAll = (select: boolean) => {
    if (!pdfDoc) return;
    if (select) {
      const all = new Set<number>();
      for (let i = 1; i <= pdfDoc.numPages; i++) all.add(i);
      setExtractedPages(all);
    } else {
      setExtractedPages(new Set());
    }
    setResultBlobUrl(null);
  };

  const handleExtract = async () => {
    if (!file || !pdfDoc) return;
    if (extractedPages.size === 0) {
      setError('Please select at least one page to extract.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const pagesArray = Array.from(extractedPages).sort((a, b) => a - b);
      const bytes = await extractPDFPages(file, pagesArray);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (e) { const err = e as Error;
      console.error(err);
      setError(getPdfErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setExtractedPages(new Set());
    setResultBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      article={article}
      howToUse={[
        "Select and upload the PDF file you want to extract pages from.",
        "Click on the page thumbnails to select the specific pages you need.",
        "Click 'Extract Selected Pages' to generate a new document.",
        "Download the new PDF containing only your selected pages."
]}
      faqs={[
        {
                "question": "Does this affect my original PDF?",
                "answer": "No, your original file remains untouched. The tool creates a new PDF with the extracted pages."
        },
        {
                "question": "Is there a limit to how many pages I can extract?",
                "answer": "There are no artificial limits. Since it runs in your browser, it depends only on your device's memory."
        }
]}
      
      title="Extract PDF Pages"
      description="Choose specific pages to extract from your PDF document. Select thumbnails visually and compile them into a new document."
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
          accept={{ 'application/pdf': ['.pdf'] }}
          title="Upload a PDF file to extract"
          subtitle="Choose the PDF document you want to extract pages from"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-sans font-bold text-base text-ink truncate">{file.name}</h4>
                <p className="font-sans text-[13px] text-slate mt-0.5">
                  {formatFileSize(file.size)} • {pdfDoc?.numPages} pages ({extractedPages.size} selected)
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => handleSelectAll(true)}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSelectAll(false)}>
                Deselect All
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
            </div>
          </div>

          {/* Page Grid */}
          {pdfDoc && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto p-2 mb-8 bg-background/50 rounded-xl border border-border">
              {Array.from({ length: pdfDoc.numPages }, (_, i) => i + 1).map((pageNum) => {
                const isSelected = extractedPages.has(pageNum);
                return (
                  <div key={pageNum} className="flex flex-col items-center">
                    <div
                      onClick={() => togglePageExtraction(pageNum)}
                      className={`relative group w-full aspect-[3/4] bg-background border rounded-lg overflow-hidden cursor-pointer transition-all flex items-center justify-center p-2 ${
                        isSelected
                          ? 'border-primary shadow-md ring-2 ring-primary/20 scale-102'
                          : 'border-border hover:border-slate'
                      }`}
                    >
                      <PageThumbnail
                        pdfDoc={pdfDoc}
                        pageNumber={pageNum}
                        scale={0.25}
                        className={isSelected ? '' : 'opacity-80'}
                      />
                      
                      {/* Selection Box indicator */}
                      <div className="absolute top-2 right-2 p-1.5 rounded-md bg-dark/60 text-surface backdrop-blur-xs shadow">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Square className="w-4 h-4 opacity-55 hover:opacity-100 transition-opacity text-surface" />
                        )}
                      </div>
                    </div>
                    <span className="font-sans text-[12px] font-semibold text-slate mt-2">
                      Page {pageNum}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {isProcessing && <LoadingSpinner text="Extracting pages..." />}

          {/* Download button result */}
          {resultBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Extracted Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your pages have been extracted successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={resultBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_extracted.pdf`}>
                Download Extracted PDF
              </DownloadButton>
            </div>
          )}

          {/* Control actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleExtract}
              disabled={isProcessing || extractedPages.size === 0}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Extract Selected Pages
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
