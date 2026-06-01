'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateRoi } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface RoiCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function RoiCalculatorView({ toolId, title, description }: RoiCalculatorViewProps) {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(150000);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const [timePeriod, setTimePeriod] = useState<number>(3);
  const [result, setResult] = useState<{
    netProfit: number;
    roi: number;
    annualizedRoi?: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    initialInvestment?: string | null;
    finalValue?: string | null;
    additionalCosts?: string | null;
    timePeriod?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const initErr = validatePositiveNumber(initialInvestment, 'Initial investment');
    const finalErr = validatePositiveNumber(finalValue, 'Final value');
    const costsErr = validatePositiveNumber(additionalCosts, 'Additional costs', true);
    const periodErr = validatePositiveNumber(timePeriod, 'Time period', true);

    if (initErr || finalErr || costsErr || periodErr) {
      setErrors({
        initialInvestment: initErr,
        finalValue: finalErr,
        additionalCosts: costsErr,
        timePeriod: periodErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateRoi(initialInvestment, finalValue, additionalCosts, timePeriod);
    setResult(res);
  };

  const handleReset = () => {
    setInitialInvestment(100000);
    setFinalValue(150000);
    setAdditionalCosts(0);
    setTimePeriod(3);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "ROI = Net Profit / Investment Cost × 100\nAnnualized ROI = ((Final Value / Investment Cost)^(1 / Years) - 1) × 100\nWhere Investment Cost = Initial Investment + Additional Costs.";
  const example = "Initial Investment: ₹100,000, Final Value: ₹150,000, Additional Cost: ₹5,000, Period: 3 Years\nNet Profit: ₹45,000\nAbsolute ROI: 42.86%\nAnnualized ROI: 12.63%";

  const resultItems = result ? [
    { label: 'Total Investment Cost', value: formatCurrency(initialInvestment + additionalCosts) },
    { label: 'Final Maturity Value', value: formatCurrency(finalValue) },
    { label: 'Net Profit', value: formatCurrency(result.netProfit) },
    { label: 'Absolute Return (ROI)', value: `${result.roi.toFixed(2)}%` },
    ...(result.annualizedRoi !== undefined ? [
      { label: 'Annualized ROI (CAGR)', value: `${result.annualizedRoi.toFixed(2)}%` }
    ] : []),
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Initial Investment"
        value={initialInvestment || ''}
        onChange={(val) => setInitialInvestment(val)}
        prefixText="₹"
        error={errors.initialInvestment}
        required
      />
      <CalculatorInput
        label="Final Value"
        value={finalValue || ''}
        onChange={(val) => setFinalValue(val)}
        prefixText="₹"
        error={errors.finalValue}
        required
      />
      <CalculatorInput
        label="Additional Costs / Expenses (Optional)"
        value={additionalCosts === 0 ? '0' : (additionalCosts || '')}
        onChange={(val) => setAdditionalCosts(val)}
        prefixText="₹"
        error={errors.additionalCosts}
      />
      <CalculatorInput
        label="Holding Period (Years, Optional)"
        value={timePeriod === 0 ? '0' : (timePeriod || '')}
        onChange={(val) => setTimePeriod(val)}
        suffixText="years"
        error={errors.timePeriod}
      />
    </>
  );

  const chartData = (result && result.netProfit > 0) ? [
    { name: 'Total Investment', value: initialInvestment + additionalCosts, fill: 'var(--color-primary)' },
    { name: 'Net Profit', value: result.netProfit, fill: 'var(--color-accent)' }
  ] : undefined;

  const results = result ? (
    <CalculatorResult
      title="ROI Performance Summary"
      highlightLabel="Absolute Return (ROI)"
      highlightValue={`${result.roi.toFixed(2)}%`}
      items={resultItems}
      chartData={chartData}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter your initial and final valuations to calculate percentage returns and annualized compound rates.
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
