'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateAge } from '@/lib/calculators/dateCalculators';
import { validateDateOfBirth } from '@/lib/calculators/calculatorValidation';
import { AgeResult } from '@/lib/calculators/calculatorTypes';

interface AgeCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function AgeCalculatorView({ toolId, title, description }: AgeCalculatorViewProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>(todayStr);
  const [result, setResult] = useState<AgeResult | null>(null);
  
  const [errors, setErrors] = useState<{ dob?: string | null }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const dobError = validateDateOfBirth(dob);
    
    if (dobError) {
      setErrors({ dob: dobError });
      setResult(null);
      return;
    }

    setErrors({});
    const ageResult = calculateAge(dob, currentDate);
    setResult(ageResult);
  };

  const handleReset = () => {
    setDob('');
    setCurrentDate(todayStr);
    setResult(null);
    setErrors({});
  };

  const formula = "Age = Current Date - Date of Birth\nYears, Months, Days difference calculated calendar-wise.";
  const example = "DOB: 1995-05-15, Current Date: 2026-06-01\nResult: 31 Years, 0 Months, 17 Days\nTotal days: 11,340 days\nNext Birthday in: 348 days";

  const resultItems = result ? [
    { label: 'Years', value: result.years },
    { label: 'Months', value: result.months },
    { label: 'Days', value: result.days },
    { label: 'Total Months', value: `${result.totalMonths} months` },
    { label: 'Total Weeks', value: `${result.totalWeeks} weeks` },
    { label: 'Total Days', value: `${result.totalDays} days` },
    { label: 'Days to Next Birthday', value: `${result.daysToNextBirthday} days` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={(_, val) => setDob(val)}
        error={errors.dob}
        required
      />
      <CalculatorInput
        label="Current Date / Age At Date"
        type="date"
        value={currentDate}
        onChange={(_, val) => setCurrentDate(val)}
        required
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Age Results"
      highlightLabel="Your Age"
      highlightValue={`${result.years} Years, ${result.months} Months, ${result.days} Days`}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter your date of birth and click Calculate to see your age details.
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
