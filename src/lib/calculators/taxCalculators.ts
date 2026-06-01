import { TaxResult } from './calculatorTypes';

export function calculateGst(
  amount: number,
  rate: number,
  type: 'add' | 'remove'
) {
  let gstAmount = 0;
  let originalAmount = 0;
  let finalAmount = 0;

  if (type === 'add') {
    originalAmount = amount;
    gstAmount = (amount * rate) / 100;
    finalAmount = amount + gstAmount;
  } else {
    finalAmount = amount;
    originalAmount = (amount * 100) / (100 + rate);
    gstAmount = amount - originalAmount;
  }

  return {
    originalAmount,
    gstAmount,
    finalAmount
  };
}

export function calculateIncomeTax(
  grossIncome: number,
  regime: 'old' | 'new',
  deductions: number,
  ageCategory: 'below-60' | 'senior' | 'super-senior'
): TaxResult {
  let taxableIncome = 0;
  let estimatedTax = 0;

  if (regime === 'old') {
    taxableIncome = Math.max(0, grossIncome - deductions);
    
    // Slabs
    let slabLimits = [250000, 500000, 1000000];
    if (ageCategory === 'senior') {
      slabLimits = [300000, 500000, 1000000];
    } else if (ageCategory === 'super-senior') {
      slabLimits = [500000, 500000, 1000000];
    }

    if (taxableIncome <= slabLimits[0]) {
      estimatedTax = 0;
    } else if (taxableIncome <= slabLimits[1]) {
      estimatedTax = (taxableIncome - slabLimits[0]) * 0.05;
    } else if (taxableIncome <= slabLimits[2]) {
      estimatedTax = (slabLimits[1] - slabLimits[0]) * 0.05 + (taxableIncome - slabLimits[1]) * 0.20;
    } else {
      estimatedTax = 
        (slabLimits[1] - slabLimits[0]) * 0.05 + 
        (slabLimits[2] - slabLimits[1]) * 0.20 + 
        (taxableIncome - slabLimits[2]) * 0.30;
    }

    // Section 87A rebate for Old Regime
    if (taxableIncome <= 500000) {
      estimatedTax = Math.max(0, estimatedTax - 12500);
    }
  } else {
    // New Regime (FY 2024-25 / 2025-26 standard deduction is ₹75,000 for salaried employees)
    // We assume standard deduction of ₹75,000 is automatically applied
    const newRegimeStandardDeduction = 75000;
    taxableIncome = Math.max(0, grossIncome - newRegimeStandardDeduction);

    const slabs = [300000, 700000, 1000000, 1200000, 1500000];
    const rates = [0.05, 0.10, 0.15, 0.20, 0.30];

    if (taxableIncome <= slabs[0]) {
      estimatedTax = 0;
    } else {
      let tempTax = 0;
      let remaining = taxableIncome;

      // Slab 0: 0 to 3L (Rate: 0%)
      const slab0 = Math.min(remaining, slabs[0]);
      remaining -= slab0;

      // Slab 1: 3L to 7L (Rate: 5%)
      if (remaining > 0) {
        const slab1 = Math.min(remaining, slabs[1] - slabs[0]);
        tempTax += slab1 * rates[0];
        remaining -= slab1;
      }

      // Slab 2: 7L to 10L (Rate: 10%)
      if (remaining > 0) {
        const slab2 = Math.min(remaining, slabs[2] - slabs[1]);
        tempTax += slab2 * rates[1];
        remaining -= slab2;
      }

      // Slab 3: 10L to 12L (Rate: 15%)
      if (remaining > 0) {
        const slab3 = Math.min(remaining, slabs[3] - slabs[2]);
        tempTax += slab3 * rates[2];
        remaining -= slab3;
      }

      // Slab 4: 12L to 15L (Rate: 20%)
      if (remaining > 0) {
        const slab4 = Math.min(remaining, slabs[4] - slabs[3]);
        tempTax += slab4 * rates[3];
        remaining -= slab4;
      }

      // Slab 5: Above 15L (Rate: 30%)
      if (remaining > 0) {
        tempTax += remaining * rates[4];
      }

      estimatedTax = tempTax;
    }

    // Section 87A rebate for New Regime: No tax if taxable income is <= ₹7,000,000
    if (taxableIncome <= 700000) {
      estimatedTax = 0;
    }
  }

  const cess = estimatedTax * 0.04;
  const totalTaxPayable = estimatedTax + cess;

  return {
    taxableIncome,
    estimatedTax,
    cess,
    totalTaxPayable
  };
}
