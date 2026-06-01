'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateBmi } from '@/lib/calculators/healthCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';
import { BmiResult } from '@/lib/calculators/calculatorTypes';

interface BmiCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function BmiCalculatorView({ toolId, title, description }: BmiCalculatorViewProps) {
  const [heightUnit, setHeightUnit] = useState<'cm' | 'm' | 'ft-in'>('cm');
  const [height, setHeight] = useState<number>(170);
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(7);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<number>(70);
  const [result, setResult] = useState<BmiResult | null>(null);

  const [errors, setErrors] = useState<{
    height?: string | null;
    weight?: string | null;
    feet?: string | null;
    inches?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let heightErr = null;
    let feetErr = null;
    let inchesErr = null;

    if (heightUnit === 'ft-in') {
      feetErr = validatePositiveNumber(feet, 'Feet');
      inchesErr = validatePositiveNumber(inches, 'Inches', true);
    } else {
      heightErr = validatePositiveNumber(height, 'Height');
    }

    const weightErr = validatePositiveNumber(weight, 'Weight');

    if (heightErr || weightErr || feetErr || inchesErr) {
      setErrors({
        height: heightErr,
        weight: weightErr,
        feet: feetErr,
        inches: inchesErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateBmi(height, heightUnit, weight, weightUnit, feet, inches);
    setResult(res);
  };

  const handleReset = () => {
    setHeightUnit('cm');
    setHeight(170);
    setFeet(5);
    setInches(7);
    setWeightUnit('kg');
    setWeight(70);
    setResult(null);
    setErrors({});
  };

  const formula = "BMI = Weight (kg) / Height (m)^2\nUnderweight: < 18.5, Normal weight: 18.5 - 24.9, Overweight: 25 - 29.9, Obese: >= 30.";
  const example = "Weight: 70 kg, Height: 170 cm (1.70 m)\nBMI = 70 / 1.7^2 = 24.22\nCategory: Normal weight\nHealthy weight range: 53.5 kg - 72.0 kg";

  const resultItems = result ? [
    { label: 'BMI Score', value: result.bmiValue.toFixed(2) },
    { label: 'Classification', value: result.category },
    { label: 'Healthy Weight Range', value: `${result.healthyMin.toFixed(1)} - ${result.healthyMax.toFixed(1)} ${weightUnit}` },
  ] : [];

  const inputs = (
    <>
      <div className="flex gap-4">
        <CalculatorSelect
          label="Height Unit"
          value={heightUnit}
          onChange={(e) => {
            setHeightUnit(e.target.value as any);
            setResult(null);
          }}
          options={[
            { value: 'cm', label: 'Centimeters (cm)' },
            { value: 'm', label: 'Meters (m)' },
            { value: 'ft-in', label: 'Feet / Inches' },
          ]}
          className="flex-1"
        />
        <CalculatorSelect
          label="Weight Unit"
          value={weightUnit}
          onChange={(e) => {
            setWeightUnit(e.target.value as any);
            setResult(null);
          }}
          options={[
            { value: 'kg', label: 'Kilograms (kg)' },
            { value: 'lbs', label: 'Pounds (lbs)' },
          ]}
          className="w-28"
        />
      </div>

      {heightUnit === 'ft-in' ? (
        <div className="flex gap-4">
          <CalculatorInput
            label="Height (Feet)"
            value={feet || ''}
            onChange={(val) => setFeet(val)}
            suffixText="ft"
            error={errors.feet}
            required
          />
          <CalculatorInput
            label="Height (Inches)"
            value={inches === 0 ? '0' : (inches || '')}
            onChange={(val) => setInches(val)}
            suffixText="in"
            error={errors.inches}
            required
          />
        </div>
      ) : (
        <CalculatorInput
          label="Height"
          value={height || ''}
          onChange={(val) => setHeight(val)}
          suffixText={heightUnit}
          error={errors.height}
          required
        />
      )}

      <CalculatorInput
        label="Weight"
        value={weight || ''}
        onChange={(val) => setWeight(val)}
        suffixText={weightUnit}
        error={errors.weight}
        required
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Body Mass Index Analysis"
      highlightLabel="Your BMI"
      highlightValue={result.bmiValue.toFixed(1)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter height and weight details to calculate body mass index (BMI) and check classification status.
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
