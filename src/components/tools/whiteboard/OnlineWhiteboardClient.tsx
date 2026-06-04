"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { ToolLayout } from '../ToolLayout';
import { WhiteboardCanvas, WhiteboardCanvasRef } from './WhiteboardCanvas';
import { WhiteboardToolbar } from './WhiteboardToolbar';
import { WhiteboardSidebar } from './WhiteboardSidebar';
import { WhiteboardExportPanel } from './WhiteboardExportPanel';
import {
  WhiteboardTool,
  BrushOptions,
  ShapeOptions,
  TextOptions,
  StickyNoteOptions,
  WhiteboardState
} from '@/lib/whiteboard/whiteboardTypes';
import { exportToImage, exportToPDF } from '@/lib/whiteboard/exportHelpers';
import { saveBoardToStorage, loadBoardFromStorage, hasSavedBoard } from '@/lib/whiteboard/storageHelpers';

export default function OnlineWhiteboardClient() {
  const canvasRef = useRef<WhiteboardCanvasRef>(null);

  // Notifications
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Storage status
  const [boardSavedExists, setBoardSavedExists] = useState(false);

  // Whiteboard configuration states
  const [activeTool, setActiveTool] = useState<WhiteboardTool>('select');
  const [zoom, setZoom] = useState(1.0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Tool setting state defaults
  const [brush, setBrush] = useState<BrushOptions>({
    color: '#000000',
    width: 5,
    opacity: 1.0
  });

  const [shape, setShape] = useState<ShapeOptions>({
    strokeColor: '#000000',
    fillColor: 'transparent',
    strokeWidth: 3,
    opacity: 1.0
  });

  const [text, setText] = useState<TextOptions>({
    fontFamily: 'Outfit',
    fontSize: 24,
    color: '#000000',
    bold: false,
    italic: false,
    underline: false,
    backgroundColor: 'transparent'
  });

  const [sticky, setSticky] = useState<StickyNoteOptions>({
    color: '#FEF08A', // Yellow bg
    text: '#854D0E'  // Dark brown text
  });

  // Selected active object properties (when user selects something on canvas)
  const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null);
  const [selectedObjectProps, setSelectedObjectProps] = useState<any>(null);

  // Check storage status on mount
  useEffect(() => {
    setBoardSavedExists(hasSavedBoard());
  }, []);

  // Set alerts dismiss timer
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // Handle Tool selection changes
  const handleSelectTool = (tool: WhiteboardTool) => {
    setActiveTool(tool);
    // Discard active object selection when changing tools to drawing modes
    if (tool !== 'select') {
      const canvas = canvasRef.current?.getCanvas();
      if (canvas) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    }
  };

  // Image insertion handler
  const handleImageUpload = (file: File) => {
    canvasRef.current?.uploadImage(file);
  };

  // Handle modifying a selected object
  const handleChangeSelectedObject = (newProps: any) => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;

    // Check if there is an undo/redo modification trigger inside canvas.
    // To enable proper undo, we manually push current state before making properties changes
    // But we only want to do this if the value actually changes
    let changed = false;
    Object.keys(newProps).forEach(key => {
      if ((activeObj as any)[key] !== newProps[key]) {
        changed = true;
      }
    });

    if (changed) {
      // Direct update
      activeObj.set(newProps);
      activeObj.setCoords();
      canvas.requestRenderAll();

      // Update sidebar props state
      setSelectedObjectProps((prev: any) => ({
        ...prev,
        ...newProps
      }));
    }
  };

  // Delete selected object
  const handleDeleteSelected = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      // Simulate delete key press
      const e = new KeyboardEvent('keydown', { key: 'Delete' });
      window.dispatchEvent(e);
    }
  };

  // Local storage save board trigger
  const handleSaveBoard = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    if (canvas.getObjects().length === 0) {
      setError("Cannot save an empty board.");
      return;
    }

    const res = saveBoardToStorage(canvas);
    if (res.success) {
      setSuccessMsg("Whiteboard saved successfully!");
      setBoardSavedExists(true);
      setError(null);
    } else {
      setError(res.error || "Failed to save board locally.");
    }
  };

  // Local storage load board trigger
  const handleLoadBoard = async () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    try {
      const res = await loadBoardFromStorage(canvas);
      if (res.success) {
        setSuccessMsg("Whiteboard loaded successfully!");
        setError(null);
      } else {
        setError(res.error || "Failed to load saved board.");
      }
    } catch {
      setError("Failed to load saved board.");
    }
  };

  // Local storage clear saved board
  const handleClearSavedBoard = () => {
    // We already have onClearBoard to wipe the canvas.
    // The toolbar clear handles current board layout.
    // If the user wants to wipe localstorage, we can do it inside the component
    localStorage.removeItem('singularity_whiteboard_save');
    setBoardSavedExists(false);
    setSuccessMsg("Saved board cleared from browser storage.");
  };

  // Export board trigger
  const handleExport = (
    format: 'png' | 'jpg' | 'pdf',
    fileName: string,
    options: { quality: number; pdfOrientation: 'portrait' | 'landscape' }
  ) => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    try {
      setError(null);
      if (format === 'png') {
        exportToImage(canvas, 'png', 1, fileName);
      } else if (format === 'jpg') {
        exportToImage(canvas, 'jpeg', options.quality, fileName);
      } else if (format === 'pdf') {
        exportToPDF(canvas, options.pdfOrientation, fileName);
      }
      setSuccessMsg(`Exported successfully as ${format.toUpperCase()}!`);
    } catch (err: any) {
      if (err.message === 'EMPTY_BOARD') {
        setError("Cannot export an empty board. Please draw or add shapes first.");
      } else {
        setError("Failed to export board. Please try again.");
      }
    }
  };

  // Clear current canvas board
  const handleClearBoard = () => {
    canvasRef.current?.clearCanvas();
    setSuccessMsg("Canvas cleared.");
  };

  return (
    <ToolLayout
      title="Online Whiteboard"
      description="Draw, write, sketch, add shapes, and export your whiteboard directly in your browser."
      categoryName="Editing Tools"
      categoryHref="/editing"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        
        {/* Whiteboard Specific Privacy Notice (Required) */}
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4 text-ink">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-primary mt-0.5" />
          <div className="text-[13px] font-sans leading-relaxed">
            <span className="font-semibold text-primary">Privacy Guarantee:</span> Your whiteboard data is created and stored locally in your browser. Nothing is uploaded to any server.
          </div>
        </div>

        {/* Toolbar Component */}
        <WhiteboardToolbar
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          onImageUpload={handleImageUpload}
          onUndo={() => canvasRef.current?.undo()}
          onRedo={() => canvasRef.current?.redo()}
          canUndo={canUndo}
          canRedo={canRedo}
          zoom={zoom}
          onZoomIn={() => canvasRef.current?.zoomIn()}
          onZoomOut={() => canvasRef.current?.zoomOut()}
          onResetZoom={() => canvasRef.current?.resetZoom()}
          onFitToScreen={() => canvasRef.current?.zoomToFit()}
          onClearBoard={handleClearBoard}
          onSaveBoard={handleSaveBoard}
          onLoadBoard={handleLoadBoard}
          hasSavedBoard={boardSavedExists}
          onClearSavedBoard={handleClearSavedBoard}
        />

        {/* Success alert */}
        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-xs font-sans rounded-xl text-center animate-in fade-in slide-in-from-top-1 duration-150">
            {successMsg}
          </div>
        )}

        {/* Workspace Layout: Canvas in Center, Sidebar & Export Panel on Right */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Canvas Area */}
          <div className="flex-1 min-w-0">
            <WhiteboardCanvas
              ref={canvasRef}
              activeTool={activeTool}
              brush={brush}
              shape={shape}
              text={text}
              sticky={sticky}
              onZoomChange={setZoom}
              onSelectionChange={(type, props) => {
                setSelectedObjectType(type);
                setSelectedObjectProps(props);
              }}
              onHistoryChange={(undo, redo) => {
                setCanUndo(undo);
                setCanRedo(redo);
              }}
              onWarning={(msg) => setWarning(msg)}
              onError={(msg) => setError(msg)}
            />
          </div>

          {/* Settings Sidebar and Export Panel */}
          <div className="w-full lg:w-72 flex flex-col gap-6 flex-shrink-0">
            
            {/* Sidebar properties options */}
            <WhiteboardSidebar
              activeTool={activeTool}
              brush={brush}
              onChangeBrush={(b) => setBrush(prev => ({ ...prev, ...b }))}
              shape={shape}
              onChangeShape={(s) => setShape(prev => ({ ...prev, ...s }))}
              text={text}
              onChangeText={(t) => setText(prev => ({ ...prev, ...t }))}
              sticky={sticky}
              onChangeSticky={(st) => setSticky(prev => ({ ...prev, ...st }))}
              selectedObjectType={selectedObjectType}
              selectedObjectProps={selectedObjectProps}
              onChangeSelectedObject={handleChangeSelectedObject}
              onDeleteSelected={handleDeleteSelected}
            />

            {/* Export options */}
            <WhiteboardExportPanel onExport={handleExport} />

            {/* Storage Info note (Required) */}
            <div className="bg-surface border border-border rounded-xl p-4 flex gap-2.5 items-start">
              <Info className="w-4.5 h-4.5 text-slate flex-shrink-0 mt-0.5" />
              <div className="text-[11px] font-sans text-slate leading-normal">
                <p className="font-semibold text-ink mb-1">Local Storage Notice</p>
                Saved whiteboards are stored only in your browser’s local storage. Wiping your browser history or site data will remove saved boards.
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
