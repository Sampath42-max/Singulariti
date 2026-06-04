'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface TipCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function TipCalculatorView({ toolId, title, description }: TipCalculatorViewProps) {
  const [bill, setBill] = useState<number>(1500);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [people, setPeople] = useState<number>(3);

  const [result, setResult] = useState<{
    tipAmount: number;
    totalBill: number;
    tipPerPerson: number;
    totalPerPerson: number;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const billErr = validatePositiveNumber(bill, 'Bill Amount');
    const tipErr = validatePositiveNumber(tipPercent, 'Tip Percentage', true);
    const peopleErr = validatePositiveNumber(people, 'Number of People');

    if (billErr || tipErr || peopleErr) {
      setErrors({
        bill: billErr,
        tipPercent: tipErr,
        people: peopleErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = bill + tipAmount;

    setResult({
      tipAmount,
      totalBill,
      tipPerPerson: tipAmount / people,
      totalPerPerson: totalBill / people
    });
  };

  const handleReset = () => {
    setBill(1500);
    setTipPercent(10);
    setPeople(3);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val: number) => {
    return '₹' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const formula = "Tip calculations:\nTip Amount = Bill × Tip % / 100\nTotal Bill = Bill + Tip Amount\nPer Person Share = Total Bill / Number of People";
  const example = "Bill: ₹1,500, Tip: 10%, People: 3\nTotal Tip: ₹150, Total Bill: ₹1,650\nTotal Share per Person: ₹550";

  const resultItems = result ? [
    { label: 'Subtotal Bill', value: formatCurrency(bill) },
    { label: 'Tip Percentage', value: `${tipPercent}%` },
    { label: 'Total Tip Amount', value: formatCurrency(result.tipAmount) },
    { label: 'Total Bill with Tip', value: formatCurrency(result.totalBill) },
    { label: 'Tip Share per Person', value: formatCurrency(result.tipPerPerson) },
    { label: 'Total Share per Person', value: formatCurrency(result.totalPerPerson) }
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Bill Subtotal"
        value={bill || ''}
        onChange={(val) => setBill(val)}
        prefixText="₹"
        error={errors.bill}
        required
      />
      <CalculatorSelect
        label="Tip Percentage"
        value={tipPercent.toString()}
        onChange={(e) => setTipPercent(parseFloat(e.target.value))}
        options={[
          { value: '5', label: '5% (Good service)' },
          { value: '10', label: '10% (Excellent)' },
          { value: '15', label: '15% (Exceptional)' },
          { value: '20', label: '20% (Outstanding)' },
          { value: '0', label: '0% (No tip)' }
        ]}
      />
      <CalculatorInput
        label="Split Between (People)"
        value={people || ''}
        onChange={(val) => setPeople(val)}
        error={errors.people}
        required
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Split Tip Summary"
      highlightLabel="Total per Person"
      highlightValue={formatCurrency(result.totalPerPerson)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter bill subtotal and split group count to calculate per-person totals.
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
