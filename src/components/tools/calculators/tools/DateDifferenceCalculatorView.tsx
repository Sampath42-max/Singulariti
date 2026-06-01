'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateDateDifference } from '@/lib/calculators/dateCalculators';
import { validateDateDifference } from '@/lib/calculators/calculatorValidation';

interface DateDifferenceCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function DateDifferenceCalculatorView({ toolId, title, description }: DateDifferenceCalculatorViewProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(todayStr);
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    startDate?: string | null;
    endDate?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const dateError = validateDateDifference(startDate, endDate);

    if (dateError) {
      setErrors({
        endDate: dateError
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateDateDifference(startDate, endDate, includeEndDate);
    setResult(res);
  };

  const handleReset = () => {
    setStartDate(todayStr);
    setEndDate(todayStr);
    setIncludeEndDate(false);
    setResult(null);
    setErrors({});
  };

  const formula = "Date Difference = End Date - Start Date\nCalculated in Gregorian calendar units (Years, Months, Days). Option to add +1 day to include both boundary dates.";
  const example = "Start Date: 2026-01-01, End Date: 2026-06-01, Include End Date: No\nResult: 5 Months, 0 Days\nTotal days: 151 days";

  const resultItems = result ? [
    { label: 'Years', value: result.years },
    { label: 'Months', value: result.months },
    { label: 'Days', value: result.days },
    { label: 'Total Months', value: `${result.totalMonths} months` },
    { label: 'Total Weeks', value: `${result.totalWeeks} weeks` },
    { label: 'Total Days', value: `${result.totalDays} days` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(_, val) => setStartDate(val)}
        error={errors.startDate}
        required
      />
      <CalculatorInput
        label="End Date"
        type="date"
        value={endDate}
        onChange={(_, val) => setEndDate(val)}
        error={errors.endDate}
        required
      />
      <div className="pt-2">
        <label className="flex items-center gap-2.5 font-sans text-sm text-slate select-none cursor-pointer">
          <input
            type="checkbox"
            checked={includeEndDate}
            onChange={(e) => setIncludeEndDate(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer bg-surface"
          />
          <span className="font-semibold text-ink">Include end date (add 1 day)</span>
        </label>
      </div>
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Date Difference Result"
      highlightLabel="Calculated Period"
      highlightValue={`${result.years} Yr, ${result.months} Mo, ${result.days} D`}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter start and end dates and click Calculate to view chronological interval details.
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
