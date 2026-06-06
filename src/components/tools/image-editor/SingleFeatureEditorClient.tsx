"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { EditorCanvas } from './EditorCanvas';
import { EditorSettingsPanel } from './EditorSettingsPanel';
import { DownloadImageButton, DownloadParams } from './DownloadImageButton';
import { EditorSettings, EditorToolId, HistoryState, ImageState } from '../../../lib/image-editor/editorTypes';
import { renderImageWithSettings, getPreviewScaleFactor, getPositionCoordinates } from '../../../lib/image-editor/canvasHelpers';
import { downloadCanvasAsImage } from '../../../lib/image-editor/downloadHelpers';
import { validateImageFile } from '../../../lib/image-editor/validationHelpers';
import { Button } from '../../ui/Button';
import { Check, RotateCcw, Image as ImageIcon, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ToolRegistryItem } from '@/registry/types';
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

const initDefaultSettingsWithImageDims = (width: number, height: number): EditorSettings => {
  const s = JSON.parse(JSON.stringify(DEFAULT_SETTINGS)) as EditorSettings;
  s.resize.width = width;
  s.resize.height = height;
  s.upscaler.width = width;
  s.upscaler.height = height;
  return s;
};

interface Props {
  tool: ToolRegistryItem;
}

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

interface LogoOverlayState {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  rotation: number;
}

