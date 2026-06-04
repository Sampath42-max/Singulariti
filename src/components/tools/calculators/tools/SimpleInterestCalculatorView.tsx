'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface SimpleInterestCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function SimpleInterestCalculatorView({ toolId, title, description }: SimpleInterestCalculatorViewProps) {
  const [solveFor, setSolveFor] = useState<'interest' | 'principal' | 'rate' | 'time'>('interest');
  const [principal, setPrincipal] = useState<number>(50000);
  const [rate, setRate] = useState<number>(6.5);
  const [time, setTime] = useState<number>(3);
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years');
  const [interest, setInterest] = useState<number>(9750);
  
  const [result, setResult] = useState<{
    principal: number;
    rate: number;
    time: number;
    interest: number;
    totalAmount: number;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string | null> = {};

    const tPeriod = timeUnit === 'months' ? time / 12 : time;

    if (solveFor !== 'principal') {
      errs.principal = validatePositiveNumber(principal, 'Principal Amount');
    }
    if (solveFor !== 'rate') {
      errs.rate = validatePositiveNumber(rate, 'Interest Rate %');
    }
    if (solveFor !== 'time') {
      errs.time = validatePositiveNumber(time, 'Time Period');
    }
    if (solveFor === 'principal' || solveFor === 'rate' || solveFor === 'time') {
      errs.interest = validatePositiveNumber(interest, 'Interest Amount');
    }

    if (Object.values(errs).some(x => x !== null)) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    let p = principal;
    let r = rate;
    let t = tPeriod;
    let i = interest;

    if (solveFor === 'interest') {
      i = (p * r * t) / 100;
    } else if (solveFor === 'principal') {
      p = (i * 100) / (r * t);
    } else if (solveFor === 'rate') {
      r = (i * 100) / (p * t);
    } else if (solveFor === 'time') {
      t = (i * 100) / (p * r);
    }

    const calculatedTime = timeUnit === 'months' && solveFor === 'time' ? t * 12 : t;

    setResult({
      principal: p,
      rate: r,
      time: calculatedTime,
      interest: i,
      totalAmount: p + i
    });
  };

  const handleReset = () => {
    setSolveFor('interest');
    setPrincipal(50000);
    setRate(6.5);
    setTime(3);
    setTimeUnit('years');
    setInterest(9750);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = solveFor === 'interest' 
    ? "Interest = (Principal × Rate × Time) / 100"
    : solveFor === 'principal'
    ? "Principal = (Interest × 100) / (Rate × Time)"
    : solveFor === 'rate'
    ? "Rate = (Interest × 100) / (Principal × Time)"
    : "Time = (Interest × 100) / (Principal × Rate)";

  const example = "Principal: ₹50,000, Interest Rate: 6.5% p.a., Time: 3 Years\nSimple Interest: ₹9,750\nTotal Accrued Amount: ₹59,750";

  const resultItems = result ? [
    { label: 'Principal (P)', value: formatCurrency(result.principal) },
    { label: 'Interest Rate (R)', value: `${result.rate.toFixed(2)}% p.a.` },
    { label: 'Time Period (T)', value: `${result.time.toFixed(1)} ${timeUnit}` },
    { label: 'Interest Amount (I)', value: formatCurrency(result.interest) },
    { label: 'Total Value (P + I)', value: formatCurrency(result.totalAmount) }
  ] : [];

  const inputs = (
    <>
      <CalculatorSelect
        label="Solve For"
        value={solveFor}
        onChange={(e) => {
          setSolveFor(e.target.value as any);
          setResult(null);
        }}
        options={[
          { value: 'interest', label: 'Simple Interest Amount' },
          { value: 'principal', label: 'Principal Amount' },
          { value: 'rate', label: 'Interest Rate (%)' },
          { value: 'time', label: 'Time Period' }
        ]}
      />

      {solveFor !== 'principal' && (
        <CalculatorInput
          label="Principal Amount (P)"
          value={principal || ''}
          onChange={(val) => setPrincipal(val)}
          prefixText="₹"
          error={errors.principal}
          required
        />
      )}

      {solveFor !== 'rate' && (
        <CalculatorInput
          label="Interest Rate (R % per year)"
          value={rate || ''}
          onChange={(val) => setRate(val)}
          suffixText="%"
          error={errors.rate}
          step="0.01"
          required
        />
      )}

      {solveFor !== 'time' && (
        <div className="flex gap-4">
          <CalculatorInput
            label="Time Period (T)"
            value={time || ''}
            onChange={(val) => setTime(val)}
            error={errors.time}
            className="flex-1"
            required
          />
          <CalculatorSelect
            label="Time Unit"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value as any)}
            options={[
              { value: 'years', label: 'Years' },
              { value: 'months', label: 'Months' }
            ]}
            className="w-28"
          />
        </div>
      )}

      {(solveFor === 'principal' || solveFor === 'rate' || solveFor === 'time') && (
        <CalculatorInput
          label="Interest Earned (I)"
          value={interest || ''}
          onChange={(val) => setInterest(val)}
          prefixText="₹"
          error={errors.interest}
          required
        />
      )}
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Simple Interest Repayment Breakdown"
      highlightLabel={solveFor === 'interest' ? 'Simple Interest Earned' : 'Principal Amount'}
      highlightValue={formatCurrency(solveFor === 'interest' ? result.interest : result.principal)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Specify simple interest input values and calculate the remaining variable.
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
