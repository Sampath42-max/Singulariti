import React from 'react';

interface PremiumIconContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PremiumIconContainer({ children, className = "w-14 h-14" }: PremiumIconContainerProps) {
  // Pure Teal Aesthetic (No gray glass masking) for landing page
  return (
    <div className={`relative flex items-center justify-center ${className} bg-primary/5 dark:bg-primary/10 backdrop-blur-md border border-primary/20 dark:border-primary/30 rounded-2xl group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(20,184,166,0.2)] group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all duration-300 overflow-hidden`}>
      {/* Inner top highlight for depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-primary/20" />
      
      {/* The Duotone Icon */}
      <div className="relative z-10 text-primary transition-transform duration-300 drop-shadow-sm">
        {React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement<any>, { 
              strokeWidth: 1.5, 
              className: "w-7 h-7",
              fill: "rgba(20, 184, 166, 0.25)"
            }) 
          : children}
      </div>
    </div>
  );
}
