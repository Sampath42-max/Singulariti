'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface LoanCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remaining: number;
}

export function LoanCalculatorView({ toolId, title, description }: LoanCalculatorViewProps) {
  const [amount, setAmount] = useState<number>(500000);
  const [rate, setRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(3);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    schedule: AmortizationRow[];
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountErr = validatePositiveNumber(amount, 'Loan amount');
    const rateErr = validatePositiveNumber(rate, 'Interest rate');
    const tenureErr = validatePositiveNumber(tenure, 'Tenure');

    if (amountErr || rateErr || tenureErr) {
      setErrors({
        amount: amountErr,
        rate: rateErr,
        tenure: tenureErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const totalMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const monthlyRate = (rate / 12) / 100;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = amount / totalMonths;
    } else {
      monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const schedule: AmortizationRow[] = [];
    let remaining = amount;
    let totalInterest = 0;

    for (let m = 1; m <= totalMonths; m++) {
      const interestPayment = remaining * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remaining = Math.max(0, remaining - principalPayment);
      totalInterest += interestPayment;

      schedule.push({
        month: m,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remaining
      });
    }

    setResult({
      monthlyPayment,
      totalInterest,
      totalPayment: amount + totalInterest,
      schedule
    });
  };

  const handleReset = () => {
    setAmount(500000);
    setRate(7.5);
    setTenure(3);
    setTenureType('years');
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "Monthly Payment = P × R × (1 + R)^N / ((1 + R)^N - 1)\nAmortization is calculated monthly: Interest Paid = Remaining Balance × Monthly Rate, Principal Paid = Monthly Payment - Interest Paid.";
  const example = "Amount: ₹500,000, Rate: 7.5%, Term: 3 Years\nMonthly Repayment: ₹15,553\nTotal Interest: ₹59,913, Total Cost: ₹559,913";

  const resultItems = result ? [
    { label: 'Loan Principal', value: formatCurrency(amount) },
    { label: 'Monthly Payment', value: formatCurrency(result.monthlyPayment) },
    { label: 'Total Interest Paid', value: formatCurrency(result.totalInterest) },
    { label: 'Total Payments Cost', value: formatCurrency(result.totalPayment) }
  ] : [];

  const chartData = result ? [
    { name: 'Principal', value: amount, fill: 'var(--color-primary)' },
    { name: 'Interest', value: result.totalInterest, fill: 'var(--color-accent)' }
  ] : undefined;

  const inputs = (
    <>
      <CalculatorInput
        label="Loan Amount"
        value={amount || ''}
        onChange={(val) => setAmount(val)}
        prefixText="₹"
        error={errors.amount}
        required
      />
      <CalculatorInput
        label="Interest Rate (Annual %)"
        value={rate || ''}
        onChange={(val) => setRate(val)}
        suffixText="%"
        error={errors.rate}
        step="0.01"
        required
      />
      <div className="flex gap-4">
        <CalculatorInput
          label="Loan Term"
          value={tenure || ''}
          onChange={(val) => setTenure(val)}
          error={errors.tenure}
          className="flex-1"
          required
        />
        <CalculatorSelect
          label="Term Type"
          value={tenureType}
          onChange={(e) => setTenureType(e.target.value as any)}
          options={[
            { value: 'years', label: 'Years' },
            { value: 'months', label: 'Months' }
          ]}
          className="w-28"
        />
      </div>
    </>
  );

  const results = result ? (
    <div className="space-y-6">
      <CalculatorResult
        title="Loan Summary"
        highlightLabel="Monthly Payment"
        highlightValue={formatCurrency(result.monthlyPayment)}
        items={resultItems}
        chartData={chartData}
      />
      
      {/* Scrollable Amortization Schedule */}
      <div className="bg-background border border-border rounded-xl p-5 shadow-xs">
        <h4 className="font-display font-bold text-sm text-ink mb-3 uppercase tracking-wider pb-2 border-b border-border/80">
          Amortization Schedule (Monthly Breakdown)
        </h4>
        <div className="max-h-72 overflow-y-auto border border-border rounded-lg">
          <table className="w-full text-left font-sans text-xs text-slate">
            <thead className="bg-surface sticky top-0 border-b border-border text-[10px] uppercase text-ink font-semibold">
              <tr>
                <th className="p-3 text-center">Month</th>
                <th className="p-3 text-right">Payment</th>
                <th className="p-3 text-right">Principal</th>
                <th className="p-3 text-right">Interest</th>
                <th className="p-3 text-right">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-mono">
              {result.schedule.map((row) => (
                <tr key={row.month} className="hover:bg-surface/40">
                  <td className="p-3 text-center text-ink">{row.month}</td>
                  <td className="p-3 text-right">{formatCurrency(row.payment)}</td>
                  <td className="p-3 text-right text-emerald-600">{formatCurrency(row.principal)}</td>
                  <td className="p-3 text-right text-red-600">{formatCurrency(row.interest)}</td>
                  <td className="p-3 text-right text-ink font-bold">{formatCurrency(row.remaining)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Specify loan inputs and calculate to generate payment totals and monthly breakdown table.
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
