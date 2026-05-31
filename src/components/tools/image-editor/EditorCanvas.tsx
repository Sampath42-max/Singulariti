import React from 'react';
import { Loader2 } from 'lucide-react';

interface EditorCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isLoading: boolean;
  onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  children?: React.ReactNode;
}

export function EditorCanvas({ 
  canvasRef, 
  isLoading,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  children
}: EditorCanvasProps) {
  return (
    <div className="relative rounded-xl border border-border bg-background/50 overflow-hidden min-h-[400px] flex items-center justify-center p-4 w-full">
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
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-xs z-10 transition-opacity">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-[12px] font-sans font-medium text-slate">Rendering changes...</span>
          </div>
        </div>
      )}
      
      {/* 
        Wrap canvas and children in a relative container that shrinks to fit the canvas.
        This allows absolute children to correctly map to the canvas's local coordinate space.
      */}
      <div className="relative inline-flex max-w-full max-h-[58vh] shadow-md rounded-lg border border-border bg-white z-0">
        <canvas 
          ref={canvasRef} 
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          className="max-w-full max-h-full object-contain cursor-crosshair rounded-lg" 
        />
        {children}
      </div>
    </div>
  );
}
