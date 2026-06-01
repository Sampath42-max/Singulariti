'use client';

import React, { useState } from 'react';
import { useTypingEngine, TypingMode } from '@/hooks/useTypingEngine';
import { useTypingMetrics } from '@/hooks/useTypingMetrics';
import { useMistakeIntelligence } from '@/hooks/useMistakeIntelligence';
import { TypingModesMenu } from './TypingModesMenu';
import { TypingArea } from './TypingArea';
import { ResultDashboard } from './ResultDashboard';
import { TypingDifficulty } from '@/lib/typing/words';

export function TypingTestContainer() {
  const { state, handleInput, initializeTest, finishTest } = useTypingEngine();
  const metrics = useTypingMetrics(state);
  const intelligence = useMistakeIntelligence(state);

  const handleModeChange = (m: TypingMode) => initializeTest(m, state.timeLimit, state.wordLimit, state.difficulty);
  const handleTimeChange = (t: number) => initializeTest('time', t, state.wordLimit, state.difficulty);
  const handleWordChange = (w: number) => initializeTest('words', state.timeLimit, w, state.difficulty);
  const handleDifficultyChange = (d: TypingDifficulty) => initializeTest(state.mode, state.timeLimit, state.wordLimit, d);
  
  const handleRestart = () => {
    initializeTest(state.mode, state.timeLimit, state.wordLimit, state.difficulty);
  };

  const isRunning = state.status === 'running';
  const isFinished = state.status === 'finished';

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
      
      {!isFinished && (
        <TypingModesMenu 
          mode={state.mode}
          timeLimit={state.timeLimit}
          wordLimit={state.wordLimit}
          difficulty={state.difficulty}
          onModeChange={handleModeChange}
          onTimeChange={handleTimeChange}
          onWordChange={handleWordChange}
          onDifficultyChange={handleDifficultyChange}
          disabled={isRunning}
        />
      )}

      {isFinished ? (
        <ResultDashboard 
          wpm={metrics.currentWpm}
          rawWpm={metrics.currentRawWpm}
          accuracy={metrics.currentAccuracy}
          history={metrics.history}
          testDurationSecs={state.startTime && state.endTime ? Math.round((state.endTime - state.startTime) / 1000) : 0}
          consistency={metrics.consistency}
          mistypedKeys={intelligence.topMistypedKeys.map(k => k[0])}
          mistakeInsight={intelligence.insight}
          onRestart={handleRestart}
        />
      ) : (
        <TypingArea 
          state={state}
          onInput={handleInput}
          onRestart={handleRestart}
        />
      )}

    </div>
  );
}
