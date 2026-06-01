'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorInput } from '../CalculatorInput';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';
import { validatePositiveNumber } from '@/lib/calculators/calculatorValidation';

interface CurrencyConverterViewProps {
  toolId: string;
  title: string;
  description: string;
}

const STATIC_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.50,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 156.2,
  AUD: 1.51,
  CAD: 1.37,
  SGD: 1.35,
  AED: 3.67,
  CNY: 7.24
};

const CURRENCY_LABELS: Record<string, string> = {
  USD: 'USD - US Dollar ($)',
  INR: 'INR - Indian Rupee (₹)',
  EUR: 'EUR - Euro (€)',
  GBP: 'GBP - British Pound (£)',
  JPY: 'JPY - Japanese Yen (¥)',
  AUD: 'AUD - Australian Dollar (A$)',
  CAD: 'CAD - Canadian Dollar (C$)',
  SGD: 'SGD - Singapore Dollar (S$)',
  AED: 'AED - UAE Dirham (د.إ)',
  CNY: 'CNY - Chinese Yuan (¥)'
};

export function CurrencyConverterView({ toolId, title, description }: CurrencyConverterViewProps) {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [customRate, setCustomRate] = useState<number>(83.50);
  const [isManualRate, setIsManualRate] = useState<boolean>(false);
  const [rates, setRates] = useState<Record<string, number>>(STATIC_RATES);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);
  const [result, setResult] = useState<{
    convertedAmount: number;
    rateUsed: number;
  } | null>(null);

  const [errors, setErrors] = useState<{
    amount?: string | null;
    customRate?: string | null;
  }>({});

  // Fetch live exchange rates on mount
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => console.error('Failed to fetch live currency rates:', err))
      .finally(() => setIsLoadingRates(false));
  }, []);

  // Recalculate rate when currencies change (if not in manual edit mode)
  useEffect(() => {
    if (!isManualRate) {
      const fromRate = rates[fromCurrency] || 1.0;
      const toRate = rates[toCurrency] || 1.0;
      const rate = (1 / fromRate) * toRate;
      setCustomRate(parseFloat(rate.toFixed(4)));
    }
  }, [fromCurrency, toCurrency, isManualRate, rates]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountErr = validatePositiveNumber(amount, 'Amount');
    const rateErr = validatePositiveNumber(customRate, 'Exchange rate');

    if (amountErr || rateErr) {
      setErrors({
        amount: amountErr,
        customRate: rateErr
      });
      setResult(null);
      return;
    }

    setErrors({});
    const convertedAmount = amount * customRate;
    setResult({
      convertedAmount,
      rateUsed: customRate
    });
  };

  const handleReset = () => {
    setAmount(100);
    setFromCurrency('USD');
    setToCurrency('INR');
    setIsManualRate(false);
    setResult(null);
    setErrors({});
  };

  const currencyOptions = Object.keys(rates).map(code => ({
    value: code,
    label: CURRENCY_LABELS[code] || code
  })).sort((a, b) => a.value.localeCompare(b.value));

  const formula = "Converted Amount = Amount × Exchange Rate\nExchange Rate (computed) = (1 / USD-rate-of-From) × USD-rate-of-To";
  const example = `Convert: 100 USD to INR, Rate: 83.50\nConverted Value: 100 × 83.50 = ₹8,350.00`;

  const resultItems = result ? [
    { label: 'Source Amount', value: `${amount.toFixed(2)} ${fromCurrency}` },
    { label: 'Exchange Rate', value: `${result.rateUsed.toFixed(4)}` },
    { label: 'Target Amount', value: `${result.convertedAmount.toFixed(2)} ${toCurrency}` },
  ] : [];

  const inputs = (
    <>
      <CalculatorInput
        label="Amount to Convert"
        value={amount || ''}
        onChange={(val) => setAmount(val)}
        error={errors.amount}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <CalculatorSelect
          label="From Currency"
          value={fromCurrency}
          onChange={(e) => {
            setFromCurrency(e.target.value);
            setResult(null);
          }}
          options={currencyOptions}
        />
        <CalculatorSelect
          label="To Currency"
          value={toCurrency}
          onChange={(e) => {
            setToCurrency(e.target.value);
            setResult(null);
          }}
          options={currencyOptions}
        />
      </div>

      <div className="pt-2 space-y-3">
        <label className="flex items-center gap-2 font-sans text-sm text-slate select-none cursor-pointer">
          <input
            type="checkbox"
            checked={isManualRate}
            onChange={(e) => {
              setIsManualRate(e.target.checked);
              setResult(null);
            }}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer bg-surface"
          />
          <span className="font-semibold text-ink">Override exchange rate manually</span>
        </label>

        {isManualRate && (
          <CalculatorInput
            label={`Custom Rate (1 ${fromCurrency} = ? ${toCurrency})`}
            value={customRate || ''}
            onChange={(val) => setCustomRate(val)}
            step="0.0001"
            error={errors.customRate}
            required
          />
        )}
      </div>
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Conversion Results"
      highlightLabel="Converted Total"
      highlightValue={`${result.convertedAmount.toFixed(2)} ${toCurrency}`}
      items={resultItems}
    >
      <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg text-[11px] font-sans text-slate text-center leading-relaxed">
        <strong>Note:</strong> Currency rates are fetched live from open.er-api.com. Feel free to adjust the rate above manually if needed.
      </div>
    </CalculatorResult>
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Enter currency parameters and click Calculate to view target conversions.
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
