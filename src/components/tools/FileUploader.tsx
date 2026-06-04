"use client";

import React from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
  maxSize?: number; // in bytes
}

export function FileUploader({
  onFilesSelected,
  accept = { 'application/pdf': ['.pdf'] },
  multiple = false,
  title,
  subtitle,
  maxSize
}: FileUploaderProps) {
  const defaultTitle = multiple ? 'Drop files here' : 'Drop file here';
  const defaultSubtitle = multiple ? 'or click to upload multiple files' : 'or click to browse your device';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    maxSize,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
        isDragActive
          ? 'border-primary bg-primary/5 scale-[1.02]'
          : 'border-border bg-surface hover:border-slate'
      }`}
    >
      <input {...getInputProps()} />
      
      <div className="w-20 h-20 mx-auto bg-background rounded-full flex items-center justify-center text-primary mb-6 pointer-events-none">
        <UploadCloud className="w-10 h-10" />
      </div>
      
      <h3 className="font-display font-bold text-2xl text-ink mb-2 pointer-events-none">
        {title || defaultTitle}
      </h3>
      
      <p className="text-slate font-sans mb-8 pointer-events-none">
        {subtitle || defaultSubtitle}
      </p>
      
      <div className="flex justify-center pointer-events-none">
        <Button variant="primary" size="lg" className="w-full max-w-xs">
          Choose {multiple ? 'Files' : 'File'}
        </Button>
      </div>
      
      <div className="mt-6 flex flex-col items-center justify-center gap-2 text-[13px] font-sans text-slate pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Browser-based
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>No upload
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Secure
          </span>
        </div>
        <p className="text-[12px] text-slate/85 mt-1.5 font-medium text-center max-w-md">
          Your file is processed in your browser and is not uploaded to our server.
        </p>
      </div>
    </div>
  );
}
