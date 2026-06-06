'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { CalculatorSelect } from '../CalculatorSelect';
import { CalculatorResult } from '../CalculatorResult';

interface TimeDurationCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function TimeDurationCalculatorView({ toolId, title, description }: TimeDurationCalculatorViewProps) {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [isNextDay, setIsNextDay] = useState(false);

  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    totalMinutes: number;
    totalHours: number;
    totalSeconds: number;
    formatted: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
      setError('Please select valid start and end times.');
      setResult(null);
      return;
    }

    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    if (endMinutes < startMinutes) {
      if (isNextDay) {
        endMinutes += 24 * 60;
      } else {
        // Automatically assume next day if end time is earlier and not explicitly set
        endMinutes += 24 * 60;
      }
    } else if (isNextDay) {
      endMinutes += 24 * 60;
    }

    const diffMinutes = endMinutes - startMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setResult({
      hours,
      minutes,
      totalMinutes: diffMinutes,
      totalHours: diffMinutes / 60,
      totalSeconds: diffMinutes * 60,
      formatted: `${hours} hours and ${minutes} minutes`
    });
  };

  const handleReset = () => {
    setStartTime('09:00');
    setEndTime('17:00');
    setIsNextDay(false);
    setResult(null);
    setError(null);
  };

  const resultItems = result ? [
    { label: 'Elapsed Duration', value: result.formatted },
    { label: 'Hours Component', value: `${result.hours} hrs` },
    { label: 'Minutes Component', value: `${result.minutes} mins` },
    { label: 'Total Hours', value: `${result.totalHours.toFixed(2)} hrs` },
    { label: 'Total Minutes', value: `${result.totalMinutes} mins` },
    { label: 'Total Seconds', value: `${result.totalSeconds} secs` }
  ] : [];

  const inputs = (
    <>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[13px] font-sans font-bold text-ink uppercase tracking-wider">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-3 border border-border rounded-xl bg-background text-ink font-mono outline-none focus:border-primary/80"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[13px] font-sans font-bold text-ink uppercase tracking-wider">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-3 border border-border rounded-xl bg-background text-ink font-mono outline-none focus:border-primary/80"
          required
        />
      </div>
      <div className="flex items-center gap-3 p-1">
        <input
          type="checkbox"
          id="isNextDay"
          checked={isNextDay}
          onChange={(e) => setIsNextDay(e.target.checked)}
          className="w-4.5 h-4.5 accent-primary border border-border rounded"
        />
        <label htmlFor="isNextDay" className="text-sm font-sans text-ink cursor-pointer select-none">
          End time is on the next calendar day
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-500 font-medium font-sans">{error}</p>
      )}
    </>
  );

  const results = result ? (
    <CalculatorResult
      title="Elapsed Time breakdown"
      highlightLabel="Time Duration"
      highlightValue={`${result.hours}h ${result.minutes}m`}
      items={resultItems}
    />
  ) : (
    <div className="bg-background border border-border rounded-xl p-6 text-center text-slate font-sans text-sm">
      Define start and end times to calculate elapsed durations.
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
      formula="Time Duration = End Time (minutes) - Start Time (minutes). If End Time < Start Time, End Time is increased by 1440 minutes (24 hours)."
      example="Start: 09:00 AM, End: 05:00 PM\nDuration: 8 hours (480 minutes)"
    />
  );
}
