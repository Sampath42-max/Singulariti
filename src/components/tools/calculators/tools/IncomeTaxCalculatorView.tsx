'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateIncomeTax } from '@/lib/calculators/taxCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';
import { TaxResult } from '@/lib/calculators/calculatorTypes';

interface IncomeTaxCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function IncomeTaxCalculatorView({ toolId, title, description }: IncomeTaxCalculatorViewProps) {
  const [income, setIncome] = useState<number>(1000000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [deductions, setDeductions] = useState<number>(150000);
  const [ageCategory, setAgeCategory] = useState<'below-60' | 'senior' | 'super-senior'>('below-60');
  const [result, setResult] = useState<TaxResult | null>(null);

  const [errors, setErrors] = useState<{
    income?: string | null;
    deductions?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeErr = validatePositiveNumber(income, 'Gross annual income');
    const deductionsErr = validatePositiveNumber(deductions, 'Total deductions', true);

    if (incomeErr || deductionsErr) {
      setErrors({
        income: incomeErr,
        deductions: deductionsErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateIncomeTax(income, regime, deductions, ageCategory);
    setResult(res);
  };

  const handleReset = () => {
    setIncome(1000000);
    setRegime('new');
    setDeductions(150000);
    setAgeCategory('below-60');
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "Old Tax Regime: Slab rates apply after deducting standard & Section 80C exemptions.\nNew Tax Regime: Slabs apply on gross income minus the standard deduction (₹75,000 automatically subtracted).";
  const example = "Gross Income: ₹1,000,000, Regime: New, Deductions: N/A (Standard deduction applied)\nTaxable Income: ₹925,000\nIncome Tax: ₹47,500\nCess (4%): ₹1,900\nTotal Tax Payable: ₹49,400";

  const resultItems = result ? [
    { label: 'Gross Annual Income', value: formatCurrency(income) },
    { label: 'Standard/Declared Deductions', value: regime === 'new' ? '₹75,000 (Standard)' : formatCurrency(deductions) },
    { label: 'Taxable Income', value: formatCurrency(result.taxableIncome) },
    { label: 'Estimated Base Tax', value: formatCurrency(result.estimatedTax) },
    { label: 'Health & Education Cess (4%)', value: formatCurrency(result.cess) },
    { label: 'Total Tax Payable', value: formatCurrency(result.totalTaxPayable) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Gross Annual Income"
        value={income || ''}
        onChange={(val) => setIncome(val)}
        prefixText="₹"
        error={errors.income}
        required
      />
      <CalculatorSelect
        label="Tax Regime"
        value={regime}
        onChange={(e) => setRegime(e.target.value as any)}
        options={[
          { value: 'new', label: 'New Tax Regime (FY 2024-25)' },
          { value: 'old', label: 'Old Tax Regime' },
        ]}
      />
      {regime === 'old' && (
        <CalculatorInput
          label="Exemptions/Deductions (e.g. 80C, 80D, HRA)"
          value={deductions}
          onChange={(val) => setDeductions(val)}
          prefixText="₹"
          error={errors.deductions}
        />
      )}
      {regime === 'old' && (
        <CalculatorSelect
          label="Age Category"
          value={ageCategory}
          onChange={(e) => setAgeCategory(e.target.value as any)}
          options={[
            { value: 'below-60', label: 'Below 60 years' },
            { value: 'senior', label: 'Senior Citizen (60 - 80 years)' },
            { value: 'super-senior', label: 'Super Senior Citizen (80+ years)' },
          ]}
        />
      )}
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Estimated Tax Summary"
      highlightLabel="Total Tax Payable"
      highlightValue={formatCurrency(result.totalTaxPayable)}
      items={resultItems}
    >
      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[12px] font-sans text-amber-500 leading-relaxed">
        <strong>Important Note:</strong> Tax rules may change by financial year. Please verify with official tax sources before filing.
      </div>
    </CalculatorResult>
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter income and choose a tax regime to view taxable income and total tax liabilities.
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
