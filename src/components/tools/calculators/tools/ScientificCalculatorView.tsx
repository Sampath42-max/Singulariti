'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { evaluateScientificExpression } from '@/lib/calculators/mathCalculators';
import { Button } from '@/components/ui/Button';
import { Delete, History } from 'lucide-react';

interface ScientificCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function ScientificCalculatorView({ toolId, title, description }: ScientificCalculatorViewProps) {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Maintain focus and track cursor position
  const handleBtnPress = (value: string) => {
    setError(null);

    if (value === 'C') {
      setExpression('');
      setResult('');
      return;
    }
    
    if (value === '=') {
      evaluate();
      return;
    }

    const input = inputRef.current;
    const start = input ? input.selectionStart ?? expression.length : expression.length;
    const end = input ? input.selectionEnd ?? expression.length : expression.length;

    let newExpr = expression;
    let insertVal = value;
    let newCursorPos = start;

    if (value === 'Del') {
      if (start === end && start > 0) {
        newExpr = expression.slice(0, start - 1) + expression.slice(end);
        newCursorPos = start - 1;
      } else if (start !== end) {
        newExpr = expression.slice(0, start) + expression.slice(end);
        newCursorPos = start;
      }
    } else {
      if (value === 'x^2') insertVal = '^2';
      else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) insertVal = value + '(';
      
      newExpr = expression.slice(0, start) + insertVal + expression.slice(end);
      newCursorPos = start + insertVal.length;
    }

    setExpression(newExpr);
    
