import React from 'react';

interface PremiumIconContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PremiumIconContainer({ children, className = "w-12 h-12" }: PremiumIconContainerProps) {
  return (
    <div className={`${className} rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-background group-hover:shadow-primary/20 transition-all duration-300 ease-out`}>
      {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { strokeWidth: 1.5 }) : children}
    </div>
  );
}
