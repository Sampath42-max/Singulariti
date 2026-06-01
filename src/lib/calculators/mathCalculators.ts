export function calculatePercentage(
  mode: 'of' | 'what-percent' | 'increase' | 'decrease',
  val1: number,
  val2: number
) {
  let result = 0;
  let formula = '';

  switch (mode) {
    case 'of':
      result = (val1 / 100) * val2;
      formula = `${val1}% of ${val2} = (${val1} / 100) × ${val2} = ${result.toFixed(4)}`;
      break;
    case 'what-percent':
      if (val2 === 0) {
        return { result: 0, formula: 'Division by zero' };
      }
      result = (val1 / val2) * 100;
      formula = `${val1} is what percent of ${val2} = (${val1} / ${val2}) × 100 = ${result.toFixed(4)}%`;
      break;
    case 'increase':
      if (val1 === 0) {
        return { result: 0, formula: 'Original value cannot be zero' };
      }
      result = ((val2 - val1) / val1) * 100;
      formula = `Percentage increase from ${val1} to ${val2} = ((${val2} - ${val1}) / ${val1}) × 100 = ${result.toFixed(4)}%`;
      break;
    case 'decrease':
      if (val1 === 0) {
        return { result: 0, formula: 'Original value cannot be zero' };
      }
      result = ((val1 - val2) / val1) * 100;
      formula = `Percentage decrease from ${val1} to ${val2} = ((${val1} - ${val2}) / ${val1}) × 100 = ${result.toFixed(4)}%`;
      break;
  }

  return {
    result,
    formula
  };
}

export function calculateCgpa(
  semesters: { gpa: number; credits?: number }[],
  scale: '10' | '4'
) {
  let totalGradePoints = 0;
  let totalCredits = 0;
  let simpleSum = 0;
  let semestersCount = 0;
  let hasCredits = false;

  semesters.forEach(sem => {
    if (sem.gpa !== undefined && !isNaN(sem.gpa)) {
      simpleSum += sem.gpa;
      semestersCount++;
      if (sem.credits !== undefined && !isNaN(sem.credits) && sem.credits > 0) {
        hasCredits = true;
        totalGradePoints += sem.gpa * sem.credits;
        totalCredits += sem.credits;
      }
    }
  });

  if (semestersCount === 0) {
    return { cgpa: 0, percentage: 0 };
  }

  const cgpa = hasCredits && totalCredits > 0 ? (totalGradePoints / totalCredits) : (simpleSum / semestersCount);

  let percentage = 0;
  if (scale === '10') {
    percentage = cgpa * 9.5;
  } else {
    // 4 point scale standard percent mapping (GPA / 4) * 100
    percentage = cgpa * 25;
  }

  return {
    cgpa,
    percentage
  };
}

// SECURE MATHEMATICAL EXPRESSION PARSER FOR SCIENTIFIC CALCULATOR

type TokenType = 'NUMBER' | 'OP' | 'LPAREN' | 'RPAREN' | 'NAME' | 'FACTORIAL' | 'EOF';

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(str: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    if (/\s/.test(char)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(char)) {
      let num = '';
      while (i < str.length && /[0-9.]/.test(str[i])) {
        num += str[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }
    if (/[a-zA-Z]/.test(char)) {
      let name = '';
      while (i < str.length && /[a-zA-Z0-9]/.test(str[i])) {
        name += str[i];
        i++;
      }
      tokens.push({ type: 'NAME', value: name.toLowerCase() });
      continue;
    }
    if (char === '!' || char === '%' || char === '+' || char === '-' || char === '*' || char === '/' || char === '^') {
      if (char === '!') {
        tokens.push({ type: 'FACTORIAL', value: '!' });
      } else {
        tokens.push({ type: 'OP', value: char });
      }
      i++;
      continue;
    }
    if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }
    if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }
    throw new Error(`Unexpected character: ${char}`);
  }
  tokens.push({ type: 'EOF', value: '' });
  return tokens;
}

function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial of negative number");
  if (n === 0 || n === 1) return 1;
  n = Math.floor(n);
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function evaluateScientificExpression(exprStr: string): number {
  // preprocess expression
  const sanitized = exprStr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/e/g, 'e');

  const tokens = tokenize(sanitized);
  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function consume(type?: TokenType) {
    const t = tokens[pos];
    if (type && t.type !== type) {
      throw new Error(`Expected token of type ${type}, got ${t.type}`);
    }
    pos++;
    return t;
  }

  function parseExpression(): number {
    let val = parseTerm();
    while (peek().type === 'OP' && (peek().value === '+' || peek().value === '-')) {
      const op = consume().value;
      const right = parseTerm();
      if (op === '+') val += right;
      else val -= right;
    }
    return val;
  }

  function parseTerm(): number {
    let val = parseFactor();
    while (peek().type === 'OP' && (peek().value === '*' || peek().value === '/' || peek().value === '%')) {
      const op = consume().value;
      const right = parseFactor();
      if (op === '*') {
        val *= right;
      } else if (op === '/') {
        if (right === 0) throw new Error("Divide by zero");
        val /= right;
      } else {
        val = val % right;
      }
    }
    return val;
  }

  function parseFactor(): number {
    let val = parseBase();
    while (peek().type === 'OP' && peek().value === '^') {
      consume();
      const right = parseFactor(); // right-associative
      val = Math.pow(val, right);
    }
    return val;
  }

  function parseBase(): number {
    let val = parseUnary();
    while (peek().type === 'FACTORIAL') {
      consume();
      val = factorial(val);
    }
    return val;
  }

  function parseUnary(): number {
    if (peek().type === 'OP' && peek().value === '-') {
      consume();
      return -parseUnary();
    }
    if (peek().type === 'OP' && peek().value === '+') {
      consume();
      return parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary(): number {
    const t = peek();
    if (t.type === 'NUMBER') {
      consume();
      return parseFloat(t.value);
    }
    if (t.type === 'NAME') {
      consume();
      const name = t.value;
      if (name === 'pi') return Math.PI;
      if (name === 'e') return Math.E;
      
      // Function call
      consume('LPAREN');
      const arg = parseExpression();
      consume('RPAREN');

      switch (name) {
        case 'sin': return Math.sin(arg);
        case 'cos': return Math.cos(arg);
        case 'tan': return Math.tan(arg);
        case 'log': return Math.log10(arg);
        case 'ln': return Math.log(arg);
        case 'sqrt':
          if (arg < 0) throw new Error("Negative square root");
          return Math.sqrt(arg);
        default:
          throw new Error(`Unknown function: ${name}`);
      }
    }
    if (t.type === 'LPAREN') {
      consume();
      const val = parseExpression();
      consume('RPAREN');
      return val;
    }
    throw new Error(`Unexpected token: ${t.value || t.type}`);
  }

  const result = parseExpression();
  if (peek().type !== 'EOF') {
    throw new Error("Extra input after valid expression");
  }
  return result;
}
