'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { calculateCgpa } from '@/lib/calculators/mathCalculators';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface CgpaCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

interface SemesterRow {
  gpa: number;
  credits: number;
}

export function CgpaCalculatorView({ toolId, title, description }: CgpaCalculatorViewProps) {
  const [scale, setScale] = useState<'10' | '4'>('10');
  const [semesters, setSemesters] = useState<SemesterRow[]>([
    { gpa: 8.0, credits: 20 },
    { gpa: 8.5, credits: 22 },
  ]);
  const [result, setResult] = useState<{
    cgpa: number;
    percentage: number;
  } | null>(null);

  const [errors, setErrors] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (semesters.length === 0) {
      setErrors('At least one semester GPA is required.');
      setResult(null);
      return;
    }

    // Validate inputs
    for (let i = 0; i < semesters.length; i++) {
      const gpa = semesters[i].gpa;
      const maxGpa = scale === '10' ? 10 : 4;
      if (isNaN(gpa) || gpa < 0 || gpa > maxGpa) {
        setErrors(`Semester ${i + 1} GPA must be between 0 and ${maxGpa}.`);
        setResult(null);
        return;
      }
    }

    setErrors(null);
    const res = calculateCgpa(semesters, scale);
    setResult(res);
  };

  const handleReset = () => {
    setScale('10');
    setSemesters([
      { gpa: 8.0, credits: 20 },
      { gpa: 8.5, credits: 22 },
    ]);
    setResult(null);
    setErrors(null);
  };

  const addSemester = () => {
    setSemesters([...semesters, { gpa: 0, credits: 0 }]);
  };

  const removeSemester = (idx: number) => {
    setSemesters(semesters.filter((_, i) => i !== idx));
  };

  const handleRowChange = (idx: number, field: 'gpa' | 'credits', val: number) => {
    const nextSems = [...semesters];
    nextSems[idx] = {
      ...nextSems[idx],
      [field]: val,
    };
    setSemesters(nextSems);
  };

  const formula = "10 Point Scale: Percentage = CGPA × 9.5\n4 Point Scale: Percentage = CGPA × 25\nWeighted CGPA = Sum(GPA × Credits) / Sum(Credits)";
  const example = "Sem 1: 8.0 GPA (20 Credits), Sem 2: 8.5 GPA (22 Credits)\nWeighted CGPA = (8.0×20 + 8.5×22) / (20 + 22) = 8.26\nPercentage (10pt scale) = 8.26 × 9.5 = 78.49%";

  const resultItems = result ? [
    { label: 'Cumulative GPA (CGPA)', value: result.cgpa.toFixed(3) },
    { label: 'Approximate Percentage', value: `${result.percentage.toFixed(2)}%` },
    { label: 'Grading Scale', value: `${scale}-point scale` },
  ] : [];

  const inputs = (
    <div className="space-y-4">
      <CalculatorSelect
        label="Grading Scale"
        value={scale}
        onChange={(e) => {
          setScale(e.target.value as any);
          setResult(null);
        }}
        options={[
          { value: '10', label: '10 Point Scale (Indian Universities, CBSE, etc.)' },
          { value: '4', label: '4 Point Scale (US Universities, GPA etc.)' },
        ]}
      />

      <div className="space-y-3">
        <div className="flex justify-between items-center pb-1 border-b border-border">
          <span className="font-sans font-bold text-slate text-[11px] uppercase tracking-wider">Semesters GPA</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 text-[12px]"
            onClick={addSemester}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Semester
          </Button>
        </div>

        {semesters.map((sem, idx) => (
          <div key={idx} className="flex gap-3 items-end">
            <CalculatorInput
              label={`GPA Sem ${idx + 1}`}
              value={sem.gpa || ''}
              onChange={(val) => handleRowChange(idx, 'gpa', val)}
              min="0"
              max={scale === '10' ? '10' : '4'}
              step="0.01"
              className="flex-1"
            />
            <CalculatorInput
              label="Credits (Optional)"
              value={sem.credits || ''}
              onChange={(val) => handleRowChange(idx, 'credits', val)}
              min="0"
              className="flex-1"
            />
            {semesters.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeSemester(idx)}
                className="h-10 text-red-500 hover:text-red-600 hover:bg-red-500/10 px-3 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {errors && <p className="text-[11px] font-sans text-red-500 font-medium">{errors}</p>}
    </div>
  );

  const results = result ? (
    <CalculatorResult
      title="Academic Results"
      highlightLabel="Calculated CGPA"
      highlightValue={result.cgpa.toFixed(2)}
      items={resultItems}
    >
      <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg text-[11px] font-sans text-slate text-center">
        Note: CGPA to percentage conversion may vary by university.
      </div>
    </CalculatorResult>
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter GPA and credits for your semesters and click Calculate to view CGPA and percentage equivalence.
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
