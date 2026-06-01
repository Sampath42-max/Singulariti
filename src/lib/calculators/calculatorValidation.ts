export function validateRequired(val: any, label: string): string | null {
  if (val === undefined || val === null || String(val).trim() === '') {
    return `${label} is required.`;
  }
  return null;
}

export function validatePositiveNumber(val: number, label: string, allowZero = false): string | null {
  if (isNaN(val)) {
    return `${label} must be a number.`;
  }
  if (allowZero && val < 0) {
    return `${label} cannot be negative.`;
  }
  if (!allowZero && val <= 0) {
    return `${label} must be greater than zero.`;
  }
  return null;
}

export function validateDateOfBirth(dobStr: string): string | null {
  if (!dobStr) return 'Date of birth is required.';
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return 'Invalid date of birth.';
  
  const today = new Date();
  // Clear times to compare dates
  today.setHours(0, 0, 0, 0);
  dob.setHours(0, 0, 0, 0);
  
  if (dob > today) {
    return 'Date of birth cannot be in the future.';
  }
  return null;
}

export function validateDateDifference(startStr: string, endStr: string): string | null {
  if (!startStr) return 'Start date is required.';
  if (!endStr) return 'End date is required.';
  
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  if (isNaN(start.getTime())) return 'Invalid start date.';
  if (isNaN(end.getTime())) return 'Invalid end date.';
  
  if (start > end) {
    return 'Start date cannot be after the end date.';
  }
  return null;
}
