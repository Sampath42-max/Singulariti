import React, { useRef, useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

export interface TransformableOverlayProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  lockAspect?: boolean;
  minWidth?: number;
  minHeight?: number;
  isActive: boolean;
  onSelect: (e?: React.PointerEvent) => void;
  onChange: (updates: { x: number; y: number; width: number; height: number; rotation: number }) => void;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  zoom?: number;
}

export function TransformableOverlay({
  x, y, width, height, rotation, lockAspect = true, minWidth = 20, minHeight = 20,
  isActive, onSelect, onChange, children, containerRef, zoom = 100
}: TransformableOverlayProps) {
  
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Interaction states
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  
  const interactionStart = useRef({
    startX: 0, startY: 0,
    elemX: 0, elemY: 0,
    elemW: 0, elemH: 0,
    elemRot: 0,
    centerX: 0, centerY: 0
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect(e);
    setIsDragging(true);
    interactionStart.current = {
      ...interactionStart.current,
      startX: e.clientX,
      startY: e.clientY,
      elemX: x,
      elemY: y
    };
  };

  const handleResizeDown = (e: React.PointerEvent, handle: string) => {
    e.stopPropagation();
    onSelect(e);
    setIsResizing(handle);
    interactionStart.current = {
      ...interactionStart.current,
      startX: e.clientX,
      startY: e.clientY,
      elemX: x,
      elemY: y,
      elemW: width,
      elemH: height
    };
  };

  const handleRotateDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect(e);
    setIsRotating(true);
    
    // Calculate center of element
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      interactionStart.current = {
        ...interactionStart.current,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        elemRot: rotation
      };
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = (e.clientX - interactionStart.current.startX) / (zoom / 100);
        const dy = (e.clientY - interactionStart.current.startY) / (zoom / 100);
        onChange({ x: interactionStart.current.elemX + dx, y: interactionStart.current.elemY + dy, width, height, rotation });
      } 
      else if (isResizing) {
        const handle = isResizing;
        const dx = (e.clientX - interactionStart.current.startX) / (zoom / 100);
        const dy = (e.clientY - interactionStart.current.startY) / (zoom / 100);
        
        // Inverse rotation to get local delta
        const rad = (-rotation * Math.PI) / 180;
        const localDx = dx * Math.cos(rad) - dy * Math.sin(rad);
        const localDy = dx * Math.sin(rad) + dy * Math.cos(rad);

        let dW = 0;
        let dH = 0;

        // 1. Calculate raw dW and dH based on handle
        if (handle.includes('e')) dW = localDx;
        if (handle.includes('w')) dW = -localDx;
        if (handle.includes('s')) dH = localDy;
        if (handle.includes('n')) dH = -localDy;

        // 2. Lock aspect ratio if needed
        const ratio = interactionStart.current.elemW / interactionStart.current.elemH;
        if (lockAspect) {
          // If it's a corner handle, we can average the movement or just pick the dominant axis.
          // Using dW as the driver (if handle has E or W), otherwise dH (if N or S only, though corners have both).
          if (handle.includes('e') || handle.includes('w')) {
            dH = dW / ratio;
          } else {
            dW = dH * ratio;
          }
        }

        // 3. Apply min constraints
        let newW = interactionStart.current.elemW + dW;
        let newH = interactionStart.current.elemH + dH;

        if (newW < minWidth) {
          newW = minWidth;
          dW = newW - interactionStart.current.elemW;
          if (lockAspect) {
            dH = dW / ratio;
            newH = interactionStart.current.elemH + dH;
          }
        }
        if (newH < minHeight) {
          newH = minHeight;
          dH = newH - interactionStart.current.elemH;
          if (lockAspect) {
            dW = dH * ratio;
            newW = interactionStart.current.elemW + dW;
          }
        }

        // 4. Calculate local center shift
        let localShiftX = 0;
        let localShiftY = 0;
        if (handle.includes('e')) localShiftX = dW / 2;
        if (handle.includes('w')) localShiftX = -dW / 2;
        if (handle.includes('s')) localShiftY = dH / 2;
        if (handle.includes('n')) localShiftY = -dH / 2;

        // 5. Rotate local shift to global shift
        const rotRad = (rotation * Math.PI) / 180;
        const globalShiftX = localShiftX * Math.cos(rotRad) - localShiftY * Math.sin(rotRad);
        const globalShiftY = localShiftX * Math.sin(rotRad) + localShiftY * Math.cos(rotRad);

        const newX = interactionStart.current.elemX + globalShiftX;
        const newY = interactionStart.current.elemY + globalShiftY;

        onChange({ x: newX, y: newY, width: newW, height: newH, rotation });
      }
      else if (isRotating) {
        const dx = e.clientX - interactionStart.current.centerX;
        const dy = e.clientY - interactionStart.current.centerY;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // The handle is at the top (which is -90 degrees in atan2 space)
        angle += 90;
        // Snap to 45 degree increments if shift is held
        if (e.shiftKey) {
          angle = Math.round(angle / 45) * 45;
        }
        onChange({ x, y, width, height, rotation: angle });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      setIsRotating(false);
    };

    if (isDragging || isResizing || isRotating) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, isResizing, isRotating, x, y, width, height, rotation, onChange, lockAspect, minWidth, minHeight, zoom]);

  // Handle styles
  const handleClasses = "absolute w-3 h-3 bg-white border border-primary rounded-sm shadow-sm pointer-events-auto z-10";

  return (
    <div
      ref={elementRef}
      onPointerDown={handlePointerDown}
      className={`absolute origin-center touch-none select-none ${isActive ? 'cursor-move' : 'cursor-pointer'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        // Use an invisible border when inactive, active border when active
        boxShadow: isActive ? '0 0 0 2px var(--color-primary)' : '0 0 0 1px transparent',
        zIndex: isActive ? 50 : 10
      }}
    >
      <div className="w-full h-full relative pointer-events-none">
        {children}
      </div>

      {isActive && (
        <>
          {/* Rotate Handle */}
          <div 
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center cursor-crosshair shadow-sm pointer-events-auto hover:border-primary hover:text-primary transition-colors"
            onPointerDown={handleRotateDown}
          >
            <RotateCw className="w-3 h-3" />
          </div>
          {/* Rotate connection line */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-primary" />

          {/* Corners */}
          <div className={`${handleClasses} -top-1.5 -left-1.5 cursor-nwse-resize`} onPointerDown={(e) => handleResizeDown(e, 'nw')} />
          <div className={`${handleClasses} -top-1.5 -right-1.5 cursor-nesw-resize`} onPointerDown={(e) => handleResizeDown(e, 'ne')} />
          <div className={`${handleClasses} -bottom-1.5 -left-1.5 cursor-nesw-resize`} onPointerDown={(e) => handleResizeDown(e, 'sw')} />
          <div className={`${handleClasses} -bottom-1.5 -right-1.5 cursor-nwse-resize`} onPointerDown={(e) => handleResizeDown(e, 'se')} />

          {/* Edges (only if aspect is not locked) */}
          {!lockAspect && (
            <>
              <div className={`${handleClasses} -top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize`} onPointerDown={(e) => handleResizeDown(e, 'n')} />
              <div className={`${handleClasses} -bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize`} onPointerDown={(e) => handleResizeDown(e, 's')} />
              <div className={`${handleClasses} top-1/2 -translate-y-1/2 -left-1.5 cursor-ew-resize`} onPointerDown={(e) => handleResizeDown(e, 'w')} />
              <div className={`${handleClasses} top-1/2 -translate-y-1/2 -right-1.5 cursor-ew-resize`} onPointerDown={(e) => handleResizeDown(e, 'e')} />
            </>
          )}
        </>
      )}
    </div>
  );
}
