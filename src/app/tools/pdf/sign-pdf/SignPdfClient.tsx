"use client";

import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { PageThumbnail } from '@/components/tools/PageThumbnail';
import { signPDF } from '@/lib/pdf/pdfHelpers';
import { loadPdfDocument } from '@/lib/pdf/pdfRenderHelpers';
import { checkPdfPasswordProtected } from '@/lib/pdf/pdfValidation';
import { formatFileSize } from '@/lib/fileHelpers';
import { FileText, Edit2, Upload, PenTool, Check, Trash } from 'lucide-react';
import { TransformableOverlay } from '@/components/ui/TransformableOverlay';

export function SignPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [signatureMode, setSignatureMode] = useState<'draw' | 'upload'>('draw');
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  // Position sliders
  const [posX, setPosX] = useState<number>(50);
  const [posY, setPosY] = useState<number>(50);
  const [sigWidth, setSigWidth] = useState(30); // percentage of page width
  const [sigHeight, setSigHeight] = useState(15); // percentage of page height
  const [sigRotation, setSigRotation] = useState<number>(0);

  // Drawing canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Drag and Resize State
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Load PDF
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
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
      setSelectedPage(1);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse PDF document. It might be corrupted.');
    }
  };

  // Canvas drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#0F0F18';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureUrl(null);
    setResultBlobUrl(null);
  };

  const saveCanvasSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Check if canvas is empty
    const buffer = new Uint32Array(canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    const isEmpty = !buffer.some(color => color !== 0);
    if (isEmpty) {
      setError('Please draw a signature before confirming.');
      return;
    }

    const url = canvas.toDataURL('image/png');
    setSignatureUrl(url);
    setError(null);
  };

  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Unsupported file format. Please upload a valid image (PNG/JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSignatureUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApplySignature = async () => {
    if (!file || !pdfDoc || !signatureUrl) return;
    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const signedPdfBytes = await signPDF(arrayBuffer, Number(selectedPage) - 1, signatureUrl, posX, posY, sigWidth, sigHeight, sigRotation);
      const blob = new Blob([signedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while signing the PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setSignatureUrl(null);
    setResultBlobUrl(null);
    setError(null);
    setPosX(50);
    setPosY(50);
    setSigWidth(30);
    setSigHeight(15);
  };

  return (
    <ToolLayout
      title="Sign PDF"
      description="Draw or upload your signature and position it on any page of your PDF document. Processed 100% locally in your browser."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      onClearError={() => setError(null)}
    >
      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          title="Upload a PDF file to sign"
          subtitle="Choose the PDF document you want to add signature to"
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
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Signature Creator & Positioning (Left panel) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Creator Box */}
              <div className="p-5 bg-background border border-border rounded-xl">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                  <h3 className="font-display font-bold text-[14px] text-ink flex items-center">
                    <PenTool className="w-4 h-4 mr-2 text-primary" /> Create Signature
                  </h3>
                  
                  <div className="flex bg-surface border border-border rounded-lg p-0.5">
                    <button
                      onClick={() => { setSignatureMode('draw'); setSignatureUrl(null); }}
                      className={`px-3 py-1 text-[11px] font-sans font-medium rounded ${signatureMode === 'draw' ? 'bg-ink text-surface' : 'text-slate hover:text-ink'}`}
                    >
                      Draw
                    </button>
                    <button
                      onClick={() => { setSignatureMode('upload'); setSignatureUrl(null); }}
                      className={`px-3 py-1 text-[11px] font-sans font-medium rounded ${signatureMode === 'upload' ? 'bg-ink text-surface' : 'text-slate hover:text-ink'}`}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                {signatureMode === 'draw' ? (
                  <div className="space-y-4">
                    <div className="bg-surface border border-border rounded-lg overflow-hidden relative">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={120}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full bg-white block cursor-crosshair touch-none"
                      />
                      {signatureUrl && (
                        <div className="absolute inset-0 bg-primary/10 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                          <span className="text-[12px] font-sans font-bold text-primary bg-surface px-2.5 py-1 rounded shadow-sm flex items-center gap-1 border border-primary/20">
                            <Check className="w-4 h-4" /> Confirmed
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <Button variant="outline" size="sm" onClick={clearCanvas} leftIcon={<Trash className="w-3.5 h-3.5" />}>
                        Clear
                      </Button>
                      <Button variant="secondary" size="sm" onClick={saveCanvasSignature}>
                        Confirm Signature
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center border-2 border-dashed border-border hover:border-slate bg-surface p-6 rounded-lg text-center cursor-pointer transition-colors relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadSignature}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="text-slate font-sans text-[13px]">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <span>Click to upload transparent PNG signature</span>
                      </div>
                    </div>
                    {signatureUrl && (
                      <div className="p-3 bg-surface border border-border rounded-lg flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={signatureUrl} alt="Signature Uploaded" className="max-h-[60px] object-contain" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Placement Sliders */}
              {signatureUrl && (
                <div className="p-5 bg-background border border-border rounded-xl space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-display font-bold text-[14px] text-ink flex items-center pb-2 border-b border-border">
                    <Edit2 className="w-4 h-4 mr-2 text-primary" /> Signature Placement
                  </h3>

                  {/* Page selector */}
                  {pdfDoc && (
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
                        Select Page
                      </label>
                      <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(Number(e.target.value))}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary transition-colors"
                      >
                        {Array.from({ length: pdfDoc.numPages }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>Page {num}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Horizontal slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                      <span>Horizontal Position (X)</span>
                      <span>{posX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={posX}
                      onChange={(e) => { setPosX(Number(e.target.value)); setResultBlobUrl(null); }}
                      className="w-full accent-primary"
                    />
                  </div>

                  {/* Vertical slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate font-bold uppercase tracking-wider">
                      <span>Vertical Position (Y)</span>
                      <span>{posY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={posY}
                      onChange={(e) => { setPosY(Number(e.target.value)); setResultBlobUrl(null); }}
                      className="w-full accent-primary"
                    />
                  </div>

                  {/* Size sliders */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Width</label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={Math.round(sigWidth)}
                        onChange={(e) => { setSigWidth(Number(e.target.value)); setResultBlobUrl(null); }}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Height</label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={Math.round(sigHeight)}
                        onChange={(e) => { setSigHeight(Number(e.target.value)); setResultBlobUrl(null); }}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Placement Preview (Right container) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <h3 className="font-display font-bold text-[14px] text-ink mb-4 w-full text-left">Visual Preview</h3>
              
              <div className="w-full relative border border-border rounded-xl bg-background overflow-hidden p-6 flex justify-center items-center min-h-[400px]">
                {pdfDoc ? (
                  <div ref={previewContainerRef} className="relative border border-slate/30 shadow-md max-w-full touch-none select-none">
                    <PageThumbnail
                      pdfDoc={pdfDoc}
                      pageNumber={selectedPage}
                      scale={0.8}
                    />

                    {/* Draggable overlay representation */}
                    {signatureUrl && previewContainerRef.current && (
                      <TransformableOverlay
                        isActive={true}
                        onSelect={() => {}}
                        x={(posX / 100) * previewContainerRef.current.offsetWidth}
                        y={(posY / 100) * previewContainerRef.current.offsetHeight}
                        width={(sigWidth / 100) * previewContainerRef.current.offsetWidth}
                        height={(sigHeight / 100) * previewContainerRef.current.offsetHeight}
                        rotation={sigRotation}
                        lockAspect={true}
                        onChange={(updates) => {
                          if (previewContainerRef.current) {
                            const px = Math.min(100, Math.max(0, (updates.x / previewContainerRef.current.offsetWidth) * 100));
                            const py = Math.min(100, Math.max(0, (updates.y / previewContainerRef.current.offsetHeight) * 100));
                            const pw = Math.min(100, Math.max(5, (updates.width / previewContainerRef.current.offsetWidth) * 100));
                            const ph = Math.min(100, Math.max(5, (updates.height / previewContainerRef.current.offsetHeight) * 100));
                            setPosX(px);
                            setPosY(py);
                            setSigWidth(pw);
                            setSigHeight(ph);
                            setSigRotation(updates.rotation);
                            setResultBlobUrl(null);
                          }
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={signatureUrl} 
                          alt="Signature Preview" 
                          className="w-full h-full object-contain pointer-events-none drop-shadow-md" 
                        />
                      </TransformableOverlay>
                    )}
                  </div>
                ) : (
                  <span className="text-slate text-sm font-sans">Preview not available</span>
                )}
              </div>
            </div>
          </div>

          {isProcessing && <LoadingSpinner text="Embedding signature..." />}

          {/* Result download */}
          {resultBlobUrl && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-display font-bold text-base text-ink">Signed Document Ready!</h4>
                <p className="font-sans text-[12px] text-slate mt-0.5">
                  Your PDF was signed successfully. Click the button to download.
                </p>
              </div>
              <DownloadButton href={resultBlobUrl} download={`singulariti_${file.name.replace(/\.[^/.]+$/, "")}_signed.pdf`}>
                Download Signed PDF
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
              onClick={handleApplySignature}
              disabled={isProcessing || !signatureUrl}
            >
              Apply Signature
            </Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
