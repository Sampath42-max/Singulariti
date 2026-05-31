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
import { addWatermarkToPDF, WatermarkOptions, countPDFPages } from '@/lib/pdf/pdfHelpers';
import { checkPdfPasswordProtected } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Type, Image as ImageIcon, Sparkles, Settings } from 'lucide-react';
import { TransformableOverlay } from '@/components/ui/TransformableOverlay';

export function WatermarkPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  // Watermark parameters
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('CONFIDENTIAL');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#FF0000');
  const [opacity, setOpacity] = useState(0.2);
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState<'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom'>('center');
  const [customX, setCustomX] = useState(50);
  const [customY, setCustomY] = useState(50);
  const [imageSize, setImageSize] = useState(40);
  
  const previewContainerRef = React.useRef<HTMLDivElement>(null);

  const [applyToAll, setApplyToAll] = useState(true);
  const [selectedPageInput, setSelectedPageInput] = useState('1');

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setResultBlobUrl(null);
    const selectedFile = selectedFiles[0];

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
      
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse PDF document. It might be corrupted.');
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Unsupported file type. Please upload a valid image (PNG/JPG).');
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setError(null);
  };

  const handleApply = async () => {
    if (!file || pageCount === null) return;
    if (watermarkType === 'text' && !text.trim()) {
      setError('Watermark text cannot be empty.');
      return;
    }
    if (watermarkType === 'image' && !imageFile) {
      setError('Please upload a watermark image.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const pagesToWatermark: number[] = [];
      if (!applyToAll) {
        // Parse single page or small CSV ranges
        const parts = selectedPageInput.split(',').map(s => parseInt(s.trim(), 10));
        for (const p of parts) {
          if (isNaN(p) || p < 1 || p > pageCount) {
            throw new Error(`Invalid page selection: "${p}". Page must be between 1 and ${pageCount}.`);
          }
          pagesToWatermark.push(p);
        }
      }

      const options: WatermarkOptions = {
        type: watermarkType,
        text,
        imageFile: imageFile || undefined,
        fontSize,
        color,
        opacity,
        rotation,
        position,
        customX,
        customY,
        imageSize,
        applyToAll,
        selectedPages: applyToAll ? undefined : pagesToWatermark
      };

      const watermarkedBytes = await addWatermarkToPDF(file, options);
      const blob = new Blob([watermarkedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while watermarking the PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setFile(null);
    setPdfDoc(null);
    setPageCount(null);
    setImageFile(null);
    setImagePreview(null);
    setResultBlobUrl(null);
    setError(null);
    setText('CONFIDENTIAL');
    setFontSize(48);
    setColor('#FF0000');
    setOpacity(0.2);
    setRotation(45);
    setPosition('center');
    setCustomX(50);
    setCustomY(50);
    setImageSize(40);
    setApplyToAll(true);
    setSelectedPageInput('1');
  };

  const getWatermarkPositionStyle = () => {
    switch (position) {
      case 'top-left': return { left: '10%', top: '10%' };
      case 'top-right': return { left: '90%', top: '10%' };
      case 'bottom-left': return { left: '10%', top: '90%' };
      case 'bottom-right': return { left: '90%', top: '90%' };
      case 'custom': return { left: `${customX}%`, top: `${customY}%` };
      case 'center':
      default:
        return { left: '50%', top: '50%' };
    }
  };

  const getOverlayX = () => {
    if (!previewContainerRef.current) return 0;
    const w = previewContainerRef.current.offsetWidth;
    switch (position) {
      case 'top-left': case 'bottom-left': return 0.1 * w;
      case 'top-right': case 'bottom-right': return 0.9 * w;
      case 'center': return 0.5 * w;
      case 'custom': return (customX / 100) * w;
      default: return 0.5 * w;
    }
  };

  const getOverlayY = () => {
    if (!previewContainerRef.current) return 0;
    const h = previewContainerRef.current.offsetHeight;
    switch (position) {
      case 'top-left': case 'top-right': return 0.1 * h;
      case 'bottom-left': case 'bottom-right': return 0.9 * h;
      case 'center': return 0.5 * h;
      case 'custom': return (customY / 100) * h;
      default: return 0.5 * h;
    }
  };

  return (
    <ToolLayout
      title="Add Watermark to PDF"
      description="Add text or image watermarks to your PDF pages in your browser. Customize styling, colors, size, and positions."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      onClearError={() => setError(null)}
    >
      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          title="Upload a PDF file to watermark"
          subtitle="Choose the PDF document you want to add watermarks to"
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
                  {formatFileSize(file.size)} • {pageCount} pages available
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Config & Scope (Left 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-5 bg-background border border-border rounded-xl space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-2">
                  <h3 className="font-display font-bold text-[14px] text-ink flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-primary" /> Watermark Settings
                  </h3>
                  
                  <div className="flex bg-surface border border-border rounded-lg p-0.5">
                    <button
                      onClick={() => setWatermarkType('text')}
                      className={`px-3 py-1 text-[11px] font-sans font-medium rounded ${watermarkType === 'text' ? 'bg-ink text-surface' : 'text-slate hover:text-ink'}`}
                    >
                      Text
                    </button>
                    <button
                      onClick={() => setWatermarkType('image')}
                      className={`px-3 py-1 text-[11px] font-sans font-medium rounded ${watermarkType === 'image' ? 'bg-ink text-surface' : 'text-slate hover:text-ink'}`}
                    >
                      Image
                    </button>
                  </div>
                </div>

                {watermarkType === 'text' ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Watermark Text</label>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => { setText(e.target.value); setResultBlobUrl(null); }}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                        placeholder="CONFIDENTIAL"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Font Size</label>
                        <input
                          type="number"
                          value={fontSize}
                          onChange={(e) => { setFontSize(Number(e.target.value)); setResultBlobUrl(null); }}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          min="10"
                          max="144"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Color</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => { setColor(e.target.value); setResultBlobUrl(null); }}
                            className="w-10 h-10 rounded border border-border p-1 bg-surface outline-none cursor-pointer"
                          />
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => { setColor(e.target.value); setResultBlobUrl(null); }}
                            className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center border-2 border-dashed border-border hover:border-slate bg-surface p-6 rounded-lg text-center cursor-pointer transition-colors relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="text-slate font-sans text-[13px]">
                        <ImageIcon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <span>Click to upload watermark image (PNG/JPG)</span>
                      </div>
                    </div>
                    {imageFile && (
                      <div className="p-3 bg-surface border border-border rounded-lg flex items-center justify-between">
                        <span className="font-sans text-[12px] text-ink truncate max-w-[200px]">{imageFile.name}</span>
                        <span className="text-[11px] text-slate">{formatFileSize(imageFile.size)}</span>
                      </div>
                    )}
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                        <span>Size (%)</span>
                        <span>{imageSize}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={imageSize}
                        onChange={(e) => { setImageSize(Number(e.target.value)); setResultBlobUrl(null); }}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                )}

                {/* Opacity & Rotation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                      <span>Opacity</span>
                      <span>{Math.round(opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.05"
                      value={opacity}
                      onChange={(e) => { setOpacity(Number(e.target.value)); setResultBlobUrl(null); }}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                      <span>Rotation</span>
                      <span>{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => { setRotation(Number(e.target.value)); setResultBlobUrl(null); }}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                {/* Position */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Position Preset</label>
                    <select
                      value={position}
                      onChange={(e: any) => { setPosition(e.target.value); setResultBlobUrl(null); }}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                    >
                      <option value="center">Center</option>
                      <option value="top-left">Top Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="custom">Custom Position</option>
                    </select>
                  </div>

                  {position === 'custom' && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                          <span>Position (X)</span>
                          <span>{customX}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customX}
                          onChange={(e) => { setCustomX(Number(e.target.value)); setResultBlobUrl(null); }}
                          className="w-full accent-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                          <span>Position (Y)</span>
                          <span>{customY}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customY}
                          onChange={(e) => { setCustomY(Number(e.target.value)); setResultBlobUrl(null); }}
                          className="w-full accent-primary"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scope selection */}
              <div className="p-5 bg-background border border-border rounded-xl space-y-4">
                <h3 className="font-display font-bold text-[14px] text-ink flex items-center pb-2 border-b border-border">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" /> Select Pages
                </h3>

                <div className="flex items-center gap-6 p-1 bg-surface border border-border rounded-lg">
                  <label className="flex-1 flex items-center justify-center py-2 px-3 rounded text-sm cursor-pointer select-none text-center">
                    <input
                      type="radio"
                      name="pageScope"
                      checked={applyToAll}
                      onChange={() => { setApplyToAll(true); setResultBlobUrl(null); }}
                      className="mr-2 accent-primary"
                    />
                    <span className={`font-medium ${applyToAll ? 'text-primary' : 'text-slate'}`}>All Pages</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center py-2 px-3 rounded text-sm cursor-pointer select-none text-center">
                    <input
                      type="radio"
                      name="pageScope"
                      checked={!applyToAll}
                      onChange={() => { setApplyToAll(false); setResultBlobUrl(null); }}
                      className="mr-2 accent-primary"
                    />
                    <span className={`font-medium ${!applyToAll ? 'text-primary' : 'text-slate'}`}>Specific Pages</span>
                  </label>
                </div>

                {!applyToAll && (
                  <div className="space-y-1.5 animate-in fade-in duration-200">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">
                      Page Numbers (e.g. 1, 3, 5)
                    </label>
                    <input
                      type="text"
                      value={selectedPageInput}
                      onChange={(e) => { setSelectedPageInput(e.target.value); setResultBlobUrl(null); }}
                      placeholder="e.g. 1, 3, 5"
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary font-mono"
                    />
                    <p className="text-[11px] text-slate font-sans">
                      Enter comma-separated page numbers. Max pages: {pageCount}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Placement Preview (Right 7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <h3 className="font-display font-bold text-[14px] text-ink mb-4 w-full text-left">Visual Preview</h3>
              
              <div className="w-full relative border border-border rounded-xl bg-background overflow-hidden p-6 flex justify-center items-center min-h-[400px]">
                {pdfDoc ? (
                  <div ref={previewContainerRef} className="relative border border-slate/30 shadow-md max-w-full overflow-hidden touch-none select-none">
                    <PageThumbnail
                      pdfDoc={pdfDoc}
                      pageNumber={1}
                      scale={0.8}
                    />

                    {/* Watermark Overlay */}
                    {watermarkType === 'text' && text.trim() && previewContainerRef.current ? (
                      <TransformableOverlay
                        isActive={true}
                        onSelect={() => {}}
                        x={getOverlayX()}
                        y={getOverlayY()}
                        width={(fontSize / 100) * previewContainerRef.current.offsetWidth} // approximate width mapping
                        height={fontSize * 1.5}
                        rotation={rotation}
                        lockAspect={false}
                        onChange={(updates) => {
                          if (previewContainerRef.current) {
                            const px = Math.min(100, Math.max(0, (updates.x / previewContainerRef.current.offsetWidth) * 100));
                            const py = Math.min(100, Math.max(0, (updates.y / previewContainerRef.current.offsetHeight) * 100));
                            const newFontSize = Math.max(8, updates.height / 1.5);
                            setPosition('custom');
                            setCustomX(px);
                            setCustomY(py);
                            setFontSize(newFontSize);
                            setRotation(updates.rotation);
                            setResultBlobUrl(null);
                          }
                        }}
                      >
                        <div
                          className="font-bold text-center whitespace-nowrap w-full h-full flex items-center justify-center pointer-events-none"
                          style={{
                            color: color,
                            opacity: opacity,
                            fontSize: `${fontSize * 0.8}px`
                          }}
                        >
                          {text}
                        </div>
                      </TransformableOverlay>
                    ) : watermarkType === 'image' && imagePreview && previewContainerRef.current ? (
                      <TransformableOverlay
                        isActive={true}
                        onSelect={() => {}}
                        x={getOverlayX()}
                        y={getOverlayY()}
                        width={(imageSize / 100) * previewContainerRef.current.offsetWidth}
                        height={(imageSize / 100) * previewContainerRef.current.offsetWidth} // aspect ratio will lock
                        rotation={rotation}
                        lockAspect={true}
                        onChange={(updates) => {
                          if (previewContainerRef.current) {
                            const px = Math.min(100, Math.max(0, (updates.x / previewContainerRef.current.offsetWidth) * 100));
                            const py = Math.min(100, Math.max(0, (updates.y / previewContainerRef.current.offsetHeight) * 100));
                            const newSize = Math.min(100, Math.max(5, (updates.width / previewContainerRef.current.offsetWidth) * 100));
                            setPosition('custom');
                            setCustomX(px);
                            setCustomY(py);
                            setImageSize(newSize);
                            setRotation(updates.rotation);
                            setResultBlobUrl(null);
                          }
                        }}
                      >
                        <img
                          src={imagePreview}
                          alt="Watermark Preview"
                          className="pointer-events-none object-contain w-full h-full"
                          style={{
                            opacity: opacity
                          }}
                        />
                      </TransformableOverlay>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-slate text-sm font-sans">Preview not available</span>
                )}
              </div>
            </div>
          </div>

          {isProcessing && <LoadingSpinner text="Watermarking PDF document..." />}

          {/* Download result */}
          {resultBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Watermarked Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your PDF was watermarked successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={resultBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_watermarked.pdf`}>
                Download Watermarked PDF
              </DownloadButton>
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
              onClick={handleApply}
              disabled={isProcessing}
            >
              Apply Watermark
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
