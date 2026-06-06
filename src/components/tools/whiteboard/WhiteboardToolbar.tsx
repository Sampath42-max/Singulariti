import React, { useRef } from 'react';
import {
  MousePointer,
  PenTool,
  Pencil,
  Eraser,
  Type,
  Square,
  Circle,
  Triangle,
  Minus,
  ArrowUpRight,
  StickyNote,
  Image as ImageIcon,
  Hand,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Expand,
  Shrink,
  Trash2,
  Save,
  FolderOpen
} from 'lucide-react';

import { WhiteboardTool } from '@/lib/whiteboard/whiteboardTypes';

interface WhiteboardToolbarProps {
  activeTool: WhiteboardTool;
  onSelectTool: (tool: WhiteboardTool) => void;
  onImageUpload: (file: File) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitToScreen: () => void;
  onClearBoard: () => void;
  onSaveBoard: () => void;
  onLoadBoard: () => void;
  hasSavedBoard: boolean;
  onClearSavedBoard?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}


export function WhiteboardToolbar({
  activeTool,
  onSelectTool,
  onImageUpload,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitToScreen,
  onClearBoard,
  onSaveBoard,
  onLoadBoard,
  hasSavedBoard,
  onClearSavedBoard: _onClearSavedBoard,
  isMaximized = false,
  onToggleMaximize
}: WhiteboardToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      // Reset input value so same image can be uploaded again if needed
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select & Move' },
    { id: 'pan', icon: Hand, label: 'Pan Canvas' },
    { id: 'pen', icon: PenTool, label: 'Brush' },
    { id: 'pencil', icon: Pencil, label: 'Pencil' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'rect', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'triangle', icon: Triangle, label: 'Triangle' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'arrow', icon: ArrowUpRight, label: 'Arrow' },
    { id: 'sticky', icon: StickyNote, label: 'Sticky Note' }
  ] as const;

  return (
    <div className="flex flex-col gap-3 w-full bg-surface border border-border rounded-2xl p-3 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
      />

      {/* Main Drawing Tools */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3 md:border-b-0 md:pb-0">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTool(t.id)}
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 relative group
                ${isActive 
                  ? 'bg-primary text-dark font-semibold' 
                  : 'text-slate hover:bg-background hover:text-ink'
                }
              `}
              title={t.label}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-ink text-surface text-[10px] py-1 px-2 rounded-md whitespace-nowrap pointer-events-none z-50">
                {t.label}
              </span>
            </button>
          );
        })}

        {/* Image Upload Button (Treated as a Tool trigger) */}
        <button
          onClick={triggerFileInput}
          className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 text-slate hover:bg-background hover:text-ink relative group"
          title="Upload Image"
        >
          <ImageIcon className="w-[18px] h-[18px]" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-ink text-surface text-[10px] py-1 px-2 rounded-md whitespace-nowrap pointer-events-none z-50">
            Upload Image
          </span>
        </button>
      </div>

      {/* Canvas Utilities: Undo/Redo & Zoom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
        {/* Undo / Redo */}
        <div className="flex items-center gap-1 border-r border-border pr-3">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 text-slate hover:bg-background hover:text-ink disabled:opacity-30 disabled:pointer-events-none group relative"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 text-slate hover:bg-background hover:text-ink disabled:opacity-30 disabled:pointer-events-none group relative"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 border-r border-border pr-3">
          <button
            onClick={onZoomOut}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 text-slate hover:bg-background hover:text-ink"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span 
            className="text-[12px] font-mono font-medium text-ink w-12 text-center cursor-pointer hover:bg-background rounded px-1 py-0.5"
            onClick={onResetZoom}
            title="Reset Zoom"
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 text-slate hover:bg-background hover:text-ink"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={onFitToScreen}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 text-slate hover:bg-background hover:text-ink"
            title="Fit to Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Local Storage Save / Load / Clear Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onSaveBoard}
            className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all duration-150 text-xs font-sans font-medium text-slate hover:bg-background hover:text-ink"
            title="Save board locally in browser"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>
          
          <button
            onClick={onLoadBoard}
            disabled={!hasSavedBoard}
            className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all duration-150 text-xs font-sans font-medium text-slate hover:bg-background hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
            title="Load board from browser storage"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Load</span>
          </button>

          <button
            onClick={onClearBoard}
            className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all duration-150 text-xs font-sans font-semibold text-red-500 hover:bg-red-500/10 border-r border-border pr-4 mr-1"
            title="Clear all drawings from current canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={onToggleMaximize}
            className={`h-8 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all duration-150 text-xs font-sans font-semibold ${
              isMaximized 
                ? 'bg-primary text-dark hover:bg-primary/90' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'
            }`}
            title={isMaximized ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isMaximized ? <Shrink className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMaximized ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
