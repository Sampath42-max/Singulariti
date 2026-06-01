'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateCalories } from '@/lib/calculators/healthCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';
import { CalorieResult } from '@/lib/calculators/calculatorTypes';

interface CalorieCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function CalorieCalculatorView({ toolId, title, description }: CalorieCalculatorViewProps) {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extra-active'>('moderately-active');
  const [goal, setGoal] = useState<'maintain' | 'loss' | 'gain'>('maintain');
  const [result, setResult] = useState<CalorieResult | null>(null);

  const [errors, setErrors] = useState<{
    age?: string | null;
    height?: string | null;
    weight?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const ageErr = validatePositiveNumber(age, 'Age');
    const heightErr = validatePositiveNumber(height, 'Height');
    const weightErr = validatePositiveNumber(weight, 'Weight');

    if (ageErr || heightErr || weightErr) {
      setErrors({
        age: ageErr,
        height: heightErr,
        weight: weightErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateCalories(gender, age, height, weight, activity, goal);
    setResult(res);
  };

  const handleReset = () => {
    setGender('male');
    setAge(25);
    setHeight(175);
    setWeight(70);
    setActivity('moderately-active');
    setGoal('maintain');
    setResult(null);
    setErrors({});
  };

  const formula = "Mifflin-St Jeor Equation:\nMale BMR = 10W + 6.25H - 5A + 5\nFemale BMR = 10W + 6.25H - 5A - 161\nSuggested: BMR × activity multiplier, adjusted for calorie surplus (+500 for gain) or deficit (-500 for loss).";
  const example = "Male, Age: 25, Height: 175 cm, Weight: 70 kg, Moderately active, Goal: Maintain\nBMR: 1,673 kcal\nMaintenance: 2,593 kcal\nSuggested Intake: 2,593 kcal";

  const resultItems = result ? [
    { label: 'Basal Metabolic Rate (BMR)', value: `${Math.round(result.bmr)} kcal/day` },
    { label: 'Active Burn (Maintenance)', value: `${Math.round(result.maintenanceCalories)} kcal/day` },
    { label: 'Recommended Calorie Goal', value: `${Math.round(result.suggestedCalories)} kcal/day` },
  ] : [];

  const inputs = (
    <>
      <div className="flex gap-4">
        <CalculatorSelect
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value as any)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          className="flex-1"
        />
        <CalculatorInput
          label="Age"
          value={age || ''}
          onChange={(val) => setAge(val)}
          suffixText="years"
          error={errors.age}
          className="flex-1"
          required
        />
      </div>
      <div className="flex gap-4">
        <CalculatorInput
          label="Height (cm)"
          value={height || ''}
          onChange={(val) => setHeight(val)}
          suffixText="cm"
          error={errors.height}
          className="flex-1"
          required
        />
        <CalculatorInput
          label="Weight (kg)"
          value={weight || ''}
          onChange={(val) => setWeight(val)}
          suffixText="kg"
          error={errors.weight}
          className="flex-1"
          required
        />
      </div>
      <CalculatorSelect
        label="Activity Level"
        value={activity}
        onChange={(e) => setActivity(e.target.value as any)}
        options={[
          { value: 'sedentary', label: 'Sedentary (Little or no exercise)' },
          { value: 'lightly-active', label: 'Lightly Active (Exercise 1-3 days/week)' },
          { value: 'moderately-active', label: 'Moderately Active (Exercise 3-5 days/week)' },
          { value: 'very-active', label: 'Very Active (Hard exercise 6-7 days/week)' },
          { value: 'extra-active', label: 'Extra Active (Very hard exercise & physical job)' },
        ]}
      />
      <CalculatorSelect
        label="Fitness Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value as any)}
        options={[
          { value: 'maintain', label: 'Maintain Weight' },
          { value: 'loss', label: 'Weight Loss (500 kcal deficit)' },
          { value: 'gain', label: 'Weight Gain (+500 kcal surplus)' },
        ]}
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Daily Energy Recommendations"
      highlightLabel="Target Daily Intake"
      highlightValue={`${Math.round(result.suggestedCalories)} kcal`}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter metrics and activity profile to evaluate metabolic rate and daily calorie recommendations.
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
