"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { pdfjsLib } from '@/lib/pdfjsSetup';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { addWatermarkToPDF, WatermarkOptions, countPDFPages } from '@/lib/pdf/pdfHelpers';
import { checkPdfPasswordProtected, validatePdfFile, getPdfErrorMessage } from '@/lib/pdf/pdfValidation';
import { readPdfFile } from '@/lib/pdf/readPdfFile';
import { getPdfWatermarkPosition, pdfToPreviewPosition, WatermarkPosition } from '@/lib/pdf/getWatermarkPosition';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Type, Image as ImageIcon, Sparkles, Settings } from 'lucide-react';

const getTextWidth = (text: string, size: number) => {
  if (typeof window === 'undefined') return text.length * size * 0.6;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.font = `bold ${size}px Helvetica, Arial, sans-serif`;
    return ctx.measureText(text).width;
  }
  return text.length * size * 0.6;
};


export function WatermarkPdfClient({ article }: { article?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number } | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  // Watermark parameters
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('CONFIDENTIAL');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#FF0000');
  const [opacity, setOpacity] = useState(0.2);
  const [rotation, setRotation] = useState(45);
  const [positionPreset, setPositionPreset] = useState<'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom'>('center');
  const [position, setPosition] = useState({ xPercent: 0.5, yPercent: 0.5 });
  const [imageSize, setImageSize] = useState(40);

  // Container dimensions
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ dragOffsetX: 0, dragOffsetY: 0 });

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const [applyToAll, setApplyToAll] = useState(true);
  const [selectedPageInput, setSelectedPageInput] = useState('1');

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (resultBlobUrl) URL.revokeObjectURL(resultBlobUrl);
    };
  }, [imagePreview, resultBlobUrl]);

  // Set up ResizeObserver
  useEffect(() => {
    if (!previewContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(previewContainerRef.current?.offsetWidth || 0);
        setContainerHeight(previewContainerRef.current?.offsetHeight || 0);
      }
    });
    observer.observe(previewContainerRef.current);
    setContainerWidth(previewContainerRef.current.offsetWidth);
    setContainerHeight(previewContainerRef.current.offsetHeight);
    return () => observer.disconnect();
  }, [pdfDoc]);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    if (resultBlobUrl) {
      URL.revokeObjectURL(resultBlobUrl);
      setResultBlobUrl(null);
    }
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
      const { counts } = await countPDFPages([selectedFile]);
      setPageCount(counts[0].pages);
      
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);

      const page = await doc.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      setPdfPageSize({ width: viewport.width, height: viewport.height });
    } catch (e) { const err = e as Error;
      console.error(err);
      setError(getPdfErrorMessage(err));
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Unsupported file type. Please upload a valid image (PNG/JPG).');
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setError(null);

    // Track image aspect ratio
    const img = new Image();
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
    };
    img.src = url;
  };

  const getWatermarkWidth = useCallback((pWidth: number) => {
    if (watermarkType === 'text') {
      return getTextWidth(text, fontSize);
    } else {
      return (imageSize / 100) * pWidth;
    }
  }, [watermarkType, text, fontSize, imageSize]);

  const getWatermarkHeight = useCallback((pHeight: number) => {
    if (watermarkType === 'text') {
      return fontSize;
    } else {
      const pWidth = containerWidth || 400;
      const wWidth = (imageSize / 100) * pWidth;
      return imageAspectRatio ? wWidth / imageAspectRatio : wWidth;
    }
  }, [watermarkType, fontSize, containerWidth, imageSize, imageAspectRatio]);

  // Sync position preset coordinates
  useEffect(() => {
    if (positionPreset === 'custom') return;

    const pdfPageWidth = pdfPageSize?.width || 595.27;
    const pdfPageHeight = pdfPageSize?.height || 841.89;

    const watermarkWidthInPdfPoints = watermarkType === 'text'
      ? getTextWidth(text, fontSize)
      : (imageSize / 100) * pdfPageWidth;

    const watermarkHeightInPdfPoints = watermarkType === 'text'
      ? fontSize
      : (imageAspectRatio ? (imageSize / 100) * pdfPageWidth / imageAspectRatio : (imageSize / 100) * pdfPageWidth);

    const { x: pdfX, y: pdfY } = getPdfWatermarkPosition({
      pageWidth: pdfPageWidth,
      pageHeight: pdfPageHeight,
      itemWidth: watermarkWidthInPdfPoints,
      itemHeight: watermarkHeightInPdfPoints,
      position: positionPreset,
      margin: 40,
    });

    const xPercent = pdfX / pdfPageWidth;
    const yPercent = (pdfPageHeight - pdfY - watermarkHeightInPdfPoints) / pdfPageHeight;

    setPosition({ xPercent, yPercent });
  }, [
    positionPreset,
    watermarkType,
    text,
    fontSize,
    imageSize,
    imageAspectRatio,
    pdfPageSize,
  ]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!previewContainerRef.current) return;

    const pageRect = previewContainerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - pageRect.left;
    const mouseY = event.clientY - pageRect.top;

    const watermarkLeft = position.xPercent * pageRect.width;
    const watermarkTop = position.yPercent * pageRect.height;

    dragStartRef.current = {
      dragOffsetX: mouseX - watermarkLeft,
      dragOffsetY: mouseY - watermarkTop
    };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (!previewContainerRef.current) return;

      const pageRect = previewContainerRef.current.getBoundingClientRect();
      const localMouseX = event.clientX - pageRect.left;
      const localMouseY = event.clientY - pageRect.top;

      const dragOffsetX = dragStartRef.current.dragOffsetX;
      const dragOffsetY = dragStartRef.current.dragOffsetY;

      let newLeft = localMouseX - dragOffsetX;
      let newTop = localMouseY - dragOffsetY;

      const wWidth = getWatermarkWidth(pageRect.width);
      const wHeight = getWatermarkHeight(pageRect.height);

      const maxLeft = pageRect.width - wWidth;
      const maxTop = pageRect.height - wHeight;

      newLeft = Math.max(0, Math.min(maxLeft, newLeft));
      newTop = Math.max(0, Math.min(maxTop, newTop));

      setPositionPreset('custom');
      setPosition({
        xPercent: newLeft / pageRect.width,
        yPercent: newTop / pageRect.height,
      });
      setResultBlobUrl(null);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, getWatermarkWidth, getWatermarkHeight]);

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
        color,
        opacity,
        rotation,
        xPercent: position.xPercent,
        yPercent: position.yPercent,
        positionPreset: positionPreset,
        fontSize,
        imageSize,
        imageAspectRatio,
        applyToAll,
        selectedPages: applyToAll ? undefined : pagesToWatermark,
        previewPageWidth: containerWidth,
        previewPageHeight: containerHeight
      };

      const watermarkedBytes = await addWatermarkToPDF(file, options);
      const blob = new Blob([watermarkedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
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
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    if (resultBlobUrl) URL.revokeObjectURL(resultBlobUrl);
    setFile(null);
    setPdfDoc(null);
    setPdfPageSize(null);
    setPageCount(null);
    setImageFile(null);
    setImagePreview(null);
    setImageAspectRatio(null);
    setResultBlobUrl(null);
    setError(null);
    setWarning(null);
    setText('CONFIDENTIAL');
    setFontSize(48);
    setColor('#FF0000');
    setOpacity(0.2);
    setRotation(45);
    setPositionPreset('center');
    setPosition({ xPercent: 0.5, yPercent: 0.5 });
    setImageSize(40);
    setApplyToAll(true);
    setSelectedPageInput('1');
  };



  return (
    <ToolLayout
      article={article}
      howToUse={[
        "Upload your PDF document.",
        "Type the text you want to use as a watermark and adjust the size, opacity, and angle.",
        "Click 'Apply Watermark' to stamp the document.",
        "Download your watermarked PDF."
]}
      faqs={[
        {
                "question": "Can the watermark be easily removed?",
                "answer": "The watermark is embedded into the PDF structure, making it difficult for average users to remove, though not impossible for advanced editing tools."
        },
        {
                "question": "Does this upload my document?",
                "answer": "No, the stamping process is strictly client-side."
        }
]}
      
      title="Add Watermark to PDF"
      description="Add text or image watermarks to your PDF pages in your browser. Customize styling, colors, size, and positions."
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
                      value={positionPreset}
                      onChange={(e: any) => { setPositionPreset(e.target.value); setResultBlobUrl(null); }}
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

                  {positionPreset === 'custom' && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                          <span>Position (X)</span>
                          <span>{Math.round(position.xPercent * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={Math.round(position.xPercent * 100)}
                          onChange={(e) => {
                            const px = Number(e.target.value);
                            setPositionPreset('custom');
                            setPosition(prev => ({ ...prev, xPercent: px / 100 }));
                            setResultBlobUrl(null);
                          }}
                          className="w-full accent-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                          <span>Position (Y)</span>
                          <span>{Math.round(position.yPercent * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={Math.round(position.yPercent * 100)}
                          onChange={(e) => {
                            const py = Number(e.target.value);
                            setPositionPreset('custom');
                            setPosition(prev => ({ ...prev, yPercent: py / 100 }));
                            setResultBlobUrl(null);
                          }}
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
              
              <div className="w-full relative border border-border rounded-xl bg-background p-6 flex justify-center items-center min-h-[400px]">
                {pdfDoc ? (
                  <div ref={previewContainerRef} className="relative border border-slate/30 shadow-md max-w-full touch-none select-none w-fit h-fit mx-auto">
                    <PageThumbnail
                      pdfDoc={pdfDoc}
                      pageNumber={1}
                      scale={0.8}
                    />

                    {/* Watermark Overlay */}
                    {((watermarkType === 'text' && text.trim()) || (watermarkType === 'image' && imagePreview)) && previewContainerRef.current ? (
                      (() => {
                        const pdfPageWidth = pdfPageSize?.width || 595.27;
                        const pdfPageHeight = pdfPageSize?.height || 841.89;

                        const pWidth = containerWidth || previewContainerRef.current.offsetWidth || 400;
                        const pHeight = containerHeight || previewContainerRef.current.offsetHeight || 565;

                        const scaleX = pWidth / pdfPageWidth;
                        const scaleY = pHeight / pdfPageHeight;

                        const watermarkWidthInPdfPoints = watermarkType === 'text'
                          ? getTextWidth(text, fontSize)
                          : (imageSize / 100) * pdfPageWidth;

                        const watermarkHeightInPdfPoints = watermarkType === 'text'
                          ? fontSize
                          : (imageAspectRatio ? (imageSize / 100) * pdfPageWidth / imageAspectRatio : (imageSize / 100) * pdfPageWidth);

                        const wWidth = watermarkWidthInPdfPoints * scaleX;
                        const wHeight = watermarkHeightInPdfPoints * scaleY;
                        const previewFontSize = fontSize * scaleY;

                        const pdfPos = getPdfWatermarkPosition({
                          pageWidth: pdfPageWidth,
                          pageHeight: pdfPageHeight,
                          itemWidth: watermarkWidthInPdfPoints,
                          itemHeight: watermarkHeightInPdfPoints,
                          position: positionPreset,
                          margin: 40,
                          xPercent: position.xPercent,
                          yPercent: position.yPercent,
                        });

                        const previewPos = pdfToPreviewPosition({
                          pdfX: pdfPos.x,
                          pdfY: pdfPos.y,
                          pdfPageWidth,
                          pdfPageHeight,
                          previewWidth: pWidth,
                          previewHeight: pHeight,
                          itemWidth: watermarkWidthInPdfPoints,
                          itemHeight: watermarkHeightInPdfPoints,
                        });

                        return (
                          <div
                            onPointerDown={handlePointerDown}
                            className={`absolute cursor-move select-none touch-none ${
                              isDragging ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
                            }`}
                            style={{
                              position: "absolute",
                              left: `${previewPos.left}px`,
                              top: `${previewPos.top}px`,
                              width: `${previewPos.width}px`,
                              height: `${previewPos.height}px`,
                              transform: `rotate(${rotation}deg)`,
                              transformOrigin: "center center",
                              zIndex: 50,
                            }}
                          >
                            {watermarkType === 'text' ? (
                              <div
                                className="font-sans font-bold whitespace-nowrap select-none pointer-events-none w-full h-full flex items-center justify-center text-center"
                                style={{
                                  color: color,
                                  opacity: opacity,
                                  fontSize: `${fontSize * previewPos.scaleX}px`,
                                  lineHeight: 1,
                                }}
                              >
                                {text}
                              </div>
                            ) : imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Watermark Preview"
                                className="pointer-events-none object-contain w-full h-full select-none"
                                style={{
                                  opacity: opacity,
                                }}
                              />
                            ) : null}
                          </div>
                        );
                      })()
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
