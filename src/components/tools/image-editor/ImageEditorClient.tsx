"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { EditorCanvas } from './EditorCanvas';
import { EditorSidebar } from './EditorSidebar';
import { EditorSettingsPanel } from './EditorSettingsPanel';
import { EditorToolbar } from './EditorToolbar';
import { DownloadImageButton, DownloadParams } from './DownloadImageButton';
import { EditorSettings, EditorToolId, HistoryState, ImageState } from '../../../lib/image-editor/editorTypes';
import { renderImageWithSettings, getPreviewScaleFactor, getPositionCoordinates } from '../../../lib/image-editor/canvasHelpers';
import { downloadCanvasAsImage } from '../../../lib/image-editor/downloadHelpers';
import { validateImageFile } from '../../../lib/image-editor/validationHelpers';
import { Button } from '../../ui/Button';
import { Check, ZoomIn, ZoomOut } from 'lucide-react';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { TransformableOverlay } from '@/components/ui/TransformableOverlay';

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

function didBackgroundSettingsChange(prev: EditorSettings, current: EditorSettings): boolean {
  if (JSON.stringify(prev.crop) !== JSON.stringify(current.crop)) return true;
  if (JSON.stringify(prev.resize) !== JSON.stringify(current.resize)) return true;
  if (JSON.stringify(prev.rotate) !== JSON.stringify(current.rotate)) return true;
  if (JSON.stringify(prev.flip) !== JSON.stringify(current.flip)) return true;
  if (JSON.stringify(prev.blur) !== JSON.stringify(current.blur)) return true;
  if (JSON.stringify(prev.pixelate) !== JSON.stringify(current.pixelate)) return true;
  if (JSON.stringify(prev.grayscale) !== JSON.stringify(current.grayscale)) return true;
  if (JSON.stringify(prev.upscaler) !== JSON.stringify(current.upscaler)) return true;
  if (JSON.stringify(prev.enhancer) !== JSON.stringify(current.enhancer)) return true;
  if (JSON.stringify(prev.sharpen) !== JSON.stringify(current.sharpen)) return true;
  if (JSON.stringify(prev.denoiser) !== JSON.stringify(current.denoiser)) return true;
  if (JSON.stringify(prev.colorAdjust) !== JSON.stringify(current.colorAdjust)) return true;
  if (JSON.stringify(prev.brightnessContrast) !== JSON.stringify(current.brightnessContrast)) return true;
  if (JSON.stringify(prev.bwToColor) !== JSON.stringify(current.bwToColor)) return true;
  if (JSON.stringify(prev.colorToBw) !== JSON.stringify(current.colorToBw)) return true;
  
  if (prev.watermark.repeat || current.watermark.repeat) {
    if (JSON.stringify(prev.watermark) !== JSON.stringify(current.watermark)) return true;
  }
  
  return false;
}

