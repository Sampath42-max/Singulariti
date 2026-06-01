'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateFd } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';
import { InterestResult } from '@/lib/calculators/calculatorTypes';

interface FdCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function FdCalculatorView({ toolId, title, description }: FdCalculatorViewProps) {
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [tenure, setTenure] = useState<number>(1);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [frequency, setFrequency] = useState<'quarterly' | 'monthly' | 'half-yearly' | 'yearly'>('quarterly');
  const [result, setResult] = useState<InterestResult | null>(null);

  const [errors, setErrors] = useState<{
    depositAmount?: string | null;
    interestRate?: string | null;
    tenure?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const depositErr = validatePositiveNumber(depositAmount, 'Deposit amount');
    const rateErr = validatePositiveNumber(interestRate, 'Interest rate');
    const tenureErr = validatePositiveNumber(tenure, 'Tenure');

    if (depositErr || rateErr || tenureErr) {
      setErrors({
        depositAmount: depositErr,
        interestRate: rateErr,
        tenure: tenureErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateFd(depositAmount, interestRate, tenure, tenureType, frequency);
    setResult(res);
  };

  const handleReset = () => {
    setDepositAmount(100000);
    setInterestRate(7.1);
    setTenure(1);
    setTenureType('years');
    setFrequency('quarterly');
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "A = P × (1 + r/n)^(n × t)\nWhere A = Maturity Amount, P = Deposit Amount, r = Annual Interest Rate, n = Compounding frequency per year (e.g. 4 for quarterly), t = Tenure in years.";
  const example = "Deposit: ₹100,000, Interest Rate: 7.1% p.a., Tenure: 1 Year, Compounding: Quarterly\nInterest Earned: ₹7,290\nMaturity Value: ₹107,290";

  const resultItems = result ? [
    { label: 'Invested Amount', value: formatCurrency(result.principalAmount) },
    { label: 'Interest Earned', value: formatCurrency(result.totalInterest) },
    { label: 'Maturity Amount', value: formatCurrency(result.maturityAmount) },
    { label: 'Interest Share', value: `${result.interestPercentage.toFixed(1)}%` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Deposit Amount"
        value={depositAmount || ''}
        onChange={(val) => setDepositAmount(val)}
        prefixText="₹"
        error={errors.depositAmount}
        required
      />
      <CalculatorInput
        label="Interest Rate (Annual %)"
        value={interestRate || ''}
        onChange={(val) => setInterestRate(val)}
        suffixText="%"
        error={errors.interestRate}
        step="0.05"
        required
      />
      <div className="flex gap-4">
        <CalculatorInput
          label="Tenure"
          value={tenure || ''}
          onChange={(val) => setTenure(val)}
          error={errors.tenure}
          className="flex-1"
          required
        />
        <CalculatorSelect
          label="Tenure Type"
          value={tenureType}
          onChange={(e) => setTenureType(e.target.value as any)}
          options={[
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' },
          ]}
          className="w-28"
        />
      </div>
      <CalculatorSelect
        label="Compounding Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as any)}
        options={[
          { value: 'quarterly', label: 'Quarterly (Standard)' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'half-yearly', label: 'Half-yearly' },
          { value: 'yearly', label: 'Yearly' },
        ]}
      />
    </>
  );

  const chartData = result ? [
    { name: 'Invested Amount', value: result.principalAmount, fill: 'var(--color-primary)' },
    { name: 'Interest Earned', value: result.totalInterest, fill: 'var(--color-accent)' }
  ] : undefined;

  const results = result ? (
    <CalculatorResult
      title="FD Investment Summary"
      highlightLabel="Maturity Value"
      highlightValue={formatCurrency(result.maturityAmount)}
      items={resultItems}
      chartData={chartData}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter deposit details to see compounding returns and final maturity payouts.
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
