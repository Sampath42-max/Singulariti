"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { imagesToPDF, ImageToPDFSettings } from '@/lib/pdf/pdfHelpers';
import { formatFileSize } from '@/lib/fileHelpers';
import { ArrowUp, ArrowDown, Trash2, Plus, Image as ImageIcon, Settings } from 'lucide-react';

export function JpgToPdfClient({ article }: { article?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'fit'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setError(null);
    setResultBlobUrl(null);
    const updated = [...files, ...selectedFiles];
    setFiles(updated);

    // Create local object URLs for previewing images
    const nextPreviews = { ...imagePreviews };
    selectedFiles.forEach((file) => {
      nextPreviews[file.name] = URL.createObjectURL(file);
    });
    setImagePreviews(nextPreviews);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= files.length) return;

    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    
    setFiles(updated);
    setResultBlobUrl(null);
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    
    if (imagePreviews[fileToRemove.name]) {
      URL.revokeObjectURL(imagePreviews[fileToRemove.name]);
      const nextPreviews = { ...imagePreviews };
      delete nextPreviews[fileToRemove.name];
      setImagePreviews(nextPreviews);
    }
    
    setResultBlobUrl(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please upload at least one image file.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const settings: ImageToPDFSettings = {
        pageSize,
        orientation,
        margin
      };
      
      const pdfBytes = await imagesToPDF(files, settings);
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (e) { const err = e as Error;
      console.error(err);
      setError(err.message || 'An error occurred while converting images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    files.forEach((file) => {
      if (imagePreviews[file.name]) {
        URL.revokeObjectURL(imagePreviews[file.name]);
      }
    });
    setFiles([]);
    setImagePreviews({});
    setResultBlobUrl(null);
    setError(null);
  };

  return (
    <ToolLayout
      article={article}
      howToUse={[
        "Upload one or more JPG/JPEG images.",
        "Drag and drop the image thumbnails to rearrange their order.",
        "Click 'Convert to PDF' to compile the images into a single document.",
        "Download your new PDF file."
]}
      faqs={[
        {
                "question": "Can I convert other image formats like PNG?",
                "answer": "While this tool is optimized for JPGs, it generally supports standard web image formats depending on your browser."
        },
        {
                "question": "Is my data private during conversion?",
                "answer": "Absolutely. The entire image-to-PDF conversion process is performed locally on your machine."
        }
]}
      
      title="JPG to PDF"
      description="Convert images (JPG, JPEG, PNG) into a PDF document instantly in your browser. Rearrange pages, adjust margin offsets, and choose formatting."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      onClearError={() => setError(null)}
    >
      {files.length === 0 ? (
        <FileUploader
          onFilesSelected={handleFilesSelected}
          multiple={true}
          accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
          title="Upload image files to convert"
          subtitle="Select JPG, JPEG, or PNG images from your device"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-lg text-ink">Image Queue</h3>
              <p className="font-sans text-[13px] text-slate mt-0.5">
                {files.length} image{files.length > 1 ? 's' : ''} loaded. Rearrange, configure page options, and convert.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                id="add-more-images"
                multiple
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                }}
              />
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => document.getElementById('add-more-images')?.click()}
              >
                Add More
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Queue */}
            <div className="lg:col-span-2 space-y-3 max-h-[450px] overflow-y-auto pr-2">
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center gap-4 p-3 bg-background border border-border rounded-lg group hover:border-slate transition-colors"
                >
                  <div className="w-16 h-16 bg-surface border border-border rounded-md overflow-hidden flex items-center justify-center flex-shrink-0">
                    {imagePreviews[file.name] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreviews[file.name]}
                        alt="Image Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate/40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-sm text-ink truncate">{file.name}</h4>
                    <p className="font-sans text-[12px] text-slate mt-0.5">
                      {formatFileSize(file.size)}
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

            {/* Right Settings panel */}
            <div className="p-5 bg-background border border-border rounded-xl space-y-6 h-fit">
              <h3 className="font-display font-bold text-[15px] text-ink flex items-center mb-1">
                <Settings className="w-4 h-4 mr-2 text-primary" /> Page Settings
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
                    Page Size
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e: any) => setPageSize(e.target.value)}
                    className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary transition-colors"
                  >
                    <option value="A4">A4 (Standard)</option>
                    <option value="Letter">Letter</option>
                    <option value="fit">Fit Image Dimensions</option>
                  </select>
                </div>

                {pageSize !== 'fit' && (
                  <div className="space-y-1.5 animate-in fade-in duration-150">
                    <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
                      Orientation
                    </label>
                    <select
                      value={orientation}
                      onChange={(e: any) => setOrientation(e.target.value)}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary transition-colors"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
                    Margin Offset
                  </label>
                  <select
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary transition-colors"
                  >
                    <option value="0">No Margin (0pt)</option>
                    <option value="10">Small Margin (10pt)</option>
                    <option value="20">Medium Margin (20pt)</option>
                    <option value="36">Large Margin (36pt)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {isProcessing && <LoadingSpinner text="Compiling PDF document..." />}

          {/* Download split result */}
          {resultBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Converted PDF Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  All images have been converted into a single PDF document. Click below to download.
                </p>
              </div>
              <DownloadButton href={resultBlobUrl} download="singulariti_converted.pdf">
                Download PDF Document
              </DownloadButton>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              disabled={isProcessing}
            >
              Convert to PDF
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