export function ImageEditorClient() {
  const [imageState, setImageState] = useState<ImageState>({ file: null, url: null, width: 0, height: 0 });
  const [activeTool, setActiveTool] = useState<EditorToolId>('crop');
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);
  const [zoom, setZoom] = useState(100);
  
  const prevSettingsRef = useRef<EditorSettings>(DEFAULT_SETTINGS);
  const prevActiveToolRef = useRef<EditorToolId>('crop');
  const prevHistoryIndexRef = useRef<number>(-1);
  const prevLogoImgRef = useRef<HTMLImageElement | null>(null);
  
  // Crop states
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null);
  const cropImgRef = useRef<HTMLImageElement | null>(null);

  // History stack for Undo/Redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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

  // Safe URL references to prevent premature revocation and crossed-out boxes
  const createdUrlsRef = useRef<string[]>([]);

  const createSafeObjectURL = (file: File): string => {
    const url = URL.createObjectURL(file);
    createdUrlsRef.current.push(url);
    return url;
  };

  const getOverlayCoords = (
    position: 'topLeft' | 'topRight' | 'center' | 'bottomLeft' | 'bottomRight' | 'custom',
    posX: number,
    posY: number,
    elementW: number,
    elementH: number
  ) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const previewScaleFactor = getPreviewScaleFactor(imageState.width, imageState.height, settings);
    const pos = getPositionCoordinates(
      position,
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight,
      elementW,
      elementH,
      posX,
      posY,
      previewScaleFactor
    );
    return {
      x: pos.x + elementW / 2,
      y: pos.y + elementH / 2
    };
  };

  // Clean URLs on unmount
  useEffect(() => {
    return () => {
      if (imageState.url) URL.revokeObjectURL(imageState.url);
      createdUrlsRef.current.forEach(url => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
      history.forEach(state => {
        if (state.imageDataUrl.startsWith('blob:')) {
          URL.revokeObjectURL(state.imageDataUrl);
        }
      });
    };
  }, [imageState.url, history]);

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

      // Initialize history stack with original image
      const initialState: HistoryState = {
        imageDataUrl: url,
        activeTool: 'crop',
        settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
        logoFile: null
      };
      
      setHistory([initialState]);
      setHistoryIndex(0);
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

  // Re-render canvas whenever settings or active tool changes
  useEffect(() => {
    if (!activeImageRef.current || !canvasRef.current) return;

    const prevSettings = prevSettingsRef.current;
    prevSettingsRef.current = settings;

    const bgChanged = didBackgroundSettingsChange(prevSettings, settings);
    const shouldReRender = bgChanged ||
      activeTool !== prevActiveToolRef.current ||
      historyIndex !== prevHistoryIndexRef.current ||
      logoImg !== prevLogoImgRef.current;

    prevActiveToolRef.current = activeTool;
    prevHistoryIndexRef.current = historyIndex;
    prevLogoImgRef.current = logoImg;

    if (!shouldReRender) {
      return;
    }

    setCanvasLoading(true);
    const debounce = setTimeout(async () => {
      try {
        await renderImageWithSettings(
          activeImageRef.current!,
          canvasRef.current!,
          settings,
          logoImg,
          false,
          undefined,
          true // skipOverlays
        );
      } catch (err) {
        console.error('Render error:', err);
      } finally {
        setCanvasLoading(false);
      }
    }, 40);

    return () => clearTimeout(debounce);
  }, [settings, logoImg, activeTool, historyIndex]);

  // Load a historic baseline snapshot image
  const loadBaselineImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    });
  };

  const handleApply = async () => {
    if (!canvasRef.current) return;
    setIsProcessing(true);

    try {
      let dataUrl: string;

      if (activeTool === 'crop' && completedCrop && cropImgRef.current && activeImageRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not get 2d context");

        const img = activeImageRef.current;
        const scaleX = img.naturalWidth / cropImgRef.current.width;
        const scaleY = img.naturalHeight / cropImgRef.current.height;

        const srcX = completedCrop.x * scaleX;
        const srcY = completedCrop.y * scaleY;
        const srcW = completedCrop.width * scaleX;
        const srcH = completedCrop.height * scaleY;

        canvas.width = Math.max(1, srcW);
        canvas.height = Math.max(1, srcH);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

        dataUrl = canvas.toDataURL('image/png');
        
        // Reset crop settings
        setCrop(undefined);
        setCompletedCrop(null);
      } else {
        // Render at FULL RESOLUTION to an offscreen canvas to bake the layer edits
        const offscreenCanvas = document.createElement('canvas');
        await renderImageWithSettings(
          activeImageRef.current!,
          offscreenCanvas,
          settings,
          logoImg,
          true // isFullResolution = true
        );
        dataUrl = offscreenCanvas.toDataURL('image/png');
      }
      
      // 2. Load committed state as the new baseline image
      const newImg = await loadBaselineImage(dataUrl);
      activeImageRef.current = newImg;

      // Update image dimensions in state
      setImageState(prev => ({
        ...prev,
        width: newImg.naturalWidth,
        height: newImg.naturalHeight
      }));

      // 3. Clear/Reset active tool's parameters back to default (since they are now baked into the baseline)
      const newSettings = JSON.parse(JSON.stringify(settings));
      newSettings[activeTool] = JSON.parse(JSON.stringify(DEFAULT_SETTINGS[activeTool]));
      setSettings(newSettings);

      // 4. Update History Stack, stripping future states if user was in an undo branch
      const cleanHistory = history.slice(0, historyIndex + 1);
      const newState: HistoryState = {
        imageDataUrl: dataUrl,
        activeTool,
        settings: JSON.parse(JSON.stringify(newSettings)),
        logoFile
      };

      setHistory([...cleanHistory, newState]);
      setHistoryIndex(cleanHistory.length);
    } catch (err) {
      console.error(err);
      setError('Failed to commit edit layer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = async () => {
    if (historyIndex <= 0) return;
    const prevIdx = historyIndex - 1;
    setIsProcessing(true);
    try {
      const state = history[prevIdx];
      const img = await loadBaselineImage(state.imageDataUrl);
      activeImageRef.current = img;
      setSettings(JSON.parse(JSON.stringify(state.settings)));
      setLogoFile(state.logoFile);
      setHistoryIndex(prevIdx);
    } catch (err) {
      console.error(err);
      setError('Failed to undo last step.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRedo = async () => {
    if (historyIndex >= history.length - 1) return;
    const nextIdx = historyIndex + 1;
    setIsProcessing(true);
    try {
      const state = history[nextIdx];
      const img = await loadBaselineImage(state.imageDataUrl);
      activeImageRef.current = img;
      setSettings(JSON.parse(JSON.stringify(state.settings)));
      setLogoFile(state.logoFile);
      setHistoryIndex(nextIdx);
    } catch (err) {
      console.error(err);
      setError('Failed to redo next step.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    if (history.length === 0) return;
    setIsProcessing(true);
    try {
      const originalState = history[0];
      const img = await loadBaselineImage(originalState.imageDataUrl);
      activeImageRef.current = img;
      setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));
      setHistoryIndex(0);
      setLogoFile(null);
      setLogoImg(null);
    } catch (err) {
      console.error(err);
      setError('Failed to reset to original.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    if (imageState.url) URL.revokeObjectURL(imageState.url);
    setImageState({ file: null, url: null, width: 0, height: 0 });
    activeImageRef.current = null;
    setHistory([]);
    setHistoryIndex(-1);
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
      // Render final layer edits at full resolution on a separate offscreen canvas
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
    <ToolLayout
      title="Image Editor Tools"
      description="Professional workspace to upscale, enhance, adjust color, watermark, and overlay text/logos. Processed locally in your browser."
      categoryName="Image Tools"
      categoryHref="/tools"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      {!imageState.file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.svg'] }}
          title="Upload an image to start editing"
          subtitle="Supports JPG, JPEG, PNG, or WEBP formats up to 15MB"
        />
      ) : (
        <div className="flex flex-col gap-6">
          
          {/* Main workspace layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Sidebar Toolkit */}
            <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-4 flex flex-col">
              <EditorSidebar 
                activeTool={activeTool} 
                onChangeTool={(tool) => setActiveTool(tool)} 
              />
            </div>

            {/* Center Column: Preview Viewport */}
            <div className="lg:col-span-6 flex flex-col items-center bg-surface border border-border rounded-xl p-4 min-h-[450px]">
              {activeTool !== 'crop' && (
                <div className="flex items-center gap-2 mb-4 bg-background/80 backdrop-blur-xs border border-border px-3 py-1.5 rounded-lg shadow-xs z-20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(prev => Math.max(25, prev - 25))}
                    disabled={zoom <= 25}
                    className="h-8 w-8 p-0"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-xs font-semibold font-mono min-w-[48px] text-center text-ink select-none">
                    {zoom}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(prev => Math.min(400, prev + 25))}
                    disabled={zoom >= 400}
                    className="h-8 w-8 p-0"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <div className="h-4 w-[1px] bg-border mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(100)}
                    disabled={zoom === 100}
                    className="px-2 h-8 text-xs text-ink hover:text-primary"
                  >
                    Reset
                  </Button>
                </div>
              )}

              {activeTool === 'crop' ? (
                <div className="relative rounded-xl border border-border bg-background/50 overflow-hidden min-h-[400px] flex items-center justify-center p-4 w-full select-none">
                  {/* Checkerboard transparency grid background */}
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
                        src={history[historyIndex]?.imageDataUrl || imageState.url!} 
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
                  zoom={zoom}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Text Overlay */}
                  {settings.text.content.trim() !== '' && canvasRef.current && (
                    <TransformableOverlay
                      isActive={activeTool === 'text'}
                      onSelect={() => {}}
                      zoom={zoom}
                      x={getOverlayCoords(
                        settings.text.position,
                        settings.text.posX,
                        settings.text.posY,
                        settings.text.fontSize * 4,
                        settings.text.fontSize * 1.5
                      ).x}
                      y={getOverlayCoords(
                        settings.text.position,
                        settings.text.posX,
                        settings.text.posY,
                        settings.text.fontSize * 4,
                        settings.text.fontSize * 1.5
                      ).y}
                      width={settings.text.fontSize * 4}
                      height={settings.text.fontSize * 1.5}
                      rotation={settings.text.rotation}
                      lockAspect={false}
                      onChange={(updates) => {
                        if (canvasRef.current) {
                          const px = Math.min(100, Math.max(0, (updates.x / canvasRef.current.offsetWidth) * 100));
                          const py = Math.min(100, Math.max(0, (updates.y / canvasRef.current.offsetHeight) * 100));
                          const newFontSize = Math.max(8, updates.height / 1.5);
                          setSettings(s => ({ ...s, text: { ...s.text, position: 'custom', posX: px, posY: py, rotation: updates.rotation, fontSize: newFontSize } }));
                        }
                      }}
                    >
                      <div style={{
                        color: settings.text.color,
                        opacity: settings.text.opacity / 100,
                        fontFamily: settings.text.fontFamily,
                        fontSize: `${settings.text.fontSize}px`,
                        fontWeight: settings.text.bold ? 'bold' : 'normal',
                        fontStyle: settings.text.italic ? 'italic' : 'normal',
                        backgroundColor: settings.text.bgColor !== 'transparent' ? settings.text.bgColor : undefined,
                        padding: '4px 8px',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%'
                      }}>
                        {settings.text.content}
                      </div>
                    </TransformableOverlay>
                  )}

                  {/* Logo Overlay */}
                  {logoImg && settings.logo.url && canvasRef.current && (
                    <TransformableOverlay
                      isActive={activeTool === 'logo'}
                      onSelect={() => {}}
                      zoom={zoom}
                      x={getOverlayCoords(
                        settings.logo.position,
                        settings.logo.posX,
                        settings.logo.posY,
                        (settings.logo.size / 100) * canvasRef.current.offsetWidth,
                        ((settings.logo.size / 100) * canvasRef.current.offsetWidth) * (logoImg.naturalHeight / logoImg.naturalWidth)
                      ).x}
                      y={getOverlayCoords(
                        settings.logo.position,
                        settings.logo.posX,
                        settings.logo.posY,
                        (settings.logo.size / 100) * canvasRef.current.offsetWidth,
                        ((settings.logo.size / 100) * canvasRef.current.offsetWidth) * (logoImg.naturalHeight / logoImg.naturalWidth)
                      ).y}
                      width={(settings.logo.size / 100) * canvasRef.current.offsetWidth}
                      height={((settings.logo.size / 100) * canvasRef.current.offsetWidth) * (logoImg.naturalHeight / logoImg.naturalWidth)}
                      rotation={settings.logo.rotation}
                      lockAspect={settings.logo.lockAspect}
                      onChange={(updates) => {
                        if (canvasRef.current) {
                          const px = Math.min(100, Math.max(0, (updates.x / canvasRef.current.offsetWidth) * 100));
                          const py = Math.min(100, Math.max(0, (updates.y / canvasRef.current.offsetHeight) * 100));
                          const size = Math.min(100, Math.max(5, (updates.width / canvasRef.current.offsetWidth) * 100));
                          setSettings(s => ({ ...s, logo: { ...s.logo, position: 'custom', posX: px, posY: py, rotation: updates.rotation, size } }));
                        }
                      }}
                    >
                      <img 
                        src={settings.logo.url} 
                        alt="Logo" 
                        style={{ 
                          opacity: settings.logo.opacity / 100,
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain'
                        }} 
                      />
                    </TransformableOverlay>
                  )}

                  {/* Watermark Overlay */}
                  {settings.watermark.text.trim() !== '' && !settings.watermark.repeat && canvasRef.current && (
                    <TransformableOverlay
                      isActive={activeTool === 'watermark'}
                      onSelect={() => {}}
                      zoom={zoom}
                      x={getOverlayCoords(
                        settings.watermark.position,
                        settings.watermark.posX,
                        settings.watermark.posY,
                        settings.watermark.fontSize * 5,
                        settings.watermark.fontSize * 1.5
                      ).x}
                      y={getOverlayCoords(
                        settings.watermark.position,
                        settings.watermark.posX,
                        settings.watermark.posY,
                        settings.watermark.fontSize * 5,
                        settings.watermark.fontSize * 1.5
                      ).y}
                      width={settings.watermark.fontSize * 5}
                      height={settings.watermark.fontSize * 1.5}
                      rotation={settings.watermark.rotation}
                      lockAspect={false}
                      onChange={(updates) => {
                        if (canvasRef.current) {
                          const px = Math.min(100, Math.max(0, (updates.x / canvasRef.current.offsetWidth) * 100));
                          const py = Math.min(100, Math.max(0, (updates.y / canvasRef.current.offsetHeight) * 100));
                          const newFontSize = Math.max(8, updates.height / 1.5);
                          setSettings(s => ({ ...s, watermark: { ...s.watermark, position: 'custom', posX: px, posY: py, rotation: updates.rotation, fontSize: newFontSize } }));
                        }
                      }}
                    >
                      <div style={{
                        color: settings.watermark.color,
                        opacity: settings.watermark.opacity / 100,
                        fontFamily: settings.watermark.fontFamily,
                        fontSize: `${settings.watermark.fontSize}px`,
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%'
                      }}>
                        {settings.watermark.text}
                      </div>
                    </TransformableOverlay>
                  )}
                </EditorCanvas>
              )}
              
              {/* Privacy Message */}
              <p className="text-[10px] font-sans text-slate text-center mt-3">
                🔒 Your image is edited locally in your browser. Nothing is uploaded to any server.
              </p>
            </div>

            {/* Right Column: Settings Panel */}
            <div className="lg:col-span-3 flex flex-col gap-4">
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
              
              {/* Apply settings to baseline button */}
              <Button
                variant="primary"
                onClick={handleApply}
                disabled={canvasLoading || isProcessing}
                className="w-full flex items-center justify-center gap-1.5 shadow-sm"
                leftIcon={<Check className="w-4 h-4" />}
              >
                Apply Edit Layer
              </Button>
            </div>

          </div>

          {/* Action Toolbar */}
          <EditorToolbar
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onReset={handleReset}
            onClear={handleClear}
          />

          {/* Final Exporter block */}
          <DownloadImageButton
            defaultFileName={imageState.file.name}
            onDownload={handleDownload}
            isProcessing={isProcessing}
          />

        </div>
      )}
    </ToolLayout>
  );
}
