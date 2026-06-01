import { useMemo } from 'react';
import { TypingState } from './useTypingEngine';

export function useMistakeIntelligence(state: TypingState) {
  const analysis = useMemo(() => {
    const mistypedKeys: Record<string, number> = {};
    const mistypedWords: Record<string, number> = {};
    let totalErrors = 0;

    state.history.forEach(item => {
      if (!item.isCorrect) {
        // Track mistyped word
        mistypedWords[item.word] = (mistypedWords[item.word] || 0) + 1;

        // Track specific characters
        for (let i = 0; i < item.word.length; i++) {
          const expected = item.word[i];
          const actual = item.input[i];
          if (expected !== actual) {
            mistypedKeys[expected] = (mistypedKeys[expected] || 0) + 1;
            totalErrors++;
          }
        }
        
        // Count missing characters at the end
        if (item.input.length < item.word.length) {
          for (let i = item.input.length; i < item.word.length; i++) {
            const expected = item.word[i];
            mistypedKeys[expected] = (mistypedKeys[expected] || 0) + 1;
            totalErrors++;
          }
        }
      }
    });

    const topMistypedKeys = Object.entries(mistypedKeys)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topMistypedWords = Object.entries(mistypedWords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    let insight = '';
    if (topMistypedKeys.length > 0) {
      insight = `You frequently mistype the letter '${topMistypedKeys[0][0]}'.`;
    }
    
    // Check for "tion" or similar patterns if we want to get fancy, but simple is fine for now
    if (topMistypedWords.length > 0) {
      const words = topMistypedWords.map(w => w[0]);
      if (words.some(w => w.endsWith('tion'))) {
        insight += " Watch out for words ending in 'tion'.";
      }
    }

    return {
      mistypedKeys,
      topMistypedKeys,
      topMistypedWords,
      totalErrors,
      insight
    };
  }, [state.history]);

  return analysis;
}
