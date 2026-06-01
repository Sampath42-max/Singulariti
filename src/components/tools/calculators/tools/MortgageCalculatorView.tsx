'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateMortgage } from '@/lib/calculators/financialCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface MortgageCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function MortgageCalculatorView({ toolId, title, description }: MortgageCalculatorViewProps) {
  const [homePrice, setHomePrice] = useState<number>(5000000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [loanAmount, setLoanAmount] = useState<number>(4000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [termYears, setTermYears] = useState<number>(20);
  const [propertyTax, setPropertyTax] = useState<number>(24000);
  const [homeInsurance, setHomeInsurance] = useState<number>(6000);
  const [result, setResult] = useState<{
    monthlyPAndI: number;
    monthlyTax: number;
    monthlyInsurance: number;
    totalMonthlyPayment: number;
    totalInterest: number;
    totalRepayment: number;
    principalAmount: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    homePrice?: string | null;
    downPayment?: string | null;
    interestRate?: string | null;
    termYears?: string | null;
    propertyTax?: string | null;
    homeInsurance?: string | null;
  }>({});

  // Recalculate loan amount when home price or down payment changes
  useEffect(() => {
    setLoanAmount(Math.max(0, homePrice - downPayment));
  }, [homePrice, downPayment]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const priceErr = validatePositiveNumber(homePrice, 'Home price');
    const downErr = validatePositiveNumber(downPayment, 'Down payment', true);
    const rateErr = validatePositiveNumber(interestRate, 'Interest rate');
    const termErr = validatePositiveNumber(termYears, 'Loan term');
    const taxErr = validatePositiveNumber(propertyTax, 'Property tax', true);
    const insErr = validatePositiveNumber(homeInsurance, 'Home insurance', true);

    if (downPayment >= homePrice) {
      setErrors({
        downPayment: 'Down payment cannot be equal to or greater than home price.'
      });
      setResult(null);
      return;
    }

    if (priceErr || downErr || rateErr || termErr || taxErr || insErr) {
      setErrors({
        homePrice: priceErr,
        downPayment: downErr,
        interestRate: rateErr,
        termYears: termErr,
        propertyTax: taxErr,
        homeInsurance: insErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateMortgage(homePrice, downPayment, interestRate, termYears, propertyTax, homeInsurance);
    setResult(res);
  };

  const handleReset = () => {
    setHomePrice(5000000);
    setDownPayment(1000000);
    setInterestRate(8.5);
    setTermYears(20);
    setPropertyTax(24000);
    setHomeInsurance(6000);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1)\nWhere P = Loan Principal (Home Price - Down Payment), r = Monthly Interest Rate, n = Total months (Years × 12).\nTotal Monthly = Monthly Payment + (Property Tax / 12) + (Home Insurance / 12)";
  const example = "Home Price: ₹5,000,000, Down Payment: ₹1,000,000, Term: 20 Years, Rate: 8.5%\nPrincipal & Interest: ₹34,713/mo\nProperty Tax + Insurance: ₹2,500/mo\nTotal Monthly: ₹37,213";

  const resultItems = result ? [
    { label: 'Mortgage Loan Amount', value: formatCurrency(result.principalAmount) },
    { label: 'Monthly Principal & Interest (P&I)', value: formatCurrency(result.monthlyPAndI) },
    { label: 'Monthly Property Tax (Est.)', value: formatCurrency(result.monthlyTax) },
    { label: 'Monthly Home Insurance (Est.)', value: formatCurrency(result.monthlyInsurance) },
    { label: 'Total Monthly Mortgage Payment', value: formatCurrency(result.totalMonthlyPayment) },
    { label: 'Total Interest Payable', value: formatCurrency(result.totalInterest) },
    { label: 'Total Repayment Cost', value: formatCurrency(result.totalRepayment) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Home Purchase Price"
        value={homePrice || ''}
        onChange={(val) => setHomePrice(val)}
        prefixText="₹"
        error={errors.homePrice}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <CalculatorInput
          label="Down Payment"
          value={downPayment === 0 ? '0' : (downPayment || '')}
          onChange={(val) => setDownPayment(val)}
          prefixText="₹"
          error={errors.downPayment}
          required
        />
        <div className="space-y-1.5 w-full">
          <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
            Loan Principal Amount
          </label>
          <div className="h-10 px-3 bg-background border border-border rounded-lg text-sm text-slate flex items-center font-sans">
            {formatCurrency(loanAmount)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
          label="Loan Term (Years)"
          value={termYears || ''}
          onChange={(val) => setTermYears(val)}
          suffixText="years"
          error={errors.termYears}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CalculatorInput
          label="Annual Property Tax"
          value={propertyTax === 0 ? '0' : (propertyTax || '')}
          onChange={(val) => setPropertyTax(val)}
          prefixText="₹"
          error={errors.propertyTax}
        />
        <CalculatorInput
          label="Annual Home Insurance"
          value={homeInsurance === 0 ? '0' : (homeInsurance || '')}
          onChange={(val) => setHomeInsurance(val)}
          prefixText="₹"
          error={errors.homeInsurance}
        />
      </div>
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Mortgage Payment Breakdown"
      highlightLabel="Total Monthly Payment"
      highlightValue={formatCurrency(result.totalMonthlyPayment)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter home transaction details and loan terms to evaluate monthly outlays, taxes, and interest costs.
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
