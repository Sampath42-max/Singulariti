import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CalculatorSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export function CalculatorSelect({
  label,
  options,
  value,
  onChange,
  className = '',
  ...props
}: CalculatorSelectProps) {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
        {label}
      </label>
      
      <select
        value={value}
        onChange={onChange}
        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
