"use client";

import React, { useState } from 'react';
import { pdfjsLib } from '@/lib/pdfjsSetup';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { loadPdfDocument, extractTextFromPdf } from '@/lib/pdf/pdfRenderHelpers';
import { checkPdfPasswordProtected, validatePdfFile, getPdfErrorMessage } from '@/lib/pdf/pdfValidation';
import { readPdfFile } from '@/lib/pdf/readPdfFile';
import { formatFileSize } from '@/lib/fileHelpers';
import { downloadBlob } from '@/lib/pdf/downloadBlob';
import { FileText, Copy, Download, Check, Clipboard } from 'lucide-react';

export function PdfToTextClient({ article }: { article?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setExtractedText(null);
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
      const buffer = await readPdfFile(selectedFile);
      const isProtected = await checkPdfPasswordProtected(buffer.slice(0));
      if (isProtected) {
        setError('This PDF may be encrypted or password-protected. Please upload an unlocked PDF.');
        return;
      }

      setFile(selectedFile);
      setIsProcessing(true);
      
      const doc = await loadPdfDocument(selectedFile);
      setProgress({ current: 0, total: doc.numPages });

      const text = await extractTextFromPdf(doc, (curr, tot) => {
        setProgress({ current: curr, total: tot });
      });

      setExtractedText(text);
    } catch (e) { const err = e as Error;
      console.error(err);
      setError(getPdfErrorMessage(err));
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!extractedText || !file) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    downloadBlob(blob, `${baseName}_extracted.txt`);
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText(null);
    setError(null);
    setWarning(null);
  };

  return (
    <ToolLayout
      article={article}
      howToUse={[
        "Upload a PDF containing text.",
        "Wait a moment while the text is extracted locally.",
        "Review the extracted text in the browser.",
        "Copy the text to your clipboard or download it as a .txt file."
]}
      faqs={[
        {
                "question": "Can it extract text from scanned images?",
                "answer": "This tool extracts embedded digital text. If the PDF is purely scanned images without OCR, it will not extract text."
        },
        {
                "question": "Is formatting preserved?",
                "answer": "The tool extracts raw text. Complex layouts, tables, and exact fonts are not preserved."
        }
]}
      
      title="PDF to Text"
      description="Extract readable text content from any PDF file. The text extraction happens entirely inside your browser. No uploads, total privacy."
      categoryName="PDF Tools"
      categoryHref="/tools/pdf"
      error={error}
      warning={warning}
      onClearError={() => setError(null)}
    >
      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          accept={{ 'application/pdf': ['.pdf'] }}
          title="Upload a PDF file to extract text"
          subtitle="Choose the PDF document you want to extract text from"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-base text-ink">{file.name}</h4>
                <p className="font-sans text-[13px] text-slate mt-0.5">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} disabled={isProcessing}>
              Change File
            </Button>
          </div>

          {/* Progress loader */}
          {isProcessing && (
            <div className="space-y-4 mb-6">
              <LoadingSpinner text={progress.total > 0 ? `Parsing page ${progress.current} of ${progress.total}...` : 'Extracting text...'} />
              {progress.total > 0 && (
                <div className="w-full max-w-md mx-auto bg-border h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-150"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Results Textarea */}
          {extractedText !== null && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="relative">
                <textarea
                  readOnly
                  value={extractedText}
                  className="w-full h-[400px] bg-background border border-border rounded-lg p-4 font-mono text-[13px] text-ink outline-none focus:border-primary resize-none"
                  placeholder="No readable text found in PDF."
                />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    leftIcon={copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-4 h-4" />}
                  >
                    Download .TXT
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
