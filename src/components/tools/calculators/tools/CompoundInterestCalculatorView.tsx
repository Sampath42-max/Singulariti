'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateCompoundInterest } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface CompoundInterestCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function CompoundInterestCalculatorView({ toolId, title, description }: CompoundInterestCalculatorViewProps) {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [frequency, setFrequency] = useState<'yearly' | 'half-yearly' | 'quarterly' | 'monthly' | 'daily'>('yearly');
  const [result, setResult] = useState<{
    finalAmount: number;
    interestEarned: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    principal?: string | null;
    interestRate?: string | null;
    timePeriod?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principalErr = validatePositiveNumber(principal, 'Principal amount');
    const interestRateErr = validatePositiveNumber(interestRate, 'Interest rate');
    const timePeriodErr = validatePositiveNumber(timePeriod, 'Time period');

    if (principalErr || interestRateErr || timePeriodErr) {
      setErrors({
        principal: principalErr,
        interestRate: interestRateErr,
        timePeriod: timePeriodErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateCompoundInterest(principal, interestRate, timePeriod, frequency);
    setResult(res);
  };

  const handleReset = () => {
    setPrincipal(100000);
    setInterestRate(6.5);
    setTimePeriod(5);
    setFrequency('yearly');
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "A = P × (1 + r/n)^(n × t)\nWhere A = Final Amount, P = Principal Amount, r = Annual Interest Rate, n = Compounding frequency per year, t = Time period in years.\nCompound Interest = A - P";
  const example = "Principal: ₹100,000, Interest Rate: 6.5%, Period: 5 Years, Compounding: Quarterly\nFinal Amount: ₹138,042\nCompound Interest Earned: ₹38,042";

  const resultItems = result ? [
    { label: 'Principal Amount', value: formatCurrency(principal) },
    { label: 'Interest Earned', value: formatCurrency(result.interestEarned) },
    { label: 'Final Maturity Amount', value: formatCurrency(result.finalAmount) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Principal Amount"
        value={principal || ''}
        onChange={(val) => setPrincipal(val)}
        prefixText="₹"
        error={errors.principal}
        required
      />
      <CalculatorInput
        label="Interest Rate (Annual %)"
        value={interestRate || ''}
        onChange={(val) => setInterestRate(val)}
        suffixText="%"
        error={errors.interestRate}
        step="0.01"
        required
      />
      <CalculatorInput
        label="Time Period (Years)"
        value={timePeriod || ''}
        onChange={(val) => setTimePeriod(val)}
        suffixText="years"
        error={errors.timePeriod}
        required
      />
      <CalculatorSelect
        label="Compounding Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as any)}
        options={[
          { value: 'yearly', label: 'Yearly' },
          { value: 'half-yearly', label: 'Half-yearly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'daily', label: 'Daily' },
        ]}
      />
    </>
  );

  const chartData = result ? [
    { name: 'Principal Amount', value: principal, fill: 'var(--color-primary)' },
    { name: 'Interest Earned', value: result.interestEarned, fill: 'var(--color-accent)' }
  ] : undefined;

  const results = result ? (
    <CalculatorResult
      title="Compound Interest Results"
      highlightLabel="Future Value"
      highlightValue={formatCurrency(result.finalAmount)}
      items={resultItems}
      chartData={chartData}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter amount, rate, period and compounding frequency to calculate final returns.
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
