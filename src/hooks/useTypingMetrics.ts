import { useState, useEffect, useRef } from 'react';
import { TypingState } from './useTypingEngine';

export interface MetricsSnapshot {
  time: number; // seconds elapsed
  wpm: number;
  rawWpm: number;
}

export function useTypingMetrics(state: TypingState) {
  const [history, setHistory] = useState<MetricsSnapshot[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const lastUpdateRef = useRef<number>(0);

  // Calculate WPM
  // WPM = (Total Characters Typed / 5) / (Time in minutes)
  // We use standard 5 characters = 1 word
  const calculateWpm = (correctChars: number, elapsedMinutes: number) => {
    if (elapsedMinutes <= 0) return 0;
    return Math.round((correctChars / 5) / Math.max(elapsedMinutes, 0.01)); // prevent div by zero
  };

  const calculateRawWpm = (totalChars: number, elapsedMinutes: number) => {
    if (elapsedMinutes <= 0) return 0;
    return Math.round((totalChars / 5) / Math.max(elapsedMinutes, 0.01));
  };

  const calculateAccuracy = (correct: number, incorrect: number, extra: number) => {
    const total = correct + incorrect + extra;
    if (total === 0) return 100;
    return Math.max(0, Math.round((correct / total) * 100));
  };

  // Run a tracker every second while running
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.status === 'running' && state.startTime) {
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - state.startTime!) / 1000);
        
        // Prevent recording same second multiple times
        if (elapsedSeconds > lastUpdateRef.current) {
          lastUpdateRef.current = elapsedSeconds;
          const elapsedMinutes = elapsedSeconds / 60;
          
          setHistory(prev => [
            ...prev,
            {
              time: elapsedSeconds,
              wpm: calculateWpm(state.correctChars, elapsedMinutes),
              rawWpm: calculateRawWpm(state.correctChars + state.incorrectChars + state.extraChars, elapsedMinutes)
            }
          ]);
        }
      }, 1000);
    }

    if (state.status === 'idle') {
      setTimeout(() => setHistory([]), 0);
      lastUpdateRef.current = 0;
    }

    return () => clearInterval(interval);
  }, [state.status, state.startTime, state.correctChars, state.incorrectChars, state.extraChars]);

  // Track current time cleanly for pure rendering
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (state.status === 'running') {
      t = setInterval(() => setNow(Date.now()), 100);
    }
    return () => clearInterval(t);
  }, [state.status]);

  // Final metrics
  const elapsedMs = state.status === 'finished' && state.endTime && state.startTime
    ? state.endTime - state.startTime
    : (state.startTime ? now - state.startTime : 0);
  const elapsedMinutes = elapsedMs / 60000;

  const currentWpm = calculateWpm(state.correctChars, elapsedMinutes);
  const currentRawWpm = calculateRawWpm(state.correctChars + state.incorrectChars + state.extraChars, elapsedMinutes);
  const currentAccuracy = calculateAccuracy(state.correctChars, state.incorrectChars, state.extraChars);

  const peakWpm = history.length > 0 ? Math.max(...history.map(h => h.wpm)) : currentWpm;
  const consistency = calculateConsistency(history);

  return {
    currentWpm,
    currentRawWpm,
    currentAccuracy,
    peakWpm,
    consistency,
    history
  };
}

// Calculate consistency percentage (lower variance = higher consistency)
function calculateConsistency(history: MetricsSnapshot[]) {
  if (history.length < 2) return 100;
  
  const wpms = history.map(h => h.wpm);
  const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
  if (mean === 0) return 100;

  const variance = wpms.reduce((acc, w) => acc + Math.pow(w - mean, 2), 0) / wpms.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / mean; // Coefficient of variation
  
  // Convert CV to a 0-100 score, capping at 0
  const score = Math.max(0, 100 - (cv * 100));
  return Math.round(score);
}
