import React from 'react';
import { Info } from 'lucide-react';

interface FormulaBoxProps {
  formula: string | React.ReactNode;
  example: string | React.ReactNode;
}

export function FormulaBox({ formula, example }: FormulaBoxProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
      <h4 className="font-display font-bold text-sm text-ink flex items-center gap-2 border-b border-border pb-2">
        <Info className="w-4 h-4 text-primary" /> Formula & Calculation
      </h4>
      
      <div className="space-y-3 font-sans text-[13px] text-slate leading-relaxed">
        <div>
          <span className="font-semibold text-ink block mb-1">Mathematical Formula:</span>
          {typeof formula === 'string' ? (
            <div className="p-3 bg-background border border-border rounded-lg font-mono text-[12px] text-ink break-words overflow-x-auto">
              {formula}
            </div>
          ) : (
            formula
          )}
        </div>
        
        <div>
          <span className="font-semibold text-ink block mb-1">Example Calculation:</span>
          {typeof example === 'string' ? (
            <p className="bg-background border border-border p-3 rounded-lg text-ink font-mono text-[12px] whitespace-pre-wrap leading-loose break-words">
              {example}
            </p>
          ) : (
            example
          )}
        </div>
      </div>
    </div>
  );
}
