import { useState, useEffect, useCallback, useRef } from 'react';
import { generateWords, TypingDifficulty } from '@/lib/typing/words';

export type TypingMode = 'time' | 'words' | 'custom';

export interface TypingState {
  mode: TypingMode;
  timeLimit: number; // in seconds
  wordLimit: number;
  difficulty: TypingDifficulty;
  words: string[];
  currentInput: string;
  wordIndex: number;
  status: 'idle' | 'running' | 'finished';
  startTime: number | null;
  endTime: number | null;
  timeLeft: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  history: { word: string; input: string; isCorrect: boolean }[];
  keystrokes: number;
}

export function useTypingEngine() {
  const [state, setState] = useState<TypingState>({
    mode: 'time',
    timeLimit: 30,
    wordLimit: 25,
    difficulty: 'easy',
    words: [],
    currentInput: '',
    wordIndex: 0,
    status: 'idle',
    startTime: null,
    endTime: null,
    timeLeft: 30,
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    history: [],
    keystrokes: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize test
  const initializeTest = useCallback((mode: TypingMode, time: number, words: number, diff: TypingDifficulty) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // For time mode, generate plenty of words. For words mode, exact number.
    const wordCount = mode === 'time' ? 300 : words;
    const generated = generateWords(wordCount, diff);
    
    setState({
      mode,
      timeLimit: time,
      wordLimit: words,
      difficulty: diff,
      words: generated,
      currentInput: '',
      wordIndex: 0,
      status: 'idle',
      startTime: null,
      endTime: null,
      timeLeft: mode === 'time' ? time : 0,
      correctChars: 0,
      incorrectChars: 0,
      extraChars: 0,
      history: [],
      keystrokes: 0,
    });
  }, []);

  // Set default words on mount
  useEffect(() => {
    // Run once on mount to populate initial words
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initializeTest(state.mode, state.timeLimit, state.wordLimit, state.difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializeTest]);

  // Finish test
  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState(prev => ({
      ...prev,
      status: 'finished',
      endTime: Date.now()
    }));
  }, []);

  // Handle typing input
  const handleInput = useCallback((value: string) => {
    setState(prev => {
      if (prev.status === 'finished') return prev;

      const newState = { ...prev };

      // Start test on first keystroke
      if (prev.status === 'idle') {
        newState.status = 'running';
        newState.startTime = Date.now();

        if (prev.mode === 'time') {
          timerRef.current = setInterval(() => {
            setState(s => {
              if (s.timeLeft <= 1) {
                if (timerRef.current) clearInterval(timerRef.current);
                return { ...s, timeLeft: 0, status: 'finished', endTime: Date.now() };
              }
              return { ...s, timeLeft: s.timeLeft - 1 };
            });
          }, 1000);
        }
      }

      // Check if space was pressed indicating word completion
      if (value.endsWith(' ')) {
        const inputWord = value.trim();
        const targetWord = prev.words[prev.wordIndex];
        
        // Don't advance if just space was pressed on empty input
        if (inputWord === '' && value === ' ') {
          return newState; // ignore
        }

        const isCorrect = inputWord === targetWord;
        
        // Calculate characters for this word
        // Iterate through the shorter length, then add extra or incorrect
        let cChars = 0;
        let iChars = 0;
        let eChars = 0;

        for (let i = 0; i < Math.max(inputWord.length, targetWord.length); i++) {
           if (i < targetWord.length && i < inputWord.length) {
             if (inputWord[i] === targetWord[i]) cChars++;
             else iChars++;
           } else if (i >= targetWord.length) {
             eChars++;
           } else if (i >= inputWord.length) {
             // Missing characters at end are not strictly counted until end of test or just counted as incorrect?
             // Usually monkeytype counts missed characters of a word if you hit space early as just not typed, not strictly 'incorrect' unless evaluating full accuracy. We'll count them as incorrect to match error rate calculation.
             iChars++; 
           }
        }
        
        // Plus 1 correct char for the space itself
        cChars++;

        newState.history = [...prev.history, { word: targetWord, input: inputWord, isCorrect }];
        newState.wordIndex = prev.wordIndex + 1;
        newState.currentInput = '';
        newState.correctChars = prev.correctChars + cChars;
        newState.incorrectChars = prev.incorrectChars + iChars;
        newState.extraChars = prev.extraChars + eChars;
        newState.keystrokes = prev.keystrokes + 1; // space key

        // Check if finished by words mode
        if (prev.mode === 'words' && newState.wordIndex >= prev.wordLimit) {
           newState.status = 'finished';
           newState.endTime = Date.now();
           if (timerRef.current) clearInterval(timerRef.current);
        }

        return newState;
      }

      // Normal character typing
      // If the input was reduced (backspace), we don't recalculate global correctChars immediately, 
      // but we do count keystrokes.
      const isBackspace = value.length < prev.currentInput.length;
      if (!isBackspace) {
        newState.keystrokes += 1;
      }
      newState.currentInput = value;

      // Auto-finish if it's the last word and exactly correct
      if (prev.mode === 'words' && prev.wordIndex === prev.wordLimit - 1) {
        const targetWord = prev.words[prev.wordIndex];
        if (value === targetWord) {
           newState.history = [...prev.history, { word: targetWord, input: value, isCorrect: true }];
           newState.wordIndex = prev.wordIndex + 1;
           newState.correctChars = prev.correctChars + value.length; // No space typed
           newState.status = 'finished';
           newState.endTime = Date.now();
           if (timerRef.current) clearInterval(timerRef.current);
        }
      }

      return newState;
    });
  }, []);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    state,
    handleInput,
    initializeTest,
    finishTest
  };
}
