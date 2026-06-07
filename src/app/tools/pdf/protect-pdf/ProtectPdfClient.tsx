"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { checkPdfPasswordProtected, validatePdfFile } from '@/lib/pdf/pdfValidation';
import { protectPDFDocument } from '@/lib/pdf/pdfHelpers';
import { formatFileSize } from '@/lib/fileHelpers';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export function ProtectPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setResultBlobUrl(null);
    const selectedFile = selectedFiles[0];

    const validation = validatePdfFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid PDF file.');
      return;
    }
    if (validation.warning) {
      setWarning(validation.warning);
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const isProtected = await checkPdfPasswordProtected(buffer);
      if (isProtected) {
        setError('This PDF is already password protected. You cannot protect an already encrypted file.');
        return;
      }
      setFile(selectedFile);
    } catch (err: any) {
      console.error(err);
      setError('Failed to parse PDF document. It might be corrupted.');
    }
  };

  const handleApply = async () => {
    if (!file) return;
    if (!password.trim()) {
      setError('Please enter a password to protect your PDF.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultBlobUrl(null);

    try {
      const encryptedBytes = await protectPDFDocument(file, password);
      const blob = new Blob([encryptedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while encrypting the PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPassword('');
    setShowPassword(false);
    setResultBlobUrl(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      howToUse={[
        "Select your file or input your data.",
        "Adjust any specific settings or options as needed.",
        "Click the main action button to process.",
        "Download or copy the result instantly."
      ]}
      faqs={[
        { question: "Is this tool free to use?", answer: "Yes, this tool is completely free with no hidden limits." },
        { question: "Are my files uploaded to a server?", answer: "No, all processing happens locally in your browser ensuring complete privacy and security." }
      ]}
      
      title="Protect PDF"
      description="Encrypt and lock your PDF document with a password. Processing happens locally in your browser for absolute privacy."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      <div className="flex flex-col gap-8">
        {!file && (
          <FileUploader
            accept={{ 'application/pdf': ['.pdf'] }}
            multiple={false}
            onFilesSelected={handleFileSelected}
            maxSize={1024 * 1024 * 1024} // 1GB
          />
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {file && !resultBlobUrl && !isProcessing && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-ink truncate text-lg">
                  {file.name}
                </h3>
                <p className="text-slate text-sm font-sans mt-0.5">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-ink mb-1">
                  Set Document Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a secure password..."
                    className="w-full h-12 px-4 pr-12 bg-background border border-border focus:border-primary rounded-lg text-ink font-sans outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[12px] text-slate mt-2 leading-relaxed">
                  Anyone attempting to open this PDF will be required to enter this password. Keep it safe, as there is no way to recover it!
                </p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleReset}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleApply}>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Lock PDF
                </Button>
              </div>
            </div>
          </div>
        )}

        {isProcessing && <LoadingSpinner text="Encrypting PDF document..." />}

        {resultBlobUrl && (
          <div className="bg-surface border border-border rounded-xl p-8 text-center shadow-sm animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-ink mb-2">
              PDF Successfully Protected!
            </h3>
            <p className="text-slate font-sans mb-8 max-w-md mx-auto">
              Your document is now encrypted and requires a password to open.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleReset}>
                Protect Another
              </Button>
              <DownloadButton
                href={resultBlobUrl}
                download={`protected_${file?.name || 'document.pdf'}`}
              >
                Download Protected PDF
              </DownloadButton>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
