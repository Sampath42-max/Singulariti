"use client";

import React, { useRef, useState, useEffect } from 'react';
import { DeviceView } from '@/store/useCompilerStore';
import { Monitor, Tablet, Smartphone, RotateCcw, Maximize } from 'lucide-react';

interface DevicePreviewFrameProps {
  srcDoc: string;
  deviceView: DeviceView;
  setDeviceView: (view: DeviceView) => void;
}

export function DevicePreviewFrame({ srcDoc, deviceView, setDeviceView }: DevicePreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isRotated, setIsRotated] = useState(false);

  const DEVICE_WIDTHS = {
    desktop: 1440,
    tablet: 768,
    mobile: 390,
  };

  const DEVICE_HEIGHTS = {
    desktop: 900,
    tablet: 1024,
    mobile: 844,
  };

  useEffect(() => {
    const handleResize = () => {
      if (deviceView === 'responsive' || !containerRef.current) {
        setScale(1);
        return;
      }

      const containerWidth = containerRef.current.clientWidth - 32; // 32px padding
      const containerHeight = containerRef.current.clientHeight - 32;
      
      const targetWidth = isRotated ? DEVICE_HEIGHTS[deviceView as keyof typeof DEVICE_HEIGHTS] : DEVICE_WIDTHS[deviceView as keyof typeof DEVICE_WIDTHS];
      const targetHeight = isRotated ? DEVICE_WIDTHS[deviceView as keyof typeof DEVICE_WIDTHS] : DEVICE_HEIGHTS[deviceView as keyof typeof DEVICE_HEIGHTS];

      const scaleX = containerWidth / targetWidth;
      const scaleY = containerHeight / targetHeight;
      
      // Calculate fit scale (min of X and Y, capped at 1 so it doesn't zoom in, only shrinks)
      const fitScale = Math.min(scaleX, scaleY, 1);
      setScale(fitScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [deviceView, isRotated]);

  const getIframeDimensions = () => {
    if (deviceView === 'responsive') {
      return { width: '100%', height: '100%' };
    }
    const w = DEVICE_WIDTHS[deviceView as keyof typeof DEVICE_WIDTHS];
    const h = DEVICE_HEIGHTS[deviceView as keyof typeof DEVICE_HEIGHTS];
    return {
      width: isRotated ? h : w,
      height: isRotated ? w : h,
    };
  };

  const dims = getIframeDimensions();

  return (
    <div className="flex flex-col w-full h-full bg-slate/5 overflow-hidden">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
        <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-border">
          <button
            onClick={() => setDeviceView('responsive')}
            className={`p-1.5 rounded-md text-[12px] font-medium transition-colors ${deviceView === 'responsive' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
            title="Responsive"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-1.5 rounded-md text-[12px] font-medium transition-colors ${deviceView === 'desktop' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
            title="Desktop (1440px)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-1.5 rounded-md text-[12px] font-medium transition-colors ${deviceView === 'tablet' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
            title="Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-1.5 rounded-md text-[12px] font-medium transition-colors ${deviceView === 'mobile' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
            title="Mobile (390px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {deviceView !== 'responsive' && (
          <div className="flex items-center gap-4 text-[12px] font-mono text-slate">
            <span>{typeof dims.width === 'number' ? `${dims.width} × ${dims.height}` : 'Responsive'}</span>
            <span className="text-slate/50">|</span>
            <span>{(scale * 100).toFixed(0)}%</span>
            
            <button
              onClick={() => setIsRotated(!isRotated)}
              className="p-1.5 text-ink hover:bg-slate/10 rounded-md transition-colors border border-border bg-background"
              title="Rotate Device"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Preview Area */}
      <div 
        ref={containerRef}
        className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center bg-[#e5e7eb] dark:bg-[#111827]"
      >
        <div 
          className="bg-white shadow-2xl overflow-hidden"
          style={{
            width: dims.width,
            height: dims.height,
            transform: deviceView !== 'responsive' ? `scale(${scale})` : 'none',
            transformOrigin: 'center center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: deviceView !== 'responsive' ? '12px' : '0px',
            border: deviceView !== 'responsive' ? '4px solid #1f2937' : 'none',
          }}
        >
          <iframe
            key={srcDoc}
            srcDoc={srcDoc}
            title="Preview Frame"
            className="w-full h-full border-none bg-white block"
            sandbox="allow-scripts allow-modals"
          />
        </div>
      </div>
    </div>
  );
}
