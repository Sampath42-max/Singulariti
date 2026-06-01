'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateYoutubeEarnings } from '@/lib/calculators/revenueCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface YoutubeEarningsCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function YoutubeEarningsCalculatorView({ toolId, title, description }: YoutubeEarningsCalculatorViewProps) {
  const [dailyViews, setDailyViews] = useState<number>(20000);
  const [cpm, setCpm] = useState<number>(4);
  const [rpm, setRpm] = useState<number>(2.5);
  const [monetizedPercent, setMonetizedPercent] = useState<number>(70);
  const [result, setResult] = useState<{
    dailyEarnings: number;
    monthlyEarnings: number;
    yearlyEarnings: number;
    dailyCpmRevenue: number;
    monthlyCpmRevenue: number;
    yearlyCpmRevenue: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    dailyViews?: string | null;
    cpm?: string | null;
    rpm?: string | null;
    monetizedPercent?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const viewsErr = validatePositiveNumber(dailyViews, 'Daily views');
    const cpmErr = validatePositiveNumber(cpm, 'CPM');
    const rpmErr = validatePositiveNumber(rpm, 'RPM');
    const percentErr = validatePositiveNumber(monetizedPercent, 'Monetized playback percentage', true);

    if (viewsErr || cpmErr || rpmErr || percentErr) {
      setErrors({
        dailyViews: viewsErr,
        cpm: cpmErr,
        rpm: rpmErr,
        monetizedPercent: percentErr
      });
      setResult(null);
      return;
    }

    if (monetizedPercent > 100) {
      setErrors({
        monetizedPercent: 'Percentage cannot exceed 100.'
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateYoutubeEarnings(dailyViews, cpm, rpm, monetizedPercent);
    setResult(res);
  };

  const handleReset = () => {
    setDailyViews(20000);
    setCpm(4);
    setRpm(2.5);
    setMonetizedPercent(70);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formula = "Estimated Earnings = Daily Views × (Monetized Playback % / 100) × RPM / 1000\nRPM (Revenue Per Mille) represents actual earnings per 1000 views, whereas CPM represents advertiser costs.";
  const example = "Daily Views: 20,000, Monetized Playbacks: 70%, RPM: ₹200 (approx. $2.4)\nEstimated Daily: 20,000 × 0.70 × 200 / 1000 = ₹2,800\nEstimated Monthly: ₹85,176";

  const resultItems = result ? [
    { label: 'Daily Earnings (Estimated)', value: formatCurrency(result.dailyEarnings) },
    { label: 'Monthly Earnings (Estimated)', value: formatCurrency(result.monthlyEarnings) },
    { label: 'Yearly Earnings (Estimated)', value: formatCurrency(result.yearlyEarnings) },
    { label: 'Gross Advertiser Cost (Daily CPM)', value: formatCurrency(result.dailyCpmRevenue) },
    { label: 'Gross Advertiser Cost (Monthly CPM)', value: formatCurrency(result.monthlyCpmRevenue) },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Daily Video Views"
        value={dailyViews || ''}
        onChange={(val) => setDailyViews(val)}
        error={errors.dailyViews}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <CalculatorInput
          label="RPM (Earnings per 1k views)"
          value={rpm || ''}
          onChange={(val) => setRpm(val)}
          prefixText="₹"
          error={errors.rpm}
          step="0.01"
          required
        />
        <CalculatorInput
          label="CPM (Ad Cost per 1k views)"
          value={cpm || ''}
          onChange={(val) => setCpm(val)}
          prefixText="₹"
          error={errors.cpm}
          step="0.01"
          required
        />
      </div>
      <CalculatorInput
        label="Monetized Playbacks Percentage (%)"
        value={monetizedPercent || ''}
        onChange={(val) => setMonetizedPercent(val)}
        suffixText="%"
        error={errors.monetizedPercent}
        required
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Estimated Earnings Overview"
      highlightLabel="Monthly Earnings"
      highlightValue={formatCurrency(result.monthlyEarnings)}
      items={resultItems}
    >
      <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg text-[11px] font-sans text-slate text-center leading-relaxed">
        <strong>Disclaimer:</strong> Actual YouTube earnings depend on niche, country, audience demographics, ad blockers, seasonality, RPM, CPM, and YouTube policies.
      </div>
    </CalculatorResult>
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter channel viewership and RPM estimates to calculate potential ad earnings.
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
