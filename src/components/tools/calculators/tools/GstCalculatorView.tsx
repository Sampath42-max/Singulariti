'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateGst } from '@/lib/calculators/taxCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface GstCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function GstCalculatorView({ toolId, title, description }: GstCalculatorViewProps) {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [calcType, setCalcType] = useState<'add' | 'remove'>('add');
  const [result, setResult] = useState<{
    originalAmount: number;
    gstAmount: number;
    finalAmount: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    amount?: string | null;
    rate?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountErr = validatePositiveNumber(amount, 'Amount');
    const rateErr = validatePositiveNumber(rate, 'GST rate', true);

    if (amountErr || rateErr) {
      setErrors({
        amount: amountErr,
        rate: rateErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateGst(amount, rate, calcType);
    setResult(res);
  };

  const handleReset = () => {
    setAmount(1000);
    setRate(18);
    setCalcType('add');
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const formula = "Add GST:\nGST Amount = Amount × GST Rate / 100\nFinal Amount = Amount + GST Amount\n\nRemove GST:\nOriginal Amount = Amount × 100 / (100 + GST Rate)\nGST Amount = Amount - Original Amount";
  const example = "Amount: ₹1,000, GST Rate: 18%, Type: Add GST\nGST Amount: ₹180\nFinal Amount: ₹1,180";

  const resultItems = result ? [
    { label: 'Original Net Amount', value: formatCurrency(result.originalAmount) },
    { label: 'GST Amount', value: formatCurrency(result.gstAmount) },
    { label: 'CGST (Half rate)', value: formatCurrency(result.gstAmount / 2) },
    { label: 'SGST (Half rate)', value: formatCurrency(result.gstAmount / 2) },
    { label: 'Gross Final Amount', value: formatCurrency(result.finalAmount) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Amount"
        value={amount || ''}
        onChange={(val) => setAmount(val)}
        prefixText="₹"
        error={errors.amount}
        required
      />
      <CalculatorSelect
        label="GST Rate"
        value={rate.toString()}
        onChange={(e) => setRate(parseFloat(e.target.value))}
        options={[
          { value: '5', label: '5% (Basic Goods)' },
          { value: '12', label: '12% (Standard)' },
          { value: '18', label: '18% (Standard Services/Goods)' },
          { value: '28', label: '28% (Luxury Goods)' },
          { value: '0', label: '0% (Exempt)' },
        ]}
      />
      <CalculatorSelect
        label="Calculation Type"
        value={calcType}
        onChange={(e) => setCalcType(e.target.value as any)}
        options={[
          { value: 'add', label: 'Add GST' },
          { value: 'remove', label: 'Remove GST' },
        ]}
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="GST Calculation Summary"
      highlightLabel={calcType === 'add' ? 'Final Amount (Incl. GST)' : 'Original Amount (Excl. GST)'}
      highlightValue={formatCurrency(calcType === 'add' ? result.finalAmount : result.originalAmount)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter amount and GST percentage to compute tax component and total amounts.
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
