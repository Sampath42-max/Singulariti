"use client";

import React, { useState } from 'react';
import { pdfjsLib } from '@/lib/pdfjsSetup';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { deletePDFPages } from '@/lib/pdf/pdfHelpers';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { checkPdfPasswordProtected, validatePdfFile, getPdfErrorMessage } from '@/lib/pdf/pdfValidation';
import { readPdfFile } from '@/lib/pdf/readPdfFile';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Trash2, CheckCircle2 } from 'lucide-react';

export function DeletePdfPagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setResultBlobUrl(null);
    setDeletedPages(new Set());
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
    } catch (err: any) {
      console.error(err);
      setError(getPdfErrorMessage(err));
    }
  };

  const togglePageDeletion = (pageNum: number) => {
    setDeletedPages(prev => {
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

  const handleDelete = async () => {
    if (!file || !pdfDoc) return;
    if (deletedPages.size === 0) {
      setError('Please select at least one page to delete.');
      return;
    }
    if (deletedPages.size >= pdfDoc.numPages) {
      setError('You cannot delete all pages. At least 1 page must remain.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const pagesArray = Array.from(deletedPages);
      const bytes = await deletePDFPages(file, pagesArray);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(getPdfErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setDeletedPages(new Set());
    setResultBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Upload your PDF document to the tool.",
        "View all pages as thumbnails and select the ones you wish to delete.",
        "Click 'Delete Selected Pages' to remove them.",
        "Download your newly modified PDF."
]}
      faqs={[
        {
                "question": "Can I delete multiple pages at once?",
                "answer": "Yes, you can click on multiple page thumbnails to select and delete them in one go."
        },
        {
                "question": "Are my files secure?",
                "answer": "Yes, the deletion process runs entirely in your browser. No data is sent to external servers."
        }
]}
      
      title="Delete PDF Pages"
      description="Remove unwanted pages from a PDF document. Select pages to discard and download a new compiled file."
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
          title="Upload a PDF file to edit"
          subtitle="Choose the PDF document you want to remove pages from"
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
                  {formatFileSize(file.size)} • {pdfDoc?.numPages} pages ({deletedPages.size} marked for deletion)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
            </div>
          </div>

          {/* Grid Selection */}
          {pdfDoc && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto p-2 mb-8 bg-background/50 rounded-xl border border-border">
              {Array.from({ length: pdfDoc.numPages }, (_, i) => i + 1).map((pageNum) => {
                const isMarked = deletedPages.has(pageNum);
                return (
                  <div key={pageNum} className="flex flex-col items-center">
                    <div
                      onClick={() => togglePageDeletion(pageNum)}
                      className={`relative group w-full aspect-[3/4] bg-background border rounded-lg overflow-hidden cursor-pointer transition-all flex items-center justify-center p-2 ${
                        isMarked
                          ? 'border-red-500 shadow-md ring-2 ring-red-500/20'
                          : 'border-border hover:border-slate hover:shadow-xs'
                      }`}
                    >
                      <PageThumbnail
                        pdfDoc={pdfDoc}
                        pageNumber={pageNum}
                        scale={0.25}
                        className={isMarked ? 'opacity-40 filter grayscale' : 'transition-opacity duration-200'}
                      />
                      
                      {/* Selection Indicator overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isMarked ? (
                          <div className="bg-red-500 text-surface p-2 rounded-full shadow-lg scale-110">
                            <Trash2 className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="absolute top-2 right-2 bg-slate/60 text-surface opacity-0 group-hover:opacity-100 p-1 rounded-full shadow-xs transition-opacity">
                            <Trash2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`font-sans text-[12px] font-semibold mt-2 ${isMarked ? 'text-red-500 line-through' : 'text-slate'}`}>
                      Page {pageNum}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {isProcessing && <LoadingSpinner text="Removing selected pages..." />}

          {/* Download split result */}
          {resultBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">New Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your PDF was re-compiled successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={resultBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_edited.pdf`}>
                Download Edited PDF
              </DownloadButton>
            </div>
          )}

          {/* Control bar */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleDelete}
              disabled={isProcessing || deletedPages.size === 0}
              className={deletedPages.size > 0 ? 'bg-red-500 text-surface hover:bg-red-600' : ''}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Delete Selected Pages
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
