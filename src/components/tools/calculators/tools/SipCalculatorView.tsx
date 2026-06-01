'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateSip } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface SipCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function SipCalculatorView({ toolId, title, description }: SipCalculatorViewProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<{
    investedAmount: number;
    estimatedReturns: number;
    totalMaturityValue: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    monthlyInvestment?: string | null;
    expectedReturnRate?: string | null;
    years?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyInvErr = validatePositiveNumber(monthlyInvestment, 'Monthly investment');
    const returnRateErr = validatePositiveNumber(expectedReturnRate, 'Expected return rate');
    const yearsErr = validatePositiveNumber(years, 'Duration');

    if (monthlyInvErr || returnRateErr || yearsErr) {
      setErrors({
        monthlyInvestment: monthlyInvErr,
        expectedReturnRate: returnRateErr,
        years: yearsErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateSip(monthlyInvestment, expectedReturnRate, years);
    setResult(res);
  };

  const handleReset = () => {
    setMonthlyInvestment(5000);
    setExpectedReturnRate(12);
    setYears(10);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "FV = P × [((1 + r)^n - 1) / r] × (1 + r)\nWhere FV = Future Value (Maturity Amount), P = Monthly Investment, r = Monthly Interest Rate (Expected Return Rate / 12 / 100), n = Total number of months (Years × 12).";
  const example = "Monthly Investment: ₹5,000, Expected Annual Returns: 12%, Duration: 10 Years\nInvested Amount: ₹600,000\nEstimated Returns: ₹561,695\nTotal Maturity Value: ₹1,161,695";

  const resultItems = result ? [
    { label: 'Invested Amount', value: formatCurrency(result.investedAmount) },
    { label: 'Estimated Returns', value: formatCurrency(result.estimatedReturns) },
    { label: 'Total Maturity Value', value: formatCurrency(result.totalMaturityValue) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Monthly Investment"
        value={monthlyInvestment || ''}
        onChange={(val) => setMonthlyInvestment(val)}
        prefixText="₹"
        error={errors.monthlyInvestment}
        required
      />
      <CalculatorInput
        label="Expected Return Rate (Annual %)"
        value={expectedReturnRate || ''}
        onChange={(val) => setExpectedReturnRate(val)}
        suffixText="%"
        error={errors.expectedReturnRate}
        step="0.1"
        required
      />
      <CalculatorInput
        label="Investment Duration (Years)"
        value={years || ''}
        onChange={(val) => setYears(val)}
        suffixText="years"
        error={errors.years}
        required
      />
    </>
  );

  const chartData = result ? [
    { name: 'Invested Amount', value: result.investedAmount, fill: 'var(--color-primary)' },
    { name: 'Estimated Returns', value: result.estimatedReturns, fill: 'var(--color-accent)' }
  ] : undefined;

  const results = result ? (
    <CalculatorResult
      title="SIP Investment Summary"
      highlightLabel="Future Value"
      highlightValue={formatCurrency(result.totalMaturityValue)}
      items={resultItems}
      chartData={chartData}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter SIP details and click Calculate to view dynamic wealth accumulation estimation.
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
