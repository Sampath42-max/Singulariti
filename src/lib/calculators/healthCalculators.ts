import { BmiResult, CalorieResult } from './calculatorTypes';

export function calculateBmi(
  heightVal: number,
  heightUnit: 'cm' | 'm' | 'ft-in',
  weightVal: number,
  weightUnit: 'kg' | 'lbs',
  ftVal?: number,
  inVal?: number
): BmiResult {
  let heightInMeters = 0;
  if (heightUnit === 'cm') {
    heightInMeters = heightVal / 100;
  } else if (heightUnit === 'm') {
    heightInMeters = heightVal;
  } else if (heightUnit === 'ft-in') {
    const feet = ftVal || 0;
    const inches = inVal || 0;
    const totalInches = feet * 12 + inches;
    heightInMeters = totalInches * 0.0254;
  }

  let weightInKg = 0;
  if (weightUnit === 'kg') {
    weightInKg = weightVal;
  } else if (weightUnit === 'lbs') {
    weightInKg = weightVal * 0.45359237;
  }

  if (heightInMeters <= 0) {
    return { bmiValue: 0, category: 'Unknown', healthyMin: 0, healthyMax: 0 };
  }

  const bmiValue = weightInKg / (heightInMeters * heightInMeters);

  let category = 'Normal weight';
  if (bmiValue < 18.5) {
    category = 'Underweight';
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = 'Normal weight';
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  // Healthy BMI range is 18.5 to 24.9
  const healthyMin = 18.5 * (heightInMeters * heightInMeters);
  const healthyMax = 24.9 * (heightInMeters * heightInMeters);

  return {
    bmiValue,
    category,
    healthyMin: weightUnit === 'kg' ? healthyMin : healthyMin / 0.45359237,
    healthyMax: weightUnit === 'kg' ? healthyMax : healthyMax / 0.45359237
  };
}

export function calculateCalories(
  gender: 'male' | 'female',
  age: number,
  heightCm: number,
  weightKg: number,
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extra-active',
  goal: 'maintain' | 'loss' | 'gain'
): CalorieResult {
  // Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const multipliers = {
    'sedentary': 1.2,
    'lightly-active': 1.375,
    'moderately-active': 1.55,
    'very-active': 1.725,
    'extra-active': 1.9
  };

  const multiplier = multipliers[activityLevel] || 1.2;
  const maintenanceCalories = bmr * multiplier;

  let suggestedCalories = maintenanceCalories;
  if (goal === 'loss') {
    suggestedCalories = Math.max(1200, maintenanceCalories - 500); // 1200 kcal is generally safety lower limit
  } else if (goal === 'gain') {
    suggestedCalories = maintenanceCalories + 500;
  }

  return {
    bmr,
    maintenanceCalories,
    suggestedCalories
  };
}
