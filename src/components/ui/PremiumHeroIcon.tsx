import React from 'react';

export function PremiumHeroIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8 group text-primary">
      {/* Animated outer glow */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
      
      {/* Inner glass container */}
      <div className="relative z-10 w-full h-full bg-gradient-to-br from-background to-surface border border-primary/20 rounded-[20px] flex items-center justify-center shadow-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-500 ease-out">
        
        {/* Subtle top glare/accent light for glass effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 dark:from-white/10 to-transparent" />
        
        {/* The Icon itself, injected with thin stroke width for elegance */}
        {React.isValidElement(icon) 
          ? React.cloneElement(icon as React.ReactElement<any>, { strokeWidth: 1.5, className: "w-10 h-10 relative z-20 drop-shadow-sm" }) 
          : icon}
      </div>
    </div>
  );
}
