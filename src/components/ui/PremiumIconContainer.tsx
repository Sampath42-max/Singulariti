import React from 'react';

interface PremiumIconContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PremiumIconContainer({ children, className = "w-14 h-14" }: PremiumIconContainerProps) {
  // True Glassmorphism Aesthetic for landing page
  return (
    <div className={`relative flex items-center justify-center ${className} bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 rounded-2xl group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] group-hover:border-primary/30 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-all duration-300 overflow-hidden`}>
      {/* Inner top highlight for glass depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/10" />
      
      {/* The Duotone Icon */}
      <div className="relative z-10 text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
        {React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement<any>, { 
              strokeWidth: 1.5, 
              className: "w-7 h-7 transition-colors duration-300",
              fill: "rgba(20, 184, 166, 0.2)"
            }) 
          : children}
      </div>
    </div>
  );
}
