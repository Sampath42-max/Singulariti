"use client";

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { loadPdfDocument, renderPageToDataUrl } from '@/lib/pdf/pdfRenderHelpers';
import { downloadAllAsZip, downloadBlob } from '@/lib/downloadHelpers';
import { checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Download, FileImage, Image as ImageIcon } from 'lucide-react';

export function PdfToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [renderedImages, setRenderedImages] = useState<string[]>([]); // Data URLs

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setRenderedImages([]);
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

  const handleConvertPage = async (pageNum: number): Promise<string> => {
    if (!pdfDoc) throw new Error('PDF not loaded');
    // Scale 2.0 ensures high-quality image output
    return renderPageToDataUrl(pdfDoc, pageNum, 2.0, 'image/jpeg');
  };

  const handleDownloadSingle = async (pageNum: number) => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const dataUrl = await handleConvertPage(pageNum);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      downloadBlob(blob, `${baseName}_page_${pageNum}.jpg`);
    } catch (err: any) {
      console.error(err);
      setError('Failed to convert this page to image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!file || !pdfDoc) return;
    setIsProcessing(true);
    setError(null);
    setProgress({ current: 0, total: pdfDoc.numPages });

    try {
      const images: { name: string; blob: Blob }[] = [];
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        setProgress({ current: i, total: pdfDoc.numPages });
        const dataUrl = await handleConvertPage(i);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        images.push({
          name: `${baseName}_page_${i}.jpg`,
          blob
        });
      }

      await downloadAllAsZip(images, `${baseName}_images`);
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during bulk conversion.');
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setRenderedImages([]);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Upload the PDF you want to convert into images.",
        "The tool will render each page of the PDF into a high-quality JPG image.",
        "Review the image previews.",
        "Download the images individually or as a bulk ZIP file."
]}
      faqs={[
        {
                "question": "What resolution are the JPGs generated at?",
                "answer": "The images are rendered at a high scale to ensure clear, readable text and crisp graphics."
        },
        {
                "question": "Are my documents safe?",
                "answer": "Yes, the conversion from PDF to JPG happens locally using JavaScript, ensuring your files never leave your device."
        }
]}
      
      title="PDF to JPG"
      description="Convert PDF document pages into high-quality JPG images directly inside your browser. Instant conversion, zero server uploads."
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
          title="Upload a PDF file to convert"
          subtitle="Choose the PDF document whose pages you want to save as images"
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
                  {formatFileSize(file.size)} • {pdfDoc?.numPages} pages available
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownloadAll}
                disabled={isProcessing}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download All as ZIP
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
            </div>
          </div>

          {/* Grid display */}
          {pdfDoc && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto p-2 mb-8 bg-background/50 rounded-xl border border-border">
              {Array.from({ length: pdfDoc.numPages }, (_, i) => i + 1).map((pageNum) => (
                <div key={pageNum} className="flex flex-col items-center">
                  <div className="relative group w-full aspect-[3/4] bg-background border border-border rounded-lg overflow-hidden flex items-center justify-center p-2">
                    <PageThumbnail
                      pdfDoc={pdfDoc}
                      pageNumber={pageNum}
                      scale={0.25}
                    />
                    {/* Hover download overlays */}
                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-xs">
                      <button
                        onClick={() => handleDownloadSingle(pageNum)}
                        className="bg-primary hover:brightness-110 text-dark p-2.5 rounded-full shadow transition-all active:scale-[0.9]"
                        title="Download as JPG"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <span className="font-sans text-[12px] font-semibold text-slate mt-2">
                    Page {pageNum}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bulk loading progress */}
          {isProcessing && (
            <div className="space-y-4">
              <LoadingSpinner text={progress.total > 0 ? `Converting page ${progress.current} of ${progress.total}...` : 'Converting page...'} />
              {progress.total > 0 && (
                <div className="w-full max-w-md mx-auto bg-border h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-150"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownloadAll}
              disabled={isProcessing}
              leftIcon={<FileImage className="w-5 h-5" />}
            >
              Convert PDF to JPG
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
