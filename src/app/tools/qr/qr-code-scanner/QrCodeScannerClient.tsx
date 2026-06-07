"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { QRScannerResult } from '@/components/tools/QRScannerResult';
import { detectQRResultType, QRScanResult } from '@/lib/qr/qrHelpers';
import { loadPdfDocument, renderPageToCanvas } from '@/lib/pdf/pdfRenderHelpers';
import { formatFileSize } from '@/lib/fileHelpers';
import { Camera, Image as ImageIcon, FileText, CameraOff, RefreshCw, AlertCircle, AlertTriangle } from 'lucide-react';

export function QrCodeScannerClient() {
  const [scanMode, setScanMode] = useState<'camera' | 'image' | 'pdf'>('camera');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);

  // html5-qrcode class ref (SSR safe loading)
  const [Html5QrcodeClass, setHtml5QrcodeClass] = useState<any>(null);
  const html5QrCodeRef = useRef<any>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  // Image Upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // PDF Upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPagesResults, setPdfPagesResults] = useState<{ page: number; text: string }[]>([]);

  // Load html5-qrcode dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('html5-qrcode')
        .then((module) => {
          setHtml5QrcodeClass(() => module.Html5Qrcode);
        })
        .catch((err) => {
          console.error('Failed to load html5-qrcode: ', err);
          setError('Failed to initialize scanner libraries.');
        });
    }
  }, []);

  // Stop camera on unmount or mode switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [scanMode]);

  const startCamera = async () => {
    if (!Html5QrcodeClass) {
      setError('Scanner library is still loading. Please try again.');
      return;
    }
    setError(null);
    setScanResult(null);
    setWarning(null);

    try {
      // Prompt camera permissions
      const devices = await Html5QrcodeClass.getCameras();
      if (!devices || devices.length === 0) {
        setError('No cameras found on your device.');
        return;
      }
      setCameras(devices);
      const defaultCamera = devices[0].id;
      setSelectedCameraId(defaultCamera);

      const html5QrCode = new Html5QrcodeClass('qr-reader-video-element');
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        defaultCamera,
        {
          fps: 10,
          qrbox: (width: number, height: number) => {
            const minSize = Math.min(width, height);
            return { width: minSize * 0.7, height: minSize * 0.7 };
          }
        },
        (decodedText: string) => {
          const parsed = detectQRResultType(decodedText);
          setScanResult(parsed);
          stopCamera();
        },
        (errorMessage: string) => {
          // Silent scan frames errors
        }
      );
      setCameraActive(true);
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes('Permission')) {
        setError('Camera permission was denied. Please grant permission in browser settings.');
      } else {
        setError('Failed to start camera scanner.');
      }
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && cameraActive) {
      try {
        await html5QrCodeRef.current.stop();
        setCameraActive(false);
      } catch (err) {
        console.error('Failed to stop camera: ', err);
      }
    }
  };

  const switchCamera = async () => {
    if (!html5QrCodeRef.current || cameras.length < 2) return;
    const currentIdx = cameras.findIndex((c) => c.id === selectedCameraId);
    const nextIdx = (currentIdx + 1) % cameras.length;
    const nextCameraId = cameras[nextIdx].id;
    setSelectedCameraId(nextCameraId);

    setIsProcessing(true);
    try {
      await stopCamera();
      
      const html5QrCode = new Html5QrcodeClass('qr-reader-video-element');
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        nextCameraId,
        {
          fps: 10,
          qrbox: (width: number, height: number) => {
            const minSize = Math.min(width, height);
            return { width: minSize * 0.7, height: minSize * 0.7 };
          }
        },
        (decodedText: string) => {
          const parsed = detectQRResultType(decodedText);
          setScanResult(parsed);
          stopCamera();
        },
        (errorMessage: string) => {
          // Silent scan frames errors
        }
      );
      setCameraActive(true);
    } catch (err) {
      console.error(err);
      setError('Failed to switch camera.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Image Upload Scanner
  const handleImageSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setScanResult(null);
    const file = selectedFiles[0];
    setImageFile(file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);

    if (!Html5QrcodeClass) {
      setError('Scanner library is loading. Please retry.');
      return;
    }

    setIsProcessing(true);
    
    // Create a temporary scanner instance
    const html5QrCode = new Html5QrcodeClass('qr-dummy-decoder');
    try {
      const decodedText = await html5QrCode.scanFile(file, false);
      const parsed = detectQRResultType(decodedText);
      setScanResult(parsed);
    } catch (err: any) {
      console.warn(err);
      setWarning('No QR code detected in the uploaded image.');
    } finally {
      setIsProcessing(false);
      // Clean up internal scanner element references
      try { html5QrCode.clear(); } catch {}
    }
  };

  // PDF Page-wise Canvas Scanner
  const handlePdfSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setScanResult(null);
    setPdfPagesResults([]);
    const file = selectedFiles[0];
    setPdfFile(file);

    if (!Html5QrcodeClass) {
      setError('Scanner library is loading. Please retry.');
      return;
    }

    setIsProcessing(true);

    try {
      const doc = await loadPdfDocument(file);
      const results: { page: number; text: string }[] = [];
      
      const html5QrCode = new Html5QrcodeClass('qr-dummy-decoder');

      // Loop page by page
      for (let i = 1; i <= doc.numPages; i++) {
        // Render PDF page to a canvas
        const canvas = document.createElement('canvas');
        await renderPageToCanvas(doc, i, canvas, 1.5);
        
        // Scan rendered page canvas
        try {
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
          if (blob) {
            const pageImageFile = new File([blob], `page_${i}.png`, { type: 'image/png' });
            const decodedText = await html5QrCode.scanFile(pageImageFile, false);
            results.push({ page: i, text: decodedText });
          }
        } catch (err) {
          // Page has no QR code, continue scanning rest of the document
        } finally {
          canvas.width = 0;
          canvas.height = 0; // memory cleanup
        }
      }

      setPdfPagesResults(results);
      if (results.length === 0) {
        setWarning('No QR codes detected in this PDF document.');
      } else {
        // Automatically select the first detected QR as default preview result
        const parsed = detectQRResultType(results[0].text);
        setScanResult(parsed);
      }

      try { html5QrCode.clear(); } catch {}
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    stopCamera();
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setPdfFile(null);
    setPdfPagesResults([]);
    setScanResult(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Select your file or input your data.",
        "Adjust any specific settings or options as needed.",
        "Click the main action button to process.",
        "Download or copy the result instantly."
      ]}
      faqs={[
        { question: "Is this tool free to use?", answer: "Yes, this tool is completely free with no hidden limits." },
        { question: "Are my files uploaded to a server?", answer: "No, all processing happens locally in your browser ensuring complete privacy and security." }
      ]}
      
      title="QR Code Scanner"
      description="Scan QR codes using your device camera, uploaded images, or pages of a PDF document. Completely processed client-side in the browser."
      categoryName="QR Tools"
      categoryHref="/tools/qr"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        
        {/* Scanner Modes tabs */}
        <div className="flex bg-background border border-border rounded-xl p-1 mb-8 max-w-md mx-auto">
          <button
            onClick={() => { setScanMode('camera'); handleReset(); }}
            className={`flex-1 py-3 px-4 rounded-lg font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all ${scanMode === 'camera' ? 'bg-surface text-primary shadow-xs' : 'text-slate hover:text-ink'}`}
          >
            <Camera className="w-4 h-4" /> Camera
          </button>
          <button
            onClick={() => { setScanMode('image'); handleReset(); }}
            className={`flex-1 py-3 px-4 rounded-lg font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all ${scanMode === 'image' ? 'bg-surface text-primary shadow-xs' : 'text-slate hover:text-ink'}`}
          >
            <ImageIcon className="w-4 h-4" /> Upload Image
          </button>
          <button
            onClick={() => { setScanMode('pdf'); handleReset(); }}
            className={`flex-1 py-3 px-4 rounded-lg font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all ${scanMode === 'pdf' ? 'bg-surface text-primary shadow-xs' : 'text-slate hover:text-ink'}`}
          >
            <FileText className="w-4 h-4" /> Upload PDF
          </button>
        </div>

        {/* Dummy div required for html5-qrcode scans */}
        <div id="qr-dummy-decoder" className="hidden" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Scanner (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {scanMode === 'camera' && (
              <div className="w-full max-w-md bg-background border border-border rounded-xl overflow-hidden p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                
                {/* Viewport where scanning happens */}
                <div 
                  id="qr-reader-video-element" 
                  className={`w-full aspect-square rounded-lg border border-border bg-black overflow-hidden flex items-center justify-center ${!cameraActive ? 'hidden' : 'block'}`}
                />

                {!cameraActive && !isProcessing && (
                  <div className="flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Camera className="w-8 h-8" />
                    </div>
                    <span className="text-slate text-sm font-sans">Camera scanner is idle. Click to start.</span>
                  </div>
                )}

                {isProcessing && <LoadingSpinner text="Connecting camera stream..." />}

                {/* Control bar */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {!cameraActive ? (
                    <Button variant="primary" onClick={startCamera} leftIcon={<Camera className="w-4 h-4" />}>
                      Start Camera Scanner
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={stopCamera} leftIcon={<CameraOff className="w-4 h-4" />}>
                        Stop Camera
                      </Button>
                      {cameras.length > 1 && (
                        <Button variant="secondary" onClick={switchCamera} leftIcon={<RefreshCw className="w-4 h-4" />}>
                          Switch Camera
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {scanMode === 'image' && (
              <div className="w-full max-w-md space-y-6">
                {!imageFile ? (
                  <FileUploader
                    onFilesSelected={handleImageSelected}
                    multiple={false}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
                    title="Upload QR Code image"
                    subtitle="PNG, JPG, JPEG, or WEBP image files containing a QR code"
                  />
                ) : (
                  <div className="p-6 bg-background border border-border rounded-xl text-center space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="font-sans font-bold text-sm text-ink truncate max-w-[200px]">{imageFile.name}</span>
                      <Button variant="ghost" size="sm" onClick={handleReset}>Clear</Button>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative border border-border rounded-lg bg-surface p-4 flex justify-center items-center max-h-[250px] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Scanned static QR" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}

                    {isProcessing && <LoadingSpinner text="Scanning uploaded image file..." />}
                  </div>
                )}
              </div>
            )}

            {scanMode === 'pdf' && (
              <div className="w-full max-w-md space-y-6">
                {!pdfFile ? (
                  <FileUploader
                    onFilesSelected={handlePdfSelected}
                    multiple={false}
                    title="Upload PDF document to scan"
                    subtitle="We render pages into canvases and scan them page-by-page locally"
                  />
                ) : (
                  <div className="p-6 bg-background border border-border rounded-xl space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="font-sans font-bold text-sm text-ink truncate max-w-[200px]">{pdfFile.name}</span>
                      <Button variant="ghost" size="sm" onClick={handleReset}>Clear</Button>
                    </div>

                    {isProcessing ? (
                      <LoadingSpinner text="Parsing pages and scanning for QR codes..." />
                    ) : (
                      <div className="space-y-3">
                        <span className="block text-[11px] font-sans text-slate uppercase tracking-wider font-bold">
                          Scan Page Results
                        </span>

                        {pdfPagesResults.length === 0 ? (
                          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-lg text-xs flex gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span>No QR codes were detected on any page of this document.</span>
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                            {pdfPagesResults.map((item) => (
                              <button
                                key={item.page}
                                onClick={() => setScanResult(detectQRResultType(item.text))}
                                className="w-full flex items-center justify-between p-2.5 bg-surface border border-border hover:border-primary rounded-lg text-left text-sm transition-colors font-sans"
                              >
                                <span className="font-medium text-slate">Page {item.page}</span>
                                <span className="font-mono text-primary font-bold text-xs truncate max-w-[150px]">{item.text}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
          </div>

          {/* Results display (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start w-full">
            {scanResult ? (
              <QRScannerResult result={scanResult} onClear={() => setScanResult(null)} />
            ) : (
              <div className="p-6 bg-background border border-border border-dashed rounded-xl text-center text-slate font-sans text-sm flex flex-col items-center justify-center min-h-[250px]">
                <AlertCircle className="w-8 h-8 mb-3 opacity-30 text-slate" />
                <span>Await scan result. Start camera or upload a file.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
