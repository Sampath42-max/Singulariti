import { InterestResult } from './calculatorTypes';

export function calculateEmi(
  principal: number,
  annualRate: number,
  tenure: number,
  tenureType: 'months' | 'years'
): InterestResult {
  const N = tenureType === 'years' ? tenure * 12 : tenure;
  const R = (annualRate / 12) / 100; // monthly rate

  let monthlyEmi = 0;
  if (R === 0) {
    monthlyEmi = principal / N;
  } else {
    monthlyEmi = principal * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
  }

  const totalPayment = monthlyEmi * N;
  const totalInterest = totalPayment - principal;
  const interestPercentage = (totalInterest / totalPayment) * 100;

  return {
    monthlyEmi,
    totalPayment,
    totalInterest,
    principalAmount: principal,
    interestPercentage
  };
}

export function calculateSip(
  monthlyInvestment: number,
  expectedReturnRate: number,
  years: number
) {
  const n = years * 12;
  const i = (expectedReturnRate / 12) / 100; // monthly return rate

  let totalMaturityValue = 0;
  if (i === 0) {
    totalMaturityValue = monthlyInvestment * n;
  } else {
    totalMaturityValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const investedAmount = monthlyInvestment * n;
  const estimatedReturns = totalMaturityValue - investedAmount;

  return {
    investedAmount,
    estimatedReturns,
    totalMaturityValue
  };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  timePeriod: number,
  frequency: 'yearly' | 'half-yearly' | 'quarterly' | 'monthly' | 'daily'
) {
  const freqMap = {
    'yearly': 1,
    'half-yearly': 2,
    'quarterly': 4,
    'monthly': 12,
    'daily': 365
  };
  const n = freqMap[frequency] || 1;
  const r = annualRate / 100;
  const t = timePeriod;

  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = finalAmount - principal;

  return {
    finalAmount,
    interestEarned
  };
}

export function calculateCagr(
  initialValue: number,
  finalValue: number,
  years: number
) {
  if (years <= 0 || initialValue <= 0 || finalValue <= 0) {
    return { cagr: 0, totalGrowth: 0 };
  }
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  const totalGrowth = ((finalValue - initialValue) / initialValue) * 100;

  return {
    cagr,
    totalGrowth
  };
}

export function calculateFd(
  depositAmount: number,
  annualRate: number,
  tenure: number,
  tenureType: 'months' | 'years',
  frequency: 'yearly' | 'half-yearly' | 'quarterly' | 'monthly'
): InterestResult {
  const t = tenureType === 'years' ? tenure : tenure / 12;
  const freqMap = {
    'yearly': 1,
    'half-yearly': 2,
    'quarterly': 4,
    'monthly': 12
  };
  const n = freqMap[frequency] || 4; // standard default quarterly
  const r = annualRate / 100;

  const maturityAmount = depositAmount * Math.pow(1 + r / n, n * t);
  const totalInterest = maturityAmount - depositAmount;
  const interestPercentage = (totalInterest / maturityAmount) * 100;

  return {
    maturityAmount,
    totalInterest,
    totalPayment: maturityAmount,
    principalAmount: depositAmount,
    interestPercentage
  };
}

export function calculateRoi(
  initialInvestment: number,
  finalValue: number,
  additionalCosts = 0,
  timePeriod = 0
) {
  const totalCost = initialInvestment + additionalCosts;
  const netProfit = finalValue - totalCost;
  const roi = (netProfit / totalCost) * 100;

  let annualizedRoi: number | undefined;
  if (timePeriod > 0 && totalCost > 0 && finalValue > 0) {
    annualizedRoi = (Math.pow(finalValue / totalCost, 1 / timePeriod) - 1) * 100;
  }

  return {
    netProfit,
    roi,
    annualizedRoi
  };
}

export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  interestRate: number,
  termYears: number,
  propertyTax = 0,
  homeInsurance = 0
) {
  const principal = homePrice - downPayment;
  const r = (interestRate / 12) / 100;
  const n = termYears * 12;

  let monthlyPAndI = 0;
  if (r === 0) {
    monthlyPAndI = principal / n;
  } else {
    monthlyPAndI = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  }

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = homeInsurance / 12;
  const totalMonthlyPayment = monthlyPAndI + monthlyTax + monthlyInsurance;

  const totalRepayment = monthlyPAndI * n;
  const totalInterest = totalRepayment - principal;

  return {
    monthlyPAndI,
    monthlyTax,
    monthlyInsurance,
    totalMonthlyPayment,
    totalInterest,
    totalRepayment,
    principalAmount: principal
  };
}
