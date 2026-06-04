import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as fabric from 'fabric';
import {
  WhiteboardTool,
  BrushOptions,
  ShapeOptions,
  TextOptions,
  StickyNoteOptions
} from '@/lib/whiteboard/whiteboardTypes';
import {
  createRect,
  createCircle,
  createLine,
  createArrow,
  updateArrowPath,
  createTextbox,
  createStickyNote,
  fitToScreen
} from '@/lib/whiteboard/whiteboardHelpers';

interface WhiteboardCanvasProps {
  activeTool: WhiteboardTool;
  brush: BrushOptions;
  shape: ShapeOptions;
  text: TextOptions;
  sticky: StickyNoteOptions;
  onZoomChange: (zoom: number) => void;
  onSelectionChange: (type: string | null, props: any) => void;
  onHistoryChange: (canUndo: boolean, canRedo: boolean) => void;
  onWarning: (msg: string | null) => void;
  onError: (msg: string | null) => void;
}

export interface WhiteboardCanvasRef {
  getCanvas: () => fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  zoomToFit: () => void;
  uploadImage: (file: File) => void;
}

export const WhiteboardCanvas = forwardRef<WhiteboardCanvasRef, WhiteboardCanvasProps>(({
  activeTool,
  brush,
  shape,
  text,
  sticky,
  onZoomChange,
  onSelectionChange,
  onHistoryChange,
  onWarning,
  onError
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // Drawing state
  const isDrawingShape = useRef(false);
  const shapeStartPointer = useRef<{ x: number; y: number } | null>(null);
  const activeShapeObject = useRef<fabric.Object | null>(null);

  // History stacks
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const isHandlingHistory = useRef(false);

  // Track active tool via ref for event handlers
  const activeToolRef = useRef<WhiteboardTool>(activeTool);
  useEffect(() => {
    activeToolRef.current = activeTool;
    updateCanvasInteractions();
  }, [activeTool, brush, shape, text, sticky]);

  // Handle Undo/Redo tracking helper
  const saveHistoryState = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || isHandlingHistory.current) return;

    const stateJson = JSON.stringify((canvas as any).toJSON(['isSticky', 'selectable', 'hasControls']));
    
    // Avoid duplicate pushes
    if (undoStack.current.length > 0 && undoStack.current[undoStack.current.length - 1] === stateJson) {
      return;
    }

    undoStack.current.push(stateJson);
    redoStack.current = []; // Clear redo stack on new action
    
    // Limit stack size to 50 to prevent memory pressure
    if (undoStack.current.length > 50) {
      undoStack.current.shift();
    }

    onHistoryChange(undoStack.current.length > 0, redoStack.current.length > 0);
  };

  // Perform Undo
  const handleUndo = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || undoStack.current.length === 0) return;

    isHandlingHistory.current = true;
    const currentState = JSON.stringify((canvas as any).toJSON(['isSticky', 'selectable', 'hasControls']));
    redoStack.current.push(currentState);

    const prevState = undoStack.current.pop()!;
    
    canvas.loadFromJSON(prevState, () => {
      // Re-initialize properties
      canvas.getObjects().forEach((obj) => {
        obj.set({
          selectable: true,
          hasControls: true
        });
        obj.setCoords();
      });
      canvas.requestRenderAll();
      isHandlingHistory.current = false;
      onHistoryChange(undoStack.current.length > 0, redoStack.current.length > 0);
    });
  };

  // Perform Redo
  const handleRedo = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    isHandlingHistory.current = true;
    const currentState = JSON.stringify((canvas as any).toJSON(['isSticky', 'selectable', 'hasControls']));
    undoStack.current.push(currentState);

    const nextState = redoStack.current.pop()!;

    canvas.loadFromJSON(nextState, () => {
      canvas.getObjects().forEach((obj) => {
        obj.set({
          selectable: true,
          hasControls: true
        });
        obj.setCoords();
      });
      canvas.requestRenderAll();
      isHandlingHistory.current = false;
      onHistoryChange(undoStack.current.length > 0, redoStack.current.length > 0);
    });
  };

  // Clear Canvas
  const handleClearCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (canvas.getObjects().length === 0) return;

    saveHistoryState();
    canvas.clear();
    canvas.backgroundColor = '#FFFFFF';
    canvas.requestRenderAll();
    saveHistoryState();
  };

  // Image Upload helper
  const handleImageUpload = (file: File) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      onError("Unsupported file format. Please upload JPG, PNG, or WEBP.");
      return;
    }

    // Warning for large images (e.g. > 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onWarning("This image is large. It might affect canvas performance.");
    }

    const reader = new FileReader();
    reader.onload = (fEvent) => {
      const data = fEvent.target?.result;
      if (typeof data !== 'string') {
        onError("Failed to read image data.");
        return;
      }

      fabric.Image.fromURL(data, { crossOrigin: 'anonymous' })
        .then((img) => {
          // Scale down image if it is larger than the canvas viewport
          const maxW = canvas.getWidth() * 0.6;
          const maxH = canvas.getHeight() * 0.6;

          let scale = 1;
          if (img.width && img.width > maxW) {
            scale = maxW / img.width;
          }
          if (img.height && img.height * scale > maxH) {
            scale = maxH / img.height;
          }

          img.set({
            left: canvas.getWidth() / 4,
            top: canvas.getHeight() / 4,
            scaleX: scale,
            scaleY: scale,
            selectable: true,
            hasControls: true
          });

          saveHistoryState();
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.requestRenderAll();
        })
        .catch((err) => {
          console.error("Failed to load image:", err);
          onError("Failed to load image on canvas.");
        });
    };

    reader.onerror = () => {
      onError("Failed to upload image.");
    };

    reader.readAsDataURL(file);
  };

  // Zoom helpers
  const handleZoom = (factor: number) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    let zoom = canvas.getZoom() * factor;
    zoom = Math.max(0.1, Math.min(zoom, 10)); // bounds
    canvas.zoomToPoint(new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2), zoom);
    onZoomChange(zoom);
  };

  const handleResetZoom = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.setZoom(1);
    canvas.absolutePan(new fabric.Point(0, 0));
    onZoomChange(1);
  };

  const handleZoomToFit = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    fitToScreen(canvas);
    onZoomChange(canvas.getZoom());
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    getCanvas: () => fabricCanvasRef.current,
    undo: handleUndo,
    redo: handleRedo,
    clearCanvas: handleClearCanvas,
    zoomIn: () => handleZoom(1.2),
    zoomOut: () => handleZoom(1 / 1.2),
    resetZoom: handleResetZoom,
    zoomToFit: handleZoomToFit,
    uploadImage: handleImageUpload
  }));

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Get width and height from container
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 550;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#FFFFFF',
      selection: true, // allow group selection
      preserveObjectStacking: true // keep overlapping order
    });

    fabricCanvasRef.current = canvas;

    // Track selections
    const updateSelection = () => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj) {
        onSelectionChange(null, null);
        return;
      }

      onSelectionChange(activeObj.type || null, {
        stroke: activeObj.stroke,
        fill: activeObj.fill,
        strokeWidth: activeObj.strokeWidth,
        opacity: activeObj.opacity,
        fontFamily: (activeObj as any).fontFamily,
        fontSize: (activeObj as any).fontSize,
        fontWeight: (activeObj as any).fontWeight,
        fontStyle: (activeObj as any).fontStyle,
        underline: (activeObj as any).underline,
        backgroundColor: activeObj.backgroundColor,
        isSticky: (activeObj as any).isSticky
      });
    };

    canvas.on('selection:created', updateSelection);
    canvas.on('selection:updated', updateSelection);
    canvas.on('selection:cleared', updateSelection);

    // Save history on changes
    canvas.on('object:modified', saveHistoryState);
    canvas.on('object:added', (e) => {
      // Do not log temp shapes or lines being actively dragged
      if (!isDrawingShape.current && !isHandlingHistory.current) {
        saveHistoryState();
      }
    });
    canvas.on('object:removed', () => {
      if (!isHandlingHistory.current) {
        saveHistoryState();
      }
    });

    // Mouse Wheel Zoom
    canvas.on('mouse:wheel', (opt) => {
      const evt = opt.e;
      evt.preventDefault();
      evt.stopPropagation();

      const delta = evt.deltaY;
      let zoom = canvas.getZoom();
      zoom = zoom * (delta > 0 ? 0.95 : 1.05);
      zoom = Math.max(0.1, Math.min(zoom, 10)); // bounds

      canvas.zoomToPoint(new fabric.Point(opt.e.offsetX, opt.e.offsetY), zoom);
      canvas.requestRenderAll();
      onZoomChange(zoom);
    });

    // Drag-to-Pan and Shape Drawing Mouse Events
    let isMouseDown = false;
    let lastX = 0;
    let lastY = 0;

    const getEventCoords = (e: any) => {
      if (e.touches && e.touches.length > 0) {
        return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      }
      return { clientX: e.clientX || 0, clientY: e.clientY || 0 };
    };

    canvas.on('mouse:down', (opt) => {
      const pointer = canvas.getScenePoint(opt.e);
      const tool = activeToolRef.current;
      isMouseDown = true;

      // Panning Mode
      if (tool === 'pan') {
        const coords = getEventCoords(opt.e);
        lastX = coords.clientX;
        lastY = coords.clientY;
        canvas.selection = false;
        return;
      }

      // Eraser click-to-delete
      if (tool === 'eraser' && opt.target) {
        saveHistoryState();
        canvas.remove(opt.target);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        return;
      }

      // Drawing Shapes
      if (['rect', 'circle', 'line', 'arrow'].includes(tool)) {
        isDrawingShape.current = true;
        shapeStartPointer.current = pointer;

        let newObj: fabric.Object | null = null;
        if (tool === 'rect') {
          newObj = createRect(pointer, shape);
        } else if (tool === 'circle') {
          newObj = createCircle(pointer, shape);
        } else if (tool === 'line') {
          newObj = createLine(pointer, shape);
        } else if (tool === 'arrow') {
          newObj = createArrow(pointer, shape);
        }

        if (newObj) {
          activeShapeObject.current = newObj;
          canvas.add(newObj);
          canvas.setActiveObject(newObj);
          canvas.requestRenderAll();
        }
        return;
      }

      // Drawing Text & Sticky Notes
      if (tool === 'text' || tool === 'sticky') {
        saveHistoryState();
        
        let newObj: fabric.Object | null = null;
        if (tool === 'text') {
          newObj = createTextbox(pointer, text);
        } else if (tool === 'sticky') {
          newObj = createStickyNote(pointer, { bg: sticky.color, text: sticky.text });
        }

        if (newObj) {
          canvas.add(newObj);
          canvas.setActiveObject(newObj);
          canvas.requestRenderAll();
          
          if (tool === 'text') {
            (newObj as fabric.Textbox).enterEditing();
            (newObj as fabric.Textbox).selectAll();
          }
        }
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (!isMouseDown) return;
      const pointer = canvas.getScenePoint(opt.e);
      const tool = activeToolRef.current;

      // Pan Movement
      if (tool === 'pan' && canvas.viewportTransform) {
        const coords = getEventCoords(opt.e);
        const vpt = canvas.viewportTransform;
        vpt[4] += coords.clientX - lastX;
        vpt[5] += coords.clientY - lastY;
        canvas.requestRenderAll();
        lastX = coords.clientX;
        lastY = coords.clientY;
        return;
      }

      // Draw Shapes Dragging
      if (isDrawingShape.current && shapeStartPointer.current && activeShapeObject.current) {
        const start = shapeStartPointer.current;
        const activeObj = activeShapeObject.current;
        const dx = pointer.x - start.x;
        const dy = pointer.y - start.y;

        if (tool === 'rect') {
          const rect = activeObj as fabric.Rect;
          rect.set({
            width: Math.abs(dx),
            height: Math.abs(dy),
            left: dx > 0 ? start.x : pointer.x,
            top: dy > 0 ? start.y : pointer.y
          });
        } else if (tool === 'circle') {
          const circle = activeObj as fabric.Circle;
          circle.set({
            radius: Math.max(Math.abs(dx), Math.abs(dy)) / 2,
            left: dx > 0 ? start.x : pointer.x,
            top: dy > 0 ? start.y : pointer.y
          });
        } else if (tool === 'line') {
          const line = activeObj as fabric.Line;
          line.set({
            x2: pointer.x,
            y2: pointer.y
          });
        } else if (tool === 'arrow') {
          const path = activeObj as fabric.Path;
          updateArrowPath(path, start.x, start.y, pointer.x, pointer.y);
        }

        activeObj.setCoords();
        canvas.requestRenderAll();
      }
    });

    canvas.on('mouse:up', () => {
      isMouseDown = false;
      
      if (isDrawingShape.current) {
        isDrawingShape.current = false;
        activeShapeObject.current = null;
        shapeStartPointer.current = null;
        saveHistoryState();
      }
    });

    // Keyboard Del Key Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Skip deletion if text editing is active
        const activeObj = canvas.getActiveObject();
        if (activeObj && (activeObj as any).isEditing) return;

        if (activeObj) {
          saveHistoryState();
          
          if (activeObj.type === 'activeSelection') {
            const activeSel = activeObj as fabric.ActiveSelection;
            activeSel.forEachObject((obj) => canvas.remove(obj));
            canvas.discardActiveObject();
          } else {
            canvas.remove(activeObj);
          }
          canvas.requestRenderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial Resize Observer for responsive canvas sizing
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && fabricCanvasRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight || 550;
        fabricCanvasRef.current.setDimensions({ width: w, height: h });
        fabricCanvasRef.current.requestRenderAll();
      }
    });
    
    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      resizeObserver.disconnect();
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // Update Canvas Configuration based on current tool/brush/shapes
  const updateCanvasInteractions = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const tool = activeTool;

    // Brush/Freehand Drawing Mode Configuration
    if (tool === 'pen' || tool === 'pencil' || tool === 'eraser') {
      canvas.isDrawingMode = true;
      canvas.selection = false;

      // Instantiate standard pencil brush if not present
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      }

      const brushObj = canvas.freeDrawingBrush;
      
      if (tool === 'eraser') {
        // Erase strokes by drawing white lines of the eraser size over other objects
        brushObj.color = '#FFFFFF';
        brushObj.width = brush.width;
        // Optional: reduce opacity for erasing? No, eraser is always solid
        (brushObj as any).opacity = 1;
      } else {
        // Normal Pen/Pencil mode
        brushObj.color = brush.color;
        brushObj.width = brush.width;
        // Custom opacity support
        (brushObj as any).opacity = brush.opacity;
        
        // Slightly tweak drawing options
        brushObj.strokeLineCap = 'round';
        brushObj.strokeLineJoin = 'round';
        
        // Pencils are usually thinner, pen can be thick
        if (tool === 'pencil') {
          // Add small drawing shadow or keep simple
        }
      }
    } else {
      // Non-drawing modes
      canvas.isDrawingMode = false;
      
      if (tool === 'select') {
        canvas.selection = true;
        canvas.hoverCursor = 'move';
        canvas.defaultCursor = 'default';
        
        // Make all objects selectable
        canvas.getObjects().forEach(obj => {
          obj.set({
            selectable: true,
            evented: true,
            lockMovementX: false,
            lockMovementY: false,
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false
          });
        });
      } else if (tool === 'pan') {
        canvas.selection = false;
        canvas.hoverCursor = 'grab';
        canvas.defaultCursor = 'grab';
        
        // Disable selecting and moving objects when panning
        canvas.getObjects().forEach(obj => {
          obj.set({
            selectable: false,
            evented: false
          });
        });
      } else {
        // Creating text, shapes, or sticky note
        canvas.selection = false;
        canvas.hoverCursor = 'crosshair';
        canvas.defaultCursor = 'crosshair';
        
        // Disable selecting/moving objects while drawing shape
        canvas.getObjects().forEach(obj => {
          obj.set({
            selectable: false,
            evented: false
          });
        });
      }
    }

    canvas.requestRenderAll();
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[550px] relative border border-border bg-white rounded-2xl shadow-inner overflow-hidden cursor-crosshair"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
});

WhiteboardCanvas.displayName = 'WhiteboardCanvas';
