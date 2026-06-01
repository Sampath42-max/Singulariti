import React, { useEffect, useRef, useState } from 'react';
import { TypingState } from '@/hooks/useTypingEngine';
import { motion } from 'framer-motion';

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
      
      let wordClass = "inline-block mx-1.5 my-1.5 text-3xl font-mono ";
      
      return (
        <div 
          key={wIdx} 
          className={wordClass}
          {...(isCurrentWord ? { 'data-active': 'true' } : {})}
        >
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
                charClass = "text-red-500 bg-red-500/10 rounded-sm";
              }
            } else if (isPastWord) {
               const historyItem = state.history[wIdx];
               const inputChar = historyItem?.input[cIdx];
               if (inputChar === char) {
                 charClass = "text-primary";
               } else {
                 charClass = "text-red-500";
               }
            } else {
               charClass = "text-slate-500";
            }

            return (
              <span key={cIdx} className={`relative ${charClass}`}>
                {isCaret && (
                  <motion.div 
                    layoutId="caret"
                    className="absolute left-0 top-[10%] bottom-[10%] w-[2px] bg-primary z-10"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ 
                      layout: { type: "tween", ease: "linear", duration: 0.1 },
                      opacity: { repeat: Infinity, duration: 1, ease: "linear" }
                    }}
                  />
                )}
                {char}
              </span>
            );
          })}
          
          {/* Render extra characters typed beyond word length */}
          {isCurrentWord && state.currentInput.length > word.length && (
            <span className="text-red-500 bg-red-500/10 rounded-sm">
              {state.currentInput.slice(word.length)}
            </span>
          )}
          
          {/* Caret at end of word if extra chars */}
          {isCurrentWord && state.currentInput.length >= word.length && isFocused && (
             <span className="relative">
               <motion.div 
                 layoutId="caret"
                 className="absolute left-0 top-[10%] bottom-[10%] w-[2px] bg-primary z-10"
                 initial={{ opacity: 1 }}
                 animate={{ opacity: [1, 0, 1] }}
                 transition={{ 
                   layout: { type: "tween", ease: "linear", duration: 0.1 },
                   opacity: { repeat: Infinity, duration: 1, ease: "linear" }
                 }}
               />
             </span>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    if (containerRef.current) {
       const activeWord = containerRef.current.querySelector('[data-active="true"]');
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
      <div className="flex justify-between items-center mb-4 font-system text-primary text-2xl">
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
      
      <div className="mt-8 flex flex-col items-center space-y-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRestart();
            inputRef.current?.focus();
          }}
          className="flex items-center justify-center p-3 rounded-full hover:bg-surface text-slate hover:text-foreground transition-colors group cursor-pointer relative z-20"
          title="Restart Test"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-90 transition-transform duration-300"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
        <div className="text-center text-slate/70 text-sm font-sans flex justify-center items-center space-x-2">
          <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">Tab</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">Enter</kbd>
          <span>to restart</span>
        </div>
      </div>
    </div>
  );
}
