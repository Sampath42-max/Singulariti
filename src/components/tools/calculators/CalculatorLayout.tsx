import React from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui/Button';
import { RelatedCalculators } from './RelatedCalculators';
import { RefreshCw, Play } from 'lucide-react';

interface CalculatorLayoutProps {
  toolId: string;
  title: string;
  description: string;
  error?: string | null;
  warning?: string | null;
  onClearError?: () => void;
  onCalculate: (e: React.FormEvent) => void;
  onReset: () => void;
  inputs: React.ReactNode;
  results: React.ReactNode;
  formula: string | React.ReactNode;
  example: string | React.ReactNode;
}

export function CalculatorLayout({
  toolId,
  title,
  description,
  error,
  warning,
  onClearError,
  onCalculate,
  onReset,
  inputs,
  results
}: CalculatorLayoutProps) {
  return (
    <ToolLayout
      utilityId={toolId}
      title={title}
      description={description}
      categoryName="Calculator Tools"
      categoryHref="/tools/calculators"
      error={error}
      warning={warning}
      onClearError={onClearError}
    >
      <div className="flex flex-col gap-10 w-full items-center">
        {/* Main calculation workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl">
          {/* Input Form Column */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onCalculate(e);
            }} 
            className="lg:col-span-6 bg-surface border border-border rounded-xl p-5 md:p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-5">
              <h3 className="font-display font-bold text-base text-ink pb-2 border-b border-border mb-2">
                Calculator Parameters
              </h3>
              <div className="space-y-4">
                {inputs}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-border mt-8">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1" 
                onClick={onReset}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                className="flex-1 text-dark"
                leftIcon={<Play className="w-4 h-4 fill-current" />}
              >
                Calculate
              </Button>
            </div>
          </form>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-6">
            {results}
          </div>
        </div>

        {/* Related tools navigation */}
        <RelatedCalculators currentToolId={toolId} />
      </div>
    </ToolLayout>
  );
}
