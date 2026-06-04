import * as fabric from 'fabric';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

// Helper to save a Data URL using file-saver
export function saveDataUrl(dataUrl: string, fileName: string) {
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) throw new Error("Invalid data URL");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];
    
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Failed to save file:", error);
    throw error;
  }
}

// Export canvas as image (PNG or JPG)
export function exportToImage(
  canvas: fabric.Canvas,
  format: 'png' | 'jpeg',
  quality: number,
  fileName: string
) {
  const activeObjects = canvas.getObjects();
  if (activeObjects.length === 0) {
    throw new Error("EMPTY_BOARD");
  }

  // Backup current zoom & pan
  const currentZoom = canvas.getZoom();
  const currentTransform = canvas.viewportTransform ? [...canvas.viewportTransform] : null;

  // Reset zoom & pan to get absolute coordinate mappings
  canvas.setZoom(1);
  canvas.absolutePan(new fabric.Point(0, 0));

  // Find bounding box of all objects
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  activeObjects.forEach(obj => {
    const bound = obj.getBoundingRect();
    if (bound.left < minX) minX = bound.left;
    if (bound.top < minY) minY = bound.top;
    if (bound.left + bound.width > maxX) maxX = bound.left + bound.width;
    if (bound.top + bound.height > maxY) maxY = bound.top + bound.height;
  });

  const margin = 20;
  const left = minX - margin;
  const top = minY - margin;
  const width = maxX - minX + margin * 2;
  const height = maxY - minY + margin * 2;

  // Backup original canvas dimensions
  const originalWidth = canvas.getWidth();
  const originalHeight = canvas.getHeight();

  // Set temporary dimensions to match the bounding box of elements
  canvas.setDimensions({ width, height });
  canvas.viewportTransform = [1, 0, 0, 1, -left, -top];
  canvas.requestRenderAll();

  // Generate data URL
  const dataUrl = canvas.toDataURL({
    format: format === 'jpeg' ? 'jpeg' : 'png',
    quality: format === 'jpeg' ? quality : undefined,
    multiplier: 1
  });

  // Restore original dimensions and state
  canvas.setDimensions({ width: originalWidth, height: originalHeight });
  canvas.setZoom(currentZoom);
  if (currentTransform && canvas.viewportTransform) {
    for (let i = 0; i < 6; i++) {
      canvas.viewportTransform[i] = currentTransform[i];
    }
  }
  canvas.requestRenderAll();

  // Download
  const cleanName = fileName.trim() || 'whiteboard';
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  saveDataUrl(dataUrl, `${cleanName}.${ext}`);
}

// Export canvas as A4 PDF
export function exportToPDF(
  canvas: fabric.Canvas,
  orientation: 'portrait' | 'landscape',
  fileName: string
) {
  const activeObjects = canvas.getObjects();
  if (activeObjects.length === 0) {
    throw new Error("EMPTY_BOARD");
  }

  // Backup current zoom & pan
  const currentZoom = canvas.getZoom();
  const currentTransform = canvas.viewportTransform ? [...canvas.viewportTransform] : null;

  // Reset zoom & pan to get absolute coordinate mappings
  canvas.setZoom(1);
  canvas.absolutePan(new fabric.Point(0, 0));

  // Find bounding box
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  activeObjects.forEach(obj => {
    const bound = obj.getBoundingRect();
    if (bound.left < minX) minX = bound.left;
    if (bound.top < minY) minY = bound.top;
    if (bound.left + bound.width > maxX) maxX = bound.left + bound.width;
    if (bound.top + bound.height > maxY) maxY = bound.top + bound.height;
  });

  const margin = 20;
  const left = minX - margin;
  const top = minY - margin;
  const width = maxX - minX + margin * 2;
  const height = maxY - minY + margin * 2;

  // Backup original canvas dimensions
  const originalWidth = canvas.getWidth();
  const originalHeight = canvas.getHeight();

  // Set temporary dimensions to match the bounding box of elements
  canvas.setDimensions({ width, height });
  canvas.viewportTransform = [1, 0, 0, 1, -left, -top];
  canvas.requestRenderAll();

  // Get PNG data URL (since PDF requires lossless compression)
  const dataUrl = canvas.toDataURL({
    format: 'png',
    multiplier: 1
  });

  // Restore original dimensions and state
  canvas.setDimensions({ width: originalWidth, height: originalHeight });
  canvas.setZoom(currentZoom);
  if (currentTransform && canvas.viewportTransform) {
    for (let i = 0; i < 6; i++) {
      canvas.viewportTransform[i] = currentTransform[i];
    }
  }
  canvas.requestRenderAll();

  // Create jsPDF instance
  const pdf = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Margin in mm
  const pdfMargin = 10;
  const maxPdfW = pdfWidth - pdfMargin * 2;
  const maxPdfH = pdfHeight - pdfMargin * 2;

  const imgRatio = width / height;
  const pdfRatio = maxPdfW / maxPdfH;

  let finalW = maxPdfW;
  let finalH = maxPdfH;

  if (imgRatio > pdfRatio) {
    finalW = maxPdfW;
    finalH = maxPdfW / imgRatio;
  } else {
    finalH = maxPdfH;
    finalW = maxPdfH * imgRatio;
  }

  // Center image on the page
  const x = (pdfWidth - finalW) / 2;
  const y = (pdfHeight - finalH) / 2;

  pdf.addImage(dataUrl, 'PNG', x, y, finalW, finalH);

  const cleanName = fileName.trim() || 'whiteboard';
  pdf.save(`${cleanName}.pdf`);
}
