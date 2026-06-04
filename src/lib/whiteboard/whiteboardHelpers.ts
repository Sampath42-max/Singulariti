import * as fabric from 'fabric';
import { ShapeOptions, TextOptions } from './whiteboardTypes';

// Create a Rectangle
export function createRect(pointer: { x: number; y: number }, options: ShapeOptions) {
  return new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: 0,
    height: 0,
    fill: options.fillColor,
    stroke: options.strokeColor,
    strokeWidth: options.strokeWidth,
    opacity: options.opacity,
    strokeUniform: true,
    selectable: true,
    hasControls: true
  });
}

// Create a Circle
export function createCircle(pointer: { x: number; y: number }, options: ShapeOptions) {
  return new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 0,
    fill: options.fillColor,
    stroke: options.strokeColor,
    strokeWidth: options.strokeWidth,
    opacity: options.opacity,
    strokeUniform: true,
    selectable: true,
    hasControls: true
  });
}

// Create a Line
export function createLine(pointer: { x: number; y: number }, options: ShapeOptions) {
  return new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
    stroke: options.strokeColor,
    strokeWidth: options.strokeWidth,
    opacity: options.opacity,
    strokeUniform: true,
    selectable: true,
    hasControls: true
  });
}

// Create an Arrow Path
export function createArrow(pointer: { x: number; y: number }, options: ShapeOptions) {
  // Initially we return a line, we'll update it as the user drags
  const pathData = `M ${pointer.x} ${pointer.y} L ${pointer.x} ${pointer.y}`;
  return new fabric.Path(pathData, {
    stroke: options.strokeColor,
    strokeWidth: options.strokeWidth,
    fill: 'transparent',
    opacity: options.opacity,
    strokeLineCap: 'round',
    strokeLineJoin: 'round',
    strokeUniform: true,
    selectable: true,
    hasControls: true
  });
}

// Update Arrow Path coordinates
export function updateArrowPath(pathObj: fabric.Path, fromX: number, fromY: number, toX: number, toY: number) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  
  // Head length proportional to stroke width but capped
  const headLength = Math.max(12, Math.min(25, 10 + (pathObj.strokeWidth || 2) * 1.5));
  
  // Calculate head points
  const x1 = toX - headLength * Math.cos(angle - Math.PI / 6);
  const y1 = toY - headLength * Math.sin(angle - Math.PI / 6);
  const x2 = toX - headLength * Math.cos(angle + Math.PI / 6);
  const y2 = toY - headLength * Math.sin(angle + Math.PI / 6);

  const pathData = [
    ['M', fromX, fromY],
    ['L', toX, toY],
    ['M', toX, toY],
    ['L', x1, y1],
    ['M', toX, toY],
    ['L', x2, y2]
  ];

  const anyPath = pathObj as any;
  anyPath.set({ path: pathData });
  
  if (typeof anyPath._dimensionsAndPathOffset === 'function') {
    anyPath._dimensionsAndPathOffset();
  } else if (typeof anyPath._initPath === 'function') {
    anyPath._initPath();
  } else if (typeof anyPath.initialize === 'function') {
    anyPath.initialize(pathData, {
      stroke: pathObj.stroke,
      strokeWidth: pathObj.strokeWidth,
      fill: 'transparent',
      opacity: pathObj.opacity,
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      strokeUniform: true,
      selectable: true,
      hasControls: true
    });
  }
  
  pathObj.setCoords();
}

// Create a Text Box
export function createTextbox(pointer: { x: number; y: number }, options: TextOptions) {
  return new fabric.Textbox('Double click to edit', {
    left: pointer.x,
    top: pointer.y,
    fontFamily: options.fontFamily,
    fontSize: options.fontSize,
    fill: options.color,
    backgroundColor: options.backgroundColor || undefined,
    fontWeight: options.bold ? 'bold' : 'normal',
    fontStyle: options.italic ? 'italic' : 'normal',
    underline: options.underline,
    width: 200,
    splitByGrapheme: true,
    selectable: true,
    hasControls: true
  });
}

// Create a Sticky Note
export function createStickyNote(pointer: { x: number; y: number }, options: { bg: string; text: string }) {
  // A Textbox styled to look like a sticky note
  return new fabric.Textbox('Sticky Note\nDouble click to write', {
    left: pointer.x,
    top: pointer.y,
    width: 150,
    height: 150,
    fontSize: 15,
    fontFamily: 'Outfit',
    fill: options.text,
    backgroundColor: options.bg,
    textAlign: 'center',
    padding: 12,
    splitByGrapheme: true,
    rx: 4, // for roundness (supported in recent Fabric versions as rx/ry, or if not it will fallback to normal rect)
    ry: 4,
    shadow: new fabric.Shadow({
      color: 'rgba(0, 0, 0, 0.12)',
      blur: 6,
      offsetX: 3,
      offsetY: 3
    }),
    selectable: true,
    hasControls: true
  });
}

// Fit to screen - centers and zooms canvas to fit all elements
export function fitToScreen(canvas: fabric.Canvas) {
  const objects = canvas.getObjects();
  if (objects.length === 0) {
    canvas.setZoom(1);
    canvas.absolutePan(new fabric.Point(0, 0));
    return;
  }

  // Find bounding box of all objects
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  objects.forEach(obj => {
    const bound = obj.getBoundingRect();
    if (bound.left < minX) minX = bound.left;
    if (bound.top < minY) minY = bound.top;
    if (bound.left + bound.width > maxX) maxX = bound.left + bound.width;
    if (bound.top + bound.height > maxY) maxY = bound.top + bound.height;
  });

  const margin = 40;
  const boardWidth = maxX - minX + margin * 2;
  const boardHeight = maxY - minY + margin * 2;

  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const scaleX = canvasWidth / boardWidth;
  const scaleY = canvasHeight / boardHeight;
  let zoom = Math.min(scaleX, scaleY);

  // Limit zoom level
  zoom = Math.max(0.1, Math.min(zoom, 4));

  canvas.setZoom(zoom);

  // Center the bounding box
  const centerX = minX + (maxX - minX) / 2;
  const centerY = minY + (maxY - minY) / 2;

  const panX = centerX * zoom - canvasWidth / 2;
  const panY = centerY * zoom - canvasHeight / 2;

  canvas.absolutePan(new fabric.Point(panX, panY));
}
