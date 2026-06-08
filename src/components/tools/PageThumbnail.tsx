"use client";

import React, { useEffect, useRef, useState } from 'react';
import { pdfjsLib } from '@/lib/pdfjsSetup';
// import { renderPageToCanvas } from '../../lib/pdf/pdfRenderHelpers';
import { Loader2 } from 'lucide-react';

interface PageThumbnailProps {
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  onRenderSuccess?: () => void;
}

export function PageThumbnail({
  pdfDoc,
  pageNumber,
  scale = 0.3,
  className = '',
  style,
  onRenderSuccess
}: PageThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    let active = true;
    let renderTask: any = null;

    async function draw() {
      if (!canvasRef.current) return;
      setLoading(true);
      setError(null);

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        
        if (!active || !canvasRef.current) return;
        
        canvasRef.current.height = viewport.height;
        canvasRef.current.width = viewport.width;
        
        const canvasContext = canvasRef.current.getContext('2d');
        if (!canvasContext) {
          throw new Error('Could not get 2D context from canvas');
        }
        
        const renderContext = {
          canvasContext,
          viewport,
          canvas: canvasRef.current,
        };
        
        renderTask = page.render(renderContext);
        await renderTask.promise;
        
        if (active) {
          setDimensions({ width: viewport.width, height: viewport.height });
          setLoading(false);
          if (onRenderSuccess) onRenderSuccess();
        }
      } catch (err: any) {
        if (err && err.name === 'RenderingCancelledException') {
          return;
        }
        console.error('Error rendering thumbnail: ', err);
        if (active) {
          setError(err.message || 'Render failed');
          setLoading(false);
        }
      }
    }

    draw();

    return () => {
      active = false;
      if (renderTask) {
        try {
          renderTask.cancel();
        } catch (e) {}
      }
      // memory cleanup
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
    };
  }, [pdfDoc, pageNumber, scale, onRenderSuccess]);

  return (
    <div 
      className={`relative inline-flex items-center justify-center bg-background border border-border rounded-lg overflow-hidden select-none max-w-full ${className}`}
      style={{
        ...style,
        aspectRatio: dimensions ? `${dimensions.width} / ${dimensions.height}` : undefined,
        width: dimensions ? `${dimensions.width}px` : undefined,
        height: 'auto',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-xs">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 p-2 text-center">
          <span className="text-[10px] text-red-500 font-sans leading-tight">Error rendering page</span>
        </div>
      )}
    </div>
  );
}
