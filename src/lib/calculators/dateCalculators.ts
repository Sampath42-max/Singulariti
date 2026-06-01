import { AgeResult } from './calculatorTypes';

export function calculateAge(dobStr: string, currentStr: string): AgeResult {
  const dob = new Date(dobStr);
  const current = new Date(currentStr);
  
  dob.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  let years = current.getFullYear() - dob.getFullYear();
  let months = current.getMonth() - dob.getMonth();
  let days = current.getDate() - dob.getDate();

  if (days < 0) {
    // Borrow days from previous month
    const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  const diffTime = current.getTime() - dob.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next birthday countdown
  const nextBirthday = new Date(current.getFullYear(), dob.getMonth(), dob.getDate());
  nextBirthday.setHours(0, 0, 0, 0);
  
  if (nextBirthday < current) {
    nextBirthday.setFullYear(current.getFullYear() + 1);
  }
  
  const nextBdDiff = nextBirthday.getTime() - current.getTime();
  const daysToNextBirthday = Math.max(0, Math.ceil(nextBdDiff / (1000 * 60 * 60 * 24)));

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    daysToNextBirthday
  };
}

export function calculateDateDifference(
  startStr: string,
  endStr: string,
  includeEndDate: boolean
) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (includeEndDate) {
    end.setDate(end.getDate() + 1);
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  const diffTime = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths
  };
}
