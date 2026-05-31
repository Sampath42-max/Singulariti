"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Loader2, Image as ImageIcon, RotateCcw, FlipHorizontal, FlipVertical, Crop } from 'lucide-react';
import { ToolRegistryItem } from '../../registry/types';
import { Button } from '../ui/Button';
import { Dropzone } from '../ui/Dropzone';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface EditingEngineProps {
  tool: ToolRegistryItem;
}

export function EditingEngine({ tool }: EditingEngineProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Ref for the hidden original image used for processing
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropImgRef = useRef<HTMLImageElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  // Tool specific states
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null);

  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  
  const [blur, setBlur] = useState(0);
  const [pixelSize, setPixelSize] = useState(1);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);
    setImageLoaded(false);
    setResultUrl(null);
    
    // Reset states
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setBlur(0);
    setPixelSize(1);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setWidth(naturalWidth);
    setHeight(naturalHeight);
    setImageLoaded(true);

    if (tool.id === 'image-cropper') {
      const initialCrop = centerCrop(
        makeAspectCrop(
          { unit: '%', width: 90 },
          naturalWidth / naturalHeight,
          naturalWidth,
          naturalHeight
        ),
        naturalWidth,
        naturalHeight
      );
      setCrop(initialCrop);
    } else {
      // Auto-apply for non-cropper tools to show initial state
      applyEffect(e.currentTarget);
    }
  };

  const handleWidthChange = (val: string) => {
    const num = parseInt(val) || 0;
    if (lockAspect && imgRef.current) {
      const ratio = imgRef.current.naturalHeight / imgRef.current.naturalWidth;
      setHeight(Math.round(num * ratio));
    }
    setWidth(num);
  };

  const handleHeightChange = (val: string) => {
    const num = parseInt(val) || 0;
    if (lockAspect && imgRef.current) {
      const ratio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
      setWidth(Math.round(num * ratio));
    }
    setHeight(num);
  };

  // Re-apply effect when sliders/buttons change (for instant preview)
  useEffect(() => {
    if (imageLoaded && imgRef.current && tool.id !== 'image-cropper') {
      const debounce = setTimeout(() => {
        applyEffect(imgRef.current!);
      }, 50);
      return () => clearTimeout(debounce);
    }
  }, [width, height, rotation, flipH, flipV, blur, pixelSize, imageLoaded, tool.id]);

  const applyEffect = async (img: HTMLImageElement, isFinalRender = false) => {
    const canvas = canvasRef.current || document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isFinalRender) setIsProcessing(true);

    try {
      let finalW = img.naturalWidth;
      let finalH = img.naturalHeight;

      if (tool.id === 'image-resizer') {
        finalW = width || 1;
        finalH = height || 1;
      }

      // Handle bounding box for arbitrary rotation
      if (tool.id === 'rotate-image') {
        const rad = (rotation * Math.PI) / 180;
        finalW = Math.abs(img.naturalWidth * Math.cos(rad)) + Math.abs(img.naturalHeight * Math.sin(rad));
        finalH = Math.abs(img.naturalWidth * Math.sin(rad)) + Math.abs(img.naturalHeight * Math.cos(rad));
      }

      if (tool.id === 'image-cropper' && completedCrop && cropImgRef.current) {
         const scaleX = img.naturalWidth / cropImgRef.current.width;
         const scaleY = img.naturalHeight / cropImgRef.current.height;
         finalW = completedCrop.width * scaleX;
         finalH = completedCrop.height * scaleY;
      }

      canvas.width = finalW;
      canvas.height = finalH;

      ctx.clearRect(0, 0, finalW, finalH);
      ctx.save();

      // Transform for rotation and flip
      ctx.translate(finalW / 2, finalH / 2);
      
      if (tool.id === 'rotate-image') {
        ctx.rotate((rotation * Math.PI) / 180);
      }
      
      if (tool.id === 'flip-image') {
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      }

      // Filters
      let filterString = '';
      if (tool.id === 'blur-image') filterString += `blur(${blur}px) `;
      if (tool.id === 'grayscale-image') filterString += `grayscale(100%) `;
      ctx.filter = filterString.trim() || 'none';

      // Pixelate effect uses scaling
      if (tool.id === 'pixelate-image' && pixelSize > 1) {
        ctx.imageSmoothingEnabled = false;
        const scaledW = img.naturalWidth / pixelSize;
        const scaledH = img.naturalHeight / pixelSize;
        
        // Draw small
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = scaledW;
        tempCanvas.height = scaledH;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.drawImage(img, 0, 0, scaledW, scaledH);
        
        // Draw back scaled up
        ctx.drawImage(tempCanvas, -img.naturalWidth / 2, -img.naturalHeight / 2, img.naturalWidth, img.naturalHeight);
      } else if (tool.id === 'image-cropper' && completedCrop && cropImgRef.current) {
        const scaleX = img.naturalWidth / cropImgRef.current.width;
        const scaleY = img.naturalHeight / cropImgRef.current.height;
        ctx.translate(-finalW/2, -finalH/2);
        ctx.drawImage(
          img,
          completedCrop.x * scaleX, completedCrop.y * scaleY, completedCrop.width * scaleX, completedCrop.height * scaleY,
          0, 0, finalW, finalH
        );
      } else {
        // Normal draw
        const drawW = tool.id === 'image-resizer' ? width : img.naturalWidth;
        const drawH = tool.id === 'image-resizer' ? height : img.naturalHeight;
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      }

      ctx.restore();

      if (isFinalRender) {
        canvas.toBlob((blob) => {
          if (!blob) {
            setIsProcessing(false);
            return;
          }
          if (resultUrl) URL.revokeObjectURL(resultUrl);
          setResultUrl(URL.createObjectURL(blob));
          setIsProcessing(false);
        }, file?.type || 'image/jpeg', 0.95);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) {
      // Force final render to blob
      if (imgRef.current) applyEffect(imgRef.current, true);
    } else {
      // Already rendered, trigger click
      const a = document.createElement('a');
      a.href = resultUrl;
      a.download = `singulariti_${tool.id}_${file?.name || 'edited.jpg'}`;
      a.click();
    }
  };

  // When resultUrl changes and user clicked download, we auto click it
  useEffect(() => {
    if (resultUrl && isProcessing === false) {
      const a = document.createElement('a');
      a.href = resultUrl;
      a.download = `singulariti_${tool.id}_${file?.name || 'edited.jpg'}`;
      a.click();
    }
  }, [resultUrl, isProcessing]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      {!file ? (
        <Dropzone 
          onFileSelect={processFile} 
          title="Drop image to edit"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <p className="font-sans text-[13px] text-slate mb-1">Editing file</p>
              <h4 className="font-display font-bold text-lg text-ink truncate max-w-md">{file.name}</h4>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                Start Over
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Controls */}
            <div className="lg:col-span-1 space-y-6">
              
              {tool.id === 'image-resizer' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-slate mb-1">Width (px)</label>
                    <input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} className="w-full border border-border rounded-md px-3 py-2 bg-background text-ink" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate mb-1">Height (px)</label>
                    <input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} className="w-full border border-border rounded-md px-3 py-2 bg-background text-ink" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} className="accent-primary" />
                    <span className="text-[13px] text-slate">Lock aspect ratio</span>
                  </label>
                </div>
              )}

              {tool.id === 'image-cropper' && (
                <div className="space-y-4">
                  <p className="text-[13px] text-slate">Drag the handles on the image to crop. Click apply when done.</p>
                  <Button variant="outline" className="w-full" onClick={() => imgRef.current && applyEffect(imgRef.current, true)}>
                    <Crop className="w-4 h-4 mr-2" /> Apply Crop
                  </Button>
                </div>
              )}

              {tool.id === 'rotate-image' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setRotation(r => r - 90)}>
                      <RotateCcw className="w-4 h-4 mr-2" /> -90°
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setRotation(r => r + 90)}>
                      <RotateCcw className="w-4 h-4 mr-2 scale-x-[-1]" /> +90°
                    </Button>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate mb-1">Custom Rotation: {rotation}°</label>
                    <input type="range" min="-180" max="180" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full accent-primary" />
                  </div>
                </div>
              )}

              {tool.id === 'flip-image' && (
                <div className="flex gap-2">
                  <Button variant={flipH ? "primary" : "outline"} className="flex-1" onClick={() => setFlipH(!flipH)}>
                    <FlipHorizontal className="w-4 h-4 mr-2" /> Horizontal
                  </Button>
                  <Button variant={flipV ? "primary" : "outline"} className="flex-1" onClick={() => setFlipV(!flipV)}>
                    <FlipVertical className="w-4 h-4 mr-2" /> Vertical
                  </Button>
                </div>
              )}

              {tool.id === 'blur-image' && (
                <div className="space-y-4">
                  <label className="block text-[13px] font-medium text-slate mb-1">Blur Radius: {blur}px</label>
                  <input type="range" min="0" max="50" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-primary" />
                </div>
              )}

              {tool.id === 'pixelate-image' && (
                <div className="space-y-4">
                  <label className="block text-[13px] font-medium text-slate mb-1">Pixel Block Size: {pixelSize}px</label>
                  <input type="range" min="1" max="100" value={pixelSize} onChange={(e) => setPixelSize(Number(e.target.value))} className="w-full accent-primary" />
                </div>
              )}

              {tool.id === 'grayscale-image' && (
                <div className="space-y-4">
                  <p className="text-[13px] text-slate">The grayscale filter is automatically applied.</p>
                </div>
              )}

              <Button 
                variant="primary" 
                size="lg" 
                className="w-full mt-8" 
                onClick={handleDownload}
                isLoading={isProcessing}
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download Image
              </Button>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-2">
              <div className="relative rounded-lg border border-border bg-background overflow-hidden min-h-[400px] flex items-center justify-center">
                {originalUrl && (
                  <img 
                    ref={imgRef}
                    src={originalUrl} 
                    alt="Original hidden" 
                    className="hidden" 
                    onLoad={onImageLoad} 
                  />
                )}
                
                {!imageLoaded && originalUrl && (
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                )}

                {imageLoaded && tool.id === 'image-cropper' ? (
                  <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img ref={cropImgRef} src={originalUrl!} alt="Crop target" className="max-h-[60vh] object-contain" />
                  </ReactCrop>
                ) : (
                  <canvas ref={canvasRef} className="max-w-full max-h-[60vh] object-contain shadow-sm" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
