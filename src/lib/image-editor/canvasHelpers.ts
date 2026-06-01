import { EditorSettings } from './editorTypes';
import { sharpenImageData, denoiseImageData, enhanceImageData, bwToColorTone, colorToBw } from './filterHelpers';

interface PositionCoords {
  x: number;
  y: number;
}

export function getPositionCoordinates(
  position: 'topLeft' | 'topRight' | 'center' | 'bottomLeft' | 'bottomRight' | 'custom',
  canvasW: number,
  canvasH: number,
  elementW: number,
  elementH: number,
  customX: number, // 0 to 100 percentage
  customY: number, // 0 to 100 percentage
  scaleFactor: number = 1
): PositionCoords {
  const margin = 24 * scaleFactor;

  switch (position) {
    case 'topLeft':
      return { x: margin, y: margin };
    case 'topRight':
      return { x: canvasW - elementW - margin, y: margin };
    case 'center':
      return { x: (canvasW - elementW) / 2, y: (canvasH - elementH) / 2 };
    case 'bottomLeft':
      return { x: margin, y: canvasH - elementH - margin };
    case 'bottomRight':
      return { x: canvasW - elementW - margin, y: canvasH - elementH - margin };
    case 'custom':
    default:
      // Map percentage to canvas size, centering the element on that coordinate
      return {
        x: (customX / 100) * canvasW - elementW / 2,
        y: (customY / 100) * canvasH - elementH / 2
      };
  }
}

export function getPreviewScaleFactor(
  imageW: number,
  imageH: number,
  settings: EditorSettings
): number {
  let trueW = imageW;
  let trueH = imageH;

  const resize = settings.resize;
  if (resize && resize.width > 0 && resize.height > 0) {
    trueW = resize.width;
    trueH = resize.height;
  } else if (settings.upscaler) {
    const up = settings.upscaler;
    if (up.scale !== 'custom') {
      const factor = up.scale === '2x' ? 2 : up.scale === '3x' ? 3 : up.scale === '4x' ? 4 : 1;
      trueW = imageW * factor;
      trueH = imageH * factor;
    } else {
      trueW = up.width || imageW;
      trueH = up.height || imageH;
    }
  }

  let targetW = trueW;
  let targetH = trueH;

  const MAX_PREVIEW_SIZE = 800;
  if (targetW > MAX_PREVIEW_SIZE || targetH > MAX_PREVIEW_SIZE) {
    const ratio = targetW / targetH;
    if (targetW > targetH) {
      targetW = MAX_PREVIEW_SIZE;
      targetH = Math.round(MAX_PREVIEW_SIZE / ratio);
    } else {
      targetH = MAX_PREVIEW_SIZE;
      targetW = Math.round(MAX_PREVIEW_SIZE * ratio);
    }
  }

  return targetW / trueW;
}

/**
 * Runs the complete editing canvas pipeline sequentially.
 */
