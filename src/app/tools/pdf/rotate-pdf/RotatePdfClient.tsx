"use client";

import React, { useState, useEffect } from 'react';
import { pdfjsLib } from '@/lib/pdfjsSetup';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { rotatePDF } from '@/lib/pdf/pdfHelpers';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { checkPdfPasswordProtected, validatePdfFile, getPdfErrorMessage } from '@/lib/pdf/pdfValidation';
import { readPdfFile } from '@/lib/pdf/readPdfFile';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, RotateCw, RefreshCw } from 'lucide-react';

export function RotatePdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [rotatedBlobUrl, setRotatedBlobUrl] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setRotatedBlobUrl(null);
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
      
      // Initialize rotations
      const initialRotations: Record<number, number> = {};
      for (let i = 1; i <= doc.numPages; i++) {
        initialRotations[i] = 0;
      }
      setPageRotations(initialRotations);
    } catch (err: any) {
      console.error(err);
      setError(getPdfErrorMessage(err));
    }
  };

  const handleRotatePage = (pageNum: number) => {
    setPageRotations(prev => ({
      ...prev,
      [pageNum]: (prev[pageNum] + 90) % 360
    }));
    setRotatedBlobUrl(null);
  };

  const handleRotateAll = (degrees: number) => {
    if (!pdfDoc) return;
    setPageRotations(prev => {
      const next = { ...prev };
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        next[i] = (next[i] + degrees) % 360;
      }
      return next;
    });
    setRotatedBlobUrl(null);
  };

  const handleSave = async () => {
    if (!file || !pdfDoc) return;
    setIsProcessing(true);
    setError(null);
    setRotatedBlobUrl(null);

    try {
      // Filter out pages that have rotation changes (multiples of 90)
      const rotationsToApply: Record<number, number> = {};
      Object.entries(pageRotations).forEach(([pageNumStr, rot]) => {
        if (rot !== 0) {
          rotationsToApply[parseInt(pageNumStr, 10)] = rot;
        }
      });

      const rotatedBytes = await rotatePDF(file, rotationsToApply);
      const blob = new Blob([rotatedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setRotatedBlobUrl(url);
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
    setPageRotations({});
    setRotatedBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Upload a PDF with incorrectly oriented pages.",
        "Click the rotate buttons on individual page thumbnails, or rotate all pages at once.",
        "Click 'Apply Rotation' to save the orientation.",
        "Download the corrected PDF."
]}
      faqs={[
        {
                "question": "Is the rotation permanent?",
                "answer": "Yes, the downloaded PDF will have the new rotation embedded in its structure."
        },
        {
                "question": "Can I rotate only specific pages?",
                "answer": "Absolutely. You can rotate individual pages 90, 180, or 270 degrees."
        }
]}
      
      title="Rotate PDF"
      description="Rotate individual pages or all pages of a PDF document visually. Completely secure, offline in-browser processing."
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
          title="Upload a PDF file to rotate"
          subtitle="Choose the PDF document whose pages you want to rotate"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* File header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-sans font-bold text-base text-ink truncate">{file.name}</h4>
                <p className="font-sans text-[13px] text-slate mt-0.5">
                  {formatFileSize(file.size)} • {pdfDoc?.numPages} pages
                </p>
              </div>
            </div>
            
            {/* Quick Rotate All controls */}
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleRotateAll(90)} leftIcon={<RotateCw className="w-4 h-4" />}>
                Rotate All +90°
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleRotateAll(180)} leftIcon={<RotateCw className="w-4 h-4" />}>
                Flip All 180°
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
                const rotation = pageRotations[pageNum] || 0;
                return (
                  <div key={pageNum} className="flex flex-col items-center">
                    <div className="relative group w-full aspect-[3/4] bg-background border border-border rounded-lg overflow-hidden hover:border-slate hover:shadow-xs transition-all flex items-center justify-center p-2">
                      <PageThumbnail
                        pdfDoc={pdfDoc}
                        pageNumber={pageNum}
                        scale={0.25}
                        className="transition-transform duration-200"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                      {/* Hover controls overlay */}
                      <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <button
                          onClick={() => handleRotatePage(pageNum)}
                          className="bg-primary hover:brightness-110 text-dark p-2.5 rounded-full shadow transition-all active:scale-[0.9]"
                          title="Rotate 90° Clockwise"
                        >
                          <RotateCw className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {/* Current Rotation Tag */}
                      {rotation !== 0 && (
                        <div className="absolute top-2 right-2 bg-primary text-dark text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          +{rotation}°
                        </div>
                      )}
                    </div>
                    <span className="font-sans text-[12px] font-semibold text-slate mt-2">
                      Page {pageNum}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {isProcessing && <LoadingSpinner text="Rotating pages..." />}

          {/* Download rotated PDF result */}
          {rotatedBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Rotated Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your PDF was rotated successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={rotatedBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_rotated.pdf`}>
                Download Rotated PDF
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
              onClick={handleSave}
              disabled={isProcessing}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Apply Rotations
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
