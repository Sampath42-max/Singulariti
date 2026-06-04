import React, { useState } from 'react';
import { Download, FileImage, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface WhiteboardExportPanelProps {
  onExport: (format: 'png' | 'jpg' | 'pdf', fileName: string, options: { quality: number; pdfOrientation: 'portrait' | 'landscape' }) => void;
}

export function WhiteboardExportPanel({ onExport }: WhiteboardExportPanelProps) {
  const [fileName, setFileName] = useState('my-whiteboard');
  const [format, setFormat] = useState<'png' | 'jpg' | 'pdf'>('png');
  const [quality, setQuality] = useState(0.9);
  const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('landscape');

  const handleExport = () => {
    onExport(format, fileName, { quality, pdfOrientation });
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-4 space-y-4">
      <div>
        <h3 className="text-sm font-sans font-bold text-ink">Export Board</h3>
        <p className="text-[12px] text-slate font-sans">Save your drawings to your computer</p>
      </div>

      {/* File Name */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-sans font-medium text-slate">File Name</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="whiteboard-filename"
          className="w-full h-9 px-3 py-1 bg-background border border-border rounded-md text-sm font-sans text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Format Selector */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-sans font-medium text-slate">Format</label>
        <div className="grid grid-cols-3 gap-2">
          {(['png', 'jpg', 'pdf'] as const).map((fmt) => {
            const isActive = format === fmt;
            return (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`
                  h-9 rounded-md border flex items-center justify-center gap-1.5 text-xs font-sans font-semibold cursor-pointer transition-all duration-150
                  ${isActive 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-border bg-background text-slate hover:text-ink'
                  }
                `}
              >
                {fmt === 'pdf' ? (
                  <FileText className="w-3.5 h-3.5" />
                ) : (
                  <FileImage className="w-3.5 h-3.5" />
                )}
                <span className="uppercase">{fmt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional settings based on format */}
      {format === 'jpg' && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-sans font-medium text-slate">Image Quality</label>
            <span className="text-xs font-mono text-slate">{Math.round(quality * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full accent-primary bg-background border border-border rounded-lg appearance-none h-1.5 cursor-pointer"
          />
        </div>
      )}

      {format === 'pdf' && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          <label className="text-[12px] font-sans font-medium text-slate">PDF Layout (A4)</label>
          <div className="grid grid-cols-2 gap-2">
            {(['portrait', 'landscape'] as const).map((orient) => {
              const isActive = pdfOrientation === orient;
              return (
                <button
                  key={orient}
                  onClick={() => setPdfOrientation(orient)}
                  className={`
                    h-8 rounded-md border text-[11px] font-sans font-medium capitalize cursor-pointer transition-all duration-150
                    ${isActive 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-border bg-background text-slate hover:text-ink'
                    }
                  `}
                >
                  {orient}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Export Action Button */}
      <Button
        onClick={handleExport}
        variant="primary"
        size="md"
        className="w-full text-xs"
        leftIcon={<Download className="w-4 h-4" />}
      >
        Export File
      </Button>
    </div>
  );
}
