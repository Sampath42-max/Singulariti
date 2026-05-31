"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { EditorCanvas } from './EditorCanvas';
import { EditorSettingsPanel } from './EditorSettingsPanel';
import { DownloadImageButton, DownloadParams } from './DownloadImageButton';
import { EditorSettings, EditorToolId, HistoryState, ImageState } from '../../../lib/image-editor/editorTypes';
import { renderImageWithSettings } from '../../../lib/image-editor/canvasHelpers';
import { downloadCanvasAsImage } from '../../../lib/image-editor/downloadHelpers';
import { validateImageFile } from '../../../lib/image-editor/validationHelpers';
import { Button } from '../../ui/Button';
import { Check, RotateCcw, Image as ImageIcon } from 'lucide-react';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ToolRegistryItem } from '@/registry/types';

const DEFAULT_SETTINGS: EditorSettings = {
  crop: { x: 0, y: 0, width: 0, height: 0, unit: 'px' },
  resize: { width: 0, height: 0, lockAspect: true },
  rotate: { angle: 0 },
  flip: { horizontal: false, vertical: false },
  blur: { strength: 0 },
  pixelate: { size: 1 },
  grayscale: { enabled: false },
  upscaler: { scale: '1x', width: 0, height: 0, lockAspect: true, quality: 'medium' },
  enhancer: { auto: false, color: false, clarity: false, exposure: false, saturation: false },
  sharpen: { strength: 0 },
  denoiser: { strength: 0 },
  colorAdjust: { saturation: 0, hue: 0, vibrance: 0, temperature: 0, tint: 0, exposure: 0, gamma: 1.0 },
  brightnessContrast: { brightness: 0, contrast: 0, highlights: 0, shadows: 0 },
  watermark: { text: '', fontSize: 24, fontFamily: 'Sans-serif', color: '#ffffff', opacity: 30, rotation: 45, position: 'center', posX: 50, posY: 50, repeat: true },
  text: { content: '', fontSize: 36, fontFamily: 'Sans-serif', bold: false, italic: false, color: '#ffffff', bgColor: 'transparent', opacity: 100, rotation: 0, position: 'bottomLeft', posX: 10, posY: 90 },
  logo: { url: null, size: 20, opacity: 80, rotation: 0, position: 'bottomRight', posX: 90, posY: 90, lockAspect: true },
  bwToColor: { mode: 'tint', tintColor: '#ffffff' },
  colorToBw: { mode: 'custom', contrast: 0 }
};

interface Props {
  tool: ToolRegistryItem;
}

