import { useState, useCallback, useRef, useEffect } from 'react';

export interface ConversionResult {
  blob: Blob;
  originalSize: number;
  newSize: number;
  url: string;
}

export function useConversion() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize worker only on the client
    workerRef.current = new Worker(new URL('../engines/conversion.worker.ts', import.meta.url));
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const convert = useCallback((file: File, toFormat: string): Promise<ConversionResult> => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true);
      setError(null);

      // SVG to Raster conversion CANNOT happen in a web worker due to lack of DOM for parsing XML.
      // We must handle it here on the main thread.
      const isSvgInput = file.type.includes('svg') || (file.name && file.name.toLowerCase().endsWith('.svg'));
      
      if (isSvgInput && toFormat !== 'image/svg+xml') {
        file.text().then(text => {
          let newText = text;
          if (!text.includes('width=') && text.includes('viewBox=')) {
             const match = text.match(/viewBox=["'][^"']*?([\d\.]+)\s+([\d\.]+)["']/);
             if (match) {
                newText = text.replace('<svg ', `<svg width="${match[1]}" height="${match[2]}" `);
             }
          }
          if (!newText.includes('width=')) {
             newText = newText.replace('<svg ', '<svg width="1024" height="1024" ');
          }
          
          const newBlob = new Blob([newText], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(newBlob);
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width || 1024;
            canvas.height = img.height || 1024;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              if (toFormat === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
              ctx.drawImage(img, 0, 0);
              canvas.toBlob((blob) => {
                if (blob) {
                  setIsProcessing(false);
                  resolve({
                    blob,
                    originalSize: file.size,
                    newSize: blob.size,
                    url: URL.createObjectURL(blob)
                  });
                } else {
                  setIsProcessing(false);
                  reject(new Error("Canvas toBlob failed for SVG conversion"));
                }
              }, toFormat, toFormat === 'image/jpeg' || toFormat === 'image/webp' ? 0.9 : undefined);
            }
          };
          img.onerror = () => {
            setIsProcessing(false);
            reject(new Error("Failed to load SVG into image element"));
          };
          img.src = url;
        }).catch(err => {
          setIsProcessing(false);
          reject(err);
        });
        return;
      }

      if (!workerRef.current) {
        setIsProcessing(false);
        reject(new Error("Worker not initialized"));
        return;
      }

      const messageId = Math.random().toString(36).substring(7);

      const handler = (e: MessageEvent) => {
        if (e.data.id && e.data.id !== messageId) return;

        setIsProcessing(false);
        workerRef.current?.removeEventListener('message', handler);
        
        if (e.data.success) {
          const url = URL.createObjectURL(e.data.blob);
          resolve({
            blob: e.data.blob,
            originalSize: e.data.originalSize,
            newSize: e.data.newSize,
            url
          });
        } else {
          setError(e.data.error);
          reject(new Error(e.data.error));
        }
      };

      workerRef.current.addEventListener('message', handler);
      workerRef.current.postMessage({ id: messageId, file, toFormat });
    });
  }, []);

  return { convert, isProcessing, error };
}
