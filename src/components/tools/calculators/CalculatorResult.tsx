import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultItem {
  label: string;
  value: string | number;
  isMono?: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  fill: string;
}

interface CalculatorResultProps {
  title?: string;
  highlightLabel: string;
  highlightValue: string | number;
  items: ResultItem[];
  chartData?: ChartData[];
  children?: React.ReactNode;
}

export function CalculatorResult({
  title = 'Calculation Results',
  highlightLabel,
  highlightValue,
  items,
  chartData,
  children
}: CalculatorResultProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-background border border-border rounded-xl p-5 md:p-6 shadow-xs animate-in fade-in duration-200">
      <h3 className="font-display font-bold text-base text-ink mb-4 pb-2 border-b border-border">
        {title}
      </h3>
      
      {chartData && chartData.length > 0 && mounted && (
        <div className="h-64 w-full mb-6 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--ink-color)', fontFamily: 'var(--font-system)' }}
                itemStyle={{ fontFamily: 'var(--font-system)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center justify-center text-center mb-6">
        <span className="font-sans font-bold text-slate text-[11px] uppercase tracking-wider">
          {highlightLabel}
        </span>
        <p className="font-system font-black text-4xl text-primary mt-2 break-all">
          {highlightValue}
        </p>
      </div>
      
      {items.length > 0 && (
        <div className="space-y-2.5 mb-6">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex justify-between items-center bg-surface border border-border/60 p-3 rounded-lg text-sm transition-colors hover:border-slate/40"
            >
              <span className="font-sans font-medium text-slate">{item.label}</span>
              <span className={`font-bold text-ink ${item.isMono ? 'font-mono text-[13px]' : 'font-system'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {children}
    </div>
  );
}