export function SingleFeatureEditorClient({ tool }: Props) {
  const activeTool = (tool.options?.action || 'crop') as EditorToolId;

  const [imageState, setImageState] = useState<ImageState>({ file: null, url: null, width: 0, height: 0 });
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);
  
  // Crop states
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null);
  const cropImgRef = useRef<HTMLImageElement | null>(null);

  // Logo file state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);

  // Processing indicators
  const [isProcessing, setIsProcessing] = useState(false);
  const [canvasLoading, setCanvasLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Error handling
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeImageRef = useRef<HTMLImageElement | null>(null);

  // Keep track of the original image data url to allow resetting
  const originalImageUrlRef = useRef<string | null>(null);

  // Safe URL references to prevent premature revocation
  const createdUrlsRef = useRef<string[]>([]);

  const createSafeObjectURL = (file: File): string => {
    const url = URL.createObjectURL(file);
    createdUrlsRef.current.push(url);
    return url;
  };

  // Clean URLs on unmount
  useEffect(() => {
    return () => {
      if (imageState.url) URL.revokeObjectURL(imageState.url);
      if (originalImageUrlRef.current && originalImageUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(originalImageUrlRef.current);
      }
      createdUrlsRef.current.forEach(url => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
    };
  }, [imageState.url]);

  // Load logo file image element
  useEffect(() => {
    if (!logoFile) {
      setLogoImg(null);
      return;
    }
    const img = new Image();
    const url = settings.logo.url || createSafeObjectURL(logoFile);
    img.src = url;
    img.onload = () => {
      setLogoImg(img);
    };
  }, [logoFile, settings.logo.url]);

  const handleLogoUpload = (file: File) => {
    const url = createSafeObjectURL(file);
    setLogoFile(file);
    setSettings(prev => ({
      ...prev,
      logo: {
        ...prev.logo,
        url
      }
    }));
  };

  const handleLogoRemove = () => {
    setLogoFile(null);
    setLogoImg(null);
    setSettings(prev => ({
      ...prev,
      logo: {
        ...prev.logo,
        url: null
      }
    }));
  };

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    setError(null);
    setWarning(null);
    setLogoError(null);
    setLogoFile(null);
    setLogoImg(null);

    const file = files[0];
    const validation = validateImageFile(file);
    if (!validation.isValid && validation.type === 'error') {
      setError(validation.message);
      return;
    }
    if (validation.message && validation.type === 'warning') {
      setWarning(validation.message);
    }

    const url = URL.createObjectURL(file);
    originalImageUrlRef.current = url;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      const initialWidth = img.naturalWidth;
      const initialHeight = img.naturalHeight;
      
      setImageState({
        file,
        url,
        width: initialWidth,
        height: initialHeight
      });

      activeImageRef.current = img;
      setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));

      const initialCrop = centerCrop(
        makeAspectCrop(
          { unit: '%', width: 90 },
          initialWidth / initialHeight,
          initialWidth,
          initialHeight
        ),
        initialWidth,
        initialHeight
      );
      setCrop(initialCrop);
    };
    img.onerror = () => {
      setError('Failed to load image. The file may be corrupted.');
    };
  };

  // Re-render canvas whenever settings changes
  useEffect(() => {
    if (!activeImageRef.current || !canvasRef.current) return;

    setCanvasLoading(true);
    const debounce = setTimeout(async () => {
      try {
        await renderImageWithSettings(
          activeImageRef.current!,
          canvasRef.current!,
          settings,
          logoImg
        );
      } catch (err) {
        console.error('Render error:', err);
      } finally {
        setCanvasLoading(false);
      }
    }, 40);

    return () => clearTimeout(debounce);
  }, [settings, logoImg, activeTool]);

  const handleReset = () => {
    if (originalImageUrlRef.current) {
      const img = new Image();
      img.src = originalImageUrlRef.current;
      img.onload = () => {
        activeImageRef.current = img;
        setImageState(prev => ({
          ...prev,
          width: img.naturalWidth,
          height: img.naturalHeight
        }));
        setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));
        setLogoFile(null);
        setLogoImg(null);
      };
    }
  };

  const handleClear = () => {
    if (imageState.url) URL.revokeObjectURL(imageState.url);
    setImageState({ file: null, url: null, width: 0, height: 0 });
    activeImageRef.current = null;
    originalImageUrlRef.current = null;
    setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));
    setLogoFile(null);
    setLogoImg(null);
    setError(null);
    setWarning(null);
    setLogoError(null);
  };

  const handleDownload = async (params: DownloadParams) => {
    if (!canvasRef.current || !activeImageRef.current) return;
    setIsProcessing(true);
    try {
      if (activeTool === 'crop' && completedCrop && cropImgRef.current) {
        const offscreenCanvas = document.createElement('canvas');
        const ctx = offscreenCanvas.getContext('2d');
        if (!ctx) throw new Error("Could not get 2d context");

        const img = activeImageRef.current;
        const scaleX = img.naturalWidth / cropImgRef.current.width;
        const scaleY = img.naturalHeight / cropImgRef.current.height;

        const srcX = completedCrop.x * scaleX;
        const srcY = completedCrop.y * scaleY;
        const srcW = completedCrop.width * scaleX;
        const srcH = completedCrop.height * scaleY;

        offscreenCanvas.width = Math.max(1, srcW);
        offscreenCanvas.height = Math.max(1, srcH);
        ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);
        
        await downloadCanvasAsImage(offscreenCanvas, {
          fileName: params.fileName,
          format: params.format,
          quality: params.quality
        });
        
        return;
      }

      // Normal render download
      const offscreenCanvas = document.createElement('canvas');
      await renderImageWithSettings(
        activeImageRef.current!,
        offscreenCanvas,
        settings,
        logoImg,
        true // isFullResolution = true
      );

      await downloadCanvasAsImage(offscreenCanvas, {
        fileName: params.fileName,
        format: params.format,
        quality: params.quality
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to download image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !activeImageRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const pctX = Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100)));
    const pctY = Math.min(100, Math.max(0, Math.round((clickY / rect.height) * 100)));

    if (activeTool === 'text') {
      setSettings(prev => ({
        ...prev,
        text: { ...prev.text, position: 'custom', posX: pctX, posY: pctY }
      }));
    } else if (activeTool === 'logo') {
      setSettings(prev => ({
        ...prev,
        logo: { ...prev.logo, position: 'custom', posX: pctX, posY: pctY }
      }));
    } else if (activeTool === 'watermark') {
      setSettings(prev => ({
        ...prev,
        watermark: { ...prev.watermark, position: 'custom', posX: pctX, posY: pctY }
      }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'text' || activeTool === 'logo' || activeTool === 'watermark') {
      setIsDragging(true);
      handleCanvasInteraction(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      handleCanvasInteraction(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      {warning && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
          {warning}
        </div>
      )}

      {!imageState.file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
          title={`Upload an image to ${tool.name.toLowerCase()}`}
          subtitle="Supports JPG, JPEG, PNG, or WEBP formats up to 15MB"
        />
      ) : (
        <div className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Preview Viewport */}
            <div className="lg:col-span-8 flex flex-col justify-center items-center bg-surface border border-border rounded-xl p-4 min-h-[450px]">
              {activeTool === 'crop' ? (
                <div className="relative rounded-xl border border-border bg-background/50 overflow-hidden min-h-[400px] flex items-center justify-center p-4 w-full select-none">
                  <div 
                    className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{
                      backgroundImage: `linear-gradient(45deg, var(--color-border) 25%, transparent 25%), 
                                        linear-gradient(-45deg, var(--color-border) 25%, transparent 25%), 
                                        linear-gradient(45deg, transparent 75%, var(--color-border) 75%), 
                                        linear-gradient(-45deg, transparent 75%, var(--color-border) 75%)`,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  />
                  <div className="max-w-full max-h-[58vh] flex justify-center items-center z-0">
                    <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        ref={cropImgRef} 
                        src={imageState.url!} 
                        alt="Crop bounding viewport" 
                        className="max-w-full max-h-[55vh] object-contain shadow-xs rounded-lg border border-border bg-white" 
                      />
                    </ReactCrop>
                  </div>
                </div>
              ) : (
                <EditorCanvas 
                  canvasRef={canvasRef} 
                  isLoading={canvasLoading || isProcessing} 
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
              )}
              
              {/* Privacy Message */}
              <p className="text-[10px] font-sans text-slate text-center mt-3">
                🔒 Your image is edited locally in your browser. Nothing is uploaded to any server.
              </p>
            </div>

            {/* Right Column: Settings Panel & Download */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-4 flex-1">
                
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <h3 className="font-display font-bold text-ink">{tool.name}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset} title="Reset adjustments">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClear} title="Load different image">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                  <EditorSettingsPanel
                    activeTool={activeTool}
                    settings={settings}
                    onChangeSettings={(s) => setSettings(s)}
                    originalWidth={imageState.width}
                    originalHeight={imageState.height}
                    logoFile={logoFile}
                    onLogoUpload={handleLogoUpload}
                    onLogoRemove={handleLogoRemove}
                    logoError={logoError}
                    setLogoError={setLogoError}
                  />
                </div>
                
                <div className="mt-auto pt-4 border-t border-border">
                  <DownloadImageButton
                    defaultFileName={`edited_${imageState.file.name}`}
                    onDownload={handleDownload}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
