'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { evaluateScientificExpression } from '@/lib/calculators/mathCalculators';
import { Button } from '@/components/ui/Button';

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

  const displayRef = useRef<HTMLDivElement>(null);

  // Handle button clicks
  const handleBtnPress = (value: string) => {
    setError(null);
    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === 'Del') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === '=') {
      evaluate();
    } else if (value === 'x^2') {
      setExpression(prev => prev + '^2');
    } else if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'log' || value === 'ln' || value === 'sqrt') {
      setExpression(prev => prev + value + '(');
    } else {
      setExpression(prev => prev + value);
    }
  };

  const evaluate = () => {
    if (!expression.trim()) return;
    try {
      const res = evaluateScientificExpression(expression);
      const resStr = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(10)).toString();
      setResult(resStr);
      setHistory(prev => [expression + ' = ' + resStr, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.message || 'Invalid expression');
      setResult('');
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      // Don't intercept typing if focus is on inputs (e.g. search)
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return;
      }

      const key = e.key;
      if (/[0-9.()+\-*/^!%]/.test(key)) {
        e.preventDefault();
        setError(null);
        setExpression(prev => prev + key);
      } else if (key === 'Enter') {
        e.preventDefault();
        evaluate();
      } else if (key === 'Backspace') {
        e.preventDefault();
        setError(null);
        setExpression(prev => prev.slice(0, -1));
      } else if (key === 'Escape') {
        e.preventDefault();
        setExpression('');
        setResult('');
        setError(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  const buttons = [
    { label: 'sin', val: 'sin', type: 'sci' },
    { label: 'cos', val: 'cos', type: 'sci' },
    { label: 'tan', val: 'tan', type: 'sci' },
    { label: 'C', val: 'C', type: 'action' },
    { label: '⌫', val: 'Del', type: 'action' },

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
    { label: '÷', val: '÷', type: 'op' },
    { label: '%', val: '%', type: 'op' },

    { label: '4', val: '4', type: 'num' },
    { label: '5', val: '5', type: 'num' },
    { label: '6', val: '6', type: 'num' },
    { label: '×', val: '×', type: 'op' },
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
    const base = "h-11 rounded-lg font-sans font-semibold text-sm transition-all select-none ";
    switch (type) {
      case 'sci':
        return base + "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/15";
      case 'action':
        return base + "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/15";
      case 'op':
        return base + "bg-slate-500/10 hover:bg-slate-500/20 text-slate border border-slate-500/15";
      case 'eval':
        return base + "bg-primary hover:bg-primary/95 text-dark font-bold row-span-2 h-[5.75rem]";
      case 'num':
      default:
        return base + "bg-surface border border-border text-ink hover:border-slate/40";
    }
  };

  const inputs = (
    <div className="space-y-4 w-full">
      {/* Display Screen */}
      <div 
        ref={displayRef}
        className="bg-background border border-border rounded-xl p-4 text-right space-y-2 min-h-[5.5rem] flex flex-col justify-between font-mono"
      >
        <div className="text-slate text-sm overflow-x-auto whitespace-nowrap scrollbar-none min-h-[1.25rem]">
          {expression || '0'}
        </div>
        {error ? (
          <div className="text-red-500 text-xs font-sans font-medium">{error}</div>
        ) : (
          <div className="text-primary text-2xl font-bold overflow-x-auto whitespace-nowrap scrollbar-none">
            {result || ''}
          </div>
        )}
      </div>

      {/* Button Keypad */}
      <div className="grid grid-cols-5 gap-2">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleBtnPress(btn.val)}
            className={`${getBtnClass(btn.type)} ${btn.cols === 2 ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      
      <p className="text-[11px] font-sans text-slate text-center opacity-85">
        Supports full keyboard typing: numbers, basic operators, brackets, Enter (=), Esc (C).
      </p>
    </div>
  );

  const results = (
    <div className="bg-background border border-border rounded-xl p-5 md:p-6 shadow-xs flex flex-col justify-between h-full min-h-[300px]">
      <div>
        <h3 className="font-display font-bold text-base text-ink mb-4 pb-2 border-b border-border">
          Calculation History
        </h3>
        {history.length > 0 ? (
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center bg-surface border border-border/60 p-3 rounded-lg text-xs font-mono transition-colors hover:border-slate/40 cursor-pointer"
                onClick={() => {
                  const parts = item.split(' = ');
                  setExpression(parts[0]);
                  setResult(parts[1]);
                  setError(null);
                }}
              >
                <span className="text-slate truncate flex-1 mr-2">{item.split(' = ')[0]}</span>
                <span className="font-bold text-primary">{item.split(' = ')[1]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate font-sans text-sm">
            Your calculation history will appear here. Click an item to reload it.
          </div>
        )}
      </div>
      
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
