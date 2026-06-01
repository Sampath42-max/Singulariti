export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface InterestResult {
  monthlyEmi?: number;
  totalInterest: number;
  totalPayment: number;
  principalAmount: number;
  interestPercentage: number;
  maturityAmount?: number;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  daysToNextBirthday: number;
}

export interface TaxResult {
  taxableIncome: number;
  estimatedTax: number;
  cess: number;
  totalTaxPayable: number;
}

export interface BmiResult {
  bmiValue: number;
  category: string;
  healthyMin: number;
  healthyMax: number;
}

export interface CalorieResult {
  bmr: number;
  maintenanceCalories: number;
  suggestedCalories: number;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
}
