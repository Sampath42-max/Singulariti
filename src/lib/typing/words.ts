export const englishWords = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
];

export const punctuationWords = englishWords.map(word => {
  const puns = [".", ",", "?", "!", ";", ":", "-", "'", '"', "(", ")"];
  const randomPun = puns[Math.floor(Math.random() * puns.length)];
  return Math.random() > 0.5 ? `${word}${randomPun}` : `${randomPun}${word}`;
});

export const numberWords = Array.from({ length: 200 }, () => {
  return Math.floor(Math.random() * 10000).toString();
});

export const codeSnippets = [
  "const", "let", "var", "function", "return", "if", "else", "switch", "case", "break", "continue", "for", "while", "do", "try", "catch", "finally", "throw", "class", "extends", "super", "import", "export", "default", "from", "as", "new", "this", "typeof", "instanceof", "in", "of", "delete", "void", "yield", "await", "async", "=>", "==", "===", "!=", "!==", ">", ">=", "<", "<=", "&&", "||", "!", "+", "-", "*", "/", "%", "++", "--", "=", "+=", "-=", "*=", "/=", "%=", "&", "|", "^", "~", "<<", ">>", ">>>", "Object.keys()", "Array.map()", "JSON.stringify()", "Promise.all()", "console.log()", "setTimeout()", "clearTimeout()", "setInterval()", "clearInterval()", "document.getElementById()", "window.addEventListener()", "Math.random()", "String.fromCharCode()", "Number.parseInt()", "Boolean()"
];

export type TypingDifficulty = 'easy' | 'medium' | 'hard' | 'numbers' | 'punctuation' | 'code';

export function generateWords(count: number, difficulty: TypingDifficulty): string[] {
  let sourceWords: string[] = [];

  switch (difficulty) {
    case 'numbers':
      sourceWords = numberWords;
      break;
    case 'punctuation':
      sourceWords = punctuationWords;
      break;
    case 'code':
      sourceWords = codeSnippets;
      break;
    case 'hard':
      // Just mock some longer words for hard
      sourceWords = englishWords.filter(w => w.length >= 6);
      break;
    case 'medium':
      sourceWords = englishWords.filter(w => w.length >= 4 && w.length <= 7);
      break;
    case 'easy':
    default:
      sourceWords = englishWords.filter(w => w.length <= 5);
      break;
  }

  // Fallback if filtering removed too many
  if (sourceWords.length < 10) {
    sourceWords = englishWords;
  }

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * sourceWords.length);
    result.push(sourceWords[randomIndex]);
  }

  return result;
}
