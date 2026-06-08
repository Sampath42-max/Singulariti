import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Prism Mark */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-8 h-8 shrink-0 overflow-visible" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Faces for 3D effect */}
        <polygon points="50,10 15,85 50,60" className="fill-slate opacity-10" />
        <polygon points="50,10 85,85 50,60" className="fill-slate opacity-20" />
        <polygon points="15,85 85,85 50,60" className="fill-primary opacity-20" />
        
        {/* Borders */}
        <polygon points="50,10 15,85 85,85" className="stroke-slate" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Inner Lines meeting at the center */}
        <line x1="50" y1="10" x2="50" y2="60" className="stroke-slate" strokeWidth="3" strokeLinecap="round" />
        <line x1="15" y1="85" x2="50" y2="60" className="stroke-slate" strokeWidth="3" strokeLinecap="round" />
        <line x1="85" y1="85" x2="50" y2="60" className="stroke-slate" strokeWidth="3" strokeLinecap="round" />
        
        {/* Glowing Center Dot */}
        <circle cx="50" cy="60" r="7" className="fill-primary drop-shadow-[0_0_6px_var(--color-primary)]">
          <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      {/* Wordmark */}
      {showText && (
        <div className="font-display font-bold text-[26px] tracking-tight text-ink flex items-baseline relative top-[2px]">
          singulariti
          <div className="w-[6px] h-[6px] bg-primary ml-[2px]" />
        </div>
      )}
    </div>
  );
}
