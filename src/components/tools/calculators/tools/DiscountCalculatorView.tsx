'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface DiscountCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function DiscountCalculatorView({ toolId, title, description }: DiscountCalculatorViewProps) {
  const [originalPrice, setOriginalPrice] = useState<number>(1000);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [additionalDiscount, setAdditionalDiscount] = useState<number>(0);
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
    totalSavings: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    originalPrice?: string | null;
    discountPercent?: string | null;
    additionalDiscount?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const priceErr = validatePositiveNumber(originalPrice, 'Original price');
    const discountErr = validatePositiveNumber(discountPercent, 'Discount percentage', true);
    const addlDiscountErr = validatePositiveNumber(additionalDiscount, 'Additional discount', true);

    if (priceErr || discountErr || addlDiscountErr) {
      setErrors({
        originalPrice: priceErr,
        discountPercent: discountErr,
        additionalDiscount: addlDiscountErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const firstDiscount = originalPrice * (discountPercent / 100);
    const priceAfterFirst = originalPrice - firstDiscount;
    const secondDiscount = priceAfterFirst * (additionalDiscount / 100);
    const finalPrice = priceAfterFirst - secondDiscount;
    const totalSavings = originalPrice - finalPrice;
    const discountAmount = totalSavings;

    setResult({
      discountAmount,
      finalPrice,
      totalSavings
    });
  };

  const handleReset = () => {
    setOriginalPrice(1000);
    setDiscountPercent(20);
    setAdditionalDiscount(0);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const formula = "First Discount = Price × Discount % / 100\nSecond Discount = (Price - First Discount) × Additional % / 100\nFinal Price = Price - First Discount - Second Discount\nTotal Savings = Price - Final Price";
  const example = "Original Price: ₹1,000, Discount: 20%, Additional: 10%\nPrice after 20%: ₹800\nPrice after additional 10%: ₹720\nTotal Savings: ₹280 (28% off)";

  const resultItems = result ? [
    { label: 'Original Price', value: formatCurrency(originalPrice) },
    { label: 'Discount Amount (Total)', value: formatCurrency(result.discountAmount) },
    { label: 'Final Price to Pay', value: formatCurrency(result.finalPrice) },
    { label: 'Total Savings', value: `${formatCurrency(result.totalSavings)} (${((result.totalSavings / originalPrice) * 100).toFixed(1)}% off)` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Original Price"
        value={originalPrice || ''}
        onChange={(val) => setOriginalPrice(val)}
        prefixText="₹"
        error={errors.originalPrice}
        required
      />
      <CalculatorInput
        label="Discount Percentage"
        value={discountPercent || ''}
        onChange={(val) => setDiscountPercent(val)}
        suffixText="%"
        error={errors.discountPercent}
        required
      />
      <CalculatorInput
        label="Additional Discount (Stackable, Optional)"
        value={additionalDiscount === 0 ? '0' : (additionalDiscount || '')}
        onChange={(val) => setAdditionalDiscount(val)}
        suffixText="%"
        error={errors.additionalDiscount}
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Discount Breakdowns"
      highlightLabel="Final Price"
      highlightValue={formatCurrency(result.finalPrice)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter original price and discounts to calculate your total savings and final amount.
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
