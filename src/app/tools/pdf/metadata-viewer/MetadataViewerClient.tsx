"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/tools/LoadingSpinner';
import { viewPDFMetadata, PDFMetadata } from '@/lib/pdf/pdfHelpers';
import { formatFileSize } from '@/lib/fileHelpers';
import { validatePdfFile } from '@/lib/pdf/pdfValidation';
import { FileText, Eye, Info } from 'lucide-react';

export function MetadataViewerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<PDFMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleFileSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setWarning(null);
    setMetadata(null);
    const selectedFile = selectedFiles[0];

    const validation = validatePdfFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid PDF file.');
      return;
    }
    if (validation.warning) {
      setWarning(validation.warning);
    }

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const data = await viewPDFMetadata(selectedFile);
      setMetadata(data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to extract metadata. The PDF might be corrupted or encrypted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setMetadata(null);
    setError(null);
    setWarning(null);
  };

  // Helper to format key strings
  const formatKeyLabel = (key: string) => {
    const labels: Record<string, string> = {
      fileName: 'File Name',
      fileSize: 'File Size',
      totalPages: 'Total Pages',
      title: 'Title',
      author: 'Author',
      subject: 'Subject',
      keywords: 'Keywords',
      creator: 'Creator / Application',
      producer: 'PDF Producer',
      creationDate: 'Creation Date',
      modificationDate: 'Modification Date'
    };
    return labels[key] || key;
  };

  return (
    <ToolLayout
      howToUse={[
        "Upload a PDF file to analyze its metadata.",
        "The tool will instantly read and display hidden information like Author, Creator, Producer, and Dates.",
        "Review the extracted information securely on your screen.",
        "No download is needed as this is a viewing tool."
]}
      faqs={[
        {
                "question": "What kind of metadata does this tool reveal?",
                "answer": "It reveals standard document properties including title, author, subject, creation date, modification date, and the software used to create it."
        },
        {
                "question": "Can I edit the metadata here?",
                "answer": "This specific tool is a viewer. Editing capabilities would require a different utility."
        }
]}
      
      title="PDF Metadata Viewer"
      description="View hidden properties and EXIF data of any PDF file locally. Extract author, title, dates, keywords, and creation tools instantly."
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
          title="Upload a PDF file to view metadata"
          subtitle="Choose the PDF document you want to inspect"
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-base text-ink">{file.name}</h4>
                <p className="font-sans text-[13px] text-slate mt-0.5">
                  Properties Viewer
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {isProcessing && <LoadingSpinner text="Extracting hidden metadata..." />}

          {/* Metadata Display */}
          {metadata && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border border-border rounded-xl overflow-hidden bg-background/30">
                <table className="w-full text-left font-sans text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-background">
                      <th className="p-4 font-bold text-[12px] text-slate uppercase tracking-wider w-1/3">Property</th>
                      <th className="p-4 font-bold text-[12px] text-slate uppercase tracking-wider w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(metadata).map(([key, val]) => {
                      const displayVal = key === 'fileSize' ? formatFileSize(val as number) : (val ? String(val) : '—');
                      return (
                        <tr key={key} className="border-b border-border/60 hover:bg-surface transition-colors">
                          <td className="p-4 font-semibold text-slate">{formatKeyLabel(key)}</td>
                          <td className="p-4 text-ink font-mono text-[13px] break-all">{displayVal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg flex gap-3 text-primary text-[13px]">
                <Info className="w-5 h-5 flex-shrink-0" />
                <p className="font-sans leading-relaxed">
                  Metadata extraction runs 100% locally on your machine. We never access, index, or store your documents.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
