"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ToolRegistryItem } from '../../registry/types';
import { Dropzone } from '../ui/Dropzone';
import { Button } from '../ui/Button';
import { Info, Maximize, FileCode2, Droplet, Palette as PaletteIcon, Copy, CheckCircle2, MousePointer2, Download } from 'lucide-react';

interface UtilityEngineProps {
  tool: ToolRegistryItem;
}

export function UtilityEngine({ tool }: UtilityEngineProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // States for different tools
  const [dimensions, setDimensions] = useState<{w: number, h: number, ratio: string} | null>(null);
  const [realFormat, setRealFormat] = useState<{hex: string, mime: string} | null>(null);
  
  const [pickedColor, setPickedColor] = useState<{hex: string, rgb: string} | null>(null);
  const [hoverColor, setHoverColor] = useState<{hex: string, rgb: string} | null>(null);
  const [palette, setPalette] = useState<{hex: string, rgb: string}[]>(([]));
  
  const [copied, setCopied] = useState<string | null>(null);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const exportPalette = () => {
    if (palette.length === 0) return;
    const csv = 'HEX,RGB\n' + palette.map(p => `${p.hex},"${p.rgb}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `singulariti_palette_${file?.name || 'export'}.csv`;
    a.click();
  };

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);

    // If format detector, read magic numbers
    if (tool.id === 'image-format-detector') {
      const buffer = await selectedFile.slice(0, 4).arrayBuffer();
      const arr = new Uint8Array(buffer);
      const hex = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      
      let mime = 'Unknown';
      if (hex.startsWith('FFD8FF')) mime = 'image/jpeg';
      else if (hex.startsWith('89504E47')) mime = 'image/png';
      else if (hex.startsWith('47494638')) mime = 'image/gif';
      else if (hex.startsWith('52494646')) mime = 'image/webp (RIFF header)';
      else if (hex.startsWith('49492A00') || hex.startsWith('4D4D002A')) mime = 'image/tiff';
      else if (hex.startsWith('00000100')) mime = 'image/x-icon';
      
      setRealFormat({ hex, mime });
    }
  };

  const onImageLoad = async (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    
    // Calculate simplified aspect ratio
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(w, h);
    setDimensions({ w, h, ratio: `${w/divisor}:${h/divisor}` });

    if (tool.id === 'image-color-palette-extractor') {
      try {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCanvas.width = 100;
          tempCanvas.height = 100;
          tempCtx.drawImage(img, 0, 0, 100, 100);
          const data = tempCtx.getImageData(0, 0, 100, 100).data;
          
          const colorMap = new Map<string, {count: number, r: number, g: number, b: number}>();
          for (let i = 0; i < data.length; i += 4) {
            if (data[i+3] < 128) continue; // ignore transparent
            const r = data[i], g = data[i+1], b = data[i+2];
            // Quantize colors to bin them together
            const qR = Math.round(r / 32) * 32;
            const qG = Math.round(g / 32) * 32;
            const qB = Math.round(b / 32) * 32;
            const key = `${qR},${qG},${qB}`;
            
            if (!colorMap.has(key)) colorMap.set(key, { count: 1, r, g, b });
            else colorMap.get(key)!.count++;
          }
          
          const sorted = Array.from(colorMap.values()).sort((a, b) => b.count - a.count).slice(0, 6);
          const formatPalette = sorted.map(c => {
            const rgb = `rgb(${c.r}, ${c.g}, ${c.b})`;
            const hex = '#' + [c.r, c.g, c.b].map(x => x.toString(16).padStart(2, '0')).join('');
            return { hex, rgb };
          });
          setPalette(formatPalette);
        }
      } catch (err) {
        console.error("Extraction failed", err);
      }
    }

    if (tool.id === 'color-picker-from-image') {
      // Draw to canvas for picking
      const canvas = canvasRef.current;
      if (canvas && img) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      }
    }
  };

  const getCanvasColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hex = '#' + [r, g, b].map(val => val.toString(16).padStart(2, '0')).join('');
    
    return { rgb, hex };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool.id !== 'color-picker-from-image') return;
    const color = getCanvasColor(e);
    if (color) setPickedColor(color);
  };

  const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool.id !== 'color-picker-from-image') return;
    const color = getCanvasColor(e);
    if (color) setHoverColor(color);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const InfoCard = ({ label, value, interactive = false }: { label: string, value: React.ReactNode, interactive?: boolean }) => (
    <div className={`bg-background border border-border p-4 rounded-lg flex flex-col items-center text-center justify-center min-w-0 ${interactive ? 'group cursor-pointer' : ''}`}>
      <span className="text-[12px] font-medium text-slate uppercase tracking-wider mb-1 flex-shrink-0">{label}</span>
      <div className={`text-lg font-mono text-ink font-bold w-full transition-all duration-200 ${interactive ? 'truncate group-hover:whitespace-normal group-hover:break-all group-active:whitespace-normal group-active:break-all' : 'truncate'}`}>
        {value}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      {!file ? (
        <Dropzone 
          onFileSelect={processFile} 
          title="Drop image to analyze"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <p className="font-sans text-[13px] text-slate mb-1">Analyzing file</p>
              <h4 className="font-display font-bold text-lg text-ink truncate max-w-md">{file.name}</h4>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => {
                setFile(null);
                setPickedColor(null);
                setPalette([]);
              }}>
                Start Over
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Tools / Results */}
            <div className="lg:col-span-1 space-y-6">
              
              {tool.id === 'image-metadata-viewer' && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold flex items-center text-ink"><Info className="w-5 h-5 mr-2" /> File Metadata</h3>
                  <InfoCard label="File Name (Hover to expand)" value={file.name} interactive={true} />
                  <InfoCard label="File Size" value={formatSize(file.size)} />
                  <InfoCard label="MIME Type" value={file.type || 'Unknown'} />
                  <InfoCard label="Last Modified" value={<span className="text-sm">{new Date(file.lastModified).toLocaleString()}</span>} />
                </div>
              )}

              {tool.id === 'image-dimension-checker' && dimensions && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold flex items-center text-ink"><Maximize className="w-5 h-5 mr-2" /> Dimensions</h3>
                  <InfoCard label="Width" value={`${dimensions.w} px`} />
                  <InfoCard label="Height" value={`${dimensions.h} px`} />
                  <InfoCard label="Aspect Ratio" value={dimensions.ratio} />
                </div>
              )}

              {tool.id === 'image-format-detector' && realFormat && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold flex items-center text-ink"><FileCode2 className="w-5 h-5 mr-2" /> Format Analysis</h3>
                  <p className="text-[13px] text-slate mb-4">We read the magic numbers (file signature) at the start of the file to determine its true format, ignoring the extension.</p>
                  <InfoCard label="Extension" value={file.name.split('.').pop()?.toUpperCase() || 'NONE'} />
                  <InfoCard label="True Format" value={<span className={realFormat.mime !== 'Unknown' ? 'text-primary' : 'text-amber-500'}>{realFormat.mime}</span>} />
                  <InfoCard label="Hex Signature" value={realFormat.hex} />
                </div>
              )}

              {tool.id === 'color-picker-from-image' && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold flex items-center text-ink"><Droplet className="w-5 h-5 mr-2" /> Color Picker</h3>
                  <p className="text-[13px] text-slate mb-4">Click anywhere on the image preview to extract the exact pixel color.</p>
                  
                  {pickedColor || hoverColor ? (
                    <div className="space-y-3">
                      <div className="w-full h-24 rounded-lg border border-border shadow-inner transition-colors flex items-end p-2" style={{ backgroundColor: hoverColor ? hoverColor.hex : pickedColor ? pickedColor.hex : 'transparent' }}>
                         {hoverColor && <span className="bg-ink/60 text-background text-[11px] px-2 py-1 rounded backdrop-blur-sm shadow-sm flex items-center"><MousePointer2 className="w-3 h-3 mr-1" /> {hoverColor.hex.toUpperCase()}</span>}
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1 border border-border rounded-md px-3 py-2 bg-background overflow-hidden">
                          <span className="block text-[11px] text-slate font-medium mb-1">HEX</span>
                          <span className="font-mono text-sm text-ink truncate block">{(pickedColor?.hex || hoverColor?.hex || '').toUpperCase()}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(pickedColor?.hex || hoverColor?.hex || '')}
                          className="px-3 bg-surface border border-border rounded-md hover:bg-slate/5 transition-colors flex items-center justify-center text-slate shrink-0"
                        >
                          {copied === (pickedColor?.hex || hoverColor?.hex) ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1 border border-border rounded-md px-3 py-2 bg-background overflow-hidden">
                          <span className="block text-[11px] text-slate font-medium mb-1">RGB</span>
                          <span className="font-mono text-sm text-ink truncate block">{pickedColor?.rgb || hoverColor?.rgb}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(pickedColor?.rgb || hoverColor?.rgb || '')}
                          className="px-3 bg-surface border border-border rounded-md hover:bg-slate/5 transition-colors flex items-center justify-center text-slate shrink-0"
                        >
                          {copied === (pickedColor?.rgb || hoverColor?.rgb) ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-slate text-sm bg-background">
                      Hover to pick color
                    </div>
                  )}
                </div>
              )}

              {tool.id === 'image-color-palette-extractor' && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold flex items-center text-ink"><PaletteIcon className="w-5 h-5 mr-2" /> Extracted Palette</h3>
                  {palette.length > 0 ? (
                    <>
                    <div className="grid grid-cols-1 gap-2">
                      {palette.map((color, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 border border-border rounded-lg bg-background">
                          <div className="w-10 h-10 rounded-md shadow-sm" style={{ backgroundColor: color.hex }}></div>
                          <div className="flex-1">
                            <span className="block font-mono text-[13px] font-bold text-ink">{color.hex.toUpperCase()}</span>
                            <span className="block font-mono text-[11px] text-slate">{color.rgb}</span>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(color.hex)}
                            className="p-2 hover:bg-slate/5 rounded-md transition-colors text-slate"
                            title="Copy HEX"
                          >
                            {copied === color.hex ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={exportPalette}>
                      <Download className="w-4 h-4 mr-2" /> Export CSV
                    </Button>
                  </>
                ) : (
                    <div className="text-sm text-slate">Extracting palette...</div>
                  )}
                </div>
              )}

            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-2">
              <div className="relative rounded-lg border border-border bg-background overflow-hidden min-h-[400px] flex items-center justify-center">
                
                {imageUrl && tool.id === 'color-picker-from-image' ? (
                  <>
                    <canvas 
                      ref={canvasRef} 
                      className="max-w-full max-h-[60vh] object-contain cursor-crosshair shadow-sm"
                      onClick={handleCanvasClick}
                      onMouseMove={handleCanvasMove}
                      onMouseLeave={() => setHoverColor(null)}
                    />
                    <img 
                      ref={imgRef}
                      src={imageUrl} 
                      alt="Original hidden" 
                      className="hidden" 
                      onLoad={onImageLoad}
                      crossOrigin="anonymous" 
                    />
                  </>
                ) : imageUrl ? (
                  <img 
                    ref={imgRef}
                    src={imageUrl} 
                    alt="Preview" 
                    className="max-w-full max-h-[60vh] object-contain shadow-sm" 
                    onLoad={onImageLoad}
                    crossOrigin="anonymous" 
                  />
                ) : null}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
