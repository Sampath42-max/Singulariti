import React, { useEffect, useRef, useState } from 'react';
import { TypingState } from '@/hooks/useTypingEngine';

interface TypingAreaProps {
  state: TypingState;
  onInput: (val: string) => void;
  onRestart: () => void;
}

export function TypingArea({ state, onInput, onRestart }: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(true);

  // Auto focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle click to focus
  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      onRestart();
    }
  };

  // Render words
  const renderWords = () => {
    return state.words.map((word, wIdx) => {
      const isCurrentWord = wIdx === state.wordIndex;
      const isPastWord = wIdx < state.wordIndex;
      
      let wordClass = "inline-block mx-1.5 my-1.5 text-2xl font-mono transition-colors duration-100 ";
      
      if (isPastWord) {
        const historyItem = state.history[wIdx];
        if (historyItem?.isCorrect) {
          wordClass += "text-slate"; // correct past word
        } else {
          wordClass += "text-red-500 underline decoration-red-500/30 underline-offset-4"; // incorrect past word
        }
      } else if (isCurrentWord) {
        wordClass += "text-slate-300"; // current word base color
      } else {
        wordClass += "text-slate-600"; // future word
      }

      return (
        <div key={wIdx} className={wordClass}>
          {word.split('').map((char, cIdx) => {
            let charClass = "";
            let isCaret = false;

            if (isCurrentWord) {
              const inputChar = state.currentInput[cIdx];
              if (inputChar === undefined) {
                // not typed yet
                charClass = "text-slate-500";
                if (cIdx === state.currentInput.length && isFocused) {
                  isCaret = true;
                }
              } else if (inputChar === char) {
                // correctly typed
                charClass = "text-foreground";
              } else {
                // incorrectly typed
                charClass = "text-red-400 bg-red-400/10 rounded-sm";
              }
            } else if (isPastWord) {
               // Render past word exactly as is, styling handled at word level usually
               // But we can color individual chars for more precision
               const historyItem = state.history[wIdx];
               const inputChar = historyItem?.input[cIdx];
               if (inputChar === char) {
                 charClass = "text-slate-400";
               } else {
                 charClass = "text-red-500";
               }
            } else {
               charClass = "text-slate-600";
            }

            return (
              <span key={cIdx} className={`relative ${charClass}`}>
                {isCaret && (
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent animate-pulse" />
                )}
                {char}
              </span>
            );
          })}
          
          {/* Render extra characters typed beyond word length */}
          {isCurrentWord && state.currentInput.length > word.length && (
            <span className="text-red-400 bg-red-400/10 rounded-sm">
              {state.currentInput.slice(word.length)}
            </span>
          )}
          
          {/* Caret at end of word if extra chars */}
          {isCurrentWord && state.currentInput.length >= word.length && isFocused && (
             <span className="relative">
               <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent animate-pulse" />
             </span>
          )}
        </div>
      );
    });
  };

  // We only show a limited window of words (e.g. current line and next line)
  // To keep it simple, we use a fixed height container with hidden overflow, and scroll it
  useEffect(() => {
    if (containerRef.current) {
       // A bit of a hack to keep the current line in view without complex math:
       // Find the active word element and scroll it into view
       const activeWord = containerRef.current.querySelector('.text-slate-300'); // current word base class
       if (activeWord) {
         activeWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
       }
    }
  }, [state.wordIndex]);

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onClick={handleClick}
    >
      {/* Time / Word Progress */}
      <div className="flex justify-between items-center mb-4 font-system text-accent text-2xl">
        <div>
          {state.mode === 'time' ? state.timeLeft : `${state.wordIndex}/${state.wordLimit}`}
        </div>
        <div className="text-sm text-slate animate-pulse">
          {isFocused ? '' : 'Click or press any key to focus'}
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="absolute inset-0 opacity-0 cursor-default"
        value={state.currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        list="autocompleteOff"
        spellCheck="false"
      />

      <div 
        ref={containerRef}
        className={`relative w-full h-[140px] overflow-hidden leading-relaxed select-none transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-40 blur-[2px]'}`}
      >
        <div className="flex flex-wrap items-start content-start w-full">
          {renderWords()}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate text-sm font-sans flex justify-center items-center space-x-2">
        <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">Tab</kbd>
        <span>+</span>
        <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">Enter</kbd>
        <span>to restart</span>
      </div>
    </div>
  );
}
