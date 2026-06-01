'use client';

import React from 'react';
import { AgeCalculatorView } from './tools/AgeCalculatorView';
import { EmiCalculatorView } from './tools/EmiCalculatorView';
import { SipCalculatorView } from './tools/SipCalculatorView';
import { CompoundInterestCalculatorView } from './tools/CompoundInterestCalculatorView';
import { CagrCalculatorView } from './tools/CagrCalculatorView';
import { FdCalculatorView } from './tools/FdCalculatorView';
import { IncomeTaxCalculatorView } from './tools/IncomeTaxCalculatorView';
import { GstCalculatorView } from './tools/GstCalculatorView';
import { BmiCalculatorView } from './tools/BmiCalculatorView';
import { CalorieCalculatorView } from './tools/CalorieCalculatorView';
import { PercentageCalculatorView } from './tools/PercentageCalculatorView';
import { CgpaCalculatorView } from './tools/CgpaCalculatorView';
import { DateDifferenceCalculatorView } from './tools/DateDifferenceCalculatorView';
import { ScientificCalculatorView } from './tools/ScientificCalculatorView';
import { DiscountCalculatorView } from './tools/DiscountCalculatorView';
import { ProfitCalculatorView } from './tools/ProfitCalculatorView';
import { RoiCalculatorView } from './tools/RoiCalculatorView';
import { CurrencyConverterView } from './tools/CurrencyConverterView';
import { YoutubeEarningsCalculatorView } from './tools/YoutubeEarningsCalculatorView';
import { AdsenseRevenueCalculatorView } from './tools/AdsenseRevenueCalculatorView';
import { MortgageCalculatorView } from './tools/MortgageCalculatorView';

interface CalculatorClientContainerProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
}

export function CalculatorClientContainer({
  toolId,
  toolName,
  toolDescription
}: CalculatorClientContainerProps) {
  switch (toolId) {
    case 'age-calculator':
      return <AgeCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'emi-calculator':
      return <EmiCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'sip-calculator':
      return <SipCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'compound-interest-calculator':
      return <CompoundInterestCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'cagr-calculator':
      return <CagrCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'fd-calculator':
      return <FdCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'income-tax-calculator':
      return <IncomeTaxCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'gst-calculator':
      return <GstCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'bmi-calculator':
      return <BmiCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'calorie-calculator':
      return <CalorieCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'percentage-calculator':
      return <PercentageCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'cgpa-calculator':
      return <CgpaCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'date-difference-calculator':
      return <DateDifferenceCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'scientific-calculator':
      return <ScientificCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'discount-calculator':
      return <DiscountCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'profit-calculator':
      return <ProfitCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'roi-calculator':
      return <RoiCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'currency-converter':
      return <CurrencyConverterView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'youtube-earnings-calculator':
      return <YoutubeEarningsCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'adsense-revenue-calculator':
      return <AdsenseRevenueCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    case 'mortgage-calculator':
      return <MortgageCalculatorView toolId={toolId} title={toolName} description={toolDescription} />;
    default:
      return (
        <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-xl border border-red-500/20 font-sans">
          Calculator with ID "{toolId}" was not found or is not yet implemented.
        </div>
      );
  }
}
