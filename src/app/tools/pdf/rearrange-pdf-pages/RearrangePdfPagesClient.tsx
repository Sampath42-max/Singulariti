"use client";

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { rearrangePDFPages } from '@/lib/pdf/pdfHelpers';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Move, ArrowLeft, ArrowRight } from 'lucide-react';

export function RearrangePdfPagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]); // 0-based indices
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setResultBlobUrl(null);
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
      
      // Initialize order array [0, 1, 2, ..., numPages - 1]
      const order = Array.from({ length: doc.numPages }, (_, i) => i);
      setPageOrder(order);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse PDF document. It might be corrupted.');
    }
  };

  // Drag-and-drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Perform instant swap on hover
    const updatedOrder = [...pageOrder];
    const item = updatedOrder[draggedIndex];
    updatedOrder.splice(draggedIndex, 1);
    updatedOrder.splice(index, 0, item);
    
    setDraggedIndex(index);
    setPageOrder(updatedOrder);
    setResultBlobUrl(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const shiftPage = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= pageOrder.length) return;

    const updated = [...pageOrder];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    
    setPageOrder(updated);
    setResultBlobUrl(null);
  };

  const handleRearrange = async () => {
    if (!file || pageOrder.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const bytes = await rearrangePDFPages(file, pageOrder);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while compiling rearranged PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setPageOrder([]);
    setResultBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Upload the PDF document you want to reorder.",
        "Drag and drop the page thumbnails into your desired sequence.",
        "Click 'Apply Changes' to rebuild the document.",
        "Download the reorganized PDF."
]}
      faqs={[
        {
                "question": "Does rearranging degrade the PDF quality?",
                "answer": "No, the pages are moved structurally without re-rendering or compressing them, so quality is 100% preserved."
        },
        {
                "question": "Is this secure for sensitive documents?",
                "answer": "Yes, all rearrangements happen client-side in your browser."
        }
]}
      
      title="Rearrange PDF Pages"
      description="Reorder the pages of your PDF document visually using drag and drop. Processed securely in your browser."
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
          title="Upload a PDF file to reorder"
          subtitle="Choose the PDF document whose pages you want to rearrange"
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
                  {formatFileSize(file.size)} • {pdfDoc?.numPages} pages (Drag cards to sort)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
            </div>
          </div>

          {/* Draggable page grid */}
          {pdfDoc && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto p-2 mb-8 bg-background/50 rounded-xl border border-border">
              {pageOrder.map((pageIdx, currentPosition) => {
                const pageNum = pageIdx + 1; // 1-based page number for display
                return (
                  <div
                    key={`page-${pageIdx}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, currentPosition)}
                    onDragOver={(e) => handleDragOver(e, currentPosition)}
                    onDragEnd={handleDragEnd}
                    className={`flex flex-col items-center p-3 bg-surface border rounded-xl cursor-grab active:cursor-grabbing transition-all select-none ${
                      draggedIndex === currentPosition
                        ? 'border-primary shadow-lg ring-2 ring-primary/20 scale-105 opacity-80'
                        : 'border-border hover:border-slate hover:shadow-xs'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-slate mb-2">
                      <Move className="w-3.5 h-3.5 opacity-60 pointer-events-none" />
                      <span className="font-sans text-[10px] font-bold uppercase bg-background px-1.5 py-0.5 rounded">
                        Pos {currentPosition + 1}
                      </span>
                    </div>

                    <div className="w-full aspect-[3/4] bg-background border border-border/60 rounded-lg overflow-hidden flex items-center justify-center p-1 pointer-events-none">
                      <PageThumbnail
                        pdfDoc={pdfDoc}
                        pageNumber={pageNum}
                        scale={0.2}
                      />
                    </div>

                    <span className="font-sans text-[12px] font-semibold text-slate mt-2 pointer-events-none">
                      Page {pageNum}
                    </span>

                    {/* Step-by-step buttons for mobile and accessibility */}
                    <div className="flex gap-1 mt-3 w-full border-t border-border/40 pt-2 justify-center">
                      <button
                        onClick={() => shiftPage(currentPosition, 'left')}
                        disabled={currentPosition === 0}
                        className="p-1 rounded hover:bg-slate/10 text-slate disabled:opacity-20 disabled:pointer-events-none transition-colors"
                        title="Move Left"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => shiftPage(currentPosition, 'right')}
                        disabled={currentPosition === pageOrder.length - 1}
                        className="p-1 rounded hover:bg-slate/10 text-slate disabled:opacity-20 disabled:pointer-events-none transition-colors"
                        title="Move Right"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isProcessing && <LoadingSpinner text="Compiling document in new order..." />}

          {/* Result download */}
          {resultBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Sorted Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your PDF pages have been reordered successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={resultBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_sorted.pdf`}>
                Download Reordered PDF
              </DownloadButton>
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
              onClick={handleRearrange}
              disabled={isProcessing}
              leftIcon={<Move className="w-4 h-4" />}
            >
              Apply Reordering
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
