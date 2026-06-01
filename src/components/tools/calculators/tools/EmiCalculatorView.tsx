'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateEmi } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';
import { InterestResult } from '@/lib/calculators/calculatorTypes';

interface EmiCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function EmiCalculatorView({ toolId, title, description }: EmiCalculatorViewProps) {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<InterestResult | null>(null);

  const [errors, setErrors] = useState<{
    loanAmount?: string | null;
    interestRate?: string | null;
    tenure?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const loanAmountErr = validatePositiveNumber(loanAmount, 'Loan amount');
    const interestRateErr = validatePositiveNumber(interestRate, 'Interest rate');
    const tenureErr = validatePositiveNumber(tenure, 'Tenure');

    if (loanAmountErr || interestRateErr || tenureErr) {
      setErrors({
        loanAmount: loanAmountErr,
        interestRate: interestRateErr,
        tenure: tenureErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateEmi(loanAmount, interestRate, tenure, tenureType);
    setResult(res);
  };

  const handleReset = () => {
    setLoanAmount(1000000);
    setInterestRate(8.5);
    setTenure(5);
    setTenureType('years');
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "EMI = P × R × (1 + R)^N / ((1 + R)^N - 1)\nWhere P = Principal, R = Monthly Interest Rate (Annual Rate / 12 / 100), N = Number of Monthly Installments.";
  const example = "Principal: ₹1,000,000, Interest Rate: 8.5% p.a., Tenure: 5 Years (60 months)\nMonthly EMI: ₹20,517\nTotal Interest: ₹230,993\nTotal Payment: ₹1,230,993";

  const resultItems = result ? [
    { label: 'Principal Amount', value: formatCurrency(result.principalAmount) },
    { label: 'Monthly EMI', value: formatCurrency(result.monthlyEmi) },
    { label: 'Total Interest Payable', value: formatCurrency(result.totalInterest) },
    { label: 'Total Payment (Principal + Interest)', value: formatCurrency(result.totalPayment) },
    { label: 'Interest Percentage', value: `${result.interestPercentage.toFixed(1)}%` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Loan Amount"
        value={loanAmount || ''}
        onChange={(val) => setLoanAmount(val)}
        prefixText="₹"
        error={errors.loanAmount}
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
      <div className="flex gap-4">
        <CalculatorInput
          label="Loan Tenure"
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
    </>
  );

  const chartData = result ? [
    { name: 'Principal Amount', value: result.principalAmount, fill: 'var(--color-primary)' },
    { name: 'Total Interest', value: result.totalInterest, fill: 'var(--color-accent)' }
  ] : undefined;

  const results = result ? (
    <CalculatorResult
      title="EMI Repayment Summary"
      highlightLabel="Monthly EMI"
      highlightValue={formatCurrency(result.monthlyEmi)}
      items={resultItems}
      chartData={chartData}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter loan parameters and click Calculate to view monthly payment schedule and interest breakdown.
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
