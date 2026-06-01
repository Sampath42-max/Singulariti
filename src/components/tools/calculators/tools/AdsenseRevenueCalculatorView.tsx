'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorResult } from '../CalculatorResult';
import { calculateAdSenseRevenue } from '@/lib/calculators/revenueCalculators';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface AdsenseRevenueCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function AdsenseRevenueCalculatorView({ toolId, title, description }: AdsenseRevenueCalculatorViewProps) {
  const [pageViews, setPageViews] = useState<number>(50000);
  const [ctr, setCtr] = useState<number>(2.5);
  const [cpc, setCpc] = useState<number>(0.5);
  const [rpm, setRpm] = useState<number>(0);
  const [result, setResult] = useState<{
    estimatedClicks: number;
    estimatedRevenue: number;
    rpmRevenue: number;
    dailyRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
    dailyRpmRevenue: number;
    monthlyRpmRevenue: number;
    yearlyRpmRevenue: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    pageViews?: string | null;
    ctr?: string | null;
    cpc?: string | null;
    rpm?: string | null;
  }>({});

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const viewsErr = validatePositiveNumber(pageViews, 'Page views');
    const ctrErr = validatePositiveNumber(ctr, 'CTR percentage', true);
    const cpcErr = validatePositiveNumber(cpc, 'CPC', true);
    const rpmErr = validatePositiveNumber(rpm, 'RPM', true);

    if (viewsErr || ctrErr || cpcErr || rpmErr) {
      setErrors({
        pageViews: viewsErr,
        ctr: ctrErr,
        cpc: cpcErr,
        rpm: rpmErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateAdSenseRevenue(pageViews, ctr, cpc, rpm);
    setResult(res);
  };

  const handleReset = () => {
    setPageViews(50000);
    setCtr(2.5);
    setCpc(0.5);
    setRpm(0);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined) return '';
    return '$' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const formula = "Clicks = Page Views × CTR / 100\nRevenue = Clicks × CPC\nRPM Revenue = Page Views × RPM / 1000";
  const example = "Page Views: 50,000, CTR: 2.5%, CPC: $0.50\nEstimated Clicks: 1,250\nEstimated Revenue: 1,250 × $0.50 = $625.00";

  const resultItems = result ? [
    { label: 'Estimated Ad Clicks', value: Math.round(result.estimatedClicks) },
    { label: 'Estimated Revenue (CPC mode)', value: formatCurrency(result.estimatedRevenue) },
    { label: 'Estimated Monthly Revenue (CPC)', value: formatCurrency(result.monthlyRevenue) },
    { label: 'Estimated Yearly Revenue (CPC)', value: formatCurrency(result.yearlyRevenue) },
    ...(rpm > 0 ? [
      { label: 'Estimated Revenue (RPM mode)', value: formatCurrency(result.rpmRevenue) },
      { label: 'Estimated Monthly Revenue (RPM)', value: formatCurrency(result.monthlyRpmRevenue) }
    ] : []),
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Page Views"
        value={pageViews || ''}
        onChange={(val) => setPageViews(val)}
        error={errors.pageViews}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <CalculatorInput
          label="CTR (Click-Through Rate %)"
          value={ctr || ''}
          onChange={(val) => setCtr(val)}
          suffixText="%"
          error={errors.ctr}
          step="0.01"
          required
        />
        <CalculatorInput
          label="CPC (Cost Per Click)"
          value={cpc || ''}
          onChange={(val) => setCpc(val)}
          prefixText="$"
          error={errors.cpc}
          step="0.01"
          required
        />
      </div>
      <CalculatorInput
        label="Page RPM (Revenue Per 1000 Views, Optional)"
        value={rpm === 0 ? '0' : (rpm || '')}
        onChange={(val) => setRpm(val)}
        prefixText="$"
        error={errors.rpm}
        step="0.01"
      />
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="AdSense Revenue Estimates"
      highlightLabel="Estimated CPC Revenue"
      highlightValue={formatCurrency(result.estimatedRevenue)}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter your page views, CTR and CPC rate to calculate estimated revenue.
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