    // Set cursor position back after React re-renders
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const evaluate = () => {
    if (!expression.trim()) return;
    try {
      const res = evaluateScientificExpression(expression);
      const resStr = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(10)).toString();
      setResult(resStr);
      setHistory(prev => [expression + ' = ' + resStr, ...prev.slice(0, 9)]);
      
      // Select all so the next number typed replaces the result, or operators append to it
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(expression.length, expression.length);
        }
      }, 0);
    } catch (err: any) {
      setError(err.message || 'Invalid expression');
      setResult('Error');
    }
  };

  // Live evaluation as they type
  useEffect(() => {
    if (!expression.trim()) {
      setResult('');
      setError(null);
      return;
    }
    try {
      // Wrap in a try-catch for live preview without throwing errors constantly
      const res = evaluateScientificExpression(expression);
      const resStr = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(10)).toString();
      setResult(resStr);
      setError(null);
    } catch {
      // Don't show error during live typing, let them finish
    }
  }, [expression]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      evaluate();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setExpression('');
      setResult('');
      setError(null);
    }
    // Let standard typing function normally!
  };

  const buttons = [
    { label: 'sin', val: 'sin', type: 'sci' },
    { label: 'cos', val: 'cos', type: 'sci' },
    { label: 'tan', val: 'tan', type: 'sci' },
    { label: 'AC', val: 'C', type: 'action' },
    { label: <Delete className="w-5 h-5 mx-auto" />, val: 'Del', type: 'action' },

    { label: 'log', val: 'log', type: 'sci' },
    { label: 'ln', val: 'ln', type: 'sci' },
    { label: '√', val: 'sqrt', type: 'sci' },
    { label: '(', val: '(', type: 'op' },
    { label: ')', val: ')', type: 'op' },

    { label: 'x²', val: 'x^2', type: 'sci' },
    { label: '^', val: '^', type: 'sci' },
    { label: '!', val: '!', type: 'sci' },
    { label: 'π', val: 'π', type: 'op' },
    { label: 'e', val: 'e', type: 'op' },

    { label: '7', val: '7', type: 'num' },
    { label: '8', val: '8', type: 'num' },
    { label: '9', val: '9', type: 'num' },
    { label: '÷', val: '/', type: 'op' },
    { label: '%', val: '%', type: 'op' },

    { label: '4', val: '4', type: 'num' },
    { label: '5', val: '5', type: 'num' },
    { label: '6', val: '6', type: 'num' },
    { label: '×', val: '*', type: 'op' },
    { label: '-', val: '-', type: 'op' },

    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
    { label: '+', val: '+', type: 'op' },
    { label: '=', val: '=', type: 'eval' },

    { label: '0', val: '0', type: 'num', cols: 2 },
    { label: '.', val: '.', type: 'num' },
  ];

  const getBtnClass = (type: string) => {
    const base = "flex items-center justify-center h-14 rounded-2xl font-display text-[17px] transition-all select-none active:scale-95 shadow-sm border ";
    switch (type) {
      case 'sci':
        return base + "bg-surface border-border text-slate hover:bg-slate/5";
      case 'action':
        return base + "bg-red-50 border-red-100 text-red-500 hover:bg-red-100 font-semibold";
      case 'op':
        return base + "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 font-semibold";
      case 'eval':
        return base + "bg-primary border-primary hover:bg-primary/90 text-dark font-bold row-span-2 h-[7.5rem] shadow-md";
      case 'num':
      default:
        return base + "bg-white border-border text-ink hover:bg-slate/5 font-semibold text-lg";
    }
  };

  const inputs = (
    <div className="w-full max-w-[400px] mx-auto bg-slate-50/50 p-4 sm:p-6 rounded-[2rem] border border-border shadow-sm">
      {/* Display Screen */}
      <div 
        className="bg-white border border-border/80 rounded-3xl p-5 text-right space-y-1 mb-6 flex flex-col justify-end shadow-inner relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"></div>
        
        {/* Editable Expression Input */}
        <input 
          ref={inputRef}
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0"
          className="w-full bg-transparent text-right outline-none font-mono text-slate text-lg mb-2 truncate"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        
        {/* Live Result */}
        <div className="flex justify-between items-end">
          <span className="text-red-500 text-[11px] font-sans font-medium">{error || ''}</span>
          <span className={`font-mono text-4xl tracking-tight font-bold truncate ${result === 'Error' ? 'text-red-500' : 'text-ink'}`}>
            {result ? (result === 'Error' ? 'Error' : `= ${result}`) : ''}
          </span>
        </div>
      </div>

      {/* Button Keypad */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleBtnPress(btn.val as string)}
            className={`${getBtnClass(btn.type)} ${btn.cols === 2 ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      
      <p className="text-[11px] font-sans text-slate text-center opacity-70 mt-5 mb-1">
        Keyboard support enabled. Edit expression directly.
      </p>
    </div>
  );

  const results = (
    <div className="bg-background border border-border rounded-xl p-5 md:p-6 shadow-xs flex flex-col h-full min-h-[300px]">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
        <History className="w-5 h-5 text-primary" />
        <h3 className="font-display font-bold text-base text-ink">
          Calculation History
        </h3>
      </div>
      
      {history.length > 0 ? (
        <div className="space-y-2 flex-1 overflow-y-auto pr-1">
          {history.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col bg-surface border border-border p-3 rounded-xl transition-colors hover:border-primary/40 cursor-pointer"
              onClick={() => {
                const parts = item.split(' = ');
                setExpression(parts[0]);
                setResult(parts[1]);
                setError(null);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
            >
              <span className="text-slate text-xs font-mono mb-1">{item.split(' = ')[0]}</span>
              <span className="font-bold text-ink font-mono group-hover:text-primary transition-colors text-right">
                = {item.split(' = ')[1]}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-slate opacity-60">
          <History className="w-10 h-10 mb-3 opacity-20" />
          <p className="font-sans text-sm text-center">No history yet</p>
        </div>
      )}
      
      {history.length > 0 && (
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => setHistory([])}
          className="w-full mt-4"
        >
          Clear History
        </Button>
      )}
    </div>
  );

  const formula = "Supports standard mathematical order of operations (BODMAS/PEMDAS) and parentheses.\nTrigonometric inputs (sin, cos, tan) evaluate in radians.";
  const example = "Example evaluations:\n2 + 3 × 4 = 14\n(5 + 5) / 2 = 5\nsin(pi / 2) = 1\n2^10 = 1024\n5! = 120";

  return (
    <CalculatorLayout
      toolId={toolId}
      title={title}
      description={description}
      onCalculate={evaluate}
      onReset={() => {
        setExpression('');
        setResult('');
        setError(null);
      }}
      inputs={inputs}
      results={results}
      formula={formula}
      example={example}
    />
  );
}
