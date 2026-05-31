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
