'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '../CalculatorLayout';
import { Button } from '@/components/ui/Button';

interface BasicCalculatorViewProps {
  toolId: string;
  title: string;
  description: string;
}

export function BasicCalculatorView({ toolId, title, description }: BasicCalculatorViewProps) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const handleDigit = (digit: string) => {
    if (isFinished) {
      setDisplay(digit);
      setEquation(digit);
      setIsFinished(false);
      return;
    }
    if (display === '0') {
      setDisplay(digit);
      setEquation(digit);
    } else {
      setDisplay(display + digit);
      setEquation(equation + digit);
    }
  };

  const handleOperator = (op: string) => {
    if (isFinished) {
      setEquation(display + ' ' + op + ' ');
      setDisplay('0');
      setIsFinished(false);
      return;
    }
    // Avoid double operators
    const trimmed = equation.trim();
    if (['+', '-', '*', '/'].includes(trimmed.slice(-1))) {
      setEquation(trimmed.slice(0, -1) + ' ' + op + ' ');
    } else {
      setEquation(equation + ' ' + op + ' ');
    }
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (isFinished) {
      setDisplay('0.');
      setEquation('0.');
      setIsFinished(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setEquation(equation + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsFinished(false);
  };

  const handleBackspace = () => {
    if (isFinished) {
      handleClear();
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setEquation(equation.slice(0, -1));
    } else {
      setDisplay('0');
      setEquation(equation.slice(0, -1) || '0');
    }
  };

  const handlePercentage = () => {
    try {
      const value = parseFloat(display);
      if (isNaN(value)) return;
      const pct = (value / 100).toString();
      setDisplay(pct);
      setEquation(equation.slice(0, -display.length) + pct);
    } catch {
      // ignore
    }
  };

  const handleEquals = () => {
    try {
      // Safe client side evaluation
      // Replace display operations
      const sanitized = equation.replace(/×/g, '*').replace(/÷/g, '/');
      if (!sanitized.trim()) return;

      // Evaluate equation safely
      // A regex check to ensure only mathematical characters are allowed
      if (!/^[0-9.+\-*/\s()]+$/.test(sanitized)) {
        throw new Error("Invalid character");
      }

      // Safe eval
      const result = Function(`"use strict"; return (${sanitized})`)();
      const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '');
      
      setDisplay(resultStr);
      setEquation(equation + ' = ' + resultStr);
      setIsFinished(true);
    } catch {
      setDisplay('Error');
      setEquation('');
      setIsFinished(true);
    }
  };

  const buttons = [
    { label: 'C', onClick: handleClear, type: 'clear' },
    { label: '⌫', onClick: handleBackspace, type: 'action' },
    { label: '%', onClick: handlePercentage, type: 'action' },
    { label: '/', onClick: () => handleOperator('/'), type: 'operator' },
    
    { label: '7', onClick: () => handleDigit('7'), type: 'num' },
    { label: '8', onClick: () => handleDigit('8'), type: 'num' },
    { label: '9', onClick: () => handleDigit('9'), type: 'num' },
    { label: '*', onClick: () => handleOperator('*'), type: 'operator' },
    
    { label: '4', onClick: () => handleDigit('4'), type: 'num' },
    { label: '5', onClick: () => handleDigit('5'), type: 'num' },
    { label: '6', onClick: () => handleDigit('6'), type: 'num' },
    { label: '-', onClick: () => handleOperator('-'), type: 'operator' },
    
    { label: '1', onClick: () => handleDigit('1'), type: 'num' },
    { label: '2', onClick: () => handleDigit('2'), type: 'num' },
    { label: '3', onClick: () => handleDigit('3'), type: 'num' },
    { label: '+', onClick: () => handleOperator('+'), type: 'operator' },
    
    { label: '0', onClick: () => handleDigit('0'), type: 'num', className: 'col-span-2' },
    { label: '.', onClick: handleDecimal, type: 'num' },
    { label: '=', onClick: handleEquals, type: 'equals' },
  ];

  return (
    <CalculatorLayout
      toolId={toolId}
      title={title}
      description={description}
      onCalculate={(e) => e.preventDefault()}
      onReset={handleClear}
      formula="Basic arithmetic follows algebraic precedence: Addition (+), Subtraction (-), Multiplication (×), and Division (÷)."
      example="Expression: 12 + 8 × 3 = 36 (Multiplication occurs before addition)"
      inputs={
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-background border border-border rounded-xl p-4 flex flex-col items-end min-h-24 justify-between font-mono">
            <span className="text-sm text-slate select-all truncate max-w-full">{equation || '\u00A0'}</span>
            <span className="text-3xl font-bold text-primary truncate max-w-full">{display}</span>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {buttons.map((btn, idx) => {
              let btnClass = 'p-4 rounded-xl text-center font-mono font-bold text-lg transition-colors cursor-pointer ';
              if (btn.type === 'clear') {
                btnClass += 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
              } else if (btn.type === 'operator' || btn.type === 'action') {
                btnClass += 'bg-primary/10 text-primary hover:bg-primary/20';
              } else if (btn.type === 'equals') {
                btnClass += 'bg-primary text-white hover:bg-primary/95';
              } else {
                btnClass += 'bg-surface border border-border text-ink hover:bg-surface/80';
              }
              return (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`${btnClass} ${btn.className || ''}`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      }
      results={
        <div className="bg-surface/50 border border-border rounded-xl p-5 text-center text-slate font-sans text-sm h-full flex items-center justify-center">
          Interactive digital pocket calculator. Click key buttons on screen to evaluate numbers.
        </div>
      }
    />
  );
}
