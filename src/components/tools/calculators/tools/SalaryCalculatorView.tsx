'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface SalaryCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function SalaryCalculatorView({ toolId, title, description }: SalaryCalculatorViewProps) {
  const [amount, setAmount] = useState<number>(50000);
  const [period, setPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual'>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  const [result, setResult] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    monthly: number;
    annual: number;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountErr = validatePositiveNumber(amount, 'Salary amount');
    const hoursErr = validatePositiveNumber(hoursPerWeek, 'Hours per week');
    const daysErr = validatePositiveNumber(daysPerWeek, 'Days per week');

    if (amountErr || hoursErr || daysErr) {
      setErrors({
        amount: amountErr,
        hours: hoursErr,
        days: daysErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    let annual = 0;

    // Convert from period to annual
    if (period === 'annual') {
      annual = amount;
    } else if (period === 'monthly') {
      annual = amount * 12;
    } else if (period === 'weekly') {
      annual = amount * 52;
    } else if (period === 'daily') {
      annual = amount * (daysPerWeek * 52);
    } else if (period === 'hourly') {
      annual = amount * (hoursPerWeek * 52);
    }

    setResult({
      annual,
      monthly: annual / 12,
      biweekly: annual / 26,
      weekly: annual / 52,
      daily: annual / (daysPerWeek * 52),
      hourly: annual / (hoursPerWeek * 52)
    });
  };

  const handleReset = () => {
    setAmount(50000);
    setPeriod('annual');
    setHoursPerWeek(40);
    setDaysPerWeek(5);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "Salary Conversions:\nAnnual = Amount relative to 52 weeks or 12 months.\nHourly Wage = Annual Salary / (Hours per Week × 52).\nMonthly = Annual Salary / 12.";
  const example = "Salary: ₹600,000 p.a. working 40 hours/week, 5 days/week:\nMonthly: ₹50,000\nWeekly: ₹11,538\nDaily: ₹462\nHourly: ₹288";

  const resultItems = result ? [
    { label: 'Annual Salary', value: formatCurrency(result.annual) },
    { label: 'Monthly Salary', value: formatCurrency(result.monthly) },
    { label: 'Bi-weekly Salary', value: formatCurrency(result.biweekly) },
    { label: 'Weekly Salary', value: formatCurrency(result.weekly) },
    { label: 'Daily Salary', value: formatCurrency(result.daily) },
    { label: 'Hourly Wage', value: formatCurrency(result.hourly) + ' / hr' }
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Salary Amount"
        value={amount || ''}
        onChange={(val) => setAmount(val)}
        prefixText="₹"
        error={errors.amount}
        required
      />
      <CalculatorSelect
        label="Pay Period"
        value={period}
        onChange={(e) => setPeriod(e.target.value as any)}
        options={[
          { value: 'annual', label: 'per Year (Annual)' },
          { value: 'monthly', label: 'per Month' },
          { value: 'weekly', label: 'per Week' },
          { value: 'daily', label: 'per Day' },
          { value: 'hourly', label: 'per Hour' }
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <CalculatorInput
          label="Hours Worked / Week"
          value={hoursPerWeek || ''}
          onChange={(val) => setHoursPerWeek(val)}
          error={errors.hours}
          required
        />
        <CalculatorInput
          label="Days Worked / Week"
          value={daysPerWeek || ''}
          onChange={(val) => setDaysPerWeek(val)}
          error={errors.days}
          required
        />
      </div>
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Salary Conversion Breakdown"
      highlightLabel="Estimated Monthly Salary"
      highlightValue={formatCurrency(result.monthly)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter salary details to compute hourly, weekly, and monthly rates.
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
