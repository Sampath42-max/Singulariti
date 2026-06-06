import React from 'react';
import { TypingMode } from '@/hooks/useTypingEngine';
import { TypingDifficulty } from '@/lib/typing/words';
import { Clock, Type, Hash, Quote, Code } from 'lucide-react';

interface TypingModesMenuProps {
  mode: TypingMode;
  timeLimit: number;
  wordLimit: number;
  difficulty: TypingDifficulty;
  onModeChange: (mode: TypingMode) => void;
  onTimeChange: (time: number) => void;
  onWordChange: (words: number) => void;
  onDifficultyChange: (diff: TypingDifficulty) => void;
  disabled?: boolean;
}

export function TypingModesMenu({
  mode, timeLimit, wordLimit, difficulty,
  onModeChange, onTimeChange, onWordChange, onDifficultyChange,
  disabled
}: TypingModesMenuProps) {

  const timeOptions = [15, 30, 60, 120, 300];
  const wordOptions = [10, 25, 50, 100, 250];

  const diffIcons = {
    easy: <Type size={14} />,
    medium: <Type size={14} />,
    hard: <Type size={14} />,
    numbers: <Hash size={14} />,
    punctuation: <Quote size={14} />,
    code: <Code size={14} />
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 p-4 mb-8 transition-opacity duration-300 ${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Mode Select */}
      <div className="flex items-center space-x-2 bg-surface/50 rounded-full px-4 py-2">
        <button
          onClick={() => onModeChange('time')}
          suppressHydrationWarning
          className={`flex items-center space-x-2 px-2 py-1 rounded text-sm font-sans transition-colors ${mode === 'time' ? 'text-primary' : 'text-slate hover:text-foreground'}`}
        >
          <Clock size={16} />
          <span>time</span>
        </button>
        <button
          onClick={() => onModeChange('words')}
          suppressHydrationWarning
          className={`flex items-center space-x-2 px-2 py-1 rounded text-sm font-sans transition-colors ${mode === 'words' ? 'text-primary' : 'text-slate hover:text-foreground'}`}
        >
          <Type size={16} />
          <span>words</span>
        </button>
      </div>

      {/* Value Select */}
      <div className="flex items-center space-x-2 bg-surface/50 rounded-full px-4 py-2">
        {mode === 'time' && timeOptions.map(t => (
          <button
            key={t}
            onClick={() => onTimeChange(t)}
            suppressHydrationWarning
            className={`px-2 py-1 rounded text-sm font-system transition-colors ${timeLimit === t ? 'text-primary' : 'text-slate hover:text-foreground'}`}
          >
            {t}
          </button>
        ))}
        {mode === 'words' && wordOptions.map(w => (
          <button
            key={w}
            onClick={() => onWordChange(w)}
            suppressHydrationWarning
            className={`px-2 py-1 rounded text-sm font-system transition-colors ${wordLimit === w ? 'text-primary' : 'text-slate hover:text-foreground'}`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Difficulty Select */}
      <div className="flex items-center space-x-2 bg-surface/50 rounded-full px-4 py-2">
        {(Object.keys(diffIcons) as TypingDifficulty[]).map(d => (
          <button
            key={d}
            onClick={() => onDifficultyChange(d)}
            title={d}
            suppressHydrationWarning
            className={`flex items-center space-x-1 px-2 py-1 rounded text-sm font-sans transition-colors ${difficulty === d ? 'text-primary' : 'text-slate hover:text-foreground'}`}
          >
            {diffIcons[d]}
            <span className="hidden sm:inline">{d}</span>
          </button>
        ))}
      </div>
      
    </div>
  );
}
