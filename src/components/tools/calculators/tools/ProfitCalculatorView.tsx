'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface ProfitCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function ProfitCalculatorView({ toolId, title, description }: ProfitCalculatorViewProps) {
  const [costPrice, setCostPrice] = useState<number>(500);
  const [sellingPrice, setSellingPrice] = useState<number>(650);
  const [quantity, setQuantity] = useState<number>(10);
  const [result, setResult] = useState<{
    diffAmount: number;
    percent: number;
    totalDiff: number;
    isProfit: boolean;
  } | null>(null);

  const [errors, setErrors] = useState<{
    costPrice?: string | null;
    sellingPrice?: string | null;
    quantity?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const costErr = validatePositiveNumber(costPrice, 'Cost price');
    const sellErr = validatePositiveNumber(sellingPrice, 'Selling price');
    const qtyErr = validatePositiveNumber(quantity, 'Quantity', true);

    if (costErr || sellErr || qtyErr) {
      setErrors({
        costPrice: costErr,
        sellingPrice: sellErr,
        quantity: qtyErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const diffAmount = sellingPrice - costPrice;
    const isProfit = diffAmount >= 0;
    const percent = costPrice > 0 ? (diffAmount / costPrice) * 100 : 0;
    const qtyMultiplier = quantity > 0 ? quantity : 1;
    const totalDiff = diffAmount * qtyMultiplier;

    setResult({
      diffAmount,
      percent,
      totalDiff,
      isProfit
    });
  };

  const handleReset = () => {
    setCostPrice(500);
    setSellingPrice(650);
    setQuantity(10);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    const sign = val < 0 ? '-' : '';
    return sign + '₹' + Math.abs(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const formula = "Profit = Selling Price - Cost Price\nProfit % = (Profit / Cost Price) × 100\nTotal Profit = Profit × Quantity\nLoss values occur if Cost Price is greater than Selling Price.";
  const example = "Cost Price: ₹500, Selling Price: ₹650, Quantity: 10\nProfit per unit: ₹150\nProfit Margin: 30%\nTotal Profit: ₹1,500";

  const resultItems = result ? [
    { label: 'Cost Price (Per unit)', value: formatCurrency(costPrice) },
    { label: 'Selling Price (Per unit)', value: formatCurrency(sellingPrice) },
    { label: result.isProfit ? 'Profit (Per unit)' : 'Loss (Per unit)', value: formatCurrency(result.diffAmount) },
    { label: 'Margin Percentage', value: `${result.percent.toFixed(2)}%` },
    { label: `Total ${result.isProfit ? 'Profit' : 'Loss'} (${quantity} units)`, value: formatCurrency(result.totalDiff) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Cost Price (Unit Cost)"
        value={costPrice || ''}
        onChange={(val) => setCostPrice(val)}
        prefixText="₹"
        error={errors.costPrice}
        required
      />
      <CalculatorInput
        label="Selling Price (Unit Price)"
        value={sellingPrice || ''}
        onChange={(val) => setSellingPrice(val)}
        prefixText="₹"
        error={errors.sellingPrice}
        required
      />
      <CalculatorInput
        label="Quantity (Optional)"
        value={quantity || ''}
        onChange={(val) => setQuantity(val)}
        error={errors.quantity}
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Profit & Loss Report"
      highlightLabel={result.isProfit ? 'Total Net Profit' : 'Total Net Loss'}
      highlightValue={formatCurrency(result.totalDiff)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter buying and selling parameters to analyze unit margins and cumulative profit/losses.
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
