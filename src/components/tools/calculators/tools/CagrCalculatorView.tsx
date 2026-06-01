'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateCagr } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface CagrCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function CagrCalculatorView({ toolId, title, description }: CagrCalculatorViewProps) {
  const [initialValue, setInitialValue] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(250000);
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<{
    cagr: number;
    totalGrowth: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    initialValue?: string | null;
    finalValue?: string | null;
    years?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const initialErr = validatePositiveNumber(initialValue, 'Initial value');
    const finalErr = validatePositiveNumber(finalValue, 'Final value');
    const yearsErr = validatePositiveNumber(years, 'Number of years');

    if (initialErr || finalErr || yearsErr) {
      setErrors({
        initialValue: initialErr,
        finalValue: finalErr,
        years: yearsErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateCagr(initialValue, finalValue, years);
    setResult(res);
  };

  const handleReset = () => {
    setInitialValue(100000);
    setFinalValue(250000);
    setYears(5);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "CAGR = ((Final Value / Initial Value)^(1 / Years) - 1) × 100\nTotal Growth = ((Final Value - Initial Value) / Initial Value) × 100";
  const example = "Initial Value: ₹100,000, Final Value: ₹250,000, Years: 5\nCAGR: 20.11%\nTotal Growth: 150%";

  const resultItems = result ? [
    { label: 'Initial Value', value: formatCurrency(initialValue) },
    { label: 'Final Value', value: formatCurrency(finalValue) },
    { label: 'Absolute Growth Amount', value: formatCurrency(finalValue - initialValue) },
    { label: 'Total Absolute Growth', value: `${result.totalGrowth.toFixed(2)}%` },
    { label: 'CAGR (Annualized)', value: `${result.cagr.toFixed(2)}%` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Initial Value (Buying Price)"
        value={initialValue || ''}
        onChange={(val) => setInitialValue(val)}
        prefixText="₹"
        error={errors.initialValue}
        required
      />
      <CalculatorInput
        label="Final Value (Selling Price)"
        value={finalValue || ''}
        onChange={(val) => setFinalValue(val)}
        prefixText="₹"
        error={errors.finalValue}
        required
      />
      <CalculatorInput
        label="Time Period (Years)"
        value={years || ''}
        onChange={(val) => setYears(val)}
        suffixText="years"
        error={errors.years}
        required
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="CAGR Growth Summary"
      highlightLabel="Compound Annual Growth Rate"
      highlightValue={`${result.cagr.toFixed(2)}%`}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter initial & final asset values along with investment years to calculate compound annual growth rate.
    </div>
  );

  return (
    <CalculatorLayout
      toolId={toolId}
      title={title}
      description={description}
      onCalculate={handleCalculate}
      onReset={handleReset}
      inputs={inputs}
      results={results}
      formula={formula}
      example={example}
    />
  );
}
