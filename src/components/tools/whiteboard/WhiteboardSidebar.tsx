import React from 'react';
import { Bold, Italic, Underline, Trash2 } from 'lucide-react';
import { WhiteboardColorPicker } from './WhiteboardColorPicker';
import {
  BrushOptions,
  ShapeOptions,
  TextOptions,
  StickyNoteOptions,
  WhiteboardTool,
  FONT_FAMILIES,
  STICKY_COLORS
} from '@/lib/whiteboard/whiteboardTypes';

interface WhiteboardSidebarProps {
  activeTool: WhiteboardTool;
  brush: BrushOptions;
  onChangeBrush: (brush: Partial<BrushOptions>) => void;
  shape: ShapeOptions;
  onChangeShape: (shape: Partial<ShapeOptions>) => void;
  text: TextOptions;
  onChangeText: (text: Partial<TextOptions>) => void;
  sticky: StickyNoteOptions;
  onChangeSticky: (sticky: Partial<StickyNoteOptions>) => void;
  
  // Selected object properties (for editing existing objects)
  selectedObjectType: string | null;
  selectedObjectProps: any;
  onChangeSelectedObject: (props: any) => void;
  onDeleteSelected: () => void;
}

export function WhiteboardSidebar({
  activeTool,
  brush,
  onChangeBrush,
  shape,
  onChangeShape,
  text,
  onChangeText,
  sticky,
  onChangeSticky,
  selectedObjectType,
  selectedObjectProps,
  onChangeSelectedObject,
  onDeleteSelected
}: WhiteboardSidebarProps) {
  
  // Helper to determine if we are editing a selected object or configuring a tool
  const isEditingObject = !!selectedObjectType;
  
  // Identify if selected object is a sticky note
  const isSelectedSticky = selectedObjectType === 'textbox' && selectedObjectProps?.isSticky;
  const isSelectedText = selectedObjectType === 'textbox' && !selectedObjectProps?.isSticky;
  const isSelectedShape = selectedObjectType && ['rect', 'circle', 'line', 'path', 'polyline'].includes(selectedObjectType);
  const isSelectedImage = selectedObjectType === 'image';

  return (
    <div className="w-full lg:w-72 bg-surface border border-border rounded-2xl p-5 shadow-sm space-y-6 flex-shrink-0">
      
      {/* Title */}
      <div>
        <h3 className="text-sm font-sans font-bold text-ink">
          {isEditingObject ? 'Object Settings' : 'Tool Options'}
        </h3>
        <p className="text-[12px] text-slate font-sans">
          {isEditingObject 
            ? `Modify selected ${isSelectedSticky ? 'sticky note' : selectedObjectType}`
            : `Configure active tool: ${activeTool}`
          }
        </p>
      </div>

      {/* RENDER DYNAMIC SETTINGS */}

      {/* Case 1: Editing a Selected Object */}
      {isEditingObject && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Sticky Note Selection */}
          {isSelectedSticky && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[13px] font-sans font-medium text-slate">Note Color</span>
                <div className="grid grid-cols-3 gap-2">
                  {STICKY_COLORS.map((col) => {
                    const isSelected = selectedObjectProps.backgroundColor === col.bg;
                    return (
                      <button
                        key={col.bg}
                        onClick={() => onChangeSelectedObject({ backgroundColor: col.bg, fill: col.text })}
                        className={`
                          h-8 rounded-md border text-[11px] font-sans font-medium cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' 
                            : 'border-border hover:brightness-95'
                          }
                        `}
                        style={{ backgroundColor: col.bg, color: col.text }}
                      >
                        {col.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Size */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Text Size</span>
                  <span className="text-xs font-mono text-slate">{selectedObjectProps.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="36"
                  step="1"
                  value={selectedObjectProps.fontSize || 16}
                  onChange={(e) => onChangeSelectedObject({ fontSize: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Regular Text Selection */}
          {isSelectedText && (
            <div className="space-y-4">
              <WhiteboardColorPicker
                label="Text Color"
                value={selectedObjectProps.fill || '#000000'}
                onChange={(color) => onChangeSelectedObject({ fill: color })}
              />

              <WhiteboardColorPicker
                label="Background Color"
                value={selectedObjectProps.backgroundColor || 'transparent'}
                onChange={(color) => onChangeSelectedObject({ backgroundColor: color })}
                allowTransparent
              />

              {/* Font Family */}
              <div className="space-y-1.5">
                <span className="text-[13px] font-sans font-medium text-slate">Font Family</span>
                <select
                  value={selectedObjectProps.fontFamily || 'Outfit'}
                  onChange={(e) => onChangeSelectedObject({ fontFamily: e.target.value })}
                  className="w-full h-9 px-2 bg-background border border-border rounded-md text-xs font-sans text-ink focus:outline-none focus:border-primary"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Font Size</span>
                  <span className="text-xs font-mono text-slate">{selectedObjectProps.fontSize || 20}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="1"
                  value={selectedObjectProps.fontSize || 20}
                  onChange={(e) => onChangeSelectedObject({ fontSize: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Font Styles */}
              <div className="space-y-1.5">
                <span className="text-[13px] font-sans font-medium text-slate font-display">Styling</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onChangeSelectedObject({ fontWeight: selectedObjectProps.fontWeight === 'bold' ? 'normal' : 'bold' })}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-all
                      ${selectedObjectProps.fontWeight === 'bold' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate'}
                    `}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onChangeSelectedObject({ fontStyle: selectedObjectProps.fontStyle === 'italic' ? 'normal' : 'italic' })}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-all
                      ${selectedObjectProps.fontStyle === 'italic' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate'}
                    `}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onChangeSelectedObject({ underline: !selectedObjectProps.underline })}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-all
                      ${selectedObjectProps.underline ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate'}
                    `}
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shape Selection */}
          {isSelectedShape && (
            <div className="space-y-4">
              <WhiteboardColorPicker
                label="Stroke Color"
                value={selectedObjectProps.stroke || '#000000'}
                onChange={(color) => onChangeSelectedObject({ stroke: color })}
              />

              {selectedObjectType !== 'line' && selectedObjectType !== 'path' && (
                <WhiteboardColorPicker
                  label="Fill Color"
                  value={selectedObjectProps.fill || 'transparent'}
                  onChange={(color) => onChangeSelectedObject({ fill: color })}
                  allowTransparent
                />
              )}

              {/* Stroke Width */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Border Width</span>
                  <span className="text-xs font-mono text-slate">{selectedObjectProps.strokeWidth || 1}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={selectedObjectProps.strokeWidth || 1}
                  onChange={(e) => onChangeSelectedObject({ strokeWidth: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Opacity */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Opacity</span>
                  <span className="text-xs font-mono text-slate">{Math.round((selectedObjectProps.opacity || 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={selectedObjectProps.opacity || 1}
                  onChange={(e) => onChangeSelectedObject({ opacity: parseFloat(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Image Selection */}
          {isSelectedImage && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Opacity</span>
                  <span className="text-xs font-mono text-slate">{Math.round((selectedObjectProps.opacity || 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={selectedObjectProps.opacity || 1}
                  onChange={(e) => onChangeSelectedObject({ opacity: parseFloat(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Delete Action */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={onDeleteSelected}
              className="w-full h-9 rounded-md border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all text-xs font-sans font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Object
            </button>
            <p className="text-[10px] text-center text-slate font-sans mt-2">
              Tip: Press <kbd className="bg-background px-1 border rounded">Del</kbd> or <kbd className="bg-background px-1 border rounded">Backspace</kbd> to delete
            </p>
          </div>

        </div>
      )}

      {/* Case 2: Configuring Active Drawing Tool Options */}
      {!isEditingObject && (
        <div className="space-y-5">
          {/* Pen or Pencil Brush Settings */}
          {(activeTool === 'pen' || activeTool === 'pencil') && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <WhiteboardColorPicker
                label="Brush Color"
                value={brush.color}
                onChange={(color) => onChangeBrush({ color })}
              />

              {/* Brush Width */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Brush Size</span>
                  <span className="text-xs font-mono text-slate">{brush.width}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={brush.width}
                  onChange={(e) => onChangeBrush({ width: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Brush Opacity */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Opacity</span>
                  <span className="text-xs font-mono text-slate">{Math.round(brush.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={brush.opacity}
                  onChange={(e) => onChangeBrush({ opacity: parseFloat(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Shapes settings (Rect, Circle, Line, Arrow) */}
          {['rect', 'circle', 'line', 'arrow'].includes(activeTool) && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <WhiteboardColorPicker
                label="Outline Color"
                value={shape.strokeColor}
                onChange={(color) => onChangeShape({ strokeColor: color })}
              />

              {activeTool !== 'line' && activeTool !== 'arrow' && (
                <WhiteboardColorPicker
                  label="Fill Color"
                  value={shape.fillColor}
                  onChange={(color) => onChangeShape({ fillColor: color })}
                  allowTransparent
                />
              )}

              {/* Stroke Width */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Outline Width</span>
                  <span className="text-xs font-mono text-slate">{shape.strokeWidth}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={shape.strokeWidth}
                  onChange={(e) => onChangeShape({ strokeWidth: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Opacity */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Opacity</span>
                  <span className="text-xs font-mono text-slate">{Math.round(shape.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={shape.opacity}
                  onChange={(e) => onChangeShape({ opacity: parseFloat(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Text Tool Settings */}
          {activeTool === 'text' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <WhiteboardColorPicker
                label="Text Color"
                value={text.color}
                onChange={(color) => onChangeText({ color })}
              />

              <WhiteboardColorPicker
                label="Background Color"
                value={text.backgroundColor}
                onChange={(color) => onChangeText({ backgroundColor: color })}
                allowTransparent
              />

              {/* Font Family */}
              <div className="space-y-1.5">
                <span className="text-[13px] font-sans font-medium text-slate">Font Family</span>
                <select
                  value={text.fontFamily}
                  onChange={(e) => onChangeText({ fontFamily: e.target.value })}
                  className="w-full h-9 px-2 bg-background border border-border rounded-md text-xs font-sans text-ink focus:outline-none focus:border-primary"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate">Font Size</span>
                  <span className="text-xs font-mono text-slate">{text.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="1"
                  value={text.fontSize}
                  onChange={(e) => onChangeText({ fontSize: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* Styles */}
              <div className="space-y-1.5">
                <span className="text-[13px] font-sans font-medium text-slate">Default Styles</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onChangeText({ bold: !text.bold })}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-all
                      ${text.bold ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate'}
                    `}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onChangeText({ italic: !text.italic })}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-all
                      ${text.italic ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate'}
                    `}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onChangeText({ underline: !text.underline })}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-all
                      ${text.underline ? 'border-primary bg-primary/5 text-primary' : 'border-border text-slate'}
                    `}
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Note Tool Settings */}
          {activeTool === 'sticky' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-[13px] font-sans font-medium text-slate">Note Color Swatches</span>
                <div className="grid grid-cols-2 gap-2">
                  {STICKY_COLORS.map((col) => {
                    const isSelected = sticky.color === col.bg;
                    return (
                      <button
                        key={col.bg}
                        onClick={() => onChangeSticky({ color: col.bg, text: col.text })}
                        className={`
                          h-9 rounded-md border text-[11px] font-sans font-semibold cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' 
                            : 'border-border hover:brightness-95'
                          }
                        `}
                        style={{ backgroundColor: col.bg, color: col.text }}
                      >
                        {col.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Eraser Tool Settings */}
          {activeTool === 'eraser' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[13px] font-sans font-medium text-slate font-display">Eraser Width</span>
                  <span className="text-xs font-mono text-slate">{brush.width}px</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={brush.width}
                  onChange={(e) => onChangeBrush({ width: parseInt(e.target.value) })}
                  className="w-full accent-primary bg-background rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate font-sans leading-relaxed">
                Tip: The eraser tool lets you draw to erase freehand strokes. You can also select shapes/objects and click the delete button or press <kbd className="bg-background px-1 border rounded">Del</kbd> to remove them.
              </p>
            </div>
          )}

          {/* Select and Pan tools context */}
          {(activeTool === 'select' || activeTool === 'pan') && (
            <div className="text-xs text-slate font-sans space-y-2 animate-in fade-in duration-200">
              {activeTool === 'select' ? (
                <>
                  <p>Click on any shape, text, sticky note, or image to edit or reposition it.</p>
                  <p>You can drag controls to resize and rotate. Press Delete to remove selected items.</p>
                </>
              ) : (
                <>
                  <p>Click and drag anywhere on the whiteboard area to scroll/pan around.</p>
                  <p>You can also use your mouse scroll wheel to zoom in and out.</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
