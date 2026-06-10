import React from 'react';

export type CategoryColor = 'blue' | 'red' | 'purple' | 'orange' | 'green' | 'slate' | 'indigo' | 'primary';

interface PremiumIconContainerProps {
  children: React.ReactNode;
  color?: CategoryColor;
  className?: string;
}

export function PremiumIconContainer({ children, color = 'primary', className = "w-12 h-12" }: PremiumIconContainerProps) {
  // Mapping of category colors to Tailwind CSS classes
  const colorStyles = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-blue-500/20",
    red: "bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-red-500/20",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-purple-500/20",
    orange: "bg-orange-500/10 border-orange-500/20 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-orange-500/20",
    green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-500/20",
    slate: "bg-slate-500/10 border-slate-500/20 text-slate-500 group-hover:bg-slate-500 group-hover:text-white group-hover:shadow-slate-500/20",
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-indigo-500/20",
    primary: "bg-primary/10 border-primary/20 text-primary group-hover:bg-primary group-hover:text-background group-hover:shadow-primary/20"
  };

  return (
    <div className={`${className} rounded-xl border flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ease-out ${colorStyles[color]}`}>
      {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { strokeWidth: 1.5 }) : children}
    </div>
  );
}
