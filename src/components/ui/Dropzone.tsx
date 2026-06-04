import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from './Button';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  title?: string;
  subtitle?: string;
}

export function Dropzone({ 
  onFileSelect, 
  accept = "image/*",
  title = "Drop image here",
  subtitle = "or click to browse your device"
}: DropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
        dragOver ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border bg-surface hover:border-slate'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept={accept} 
      />
      <div className="w-20 h-20 mx-auto bg-background rounded-full flex items-center justify-center text-primary mb-6 pointer-events-none">
        <UploadCloud className="w-10 h-10" />
      </div>
      <h3 className="font-display font-bold text-2xl text-ink mb-2 pointer-events-none">{title}</h3>
      <p className="text-slate font-sans mb-8 pointer-events-none">{subtitle}</p>
      <div className="flex justify-center pointer-events-none">
        <Button variant="primary" size="lg" className="w-full max-w-xs">
          Choose File
        </Button>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 text-[13px] font-sans text-slate pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Browser-based</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>No upload</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Secure</span>
        </div>
        <p className="text-[12px] text-slate/85 mt-1.5 font-medium text-center max-w-md">
          Your file is processed in your browser and is not uploaded to our server.
        </p>
      </div>
    </div>
  );
}
