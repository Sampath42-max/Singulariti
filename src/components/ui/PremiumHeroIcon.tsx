import React from 'react';
import { CategoryColor } from './PremiumIconContainer';

export function PremiumHeroIcon({ icon, color = 'primary' }: { icon: React.ReactNode, color?: CategoryColor }) {
  
  const colors = {
    blue: "bg-blue-500/20 text-blue-500 border-blue-500/20 group-hover:bg-blue-500/30",
    red: "bg-red-500/20 text-red-500 border-red-500/20 group-hover:bg-red-500/30",
    purple: "bg-purple-500/20 text-purple-500 border-purple-500/20 group-hover:bg-purple-500/30",
    orange: "bg-orange-500/20 text-orange-500 border-orange-500/20 group-hover:bg-orange-500/30",
    green: "bg-emerald-500/20 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500/30",
    slate: "bg-slate-500/20 text-slate-500 border-slate-500/20 group-hover:bg-slate-500/30",
    indigo: "bg-indigo-500/20 text-indigo-500 border-indigo-500/20 group-hover:bg-indigo-500/30",
    primary: "bg-primary/20 text-primary border-primary/20 group-hover:bg-primary/30"
  };

  const style = colors[color];
  // extract classes based on style map
  const bgGlow = style.split(' ')[0];
  const textCol = style.split(' ')[1];
  const borderCol = style.split(' ')[2];
  const hoverGlow = style.split(' ')[3];

  return (
    <div className={`relative inline-flex items-center justify-center w-20 h-20 mb-8 group ${textCol}`}>
      {/* Animated outer glow */}
      <div className={`absolute inset-0 ${bgGlow} blur-2xl rounded-full ${hoverGlow} transition-colors duration-500`} />
      
      {/* Inner glass container */}
      <div className={`relative z-10 w-full h-full bg-gradient-to-br from-background to-surface border ${borderCol} rounded-[20px] flex items-center justify-center shadow-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-500 ease-out`}>
        
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