export async function renderImageWithSettings(
  originalImg: HTMLImageElement,
  canvas: HTMLCanvasElement,
  settings: EditorSettings,
  logoImg?: HTMLImageElement | null,
  isFullResolution: boolean = false,
  activeTool?: string,
  skipOverlays: boolean = false
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Calculate Target Dimensions (Resize or Upscaler)
  let trueW = originalImg.naturalWidth;
  let trueH = originalImg.naturalHeight;

  const resize = settings.resize;
  
  if (activeTool === 'upscaler' && settings.upscaler) {
    const up = settings.upscaler;
    if (up.scale !== 'custom') {
      const factor = up.scale === '2x' ? 2 : up.scale === '3x' ? 3 : up.scale === '4x' ? 4 : 1;
      trueW = originalImg.naturalWidth * factor;
      trueH = originalImg.naturalHeight * factor;
    } else {
      trueW = up.width || originalImg.naturalWidth;
      trueH = up.height || originalImg.naturalHeight;
    }
  } else if (resize && resize.width > 0 && resize.height > 0) {
    trueW = resize.width;
    trueH = resize.height;
  } else if (settings.upscaler) {
    const up = settings.upscaler;
    if (up.scale !== 'custom') {
      const factor = up.scale === '2x' ? 2 : up.scale === '3x' ? 3 : up.scale === '4x' ? 4 : 1;
      trueW = originalImg.naturalWidth * factor;
      trueH = originalImg.naturalHeight * factor;
    } else {
      trueW = up.width || originalImg.naturalWidth;
      trueH = up.height || originalImg.naturalHeight;
    }
  }

  let targetW = trueW;
  let targetH = trueH;

  // Capping preview canvas dimensions for smooth real-time rendering and filter visibility
  if (!isFullResolution) {
    const MAX_PREVIEW_SIZE = 800;
    if (targetW > MAX_PREVIEW_SIZE || targetH > MAX_PREVIEW_SIZE) {
      const ratio = targetW / targetH;
      if (targetW > targetH) {
        targetW = MAX_PREVIEW_SIZE;
        targetH = Math.round(MAX_PREVIEW_SIZE / ratio);
      } else {
        targetH = MAX_PREVIEW_SIZE;
        targetW = Math.round(MAX_PREVIEW_SIZE * ratio);
      }
    }
  }

  const scaleFactor = targetW / trueW; // Ratio to scale absolute text & overlay sizes

  // Calculate canvas dimensions taking rotation into account
  const angle = settings.rotate?.angle || 0;
  const rad = (angle * Math.PI) / 180;
  const flipH = settings.flip?.horizontal || false;
  const flipV = settings.flip?.vertical || false;

  let canvasW = targetW;
  let canvasH = targetH;

  if (angle !== 0) {
    canvasW = Math.abs(targetW * Math.cos(rad)) + Math.abs(targetH * Math.sin(rad));
    canvasH = Math.abs(targetW * Math.sin(rad)) + Math.abs(targetH * Math.cos(rad));
  }

  canvas.width = Math.max(1, Math.round(canvasW));
  canvas.height = Math.max(1, Math.round(canvasH));

  // 2. Draw base image with requested smoothing quality and rotation/flipping transformations
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = settings.upscaler?.quality || 'medium';

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(originalImg, -targetW / 2, -targetH / 2, targetW, targetH);
  ctx.restore();

  // 3. Apply Pixel-based filters (Clarity, Denoising, Sharpening, and Color conversions)
  const enh = settings.enhancer || {};
  const sh = settings.sharpen || { strength: 0 };
  const dn = settings.denoiser || { strength: 0 };
  const bwCol = settings.bwToColor || { mode: 'tint', tintColor: '#ffffff' };
  const colBw = settings.colorToBw || { mode: 'custom', contrast: 0 };
  const gamma = settings.colorAdjust?.gamma;

  const hasPixelFilters = 
    (enh.auto || enh.color || enh.clarity || enh.exposure || enh.saturation) ||
    (sh.strength > 0) ||
    (dn.strength > 0) ||
    (bwCol.mode !== 'tint' || (bwCol.tintColor !== '#ffffff' && bwCol.tintColor !== '')) ||
    (colBw.mode !== 'custom' || colBw.contrast !== 0) ||
    (gamma !== undefined && gamma !== 1.0);

  if (hasPixelFilters) {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // A. Image Enhancer
    if (enh.auto || enh.color || enh.clarity || enh.exposure || enh.saturation) {
      imgData = enhanceImageData(imgData, enh);
    }

    // B. Image Sharpen
    if (sh.strength > 0) {
      imgData = sharpenImageData(imgData, sh.strength);
    }

    // C. Image Denoiser
    if (dn.strength > 0) {
      imgData = denoiseImageData(imgData, dn.strength);
    }

    // D. Color conversions (Monochrome & Tone Tints)
    if (bwCol.mode !== 'tint' || bwCol.tintColor !== '#ffffff') {
      // If warm, cool, sepia, vintage or a custom tint color is active
      if (bwCol.mode !== 'tint' || bwCol.tintColor !== '') {
        imgData = bwToColorTone(imgData, bwCol.mode, bwCol.tintColor);
      }
    }

    if (colBw.mode !== 'custom' || colBw.contrast !== 0) {
      imgData = colorToBw(imgData, colBw.mode, colBw.contrast);
    }

    // E. Gamma Correction
    if (gamma !== undefined && gamma !== 1.0) {
      const invGamma = 1 / gamma;
      const data = imgData.data;
      const lut = new Uint8Array(256);
      for (let i = 0; i < 256; i++) {
        lut[i] = Math.min(255, Math.max(0, Math.pow(i / 255, invGamma) * 255));
      }
      for (let i = 0; i < data.length; i += 4) {
        data[i] = lut[data[i]];
        data[i+1] = lut[data[i+1]];
        data[i+2] = lut[data[i+2]];
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  // 4. Apply Adjustments (Brightness, Contrast, Saturation, Gamma, Temperature) using Context filters & overlays
  const adj = settings.colorAdjust;
  const bc = settings.brightnessContrast;

  // Create temporary canvas to apply global filters
  const filterCanvas = document.createElement('canvas');
  filterCanvas.width = canvas.width;
  filterCanvas.height = canvas.height;
  const fCtx = filterCanvas.getContext('2d');
  if (fCtx) {
    fCtx.drawImage(canvas, 0, 0);

    // Clear main canvas for filter redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Map sliders (-100 to 100) to standard CSS filter values (percentage/degrees)
    const brightnessVal = 100 + bc.brightness; // e.g. 100% normal, 120% brighter
    const contrastVal = 100 + bc.contrast;
    const saturationVal = 100 + adj.saturation + adj.vibrance * 0.5; // Vibrance maps partially to saturate
    const hueVal = adj.hue; // Degrees rotation

    // Highlights & Shadows compensation adjustments
    let brightnessCorrection = 0;
    if (bc.highlights !== 0) brightnessCorrection += (bc.highlights / 100) * 15;
    if (bc.shadows !== 0) brightnessCorrection += (bc.shadows / 100) * 10;

    let filterString = `brightness(${brightnessVal + brightnessCorrection}%) contrast(${contrastVal}%) saturate(${saturationVal}%) hue-rotate(${hueVal}deg)`;
    if (settings.blur && settings.blur.strength > 0) {
      filterString += ` blur(${settings.blur.strength}px)`;
    }
    if (settings.grayscale && settings.grayscale.enabled) {
      filterString += ` grayscale(100%)`;
    }
    ctx.filter = filterString;
    ctx.drawImage(filterCanvas, 0, 0);
    ctx.restore();
  }

  // Draw Warmth (Temperature) & Tint overlays
  if (adj.temperature !== 0) {
    ctx.save();
    ctx.globalCompositeOperation = 'color-burn';
    // Temperature: warm is orange, cool is blue
    ctx.fillStyle = adj.temperature > 0 ? 'rgba(255, 120, 0, 0.05)' : 'rgba(0, 100, 255, 0.05)';
    ctx.globalAlpha = Math.abs(adj.temperature) / 100;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  if (adj.tint !== 0) {
    ctx.save();
    ctx.globalCompositeOperation = 'hue';
    // Tint: positive magenta, negative green
    ctx.fillStyle = adj.tint > 0 ? 'rgba(255, 0, 255, 0.05)' : 'rgba(0, 255, 0, 0.05)';
    ctx.globalAlpha = Math.abs(adj.tint) / 100;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  // 4.5 Apply Pixelate filter
  if (settings.pixelate && settings.pixelate.size > 1) {
    const size = settings.pixelate.size;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = Math.max(1, Math.round(canvas.width / size));
    tempCanvas.height = Math.max(1, Math.round(canvas.height / size));
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }

  // 5. Add Text overlays
  const txt = settings.text;
  if (!skipOverlays && txt.content.trim() !== '') {
    ctx.save();
    
    // Set Font Styling
    const boldStr = txt.bold ? 'bold' : '';
    const italicStr = txt.italic ? 'italic' : '';
    const renderedFontSize = txt.fontSize * scaleFactor;
    ctx.font = `${boldStr} ${italicStr} ${renderedFontSize}px ${txt.fontFamily}`;
    
    const textMetrics = ctx.measureText(txt.content);
    const textW = textMetrics.width;
    const textH = renderedFontSize; // Approximation

    const pos = getPositionCoordinates(
      txt.position,
      canvas.width,
      canvas.height,
      textW,
      textH,
      txt.posX,
      txt.posY,
      scaleFactor
    );

    // Apply rotation
    ctx.translate(pos.x + textW / 2, pos.y + textH / 2);
    ctx.rotate((txt.rotation * Math.PI) / 180);

    // Draw background block if set
    if (txt.bgColor && txt.bgColor !== 'transparent') {
      ctx.fillStyle = txt.bgColor;
      ctx.fillRect(-textW / 2 - 8 * scaleFactor, -textH / 2 - 4 * scaleFactor, textW + 16 * scaleFactor, textH + 8 * scaleFactor);
    }

    // Draw Text content
    ctx.fillStyle = txt.color;
    ctx.globalAlpha = txt.opacity / 100;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(txt.content, 0, 0);

    ctx.restore();
  }

  // 6. Draw Logo Overlays
  const logo = settings.logo;
  if (!skipOverlays && logoImg && logo.url) {
    ctx.save();

    // Size calculation (logo.size represents % of canvas width)
    const logoW = (logo.size / 100) * canvas.width;
    const logoAspect = logoImg.naturalHeight / logoImg.naturalWidth;
    const logoH = logo.lockAspect ? logoW * logoAspect : logoW;

    const pos = getPositionCoordinates(
      logo.position,
      canvas.width,
      canvas.height,
      logoW,
      logoH,
      logo.posX,
      logo.posY,
      scaleFactor
    );

    ctx.translate(pos.x + logoW / 2, pos.y + logoH / 2);
    ctx.rotate((logo.rotation * Math.PI) / 180);
    ctx.globalAlpha = logo.opacity / 100;
    ctx.drawImage(logoImg, -logoW / 2, -logoH / 2, logoW, logoH);

    ctx.restore();
  }

  // 7. Add Watermarks
  const wm = settings.watermark;
  const shouldSkipWatermark = skipOverlays && !wm.repeat;
  if (!shouldSkipWatermark && wm.text.trim() !== '') {
    ctx.save();
    const renderedWmFontSize = wm.fontSize * scaleFactor;
    ctx.font = `${renderedWmFontSize}px ${wm.fontFamily}`;
    ctx.fillStyle = wm.color;
    ctx.globalAlpha = wm.opacity / 100;

    const textMetrics = ctx.measureText(wm.text);
    const wmW = textMetrics.width;
    const wmH = renderedWmFontSize;

    if (wm.repeat) {
      // Repeat pattern across the entire canvas
      const xSpacing = wmW + 120 * scaleFactor;
      const ySpacing = wmH + 100 * scaleFactor;

      for (let y = 30 * scaleFactor; y < canvas.height + ySpacing; y += ySpacing) {
        for (let x = 30 * scaleFactor; x < canvas.width + xSpacing; x += xSpacing) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((wm.rotation * Math.PI) / 180);
          ctx.fillText(wm.text, 0, 0);
          ctx.restore();
        }
      }
    } else {
      // Draw watermark in a single selected location
      const pos = getPositionCoordinates(
        wm.position,
        canvas.width,
        canvas.height,
        wmW,
        wmH,
        wm.posX,
        wm.posY,
        scaleFactor
      );
      ctx.translate(pos.x + wmW / 2, pos.y + wmH / 2);
      ctx.rotate((wm.rotation * Math.PI) / 180);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(wm.text, 0, 0);
    }

    ctx.restore();
  }
}
