'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculatePercentage } from '@/lib/calculators/mathCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface PercentageCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function PercentageCalculatorView({ toolId, title, description }: PercentageCalculatorViewProps) {
  const [mode, setMode] = useState<'of' | 'what-percent' | 'increase' | 'decrease'>('of');
  const [val1, setVal1] = useState<number>(10);
  const [val2, setVal2] = useState<number>(200);
  const [result, setResult] = useState<{
    result: number;
    formula: string;
  } | null>(null);

  const [errors, setErrors] = useState<{
    val1?: string | null;
    val2?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bounds checking based on mode
    let val1Err = null;
    let val2Err = null;

    if (mode === 'of') {
      val1Err = validatePositiveNumber(val1, 'Percentage value', true);
      val2Err = validatePositiveNumber(val2, 'Number', true);
    } else if (mode === 'what-percent') {
      val1Err = validatePositiveNumber(val1, 'Part value', true);
      val2Err = validatePositiveNumber(val2, 'Total value'); // Division by zero check
    } else {
      // Increase/decrease
      val1Err = validatePositiveNumber(val1, 'Original value'); // Cannot be zero
      val2Err = validatePositiveNumber(val2, 'New value', true);
    }

    if (val1Err || val2Err) {
      setErrors({
        val1: val1Err,
        val2: val2Err
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculatePercentage(mode, val1, val2);
    setResult(res);
  };

  const handleReset = () => {
    setMode('of');
    setVal1(10);
    setVal2(200);
    setResult(null);
    setErrors({});
  };

  const getLabel = (part: 'val1' | 'val2') => {
    if (mode === 'of') {
      return part === 'val1' ? 'Percentage (%)' : 'Of Number';
    } else if (mode === 'what-percent') {
      return part === 'val1' ? 'Number' : 'Is what percent of Number';
    } else if (mode === 'increase' || mode === 'decrease') {
      return part === 'val1' ? 'Original Value' : 'New Value';
    }
    return 'Value';
  };

  const getSuffix = (part: 'val1' | 'val2') => {
    if (mode === 'of' && part === 'val1') return '%';
    return undefined;
  };

  const formulaText = "Find Percentage of: (A / 100) × B\nWhat Percent: (A / B) × 100\nPercentage Increase/Decrease: |(B - A) / A| × 100";
  const example = "10% of 200 = (10 / 100) × 200 = 20\nPercentage increase from 100 to 150 = ((150 - 100) / 100) × 100 = 50%";

  const resultItems = result ? [
    { label: 'Numeric Result', value: result.result.toFixed(4) },
  ] : [];

  const inputs = (
    <>
      <CalculatorSelect
        label="Percentage Calculation Mode"
        value={mode}
        onChange={(e) => {
          setMode(e.target.value as any);
          setResult(null);
        }}
        options={[
          { value: 'of', label: 'Find percentage of a number (e.g. 10% of 200)' },
          { value: 'what-percent', label: 'Find what percent A is of B (e.g. 50 is what % of 200)' },
          { value: 'increase', label: 'Percentage Increase (e.g. from 100 to 120)' },
          { value: 'decrease', label: 'Percentage Decrease (e.g. from 100 to 80)' },
        ]}
      />
      <CalculatorInput
        label={getLabel('val1')}
        value={val1 || ''}
        onChange={(val) => setVal1(val)}
        suffixText={getSuffix('val1')}
        error={errors.val1}
        required
      />
      <CalculatorInput
        label={getLabel('val2')}
        value={val2 || ''}
        onChange={(val) => setVal2(val)}
        suffixText={getSuffix('val2')}
        error={errors.val2}
        required
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Percentage Result"
      highlightLabel="Calculated Value"
      highlightValue={mode === 'what-percent' || mode === 'increase' || mode === 'decrease' ? `${result.result.toFixed(2)}%` : result.result.toFixed(2)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Select the percentage mode, enter numbers and click Calculate to view mathematical results.
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
      formula={formulaText}
      example={example}
    />
  );
}