export function SingleFeatureEditorClient({ tool }: Props) {
  const activeTool = (tool.options?.action || 'crop') as EditorToolId;
  const isLogoTool = tool.id === 'add-logo-overlay';

  const [imageState, setImageState] = useState<ImageState>({ file: null, url: null, width: 0, height: 0 });
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);
  const [zoom, setZoom] = useState(100);

  // Logo overlay specific states and refs
  const [logoState, setLogoState] = useState<LogoOverlayState>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    opacity: 80,
    rotation: 0
  });

  const logoStateRef = useRef<LogoOverlayState>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    opacity: 80,
    rotation: 0
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const dragModeRef = useRef<'none' | 'drag' | 'rotate' | 'resize-tl' | 'resize-tr' | 'resize-bl' | 'resize-br'>('none');
  const startMousePosRef = useRef({ x: 0, y: 0 });
  const startLogoStateRef = useRef<LogoOverlayState>({ x: 0, y: 0, width: 100, height: 100, opacity: 80, rotation: 0 });
  const animationFrameIdRef = useRef<number | null>(null);

  const prevSettingsRef = useRef<EditorSettings>(DEFAULT_SETTINGS);
  const prevActiveToolRef = useRef<EditorToolId>('crop');
  const prevLogoImgRef = useRef<HTMLImageElement | null>(null);
  
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

  // --- START: ADD LOGO OVERLAY SPECIFIC CUSTOM CANVAS IMPLEMENTATION ---
  useEffect(() => {
    if (!isLogoTool || !viewportRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(viewportRef.current);
    return () => {
      observer.disconnect();
    };
  }, [isLogoTool, viewportRef.current]);

  const drawPreviewCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !activeImageRef.current || !imageState.width) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerHeight = 450;
    const scale = Math.min(containerWidth / imageState.width, containerHeight / imageState.height);
    const previewWidth = imageState.width * scale;
    const previewHeight = imageState.height * scale;

    const displayWidth = previewWidth * (zoom / 100);
    const displayHeight = previewHeight * (zoom / 100);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Draw base image
    ctx.drawImage(activeImageRef.current, 0, 0, displayWidth, displayHeight);

    // Draw logo if loaded
    if (logoImg && settings.logo.url) {
      const state = logoStateRef.current;

      const mapScaleX = displayWidth / imageState.width;
      const mapScaleY = displayHeight / imageState.height;

      const previewX = state.x * mapScaleX;
      const previewY = state.y * mapScaleY;
      const previewW = state.width * mapScaleX;
      const previewH = state.height * mapScaleY;

      ctx.save();
      ctx.translate(previewX + previewW / 2, previewY + previewH / 2);
      ctx.rotate((state.rotation * Math.PI) / 180);
      ctx.globalAlpha = state.opacity / 100;
      ctx.drawImage(logoImg, -previewW / 2, -previewH / 2, previewW, previewH);

      // Restore alpha, draw UI selection
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(-previewW / 2, -previewH / 2, previewW, previewH);
      ctx.setLineDash([]); // Reset

      // Handles
      const handleSize = 6;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 1.5;

      const drawHandle = (hx: number, hy: number) => {
        ctx.beginPath();
        ctx.rect(hx - handleSize / 2, hy - handleSize / 2, handleSize, handleSize);
        ctx.fill();
        ctx.stroke();
      };

      drawHandle(-previewW / 2, -previewH / 2); // tl
      drawHandle(previewW / 2, -previewH / 2);  // tr
      drawHandle(-previewW / 2, previewH / 2);  // bl
      drawHandle(previewW / 2, previewH / 2);   // br

      // Rotation handle
      ctx.beginPath();
      ctx.moveTo(0, -previewH / 2);
      ctx.lineTo(0, -previewH / 2 - 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -previewH / 2 - 20, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  };

  const requestDraw = () => {
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(() => {
      drawPreviewCanvas();
      animationFrameIdRef.current = null;
    });
  };

  // Sync settings changes to refs and redraw preview canvas
  useEffect(() => {
    if (!isLogoTool || !imageState.width || !logoImg) return;

    const logoW = (settings.logo.size / 100) * imageState.width;
    const logoH = settings.logo.lockAspect
      ? logoW * (logoImg.naturalHeight / logoImg.naturalWidth)
      : logoW;

    const pos = getPositionCoordinates(
      settings.logo.position,
      imageState.width,
      imageState.height,
      logoW,
      logoH,
      settings.logo.posX,
      settings.logo.posY,
      1
    );

    const newState = {
      x: pos.x,
      y: pos.y,
      width: logoW,
      height: logoH,
      opacity: settings.logo.opacity,
      rotation: settings.logo.rotation
    };

    const isDifferent =
      Math.abs(logoStateRef.current.x - newState.x) > 0.1 ||
      Math.abs(logoStateRef.current.y - newState.y) > 0.1 ||
      Math.abs(logoStateRef.current.width - newState.width) > 0.1 ||
      Math.abs(logoStateRef.current.height - newState.height) > 0.1 ||
      logoStateRef.current.opacity !== newState.opacity ||
      logoStateRef.current.rotation !== newState.rotation;

    if (isDifferent) {
      logoStateRef.current = newState;
      setLogoState(newState);
      requestDraw();
    }
  }, [settings.logo, logoImg, imageState.width, imageState.height, isLogoTool]);

  useEffect(() => {
    if (isLogoTool) {
      requestDraw();
    }
  }, [isLogoTool, containerWidth, zoom, logoImg]);

  const handleMouseDownLogo = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !imageState.width || !logoImg || !settings.logo.url) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const containerHeight = 450;
    const scale = Math.min(containerWidth / imageState.width, containerHeight / imageState.height);
    const previewWidth = imageState.width * scale;
    const previewHeight = imageState.height * scale;

    const displayWidth = previewWidth * (zoom / 100);
    const displayHeight = previewHeight * (zoom / 100);

    const mapScaleX = displayWidth / imageState.width;
    const mapScaleY = displayHeight / imageState.height;

    const state = logoStateRef.current;
    const previewX = state.x * mapScaleX;
    const previewY = state.y * mapScaleY;
    const previewW = state.width * mapScaleX;
    const previewH = state.height * mapScaleY;

    const cx = previewX + previewW / 2;
    const cy = previewY + previewH / 2;

    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const rad = -(state.rotation * Math.PI) / 180;
    const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const localY = dx * Math.sin(rad) + dy * Math.cos(rad);

    const handleSize = 10;
    let mode: typeof dragModeRef.current = 'none';

    const dist = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    if (dist(localX, localY, 0, -previewH / 2 - 20) <= handleSize + 2) {
      mode = 'rotate';
    } else if (dist(localX, localY, -previewW / 2, -previewH / 2) <= handleSize) {
      mode = 'resize-tl';
    } else if (dist(localX, localY, previewW / 2, -previewH / 2) <= handleSize) {
      mode = 'resize-tr';
    } else if (dist(localX, localY, -previewW / 2, previewH / 2) <= handleSize) {
      mode = 'resize-bl';
    } else if (dist(localX, localY, previewW / 2, previewH / 2) <= handleSize) {
      mode = 'resize-br';
    } else if (
      Math.abs(localX) <= previewW / 2 &&
      Math.abs(localY) <= previewH / 2
    ) {
      mode = 'drag';
    }

    if (mode !== 'none') {
      dragModeRef.current = mode;
      startMousePosRef.current = { x: mouseX, y: mouseY };
      startLogoStateRef.current = { ...state };
      setIsDragging(true);
    }
  };

  const handleMouseMoveLogo = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragModeRef.current === 'none' || !canvasRef.current || !imageState.width || !logoImg) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const containerHeight = 450;
    const scale = Math.min(containerWidth / imageState.width, containerHeight / imageState.height);
    const previewWidth = imageState.width * scale;
    const previewHeight = imageState.height * scale;

    const displayWidth = previewWidth * (zoom / 100);
    const displayHeight = previewHeight * (zoom / 100);

    const mapScaleX = displayWidth / imageState.width;
    const mapScaleY = displayHeight / imageState.height;

    const dx = mouseX - startMousePosRef.current.x;
    const dy = mouseY - startMousePosRef.current.y;

    const state = logoStateRef.current;
    const startState = startLogoStateRef.current;

    if (dragModeRef.current === 'drag') {
      const moveX = dx / mapScaleX;
      const moveY = dy / mapScaleY;

      let nextX = startState.x + moveX;
      let nextY = startState.y + moveY;

      nextX = Math.max(0, Math.min(imageState.width - startState.width, nextX));
      nextY = Math.max(0, Math.min(imageState.height - startState.height, nextY));

      logoStateRef.current.x = nextX;
      logoStateRef.current.y = nextY;
      requestDraw();
    } else if (dragModeRef.current === 'rotate') {
      const previewX = startState.x * mapScaleX;
      const previewY = startState.y * mapScaleY;
      const previewW = startState.width * mapScaleX;
      const previewH = startState.height * mapScaleY;
      const cx = previewX + previewW / 2;
      const cy = previewY + previewH / 2;

      const vx = mouseX - cx;
      const vy = mouseY - cy;
      const angleDeg = Math.round(Math.atan2(vx, -vy) * (180 / Math.PI));
      logoStateRef.current.rotation = angleDeg;
      requestDraw();
    } else {
      const startCX = startState.x + startState.width / 2;
      const startCY = startState.y + startState.height / 2;
      const rad = (startState.rotation * Math.PI) / 180;
      const cosVal = Math.cos(rad);
      const sinVal = Math.sin(rad);

      let localFixedX = 0;
      let localFixedY = 0;
      if (dragModeRef.current === 'resize-br') { localFixedX = -startState.width / 2; localFixedY = -startState.height / 2; }
      else if (dragModeRef.current === 'resize-bl') { localFixedX = startState.width / 2; localFixedY = -startState.height / 2; }
      else if (dragModeRef.current === 'resize-tr') { localFixedX = -startState.width / 2; localFixedY = startState.height / 2; }
      else if (dragModeRef.current === 'resize-tl') { localFixedX = startState.width / 2; localFixedY = startState.height / 2; }

      const fixedX = startCX + localFixedX * cosVal - localFixedY * sinVal;
      const fixedY = startCY + localFixedX * sinVal + localFixedY * cosVal;

      const mouseOrigX = mouseX / mapScaleX;
      const mouseOrigY = mouseY / mapScaleY;

      const vecX = mouseOrigX - fixedX;
      const vecY = mouseOrigY - fixedY;

      const newW = vecX * cosVal + vecY * sinVal;
      const newH = -vecX * sinVal + vecY * cosVal;

      let w = Math.abs(newW);
      let h = Math.abs(newH);

      if (settings.logo.lockAspect) {
        const aspect = logoImg.naturalWidth / logoImg.naturalHeight;
        h = w / aspect;
      }

      w = Math.min(imageState.width * 2, Math.max(10, w));
      h = Math.min(imageState.height * 2, Math.max(10, h));

      let signX = 1;
      let signY = 1;
      if (dragModeRef.current === 'resize-br') { signX = 1; signY = 1; }
      else if (dragModeRef.current === 'resize-bl') { signX = -1; signY = 1; }
      else if (dragModeRef.current === 'resize-tr') { signX = 1; signY = -1; }
      else if (dragModeRef.current === 'resize-tl') { signX = -1; signY = -1; }

      const newCX = fixedX + (w / 2) * signX * cosVal - (h / 2) * signY * sinVal;
      const newCY = fixedY + (w / 2) * signX * sinVal + (h / 2) * signY * cosVal;

      logoStateRef.current.width = w;
      logoStateRef.current.height = h;
      logoStateRef.current.x = newCX - w / 2;
      logoStateRef.current.y = newCY - h / 2;
      requestDraw();
    }
  };

  const handleMouseUpLogo = () => {
    if (dragModeRef.current !== 'none') {
      dragModeRef.current = 'none';
      setIsDragging(false);

      const finalState = { ...logoStateRef.current };
      setLogoState(finalState);

      const cx = finalState.x + finalState.width / 2;
      const cy = finalState.y + finalState.height / 2;
      const pctX = Math.min(100, Math.max(0, (cx / imageState.width) * 100));
      const pctY = Math.min(100, Math.max(0, (cy / imageState.height) * 100));
      const pctSize = Math.min(100, Math.max(5, (finalState.width / imageState.width) * 100));

      setSettings((prev) => ({
        ...prev,
        logo: {
          ...prev.logo,
          position: 'custom',
          posX: pctX,
          posY: pctY,
          size: pctSize,
          rotation: finalState.rotation
        }
      }));
    }
  };

  const updateCursorStyle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragModeRef.current !== 'none' || !canvasRef.current || !imageState.width || !logoImg) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const containerHeight = 450;
    const scale = Math.min(containerWidth / imageState.width, containerHeight / imageState.height);
    const previewWidth = imageState.width * scale;
    const previewHeight = imageState.height * scale;

    const displayWidth = previewWidth * (zoom / 100);
    const displayHeight = previewHeight * (zoom / 100);

    const mapScaleX = displayWidth / imageState.width;
    const mapScaleY = displayHeight / imageState.height;

    const state = logoStateRef.current;
    const previewX = state.x * mapScaleX;
    const previewY = state.y * mapScaleY;
    const previewW = state.width * mapScaleX;
    const previewH = state.height * mapScaleY;

    const cx = previewX + previewW / 2;
    const cy = previewY + previewH / 2;

    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const rad = -(state.rotation * Math.PI) / 180;
    const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const localY = dx * Math.sin(rad) + dy * Math.cos(rad);

    const handleSize = 10;
    const dist = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    if (dist(localX, localY, 0, -previewH / 2 - 20) <= handleSize + 2) {
      canvas.style.cursor = 'alias';
    } else if (
      dist(localX, localY, -previewW / 2, -previewH / 2) <= handleSize ||
      dist(localX, localY, previewW / 2, previewH / 2) <= handleSize
    ) {
      canvas.style.cursor = 'nwse-resize';
    } else if (
      dist(localX, localY, previewW / 2, -previewH / 2) <= handleSize ||
      dist(localX, localY, -previewW / 2, previewH / 2) <= handleSize
    ) {
      canvas.style.cursor = 'nesw-resize';
    } else if (
      Math.abs(localX) <= previewW / 2 &&
      Math.abs(localY) <= previewH / 2
    ) {
      canvas.style.cursor = 'move';
    } else {
      canvas.style.cursor = 'default';
    }
  };
  // --- END: ADD LOGO OVERLAY SPECIFIC CUSTOM CANVAS IMPLEMENTATION ---

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
      setSettings(initDefaultSettingsWithImageDims(initialWidth, initialHeight));

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
      setCompletedCrop(initialCrop);
    };
    img.onerror = () => {
      setError('Failed to load image. The file may be corrupted.');
    };
  };

  // Re-render canvas whenever settings changes
  useEffect(() => {
    if (isLogoTool) return;
    if (!activeImageRef.current || !canvasRef.current) return;

    const prevSettings = prevSettingsRef.current;
    prevSettingsRef.current = settings;

    const bgChanged = didBackgroundSettingsChange(prevSettings, settings);
    const shouldReRender = bgChanged ||
      activeTool !== prevActiveToolRef.current ||
      logoImg !== prevLogoImgRef.current;

    prevActiveToolRef.current = activeTool;
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
          activeTool,
          true
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
    if (activeImageRef.current) {
      const initialWidth = activeImageRef.current.naturalWidth;
      const initialHeight = activeImageRef.current.naturalHeight;
      setImageState(prev => ({
        ...prev,
        width: initialWidth,
        height: initialHeight
      }));
      
      setSettings(initDefaultSettingsWithImageDims(initialWidth, initialHeight));
      
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
      setCompletedCrop(initialCrop);
      setLogoFile(null);
      setLogoImg(null);

      if (isLogoTool) {
        logoStateRef.current = {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 80,
          rotation: 0
        };
        setLogoState({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 80,
          rotation: 0
        });
        requestDraw();
      }
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
    if (!activeImageRef.current) return;
    if (activeTool !== 'crop' && !canvasRef.current) return;

    setIsProcessing(true);
    try {
      if (isLogoTool) {
        if (!logoImg || !settings.logo.url) {
          setError("Please upload a logo first.");
          setIsProcessing(false);
          return;
        }

        const offscreenCanvas = document.createElement('canvas');
        const ctx = offscreenCanvas.getContext('2d');
        if (!ctx) throw new Error("Could not get 2d context");

        offscreenCanvas.width = imageState.width;
        offscreenCanvas.height = imageState.height;

        // 1. Draw base image at full resolution
        ctx.drawImage(activeImageRef.current!, 0, 0, imageState.width, imageState.height);

        // 2. Draw logo at original coordinates
        const state = logoStateRef.current;
        ctx.save();
        ctx.translate(state.x + state.width / 2, state.y + state.height / 2);
        ctx.rotate((state.rotation * Math.PI) / 180);
        ctx.globalAlpha = state.opacity / 100;
        ctx.drawImage(logoImg, -state.width / 2, -state.height / 2, state.width, state.height);
        ctx.restore();

        await downloadCanvasAsImage(offscreenCanvas, {
          fileName: params.fileName,
          format: params.format,
          quality: params.quality
        });
        
        setIsProcessing(false);
        return;
      }

      if (activeTool === 'crop' && completedCrop && cropImgRef.current) {
        const offscreenCanvas = document.createElement('canvas');
        const ctx = offscreenCanvas.getContext('2d');
        if (!ctx) throw new Error("Could not get 2d context");

        const img = activeImageRef.current;
        const scaleX = img.naturalWidth / cropImgRef.current.width;
        const scaleY = img.naturalHeight / cropImgRef.current.height;

        const pixelCrop = completedCrop.unit === '%'
          ? {
              x: (completedCrop.x / 100) * cropImgRef.current.width,
              y: (completedCrop.y / 100) * cropImgRef.current.height,
              width: (completedCrop.width / 100) * cropImgRef.current.width,
              height: (completedCrop.height / 100) * cropImgRef.current.height,
            }
          : completedCrop;

        const srcX = pixelCrop.x * scaleX;
        const srcY = pixelCrop.y * scaleY;
        const srcW = pixelCrop.width * scaleX;
        const srcH = pixelCrop.height * scaleY;

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
        true, // isFullResolution = true
        activeTool
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
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.svg'] }}
          title={`Upload an image to ${tool.name.toLowerCase()}`}
          subtitle="Supports JPG, JPEG, PNG, or WEBP formats up to 15MB"
        />
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          
          {/* Top: Preview Viewport */}
          <div className="flex flex-col items-center bg-surface border border-border rounded-xl p-4 min-h-[450px] w-full">
            {isLogoTool ? (
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
                  title="Reset Zoom"
                >
                  Reset Zoom
                </Button>
                <div className="h-4 w-[1px] bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZoom(100)}
                  disabled={zoom === 100}
                  className="px-2 h-8 text-xs text-ink hover:text-primary"
                  title="Fit to Screen"
                >
                  Fit to Screen
                </Button>
              </div>
            ) : (
              activeTool !== 'crop' && (
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
              )
            )}

            {isLogoTool ? (
              <div 
                ref={viewportRef}
                className="relative rounded-xl border border-border bg-background/50 overflow-auto min-h-[400px] w-full flex items-center justify-center p-4 select-none"
                style={{ height: '450px' }}
              >
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
                
                {(canvasLoading || isProcessing) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-xs z-10 transition-opacity">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="text-[12px] font-sans font-medium text-slate">Rendering changes...</span>
                    </div>
                  </div>
                )}

                <div className="relative inline-flex shadow-md rounded-lg border border-border bg-white z-0">
                  <canvas 
                    ref={canvasRef} 
                    onMouseDown={handleMouseDownLogo}
                    onMouseMove={(e) => {
                      if (dragModeRef.current !== 'none') {
                        handleMouseMoveLogo(e);
                      } else {
                        updateCursorStyle(e);
                      }
                    }}
                    onMouseUp={handleMouseUpLogo}
                    onMouseLeave={handleMouseUpLogo}
                    className="max-w-none rounded-lg" 
                  />
                </div>
              </div>
            ) : activeTool === 'crop' ? (
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
                    width={settings.text.fontSize * 4} // Approximation for bounding box
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

          {/* Bottom: Settings Panel & Download */}
          <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4">
            
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h3 className="font-display font-bold text-ink text-xl">{tool.name}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset} title="Reset adjustments">
                  <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear} title="Load different image">
                  <ImageIcon className="w-4 h-4 mr-1.5" /> New Image
                </Button>
              </div>
            </div>

            <div className="mb-2">
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
            
            <div className="pt-4 border-t border-border">
              <DownloadImageButton
                defaultFileName={`edited_${imageState.file.name}`}
                onDownload={handleDownload}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
