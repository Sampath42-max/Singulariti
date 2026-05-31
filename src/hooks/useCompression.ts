import { useState, useCallback, useRef, useEffect } from 'react';

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  url: string;
}

export function useCompression() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize worker only on the client
    workerRef.current = new Worker(new URL('../engines/compression.worker.ts', import.meta.url));
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const compress = useCallback((file: File, quality: number = 0.8, maxWidth?: number): Promise<CompressionResult> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error("Worker not initialized"));
        return;
      }

      setIsProcessing(true);
      setError(null);

      const messageId = Math.random().toString(36).substring(7);

      const handler = (e: MessageEvent) => {
        if (e.data.id && e.data.id !== messageId) return;
        
        setIsProcessing(false);
        workerRef.current?.removeEventListener('message', handler);
        
        if (e.data.success) {
          const finalBlob = e.data.useOriginal ? file : e.data.blob;
          const url = URL.createObjectURL(finalBlob);
          resolve({
            blob: finalBlob,
            originalSize: e.data.originalSize,
            compressedSize: e.data.compressedSize,
            url
          });
        } else {
          setError(e.data.error);
          reject(new Error(e.data.error));
        }
      };

      workerRef.current.addEventListener('message', handler);
      workerRef.current.postMessage({ id: messageId, file, quality, maxWidth });
    });
  }, []);

  return { compress, isProcessing, error };
}
