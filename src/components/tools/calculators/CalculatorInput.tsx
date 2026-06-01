import React from 'react';

interface CalculatorInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string | null;
  prefixText?: string;
  suffixText?: string;
  onChange: (value: number, stringValue: string) => void;
}

export function CalculatorInput({
  label,
  error,
  prefixText,
  suffixText,
  value,
  onChange,
  className = '',
  type = 'number',
  ...props
}: CalculatorInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const numVal = parseFloat(rawVal);
    onChange(isNaN(numVal) ? 0 : numVal, rawVal);
  };

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
        {label}
      </label>
      
      <div className="relative flex items-stretch rounded-lg bg-surface border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        {prefixText && (
          <span className="flex items-center justify-center px-3 bg-background border-r border-border text-slate font-sans text-sm select-none">
            {prefixText}
          </span>
        )}
        
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className="flex-1 min-w-0 h-10 px-3 bg-transparent text-sm text-ink outline-none border-none font-sans"
          {...props}
        />
        
        {suffixText && (
          <span className="flex items-center justify-center px-3 bg-background border-l border-border text-slate font-sans text-sm select-none">
            {suffixText}
          </span>
        )}
      </div>
      
      {error && (
        <p className="text-[11px] font-sans text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
